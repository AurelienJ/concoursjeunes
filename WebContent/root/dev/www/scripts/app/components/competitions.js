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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var navigator_1 = require("../services/navigator");
var competitions_1 = require("../services/competitions");
var CompetitionsComponent = (function () {
    function CompetitionsComponent(router, route, navigatorService, competitionsService) {
        this.router = router;
        this.route = route;
        this.navigatorService = navigatorService;
        this.competitionsService = competitionsService;
    }
    CompetitionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.competitionsService.getCompetitionsDescription().then(function (c) { return _this.competitions = c; });
    };
    return CompetitionsComponent;
}());
CompetitionsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'competitions',
        template: "<titlebar title=\"Comp\u00E9titions\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">Liste des r\u00E9glements</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\"><a href=\"#/competitions/new\" class=\"btn btn-app\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                            </div>\n                            <div class=\"col-sm-6 form-inline\">\n                                <div class=\"pull-right form-group\">\n                                    <div class=\"input-group\">\n                                        <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                        <input type=\"search\" class=\"form-control input-sm\" #search (keyup)=\"0\" placeholder=\"Recherche...\" />\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\t\t\t\t\t\t<table class=\"table table-bordered table-hover\" [mfData]=\"competitions | tableFilter : [search.value]\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"date\">Date</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"type\">Type</mfDefaultSorter></th>\n\t\t\t\t\t\t\t\t<th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let competition of mf.data\">\n\t\t\t\t\t\t\t\t<td>{{competition.date | date : 'dd/MM/yyyy'}}</td>\n\t\t\t\t\t\t\t\t<td>{{competition.type}}</td>\n                                <td><a href=\"#/competitions/{{competition.id}}\">{{competition.name}}</a></td>\n                                \n                                <td>\n                                    <a href=\"#/competitions/{{competition.id}}\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n                                    <a href=\"javascript:void(0)\" *ngIf=\"forSelect\" (click)=\"select(competition)\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\" title=\"Selectionner\"></i></a>\n                                </td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        navigator_1.NavigatorService,
        competitions_1.CompetitionsService])
], CompetitionsComponent);
exports.CompetitionsComponent = CompetitionsComponent;

//# sourceMappingURL=competitions.js.map
