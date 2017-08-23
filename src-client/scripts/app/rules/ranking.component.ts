import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';

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
                    <button type="button" class="btn btn-outline" (click)="deleteRankingCriterion(selectedRankingCriterionForDelete, true)">Supprimer</button>
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
                        <ul class="list-group" id="criteria-collection">
                            <li class="list-group-item" *ngFor="let rankingCriterion of rankingCriteria">
                                <a href="javascript:void(0)" (click)="selectedRankingCriterion = rankingCriterion">{{rankingCriterion.name || '&lt;Nouveau critère de classement&gt;'}}</a>
                                <a href="javascript:void(0)" class="pull-right button-separator" (click)="deleteRankingCriterion(rankingCriterion)"><i class="fa fa-trash" title="Supprimer"></i></a>
                                <a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="rankingCriterion.numordre <= 1" (click)="upRankingCriterion(rankingCriterion)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
                                <a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="rankingCriterion.numordre >= rankingCriteria.length" (click)="downRankingCriterion(rankingCriterion)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-6" *ngIf="selectedRankingCriterion">
                <detail-ranking [(rankingCriterion)]="selectedRankingCriterion" [distanceAndFacesSets]="distancesAndFacesSet"></detail-ranking>
            </div>
        </div>`,
    styles: [
        `:host #confirmDeleteDistanceAndFacesSetItemModal {
			display: block;
		}`
    ]
})
export class RankingComponent implements OnInit {
    @Input()
    public rankingCriteria : IRankingCriterion[];

    @Input()
    public distancesAndFacesSet : IDistanceAndFacesSet[];

    @Output()
    public rankingCriteriaChange : EventEmitter<IRankingCriterion[]> = new EventEmitter<IRankingCriterion[]>();

    public selectedRankingCriterion : IRankingCriterion;
    public selectedRankingCriterionForDelete : IRankingCriterion;

    constructor() {
        
    }

    ngOnInit() {

    }

    addRankingCriterion() {
		this.selectedRankingCriterion = <IRankingCriterion>{
			numordre: this.rankingCriteria.length+1
		};
		this.rankingCriteria.push(this.selectedRankingCriterion);
	}

	deleteRankingCriterion(rankingCriterion : IRankingCriterion, confirmation : boolean = false) {
		if(!confirmation)
			this.selectedRankingCriterionForDelete = rankingCriterion;
		else {
			this.rankingCriteria.splice(rankingCriterion.numordre-1, 1);
			this.selectedRankingCriterionForDelete = undefined;
		}
	}

	upRankingCriterion(rankingCriterion : IRankingCriterion) {
		if(rankingCriterion.numordre > 1) {
			//recupere l'element n-1
			let previousCriterion = this.rankingCriteria[rankingCriterion.numordre-2];

			this.rankingCriteria[rankingCriterion.numordre-2] = rankingCriterion;
			this.rankingCriteria[rankingCriterion.numordre-1] = previousCriterion;
			
			rankingCriterion.numordre--;
			previousCriterion.numordre++;
		}
	}

	downRankingCriterion(rankingCriterion : IRankingCriterion) {
		if(rankingCriterion.numordre < this.rankingCriteria.length) {
			//recupere l'element n+1
			let nextElement = this.rankingCriteria[rankingCriterion.numordre];

			this.rankingCriteria[rankingCriterion.numordre] = rankingCriterion;
			this.rankingCriteria[rankingCriterion.numordre-1] = nextElement;

			rankingCriterion.numordre++;
			nextElement.numordre--;
		}
	}
}