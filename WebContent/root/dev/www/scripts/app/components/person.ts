///<reference path="../_references.ts"/>
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';

//import { IEntite } from '../models/ientite';
//import { EntitesService } from '../services/entites';
import { ReferencesService } from '../services/references';
import { IPerson } from '../models/IPerson';
import { ICivility } from '../models/ICivility';
import { PersonsService } from '../services/persons';
import { NavigatorService } from '../services/navigator';

import { NavigationSnapshot } from '../models/NavigationSnapshot';
//import { ITypeLabel } from '../models/ITypeLabel'
import { ICountry } from '../models/ICountry';

import 'rxjs/add/operator/share';
import * as moment from 'moment';

@Component({
    selector: 'person',
    template: `<titlebar title="{{person.name}} {{person.firstName}}"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
				<form class="form-horizontal">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li [class.active]="!activePane || activePane=='identity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='identity'">Identité</a></li>
						<li [class.active]="activePane=='category'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='category'">Categorie</a></li>
						<li [class.active]="activePane=='activity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='activity'">Activités</a></li>
					</ul>
					<div class="tab-content">
						<div id="identity" class="tab-pane" [class.active]="!activePane || activePane=='identity'">
							<section class="formulaire">
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
									<input datepicker type="date" id="certificat" name="certificat" class="form-control"
										[ngModel]="person.certificat | date:'dd/MM/yyyy'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div class="dropdown-menu">
										<datepicker [(ngModel)]="person.certificat" [showWeeks]="true" name="certificatb" (selectionDone)="showDatePicker = false"></datepicker>
									</div>
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
						<div id="category" class="tab-pane" [class.active]="activePane=='category'">
							Pour les archers - catégorie de classement
						</div>
						<div id="activity" class="tab-pane" [class.active]="activePane=='activity'">
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
	private person : IPerson = <IPerson>{};

	private countries : ICountry[] = [];
	private civilities : ICivility[] = [];

    private idPerson : string;
    private url : UrlSegment[];

	private error;

    private mustUpdateView : boolean = false;

	constructor(
		private route : ActivatedRoute,
		private router: Router,
		private navigation : NavigatorService,
		private references : ReferencesService,
		private persons : PersonsService) {

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

		if(this.idPerson && this.idPerson != "new") {
			this.persons.getPerson(this.idPerson).then(p => {
				this.person = p;

				currentNavigationSnapshot.label = p.name + " " + p.firstName;
                currentNavigationSnapshot.stateData = p;
			});
		} else {
			this.person = <IPerson>{};
			currentNavigationSnapshot.stateData = this.person;
		}
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