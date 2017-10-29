var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DateService } from "../general/date.service";
import { RulesService } from '../rules/rules.service';
var CompetitionsService = /** @class */ (function () {
    function CompetitionsService(http, dateService, rulesService) {
        this.http = http;
        this.dateService = dateService;
        this.rulesService = rulesService;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    CompetitionsService.prototype.getCompetitionsDescription = function () {
        var _this = this;
        return this.http.get("api/competitions").toPromise().then(function (r) { return _this.dateService.jsonWithDate(r.text()); });
    };
    CompetitionsService.prototype.getCompetition = function (idCompetition) {
        var _this = this;
        return this.http.get("api/competitions/" + idCompetition)
            .toPromise()
            .then(function (r) { return _this.dateService.jsonWithDate(r.text()); })
            .then(function (c) {
            return _this.rulesService.getRule(c.idRule).then(function (r) {
                c.rule = r;
                return c;
            });
        });
    };
    CompetitionsService.prototype.saveCompetition = function (competition) {
        //if(typeof competition.dates[0] !== "Date")
        var _this = this;
        return this.http.post("api/competitions", competition, { headers: this.headers }).toPromise().then(function (r) { return _this.dateService.jsonWithDate(r.text()); });
    };
    CompetitionsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, DateService, RulesService])
    ], CompetitionsService);
    return CompetitionsService;
}());
export { CompetitionsService };
//# sourceMappingURL=competitions.service.js.map