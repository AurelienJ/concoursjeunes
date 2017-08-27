///<reference path="../_references.ts"/>
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';

//import { IEntite } from '../models/ientite';
import { EntitesService } from '../entites/entites.service';
import { ReferencesService } from '../references/references.service';
import { PersonsService } from './persons.service';
import { NavigatorService, NavigationSnapshot } from '../general';
import { IEntite } from '../entites/ientite';
import { IPerson } from './IPerson';
import { ICivility } from './ICivility';

import { Criterion } from '../entites/Criterion';
import { ICriterionElement } from '../entites/ICriterionElement';

//import { ITypeLabel } from '../models/ITypeLabel'
import { ICountry } from '../references/ICountry';

import 'rxjs/add/operator/share';
import * as moment from 'moment';

@Component({
    selector: 'person',
    template: `<titlebar title="{{person.name}} {{person.firstName}} &nbsp;"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
				<form class="form-horizontal">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li [class.active]="!activePane || activePane=='identity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='identity'">Identité</a></li>
						<li *ngIf="person.type == 'archer'" [class.active]="activePane=='category'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='category'">Categorie</a></li>
						<li *ngIf="person.type == 'archer'" [class.active]="activePane=='activity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='activity'">Activités</a></li>
					</ul>
					<div class="tab-content">
						<div id="identity" class="tab-pane" [class.active]="!activePane || activePane=='identity'">
							<section class="formulaire">
								<div class="form-group">
									<label for="personEntity" class="col-sm-2 control-label">Associé à l'entité</label>
									<div class="col-sm-10">
										<span class="form-control no-border">
											<span *ngIf="entite" ><a [routerLink]="['/entities', entite.id]">{{entite.nom}}</a> - </span>
											<a [routerLink]="['/entities']" [queryParams]="{forSelect : true}" id="entity">Choisir...</a>
										</span>
									</div>
								</div>


								<h4>Identité</h4>
								
								<div class="form-group">
									<label for="personCivility" class="col-sm-2 control-label">Civilité</label>
									<div class="col-sm-10">
										<select id="personCivility" class="form-control" [(ngModel)]="person.idCivility" name="personCivility">
											<option *ngFor="let civility of civilities" [value]="civility.id">{{civility.abreviation}}</option>
										</select>
									</div>
								</div>

								<div class="form-group">
									<label for="personName" class="col-sm-2 control-label">Nom</label>
									<div class="col-sm-10"><input type="text" placeholder="Nom" id="personName" name="personName" class="form-control" [(ngModel)]="person.name"/></div>
								</div>

								<div class="form-group">
									<label for="personFirstName" class="col-sm-2 control-label">Prenom</label>
									<div class="col-sm-10"><input type="text" placeholder="Prenom" id="personFirstName" name="personFirstName" class="form-control" [(ngModel)]="person.firstName"/></div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
									<label for="dateNaissance" class="col-sm-2 control-label">Date de naissance</label>
									<div class="col-sm-10">
										<div class="input-group date">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
											<input [ngModel]="person.dateNaissance | date: 'yyyy-MM-dd'" (ngModelChange)="setDateNaissance($event)" type="date" id="dateNaissance" name="dateNaissance" class="form-control" data-date-format="yyyy-mm-dd" lang="fr">
										</div>
									</div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
								<label for="age" class="col-sm-2 control-label">Age</label>
								<div class="col-sm-10">
								<span class="form-control no-border">{{age}} ans</span>
								</div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
									<label for="licence" class="col-sm-2 control-label">Licence</label>
									<div class="col-sm-10"><input type="text" placeholder="Licence" id="licence" name="licence" class="form-control" [(ngModel)]="person.numLicenceArcher"/></div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
									<label for="certificat" class="col-sm-2 control-label">Certificat</label>
									<div class="col-sm-10">
										<div class="input-group date">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
											<input [ngModel]="person.certificat | date: 'yyyy-MM-dd'" (ngModelChange)="setDateCertificat($event)" type="date" id="certificat" name="certificat" class="form-control" data-date-format="yyyy-mm-dd" lang="fr">
										</div>
									</div>
								</div>
							</section>

							<section class="formulaire">
								<h4>Coordonnées</h4>
								
								<div class="form-group">
									<label for="personAddress" class="col-sm-2 control-label">Adresse</label>
									<div class="col-sm-10"><textarea rows="4" placeholder="Adresse" id="personAddress" name="personAddress" class="form-control" [(ngModel)]="person.address"></textarea></div>
								</div>

								<div class="form-group">
									<label for="personZipCode" class="col-sm-2 control-label">Code postal</label>
									<div class="col-sm-10"><input type="text" placeholder="Code postal" id="personZipCode" name="personZipCode" class="form-control" [(ngModel)]="person.zipCode"/></div>
								</div>

								<div class="form-group">
									<label for="personCity" class="col-sm-2 control-label">Ville</label>
									<div class="col-sm-10"><input placeholder="Ville" id="personCity" name="personCity" class="form-control" [(ngModel)]="person.city" /></div>
								</div>

								<div class="form-group">
									<label for="personCountry" class="col-sm-2 control-label">Pays</label>
									<div class="col-sm-10"><select id="personCountry" name="personCountry" class="form-control" [(ngModel)]="person.countryCode">
										<option *ngFor="let country of countries" [value]="country.code">{{country.libelle}}</option>
									</select></div>
								</div>
							</section>

							<section class="formulaire">
								<h4>Divers</h4>
								
								<div class="form-group">
									<label for="personNotes" class="col-sm-2 control-label">Notes</label>
									<div class="col-sm-10"><textarea rows="8" placeholder="Notes" id="personNotes" name="personNotes" class="form-control" [(ngModel)]="person.note"></textarea></div>
								</div>
							</section>
						</div>
						<div id="category" class="tab-pane" [class.active]="activePane=='category'" *ngIf="person.type == 'archer'">
							<div *ngFor="let criterion of criteria" class="form-group">
							<label for="criterion-elements-{{criterion.id}}" class="col-sm-2 control-label">{{criterion.libelle}}</label>
							<div class="col-sm-10">
							<select select2 name="criterion-elements-{{criterion.id}}" class="form-control" style="width: 200px;">
								<option *ngFor="let element of criterion.criterionElements" value="{{element.id}}">{{element.libelle}}</option>
							</select>
							</div>
							</div>
						</div>
						<div id="activity" class="tab-pane" [class.active]="activePane=='activity'" *ngIf="person.type == 'archer'">
							Pour les archers - activité de l'archer sur les compétitions
						</div>
					</div>

					
				</div>

				<div class="alert alert-danger" role="alert" *ngIf="error">
				{{error}}
				</div>

				<button class="btn btn-primary pull-right" type="button" (click)="cancel()">Annuler</button>
				<button class="btn btn-success pull-right" style="margin-right: 5px;" type="button" (click)="validate()">Valider</button>
				</form>
			</div>
		</div>
	</div>
	`
})
export class PersonComponent implements OnInit, DoCheck {
	public person : IPerson = <IPerson>{
		name: '',
		firstName: ''
	};

