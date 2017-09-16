///<reference path="../_references.ts"/>
import { Component, OnInit, DoCheck, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';
import { AbstractControl, Validator, ValidatorFn, Validators } from "@angular/forms";

//import { IEntite } from '../models/ientite';
import { AccountService } from '../account/account.service';
import { EntitesService } from '../entites/entites.service';
import { ReferencesService } from '../references/references.service';
import { PersonsService } from './persons.service';
import { NavigatorService, } from '../general/navigator.service';

import { NavigationSnapshot } from '../general/NavigationSnapshot';
import { IEntite } from '../entites/ientite';
import { IPerson } from './IPerson';
import { ICivility } from './ICivility';
import { IAccount } from '../account/iaccount';

import { Criterion } from '../entites/Criterion';
import { ICriterionElement } from '../entites/ICriterionElement';
import { IDiscriminantCriterionSet } from '../rules/model/IDiscriminantCriterionSet';
import { IDiscriminantCriterionSetElement } from '../rules/model/IDiscriminantCriterionSetElement';

//import { ITypeLabel } from '../models/ITypeLabel'
import { ICountry } from '../references/ICountry';

import 'rxjs/add/operator/share';

@Component({
    selector: 'person',
    template: `<titlebar title="{{person.name}} {{person.firstName}} &nbsp;"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
				<form class="form-horizontal" #personForm="ngForm" (ngSubmit)="validate(personForm)">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li [class.active]="!activePane || activePane=='identity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='identity'">Identité</a></li>
						<li *ngIf="accountMode" [class.active]="activePane=='account'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='account'">Compte <!--<span class="badge bg-red">{{personForm.controls["newPassword"]?.errors?.length + personForm.controls["confirmPassword"]?.errors?.length}}</span>--></a></li>
						<li *ngIf="person.type == 'archer'" [class.active]="activePane=='category'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='category'">Categorie</a></li>
						<li *ngIf="person.type == 'archer'" [class.active]="activePane=='activity'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='activity'">Activités</a></li>
					</ul>
					<div class="tab-content main-pane">
						<div id="identity" class="tab-pane" [class.active]="!activePane || activePane=='identity'">
							<section class="formulaire">
								<div class="form-group" [ngClass]="{'has-error' : personEntityField.invalid}">
									<label for="personEntity" class="col-sm-2 control-label">Associé à l'entité</label>
									<div class="col-sm-10">
										<p class="form-control-static">
											<entite-selector
												id="personEntity" name="personEntity" #personEntityField="ngModel"
												[(ngModel)]="person.idEntity"
												required></entite-selector>
										</p>
										<span class="help-block" *ngIf="personEntityField.errors?.required">
											La personne doit être associé à une entité
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

								<div class="form-group" [ngClass]="{'has-error' : personNameField.invalid}">
									<label for="personName" class="col-sm-2 control-label">Nom</label>
									<div class="col-sm-10">
										<input type="text"
											id="personName" name="personName" #personNameField="ngModel"
											[(ngModel)]="person.name"
											required
											placeholder="Nom" 
											class="form-control"/>
										<span class="help-block" *ngIf="personNameField.errors?.required">
											Un nom est obligatoire
										</span>
									</div>
								</div>

								<div class="form-group" [ngClass]="{'has-error' : personFirstNameField.invalid}">
									<label for="personFirstName" class="col-sm-2 control-label">Prenom</label>
									<div class="col-sm-10">
										<input type="text"
											id="personFirstName" name="personFirstName" #personFirstNameField="ngModel"
											[(ngModel)]="person.firstName"
											required
											placeholder="Prenom" 
											class="form-control"/>
										<span class="help-block" *ngIf="personFirstNameField.errors?.required">
											Un prénom est obligatoire
										</span>
									</div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
									<label for="dateNaissance" class="col-sm-2 control-label">Date de naissance</label>
									<div class="col-sm-10">
										<div class="input-group date">
											<div class="input-group-addon">
												<i class="fa fa-calendar"></i>
											</div>
											<input bsDatepicker [bsConfig]="{ containerClass: 'theme-dark-blue', locale: 'fr'}" [(ngModel)]="person.dateNaissance" type="text" id="dateNaissance" name="dateNaissance" class="form-control" data-date-format="yyyy-mm-dd" lang="fr">
										</div>
									</div>
								</div>

								<div class="form-group" *ngIf="person.type == 'archer'">
									<label for="age" class="col-sm-2 control-label">Age</label>
									<div class="col-sm-10">
										<p class="form-control-static">{{age}} ans</p>
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
											<input bsDatepicker [bsConfig]="{ containerClass: 'theme-dark-blue', locale: 'fr', firstDayOfWeek: 1}" [(ngModel)]="person.certificat" type="text" id="certificat" name="certificat" class="form-control" data-date-format="yyyy-mm-dd" lang="fr">
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
						<div id="account" class="tab-pane" [class.active]="activePane=='account'" *ngIf="accountMode">
							<div class="form-group" [ngClass]="{'has-error' : loginField.invalid}">
								<label for="login" class="col-sm-2 control-label">E-mail</label>
								<div class="col-sm-10">
									<input type="email" email required placeholder="E-Mail" id="login" #loginField="ngModel" name="login" class="form-control" [(ngModel)]="person.login"/>

									<span class="help-block" *ngIf="loginField.errors?.email">
										L'email doit être de la forme mon.nom@domaine.tld
									</span>

									<span class="help-block" *ngIf="loginField.errors?.required">
										L'email est obligatoire
									</span>
								</div>
							</div>

							<div class="form-group" [ngClass]="{'has-error' : passwordField.invalid}">
								<label for="password" class="col-sm-2 control-label">Mot de passe actuel</label>
								<div class="col-sm-10">
									<input type="password"
										id="password" name="password" #passwordField="ngModel"
										[(ngModel)]="person.password"
										[required]="checkPasswordRequired ? 'true' : 'false'"
										placeholder="Mot de passe actuel"
										class="form-control" />
									<span class="help-block" *ngIf="passwordField.errors?.required">
										Vous devez saisir votre mot de passe actuel pour pouvoir le changer
									</span>
									</div>
							</div>

							<div class="form-group" [ngClass]="{'has-error' : newPasswordField.invalid}">
								<label for="newPassword" class="col-sm-2 control-label">Nouveau mot de passe</label>
								<div class="col-sm-10">
									<input type="password"
										id="newPassword" #newPasswordField="ngModel" name="newPassword"
										[(ngModel)]="person.newPassword"
										minlength="8" validateEqual="confirmPassword" reverse="true"
										placeholder="Nouveau mot de passe"
										class="form-control" />
									<span class="help-block" *ngIf="newPasswordField.errors?.minlength">
										Le mot de passe doit faire au moins {{newPasswordField.errors.minlength.requiredLength}} caractères
										({{newPasswordField.errors.minlength.actualLength}} actuellement)
									</span>
								</div>
							</div>
							<div class="form-group" [ngClass]="{'has-error' : confirmPasswordField.errors}">
								<label for="confirmPassword" class="col-sm-2 control-label">Confirmation mot de passe</label>
								<div class="col-sm-10">
									<input type="password"
										id="confirmPassword" #confirmPasswordField="ngModel" name="confirmPassword"
										[(ngModel)]="confirmPassword"
										validateEqual="newPassword"
										placeholder="Confirmation mot de passe"
										class="form-control" />
									<span class="help-block" *ngIf="confirmPasswordField.errors?.validateEqual === false">
										La confirmation ne correspond pas!
									</span>
								</div>
							</div>
						</div>
						<div id="category" class="tab-pane" [class.active]="activePane=='category'" *ngIf="person.type == 'archer'">
							<div *ngFor="let criterion of criteria" class="form-group">
							<label for="criterion-elements-{{criterion.id}}" class="col-sm-2 control-label">{{criterion.libelle}}</label>
							<div class="col-sm-10">
							<select select2  [value]="getCriterionElement(criterion)" (valueChange)="setCriterionElement(criterion, $event)" name="criterion-elements-{{criterion.id}}" class="form-control" style="width: 200px;">
								<option *ngFor="let element of criterion.criterionElements" value="{{element.id}}" [attr.selected]="getCriterionElement(criterion) == element.id ? 'selected' : null">{{element.libelle}}</option>
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
				<button class="btn btn-success pull-right" style="margin-right: 5px;" type="submit"
					[disabled]="personForm.invalid">Valider</button>
				<span class="text-danger pull-right" style="padding: 6px 12px;" role="alert" *ngIf="personForm.invalid">Tous les champs ne sont pas valide. Validation impossible!</span>
				</form>
			</div>
		</div>
	</div>
	`
})
export class PersonComponent implements OnInit, DoCheck {
	public person : IPerson | IAccount = <IPerson>{
		name: '',
		firstName: ''
	};

	public age : number;

	public entite : IEntite;
	
	public activePane : string;

	public confirmPassword : string = "";

	private isPasswordRequired : boolean = false;
	public get checkPasswordRequired() : boolean {
		let passwordRequired : boolean = false;
		if((<IAccount>this.person).newPassword && (<IAccount>this.person).newPassword.length > 0)
			passwordRequired = true;

		return passwordRequired;
	}

	public countries : ICountry[] = [];
	public civilities : ICivility[] = [];
	public criteria : Criterion[] = [];

	public error;

    private idPerson : string;
	private url : UrlSegment[];
	private accountMode : boolean = false;

    private mustUpdateView : boolean = false;

	constructor(
		private route : ActivatedRoute,
		private router: Router,
		private cdf: ChangeDetectorRef,
		private navigation : NavigatorService,
		private references : ReferencesService,
		private accountService : AccountService,
		private persons : PersonsService,
		private entitesService : EntitesService) {
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
            this.idPerson = params['id'];

			this.mustUpdateView = true;
			this.accountMode = false;
		});
		
        this.route.url.subscribe(url => {
			this.url = url;
			
			if(url[0].path == "account") {
				this.accountService.getAccount().then(a => {
					this.person = a;
					a.newPassword = "";
					this.mustUpdateView = true;
					this.accountMode = true;
				});
			} else {
				this.mustUpdateView = true;
				this.accountMode = false;
			}
        });

		this.references.getCountries().then(c => this.countries = c);
		this.persons.getCivilities().then(c => this.civilities = c);
	}

	ngDoCheck() {
		this.cdf.detectChanges();
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

		if(this.accountMode) {
			this.setPerson(this.person, currentNavigationSnapshot);
		} else if(this.idPerson && !this.idPerson.startsWith("new")) {
			this.persons.getPerson(this.idPerson).then(p => {
				this.setPerson(p, currentNavigationSnapshot);
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

	private setPerson(person : IPerson, currentNavigationSnapshot : NavigationSnapshot) {
		this.person = person;
		
		this.age = this.calculAge(person.dateNaissance);

		if(currentNavigationSnapshot.returnData) {
			this.setEntity(<IEntite>currentNavigationSnapshot.returnData);
			this.person.idEntity = this.entite.id;
		} else if(this.person.idEntity) {
			this.entitesService.getEntity(this.person.idEntity).then(entity => this.setEntity(entity));
		}

		currentNavigationSnapshot.label = person.name + " " + person.firstName;
		currentNavigationSnapshot.stateData = person;
	}
	private setEntity(entity : IEntite) {
		this.entite = entity;
		if(this.entite.idEntiteParent)
			this.entitesService.getCriteria(this.entite.idEntiteParent).then(c => this.criteria = c);
		else if(this.entite.type == 0)
			this.entitesService.getCriteria(this.entite.id).then(c => this.criteria = c);
		else
			this.criteria = [];
	}

	private getCriterionElementById(idCriterionElement : string) : any {
        for(let i = 0; i < this.criteria.length; i++) {
            let criterion = this.criteria[i];
            let element = criterion.criterionElements.find(e => e.id == idCriterionElement);
            if(element)
                return { criterion: criterion, element: element};
        };
	}

	public getCriterionElement(criterion : Criterion) : string {
		if(this.person.discriminantCriterionSet && this.person.discriminantCriterionSet.elements) {
			let element = this.person.discriminantCriterionSet.elements.find(
					e => this.getCriterionElementById(e.idCriterionElement).criterion.id == criterion.id);
			if(element)
				return element.idCriterionElement;
		}
	}

	public setCriterionElement(criterion : Criterion, idCriterionElement : string) {
		if(!this.person.discriminantCriterionSet) {
			this.person.discriminantCriterionSet = <IDiscriminantCriterionSet>{
				elements: []
			}
		} else if(!this.person.discriminantCriterionSet.elements) {
			this.person.discriminantCriterionSet.elements = [];
		}

		let discriminantCriterionSetElement : IDiscriminantCriterionSetElement = this.person.discriminantCriterionSet.elements.find(
			e => this.getCriterionElementById(e.idCriterionElement).criterion.id == criterion.id);
		if(discriminantCriterionSetElement) {
			discriminantCriterionSetElement.idCriterionElement = idCriterionElement;
		} else {
			this.person.discriminantCriterionSet.elements.push(<IDiscriminantCriterionSetElement>{
				idCriterionElement: idCriterionElement,
				ordre: this.person.discriminantCriterionSet.elements.length+1
			});
		}
	}

	public setDateCertificat(date : string) {
		try {
			let validDate = this.toDate(date);
			if(validDate.getFullYear() >= new Date().getFullYear() - 1
					&& validDate.getFullYear() <= new Date().getFullYear())
				this.person.certificat = validDate;
		} catch(e) {}
	}

	public setDateNaissance(date : string) {
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

	public calculAge(dateNaissance : Date) {
		if(!dateNaissance)
			return 0;

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

	public cancel() {
        this.navigation.goBack(this.router, null, -1);
	}
	
    public validate(f) {
		if(!this.accountMode) {
			this.persons.savePerson(this.person).then(person => {
				this.navigation.goBack(this.router, null, -1);
			}).catch(reason => {
				this.error = reason;
			});
		} else {
			this.accountService.saveAccount(this.person).then(person => {
				this.navigation.goBack(this.router, null, -1);
			}).catch(reason => {
				this.error = reason;
			})
		}
    }
}