System.register(["@angular/core", "./rules.service", "../entites/entites.service", "lodash"], function (exports_1, context_1) {
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
    var core_1, rules_service_1, entites_service_1, lodash_1, DetailRankingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            },
            function (entites_service_1_1) {
                entites_service_1 = entites_service_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            DetailRankingComponent = (function () {
                function DetailRankingComponent(rulesService, entitesService) {
                    this.rulesService = rulesService;
                    this.entitesService = entitesService;
                    this.displayAddDiscriminantCriteriaSet = false;
                    this.loading = false;
                }
                DetailRankingComponent.prototype.ngOnInit = function () {
                };
                DetailRankingComponent.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    for (var propName in changes) {
                        if (propName == 'idFederation') {
                            var chng = changes[propName];
                            this.entitesService.getCriteria(this.idFederation).then(function (c) { return _this.criteria = c; });
                        }
                        else if (propName == 'rankingCriterion') {
                            if (!this.rankingCriterion.distancesAndFacesSet && this.rankingCriterion.idDistancesAndFacesSet) {
                                this.rankingCriterion.distancesAndFacesSet = lodash_1.default.find(this.distanceAndFacesSets, function (df) { return df.id == _this.rankingCriterion.idDistancesAndFacesSet; });
                            }
                        }
                    }
                };
                DetailRankingComponent.prototype.getCriterionElement = function (idCriterionElement) {
                    for (var i = 0; i < this.criteria.length; i++) {
                        var criterion = this.criteria[i];
                        var element = lodash_1.default.find(criterion.criterionElements, function (e) { return e.id == idCriterionElement; });
                        if (element)
                            return { criterion: criterion, element: element };
                    }
                    ;
                };
                DetailRankingComponent.prototype.displayDiscriminantCriterionSet = function () {
                    this.selectedCriterionElements = new Map();
                    this.editedDiscriminantCriterionSet = {
                        elements: []
                    };
                    this.displayAddDiscriminantCriteriaSet = true;
                };
                DetailRankingComponent.prototype.validateDiscriminantCriterionSet = function () {
                    var _this = this;
                    var ordre = 0;
                    this.editedDiscriminantCriterionSet.elements = [];
                    this.editedDiscriminantCriterionSet.name = "";
                    this.selectedCriterionElements.forEach(function (e) {
                        _this.editedDiscriminantCriterionSet.elements.push({
                            idCriterionElement: e.id,
                            ordre: ordre++
                        });
                        if (ordre > 1)
                            _this.editedDiscriminantCriterionSet.name += " / ";
                        _this.editedDiscriminantCriterionSet.name += e.libelle;
                    });
                    if (!this.rankingCriterion.discriminantCriterionSets)
                        this.rankingCriterion.discriminantCriterionSets = [];
                    this.rankingCriterion.discriminantCriterionSets.push(this.editedDiscriminantCriterionSet);
                    this.displayAddDiscriminantCriteriaSet = false;
                };
                DetailRankingComponent.prototype.deleteDiscriminantCriterionSet = function (discriminantCriterionSet) {
                    lodash_1.default.remove(this.rankingCriterion.discriminantCriterionSets, function (e) { return e == discriminantCriterionSet; });
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
                    core_1.Input(),
                    __metadata("design:type", String)
                ], DetailRankingComponent.prototype, "idFederation", void 0);
                DetailRankingComponent = __decorate([
                    core_1.Component({
                        selector: 'detail-ranking',
                        template: "<div *ngIf=\"rankingCriterion\">\n        <div class=\"modal\" id=\"addDiscriminantCriteriaSet\" *ngIf=\"displayAddDiscriminantCriteriaSet\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Fermer\" (click)=\"displayAddDiscriminantCriteriaSet=false\">\n                        <span aria-hidden=\"true\">\u00D7</span></button>\n                        <h4 class=\"modal-title\">S\u00E9l\u00E9ction d'un jeux de crit\u00E8res discriminant</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div *ngFor=\"let criterion of criteria\">\n                            <h4>{{criterion.libelle}}</h4>\n                            <div class=\"radio\" *ngFor=\"let criterionElement of criterion.criterionElements\">\n                                <label>\n                                    <input type=\"radio\" name=\"criterion-{{criterion.id}}\"\n                                        [value]=\"criterionElement\"\n                                        [ngModel]=\"selectedCriterionElements.get(criterion)\" (ngModelChange)=\"selectedCriterionElements.set(criterion, $event)\"/>\n                                    {{criterionElement.libelle}}\n                                </label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"validateDiscriminantCriterionSet()\">Ajouter</button>\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"displayAddDiscriminantCriteriaSet=false\">Fermer</button>\n                    </div>\n                    <!-- /.modal-content -->\n                </div>\n                <!-- /.modal-dialog -->\n            </div>\n        </div>\n\n        <h3>D\u00E9tail</h3>\n        <div class=\"form-group\">\n            <label for=\"libelleRankingCriterion\">Libelle</label>\n            <input placeholder=\"Libelle\" id=\"libelleRankingCriterion\" name=\"libelleRankingCriterion\" class=\"form-control\" [(ngModel)]=\"rankingCriterion.name\"/>\n        </div>\n        \n        <div class=\"form-group\">\n            <label for=\"distanceAndFacesSet\">Jeux de distances et blasons</label>\n            <div class=\"radio\" *ngFor=\"let distanceAndFacesSet of distanceAndFacesSets\">\n                <label>\n                    <input type=\"radio\" name=\"distanceAndFacesSet\"\n                        [value]=\"distanceAndFacesSet\"\n                        [(ngModel)]=\"rankingCriterion.distancesAndFacesSet\"/>\n                    {{distanceAndFacesSet.name}}\n                </label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"discriminantCriteria\">Crit\u00E8res discriminants <button class=\"btn btn-link btn-lg\" (click)=\"displayDiscriminantCriterionSet(null)\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</button></label>\n            <div class=\"form-control-static\">\n                \n                <ul class=\"list-group clearfix\">\n                    <li class=\"list-group-item\" *ngFor=\"let discriminantCriterionSet of rankingCriterion.discriminantCriterionSets\">\n                    <span class=\"button-align\">{{discriminantCriterionSet.name}}</span>\n                    <a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" (click)=\"deleteDiscriminantCriterionSet(discriminantCriterionSet)\"><i class=\"fa fa-trash\" title=\"Supprimer\"></i></a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>",
                        styles: [
                            ":host .button-separator {\n\t\t\tmargin-right: 10px;\n\t\t}",
                            ":host #addDiscriminantCriteriaSet {\n\t\t\tdisplay: block;\n\t\t}"
                        ]
                    }),
                    __metadata("design:paramtypes", [rules_service_1.RulesService, entites_service_1.EntitesService])
                ], DetailRankingComponent);
                return DetailRankingComponent;
            }());
            exports_1("DetailRankingComponent", DetailRankingComponent);
        }
    };
});

//# sourceMappingURL=detailRanking.component.js.map
