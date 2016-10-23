///<reference path="../_references.ts"/>
import { Component, OnInit } from '@angular/core';

import { IEntite } from '../models/ientite';
import { EntitesService } from '../services/entites';

@Component({
    selector: 'entites',
    template: `<div class="content-header">
    <h1>Entites</h1>
    <ol class="breadcrumb">
        <li>Accueil</li>
        <li class="active">Entites</li>
    </ol>
    </div>
    <div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Liste des entités</h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="col-sm-6"></div>
                            <div class="col-sm-6 form-inline"><label class="pull-right">Recherche : <input type="search" class="form-control input-sm" /></label></div>
                        </div>
                        <table class="table table-bordered table-hover" [mfData]="entites" #mf="mfDataTable" [mfRowsOnPage]="5">
                            <thead>
                            <tr>
                                <th><mfDefaultSorter by="nom">Nom</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="reference">Référence</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="adresse">Adresse</mfDefaultSorter></th>
                                <th><mfDefaultSorter by="ville">Ville</mfDefaultSorter></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr *ngFor="let entite of mf.data">
                                <td>{{entite.nom}}</td>
                                <td>{{entite.reference}}</td>
                                <td>{{entite.adresse}}</td>
                                <td>{{entite.ville}}</td>
                                <td><a href="#/entities/{{entite.id}}">Editer</a></td>
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

    private entites : IEntite[];

    constructor(private entitesService : EntitesService) {
        
    }

    ngOnInit() {
        this.entitesService.getEntities().then(entites => this.entites = entites);
    }
}