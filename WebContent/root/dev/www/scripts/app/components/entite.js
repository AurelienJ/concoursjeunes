"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="../_references.ts"/>
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var NavigationSnapshot_1 = require('../models/NavigationSnapshot');
var entites_1 = require('../services/entites');
var persons_1 = require('../services/persons');
var references_1 = require('../services/references');
var navigator_1 = require('../services/navigator');
require('rxjs/add/operator/share');
var EntiteComponent = (function () {
    function EntiteComponent(router, route, references, entitesService, personsService, navigatorService) {
        this.router = router;
        this.route = route;
        this.references = references;
        this.entitesService = entitesService;
        this.personsService = personsService;
        this.navigatorService = navigatorService;
        this.entite = {};
        this.persons = [];
        this.mustUpdateView = false;
    }
    EntiteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.idEntity = params['id'];
            _this.mustUpdateView = true;
        });
        this.route.url.subscribe(function (url) {
            _this.url = url;
            _this.mustUpdateView = true;
        });
        this.entitesService.getTypeEntite().then(function (typeEntite) { return _this.typesEntite = typeEntite; });
        this.references.getCountries().then(function (countries) { return _this.countries = countries; });
    };
    EntiteComponent.prototype.ngDoCheck = function () {
        if (this.mustUpdateView) {
            this.mustUpdateView = false;
            this.updateView();
        }
    };
    EntiteComponent.prototype.cancel = function () {
        this.navigatorService.goBack(this.router, null, -1);
    };
    EntiteComponent.prototype.validate = function () {
        var _this = this;
        this.entitesService.saveEntite(this.entite).then(function (entite) {
            _this.navigatorService.goBack(_this.router, null, -1);
        }).catch(function (reason) {
            _this.error = reason;
        });
    };
    EntiteComponent.prototype.updateView = function () {
        var _this = this;
        var currentNavigationSnapshot = this.navigatorService.getCurrentNavigationSnapshot();
        var currentPath = NavigationSnapshot_1.NavigationSnapshot.getPath(this.url).join("/");
        if (this.entite && this.entite.id == this.idEntity)
            return;
        if (currentNavigationSnapshot
            && currentPath == currentNavigationSnapshot.path.join("/")
            && currentNavigationSnapshot.stateData
            && currentNavigationSnapshot.stateData.id == this.idEntity) {
            this.entite = currentNavigationSnapshot.stateData;
            this.personsService.getPersonsForEntity(this.entite.id).then(function (p) { return _this.persons = p; });
            if (currentNavigationSnapshot.returnData)
                this.entite.entiteParent = currentNavigationSnapshot.returnData;
        }
        else {
            this.navigatorService.pushUrlSegments("Entite", this.url, null);
            currentNavigationSnapshot = this.navigatorService.getCurrentNavigationSnapshot();
            if (this.idEntity) {
                this.entitesService.getEntitie(this.idEntity).then(function (entite) {
                    _this.entite = entite;
                    _this.personsService.getPersonsForEntity(entite.id).then(function (p) { return _this.persons = p; });
                    currentNavigationSnapshot.label = entite.nom;
                    currentNavigationSnapshot.stateData = entite;
                });
            }
            else {
                this.entite = {};
                currentNavigationSnapshot.label = "Nouvel entité";
                currentNavigationSnapshot.stateData = this.entite;
            }
        }
    };
    EntiteComponent = __decorate([
        core_1.Component({
            selector: 'entite',
            template: "<titlebar title=\"{{entite.nom}}\"></titlebar>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <form class=\"form-horizontal\">\n\t\t\t    <div class=\"nav-tabs-custom\">\n\t\t\t\t\t<ul class=\"nav nav-tabs\">\n\t\t\t\t\t\t<li [class.active]=\"!activePane || activePane=='identity'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='identity'\">Identit\u00E9</a></li>\n\t\t\t\t\t\t<li [class.active]=\"activePane=='contacts'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='contacts'\">Contacts</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div class=\"tab-content\">\n\t\t\t\t\t\t<div id=\"identity\" class=\"tab-pane\" [class.active]=\"!activePane || activePane=='identity'\">\n                            <section class=\"formulaire\">\n                                <h4>Identit\u00E9</h4>\n                                \n                                <div class=\"form-group\">\n                                    <label for=\"entityName\" class=\"col-sm-2 control-label\">Nom</label>\n                                    <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Nom\" id=\"entityName\" name=\"entityName\" class=\"form-control\" [(ngModel)]=\"entite.nom\"/></div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"entite.type == 0\">\n                                    <label for=\"entitySigle\" class=\"col-sm-2 control-label\">Sigle</label>\n                                    <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Sigle\" id=\"entitySigle\" name=\"entitySigle\" class=\"form-control\" [(ngModel)]=\"entite.sigle\" /></div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"entityReference\" class=\"col-sm-2 control-label\">R\u00E9f\u00E9rence</label>\n                                    <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"R\u00E9f\u00E9rence\" id=\"entityReference\" name=\"entityReference\" class=\"form-control\" [(ngModel)]=\"entite.reference\" /></div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"entityType\" class=\"col-sm-2 control-label\">Type</label>\n                                    <div class=\"col-sm-10\"><select id=\"entityType\" name=\"entityType\" class=\"form-control\" [(ngModel)]=\"entite.type\">\n                                        <option *ngFor=\"let typeEntite of typesEntite\" value=\"{{typeEntite.id}}\">{{typeEntite.label}}</option>\n                                    </select></div>\n                                </div>\n                                <div class=\"form-group\" *ngIf=\"entite.type != 0\">\n                                    <label class=\"col-sm-2 control-label\">F\u00E9d\u00E9ration</label>\n                                    <div class=\"col-sm-10\"><span *ngIf=\"entite.entiteParent != null\">{{entite.entiteParent.nom}}</span>\n                                    <a [routerLink]=\"['/federations']\" [queryParams]=\"{forSelect : true}\" id=\"entityFederation\" class=\"input\">Choisir...</a></div>\n                                </div>\n                            </section>\n\n                            <section class=\"formulaire\">\n                                <h4>Coordonn\u00E9es</h4>\n                                \n                                <div class=\"form-group\">\n                                    <label for=\"entityAddress\" class=\"col-sm-2 control-label\">Adresse</label>\n                                    <div class=\"col-sm-10\"><textarea rows=\"4\" placeholder=\"Adresse\" id=\"entityAddress\" name=\"entityAddress\" class=\"form-control\" [(ngModel)]=\"entite.adresse\"></textarea></div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"entityZipCode\" class=\"col-sm-2 control-label\">Code postal</label>\n                                    <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Code postal\" id=\"entityZipCode\" name=\"entityZipCode\" class=\"form-control\" [(ngModel)]=\"entite.codePostal\"/></div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"entityCity\" class=\"col-sm-2 control-label\">Ville</label>\n                                    <div class=\"col-sm-10\"><input placeholder=\"Ville\" id=\"entityCity\" name=\"entityCity\" class=\"form-control\" [(ngModel)]=\"entite.ville\" /></div>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label for=\"entityCountry\" class=\"col-sm-2 control-label\">Pays</label>\n                                    <div class=\"col-sm-10\"><select id=\"entityCountry\" name=\"entityCountry\" class=\"form-control\" [(ngModel)]=\"entite.pays\">\n                                        <option *ngFor=\"let country of countries\" value=\"{{country.code}}\">{{country.libelle}}</option>\n                                    </select></div>\n                                </div>\n                            </section>\n\n                            <section class=\"formulaire\">\n                                <h4>Divers</h4>\n                                <div class=\"form-group\">\n                                    <label for=\"entityNotes\" class=\"col-sm-2 control-label\">Notes</label>\n                                    <div class=\"col-sm-10\"><textarea rows=\"8\" placeholder=\"Notes\" id=\"entityNotes\" name=\"entityNotes\" class=\"form-control\" [(ngModel)]=\"entite.note\"></textarea></div>\n                                </div>\n                            </section>\n                        </div>\n                        <div id=\"contacts\" class=\"tab-pane\" [class.active]=\"activePane=='contacts'\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-6\"><a href=\"#/persons/new\" class=\"btn btn-app\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                                </div>\n                                <div class=\"col-sm-6 form-inline\">\n                                    <div class=\"pull-right form-group\">\n                                        <div class=\"input-group\">\n                                            <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                            <input type=\"search\" class=\"form-control input-sm\" #search (keyup)=\"0\" placeholder=\"Recherche...\" />\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <table class=\"table table-bordered table-hover\" [mfData]=\"persons | tableFilter : [search.value]\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"reference\">R\u00E9f\u00E9rence</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"ville\">Ville</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let person of mf.data\">\n                                <td>{{person.name}} {{person.firstName}}</td>\n                                <td>{{person.reference}}</td>\n                                <td>{{person.city}}</td>\n                                <td>\n                                    <a href=\"#/persons/{{person.id}}\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n                                    <a href=\"javascript:void(0)\" *ngIf=\"forSelect\" (click)=\"select(person)\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\" title=\"Selectionner\"></i></a>\n                                </td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n                        </div>\n                    </div>\n                </div> \n                </form>\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n                {{error}}\n                </div>\n\n                <button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n                <button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"button\" (click)=\"validate()\">Valider</button>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, references_1.ReferencesService, entites_1.EntitesService, persons_1.PersonsService, navigator_1.NavigatorService])
    ], EntiteComponent);
    return EntiteComponent;
}());
exports.EntiteComponent = EntiteComponent;

//# sourceMappingURL=entite.js.map
