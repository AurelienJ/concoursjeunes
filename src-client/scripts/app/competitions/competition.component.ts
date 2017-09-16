import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';

import { NavigatorService } from '../general/navigator.service';
import { NavigationSnapshot } from "../general/NavigationSnapshot";
import { RulesService } from '../rules/rules.service';
import { Rule } from '../rules/model/Rule';
import { ICompetition } from './Competition';
import { CompetitionsService } from "./competitions.service";

@Component({
    selector: 'competition',
    template: `<titlebar title="{{competition.name || 'Competition'}}"></titlebar>
    <div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <form class="form-horizontal" #competitionForm="ngForm" (ngSubmit)="validate()">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li [class.active]="!activePane || activePane=='parametrage'"><a href="javascript:void(0)" data-toogle="tab">Paramétrage</a></li>
                    </ul>
                    <div class="tab-content main-pane">
                        <div class="tab-pane" id="parametrage" [class.active]="!activePane || activePane=='parametrage'">
                            <div class="box box-info">
                                <div class="box-header with-border">
                                    <h4>Informations général</h4>
                                </div>
                                <div class="box-body">
                                    <div class="form-group">
                                        <label for="competitionName" class="col-sm-2 control-label">Nom</label>
                                        <div class="col-sm-10">
                                            <input type="text" 
                                                id="competitionName" name="competitionName"
                                                [(ngModel)]="competition.name"
                                                required maxlength="128"
                                                placeholder="Nom" class="form-control" /></div>
                                    </div>

                                    <div class="form-group">
                                        <label for="competitionPlace" class="col-sm-2 control-label">Lieu</label>
                                        <div class="col-sm-10">
                                            <input type="text"
                                                id="competitionPlace" name="competitionPlace"
                                                [(ngModel)]="competition.place"
                                                required maxlength="128"
                                                placeholder="Lieu" class="form-control"/></div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">Date</label>
                                        <div class="col-sm-10">
                                        <p class="form-control-static">
                                            <a href="javascript:void(0)" (click)="drp.toggle()">
                                            <span *ngIf="competition.dates">Du {{competition.dates && competition.dates[0] | date:'dd/MM/yyyy'}} au {{competition.dates && competition.dates[1] | date:'dd/MM/yyyy'}}</span>
                                            <span *ngIf="!competition.dates">Séléctionner les dates de la compétition</span>
                                            </a>
                                            <bs-daterangepicker #drp [bsConfig]="{ containerClass: 'theme-dark-blue', locale: 'fr'}" [(bsValue)]="competition.dates" placement="bottom" style="display: block"></bs-daterangepicker>
                                        </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="box box-info">
                                <div class="box-header with-border">
                                    <h4>Compétition</h4>
                                </div>
                                <div class="box-body">
                                    <div class="form-group">
                                        <label class="col-md-3 col-lg-2 control-label">Réglement</label>
                                        <div class="col-md-9 col-lg-10">
                                        <p class="form-control-static">
                                        <a [routerLink]="['/rules', competition.idRule]" *ngIf="competition.rule">{{competition.rule.name}}</a> - 
                                        <a [routerLink]="['/rules']" [queryParams]="{forSelect : true}">Choisir...</a>
                                        </p>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" for="competitionPhasesFinal">Phases Finale</label>
                                        <div class="col-sm-10">
                                            <div class="checkbox">
                                                <label><input type="checkbox" name="competitionPhasesFinal"
                                                [(ngModel)]="competition.duel"/></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="competitionTargetsNumber" class="col-sm-2 control-label">Nombre de cibles</label>
                                        <div class="col-sm-10"><input type="number" placeholder="Nombre de cibles" id="competitionTargetsNumber" name="competitionTargetsNumber" class="form-control" [(ngModel)]="competition.targetsnumber"/></div>
                                    </div>

                                    <div class="form-group">
                                        <label for="competitionStartsNumber" class="col-sm-2 control-label">Nombre de départ</label>
                                        <div class="col-sm-10"><input type="number" placeholder="Nombre de départs" id="competitionStartsNumber" name="competitionStartsNumber" class="form-control" [(ngModel)]="competition.startsnumber"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert alert-danger" role="alert" *ngIf="error">
				{{error}}
				</div>

                <button class="btn btn-primary pull-right" type="button" (click)="cancel()">Annuler</button>
				<button class="btn btn-success pull-right" style="margin-right: 5px;" type="submit" [disabled]="competitionForm.invalid">Valider</button>
                </form>
            </div>
        </div>
    </div>
    `
})

export class CompetitionComponent implements OnInit {
    public competition : ICompetition = <ICompetition>{};
    public activePane : string;

    public error : string;

    private idCompetition: string;

    constructor(private route: ActivatedRoute, 
        private router : Router,
        private navigation : NavigatorService,
        private competitionService : CompetitionsService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params['id'] != "new") {
                this.idCompetition = params['id'];
            } else {
                this.idCompetition = undefined;
            }

            let currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
            let currentPath = NavigationSnapshot.getPath(this.route.snapshot.url).join("/");
            
            if(currentNavigationSnapshot
                    && currentPath == currentNavigationSnapshot.path.join("/") 
                    && currentNavigationSnapshot.stateData
                    && (<ICompetition>currentNavigationSnapshot.stateData).id == this.idCompetition) {

                this.competition = <ICompetition>currentNavigationSnapshot.stateData;

                if(currentNavigationSnapshot.returnData) {
					let rule = <Rule>currentNavigationSnapshot.returnData;
					this.competition.idRule = rule.id;
					this.competition.rule = rule;
				}
            } else {
                this.navigation.pushUrlSegments("Compétition", this.route.snapshot.url, null);

                currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
                
                if(this.idCompetition) {
                    this.competitionService.getCompetition(this.idCompetition).then(c =>{
                        this.competition = c;

                        currentNavigationSnapshot.label = c.name;
                        currentNavigationSnapshot.stateData = c;
                    });
                } else {
                    this.competition = <ICompetition>{};
                    currentNavigationSnapshot.label = "Nouvelle compétition";
					currentNavigationSnapshot.stateData = this.competition;
                }
            }
		});
    }

    public validate() {
        this.competitionService.saveCompetition(this.competition).then(c => {
            this.navigation.goBack(this.router, null, -1);
        }).catch(reason => {
            this.error = reason;
        });;
    }

    public cancel() {
        this.navigation.goBack(this.router, null, -1);
    }
}