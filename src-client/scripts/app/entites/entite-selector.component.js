var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntitesService } from "./entites.service";
var EntiteSelectorComponent = /** @class */ (function () {
    function EntiteSelectorComponent(entitesService) {
        this.entitesService = entitesService;
        this.onlyFederations = false;
        this.isDisabled = false;
        this.changed = new Array();
        this.touched = new Array();
    }
    EntiteSelectorComponent_1 = EntiteSelectorComponent;
    EntiteSelectorComponent.prototype.ngOnInit = function () {
    };
    EntiteSelectorComponent.prototype.writeValue = function (value) {
        var _this = this;
        this.idEntite = value;
        if (this.idEntite)
            this.entitesService.getEntity(this.idEntite).then(function (e) { return _this.entite = e; });
    };
    EntiteSelectorComponent.prototype.registerOnChange = function (fn) {
        this.changed.push(fn);
    };
    EntiteSelectorComponent.prototype.registerOnTouched = function (fn) {
        this.touched.push(fn);
    };
    EntiteSelectorComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EntiteSelectorComponent.prototype, "onlyFederations", void 0);
    __decorate([
        ViewChild(NgModel),
        __metadata("design:type", NgModel)
    ], EntiteSelectorComponent.prototype, "model", void 0);
    EntiteSelectorComponent = EntiteSelectorComponent_1 = __decorate([
        Component({
            selector: 'entite-selector',
            template: "<span *ngIf=\"entite\" ><a [routerLink]=\"['/entities', entite.id]\">{{entite.nom}}</a> - </span>\n\t<a *ngIf=\"!isDisabled\" [routerLink]=\"[onlyFederations ? '/federations' : '/entities']\" [queryParams]=\"{forSelect : true}\" id=\"entity\">Choisir...</a>",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: EntiteSelectorComponent_1,
                    multi: true,
                }]
        }),
        __metadata("design:paramtypes", [EntitesService])
    ], EntiteSelectorComponent);
    return EntiteSelectorComponent;
    var EntiteSelectorComponent_1;
}());
export { EntiteSelectorComponent };
//# sourceMappingURL=entite-selector.component.js.map