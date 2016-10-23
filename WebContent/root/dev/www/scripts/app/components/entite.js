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
var entites_1 = require('../services/entites');
var EntiteComponent = (function () {
    function EntiteComponent(route, entitesService) {
        this.route = route;
        this.entitesService = entitesService;
        this.entite = {};
    }
    EntiteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.entitesService.getEntitie(params['id']).then(function (entite) { return _this.entite = entite; });
        });
    };
    EntiteComponent.prototype.onSubmit = function () {
    };
    EntiteComponent = __decorate([
        core_1.Component({
            selector: 'entite',
            template: "<div class=\"content-header\">\n    <h1>Entites</h1>\n    <ol class=\"breadcrumb\">\n        <li>Accueil</li>\n        <li>Entites</li>\n        <li class=\"active\">{{entite.nom}}</li>\n    </ol>\n    </div>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">{{entite.nom}}</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <form class=\"form-horizontal\">\n                        <section class=\"formulaire\">\n                            <h4>Identit\u00E9</h4>\n                            \n                            <div class=\"form-group\">\n                                <label for=\"entityName\" class=\"col-sm-2 control-label\">Nom</label>\n                                <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Nom\" id=\"entityName\" name=\"entityName\" class=\"form-control\" [(ngModel)]=\"entite.nom\"/></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"entityReference\" class=\"col-sm-2 control-label\">R\u00E9f\u00E9rence</label>\n                                <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"R\u00E9f\u00E9rence\" id=\"entityReference\" name=\"entityReference\" class=\"form-control\" [(ngModel)]=\"entite.reference\" /></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"entityType\" class=\"col-sm-2 control-label\">Type</label>\n                                <div class=\"col-sm-10\"><select id=\"entityType\" name=\"entityType\" class=\"form-control\">\n                                    <option>F\u00E9d\u00E9ration</option>\n                                    <option>Club</option>\n                                </select></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label class=\"col-sm-2 control-label\">F\u00E9d\u00E9ration</label>\n                                <div class=\"col-sm-10\"><span *ngIf=\"entite.entiteParent != null\">{{entite.entiteParent.nom}}</span>\n                                <a href=\"#\" id=\"entityFederation\" class=\"input\">Choisir...</a></div>\n                            </div>\n                        </section>\n\n                        <section class=\"formulaire\">\n                            <h4>Coordonn\u00E9es</h4>\n                            \n                            <div class=\"form-group\">\n                                <label for=\"entityAddress\" class=\"col-sm-2 control-label\">Adresse</label>\n                                <div class=\"col-sm-10\"><textarea rows=\"4\" placeholder=\"Adresse\" id=\"entityAddress\" name=\"entityAddress\" class=\"form-control\" [(ngModel)]=\"entite.adresse\"></textarea></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"entityZipCode\" class=\"col-sm-2 control-label\">Code postal</label>\n                                <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Code postal\" id=\"entityZipCode\" name=\"entityZipCode\" class=\"form-control\" [(ngModel)]=\"entite.codePostal\"/></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"entityCity\" class=\"col-sm-2 control-label\">Ville</label>\n                                <div class=\"col-sm-10\"><input placeholder=\"Ville\" id=\"entityCity\" name=\"entityCity\" class=\"form-control\" [(ngModel)]=\"entite.ville\" /></div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"entityCountry\" class=\"col-sm-2 control-label\">Pays</label>\n                                <div class=\"col-sm-10\"><select id=\"entityCountry\" name=\"entityCountry\" class=\"form-control\" >\n                                    <option>France</option>\n                                </select></div>\n                            </div>\n                        </section>\n\n                        <section class=\"formulaire\">\n                            <h4>Divers</h4>\n                            <div class=\"form-group\">\n                                <label for=\"entityNotes\" class=\"col-sm-2 control-label\">Notes</label>\n                                <div class=\"col-sm-10\"><textarea rows=\"8\" placeholder=\"Notes\" id=\"entityNotes\" name=\"entityNotes\" class=\"form-control\" [(ngModel)]=\"entite.note\"></textarea></div>\n                            </div>\n                        </section>\n\n                        <button class=\"btn btn-primary pull-right\" type=\"button\">Annuler</button>\n                        <button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"button\">Valider</button>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, entites_1.EntitesService])
    ], EntiteComponent);
    return EntiteComponent;
}());
exports.EntiteComponent = EntiteComponent;

//# sourceMappingURL=entite.js.map
