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
import 'rxjs/add/operator/toPromise';
var ReferencesService = /** @class */ (function () {
    function ReferencesService(http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    ReferencesService.prototype.getCountries = function () {
        if (!this.countries)
            this.countries = this.http.get("api/countries", { headers: this.headers })
                .toPromise().then(function (r) { return r.json(); });
        return this.countries;
    };
    ReferencesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ReferencesService);
    return ReferencesService;
}());
export { ReferencesService };
//# sourceMappingURL=references.service.js.map