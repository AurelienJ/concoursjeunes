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
var entites_service_1 = require("../entites/entites.service");
var IConcurrent_1 = require("./model/IConcurrent");
var CompetitorComponent = /** @class */ (function () {
    function CompetitorComponent(entiteService) {
        this.entiteService = entiteService;
        this.expanded = false;
        this.expandedChange = new core_1.EventEmitter();
        this.onTargetPositionSelect = new core_1.EventEmitter();
    }
    CompetitorComponent.prototype.ngOnInit = function () { };
    CompetitorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        for (var propName in changes) {
            if (propName == "competitor") {
                this.entiteService.getEntity(this.competitor.archer.idEntity).then(function (name) { return _this.club = name; });
            }
        }
    };
    CompetitorComponent.prototype.toggle = function () {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    };
    CompetitorComponent.prototype.getScore = function (type, indice) {
        if (!this.competitor.scores)
            this.competitor.scores = [];
        var score = this.competitor.scores.find(function (s) { return s.type == type && s.numOrdre == indice; });
        if (score)
            return score.score;
        return null;
    };
    CompetitorComponent.prototype.setScore = function (type, indice, value) {
        if (!this.competitor.scores)
            this.competitor.scores = [];
        var score = this.competitor.scores.find(function (s) { return s.type == type && s.numOrdre == indice; });
        if (!score) {
            score = { type: type, numOrdre: indice, score: value };
            this.competitor.scores.push(score);
        }
        else
            score.score = value;
    };
    CompetitorComponent.prototype.getTotal = function (type) {
        if (!this.competitor.scores)
            this.competitor.scores = [];
        var total = this.competitor.scores.filter(function (s) { return s.type == type; }).map(function (s) { return s.score; }).reduce(function (p1, p2) { return p1 + p2; }, 0);
        return total;
    };
    CompetitorComponent.prototype.selectTargetPosition = function () {
        this.onTargetPositionSelect.emit(this.competitor);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", IConcurrent_1.IConcurrent)
    ], CompetitorComponent.prototype, "competitor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompetitorComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompetitorComponent.prototype, "expandedChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompetitorComponent.prototype, "onTargetPositionSelect", void 0);
    CompetitorComponent = __decorate([
        core_1.Component({
            selector: 'competitor',
            template: "<div>\n\t<div class=\"competitor-target\">\n\t\t<h4>\n\t\t<button type=\"button\" class=\"btn btn-link\" (click)=\"selectTargetPosition()\"\n\t\t\ttooltip=\"Cliquer sur la position sur laquelle placer l'archer\"\n\t\t\tplacement=\"top\" triggers=\"click:blur\" container=\"body\">\n\t\t\t{{competitor.target || '#'}}{{competitor.position | numToLetter}}</button>\n\t\t</h4>\n\t</div>\n\t<div class=\"competitor-general\">\n\t\t<div class=\"competitor-header\">\n\t\t\t<strong><i aria-hidden=\"true\" class=\"fa\" [ngClass]=\"{'fa-mars': competitor.archer.sexe == 0, 'fa-venus': competitor.archer.sexe == 1}\"></i> \n\t\t\t{{competitor.archer.name}} {{competitor.archer.firstName}}</strong>\n\t\t\t<span class=\"badge\">SHCL</span>\n\t\t\t<span class=\"badge pull-right bg-green\">{{getTotal(0)}}</span>\n\t\t\t<br />\n\t\t\t{{club?.nom}} <span class=\"badge pull-right bg-aqua\">18m / 40cm</span>\n\t\t</div>\n\n\t\t<div *ngIf=\"expanded\">\n\t\t\t<form class=\"form-horizontal\" #concurrentForm=\"ngForm\">\n\t\t\t\t<h4>Phase qualificative</h4>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"col-sm-4 control-label\">Score:</label>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"number\" class=\"form-control\" name=\"score1\"\n\t\t\t\t\t\t\t[ngModel]=\"getScore(0, 0)\" (ngModelChange)=\"setScore(0, 0, $event)\"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"number\" class=\"form-control\" name=\"score2\"\n\t\t\t\t\t\t\t[ngModel]=\"getScore(0, 1)\" (ngModelChange)=\"setScore(0, 1, $event)\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label class=\"col-sm-4 control-label\">D\u00E9partages:</label>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"number\" class=\"form-control\" name=\"tie1\"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t<input type=\"number\" class=\"form-control\" name=\"tie2\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<h4>Phases finales</h4>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label for=\"f32\" class=\"col-sm-1 control-label\">1/32:</label><div class=\"col-sm-3\"><input type=\"number\" class=\"form-control\" name=\"f32\" /></div>\n\t\t\t\t\t<label for=\"f16\" class=\"col-sm-1 control-label\">1/16:</label><div class=\"col-sm-3\"><input type=\"number\" class=\"form-control\" name=\"f16\"/></div>\n\t\t\t\t\t<label for=\"f8\" class=\"col-sm-1 control-label\">1/8:</label><div class=\"col-sm-3\"><input type=\"number\" class=\"form-control\" name=\"f8\" /></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label for=\"f4\" class=\"col-sm-2 control-label\">1/4:</label><div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" name=\"f4\" /></div>\n\t\t\t\t\t<label for=\"f2\" class=\"col-sm-2 control-label\">1/2:</label><div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" name=\"f2\" /></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label for=\"f1\" class=\"col-sm-offset-3 col-sm-2 control-label\">Finale:</label><div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" name=\"f1\" /></div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n\t<div class=\"competitor-collapse\">\n\t\t<button type=\"button\" class=\"btn btn-link no-border\" (click)=\"toggle()\"><i class=\"fa\" [ngClass]=\"{'fa-minus-square-o': expanded, 'fa-plus-square-o': !expanded}\" aria-hidden=\"true\"></i></button>\n\t</div>\n</div>",
            styles: [
                "\n\t\t:host .competitor-target {\n\t\t\tposition: absolute;\n\t\t\ttop: 0px;\n\t\t\tleft: 0px;\n\t\t}\n\n\t\t:host .competitor-general {\n\t\t\tdisplay: inline-block;\n\t\t\twidth: calc(100% - 50px);\n\t\t\tmargin-left: 25px;\n\t\t}\n\n\t\t:host .competitor-collapse {\n\t\t\tdisplay: inline-block;\n\t\t\tposition: absolute;\n\t\t\ttop: 0px;\n\t\t\tright: 0px;\n\t\t}\n\t\t"
            ]
        }),
        __metadata("design:paramtypes", [entites_service_1.EntitesService])
    ], CompetitorComponent);
    return CompetitorComponent;
}());
exports.CompetitorComponent = CompetitorComponent;

//# sourceMappingURL=competitor.component.js.map
