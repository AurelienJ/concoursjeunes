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
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var EntitesService = /** @class */ (function () {
    function EntitesService(http) {
        this.http = http;
        this.entites = new Map();
        this.entitesNames = new Map();
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    EntitesService.prototype.getTypeEntite = function () {
        return this.http.get("api/typeentity", { headers: this.headers })
            .toPromise().then(function (r) { return r.json(); }).catch(this.handleError);
    };
    EntitesService.prototype.countEntities = function (types, childOf, term) {
        var url = "api/countentities";
        var params = [];
        if (types && types.length > 0)
            params.push("types=" + encodeURI(JSON.stringify(types)));
        if (childOf)
            params.push("childOf=" + encodeURI(childOf));
        if (term)
            params.push("search=" + encodeURI(term));
        if (params.length > 0)
            url += "?" + params.join("&");
        return this.http.get(url, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
    };
    EntitesService.prototype.getEntities = function (types, childOf, term, sortBy, sortOrder, startOffset, endOffset) {
        var _this = this;
        var url = "api/entities";
        var params = [];
        if (types && types.length > 0)
            params.push("types=" + encodeURI(JSON.stringify(types)));
        if (childOf)
            params.push("childOf=" + encodeURI(childOf));
        if (term)
            params.push("search=" + encodeURI(term));
        if (sortBy)
            params.push("sortBy=" + encodeURI(JSON.stringify(sortBy)));
        if (sortBy && sortOrder)
            params.push("sortOrder=" + encodeURI(JSON.stringify(sortOrder)));
        if (startOffset)
            params.push("start=" + startOffset);
        if (endOffset)
            params.push("length=" + (endOffset - (startOffset | 0)));
        if (params.length > 0)
            url += "?" + params.join("&");
        var entitiesPromise = this.http.get(url, { headers: this.headers }).toPromise();
        return entitiesPromise
            .then(function (res) { return res.json(); })
            .then(function (entites) {
            entites.forEach(function (entite) {
                _this.entites[entite.id] = entite;
            });
            return entites;
        })
            .catch(this.handleError);
    };
    EntitesService.prototype.getEntity = function (id) {
        var _this = this;
        if (this.entites && this.entites[id]) {
            return new Promise(function (resolve, reject) {
                if (_this.entites[id].idEntiteParent && (!_this.entites[id].entiteParent || _this.entites[id].entiteParent.id != _this.entites[id].idEntiteParent))
                    _this.getEntity(_this.entites[id].idEntiteParent).then(function (parent) { return _this.entites[id].entiteParent = parent; });
                resolve(_this.entites[id]);
            });
        }
        else {
            var entitiePromise = this.http.get("api/entities/" + id, { headers: this.headers }).toPromise();
            return entitiePromise.then(function (res) { return res.json(); })
                .then(function (entite) {
                if (entite.idEntiteParent != null)
                    _this.getEntity(entite.idEntiteParent).then(function (parent) { return entite.entiteParent = parent; });
                _this.entites[entite.id] = entite;
                return entite;
            })
                .catch(this.handleError);
        }
    };
    EntitesService.prototype.getEntityName = function (id) {
        var _this = this;
        if (this.entitesNames[id])
            return new Promise(function (resolve, reject) {
                resolve(_this.entitesNames[id]);
            });
        return this.http.get("api/entityname/" + id, { headers: this.headers }).toPromise().then(function (r) {
            var value = r.text();
            _this.entitesNames.set(id, value);
            return value;
        });
    };
    EntitesService.prototype.saveEntite = function (entite) {
        var _this = this;
        var entiteParent = entite.entiteParent;
        if (entiteParent)
            entite.idEntiteParent = entiteParent.id;
        delete entite.entiteParent;
        var url = "api/entities";
        var request;
        if (entite.id)
            request = this.http.post(url, entite, { headers: this.headers });
        else
            request = this.http.put(url, entite, { headers: this.headers });
        return request.toPromise()
            .then(function (response) { return response.json(); })
            .then(function (updatedEntite) {
            if ((updatedEntite.idEntiteParent && !entiteParent) || (entiteParent && updatedEntite.idEntiteParent != entiteParent.id)) {
                _this.getEntity(updatedEntite.idEntiteParent).then(function (parent) { return updatedEntite.entiteParent = parent; });
            }
            else {
                updatedEntite.entiteParent = entiteParent;
            }
            return updatedEntite;
        })
            .catch(function (error) {
            entite.entiteParent = entiteParent;
            return _this.handleError(error);
        });
    };
    EntitesService.prototype.getCriteria = function (idEntity) {
        var _this = this;
        return this.http.get("api/entities/" + idEntity + "/criteria").toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    EntitesService.prototype.saveCriteria = function (idEntity, criteria) {
        var _this = this;
        criteria.forEach(function (c) { return c.idFederation = idEntity; });
        return this.http.post("api/entities/" + idEntity + "/criteria", criteria, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    EntitesService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EntitesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], EntitesService);
    return EntitesService;
}());
export { EntitesService };
//# sourceMappingURL=entites.service.js.map