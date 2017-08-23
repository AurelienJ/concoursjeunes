import { Component, Input, Output, EventEmitter, OnInit, OnChanges, DoCheck, AfterViewChecked, SimpleChanges } from '@angular/core';

import { RulesService } from './rules.service';
import { IDistanceAndFacesSet } from './model/IDistanceAndFacesSet';
import { IRankingCriterion } from './model/IRankingCriterion';

import _ from 'lodash';

@Component({
	selector: 'detail-ranking',
    template: `<div *ngIf="rankingCriterion">
        <h3>Détail</h3>
        <div class="form-group">
            <label for="libelleRankingCriterion" class="col-sm-2 control-label">Libelle</label>
            <div class="col-sm-10"><input placeholder="Libelle" id="libelleRankingCriterion" name="libelleRankingCriterion" class="form-control" [(ngModel)]="rankingCriterion.name"/></div>
        </div>
        
        <div class="form-group">
            <label for="distanceAndFacesSet" class="col-sm-2 control-label">Jeux de distances et blasons</label>
            <div class="col-sm-10">
                <select select2 (value)="onValueChanged($event)" placeholder="Distances / Blasons" id="distanceAndFacesSet" name="distanceAndFacesSet" class="form-control"  style="width: 100%;">
                    <option *ngFor="let distanceAndFacesSet of distanceAndFacesSets" [value]="distanceAndFacesSet.id || 'temp' + distanceAndFacesSet.tempId" [attr.selected]="((distanceAndFacesSet.id == rankingCriterion.idDistancesAndFacesSet) || (distanceAndFacesSet.tempId == rankingCriterion.idTempDistancesAndFacesSet)) ? 'selected' : null">{{distanceAndFacesSet.name}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="discriminantCriteria" class="col-sm-2 control-label">Critères discriminants</label>
            <div class="col-sm-10">
                <ul class="list-group">
                    <li class="list-group-item">Test</li>
                </ul>
            </div>
        </div>

    </div>`
})
export class DetailRankingComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {
    @Input()
    public rankingCriterion : IRankingCriterion;

    @Input()
    public distanceAndFacesSets : IDistanceAndFacesSet[];

    @Output()
    public rankingCriterionChange : EventEmitter<IRankingCriterion> = new EventEmitter<IRankingCriterion>();

    private loading : boolean = false;

    constructor(private rulesService : RulesService) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if(propName == "rankingCriterion") {
                this.loading = true;
            }
        }
    }

    ngDoCheck() {
    }

    ngAfterViewChecked() {
        this.loading = false;
    }

    public onValueChanged(value : string) {
        if(this.loading)
            return;

        if(value.startsWith("temp"))
            this.rankingCriterion.idTempDistancesAndFacesSet = value.substring(4);
        else
            this.rankingCriterion.idDistancesAndFacesSet = value;
    }
}