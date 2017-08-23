System.register(["@angular/core", "./rules.service"], function (exports_1, context_1) {
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
    var core_1, rules_service_1, DetailRankingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            }
        ],
        execute: function () {
            DetailRankingComponent = (function () {
                function DetailRankingComponent(rulesService) {
                    this.rulesService = rulesService;
                    this.rankingCriterionChange = new core_1.EventEmitter();
                    this.loading = false;
                }
                DetailRankingComponent.prototype.ngOnInit = function () {
                };
                DetailRankingComponent.prototype.ngOnChanges = function (changes) {
                    for (var propName in changes) {
                        if (propName == "rankingCriterion") {
                            this.loading = true;
                        }
                    }
                };
                DetailRankingComponent.prototype.ngDoCheck = function () {
                };
                DetailRankingComponent.prototype.ngAfterViewChecked = function () {
                    this.loading = false;
                };
                DetailRankingComponent.prototype.onValueChanged = function (value) {
                    if (this.loading)
                        return;
                    if (value.startsWith("temp"))
                        this.rankingCriterion.idTempDistancesAndFacesSet = value.substring(4);
                    else
                        this.rankingCriterion.idDistancesAndFacesSet = value;
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Object)
                ], DetailRankingComponent.prototype, "rankingCriterion", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Array)
                ], DetailRankingComponent.prototype, "distanceAndFacesSets", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], DetailRankingComponent.prototype, "rankingCriterionChange", void 0);
                DetailRankingComponent = __decorate([
                    core_1.Component({
                        selector: 'detail-ranking',
                        template: "<div *ngIf=\"rankingCriterion\">\n        <h3>D\u00E9tail</h3>\n        <div class=\"form-group\">\n            <label for=\"libelleRankingCriterion\" class=\"col-sm-2 control-label\">Libelle</label>\n            <div class=\"col-sm-10\"><input placeholder=\"Libelle\" id=\"libelleRankingCriterion\" name=\"libelleRankingCriterion\" class=\"form-control\" [(ngModel)]=\"rankingCriterion.name\"/></div>\n        </div>\n        \n        <div class=\"form-group\">\n            <label for=\"distanceAndFacesSet\" class=\"col-sm-2 control-label\">Jeux de distances et blasons</label>\n            <div class=\"col-sm-10\">\n                <select select2 (value)=\"onValueChanged($event)\" placeholder=\"Distances / Blasons\" id=\"distanceAndFacesSet\" name=\"distanceAndFacesSet\" class=\"form-control\"  style=\"width: 100%;\">\n                    <option *ngFor=\"let distanceAndFacesSet of distanceAndFacesSets\" [value]=\"distanceAndFacesSet.id || 'temp' + distanceAndFacesSet.tempId\" [attr.selected]=\"((distanceAndFacesSet.id == rankingCriterion.idDistancesAndFacesSet) || (distanceAndFacesSet.tempId == rankingCriterion.idTempDistancesAndFacesSet)) ? 'selected' : null\">{{distanceAndFacesSet.name}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"discriminantCriteria\" class=\"col-sm-2 control-label\">Crit\u00E8res discriminants</label>\n            <div class=\"col-sm-10\">\n                <ul class=\"list-group\">\n                    <li class=\"list-group-item\">Test</li>\n                </ul>\n            </div>\n        </div>\n\n    </div>"
                    }),
                    __metadata("design:paramtypes", [rules_service_1.RulesService])
                ], DetailRankingComponent);
                return DetailRankingComponent;
            }());
            exports_1("DetailRankingComponent", DetailRankingComponent);
        }
    };
});

//# sourceMappingURL=detailRanking.component.js.map
