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
///<reference path="../_references.ts"/>
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var EntitesService = (function () {
    function EntitesService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    EntitesService.prototype.getEntities = function () {
        var entitiesPromise = this.http.get("api/entities", { headers: this.headers }).toPromise();
        return entitiesPromise.then(function (res) { return res.json(); }).catch(this.handleError);
    };
    EntitesService.prototype.getEntitie = function (id) {
        var _this = this;
        var entitiePromise = this.http.get("api/entities/" + id, { headers: this.headers }).toPromise();
        return entitiePromise.then(function (res) { return res.json(); })
            .then(function (entite) {
            if (entite.idEntiteParent != null)
                _this.getEntitie(entite.idEntiteParent).then(function (parent) { return entite.entiteParent = parent; });
            return entite;
        })
            .catch(this.handleError);
    };
    EntitesService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EntitesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EntitesService);
    return EntitesService;
}());
exports.EntitesService = EntitesService;

//# sourceMappingURL=entites.js.map
