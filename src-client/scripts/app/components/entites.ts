///<reference path="../_references.ts"/>
import { Component, ViewChild, ElementRef, OnInit, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from '../../libs/angular2-datatable';

import { ITypeLabel } from '../models/ITypeLabel';
import { IEntite } from '../models/ientite';
import { EntitesService } from '../services/entites';
import { NavigatorService } from '../services/navigator';

export class EntiteServerSideInputData implements InputData {
    private cachedData : IEntite[];
    private cachedSize : number;

    private sortBy: string | string[];
    private sortOrder: string[];

    public types? : number[];
    public childOf : string;
    public term : string;

    private mustReload = true;

    public onDataChange : EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

	constructor(private entitesService : EntitesService) {

	}

    public filter(types? : number[], childOf? : string, term? : string) {
        if(types != this.types || this.childOf != childOf || term != this.term)
        {
            this.types = types;
            this.childOf = childOf;
            this.term = term;
            this.mustReload = true;
            this.onDataChange.emit({length : 0})
        }
    }

    public size() : Promise<number> {
        if(this.cachedSize && !this.mustReload)
            return new Promise<number>(resolve => resolve(this.cachedSize));

        return this.entitesService.countEntities(this.types, this.childOf, this.term)
            .then(size => {
                this.cachedSize = size;
                this.mustReload = false;
                return size;
            });
    }

    public orderBy(sortBy: string | string[], sortOrder: string[]) {
        if(sortBy != this.sortBy || sortOrder != this.sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.mustReload = true;
        }
    }

    public slice(start?: number, end?: number): Promise<any[]> {
        if(this.cachedData && !this.mustReload)
            return new Promise<any[]>(resolve => resolve(this.cachedData));

        return this.entitesService.getEntities(this.types, this.childOf, this.term, 
                this.sortBy, this.sortOrder,
                start, end).then(entites => {
            this.cachedData = entites;
            this.mustReload = false;
            return entites;
        });
    }
}

@Pipe({
    name: 'entiteServerSideInputDataFilter'
})
export class EntiteServerSideInputDataFilterPipe implements PipeTransform {
    private tempo;
    transform(value: EntiteServerSideInputData, args: string[]): any {

        let filter = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        
        
        //n'envoi au max qu'une requete toute les 300ms pour eviter de trop spammer le serveur
        if(this.tempo)
            clearTimeout(this.tempo);

        this.tempo = setTimeout(() => {
            value.filter(value.types, value.childOf, filter);
        }, 300);

        return value;
    }
}

@Component({
    selector: 'entites',
    template: `<titlebar title="{{!isFederationExclusive ? 'Entités' : 'Fédérations'}}"></titlebar>
    <div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Liste des entités</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <a href="#/newentity" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
                            </div>
                            <div class="col-sm-10 form-inline">
                                <div class="row">
                                    <div class="col-xs-12 col-lg-9 form-group">
                                        <select select2 id="categories" name="categories" class="form-control input-sm" 
                                                multiple="multiple" style="width: 100%;"
                                                [disable]="isFederationExclusive" [placeHolder]="'Catégories'"
                                                (value)="onValueChanged($event)">
                                            <option *ngFor="let typeEntity of typesEntities"
                                                [value]="typeEntity.id" [attr.selected]="displayTypes && displayTypes.indexOf(typeEntity.id)>-1 ? 'selected' : null">{{typeEntity.label}}</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-3 form-group pull-right">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span>
                                            <input type="search" class="form-control" #search (keyup)="0" placeholder="Recherche..." />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-sm-12 form-group">
                                <span *ngIf="childOfName">Entités relative à <a href="#/entities/{{childOf}}">{{childOfName}}</a></span>
                                </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered table-hover" [mfData]="entites | entiteServerSideInputDataFilter : [search.value]" #mf="mfDataTable" [mfRowsOnPage]="10">
                            <thead>
                            <tr>
                                <th><mfDefaultSorter by="nom">Nom</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="reference">Référence</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="ville">Ville</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="category">Catégorie</mfDefaultSorter></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let entite of mf.data">
                                <td><a href="#/entities/{{entite.id}}">{{entite.nom}}</a></td>
                                <td>{{entite.reference}}</td>
                                <td>{{entite.ville}}</td>
                                <td><span class="label" [class.label-success]="entite.type == 0" 
                                    [class.label-warning]="entite.type == 1" [class.label-primary]="entite.type == 2" 
                                    [class.label-danger]="entite.type == 3">{{(typesEntities[entite.type]||{}).label || ''}}</span></td>
                                <td>
                                    <a href="#/clubs?childOf={{entite.id}}" *ngIf="entite.type < 3"><i class="fa fa-list" aria-hidden="true" title="entités associées"></i></a>
                                    <a href="#/entities/{{entite.id}}"><i class="fa fa-pencil" title="Editer"></i></a>
                                    <a href="javascript:void(0)" *ngIf="forSelect" (click)="select(entite)"><i class="fa fa-cart-plus" aria-hidden="true" title="Selectionner"></i></a>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colspan="5">
                                    <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class EntitesComponent implements OnInit {
    //@ViewChild('typesEntitiesSelector') typesEntitiesSelector: ElementRef;
    private typeSelectedValue : any;
    /**
     * La liste des entites a afficher
     */
    private entites : EntiteServerSideInputData;

    /**
     * Liste des types d'entité existant
     */
    private typesEntities : ITypeLabel[];

    /**
     * Affiche la liste des clubs
     */
    private displayTypes : number[];

    /**
     * Affichage pour seléction
     */
    private forSelect : boolean;

    /**
     * Affiche les entités enfant de l'entité d'id de childOf
     */
    private childOf : string;

    private childOfName : string;

    private isFederationExclusive : boolean;

    //private typesEntitiesSelectorElement: JQuery;

    constructor(
            private router: Router,
            private route: ActivatedRoute,
            private entitesService : EntitesService,
            private navigatorService : NavigatorService) {
       
    }

    ngOnInit() {
        this.isFederationExclusive = false;

        if(this.route.snapshot.url && this.route.snapshot.url.length > 0) {
            if(this.route.snapshot.url[0].path == "federations") {
                this.displayTypes = [0];
                this.isFederationExclusive = true;
            }

            if(this.route.snapshot.url[0].path == "clubs")
                this.displayTypes = [1,2,3];
        }

        if(this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }

        if(this.route.snapshot.queryParams["childOf"]) {
            this.childOf = this.route.snapshot.queryParams["childOf"];
            this.entitesService.getEntityName(this.childOf).then(en => this.childOfName = en);
        }
        

        this.navigatorService.pushUrlSegments(!this.isFederationExclusive ? 'Entités' : 'Fédérations', this.route.snapshot.url, this.route.snapshot.queryParams);

        this.entites = new EntiteServerSideInputData(this.entitesService);
        this.entites.filter(this.displayTypes, this.childOf);

        this.entitesService.getTypeEntite().then(ta => this.typesEntities = ta);
    }

    ngAfterViewInit() {
        /*let that = this;

        this.typesEntitiesSelectorElement = jQuery(this.typesEntitiesSelector.nativeElement);
        this.typesEntitiesSelectorElement.select2({
            placeholder: "Categories",
            allowClear: true
        });
        this.typesEntitiesSelectorElement.prop("disabled", this.isFederationExclusive);
        this.typesEntitiesSelectorElement.on('select2:select', function (e: Event) {
            that.displayTypes = that.typesEntitiesSelectorElement.val().map(v => parseInt(v));
            that.onChangeTypeFilter();
        });
        this.typesEntitiesSelectorElement.on('select2:unselect', function (e: Event) {
            that.displayTypes = that.typesEntitiesSelectorElement.val().map(v => parseInt(v));
            that.onChangeTypeFilter();
        });*/
    }

    public onValueChanged(value) {
        this.displayTypes = value.map(v => parseInt(v)); //.val().map(v => parseInt(v));
        this.entites.filter(this.displayTypes, this.childOf, this.entites.term);
    }

    public onChangeTypeFilter() {
        /*this.displayTypes = this.typeSelectedValue.map(v => parseInt(v)); //.val().map(v => parseInt(v));
        this.entites.filter(this.displayTypes, this.childOf, this.entites.term);*/
    }

    public select(entite : IEntite) {
        this.navigatorService.goBack(this.router, entite, -1);
    }
}