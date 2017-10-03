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
var ITarget_1 = require("./model/ITarget");
var IConcurrent_1 = require("./model/IConcurrent");
var _ = require("lodash");
var TargetComponent = /** @class */ (function () {
    function TargetComponent() {
    }
    Object.defineProperty(TargetComponent.prototype, "distances", {
        get: function () {
            return _.uniq(this.target.distances).map(function (d) { return d + "m"; }).join(" / ");
        },
        enumerable: true,
        configurable: true
    });
    TargetComponent.prototype.ngOnInit = function () {
    };
    TargetComponent.prototype.ngOnDestroy = function () {
    };
    TargetComponent.prototype.affectCompetitorToPositionning = function (i) {
        this.target.competitors[i] = this.competitorToPositionning;
        this.competitorToPositionning.target = this.target.numero;
        this.competitorToPositionning.position = i;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", ITarget_1.ITarget)
    ], TargetComponent.prototype, "target", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", IConcurrent_1.IConcurrent)
    ], TargetComponent.prototype, "competitorToPositionning", void 0);
    TargetComponent = __decorate([
        core_1.Component({
            selector: 'target',
            template: "<div class=\"box box-solid box-primary target\">\n\t<div class=\"box-header\">\n\t\t<h3 class=\"box-title\">Cible n\u00B0{{target.numero}}</h3>\n\t\t<div class=\"box-tools pull-right\">\n\t\t\t<span class=\"label label-success\">{{distances}}</span>\n\t\t  </div>\n\t</div>\n\t<div class=\"box-body\">\n\t\t<ul class=\"list-group\" id=\"targets-positions\">\n\t\t\t<li *ngFor=\"let competitor of target.competitors; index as i;\" class=\"list-group-item\">\n\t\t\t\t<div class=\"target-position\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-link\" (click)=\"affectCompetitorToPositionning(i)\">{{i | numToLetter}}</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"target-competitor\" >\n\t\t\t\t\t<div *ngIf=\"competitor\">\n\t\t\t\t\t\t<strong ><i aria-hidden=\"true\" class=\"fa fa-mars\" [ngClass]=\"{'fa-mars': competitor.archer.sexe == 0, 'fa-venus': competitor.archer.sexe == 1}\"></i> \n\t\t\t\t\t### {{competitor.archer.name}} {{competitor.archer.firstName}}</strong>\n\t\t\t\t\t<span class=\"badge\">SHCL</span></div>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>",
            styles: [
                ":host .target-position {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t:host .target-competitor {\n\t\t\tdisplay: inline-block;\n\t\t}\n\t\t\n\t\t:host .target .box-body {\n\t\t\tpadding: 0px;\n\t\t}\n\t\t\n\t\t:host .target .list-group {\n\t\t\tmargin-bottom: 0px;\n\t\t}"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], TargetComponent);
    return TargetComponent;
}());
exports.TargetComponent = TargetComponent;

//# sourceMappingURL=target.component.js.map
