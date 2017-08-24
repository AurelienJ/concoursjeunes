System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, RankingComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            RankingComponent = (function () {
                function RankingComponent() {
                    this.rankingCriteriaChange = new core_1.EventEmitter();
                }
                RankingComponent.prototype.ngOnInit = function () {
                };
                RankingComponent.prototype.addRankingCriterion = function () {
                    this.selectedRankingCriterion = {
                        numordre: this.rankingCriteria.length + 1
                    };
                    this.rankingCriteria.push(this.selectedRankingCriterion);
                };
                RankingComponent.prototype.deleteRankingCriterion = function (rankingCriterion, confirmation) {
                    if (confirmation === void 0) { confirmation = false; }
                    if (!confirmation)
                        this.selectedRankingCriterionForDelete = rankingCriterion;
                    else {
                        this.rankingCriteria.splice(rankingCriterion.numordre - 1, 1);
                        this.selectedRankingCriterionForDelete = undefined;
                    }
                };
                RankingComponent.prototype.upRankingCriterion = function (rankingCriterion) {
                    if (rankingCriterion.numordre > 1) {
                        //recupere l'element n-1
                        var previousCriterion = this.rankingCriteria[rankingCriterion.numordre - 2];
                        this.rankingCriteria[rankingCriterion.numordre - 2] = rankingCriterion;
                        this.rankingCriteria[rankingCriterion.numordre - 1] = previousCriterion;
                        rankingCriterion.numordre--;
                        previousCriterion.numordre++;
                    }
                };
                RankingComponent.prototype.downRankingCriterion = function (rankingCriterion) {
                    if (rankingCriterion.numordre < this.rankingCriteria.length) {
                        //recupere l'element n+1
                        var nextElement = this.rankingCriteria[rankingCriterion.numordre];
                        this.rankingCriteria[rankingCriterion.numordre] = rankingCriterion;
                        this.rankingCriteria[rankingCriterion.numordre - 1] = nextElement;
                        rankingCriterion.numordre++;
                        nextElement.numordre--;
                    }
                };
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Array)
                ], RankingComponent.prototype, "rankingCriteria", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", Array)
                ], RankingComponent.prototype, "distancesAndFacesSet", void 0);
                __decorate([
                    core_1.Input(),
                    __metadata("design:type", String)
                ], RankingComponent.prototype, "idFederation", void 0);
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", core_1.EventEmitter)
                ], RankingComponent.prototype, "rankingCriteriaChange", void 0);
                RankingComponent = __decorate([
                    core_1.Component({
                        selector: 'ranking',
                        template: "<div class=\"modal modal-primary\" id=\"confirmDeleteRankingCriterionItemModal\" *ngIf=\"selectedRankingCriterionForDelete\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Fermer\" (click)=\"selectedRankingCriterionForDelete=null\">\n                    <span aria-hidden=\"true\">\u00D7</span></button>\n                    <h4 class=\"modal-title\">Suppression d'un crit\u00E8re de classement</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <p>Confirmer la suppression du crit\u00E8re <strong>\"{{selectedRankingCriterionForDelete.name}}\"</strong>?</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-outline\" (click)=\"deleteRankingCriterion(selectedRankingCriterionForDelete, true)\">Supprimer</button>\n                    <button type=\"button\" class=\"btn btn-outline\" data-dismiss=\"modal\" (click)=\"selectedRankingCriterionForDelete=null\">Fermer</button>\n                </div>\n                </div>\n                <!-- /.modal-content -->\n            </div>\n            <!-- /.modal-dialog -->\n        </div>\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <h3>Liste des crit\u00E8res</h3>\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <a href=\"javascript:void(0)\" class=\"btn btn-app\" (click)=\"addRankingCriterion()\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <ul class=\"list-group\" id=\"criteria-collection\">\n                            <li class=\"list-group-item\" *ngFor=\"let rankingCriterion of rankingCriteria\">\n                                <a href=\"javascript:void(0)\" (click)=\"selectedRankingCriterion = rankingCriterion\">{{rankingCriterion.name || '&lt;Nouveau crit\u00E8re de classement&gt;'}}</a>\n                                <a href=\"javascript:void(0)\" class=\"pull-right button-separator\" (click)=\"deleteRankingCriterion(rankingCriterion)\"><i class=\"fa fa-trash\" title=\"Supprimer\"></i></a>\n                                <a href=\"javascript:void(0)\" class=\"pull-right button-separator\" [class.disabled]=\"rankingCriterion.numordre <= 1\" (click)=\"upRankingCriterion(rankingCriterion)\"><i class=\"fa fa-arrow-up\" aria-hidden=\"true\"></i></a>\n                                <a href=\"javascript:void(0)\" class=\"pull-right button-separator\" [class.disabled]=\"rankingCriterion.numordre >= rankingCriteria.length\" (click)=\"downRankingCriterion(rankingCriterion)\"><i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i></a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-sm-6\" *ngIf=\"selectedRankingCriterion\">\n                <detail-ranking [rankingCriterion]=\"selectedRankingCriterion\" [distanceAndFacesSets]=\"distancesAndFacesSet\" [idFederation]=\"idFederation\"></detail-ranking>\n            </div>\n        </div>",
                        styles: [
                            ":host #confirmDeleteDistanceAndFacesSetItemModal {\n\t\t\tdisplay: block;\n\t\t}"
                        ]
                    }),
                    __metadata("design:paramtypes", [])
                ], RankingComponent);
                return RankingComponent;
            }());
            exports_1("RankingComponent", RankingComponent);
        }
    };
});

//# sourceMappingURL=ranking.component.js.map
