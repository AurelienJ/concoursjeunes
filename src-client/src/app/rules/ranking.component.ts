import { Component, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

import { IEntite } from '../entites/ientite';
import { IRankingCriterion } from './model/IRankingCriterion';
import { IDistanceAndFacesSet } from './model/IDistanceAndFacesSet';

import _ from 'lodash';

@Component({
	selector: 'ranking',
    template: `<div class="modal modal-primary" id="confirmDeleteRankingCriterionItemModal" *ngIf="selectedRankingCriterionForDelete">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fermer" (click)="selectedRankingCriterionForDelete=null">
                    <span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Suppression d'un critère de classement</h4>
                </div>
                <div class="modal-body">
                    <p>Confirmer la suppression du critère <strong>"{{selectedRankingCriterionForDelete.name}}"</strong>?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline" (click)="deleteRankingCriterion(selectedRankingCriterionForDelete, $event, true)">Supprimer</button>
                    <button type="button" class="btn btn-outline" data-dismiss="modal" (click)="selectedRankingCriterionForDelete=null">Fermer</button>
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
                        <a href="javascript:void(0)" class="btn btn-app" (click)="addRankingCriterion()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="list-group" id="criteria-collection">
                            <a *ngFor="let rankingCriterion of rankingCriteria" href="javascript:void(0)" class="list-group-item clearfix" 
                                    [class.active]="selectedRankingCriterion == rankingCriterion"
                                    (click)="selectedRankingCriterion = rankingCriterion">
                                <span class="button-align">{{rankingCriterion.name || '&lt;Nouveau critère de classement&gt;'}}</span>
                                <a href="javascript:void(0)" role="button" class="pull-right btn btn-link" (click)="deleteRankingCriterion(rankingCriterion, $event)"><i class="fa fa-trash" title="Supprimer"></i></a>
                                <a href="javascript:void(0)" role="button" class="pull-right btn btn-link" [class.disabled]="rankingCriterion.numordre <= 1" (click)="upRankingCriterion(rankingCriterion, $event)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
                                <a href="javascript:void(0)" role="button" class="pull-right btn btn-link" [class.disabled]="rankingCriterion.numordre >= rankingCriteria.length" (click)="downRankingCriterion(rankingCriterion, $event)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6" *ngIf="selectedRankingCriterion">
                <detail-ranking [rankingCriterion]="selectedRankingCriterion" [distanceAndFacesSets]="distancesAndFacesSet" [idFederation]="idFederation"></detail-ranking>
            </div>
        </div>`,
    styles: [
        `:host .button-separator {
			margin-right: 10px;
		}`,
        `:host #confirmDeleteRankingCriterionItemModal {
			display: block;
        }`,
        `:host #criteria-collection {
            max-height: calc(100vh - 400px);
            overflow: auto;
        }`
    ]
})
export class RankingComponent implements OnInit {
    @Input()
    public rankingCriteria : IRankingCriterion[];

    @Input()
    public distancesAndFacesSet : IDistanceAndFacesSet[];

    @Input()
    public idFederation : string;

    @Output()
    public rankingCriteriaChange : EventEmitter<IRankingCriterion[]> = new EventEmitter<IRankingCriterion[]>();

    public selectedRankingCriterion : IRankingCriterion;
    public selectedRankingCriterionForDelete : IRankingCriterion;

    constructor() {
        
    }

    ngOnInit() {

    }

    ngOnChanges(changes : SimpleChanges) {
		for (let propName in changes) {
			if(propName == 'rankingCriteria') {
				let chng = changes[propName];
				
                this.rankingCriteria = _.orderBy(this.rankingCriteria, ['ordre'], ['asc']);
                let ordre : number = 0;
                this.rankingCriteria.forEach(rc => rc.ordre = ordre++);

                this.rankingCriteriaChange.emit(this.rankingCriteria);
            }
		}
    }

    addRankingCriterion() {
		this.selectedRankingCriterion = <IRankingCriterion>{
			ordre: this.rankingCriteria.length+1
		};
		this.rankingCriteria.push(this.selectedRankingCriterion);
	}

	deleteRankingCriterion(rankingCriterion : IRankingCriterion, $event : MouseEvent, confirmation : boolean = false) {
        if($event)
            $event.stopPropagation();
            
		if(!confirmation)
			this.selectedRankingCriterionForDelete = rankingCriterion;
		else {
            _.remove(this.rankingCriteria, rc => rc == rankingCriterion);
			this.selectedRankingCriterionForDelete = undefined;
		}
	}

	upRankingCriterion(rankingCriterion : IRankingCriterion, $event : MouseEvent) {
        if($event)
            $event.stopPropagation();

		if(rankingCriterion.ordre >= 1) {
			//recupere l'element n-1
			let previousCriterion = _.find(this.rankingCriteria, rc => rc.ordre == rankingCriterion.ordre - 1);
            previousCriterion.ordre = rankingCriterion.ordre;
            rankingCriterion.ordre--;

            this.rankingCriteria = _.orderBy(this.rankingCriteria, ['ordre'], ['asc']);

            this.rankingCriteriaChange.emit(this.rankingCriteria);
		}
	}

	downRankingCriterion(rankingCriterion : IRankingCriterion, $event : MouseEvent) {
        if($event)
            $event.stopPropagation();

		if(rankingCriterion.ordre < this.rankingCriteria.length-1) {
			//recupere l'element n+1
            let nextElement = _.find(this.rankingCriteria, rc => rc.ordre == rankingCriterion.ordre + 1);
            nextElement.ordre = rankingCriterion.ordre;
            rankingCriterion.ordre++;
            
            this.rankingCriteria = _.orderBy(this.rankingCriteria, ['ordre'], ['asc']);

            this.rankingCriteriaChange.emit(this.rankingCriteria);
		}
	}
}