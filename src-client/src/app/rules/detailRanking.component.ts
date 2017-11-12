import { Component, Input, Output, EventEmitter, OnInit, OnChanges, DoCheck, AfterViewChecked, SimpleChanges } from '@angular/core';

import { RulesService } from './rules.service';
import { EntitesService } from '../entites/entites.service';

import { IDistanceAndFacesSet } from './model/IDistanceAndFacesSet';
import { IRankingCriterion } from './model/IRankingCriterion';
import { IDiscriminantCriterionSet } from './model/IDiscriminantCriterionSet';
import { IDiscriminantCriterionSetElement } from './model/IDiscriminantCriterionSetElement';
import { IEntite } from '../entites/ientite';
import { Criterion } from '../entites/Criterion';
import { ICriterionElement } from '../entites/ICriterionElement';

import _ from 'lodash';

@Component({
	selector: 'detail-ranking',
    template: `<div *ngIf="rankingCriterion">
        <div class="modal" id="addDiscriminantCriteriaSet" *ngIf="displayAddDiscriminantCriteriaSet">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fermer" (click)="displayAddDiscriminantCriteriaSet=false">
                        <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Séléction d'un jeux de critères discriminant</h4>
                    </div>
                    <div class="modal-body">
                        <div *ngFor="let criterion of criteria">
                            <h4>{{criterion.libelle}}</h4>
                            <div class="radio" *ngFor="let criterionElement of criterion.criterionElements">
                                <label>
                                    <input type="radio" name="criterion-{{criterion.id}}"
                                        [value]="criterionElement"
                                        [ngModel]="selectedCriterionElements.get(criterion)" (ngModelChange)="selectedCriterionElements.set(criterion, $event)"/>
                                    {{criterionElement.libelle}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" (click)="validateDiscriminantCriterionSet()">Ajouter</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" (click)="displayAddDiscriminantCriteriaSet=false">Fermer</button>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
        </div>

        <h3>Détail</h3>
        <div class="form-group">
            <label for="libelleRankingCriterion">Libelle</label>
            <input placeholder="Libelle" id="libelleRankingCriterion" name="libelleRankingCriterion" class="form-control" [(ngModel)]="rankingCriterion.name"/>
        </div>
        
        <div class="form-group">
            <label for="distanceAndFacesSet">Jeux de distances et blasons</label>
            <div class="radio" *ngFor="let distanceAndFacesSet of distanceAndFacesSets">
                <label>
                    <input type="radio" name="distanceAndFacesSet"
                        [value]="distanceAndFacesSet"
                        [(ngModel)]="rankingCriterion.distancesAndFacesSet"/>
                    {{distanceAndFacesSet.name}}
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="discriminantCriteria">Critères discriminants <button class="btn btn-link btn-lg" (click)="displayDiscriminantCriterionSet(null)"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</button></label>
            <div class="form-control-static">
                
                <ul class="list-group clearfix">
                    <li class="list-group-item" *ngFor="let discriminantCriterionSet of rankingCriterion.discriminantCriterionSets">
                    <span class="button-align">{{discriminantCriterionSet.name}}</span>
                    <a href="javascript:void(0)" class="pull-right btn btn-link" (click)="deleteDiscriminantCriterionSet(discriminantCriterionSet)"><i class="fa fa-trash" title="Supprimer"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>`,
    styles: [
        `:host .button-separator {
			margin-right: 10px;
		}`,
        `:host #addDiscriminantCriteriaSet {
			display: block;
		}`
    ]
})
export class DetailRankingComponent implements OnInit, OnChanges {
    @Input()
    public rankingCriterion : IRankingCriterion;

    @Input()
    public distanceAndFacesSets : IDistanceAndFacesSet[];

    @Input()
    public idFederation : string;

    public criteria : Criterion[];

    public displayAddDiscriminantCriteriaSet : boolean = false;
    public editedDiscriminantCriterionSet : IDiscriminantCriterionSet;
    public selectedCriterionElements : Map<Criterion, ICriterionElement>;

    private loading : boolean = false;

    constructor(private rulesService : RulesService, private entitesService : EntitesService) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes : SimpleChanges) {
		for (let propName in changes) {
			if(propName == 'idFederation') {
				let chng = changes[propName];
				
				this.entitesService.getCriteria(this.idFederation).then(c => this.criteria = c);
            } else if(propName == 'rankingCriterion') {
                if(!this.rankingCriterion.distancesAndFacesSet && this.rankingCriterion.idDistancesAndFacesSet) {
                    this.rankingCriterion.distancesAndFacesSet = _.find(this.distanceAndFacesSets, df => df.id == this.rankingCriterion.idDistancesAndFacesSet);
                }
            }
		}
    }

    private getCriterionElement(idCriterionElement : string) : any {
        for(let i = 0; i < this.criteria.length; i++) {
            let criterion = this.criteria[i];
            let element = _.find(criterion.criterionElements, e => e.id == idCriterionElement);
            if(element)
                return { criterion: criterion, element: element};
        };
    }

    public displayDiscriminantCriterionSet() {
        this.selectedCriterionElements = new Map<Criterion, ICriterionElement>();

        this.editedDiscriminantCriterionSet = <IDiscriminantCriterionSet>{
            elements: []
        };

        this.displayAddDiscriminantCriteriaSet = true;
    }

    public validateDiscriminantCriterionSet() {
        let ordre = 0;
        this.editedDiscriminantCriterionSet.elements = [];
        this.editedDiscriminantCriterionSet.name = "";
        this.selectedCriterionElements.forEach(e => {
            this.editedDiscriminantCriterionSet.elements.push(<IDiscriminantCriterionSetElement>{
                idCriterionElement: e.id,
                ordre: ordre++
            });
            if(ordre > 1)
                this.editedDiscriminantCriterionSet.name += " / ";
            this.editedDiscriminantCriterionSet.name += e.libelle;
        });
        

        if(! this.rankingCriterion.discriminantCriterionSets)
            this.rankingCriterion.discriminantCriterionSets = [];
        this.rankingCriterion.discriminantCriterionSets.push(this.editedDiscriminantCriterionSet);
        this.displayAddDiscriminantCriteriaSet = false;
    }

    public deleteDiscriminantCriterionSet(discriminantCriterionSet : IDiscriminantCriterionSet) {
        _.remove(this.rankingCriterion.discriminantCriterionSets, e => e == discriminantCriterionSet);
    }
}