import { Component, Input, Output, EventEmitter, OnInit, OnChanges, DoCheck, AfterViewChecked, SimpleChanges } from '@angular/core';

import { RulesService } from './rules.service';
import { IDistanceAndFacesSet } from './model/IDistanceAndFacesSet';
import { IDistanceAndFaces } from './model/IDistanceAndFaces';
import { IFaceDistanceAndFaces } from './model/IFaceDistanceAndFaces';
import { IFace } from './model/IFace';

import  * as _ from 'lodash';

@Component({
	selector: 'detail-distances-faces',
    template: `<div *ngIf="distanceAndFacesSet">
        <h3>Détail</h3>
        <div class="form-group">
            <label for="libelleDistanceAndFacesSet">Libelle</label>
            <input placeholder="Libelle" id="libelleDistanceAndFacesSet" name="libelleDistanceAndFacesSet" class="form-control" [(ngModel)]="distanceAndFacesSet.name"/>
        </div>
        <div *ngFor="let distanceAndFace of distanceAndFacesSet.distancesAndFaces">
            <h4>Série {{distanceAndFace.serie}}</h4>
            <div class="form-group">
                <label for="distance">Distance</label>
                <input type="number" placeholder="Distance" id="distance" name="distance" class="form-control" [(ngModel)]="distanceAndFace.distance"/>
            </div>
            <div class="form-group">
                <label for="faces-{{distanceAndFace.serie}}">Blason(s)</label>
                <select select2 multiple="multiple" [value]="getSeletedFace(distanceAndFace)" (valueChange)="onValueChanged(distanceAndFace, $event)" placeholder="Blasons" id="faces-{{distanceAndFace.serie}}" name="faces-{{distanceAndFace.serie}}" class="form-control"  style="width: 100%;">
                    <!--<option *ngFor="let face of faces" [value]="face.id" [attr.selected]="isSelectedFace(distanceAndFace, face) ? 'selected' : null">{{face.name}}</option>-->
                </select>
            </div>
            <div class="form-group" *ngIf="distanceAndFace.serie == 1">
                <input type="button" class="form-control" value="Dupliquer sur les autres séries" (click)="dupliquer(distanceAndFace)" />
            </div>
        </div>
    </div>`
})
export class DetailDistancesAndFacesComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked {
    @Input()
    public distanceAndFacesSet : IDistanceAndFacesSet;

    @Output()
    public distanceAndFacesSetChange : EventEmitter<IDistanceAndFacesSet> = new EventEmitter<IDistanceAndFacesSet>();

    public selectedFaces : Map<IDistanceAndFaces, any[]>;

    private loading : boolean = false;
    private facesPromise : Promise<{
        id: string;
        text: string;
        selected: boolean;
        data: IFace;
    }[]>;

    constructor(private rulesService : RulesService) {
        this.facesPromise = this.rulesService.getFaces()
            .then(fs => fs.map(f => { return { id: f.id, text: f.name, selected : false, data: f}}));
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if(propName == "distanceAndFacesSet") {
                this.loading = true;
                this.facesPromise.then(faces => {
                    this.selectedFaces = new Map<IDistanceAndFaces, any[]>();
                    this.distanceAndFacesSet.distancesAndFaces.forEach(element => {
                        this.selectedFaces.set(element, faces.map(f => {
                            return { id: f.id, text: f.text, selected: this.isSelectedFace(element, f.data), data: f.data}
                        }));
                    });
                });
                
            }
        }
    }

    ngDoCheck() {
    }

    ngAfterViewChecked() {
        this.loading = false;
    }

    public isSelectedFace(distanceAndFaces : IDistanceAndFaces, face : IFace) : boolean {
        return _.some(distanceAndFaces.facesDistanceAndFaces, (fdf : IFaceDistanceAndFaces) => fdf.face == face.id);
    }

    public getSeletedFace(distanceAndFaces : IDistanceAndFaces) : any[] {
        if(this.selectedFaces)
            return this.selectedFaces.get(distanceAndFaces);
        return null;
    }

    public onValueChanged(distanceAndFaces : IDistanceAndFaces, value : any[]) {
        if(this.loading)
            return;

        //retire tous ceux qui ne sont plus selectionné
        _.remove(distanceAndFaces.facesDistanceAndFaces, f => !_.includes(value.map(v => v.id), f.face));

        //ajoute ceux qui doivent être ajouté
        _.filter(value, v => !_.some(distanceAndFaces.facesDistanceAndFaces, f => f.face == v.id)).forEach(v => {
            let faceDistanceAndFaces : IFaceDistanceAndFaces = <IFaceDistanceAndFaces>{
                face: v.id,
                principal: false
            };
            distanceAndFaces.facesDistanceAndFaces.push(faceDistanceAndFaces);
        });

        let faces = this.selectedFaces.get(distanceAndFaces);
        faces.forEach(f => f.selected = false);
        faces.filter(f => _.includes(value.map(v => v.id), f.id)).forEach(f => f.selected = true);
        //this.selectedFaces.set(distanceAndFaces, value);
    }

    public dupliquer(distanceAndFaces : IDistanceAndFaces) {
        for(let i = 1; i < this.distanceAndFacesSet.distancesAndFaces.length; i++) {
            this.distanceAndFacesSet.distancesAndFaces[i].distance = distanceAndFaces.distance;
            this.distanceAndFacesSet.distancesAndFaces[i].facesDistanceAndFaces = distanceAndFaces.facesDistanceAndFaces;
            this.distanceAndFacesSet.distancesAndFaces[i].defaultFace = distanceAndFaces.defaultFace;

            this.selectedFaces.set( this.distanceAndFacesSet.distancesAndFaces[i], this.selectedFaces.get(distanceAndFaces).slice(0).map(f => {
                return { id: f.id, text: f.text, selected: f.selected, data: f.data }}));
        }
    }
}