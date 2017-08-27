import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';

import { IDistanceAndFacesSet } from './model/IDistanceAndFacesSet';
import { IDistanceAndFaces } from './model/IDistanceAndFaces';
import { IFaceDistanceAndFaces } from './model/IFaceDistanceAndFaces';

import _ from 'lodash';

@Component({
	selector: 'distances-faces',
    template: `<div class="modal modal-primary" id="confirmDeleteDistanceAndFacesSetItemModal" *ngIf="selectedDistanceAndFacesSetForDelete">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fermer" (click)="selectedRankingCriterionForDelete=null">
                <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Suppression d'un critère de classement</h4>
            </div>
            <div class="modal-body">
                <p>Confirmer la suppression du critère <strong>"{{selectedDistanceAndFacesSetForDelete.name}}"</strong>?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" (click)="deleteDistanceAndFacesSet(selectedDistanceAndFacesSetForDelete, true)">Supprimer</button>
                <button type="button" class="btn btn-outline" data-dismiss="modal" (click)="selectedDistanceAndFacesSetForDelete=null">Fermer</button>
            </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h3>Liste des jeux de distances / blasons</h3>
            <div class="row">
                <div class="col-sm-12">
                    <a href="javascript:void(0)" class="btn btn-app" (click)="addDistanceAndFacesSet()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <ul class="list-group" id="criteria-collection">
                        <li class="list-group-item clearfix" *ngFor="let distanceAndFaces of distancesAndFacesSet">
                            <a href="javascript:void(0)" class="button-align" (click)="selectedDistanceAndFacesSet = distanceAndFaces">{{distanceAndFaces.name || '<Nouveau jeux de distances / blasons>'}}</a>
                            <a href="javascript:void(0)" class="pull-right btn btn-link" (click)="deleteDistanceAndFacesSet(distanceAndFaces)"><i class="fa fa-trash" title="Supprimer"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-6" *ngIf="selectedDistanceAndFacesSet">
            <detail-distances-faces [(distanceAndFacesSet)]="selectedDistanceAndFacesSet"></detail-distances-faces>
        </div>
    </div>`,
    styles: [
        `:host #confirmDeleteDistanceAndFacesSetItemModal {
			display: block;
		}`
    ]
})
export class DistancesAndFacesComponent implements OnInit {
    @Input()
    public distancesAndFacesSet : IDistanceAndFacesSet[];

    @Input()
    public nbSerie : number;

    @Output()
    public distancesAndFacesSetChange : EventEmitter<IDistanceAndFacesSet[]> = new EventEmitter<IDistanceAndFacesSet[]>();

    public selectedDistanceAndFacesSet : IDistanceAndFacesSet;
    public selectedDistanceAndFacesSetForDelete : IDistanceAndFacesSet;

    constructor() {
        
    }

    ngOnInit() {

    }

    public addDistanceAndFacesSet() {
        let distanceAndFaces : IDistanceAndFaces[] = [];

        for(let i = 1; i <= this.nbSerie; i++) {
            distanceAndFaces.push(<IDistanceAndFaces>{
                serie: i,
                distance: 0,
                facesDistanceAndFaces: []
            })
        }

        let distanceAndFacesSet = <IDistanceAndFacesSet>{
            tempId: new Date().getTime().toString(),
            name: null,
            distancesAndFaces: distanceAndFaces
        };
        if(!this.distancesAndFacesSet)
            this.distancesAndFacesSet = [];
        
        this.distancesAndFacesSet.push(distanceAndFacesSet);
        this.distancesAndFacesSetChange.emit(this.distancesAndFacesSet);

        this.selectedDistanceAndFacesSet = distanceAndFacesSet;
    }

    public deleteDistanceAndFacesSet(distanceAndFacesSet : IDistanceAndFacesSet, confirmation : boolean = false) {
		if(!confirmation)
			this.selectedDistanceAndFacesSetForDelete = distanceAndFacesSet;
		else {
            _.remove(this.distancesAndFacesSet, df => df == distanceAndFacesSet);

			this.selectedDistanceAndFacesSetForDelete = undefined;
		}
	}
}