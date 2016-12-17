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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var persons_1 = require("../services/persons");
var navigator_1 = require("../services/navigator");
var PersonServerSideInputData = (function () {
    function PersonServerSideInputData(personsService) {
        this.personsService = personsService;
        this.mustReload = true;
        this.onDataChange = new core_1.EventEmitter();
    }
    PersonServerSideInputData.prototype.filter = function (term) {
        if (term != this.term) {
            this.term = term;
            this.mustReload = true;
            this.onDataChange.emit({ length: 0 });
        }
    };
    PersonServerSideInputData.prototype.size = function () {
        var _this = this;
        if (this.cachedSize && !this.mustReload)
            return new Promise(function (resolve) { return resolve(_this.cachedSize); });
        return this.personsService.countPersons(this.term)
            .then(function (size) {
            _this.cachedSize = size;
            _this.mustReload = false;
            return size;
        });
    };
    PersonServerSideInputData.prototype.orderBy = function (sortBy, sortOrder) {
        if (sortBy != this.sortBy || sortOrder != this.sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.mustReload = true;
        }
    };
    PersonServerSideInputData.prototype.slice = function (start, end) {
        var _this = this;
        if (this.cachedData && !this.mustReload)
            return new Promise(function (resolve) { return resolve(_this.cachedData); });
        return this.personsService.getPersons(this.term, this.sortBy, this.sortOrder, start, end).then(function (entites) {
            _this.cachedData = entites;
            _this.mustReload = false;
            return entites;
        });
    };
    return PersonServerSideInputData;
}());
exports.PersonServerSideInputData = PersonServerSideInputData;
var PersonServerSideInputDataFilterPipe = (function () {
    function PersonServerSideInputDataFilterPipe() {
    }
    PersonServerSideInputDataFilterPipe.prototype.transform = function (value, args) {
        var filter = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        //n'envoi au max qu'une requete toute les 300ms pour eviter de trop spammer le serveur
        if (this.tempo)
            clearTimeout(this.tempo);
        this.tempo = setTimeout(function () {
            value.filter(filter);
        }, 300);
        return value;
    };
    return PersonServerSideInputDataFilterPipe;
}());
PersonServerSideInputDataFilterPipe = __decorate([
    core_1.Pipe({
        name: 'personServerSideInputDataFilter'
    }),
    __metadata("design:paramtypes", [])
], PersonServerSideInputDataFilterPipe);
exports.PersonServerSideInputDataFilterPipe = PersonServerSideInputDataFilterPipe;
var PersonsComponent = (function () {
    function PersonsComponent(route, router, navigatorService, personsService) {
        this.route = route;
        this.router = router;
        this.navigatorService = navigatorService;
        this.personsService = personsService;
    }
    PersonsComponent.prototype.ngOnInit = function () {
        this.navigatorService.pushUrlSegments("Pesonnes", this.route.snapshot.url, this.route.snapshot.queryParams);
        if (this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }
        this.persons = new PersonServerSideInputData(this.personsService);
    };
    PersonsComponent.prototype.select = function (person) {
        this.navigatorService.goBack(this.router, person, -1);
    };
    return PersonsComponent;
}());
PersonsComponent = __decorate([
    core_1.Component({
        selector: 'persons',
        template: "<titlebar title=\"Personnes\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">Liste des personnes</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\"><a href=\"#/persons/new\" class=\"btn btn-app\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                            </div>\n                            <div class=\"col-sm-6 form-inline\">\n                                <div class=\"pull-right form-group\">\n                                    <div class=\"input-group\">\n                                        <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                        <input type=\"search\" class=\"form-control input-sm\" #search (keyup)=\"0\" placeholder=\"Recherche...\" />\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <table class=\"table table-bordered table-hover\" [mfData]=\"persons | personServerSideInputDataFilter : [search.value]\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"reference\">Licence</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"ville\">Ville</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let person of mf.data\">\n                                <td><a href=\"#/persons/{{person.id}}\">{{person.name}} {{person.firstName}}</a></td>\n                                <td>{{person.numLicenceArcher}}</td>\n                                <td>{{person.city}}</td>\n                                <td>\n                                    <a href=\"#/persons/{{person.id}}\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n                                    <a href=\"javascript:void(0)\" *ngIf=\"forSelect\" (click)=\"select(person)\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\" title=\"Selectionner\"></i></a>\n                                </td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\t"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        navigator_1.NavigatorService,
        persons_1.PersonsService])
], PersonsComponent);
exports.PersonsComponent = PersonsComponent;

//# sourceMappingURL=persons.js.map
