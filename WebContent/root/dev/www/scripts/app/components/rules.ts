///<reference path="../_references.ts"/>
import { Component, EventEmitter, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from 'angular2-datatable'

import { IEntite } from '../models/ientite';
import { IRule } from '../models/IRule';
//import { IPerson } from '../models/IPerson';

//import { PersonsService } from '../services/persons';
import { RulesService } from '../services/rules';
import { NavigatorService } from '../services/navigator';

export class RulesServerSideInputData implements InputData {
    private cachedData : IRule[];
    private cachedSize : number;

    private sortBy: string | string[];
    private sortOrder: string[];


    public term : string;

    private mustReload = true;

    public onDataChange : EventEmitter<DataEvent> = new EventEmitter<DataEvent>();

	constructor(private rulesService : RulesService) {

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

        return this.rulesService.countRules(this.term)
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

        return this.rulesService.getRules(this.term, 
                this.sortBy, this.sortOrder,
                start, end).then(entites => {
            this.cachedData = entites;
            this.mustReload = false;
            return entites;
        });
    }
}

@Pipe({
    name: 'rulesServerSideInputDataFilter'
})
export class RulesServerSideInputDataFilterPipe implements PipeTransform {
    transform(value: RulesServerSideInputData, args: string[]): any {

        let filter = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        
        value.filter(filter);

        return value;
    }
}

@Component({
    selector: 'rules',
    template: `<titlebar title="Réglements"></titlebar>
	<div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Liste des réglements</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-sm-6"><a href="#/rules/new" class="btn btn-app"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter</a>
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
                        <table class="table table-bordered table-hover" [mfData]="rules | rulesServerSideInputDataFilter : [search.value]" #mf="mfDataTable" [mfRowsOnPage]="10">
                            <thead>
                            <tr>
                                <th><mfDefaultSorter by="nom">Nom</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="entite">Propriétaire</mfDefaultSorter></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let rule of mf.data">
                                <td><a href="#/rules/{{rule.id}}">{{rule.name}}</a></td>
                                <td>{{rule.entite}}</td>
                                
                                <td>
                                    <a href="#/rules/{{rule.id}}"><i class="fa fa-pencil" title="Editer"></i></a>
                                    <a href="javascript:void(0)" *ngIf="forSelect" (click)="select(rule)"><i class="fa fa-cart-plus" aria-hidden="true" title="Selectionner"></i></a>
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
export class RulesComponent implements OnInit{
	private rules : RulesServerSideInputData;

	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private navigatorService : NavigatorService,
        private rulesService : RulesService) {

	}

	ngOnInit() {
        this.navigatorService.pushUrlSegments("Réglements", this.route.snapshot.url, this.route.snapshot.queryParams);

        this.rules = new RulesServerSideInputData(this.rulesService);
	}

    public select(rule : IRule) {
        this.navigatorService.goBack(this.router, rule, -1);
    }
}