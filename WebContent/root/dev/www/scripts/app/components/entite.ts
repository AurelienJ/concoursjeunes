///<reference path="../_references.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IEntite } from '../models/ientite';
import { EntitesService } from '../services/entites';

@Component({
    selector: 'entite',
    template: `<div class="content-header">
    <h1>Entites</h1>
    <ol class="breadcrumb">
        <li>Accueil</li>
        <li>Entites</li>
        <li class="active">{{entite.nom}}</li>
    </ol>
    </div>
    <div class="content body">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">{{entite.nom}}</h3>
                    </div>
                    <div class="box-body">
                        <form class="form-horizontal">
                        <section class="formulaire">
                            <h4>Identité</h4>
                            
                            <div class="form-group">
                                <label for="entityName" class="col-sm-2 control-label">Nom</label>
                                <div class="col-sm-10"><input type="text" placeholder="Nom" id="entityName" name="entityName" class="form-control" [(ngModel)]="entite.nom"/></div>
                            </div>
                            <div class="form-group">
                                <label for="entityReference" class="col-sm-2 control-label">Référence</label>
                                <div class="col-sm-10"><input type="text" placeholder="Référence" id="entityReference" name="entityReference" class="form-control" [(ngModel)]="entite.reference" /></div>
                            </div>
                            <div class="form-group">
                                <label for="entityType" class="col-sm-2 control-label">Type</label>
                                <div class="col-sm-10"><select id="entityType" name="entityType" class="form-control">
                                    <option>Fédération</option>
                                    <option>Club</option>
                                </select></div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Fédération</label>
                                <div class="col-sm-10"><span *ngIf="entite.entiteParent != null">{{entite.entiteParent.nom}}</span>
                                <a href="#" id="entityFederation" class="input">Choisir...</a></div>
                            </div>
                        </section>

                        <section class="formulaire">
                            <h4>Coordonnées</h4>
                            
                            <div class="form-group">
                                <label for="entityAddress" class="col-sm-2 control-label">Adresse</label>
                                <div class="col-sm-10"><textarea rows="4" placeholder="Adresse" id="entityAddress" name="entityAddress" class="form-control" [(ngModel)]="entite.adresse"></textarea></div>
                            </div>
                            <div class="form-group">
                                <label for="entityZipCode" class="col-sm-2 control-label">Code postal</label>
                                <div class="col-sm-10"><input type="text" placeholder="Code postal" id="entityZipCode" name="entityZipCode" class="form-control" [(ngModel)]="entite.codePostal"/></div>
                            </div>
                            <div class="form-group">
                                <label for="entityCity" class="col-sm-2 control-label">Ville</label>
                                <div class="col-sm-10"><input placeholder="Ville" id="entityCity" name="entityCity" class="form-control" [(ngModel)]="entite.ville" /></div>
                            </div>
                            <div class="form-group">
                                <label for="entityCountry" class="col-sm-2 control-label">Pays</label>
                                <div class="col-sm-10"><select id="entityCountry" name="entityCountry" class="form-control" >
                                    <option>France</option>
                                </select></div>
                            </div>
                        </section>

                        <section class="formulaire">
                            <h4>Divers</h4>
                            <div class="form-group">
                                <label for="entityNotes" class="col-sm-2 control-label">Notes</label>
                                <div class="col-sm-10"><textarea rows="8" placeholder="Notes" id="entityNotes" name="entityNotes" class="form-control" [(ngModel)]="entite.note"></textarea></div>
                            </div>
                        </section>

                        <button class="btn btn-primary pull-right" type="button">Annuler</button>
                        <button class="btn btn-success pull-right" style="margin-right: 5px;" type="button">Valider</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class EntiteComponent implements OnInit {

    private entite : IEntite;

    constructor(private route: ActivatedRoute, private entitesService : EntitesService) {
        this.entite = <IEntite>{ };
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.entitesService.getEntitie(params['id']).then(
                entite => this.entite = entite);
        });
    }

    onSubmit() {

    }
}