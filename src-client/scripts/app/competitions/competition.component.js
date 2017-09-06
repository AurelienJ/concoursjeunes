System.register(["@angular/core", "@angular/router", "../general", "./competitions.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, general_1, competitions_service_1, CompetitionComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (competitions_service_1_1) {
                competitions_service_1 = competitions_service_1_1;
            }
        ],
        execute: function () {
            CompetitionComponent = /** @class */ (function () {
                function CompetitionComponent(route, navigation, competitionService) {
                    this.route = route;
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
                        var currentPath = general_1.NavigationSnapshot.getPath(_this.route.snapshot.url).join("/");
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
                CompetitionComponent = __decorate([
                    core_1.Component({
                        selector: 'competition',
                        template: "<titlebar title=\"{{competition.name || 'Competition'}}\"></titlebar>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <form class=\"form-horizontal\">\n                <div class=\"nav-tabs-custom\">\n                    <ul class=\"nav nav-tabs\">\n                        <li [class.active]=\"!activePane || activePane=='parametrage'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\">Param\u00E9trage</a></li>\n                    </ul>\n                    <div class=\"tab-content\">\n                        <h4>Informations g\u00E9n\u00E9ral</h4>\n                        <div class=\"form-group\">\n                            <label for=\"competitionName\" class=\"col-sm-2 control-label\">Nom</label>\n                            <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Nom\" id=\"competitionName\" name=\"competitionName\" class=\"form-control\" [(ngModel)]=\"competition.name\"/></div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"competitionPlace\" class=\"col-sm-2 control-label\">Lieu</label>\n                            <div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Lieu\" id=\"competitionPlace\" name=\"competitionPlace\" class=\"form-control\" [(ngModel)]=\"competition.place\"/></div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">Date</label>\n                            <div class=\"col-sm-10\">\n                            <p class=\"form-control-static\">\n                                <a href=\"javascript:void(0)\" (click)=\"drp.toggle()\">\n                                   <span *ngIf=\"competition.dates\">Du {{competition.dates && competition.dates[0] | date:'dd/MM/yyyy'}} au {{competition.dates && competition.dates[1] | date:'dd/MM/yyyy'}}</span>\n                                   <span *ngIf=\"!competition.dates\">S\u00E9l\u00E9ctionner les dates de la comp\u00E9tition</span>\n                                </a>\n                                <bs-daterangepicker #drp [(bsValue)]=\"competition.dates\" placement=\"bottom\" style=\"display: block\"></bs-daterangepicker>\n                            </p>\n                            </div>\n                        </div>\n\n                        <h4>Comp\u00E9tition</h4>\n\n                        <div class=\"form-group\">\n                            <label class=\"col-md-3 col-lg-2 control-label\">R\u00E9glement</label>\n                            <div class=\"col-md-9 col-lg-10\">\n                            <p class=\"form-control-static\">\n                            <a [routerLink]=\"['/rules', competition.idRule]\" *ngIf=\"competition.rule\">{{competition.rule.name}}</a> - \n                            <a [routerLink]=\"['/rules']\" [queryParams]=\"{forSelect : true}\">Choisir...</a>\n                            </p>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\" for=\"competitionPhasesFinal\">Phases Finale</label>\n                            <div class=\"col-sm-10\">\n                                <div class=\"checkbox\">\n                                    <label><input type=\"checkbox\" name=\"competitionPhasesFinal\"\n                                    [(ngModel)]=\"competition.duel\"/></label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"competitionTargetsNumber\" class=\"col-sm-2 control-label\">Nombre de cibles</label>\n                            <div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de cibles\" id=\"competitionTargetsNumber\" name=\"competitionTargetsNumber\" class=\"form-control\" [(ngModel)]=\"competition.targetsnumber\"/></div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"competitionStartsNumber\" class=\"col-sm-2 control-label\">Nombre de d\u00E9part</label>\n                            <div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de d\u00E9parts\" id=\"competitionStartsNumber\" name=\"competitionStartsNumber\" class=\"form-control\" [(ngModel)]=\"competition.startsnumber\"/></div>\n                        </div>\n                    </div>\n                </div>\n                </form>\n            </div>\n        </div>\n    </div>\n    "
                    }),
                    __metadata("design:paramtypes", [router_1.ActivatedRoute,
                        general_1.NavigatorService,
                        competitions_service_1.CompetitionsService])
                ], CompetitionComponent);
                return CompetitionComponent;
            }());
            exports_1("CompetitionComponent", CompetitionComponent);
        }
    };
});

//# sourceMappingURL=competition.component.js.map
