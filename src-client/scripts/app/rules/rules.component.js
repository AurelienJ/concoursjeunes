System.register(["@angular/core", "@angular/router", "./rules.service", "../general"], function (exports_1, context_1) {
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
    var core_1, router_1, rules_service_1, general_1, RulesServerSideInputData, RulesServerSideInputDataFilterPipe, RulesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            }
        ],
        execute: function () {
            RulesServerSideInputData = (function () {
                function RulesServerSideInputData(rulesService) {
                    this.rulesService = rulesService;
                    this.mustReload = true;
                    this.onDataChange = new core_1.EventEmitter();
                }
                RulesServerSideInputData.prototype.filter = function (term) {
                    if (term != this.term) {
                        this.term = term;
                        this.mustReload = true;
                        this.onDataChange.emit({ length: 0 });
                    }
                };
                RulesServerSideInputData.prototype.size = function () {
                    var _this = this;
                    if (this.cachedSize && !this.mustReload)
                        return new Promise(function (resolve) { return resolve(_this.cachedSize); });
                    return this.rulesService.countRules(this.term)
                        .then(function (size) {
                        _this.cachedSize = size;
                        _this.mustReload = false;
                        return size;
                    });
                };
                RulesServerSideInputData.prototype.orderBy = function (sortBy, sortOrder) {
                    if (sortBy != this.sortBy || sortOrder != this.sortOrder) {
                        this.sortBy = sortBy;
                        this.sortOrder = sortOrder;
                        this.mustReload = true;
                    }
                };
                RulesServerSideInputData.prototype.slice = function (start, end) {
                    var _this = this;
                    if (this.cachedData && !this.mustReload)
                        return new Promise(function (resolve) { return resolve(_this.cachedData); });
                    return this.rulesService.getRules(this.term, this.sortBy, this.sortOrder, start, end).then(function (entites) {
                        _this.cachedData = entites;
                        _this.mustReload = false;
                        return entites;
                    });
                };
                return RulesServerSideInputData;
            }());
            exports_1("RulesServerSideInputData", RulesServerSideInputData);
            RulesServerSideInputDataFilterPipe = (function () {
                function RulesServerSideInputDataFilterPipe() {
                }
                RulesServerSideInputDataFilterPipe.prototype.transform = function (value, args) {
                    var filter = null;
                    if (args[0])
                        filter = args[0].toLocaleLowerCase();
                    value.filter(filter);
                    return value;
                };
                return RulesServerSideInputDataFilterPipe;
            }());
            RulesServerSideInputDataFilterPipe = __decorate([
                core_1.Pipe({
                    name: 'rulesServerSideInputDataFilter'
                })
            ], RulesServerSideInputDataFilterPipe);
            exports_1("RulesServerSideInputDataFilterPipe", RulesServerSideInputDataFilterPipe);
            RulesComponent = (function () {
                function RulesComponent(route, router, navigatorService, rulesService) {
                    this.route = route;
                    this.router = router;
                    this.navigatorService = navigatorService;
                    this.rulesService = rulesService;
                    this.forSelect = false;
                }
                RulesComponent.prototype.ngOnInit = function () {
                    this.navigatorService.pushUrlSegments("Réglements", this.route.snapshot.url, this.route.snapshot.queryParams);
                    if (this.route.snapshot.queryParams["forSelect"]) {
                        this.forSelect = true;
                    }
                    this.rules = new RulesServerSideInputData(this.rulesService);
                };
                RulesComponent.prototype.select = function (rule) {
                    this.navigatorService.goBack(this.router, rule, -1);
                };
                return RulesComponent;
            }());
            RulesComponent = __decorate([
                core_1.Component({
                    selector: 'rules',
                    template: "<titlebar title=\"R\u00E9glements\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <div class=\"box-header\">\n                        <h3 class=\"box-title\">Liste des r\u00E9glements</h3>\n                    </div>\n                    <div class=\"box-body\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\"><a href=\"#/rules/new\" class=\"btn btn-app\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                            </div>\n                            <div class=\"col-sm-6 form-inline\">\n                                <div class=\"pull-right form-group\">\n                                    <div class=\"input-group\">\n                                        <span class=\"input-group-addon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                        <input type=\"search\" class=\"form-control input-sm\" #search (keyup)=\"0\" placeholder=\"Recherche...\" />\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <table class=\"table table-bordered table-hover\" [mfData]=\"rules | rulesServerSideInputDataFilter : [search.value]\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n                            <thead>\n                            <tr>\n                                <th><mfDefaultSorter by=\"nom\">Nom</mfDefaultSorter></th>\n                                <th><mfDefaultSorter by=\"entite\">Propri\u00E9taire</mfDefaultSorter></th>\n                                <th></th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr *ngFor=\"let rule of mf.data\">\n                                <td><a href=\"#/rules/{{rule.id}}\">{{rule.name}}</a></td>\n                                <td>{{rule.entite}}</td>\n                                \n                                <td>\n                                    <a href=\"#/rules/{{rule.id}}\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n                                    <a href=\"javascript:void(0)\" *ngIf=\"forSelect\" (click)=\"select(rule)\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\" title=\"Selectionner\"></i></a>\n                                </td>\n                            </tr>\n                            </tbody>\n                            <tfoot>\n                            <tr>\n                                <td colspan=\"5\">\n                                    <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\n                                </td>\n                            </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\t"
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    general_1.NavigatorService,
                    rules_service_1.RulesService])
            ], RulesComponent);
            exports_1("RulesComponent", RulesComponent);
        }
    };
});

//# sourceMappingURL=rules.component.js.map
