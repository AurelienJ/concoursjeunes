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
    var core_1, router_1, general_1, competitions_service_1, CompetitionsComponent;
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
            CompetitionsComponent = (function () {
                function CompetitionsComponent(router, route, navigatorService, competitionsService) {
                    this.router = router;
                    this.route = route;
                    this.navigatorService = navigatorService;
                    this.competitionsService = competitionsService;
                }
                CompetitionsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.competitionsService.getCompetitionsDescription().then(function (c) { return _this.competitions = c; });
                    if (this.route.snapshot.queryParams["forSelect"]) {
                        this.forSelect = true;
                    }
                };
                CompetitionsComponent.prototype.select = function (competition) {
                };
                CompetitionsComponent = __decorate([
                    core_1.Component({
                        selector: 'competitions',
                        templateUrl: 'scripts/app/competitions/competitions.html'
                    }),
                    __metadata("design:paramtypes", [router_1.Router,
                        router_1.ActivatedRoute,
                        general_1.NavigatorService,
                        competitions_service_1.CompetitionsService])
                ], CompetitionsComponent);
                return CompetitionsComponent;
            }());
            exports_1("CompetitionsComponent", CompetitionsComponent);
        }
    };
});

//# sourceMappingURL=competitions.component.js.map
