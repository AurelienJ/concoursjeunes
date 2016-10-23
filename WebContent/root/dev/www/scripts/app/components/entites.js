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
var entites_1 = require('../services/entites');
var EntitesComponent = (function () {
    function EntitesComponent(entitesService) {
        this.entitesService = entitesService;
    }
    EntitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.entitesService.getEntities().then(function (entites) { return _this.entites = entites; });
    };
    EntitesComponent = __decorate([
        core_1.Component({
            selector: 'entites',
            template: "<div class=\"content-header\">\n    <h1>Entites</h1>\n    <ol class=\"breadcrumb\">\n        <li>Accueil</li>\n        <li class=\"active\">Entites</li>\n    </ol>\n    </div>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">Liste des entit\u00E9s</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\"></div>\n                            <div class=\"col-sm-6 form-inline\"><label class=\"pull-right\">Recherche : <input type=\"search\" class=\"form-control input-sm\" /></label></div>\n                        </div>\n                        <table class=\"table table-bordered table-hover\" [mfData]=\"entites\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"5\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"reference\">R\u00E9f\u00E9rence</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"adresse\">Adresse</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"ville\">Ville</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let entite of mf.data\">\n                                <td>{{entite.nom}}</td>\n                                <td>{{entite.reference}}</td>\n                                <td>{{entite.adresse}}</td>\n                                <td>{{entite.ville}}</td>\n                                <td><a href=\"#/entities/{{entite.id}}\">Editer</a></td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [entites_1.EntitesService])
    ], EntitesComponent);
    return EntitesComponent;
}());
exports.EntitesComponent = EntitesComponent;

//# sourceMappingURL=entites.js.map