	public age : number;

	public entite : IEntite;
	
	public activePane : string;

	public countries : ICountry[] = [];
	public civilities : ICivility[] = [];
	public criteria : Criterion[] = [];

	public error;

    private idPerson : string;
    private url : UrlSegment[];

    private mustUpdateView : boolean = false;

	constructor(
		private route : ActivatedRoute,
		private router: Router,
		private navigation : NavigatorService,
		private references : ReferencesService,
		private persons : PersonsService,
		private entitesService : EntitesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
            this.idPerson = params['id'];

            this.mustUpdateView = true;
        });
        this.route.url.subscribe(url => {
            this.url = url;

            this.mustUpdateView = true;
        });

		this.references.getCountries().then(c => this.countries = c);
		this.persons.getCivilities().then(c => this.civilities = c);
	}

	ngDoCheck() {
		if(this.mustUpdateView) {
			this.mustUpdateView = false;
			
			this.updateView();
		}
	}

	 private updateView() {
		let currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
    	let currentPath = NavigationSnapshot.getPath(this.url).join("/");

		if(this.person && this.person.id == this.idPerson)
            return;

		this.navigation.pushUrlSegments("Personne", this.url, null);
		currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();

		if(this.idPerson && !this.idPerson.startsWith("new")) {
			this.persons.getPerson(this.idPerson).then(p => {
				this.person = p;

				this.age = this.calculAge(p.dateNaissance);

				if(currentNavigationSnapshot.returnData) {
					this.setEntity(<IEntite>currentNavigationSnapshot.returnData);
					this.person.idEntity = this.entite.id;
				} else if(this.person.idEntity) {
					this.entitesService.getEntity(this.person.idEntity).then(entity => this.setEntity(entity));
				}

				currentNavigationSnapshot.label = p.name + " " + p.firstName;
                currentNavigationSnapshot.stateData = p;
			});
		} else {
			let previousNavigationSnapshot = this.navigation.getPreviousNavigationSnapshot();
			let idEntity = null;
			if(previousNavigationSnapshot && previousNavigationSnapshot.stateData
					&& previousNavigationSnapshot.stateData._type == "Entite") {
				this.setEntity(<IEntite>previousNavigationSnapshot.stateData);
				idEntity = this.entite.id;
			} else if(currentNavigationSnapshot.returnData) {
				this.setEntity(<IEntite>currentNavigationSnapshot.returnData);
				idEntity = this.entite.id;
			}
			this.person = <IPerson>{
				name: '',
				firstName: '',
				idEntity: idEntity,
				type: this.idPerson == 'newArcher' ? 'archer' : 'contact'
			};
			currentNavigationSnapshot.label = "Création d'une personne";
			currentNavigationSnapshot.stateData = this.person;
		}
	}

	/*formatDate(date : Date) : string{
		return moment(date).format('DD/MM/YYYY');
	}*/
	private setEntity(entity : IEntite) {
		this.entite = entity;
		if(this.entite.idEntiteParent)
			this.entitesService.getCriteria(this.entite.idEntiteParent).then(c => this.criteria = c);
		else if(this.entite.type == 0)
			this.entitesService.getCriteria(this.entite.id).then(c => this.criteria = c);
		else
			this.criteria = [];
	}

	setDateCertificat(date : string) {
		try {
			let validDate = this.toDate(date);
			if(validDate.getFullYear() >= new Date().getFullYear() - 1
					&& validDate.getFullYear() <= new Date().getFullYear())
				this.person.certificat = validDate;
		} catch(e) {}
	}

	setDateNaissance(date : string) {
		try {
			let validDate = this.toDate(date);
			if(validDate.getFullYear() >= new Date().getFullYear() - 1
					&& validDate.getFullYear() <= new Date().getFullYear())
				this.person.dateNaissance = validDate;
				this.age = this.calculAge(validDate);
		} catch(e) {}
	}

	toDate(date : string) : Date{
		return new Date(date);
	}

	calculAge(dateNaissance : Date) {
		let td=new Date();// Le date d'ouverture de la page (aujourd'hui)		
		var age=td.getFullYear()-dateNaissance.getFullYear(); // l'âge du patient
	 
		var mMois=td.getMonth()-dateNaissance.getMonth(); // On calcul  le mois de la date - le mois de la date de naissance
	 
		 
		if(mMois < 0) // s'il est strictement inferieur a 0
		{
			age=age-1; // On enléve 1 ans a l'age
		}  
		else
		{
			if(mMois == 0)// s'il égal 0 on est sur le même mois
			{
				var mDate=td.getDate()-dateNaissance.getDate();
				if(mDate < 0)
				{
					age=age-1;
				}
				 
			}
		}
	 
		return age; // que l'on place dans le input d'id Age
	}

	cancel() {
        this.navigation.goBack(this.router, null, -1);
    }

    validate() {
        this.persons.savePerson(this.person).then(person => {
            this.navigation.goBack(this.router, null, -1);
        }).catch(reason => {
            this.error = reason;
        });
    }
}