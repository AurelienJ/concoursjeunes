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
var Criterion_1 = require("./Criterion");
var CriterionComponent = /** @class */ (function () {
    function CriterionComponent() {
    }
    CriterionComponent.prototype.ngOnInit = function () { };
    CriterionComponent.prototype.addElement = function () {
        this.selectedElement = {
            code: 'N',
            libelle: 'nouveau',
            numordre: this.criterion.criterionElements.length + 1
        };
        /**/
    };
    CriterionComponent.prototype.saveSelectedElement = function () {
        if (!this.criterion.criterionElements)
            this.criterion.criterionElements = [];
        this.criterion.criterionElements.push(this.selectedElement);
        this.selectedElement = undefined;
    };
    CriterionComponent.prototype.cancelSelectedElement = function () {
        this.selectedElement = undefined;
    };
    CriterionComponent.prototype.cancelSelectedForDeleteElement = function () {
        this.selectedElementForDelete = undefined;
    };
    CriterionComponent.prototype.deleteElement = function (element) {
        this.selectedElementForDelete = element;
    };
    CriterionComponent.prototype.deleteSelectedForDeleteElement = function () {
        this.criterion.criterionElements.splice(this.selectedElementForDelete.numordre - 1, 1);
        this.selectedElementForDelete = undefined;
    };
    CriterionComponent.prototype.upElement = function (element) {
        if (element.numordre > 1) {
            //recupere l'element n-1
            var previousElement = this.criterion.criterionElements[element.numordre - 2];
            this.criterion.criterionElements[element.numordre - 2] = element;
            this.criterion.criterionElements[element.numordre - 1] = previousElement;
            element.numordre--;
            previousElement.numordre++;
        }
    };
    CriterionComponent.prototype.downElement = function (element) {
        if (element.numordre < this.criterion.criterionElements.length) {
            //recupere l'element n+1
            var nextElement = this.criterion.criterionElements[element.numordre];
            this.criterion.criterionElements[element.numordre] = element;
            this.criterion.criterionElements[element.numordre - 1] = nextElement;
            element.numordre++;
            nextElement.numordre--;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Criterion_1.Criterion)
    ], CriterionComponent.prototype, "criterion", void 0);
    CriterionComponent = __decorate([
        core_1.Component({
            selector: 'criterion',
            template: "<div>\n\t\t<h3>D\u00E9tail d'un crit\u00E8re</h3>\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"libelleCriterion\" class=\"col-sm-2 control-label\">Libelle</label>\n\t\t\t<div class=\"col-sm-10\"><input placeholder=\"Libelle\" id=\"libelleCriterion\" name=\"libelleCriterion\" class=\"form-control\" [(ngModel)]=\"criterion.libelle\"/></div>\n\t\t</div>\n\t\t<h4>Elements: <a href=\"javascript:void(0)\" (click)=\"addElement()\"><i class=\"fa fa-plus-circle btn btn-link btn-lg\" aria-hidden=\"true\" title=\"Ajouter\"></i></a></h4>\n\t\t<div *ngIf=\"selectedElement\" class=\"panel panel-default\">\n\t\t\t<div class=\"panel-heading\">Edition de l'\u00E9l\u00E9ment n\u00B0 {{selectedElement.numordre}}</div>\n\t\t\t<div class=\"panel-body\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label for=\"codeCriterionElement\" class=\"col-sm-2 control-label\">Code</label>\n\t\t\t\t\t<div class=\"col-sm-10\"><input placeholder=\"Code\" id=\"codeCriterionElement\" name=\"codeCriterionElement\" class=\"form-control\" [(ngModel)]=\"selectedElement.code\"/></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label for=\"libelleCriterionElement\" class=\"col-sm-2 control-label\">Libelle</label>\n\t\t\t\t\t<div class=\"col-sm-10\"><input placeholder=\"Libelle\" id=\"libelleCriterionElement\" name=\"libelleCriterionElement\" class=\"form-control\" [(ngModel)]=\"selectedElement.libelle\"/></div>\n\t\t\t\t</div>\n\n\t\t\t\t<button class=\"btn pull-right\" type=\"button\" (click)=\"cancelSelectedElement()\">Annuler</button>\n\t\t\t\t<button class=\"btn pull-right button-separator\" type=\"button\" (click)=\"saveSelectedElement()\">Valider</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<div *ngIf=\"selectedElementForDelete\" class=\"panel panel-danger\">\n\t\t\t<div class=\"panel-heading\">Suppression de l'\u00E9l\u00E9ment n\u00B0 {{selectedElementForDelete.numordre}}</div>\n\t\t\t<div class=\"panel-body\">\n\t\t\t\tVoulez vous vraiment supprimer l'\u00E9l\u00E9ment <strong>\"{{selectedElementForDelete.libelle}}\"</strong>?\n\n\t\t\t\t<button class=\"btn pull-right\" type=\"button\" (click)=\"cancelSelectedForDeleteElement()\">Annuler</button>\n\t\t\t\t<button class=\"btn pull-right button-separator\" type=\"button\" (click)=\"deleteSelectedForDeleteElement()\">Supprimer</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<ul class=\"list-group\">\n\t\t\t<li class=\"list-group-item clearfix\" *ngFor=\"let criterionElement of criterion.criterionElements\">\n\t\t\t\t<span class=\"button-align\">{{criterionElement.code}} - {{criterionElement.libelle}}</span>\n\t\t\t\t<a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" (click)=\"deleteElement(criterionElement)\"><i class=\"fa fa-trash\" title=\"Supprimer\"></i></a>\n\t\t\t\t<a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" [class.disabled]=\"criterionElement.numordre <= 1\" (click)=\"upElement(criterionElement)\"><i class=\"fa fa-arrow-up\" aria-hidden=\"true\"></i></a>\n\t\t\t\t<a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" [class.disabled]=\"criterionElement.numordre >= criterion.criterionElements.length\" (click)=\"downElement(criterionElement)\"><i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i></a>\n\t\t\t\t<a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" (click)=\"selectedElement = criterionElement\"><i class=\"fa fa-pencil\" title=\"Editer\"></i></a>\n\t\t\t</li>\n\t\t</ul>\n\t</div>",
            styles: [
                ":host .list-group {\n\t\t\tmax-height: calc(100vh - 400px);\n    \t\toverflow-y: auto;\n\t\t}",
                ":host .button-separator {\n\t\t\tmargin-right: 5px;\n\t\t}"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CriterionComponent);
    return CriterionComponent;
}());
exports.CriterionComponent = CriterionComponent;

//# sourceMappingURL=criterion.component.js.map
