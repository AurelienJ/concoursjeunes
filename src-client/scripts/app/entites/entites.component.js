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
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../_references.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var entites_service_1 = require("./entites.service");
var navigator_service_1 = require("../general/navigator.service");
var EntiteServerSideInputData = /** @class */ (function () {
    function EntiteServerSideInputData(entitesService) {
        this.entitesService = entitesService;
        this.mustReload = true;
        this.onDataChange = new core_1.EventEmitter();
    }
    EntiteServerSideInputData.prototype.filter = function (types, childOf, term) {
        if (types != this.types || this.childOf != childOf || term != this.term) {
            this.types = types;
            this.childOf = childOf;
            this.term = term;
            this.mustReload = true;
            this.onDataChange.emit({ length: 0 });
        }
    };
    EntiteServerSideInputData.prototype.size = function () {
        var _this = this;
        if (this.cachedSize && !this.mustReload)
            return new Promise(function (resolve) { return resolve(_this.cachedSize); });
        return this.entitesService.countEntities(this.types, this.childOf, this.term)
            .then(function (size) {
            _this.cachedSize = size;
            _this.mustReload = false;
            return size;
        });
    };
    EntiteServerSideInputData.prototype.orderBy = function (sortBy, sortOrder) {
        if (sortBy != this.sortBy || sortOrder != this.sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.mustReload = true;
        }
    };
    EntiteServerSideInputData.prototype.slice = function (start, end) {
        var _this = this;
        if (this.cachedData && !this.mustReload)
            return new Promise(function (resolve) { return resolve(_this.cachedData); });
        return this.entitesService.getEntities(this.types, this.childOf, this.term, this.sortBy, this.sortOrder, start, end).then(function (entites) {
            _this.cachedData = entites;
            _this.mustReload = false;
            return entites;
        });
    };
    return EntiteServerSideInputData;
}());
exports.EntiteServerSideInputData = EntiteServerSideInputData;
var EntiteServerSideInputDataFilterPipe = /** @class */ (function () {
    function EntiteServerSideInputDataFilterPipe() {
    }
    EntiteServerSideInputDataFilterPipe.prototype.transform = function (value, args) {
        var filter = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        //n'envoi au max qu'une requete toute les 300ms pour eviter de trop spammer le serveur
        if (this.tempo)
            clearTimeout(this.tempo);
        this.tempo = setTimeout(function () {
            value.filter(value.types, value.childOf, filter);
        }, 300);
        return value;
    };
    EntiteServerSideInputDataFilterPipe = __decorate([
        core_1.Pipe({
            name: 'entiteServerSideInputDataFilter'
        })
    ], EntiteServerSideInputDataFilterPipe);
    return EntiteServerSideInputDataFilterPipe;
}());
exports.EntiteServerSideInputDataFilterPipe = EntiteServerSideInputDataFilterPipe;
var EntitesComponent = /** @class */ (function () {
    //private typesEntitiesSelectorElement: JQuery;
    function EntitesComponent(router, route, entitesService, navigatorService) {
        this.router = router;
        this.route = route;
        this.entitesService = entitesService;
        this.navigatorService = navigatorService;
        /**
         * Affiche la liste des clubs
         */
        this.displayTypes = [];
        this.dataLoading = false;
    }
    EntitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isFederationExclusive = false;
        if (this.route.snapshot.url && this.route.snapshot.url.length > 0) {
            if (this.route.snapshot.url[0].path == "federations") {
                this.displayTypes = [0];
                this.isFederationExclusive = true;
            }
            if (this.route.snapshot.url[0].path == "clubs")
                this.displayTypes = [1, 2, 3];
        }
        if (this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }
        if (this.route.snapshot.queryParams["childOf"]) {
            this.childOf = this.route.snapshot.queryParams["childOf"];
            this.entitesService.getEntityName(this.childOf).then(function (en) { return _this.childOfName = en; });
        }
        this.navigatorService.pushUrlSegments(!this.isFederationExclusive ? 'Entités' : 'Fédérations', this.route.snapshot.url, this.route.snapshot.queryParams);
        this.entites = new EntiteServerSideInputData(this.entitesService);
        this.entites.filter(this.displayTypes, this.childOf);
        this.dataLoading = true;
        this.entitesService.getTypeEntite().then(function (ta) {
            _this.typesEntities = ta;
            _this.dataLoading = false;
        });
    };
    EntitesComponent.prototype.ngAfterViewInit = function () {
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
    };
    EntitesComponent.prototype.onValueChanged = function (value) {
        if (!this.dataLoading) {
            this.displayTypes = value.map(function (v) { return parseInt(v); }); //.val().map(v => parseInt(v));
            this.entites.filter(this.displayTypes, this.childOf, this.entites.term);
        }
    };
    EntitesComponent.prototype.onChangeTypeFilter = function () {
        /*this.displayTypes = this.typeSelectedValue.map(v => parseInt(v)); //.val().map(v => parseInt(v));
        this.entites.filter(this.displayTypes, this.childOf, this.entites.term);*/
    };
    EntitesComponent.prototype.select = function (entite) {
        this.navigatorService.goBack(this.router, entite, -1);
    };
    EntitesComponent = __decorate([
        core_1.Component({
            selector: 'entites',
            template: "<titlebar title=\"{{!isFederationExclusive ? 'Entit\u00E9s' : 'F\u00E9d\u00E9rations'}}\"></titlebar>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">Liste des entit\u00E9s</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <a href=\"#/newentity\" class=\"btn btn-app\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                            </div>\n                            <div class=\"col-sm-10 form-inline\">\n                                <div class=\"row\">\n                                    <div class=\"col-xs-12 col-lg-9 form-group\">\n                                        <select select2 id=\"categories\" name=\"categories\" class=\"form-control input-sm\" \n                                                multiple=\"multiple\" style=\"width: 100%;\"\n                                                [disable]=\"isFederationExclusive\" [placeHolder]=\"'Cat\u00E9gories'\"\n                                                (valueChange)=\"onValueChanged($event)\">\n                                            <option *ngFor=\"let typeEntity of typesEntities\"\n                                                [value]=\"typeEntity.id\" [attr.selected]=\"displayTypes && displayTypes.indexOf(typeEntity.id)>-1 ? 'selected' : null\">{{typeEntity.label}}</option>\n                                        </select>\n                                    </div>\n                                    <div class=\"col-lg-3 form-group pull-right\">\n                                        <div class=\"input-group\">\n                                            <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                            <input type=\"search\" class=\"form-control\" #search (keyup)=\"0\" placeholder=\"Recherche...\" />\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\">\n                                <div class=\"col-sm-12 form-group\">\n                                <span *ngIf=\"childOfName\">Entit\u00E9s relative \u00E0 <a href=\"#/entities/{{childOf}}\">{{childOfName}}</a></span>\n                                </div>\n                                </div>\n                            </div>\n                        </div>\n                        <table class=\"table table-bordered table-hover table-valign-middle\" [mfData]=\"entites | entiteServerSideInputDataFilter : [search.value]\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th class=\"hidden-xs\"><mfDefaultSorter by=\"reference\">R\u00E9f\u00E9rence</mfDefaultSorter></th>\n                                <th class=\"hidden-xs\"><mfDefaultSorter by=\"ville\">Ville</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"category\">Cat\u00E9gorie</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let entite of mf.data\">\n                                <td>\n                                    <a *ngIf=\"!forSelect\" [routerLink]=\"['/entities', entite.id]\">{{entite.nom}}</a>\n                                    <a *ngIf=\"forSelect\" href=\"javascript:void(0)\" (click)=\"select(entite)\">{{entite.nom}}</a>\n                                </td>\n                                <td class=\"hidden-xs\">{{entite.reference}}</td>\n                                <td class=\"hidden-xs\">{{entite.ville}}</td>\n                                <td><span class=\"label\" [class.label-success]=\"entite.type == 0\" \n                                    [class.label-warning]=\"entite.type == 1\" [class.label-primary]=\"entite.type == 2\" \n                                    [class.label-danger]=\"entite.type == 3\">{{(typesEntities[entite.type]||{}).label || ''}}</span></td>\n                                <td>\n                                    <a [routerLink]=\"['/clubs']\" [queryParams]=\"{ childOf: entite.id }\" *ngIf=\"entite.type < 3\" class=\"btn btn-link\"><i class=\"fa fa-list\" aria-hidden=\"true\" title=\"entit\u00E9s associ\u00E9es\"></i></a>\n                                    <a [routerLink]=\"['/entities', entite.id]\" class=\"btn btn-link\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n                                    <a href=\"javascript:void(0)\" *ngIf=\"forSelect\" (click)=\"select(entite)\" class=\"btn btn-link\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\" title=\"Selectionner\"></i></a>\n                                </td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            entites_service_1.EntitesService,
            navigator_service_1.NavigatorService])
    ], EntitesComponent);
    return EntitesComponent;
}());
exports.EntitesComponent = EntitesComponent;

//# sourceMappingURL=entites.component.js.map
