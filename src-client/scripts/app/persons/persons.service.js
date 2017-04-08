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
    var core_1, http_1, PersonsService;
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
            PersonsService = (function () {
                function PersonsService(http) {
                    this.http = http;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Accept', 'application/json');
                }
                PersonsService.prototype.getCivilities = function () {
                    if (this.civilities)
                        return this.civilities;
                    this.civilities = this.http.get("api/civilities", { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                    return this.civilities;
                };
                PersonsService.prototype.countPersons = function (term) {
                    var url = "api/countcontacts";
                    var params = [];
                    if (term)
                        params.push("search=" + encodeURI(term));
                    if (params.length > 0)
                        url += "?" + params.join("&");
                    var contactsPromise = this.http.get(url, { headers: this.headers }).toPromise();
                    return contactsPromise.then(function (r) { return r.json(); });
                };
                /*public getPersons() : Promise<IPerson[]> {
                    return this.http.get("api/contacts", {headers: this.headers}).toPromise().then(r => r.json());
                }*/
                PersonsService.prototype.getPersons = function (term, sortBy, sortOrder, startOffset, endOffset) {
                    var url = "api/contacts";
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
                    var contactsPromise = this.http.get(url, { headers: this.headers }).toPromise();
                    return contactsPromise.then(function (r) { return r.json(); });
                };
                PersonsService.prototype.getPersonsForEntity = function (idEntity) {
                    return this.http.get("api/entities/" + idEntity + "/contacts", { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
                };
                PersonsService.prototype.getPerson = function (idPerson) {
                    return this.http.get("api/contacts/" + idPerson, { headers: this.headers }).toPromise().then(function (r) { return r.json(); }).then(function (p) {
                        p.certificat = new Date(p.certificat);
                        return p;
                    });
                };
                PersonsService.prototype.savePerson = function (person) {
                    var url = "api/contacts";
                    if (person.id) {
                        return this.http.post(url, person, { headers: this.headers })
                            .toPromise()
                            .then(function (r) { return r.json(); });
                    }
                    else {
                        return this.http.put(url, person, { headers: this.headers })
                            .toPromise()
                            .then(function (r) { return r.json(); });
                    }
                };
                return PersonsService;
            }());
            PersonsService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], PersonsService);
            exports_1("PersonsService", PersonsService);
        }
    };
});

//# sourceMappingURL=persons.service.js.map
