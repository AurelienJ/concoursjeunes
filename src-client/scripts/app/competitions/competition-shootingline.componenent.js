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
var Target_1 = require("./model/Target");
var CompetitionShootingLineComponent = /** @class */ (function () {
    function CompetitionShootingLineComponent() {
        this.sortCriterion = "name";
        this.concurrentExpanedState = new Map();
    }
    CompetitionShootingLineComponent.prototype.ngOnInit = function () { };
    CompetitionShootingLineComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName == "competition") {
                var competition = changes[propName].currentValue;
                this.generateShootingLine(competition);
            }
        }
    };
    CompetitionShootingLineComponent.prototype.ngDoCheck = function () {
        if (!this.targets || this.competition.targetsNumber != this.targets.length) {
            this.generateShootingLine(this.competition);
        }
    };
    CompetitionShootingLineComponent.prototype.expandedCompetitorChanged = function (state, competitor) {
        for (var _i = 0, _a = Array.from(this.concurrentExpanedState.keys()); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key != competitor)
                this.concurrentExpanedState.set(key, false);
            else
                this.concurrentExpanedState.set(key, state);
        }
        if (!this.concurrentExpanedState.has(competitor))
            this.concurrentExpanedState.set(competitor, state);
    };
    CompetitionShootingLineComponent.prototype.onTargetPositionSelect = function (competitor) {
        this.competitorToPositionning = competitor;
    };
    CompetitionShootingLineComponent.prototype.generateShootingLine = function (competition) {
        this.targets = [];
        for (var i = 1; i <= competition.targetsNumber; i++) {
            var target = new Target_1.Target(competition.competitors);
            target.numero = i;
            target.nbPositions = 4,
                this.targets.push(target);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CompetitionShootingLineComponent.prototype, "competition", void 0);
    CompetitionShootingLineComponent = __decorate([
        core_1.Component({
            selector: 'competition-shootingline',
            template: "\n<div id=\"starts\" class=\"box-group\">\n\t<div class=\"panel box box-info\">\n\t\t<div class=\"box-header with-border\">\n\t\t\t<h4 class=\"box-title\"><a href=\"#\">D\u00E9part n\u00B01</a></h4>\n\t\t</div>\n\t\t<div class=\"box-body\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-lg-4 col-md-6\">\n\t\t\t\t\t<a class=\"btn btn-app\" [routerLink]=\"['/concurrents']\" [queryParams]=\"{forSelect : true}\"><i aria-hidden=\"true\" class=\"fa fa-plus-circle\"></i> Ajouter</a>\n\n\t\t\t\t\t<br />\n\n\t\t\t\t\t<form novalidate> \n\t\t\t\t\t<div class=\"btn-group btn-group-justified\">\n\t\t\t\t\t\t<label class=\"btn btn-primary\" [(ngModel)]=\"sortCriterion\" btnRadio=\"name\" name=\"sortBy\"><i aria-hidden=\"true\" class=\"fa fa-sort-alpha-asc\"></i> Nom</label>\n\t\t\t\t\t\t<label class=\"btn btn-primary\" [(ngModel)]=\"sortCriterion\" btnRadio=\"target\" name=\"sortBy\"><i aria-hidden=\"true\" class=\"fa fa-sort-numeric-asc\"></i> Cible</label>\n\t\t\t\t\t\t<label class=\"btn btn-primary\" [(ngModel)]=\"sortCriterion\" btnRadio=\"club\" name=\"sortBy\"><i aria-hidden=\"true\" class=\"fa fa-sort\"></i> Club</label>\n\t\t\t\t\t\t<label class=\"btn btn-primary\" [(ngModel)]=\"sortCriterion\" btnRadio=\"score\" name=\"sortBy\"><i aria-hidden=\"true\" class=\"fa fa-sort-amount-desc\"></i> Score</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\n\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t<span class=\"input-group-addon\"><i aria-hidden=\"true\" class=\"fa fa-search\"></i></span>\n\t\t\t\t\t\t<input class=\"form-control input-sm\" placeholder=\"Recherche...\" type=\"search\" name=\"search\">\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<br />\n\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<ul class=\"list-group\" id=\"competitors\">\n\t\t\t\t\t\t\t<li *ngFor=\"let competitor of competition.competitors\" class=\"list-group-item\">\n\t\t\t\t\t\t\t\t<competitor [competitor]=\"competitor\"\n\t\t\t\t\t\t\t\t\t[expanded]=\"concurrentExpanedState.get(competitor)\" (expandedChange)=\"expandedCompetitorChanged($event,competitor)\"\n\t\t\t\t\t\t\t\t\t(onTargetPositionSelect)=\"onTargetPositionSelect($event)\"\n\t\t\t\t\t\t\t\t\t></competitor>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-lg-8 col-md-6\">\n\t\t\t\t\t<a class=\"btn btn-app\" href=\"#\"><i aria-hidden=\"true\" class=\"fa fa-forward\"></i> Placement Automatique</a>\n\t\t\t\t\t<a class=\"btn btn-app\" href=\"#\"><i aria-hidden=\"true\" class=\"fa fa-eraser\"></i> Reinitialiser</a>\n\n\t\t\t\t\t<br />\n\n\t\t\t\t\t<div class=\"row\" id=\"targets\">\n\t\t\t\t\t\t<div class=\"col-lg-6 col-md-12\" >\n\t\t\t\t\t\t\t<target *ngFor=\"let target of targets\" [target]=\"target\" [(competitorToPositionning)]=\"competitorToPositionning\"></target>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>",
            styles: [
                ":host #targets {\n\t\t\toverflow: auto;\n\t\t\theight: calc(100vh - 395px);\n\t\t}\n\t\t:host #competitors {\n\t\t\toverflow: auto;\n\t\t\theight: calc(100vh - 480px);\n\t\t\tmargin-bottom: 0px;\n\t\t}    \n\t\t"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CompetitionShootingLineComponent);
    return CompetitionShootingLineComponent;
}());
exports.CompetitionShootingLineComponent = CompetitionShootingLineComponent;

//# sourceMappingURL=competition-shootingline.componenent.js.map
