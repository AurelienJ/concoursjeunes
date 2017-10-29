var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigatorService } from '../general/navigator.service';
import { CompetitionsService } from "./competitions.service";
import { NavigationSnapshot } from "../general/NavigationSnapshot";
var CompetitionComponent = /** @class */ (function () {
    function CompetitionComponent(route, router, navigation, competitionService) {
        this.route = route;
        this.router = router;
        this.navigation = navigation;
        this.competitionService = competitionService;
        this.competition = {};
        this.currentStart = 1;
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
            var currentPath = NavigationSnapshot.getPath(_this.route.snapshot.url).join("/");
            if (currentNavigationSnapshot && currentNavigationSnapshot.queryParams && currentNavigationSnapshot.queryParams.activePane)
                _this.activePane = currentNavigationSnapshot.queryParams.activePane;
            if (currentNavigationSnapshot
                && currentPath == currentNavigationSnapshot.path.join("/")
                && currentNavigationSnapshot.stateData
                && currentNavigationSnapshot.stateData.id == _this.idCompetition) {
                _this.competition = currentNavigationSnapshot.stateData;
                if (currentNavigationSnapshot.returnData) {
                    if (currentNavigationSnapshot.returnDataType == "rule") {
                        var rule = currentNavigationSnapshot.returnData;
                        _this.competition.idRule = rule.id;
                        _this.competition.rule = rule;
                    }
                    else if (currentNavigationSnapshot.returnDataType == "person") {
                        var archer = currentNavigationSnapshot.returnData;
                        var concurrent = {
                            idArcher: archer.id,
                            archer: archer,
                            start: _this.currentStart
                        };
                        _this.competition.competitors = _this.competition.competitors || [];
                        _this.competition.competitors.push(concurrent);
                    }
                }
            }
            else {
                _this.navigation.pushUrlSegments("Compétition", _this.route.snapshot.url, {});
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
    CompetitionComponent.prototype.changeTab = function (name) {
        this.activePane = name;
        this.navigation.getCurrentNavigationSnapshot().queryParams.activePane = name;
    };
    CompetitionComponent.prototype.validate = function () {
        var _this = this;
        this.competitionService.saveCompetition(this.competition).then(function (c) {
            _this.navigation.goBack(_this.router, null, null, -1);
        }).catch(function (reason) {
            _this.error = reason;
        });
        ;
    };
    CompetitionComponent.prototype.cancel = function () {
        this.navigation.goBack(this.router, null, null, -1);
    };
    CompetitionComponent = __decorate([
        Component({
            selector: 'competition',
            template: "<titlebar title=\"{{competition.name || 'Competition'}}\"></titlebar>\n    <div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <form class=\"form-horizontal\" #competitionForm=\"ngForm\" (ngSubmit)=\"validate()\">\n                <div class=\"nav-tabs-custom\">\n                    <ul class=\"nav nav-tabs\">\n                        <li *ngIf=\"competition.id\" [class.active]=\"!activePane || activePane=='stats'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('stats')\">Accueil</a></li>\n                        <li *ngIf=\"competition.id\" [class.active]=\"activePane=='pasDeTir'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('pasDeTir')\">Pas de tir</a></li>\n                        <li *ngIf=\"competition.id\" [class.active]=\"activePane=='greffe'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('greffe')\">Greffe</a></li>\n                        <li *ngIf=\"competition.id\" [class.active]=\"activePane=='finales'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('finales')\">Phases finales</a></li>\n                        <li *ngIf=\"competition.id\" [class.active]=\"activePane=='classements'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('classements')\">Classements</a></li>\n                        <li [class.active]=\"!competition.id || activePane=='parametrage'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"changeTab('parametrage')\">Param\u00E9trage</a></li>\n                    </ul>\n                    <div class=\"tab-content main-pane\">\n                        <div class=\"tab-pane\" id=\"parametrage\" [class.active]=\"!competition.id || activePane=='parametrage'\">\n                            <competition-parameters [competition]=\"competition\" ngDefaultControl></competition-parameters>\n                        </div>\n\n                        <div class=\"tab-pane\" id=\"pasDeTir\" [class.active]=\"activePane=='pasDeTir'\">\n                            <competition-shootingline [competition]=\"competition\"></competition-shootingline>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n\t\t\t\t{{error}}\n\t\t\t\t</div>\n\n                <button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n\t\t\t\t<button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"submit\" [disabled]=\"competitionForm.invalid\">Valider</button>\n                </form>\n            </div>\n        </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router,
            NavigatorService,
            CompetitionsService])
    ], CompetitionComponent);
    return CompetitionComponent;
}());
export { CompetitionComponent };
//# sourceMappingURL=competition.component.js.map