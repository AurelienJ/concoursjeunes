///<reference path="../_references.ts"/>
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';

import { IEntite } from './ientite';
import { IPerson } from '../persons/IPerson';
import { NavigationSnapshot } from '../general/NavigationSnapshot';
import { ITypeLabel } from './ITypeLabel';
import { ICountry } from '../references/ICountry';
import { Criterion } from './Criterion';

import { EntitesService } from './entites.service';
import { PersonsService } from '../persons/persons.service';
import { ReferencesService } from '../references/references.service';
import { NavigatorService } from '../general';

import 'rxjs/add/operator/share';

@Component({
	selector: 'entite',
	template: `<titlebar title="{{entite.nom}}"></titlebar>
	<div class="content body">
		<div class="row">
			<div class="col-xs-12">
				<form class="form-horizontal">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li [class.active]="!activePane || activePane=='identity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='identity'">Identité</a></li>
						<li *ngIf="entite.type == 0" [class.active]="activePane=='criteria'">
							<a href="javascript:void(0)" data-toogle="tab" (click)="activePane='criteria'">Catégories</a>
						</li>
						<li [class.active]="activePane=='contacts'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='contacts'">Contacts</a></li>
					</ul>
					<div class="tab-content">
						<div id="identity" class="tab-pane" [class.active]="!activePane || activePane=='identity'">
							<section class="formulaire">
								<h4>Identité</h4>
								
								<div class="form-group">
									<label for="entityName" class="col-sm-2 control-label">Nom</label>
									<div class="col-sm-10"><input type="text" placeholder="Nom" id="entityName" name="entityName" class="form-control" [(ngModel)]="entite.nom"/></div>
								</div>
								<div class="form-group" *ngIf="entite.type == 0">
									<label for="entitySigle" class="col-sm-2 control-label">Sigle</label>
									<div class="col-sm-10"><input type="text" placeholder="Sigle" id="entitySigle" name="entitySigle" class="form-control" [(ngModel)]="entite.sigle" /></div>
								</div>
								<div class="form-group">
									<label for="entityReference" class="col-sm-2 control-label">Référence</label>
									<div class="col-sm-10"><input type="text" placeholder="Référence" id="entityReference" name="entityReference" class="form-control" [(ngModel)]="entite.reference" /></div>
								</div>
								<div class="form-group">
									<label for="entityType" class="col-sm-2 control-label">Type</label>
									<div class="col-sm-10"><select id="entityType" name="entityType" class="form-control" [(ngModel)]="entite.type">
										<option *ngFor="let typeEntite of typesEntite" value="{{typeEntite.id}}">{{typeEntite.label}}</option>
									</select></div>
								</div>
								<div class="form-group" *ngIf="entite.type != 0">
									<label class="col-sm-2 control-label">Fédération</label>
									<div class="col-sm-10"><span *ngIf="entite.entiteParent != null">{{entite.entiteParent.nom}}</span>
									<a [routerLink]="['/federations']" [queryParams]="{forSelect : true}" id="entityFederation" class="input">Choisir...</a></div>
								</div>
							</section>

							<section class="formulaire">
								<h4>Coordonnées</h4>
								
								<div class="form-group">
									<label for="entityAddress" class="col-sm-2 control-label">Adresse</label>
									<div class="col-sm-10"><textarea rows="4" placeholder="Adresse" id="entityAddress" name="entityAddress" class="form-control" [(ngModel)]="entite.adresse"></textarea></div>
								</div>
								<div class="form-group">
									<label for="entityZipCode" class="col-sm-2 control-label">Code postal</label>
									<div class="col-sm-10"><input type="text" placeholder="Code postal" id="entityZipCode" name="entityZipCode" class="form-control" [(ngModel)]="entite.codePostal"/></div>
								</div>
								<div class="form-group">
									<label for="entityCity" class="col-sm-2 control-label">Ville</label>
									<div class="col-sm-10"><input placeholder="Ville" id="entityCity" name="entityCity" class="form-control" [(ngModel)]="entite.ville" /></div>
								</div>
								<div class="form-group">
									<label for="entityCountry" class="col-sm-2 control-label">Pays</label>
									<div class="col-sm-10"><select id="entityCountry" name="entityCountry" class="form-control" [(ngModel)]="entite.pays">
										<option *ngFor="let country of countries" value="{{country.code}}">{{country.libelle}}</option>
									</select></div>
								</div>
							</section>

							<section class="formulaire">
								<h4>Divers</h4>
								<div class="form-group">
									<label for="entityNotes" class="col-sm-2 control-label">Notes</label>
									<div class="col-sm-10"><textarea rows="8" placeholder="Notes" id="entityNotes" name="entityNotes" class="form-control" [(ngModel)]="entite.note"></textarea></div>
								</div>
							</section>
						</div>
						<div id="criteria" class="tab-pane" [class.active]="activePane=='criteria'">
							<div class="modal modal-primary" id="confirmDeleteCriterionItemModal" *ngIf="selectedCriterionForDelete">
								<div class="modal-dialog">
									<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal" aria-label="Fermer" (click)="selectedCriterionForDelete=null">
										<span aria-hidden="true">×</span></button>
										<h4 class="modal-title">Suppression d'un critère</h4>
									</div>
									<div class="modal-body">
										<p>Confirmer la suppression du critère <strong>"{{selectedCriterionForDelete.libelle}}"</strong>?</p>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-outline" (click)="deleteCriterion(selectedCriterionForDelete, true)">Supprimer</button>
										<button type="button" class="btn btn-outline" data-dismiss="modal" (click)="selectedCriterionForDelete=null">Fermer</button>
									</div>
									</div>
									<!-- /.modal-content -->
								</div>
								<!-- /.modal-dialog -->
							</div>
							<div class="row">
								 <div class="col-sm-6">
									<h3>Liste des critères</h3>
									<div class="row">
										<div class="col-sm-12">
											<a href="javascript:void(0)" class="btn btn-app" (click)="addCriterion()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12">
											<ul class="list-group" id="criteria-collection">
												<li class="list-group-item" *ngFor="let criterion of criteria">
													<span class="badge" title="Nombre d'élément">{{criterion.criterionElements.length}}</span>
													<a href="javascript:void(0)" (click)="selectedCriterion = criterion">{{criterion.libelle}}</a>
													<a href="javascript:void(0)" class="pull-right button-separator" (click)="deleteCriterion(criterion)"><i class="fa fa-trash" title="Supprimer"></i></a>
													<a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="criterion.numordre <= 1" (click)="upCriterion(criterion)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
													<a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="criterion.numordre >= criteria.length" (click)="downCriterion(criterion)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
												</li>
											</ul>
										</div>
									</div>
								 </div>
								 <div class="col-sm-6" *ngIf="selectedCriterion">
									<criterion [criterion]="selectedCriterion"></criterion>
								 </div>
							</div>
						</div>
						<div id="contacts" class="tab-pane" [class.active]="activePane=='contacts'">
							<div class="row">
								<div class="col-sm-6"><a href="#/persons/new" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
								</div>
								<div class="col-sm-6 form-inline">
									<div class="pull-right form-group">
										<div class="input-group">
											<span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span>
											<input type="search" class="form-control input-sm" #search (keyup)="0" placeholder="Recherche..." />
										</div>
									</div>
								</div>
							</div>
							<table class="table table-bordered table-hover" [mfData]="persons | tableFilter : [search.value]" #mf="mfDataTable" [mfRowsOnPage]="10">
							<thead>
							<tr>
								<th><mfDefaultSorter by="nom">Nom</mfDefaultSorter></th>
								<th><mfDefaultSorter by="reference">Référence</mfDefaultSorter></th>
								<th><mfDefaultSorter by="ville">Ville</mfDefaultSorter></th>
								<th></th>
							</tr>
							</thead>
							<tbody>
							<tr *ngFor="let person of mf.data">
								<td>{{person.name}} {{person.firstName}}</td>
								<td>{{person.reference}}</td>
								<td>{{person.city}}</td>
								<td>
									<a href="#/persons/{{person.id}}"><i class="fa fa-pencil" title="Editer"></i></a>
									<a href="javascript:void(0)" *ngIf="forSelect" (click)="select(person)"><i class="fa fa-cart-plus" aria-hidden="true" title="Selectionner"></i></a>
								</td>
							</tr>
							</tbody>
							<tfoot>
							<tr>
								<td colspan="5">
									<mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
								</td>
							</tr>
							</tfoot>
						</table>
						</div>
					</div>
				</div> 
				</form>
				<div class="alert alert-danger" role="alert" *ngIf="error">
				{{error}}
				</div>

				<button class="btn btn-primary pull-right" type="button" (click)="cancel()">Annuler</button>
				<button class="btn btn-success pull-right" style="margin-right: 5px;" type="button" (click)="validate()">Valider</button>
			</div>
		</div>
	</div>
	`,
	styles: [
		`:host #criteria-collection {
			max-height: 400px;
			overflow-y: auto;
		}`,
		`:host .button-separator {
			margin-right: 5px;
		}`,`:host #confirmDeleteCriterionItemModal {
			display: block;
		}`]
})
export class EntiteComponent implements OnInit, DoCheck {
	private entite : IEntite = <IEntite>{};
	private criteria : Criterion[] = [];
	private persons : IPerson[] = [];

