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
        if (this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }
    };
    CompetitionsComponent.prototype.select = function (competition) {
    };
    return CompetitionsComponent;
}());
CompetitionsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'competitions',
        templateUrl: 'competitions.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        navigator_1.NavigatorService,
        competitions_1.CompetitionsService])
], CompetitionsComponent);
exports.CompetitionsComponent = CompetitionsComponent;

//# sourceMappingURL=competitions.js.map