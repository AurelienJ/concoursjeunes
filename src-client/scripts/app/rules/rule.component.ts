import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ReferencesService } from '../references/references.service';
import { RulesService } from './rules.service';

import { NavigatorService, NavigationSnapshot } from '../general';
import { Rule } from './Rule';
import { IRulesCategory } from './IRulesCategory';

@Component({
	selector: 'rule',
	template: `<titlebar title="{{rule.name || 'Reglement'}}"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
				<form class="form-horizontal" #ruleForm="ngForm">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li [class.active]="!activePane || activePane=='general'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='general'">Général</a></li>
						<li [class.active]="activePane=='criterion'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='criterion'">Critères</a></li>
						<li [class.active]="activePane=='classment'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='classment'">Classement</a></li>
						<li [class.active]="activePane=='placement'"><a href="javascript:void(0)" data-toogle="tab" (click)="activePane='placement'">Placement</a></li>
					</ul>
					<div class="tab-content">
						<div id="general" class="tab-pane" [class.active]="!activePane || activePane=='general'">
							<section class="formulaire">
								<h4>Détail</h4>

								<div class="form-group">
									<label class="col-md-3 col-lg-2 control-label">Réglement rattaché à</label>
									<div class="col-md-9 col-lg-10"><a href="#/entities/{{rule.idEntite}}">{{rule.libelleEntite}}</a></div>
								</div>

								<div class="form-group">
									<label for="ruleCategory" class="col-md-3 col-lg-2 control-label">Catégorie</label>
									<div class="col-md-9 col-lg-10"><select id="ruleCategory" [attr.disabled]="rule.officialReglement ? 'disabled' : null" name="ruleCategory" class="form-control" [(ngModel)]="rule.idCategory">
										<option *ngFor="let category of rulesCategories" [value]="category.id">{{category.name}}</option>
									</select></div>
								</div>

								<div class="form-group">
									<label for="ruleName" class="col-md-3 col-lg-2 control-label">Nom</label>
									<div class="col-md-9 col-lg-10"><input type="text" placeholder="Nom" id="ruleName" name="ruleName" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.name"/></div>
								</div>

								<div class="form-group">
									<label for="ruleDescription" class="col-md-3 col-lg-2 control-label">Description</label>
									<div class="col-md-9 col-lg-10"><textarea placeholder="Description" id="ruleDescription" name="ruleDescription" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.description"></textarea></div>
								</div>

								<div class="form-group" [class.has-error]="ruleNbSerie.errors">
									<label for="ruleNbSerie" class="col-md-3 col-lg-2 control-label">Nombre de série</label>
									<div class="col-md-9 col-lg-10">
										<input type="number" placeholder="Nombre de série"
											pattern="[0-9]+" 
											#ruleNbSerie="ngModel" 
											(keypress)="keyNumericFilter($event)"
											id="ruleNbSerie" name="ruleNbSerie" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbSerie"/>
									</div>
								</div>

								<div class="form-group">
									<label for="ruleNbVoleeParSerie" class="col-md-3 col-lg-2 control-label">Nombre de volée par série</label>
									<div class="col-md-9 col-lg-10"><input type="number" placeholder="Nombre de volée par série" id="ruleNbVoleeParSerie" name="ruleNbVoleeParSerie" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbVoleeParSerie"/></div>
								</div>

								<div class="form-group">
									<label for="ruleNbFlecheParVolee" class="col-md-3 col-lg-2 control-label">Nombre de flèche par volée</label>
									<div class="col-md-9 col-lg-10"><input type="number" placeholder="Nombre de flèche par volée" id="ruleNbFlecheParVolee" name="ruleNbFlecheParVolee" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbFlecheParVolee"/></div>
								</div>

								<div class="form-group">
									<label for="ruleNbPointsParFleche" class="col-md-3 col-lg-2 control-label">Nombre de point par flèche</label>
									<div class="col-md-9 col-lg-10"><input type="number" placeholder="Nombre de point maximal par flèche" id="ruleNbPointsParFleche" name="ruleNbPointsParFleche" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbPointsParFleche"/></div>
								</div>

								<div class="form-group">
									<label for="ruleDepartages" class="col-md-3 col-lg-2 control-label">Critères de départage</label>
									<div class="col-md-9 col-lg-10"><input type="text" placeholder="Critères de départage" id="ruleDepartages" name="ruleDepartages" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.departages"/></div>
								</div>
							</section>

							<section class="formulaire">
								<h4>Equipes</h4>

								<div class="form-group">
									<label for="ruleNbMembresEquipe" class="col-md-3 col-lg-2 control-label">Taille maximale équipe</label>
									<div class="col-md-9 col-lg-10"><input type="number" placeholder="Taille maximale équipe" id="ruleNbMembresEquipe" name="ruleNbMembresEquipe" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbMembresEquipe"/></div>
								</div>

								<div class="form-group">
									<label for="ruleNbMembresRetenu" class="col-md-3 col-lg-2 control-label">Nombre de coéquipier comptant pour le classement</label>
									<div class="col-md-9 col-lg-10"><input type="number" placeholder="Nombre de coéquipier comptant pour le classement" id="ruleNbMembresRetenu" name="ruleNbMembresRetenu" class="form-control" [attr.disabled]="rule.officialReglement ? 'disabled' : null" [(ngModel)]="rule.nbMembresRetenu"/></div>
								</div>
							</section>
						</div>

						<div id="criterion" class="tab-pane" [class.active]="activePane=='criterion'">
							<div class="row">
								<div class="col-sm-6"><a href="javascript:void(0)" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
								</div>
								<div class="col-sm-6 form-inline">
									
								</div>
							</div>
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
export class RuleComponent implements OnInit, DoCheck {

	private idRule : string;
	private rule : Rule = new Rule();
	private rulesCategories : IRulesCategory[];

	private activePane : string;
	private error : string;
	private mustUpdateView : boolean = false;

	constructor(private route : ActivatedRoute,
		private router: Router,
		private navigation : NavigatorService,
		private references : ReferencesService,
		private rulesService : RulesService) { }

	ngOnInit() {
		this.rulesService.getRulesCategories().then(rc => this.rulesCategories = rc);

		this.route.params.subscribe(params => {
            this.idRule = params['id'];

			let currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
			let currentPath = NavigationSnapshot.getPath(this.route.snapshot.url).join("/");

			if(currentNavigationSnapshot
					&& currentPath == currentNavigationSnapshot.path.join("/") 
					&& currentNavigationSnapshot.stateData
					&& (<Rule>currentNavigationSnapshot.stateData).id == this.idRule) {

				this.rule = currentNavigationSnapshot.stateData;
			} else {
				this.navigation.pushUrlSegments("Reglement", this.route.snapshot.url, null);
				currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();

				this.rulesService.getRule(this.idRule).then(r => {
					this.rule = r;

					currentNavigationSnapshot.label = r.name;
					currentNavigationSnapshot.stateData = r;
				});
			}
			

            //this.mustUpdateView = true;
        });
	}

	ngDoCheck() {
		/*if(this.mustUpdateView) {
			this.mustUpdateView = false;

			
		}*/
	}

	keyNumericFilter(event: any) {
		const pattern = /[0-9\+\-\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		// console.log(inputChar, e.charCode);
		if (!pattern.test(inputChar) && event.charCode>0) {
		// invalid character, prevent input
		event.preventDefault();
		}
	}

	cancel() {

	}

	validate() {

	}
}