	private selectedCriterion : Criterion;
	private selectedCriterionForDelete : Criterion;

	private activePane : string;
	private error : string;
	private typesEntite: ITypeLabel[];

	private countries : ICountry[];

	private idEntity : string;
	private url : UrlSegment[];

	private forSelect : boolean = false;
	private mustUpdateView : boolean = false;

	constructor(
			private router: Router,
			private route: ActivatedRoute,
			private references: ReferencesService,
			private entitesService : EntitesService,
			private personsService : PersonsService,
			private navigatorService : NavigatorService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.idEntity = params['id'];

			this.mustUpdateView = true;
		});
		this.route.url.subscribe(url => {
			this.url = url;

			this.mustUpdateView = true;
		});

		this.entitesService.getTypeEntite().then(typeEntite => this.typesEntite = typeEntite);
		this.references.getCountries().then(countries => this.countries = countries );
	}

	ngDoCheck() {
		if(this.mustUpdateView) {
			this.mustUpdateView = false;
			this.updateView();
		}
	}
	
	select(person : IPerson) {
	}

	addCriterion() {
		this.selectedCriterion = new Criterion();
		this.selectedCriterion.libelle = 'Nouveau Critère';
		this.selectedCriterion.numordre = this.criteria.length+1;
		this.selectedCriterion.idFederation = this.entite.id;
		this.criteria.push(this.selectedCriterion);
	}

	deleteCriterion(criterion : Criterion, confirmation : boolean = false) {
		if(!confirmation)
			this.selectedCriterionForDelete = criterion;
		else {
			this.criteria.splice(criterion.numordre-1, 1);
			this.selectedCriterionForDelete = undefined;
		}
	}

	upCriterion(criterion : Criterion) {
		if(criterion.numordre > 1) {
			//recupere l'element n-1
			let previousCriterion = this.criteria[criterion.numordre-2];

			
			this.criteria[criterion.numordre-2] = criterion;
			this.criteria[criterion.numordre-1] = previousCriterion;
			
			criterion.numordre--;
			previousCriterion.numordre++;
		}
	}

	downCriterion(criterion : Criterion) {
		if(criterion.numordre < this.criteria.length) {
			//recupere l'element n+1
			let nextElement = this.criteria[criterion.numordre];

			this.criteria[criterion.numordre] = criterion;
			this.criteria[criterion.numordre-1] = nextElement;

			criterion.numordre++;
			nextElement.numordre--;
		}
	}

	cancel() {
		this.navigatorService.goBack(this.router, null, -1);
	}

	validate() {
		this.entitesService.saveEntite(this.entite).then(entite => {
			if(this.entite.type == 0 && this.criteria)
				this.entitesService.saveCriteria(this.entite.id, this.criteria)
					.then(c => {
						this.criteria = c;
						
						this.navigatorService.goBack(this.router, null, -1);
					});
			else
				this.navigatorService.goBack(this.router, null, -1);
		}).catch(reason => {
			this.error = reason;
		});
		
	}

	private updateView() {
		let currentNavigationSnapshot = this.navigatorService.getCurrentNavigationSnapshot();
		let currentPath = NavigationSnapshot.getPath(this.url).join("/");

		if(this.entite && this.entite.id == this.idEntity)
			return;

		if(currentNavigationSnapshot
				&& currentPath == currentNavigationSnapshot.path.join("/") 
				&& currentNavigationSnapshot.stateData
				&& (<IEntite>currentNavigationSnapshot.stateData).id == this.idEntity) {
			this.entite = <IEntite>currentNavigationSnapshot.stateData;
			this.personsService.getPersonsForEntity(this.entite.id).then(p => this.persons = p);
			if(currentNavigationSnapshot.returnData)
				this.entite.entiteParent = <IEntite>currentNavigationSnapshot.returnData;
		} else {
			this.navigatorService.pushUrlSegments("Entite", this.url,null);
			currentNavigationSnapshot = this.navigatorService.getCurrentNavigationSnapshot();

			if(this.idEntity) {
				this.entitesService.getEntity(this.idEntity).then(
					entite => {
						this.entite = entite;

						entite._type = "Entite";

						this.entitesService.getCriteria(entite.id).then(c => this.criteria = c);
						this.personsService.getPersonsForEntity(entite.id).then(p => this.persons = p);

						currentNavigationSnapshot.label = entite.nom;
						currentNavigationSnapshot.stateData = entite;
					});
			} else {
				this.entite = <IEntite>{ _type: "Entite" };

				currentNavigationSnapshot.label = "Nouvel entité";
				currentNavigationSnapshot.stateData = this.entite;
			}
		}
	}
}