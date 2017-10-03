import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd,UrlSegment } from '@angular/router';

import { NavigatorService } from '../general/navigator.service';
import { CompetitionsService } from "./competitions.service";

import { NavigationSnapshot } from "../general/NavigationSnapshot";
import { RulesService } from '../rules/rules.service';
import { Rule } from '../rules/model/Rule';
import { ICompetition } from './model/ICompetition';
import { IPerson } from "../persons/IPerson";
import { IConcurrent } from "./model/IConcurrent";

@Component({
    selector: 'competition',
    template: `<titlebar title="{{competition.name || 'Competition'}}"></titlebar>
    <div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <form class="form-horizontal" #competitionForm="ngForm" (ngSubmit)="validate()">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs">
                        <li *ngIf="competition.id" [class.active]="!activePane || activePane=='stats'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('stats')">Accueil</a></li>
                        <li *ngIf="competition.id" [class.active]="activePane=='pasDeTir'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('pasDeTir')">Pas de tir</a></li>
                        <li *ngIf="competition.id" [class.active]="activePane=='greffe'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('greffe')">Greffe</a></li>
                        <li *ngIf="competition.id" [class.active]="activePane=='finales'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('finales')">Phases finales</a></li>
                        <li *ngIf="competition.id" [class.active]="activePane=='classements'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('classements')">Classements</a></li>
                        <li [class.active]="!competition.id || activePane=='parametrage'"><a href="javascript:void(0)" data-toogle="tab" (click)="changeTab('parametrage')">Paramétrage</a></li>
                    </ul>
                    <div class="tab-content main-pane">
                        <div class="tab-pane" id="parametrage" [class.active]="!competition.id || activePane=='parametrage'">
                            <competition-parameters [competition]="competition" ngDefaultControl></competition-parameters>
                        </div>

                        <div class="tab-pane" id="pasDeTir" [class.active]="activePane=='pasDeTir'">
                            <competition-shootingline [competition]="competition"></competition-shootingline>
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

    public currentStart : number = 1;

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

            if(currentNavigationSnapshot && currentNavigationSnapshot.queryParams && currentNavigationSnapshot.queryParams.activePane)
                this.activePane = currentNavigationSnapshot.queryParams.activePane;
            
            if(currentNavigationSnapshot
                    && currentPath == currentNavigationSnapshot.path.join("/") 
                    && currentNavigationSnapshot.stateData
                    && (<ICompetition>currentNavigationSnapshot.stateData).id == this.idCompetition) {

                this.competition = <ICompetition>currentNavigationSnapshot.stateData;

                if(currentNavigationSnapshot.returnData) {
                    if(currentNavigationSnapshot.returnDataType == "rule") {
                        let rule = <Rule>currentNavigationSnapshot.returnData;
                        this.competition.idRule = rule.id;
                        this.competition.rule = rule;
                    } else if(currentNavigationSnapshot.returnDataType == "person") {
                        let archer = <IPerson>currentNavigationSnapshot.returnData;
                        let concurrent = <IConcurrent>{
                            idArcher: archer.id,
                            archer: archer,
                            start: this.currentStart
                        }

                        this.competition.competitors = this.competition.competitors || [];
                        this.competition.competitors.push(concurrent);
                    }
				}
            } else {
                this.navigation.pushUrlSegments("Compétition", this.route.snapshot.url, {});

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

    public changeTab(name : string) {
        this.activePane = name;
        this.navigation.getCurrentNavigationSnapshot().queryParams.activePane = name;
    }

    public validate() {
        this.competitionService.saveCompetition(this.competition).then(c => {
            this.navigation.goBack(this.router, null, null, -1);
        }).catch(reason => {
            this.error = reason;
        });;
    }

    public cancel() {
        this.navigation.goBack(this.router, null, null, -1);
    }
}