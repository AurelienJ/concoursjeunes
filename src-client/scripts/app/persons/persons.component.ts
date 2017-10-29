///<reference path="../_references.ts"/>
import { Component, EventEmitter, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from '../datatable/DataTable';

import { IEntite } from '../entites/ientite';
import { IPerson } from './IPerson';

import { PersonsService } from './persons.service';
import { NavigatorService } from '../general/navigator.service';

export class PersonServerSideInputData implements InputData {
    private cachedData : IPerson[];
    private cachedSize : number;

    private sortBy: string | string[];
    private sortOrder: string[];


    public term : string;

    private mustReload = true;

    public onDataChange : EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

	constructor(private personsService : PersonsService) {

	}

    public filter(term? : string) {
        if(term != this.term)
        {
            this.term = term;
            this.mustReload = true;
            this.onDataChange.emit({length : 0})
        }
    }

    public size() : Promise<number> {
        if(this.cachedSize && !this.mustReload)
            return new Promise<number>(resolve => resolve(this.cachedSize));

        return this.personsService.countPersons(this.term)
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

        return this.personsService.getPersons(this.term, 
                this.sortBy, this.sortOrder,
                start, end).then(entites => {
            this.cachedData = entites;
            this.mustReload = false;
            return entites;
        });
    }
}

@Pipe({
    name: 'personServerSideInputDataFilter'
})
export class PersonServerSideInputDataFilterPipe implements PipeTransform {
    private tempo : any;
    transform(value: PersonServerSideInputData, args: string[]): any {

        let filter : string = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        
        //n'envoi au max qu'une requete toute les 300ms pour eviter de trop spammer le serveur
        if(this.tempo)
            clearTimeout(this.tempo);

        this.tempo = setTimeout(() => {
            value.filter(filter);
        }, 300);

        return value;
    }
}

@Component({
    selector: 'persons',
    template: `<titlebar title="Personnes"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Liste des personnes</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <a [routerLink]="['/persons','new']" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un contact</a>
                                <a [routerLink]="['/persons','newArcher']" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un archer</a>
                            </div>
                            <div class="col-sm-6 form-inline">
                                <div class="pull-right form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></span>
                                        <input type="search" class="form-control input-sm" #search (keyup)="0" placeholder="Recherche..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-bordered table-hover table-valign-middle" [mfData]="persons | personServerSideInputDataFilter : [search.value]" #mf="mfDataTable" [mfRowsOnPage]="10">
                            <thead>
                            <tr>
                                <th><mfDefaultSorter by="nom">Nom</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="reference">Licence</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="ville">Ville</mfDefaultSorter></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let person of mf.data">
                                <td>
                                    <a *ngIf="!forSelect" [routerLink]="['/persons', person.id]">{{person.name}} {{person.firstName}}</a>
                                    <a *ngIf="forSelect" href="javascript:void(0)" (click)="select(person)">{{person.name}} {{person.firstName}}</a>
                                </td>
                                <td>{{person.numLicenceArcher}}</td>
                                <td>{{person.city}}</td>
                                <td>
                                    <a [routerLink]="['/persons', person.id]" class="btn btn-link"><i class="fa fa-pencil" title="Editer"></i></a>
                                    <a href="javascript:void(0)" *ngIf="forSelect" (click)="select(person)" class="btn btn-link"><i class="fa fa-cart-plus" aria-hidden="true" title="Selectionner"></i></a>
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
export class PersonsComponent implements OnInit {
	public persons : PersonServerSideInputData;
    
    /**
     * Affichage pour seléction
     */
    public forSelect : boolean;

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private navigatorService : NavigatorService,
        private personsService : PersonsService) {

	}

	ngOnInit() {
        this.navigatorService.pushUrlSegments("Pesonnes", this.route.snapshot.url, this.route.snapshot.queryParams);
        
        if(this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }

        this.persons = new PersonServerSideInputData(this.personsService);
	}

    public select(person : IPerson) {
        this.navigatorService.goBack(this.router, person, 'person', -1);
    }
}