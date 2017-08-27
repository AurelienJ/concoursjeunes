System.register(["@angular/core", "@angular/http", "rxjs/add/operator/toPromise"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, RulesService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            RulesService = (function () {
                function RulesService(http) {
                    this.http = http;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Accept', 'application/json');
                }
                RulesService.prototype.countRules = function (term) {
                    return this.http.get("api/countrules", { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                };
                RulesService.prototype.getRules = function (term, sortBy, sortOrder, startOffset, endOffset) {
                    var url = "api/rules";
                    var params = [];
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
                    return this.http.get(url, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                };
                RulesService.prototype.getRule = function (id) {
                    return this.http.get("api/rules/" + id, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                };
                RulesService.prototype.saveRule = function (rule) {
                    rule.rankingCriteria.forEach(function (rc) {
                        if (rc.distancesAndFacesSet) {
                            rc.idDistancesAndFacesSet = rc.distancesAndFacesSet.id;
                            rc.idTempDistancesAndFacesSet = rc.distancesAndFacesSet.tempId;
                        }
                    });
                    return this.http.put("api/rules", rule, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                };
                RulesService.prototype.getRulesCategories = function () {
                    if (!this.rulesCategories)
                        this.rulesCategories = this.http.get("api/rulesCategories", { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                    return this.rulesCategories;
                };
                RulesService.prototype.getFaces = function () {
                    return this.http.get("api/faces").toPromise().then(function (r) { return r.json(); });
                };
                RulesService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], RulesService);
                return RulesService;
            }());
            exports_1("RulesService", RulesService);
        }
    };
});

//# sourceMappingURL=rules.service.js.map
