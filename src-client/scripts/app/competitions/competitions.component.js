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
var competitions_service_1 = require("./competitions.service");
var CompetitionsComponent = /** @class */ (function () {
    function CompetitionsComponent(router, route, navigatorService, competitionsService) {
        this.router = router;
        this.route = route;
        this.navigatorService = navigatorService;
        this.competitionsService = competitionsService;
    }
    CompetitionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navigatorService.pushUrlSegments("Compétitions", this.route.snapshot.url, this.route.snapshot.queryParams);
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
            navigator_service_1.NavigatorService,
            competitions_service_1.CompetitionsService])
    ], CompetitionsComponent);
    return CompetitionsComponent;
}());
exports.CompetitionsComponent = CompetitionsComponent;

//# sourceMappingURL=competitions.component.js.map
