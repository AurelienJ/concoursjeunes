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
var forms_1 = require("@angular/forms");
var entites_service_1 = require("./entites.service");
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
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EntiteSelectorComponent.prototype, "onlyFederations", void 0);
    __decorate([
        core_1.ViewChild(forms_1.NgModel),
        __metadata("design:type", forms_1.NgModel)
    ], EntiteSelectorComponent.prototype, "model", void 0);
    EntiteSelectorComponent = EntiteSelectorComponent_1 = __decorate([
        core_1.Component({
            selector: 'entite-selector',
            template: "<span *ngIf=\"entite\" ><a [routerLink]=\"['/entities', entite.id]\">{{entite.nom}}</a> - </span>\n\t<a *ngIf=\"!isDisabled\" [routerLink]=\"[onlyFederations ? '/federations' : '/entities']\" [queryParams]=\"{forSelect : true}\" id=\"entity\">Choisir...</a>",
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: EntiteSelectorComponent_1,
                    multi: true,
                }]
        }),
        __metadata("design:paramtypes", [entites_service_1.EntitesService])
    ], EntiteSelectorComponent);
    return EntiteSelectorComponent;
    var EntiteSelectorComponent_1;
}());
exports.EntiteSelectorComponent = EntiteSelectorComponent;

//# sourceMappingURL=entite-selector.component.js.map
