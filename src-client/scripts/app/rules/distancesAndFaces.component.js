var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import _ from 'lodash';
var DistancesAndFacesComponent = /** @class */ (function () {
    function DistancesAndFacesComponent() {
        this.distancesAndFacesSetChange = new EventEmitter();
    }
    DistancesAndFacesComponent.prototype.ngOnInit = function () {
    };
    DistancesAndFacesComponent.prototype.addDistanceAndFacesSet = function () {
        var distanceAndFaces = [];
        for (var i = 1; i <= this.nbSerie; i++) {
            distanceAndFaces.push({
                serie: i,
                distance: 0,
                facesDistanceAndFaces: []
            });
        }
        var distanceAndFacesSet = {
            tempId: new Date().getTime().toString(),
            name: null,
            distancesAndFaces: distanceAndFaces
        };
        if (!this.distancesAndFacesSet)
            this.distancesAndFacesSet = [];
        this.distancesAndFacesSet.push(distanceAndFacesSet);
        this.distancesAndFacesSetChange.emit(this.distancesAndFacesSet);
        this.selectedDistanceAndFacesSet = distanceAndFacesSet;
    };
    DistancesAndFacesComponent.prototype.deleteDistanceAndFacesSet = function (distanceAndFacesSet, confirmation) {
        if (confirmation === void 0) { confirmation = false; }
        if (!confirmation)
            this.selectedDistanceAndFacesSetForDelete = distanceAndFacesSet;
        else {
            _.remove(this.distancesAndFacesSet, function (df) { return df == distanceAndFacesSet; });
            this.selectedDistanceAndFacesSetForDelete = undefined;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DistancesAndFacesComponent.prototype, "distancesAndFacesSet", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DistancesAndFacesComponent.prototype, "nbSerie", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DistancesAndFacesComponent.prototype, "distancesAndFacesSetChange", void 0);
    DistancesAndFacesComponent = __decorate([
        Component({
            selector: 'distances-faces',
            template: "<div class=\"modal modal-primary\" id=\"confirmDeleteDistanceAndFacesSetItemModal\" *ngIf=\"selectedDistanceAndFacesSetForDelete\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Fermer\" (click)=\"selectedRankingCriterionForDelete=null\">\n                <span aria-hidden=\"true\">\u00D7</span></button>\n                <h4 class=\"modal-title\">Suppression d'un crit\u00E8re de classement</h4>\n            </div>\n            <div class=\"modal-body\">\n                <p>Confirmer la suppression du crit\u00E8re <strong>\"{{selectedDistanceAndFacesSetForDelete.name}}\"</strong>?</p>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-outline\" (click)=\"deleteDistanceAndFacesSet(selectedDistanceAndFacesSetForDelete, true)\">Supprimer</button>\n                <button type=\"button\" class=\"btn btn-outline\" data-dismiss=\"modal\" (click)=\"selectedDistanceAndFacesSetForDelete=null\">Fermer</button>\n            </div>\n            </div>\n            <!-- /.modal-content -->\n        </div>\n        <!-- /.modal-dialog -->\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n            <h3>Liste des jeux de distances / blasons</h3>\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <a href=\"javascript:void(0)\" class=\"btn btn-app\" (click)=\"addDistanceAndFacesSet()\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i> Ajouter</a>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <ul class=\"list-group\" id=\"criteria-collection\">\n                        <li class=\"list-group-item clearfix\" *ngFor=\"let distanceAndFaces of distancesAndFacesSet\">\n                            <a href=\"javascript:void(0)\" class=\"button-align\" (click)=\"selectedDistanceAndFacesSet = distanceAndFaces\">{{distanceAndFaces.name || '<Nouveau jeux de distances / blasons>'}}</a>\n                            <a href=\"javascript:void(0)\" class=\"pull-right btn btn-link\" (click)=\"deleteDistanceAndFacesSet(distanceAndFaces)\"><i class=\"fa fa-trash\" title=\"Supprimer\"></i></a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-6\" *ngIf=\"selectedDistanceAndFacesSet\">\n            <detail-distances-faces [(distanceAndFacesSet)]=\"selectedDistanceAndFacesSet\"></detail-distances-faces>\n        </div>\n    </div>",
            styles: [
                ":host #confirmDeleteDistanceAndFacesSetItemModal {\n\t\t\tdisplay: block;\n\t\t}"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], DistancesAndFacesComponent);
    return DistancesAndFacesComponent;
}());
export { DistancesAndFacesComponent };
//# sourceMappingURL=distancesAndFaces.component.js.map