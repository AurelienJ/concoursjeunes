var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var CompetitionParametersComponent = /** @class */ (function () {
    function CompetitionParametersComponent() {
    }
    CompetitionParametersComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input("competition"),
        __metadata("design:type", Object)
    ], CompetitionParametersComponent.prototype, "competition", void 0);
    CompetitionParametersComponent = __decorate([
        Component({
            selector: 'competition-parameters',
            template: "\n<div class=\"box box-info\">\n\t<div class=\"box-header with-border\">\n\t\t<h4>Informations g\u00E9n\u00E9ral</h4>\n\t</div>\n\t<div class=\"box-body\">\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"competitionName\" class=\"col-sm-2 control-label\">Nom</label>\n\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t<input type=\"text\" \n\t\t\t\t\tid=\"competitionName\" name=\"competitionName\"\n\t\t\t\t\t[(ngModel)]=\"competition.name\"\n\t\t\t\t\trequired maxlength=\"128\"\n\t\t\t\t\tplaceholder=\"Nom\" class=\"form-control\" /></div>\n\t\t</div>\n\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"competitionPlace\" class=\"col-sm-2 control-label\">Lieu</label>\n\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t<input type=\"text\"\n\t\t\t\t\tid=\"competitionPlace\" name=\"competitionPlace\"\n\t\t\t\t\t[(ngModel)]=\"competition.place\"\n\t\t\t\t\trequired maxlength=\"128\"\n\t\t\t\t\tplaceholder=\"Lieu\" class=\"form-control\"/></div>\n\t\t</div>\n\n\t\t<div class=\"form-group\">\n\t\t\t<label class=\"col-sm-2 control-label\">Date</label>\n\t\t\t<div class=\"col-sm-10\">\n\t\t\t<p class=\"form-control-static\">\n\t\t\t\t<a href=\"javascript:void(0)\" (click)=\"drp.toggle()\">\n\t\t\t\t<span *ngIf=\"competition.dates\">Du {{competition.dates && competition.dates[0] | date:'dd/MM/yyyy'}} au {{competition.dates && competition.dates[1] | date:'dd/MM/yyyy'}}</span>\n\t\t\t\t<span *ngIf=\"!competition.dates\">S\u00E9l\u00E9ctionner les dates de la comp\u00E9tition</span>\n\t\t\t\t</a>\n\t\t\t\t<bs-daterangepicker #drp [bsConfig]=\"{ containerClass: 'theme-dark-blue', locale: 'fr'}\" [(bsValue)]=\"competition.dates\" placement=\"bottom\" style=\"display: block\"></bs-daterangepicker>\n\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"box box-danger\">\n\t<div class=\"box-header with-border\">\n\t\t<h4>Comp\u00E9tition</h4>\n\t</div>\n\t<div class=\"box-body\">\n\t\t<div class=\"form-group\">\n\t\t\t<label class=\"col-md-3 col-lg-2 control-label\">R\u00E9glement</label>\n\t\t\t<div class=\"col-md-9 col-lg-10\">\n\t\t\t<p class=\"form-control-static\">\n\t\t\t<a [routerLink]=\"['/rules', competition.idRule]\" *ngIf=\"competition.rule\">{{competition.rule.name}}</a> - \n\t\t\t<a [routerLink]=\"['/rules']\" [queryParams]=\"{forSelect : true}\">Choisir...</a>\n\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"form-group\">\n\t\t\t<label class=\"col-sm-2 control-label\" for=\"competitionPhasesFinal\">Phases Finale</label>\n\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t<label><input type=\"checkbox\" name=\"competitionPhasesFinal\"\n\t\t\t\t\t[(ngModel)]=\"competition.duel\"/></label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"competitionTargetsNumber\" class=\"col-sm-2 control-label\">Nombre de cibles</label>\n\t\t\t<div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de cibles\" id=\"competitionTargetsNumber\" name=\"competitionTargetsNumber\" class=\"form-control\" [(ngModel)]=\"competition.targetsNumber\"/></div>\n\t\t</div>\n\n\t\t<div class=\"form-group\">\n\t\t\t<label for=\"competitionStartsNumber\" class=\"col-sm-2 control-label\">Nombre de d\u00E9part</label>\n\t\t\t<div class=\"col-sm-10\"><input type=\"number\" placeholder=\"Nombre de d\u00E9parts\" id=\"competitionStartsNumber\" name=\"competitionStartsNumber\" class=\"form-control\" [(ngModel)]=\"competition.startsNumber\"/></div>\n\t\t</div>\n\t</div>\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], CompetitionParametersComponent);
    return CompetitionParametersComponent;
}());
export { CompetitionParametersComponent };
//# sourceMappingURL=competition-parameters.component.js.map