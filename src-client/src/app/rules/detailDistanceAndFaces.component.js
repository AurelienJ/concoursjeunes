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
var rules_service_1 = require("./rules.service");
var lodash_1 = require("lodash");
var DetailDistancesAndFacesComponent = /** @class */ (function () {
    function DetailDistancesAndFacesComponent(rulesService) {
        var _this = this;
        this.rulesService = rulesService;
        this.distanceAndFacesSetChange = new core_1.EventEmitter();
        this.loading = false;
        this.rulesService.getFaces().then(function (f) { return _this.faces = f; });
    }
    DetailDistancesAndFacesComponent.prototype.ngOnInit = function () {
    };
    DetailDistancesAndFacesComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        for (var propName in changes) {
            if (propName == "distanceAndFacesSet") {
                this.loading = true;
                this.selectedFaces = new Map();
                this.distanceAndFacesSet.distancesAndFaces.forEach(function (element) {
                    _this.selectedFaces.set(element, element.facesDistanceAndFaces.map(function (f) { return f.face; }));
                });
            }
        }
    };
    DetailDistancesAndFacesComponent.prototype.ngDoCheck = function () {
    };
    DetailDistancesAndFacesComponent.prototype.ngAfterViewChecked = function () {
        this.loading = false;
    };
    DetailDistancesAndFacesComponent.prototype.isSelectedFace = function (distanceAndFaces, face) {
        return lodash_1.default.some(distanceAndFaces.facesDistanceAndFaces, function (fdf) { return fdf.face == face.id; });
    };
    DetailDistancesAndFacesComponent.prototype.getSeletedFace = function (distanceAndFaces) {
        return this.selectedFaces.get(distanceAndFaces);
    };
    DetailDistancesAndFacesComponent.prototype.onValueChanged = function (distanceAndFaces, value) {
        if (this.loading)
            return;
        //retire tous ceux qui ne sont plus selectionné
        lodash_1.default.remove(distanceAndFaces.facesDistanceAndFaces, function (f) { return !lodash_1.default.includes(value, f.face); });
        //ajoute ceux qui doivent être ajouté
        lodash_1.default.filter(value, function (v) { return !lodash_1.default.some(distanceAndFaces.facesDistanceAndFaces, function (f) { return f.face == v; }); }).forEach(function (v) {
            var faceDistanceAndFaces = {
                face: v,
                principal: false
            };
            distanceAndFaces.facesDistanceAndFaces.push(faceDistanceAndFaces);
        });
        this.selectedFaces.set(distanceAndFaces, value);
    };
    DetailDistancesAndFacesComponent.prototype.dupliquer = function (distanceAndFaces) {
        for (var i = 1; i < this.distanceAndFacesSet.distancesAndFaces.length; i++) {
            this.distanceAndFacesSet.distancesAndFaces[i].distance = distanceAndFaces.distance;
            this.distanceAndFacesSet.distancesAndFaces[i].facesDistanceAndFaces = distanceAndFaces.facesDistanceAndFaces;
            this.distanceAndFacesSet.distancesAndFaces[i].defaultFace = distanceAndFaces.defaultFace;
            this.selectedFaces.set(this.distanceAndFacesSet.distancesAndFaces[i], this.selectedFaces.get(distanceAndFaces));
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DetailDistancesAndFacesComponent.prototype, "distanceAndFacesSet", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DetailDistancesAndFacesComponent.prototype, "distanceAndFacesSetChange", void 0);
    DetailDistancesAndFacesComponent = __decorate([
        core_1.Component({
            selector: 'detail-distances-faces',
            template: "<div *ngIf=\"distanceAndFacesSet\">\n        <h3>D\u00E9tail</h3>\n        <div class=\"form-group\">\n            <label for=\"libelleDistanceAndFacesSet\">Libelle</label>\n            <input placeholder=\"Libelle\" id=\"libelleDistanceAndFacesSet\" name=\"libelleDistanceAndFacesSet\" class=\"form-control\" [(ngModel)]=\"distanceAndFacesSet.name\"/>\n        </div>\n        <div *ngFor=\"let distanceAndFace of distanceAndFacesSet.distancesAndFaces\">\n            <h4>S\u00E9rie {{distanceAndFace.serie}}</h4>\n            <div class=\"form-group\">\n                <label for=\"distance\">Distance</label>\n                <input type=\"number\" placeholder=\"Distance\" id=\"distance\" name=\"distance\" class=\"form-control\" [(ngModel)]=\"distanceAndFace.distance\"/>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"faces-{{distanceAndFace.serie}}\">Blason(s)</label>\n                <select select2 multiple=\"multiple\" [value]=\"getSeletedFace(distanceAndFace)\" (valueChange)=\"onValueChanged(distanceAndFace, $event)\" placeholder=\"Blasons\" id=\"faces-{{distanceAndFace.serie}}\" name=\"faces-{{distanceAndFace.serie}}\" class=\"form-control\"  style=\"width: 100%;\">\n                    <option *ngFor=\"let face of faces\" [value]=\"face.id\" [attr.selected]=\"isSelectedFace(distanceAndFace, face) ? 'selected' : null\">{{face.name}}</option>\n                </select>\n            </div>\n            <div class=\"form-group\" *ngIf=\"distanceAndFace.serie == 1\">\n                <input type=\"button\" class=\"form-control\" value=\"Dupliquer sur les autres s\u00E9ries\" (click)=\"dupliquer(distanceAndFace)\" />\n            </div>\n        </div>\n    </div>"
        }),
        __metadata("design:paramtypes", [rules_service_1.RulesService])
    ], DetailDistancesAndFacesComponent);
    return DetailDistancesAndFacesComponent;
}());
exports.DetailDistancesAndFacesComponent = DetailDistancesAndFacesComponent;

//# sourceMappingURL=detailDistanceAndFaces.component.js.map