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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var navigator_service_1 = require("../general/navigator.service");
var NavigationSnapshot_1 = require("../general/NavigationSnapshot");
var competitions_service_1 = require("./competitions.service");
var CompetitionComponent = /** @class */ (function () {
    function CompetitionComponent(route, router, navigation, competitionService) {
        this.route = route;
        this.router = router;
        this.navigation = navigation;
        this.competitionService = competitionService;
        this.competition = {};
    }
    CompetitionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id'] != "new") {
                _this.idCompetition = params['id'];
            }
            else {
                _this.idCompetition = undefined;
            }
            var currentNavigationSnapshot = _this.navigation.getCurrentNavigationSnapshot();
            var currentPath = NavigationSnapshot_1.NavigationSnapshot.getPath(_this.route.snapshot.url).join("/");
            if (currentNavigationSnapshot
                && currentPath == currentNavigationSnapshot.path.join("/")
                && currentNavigationSnapshot.stateData
                && currentNavigationSnapshot.stateData.id == _this.idCompetition) {
                _this.competition = currentNavigationSnapshot.stateData;
                if (currentNavigationSnapshot.returnData) {
                    var rule = currentNavigationSnapshot.returnData;
                    _this.competition.idRule = rule.id;
                    _this.competition.rule = rule;
                }
            }
            else {
                _this.navigation.pushUrlSegments("Compétition", _this.route.snapshot.url, null);
                currentNavigationSnapshot = _this.navigation.getCurrentNavigationSnapshot();
                if (_this.idCompetition) {
                    _this.competitionService.getCompetition(_this.idCompetition).then(function (c) {
                        _this.competition = c;
                        currentNavigationSnapshot.label = c.name;
                        currentNavigationSnapshot.stateData = c;
                    });
                }
                else {
                    _this.competition = {};
                    currentNavigationSnapshot.label = "Nouvelle compétition";
                    currentNavigationSnapshot.stateData = _this.competition;
                }
            }
        });
    };
    CompetitionComponent.prototype.validate = function () {
        var _this = this;
        this.competitionService.saveCompetition(this.competition).then(function (c) {
            _this.navigation.goBack(_this.router, null, -1);
        }).catch(function (reason) {
            _this.error = reason;
        });
        ;
    };
    CompetitionComponent.prototype.cancel = function () {
        this.navigation.goBack(this.router, null, -1);
    };
    CompetitionComponent = __decorate([
        core_1.Component({
            selector: 'competition',
            template: "<titlebar title=\"{{competition.name || 'Competition'}}\"></titlebar>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <form class=\"form-horizontal\" #competitionForm=\"ngForm\" (ngSubmit)=\"validate()\">\n                <div class=\"nav-tabs-custom\">\n                    <ul class=\"nav nav-tabs\">\n                        <li [class.active]=\"!activePane || activePane=='parametrage'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\">Param\u00E9trage</a></li>\n                    </ul>\n                    <div class=\"tab-content main-pane\">\n                        <div class=\"tab-pane\" id=\"parametrage\" [class.active]=\"!activePane || activePane=='parametrage'\">\n                            <div class=\"box box-info\">\n                                <div class=\"box-header with-border\">\n                                    <h4>Informations g\u00E9n\u00E9ral</h4>\n                                </div>\n                                <div class=\"box-body\">\n                                    <div class=\"form-group\">\n                                        <label for=\"competitionName\" class=\"col-sm-2 control-label\">Nom</label>\n                                        <div class=\"col-sm-10\">\n                                            <input type=\"text\" \n                                                id=\"competitionName\" name=\"competitionName\"\n                                                [(ngModel)]=\"competition.name\"\n                                                required maxlength=\"128\"\n                                                placeholder=\"Nom\" class=\"form-control\" /></div>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <label for=\"competitionPlace\" class=\"col-sm-2 control-label\">Lieu</label>\n                                        <div class=\"col-sm-10\">\n                                            <input type=\"text\"\n                                                id=\"competitionPlace\" name=\"competitionPlace\"\n                                                [(ngModel)]=\"competition.place\"\n                                                required maxlength=\"128\"\n                                                placeholder=\"Lieu\" class=\"form-control\"/></div>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <label class=\"col-sm-2 control-label\">Date</label>\n                                        <div class=\"col-sm-10\">\n                                        <p class=\"form-control-static\">\n                                            <a href=\"javascript:void(0)\" (click)=\"drp.toggle()\">\n                                            <span *ngIf=\"competition.dates\">Du {{competition.dates && competition.dates[0] | date:'dd/MM/yyyy'}} au {{competition.dates && competition.dates[1] | date:'dd/MM/yyyy'}}</span>\n                                            <span *ngIf=\"!competition.dates\">S\u00E9l\u00E9ctionner les dates de la comp\u00E9tition</span>\n                                            </a>\n                                            <bs-daterangepicker #drp [bsConfig]=\"{ containerClass: 'theme-dark-blue', locale: 'fr'}\" [(bsValue)]=\"competition.dates\" placement=\"bottom\" style=\"display: block\"></bs-daterangepicker>\n                                        </p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"box box-info\">\n                                <div class=\"box-header with-border\">\n                                    <h4>Comp\u00E9tition</h4>\n                                </div>\n                                <div class=\"box-body\">\n                                    <div class=\"form-group\">\n                                        <label class=\"col-md-3 col-lg-2 control-label\">R\u00E9glement</label>\n                                        <div class=\"col-md-9 col-lg-10\">\n                                        <p class=\"form-control-static\">\n                                        <a [routerLink]=\"['/rules', competition.idRule]\" *ngIf=\"competition.rule\">{{competition.rule.name}}</a> - \n                                        <a [routerLink]=\"['/rules']\" [queryParams]=\"{forSelect : true}\">Choisir...</a>\n                                        </p>\n                                        </div>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <label class=\"col-sm-2 control-label\" for=\"competitionPhasesFinal\">Phases Finale</label>\n                                        <div class=\"col-sm-10\">\n                                            <div class=\"checkbox\">\n                                                <label><input type=\"checkbox\" name=\"competitionPhasesFinal\"\n                                                [(ngModel)]=\"competition.duel\"/></label>\n                                            </div>\n                                        </div>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <label for=\"competitionTargetsNumber\" class=\"col-sm-2 control-label\">Nombre de cibles</label>\n                                        <div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de cibles\" id=\"competitionTargetsNumber\" name=\"competitionTargetsNumber\" class=\"form-control\" [(ngModel)]=\"competition.targetsnumber\"/></div>\n                                    </div>\n\n                                    <div class=\"form-group\">\n                                        <label for=\"competitionStartsNumber\" class=\"col-sm-2 control-label\">Nombre de d\u00E9part</label>\n                                        <div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de d\u00E9parts\" id=\"competitionStartsNumber\" name=\"competitionStartsNumber\" class=\"form-control\" [(ngModel)]=\"competition.startsnumber\"/></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n\t\t\t\t{{error}}\n\t\t\t\t</div>\n\n                <button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n\t\t\t\t<button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"submit\" [disabled]=\"competitionForm.invalid\">Valider</button>\n                </form>\n            </div>\n        </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            navigator_service_1.NavigatorService,
            competitions_service_1.CompetitionsService])
    ], CompetitionComponent);
    return CompetitionComponent;
}());
exports.CompetitionComponent = CompetitionComponent;

//# sourceMappingURL=competition.component.js.map
