System.register(["@angular/core", "@angular/http", "../rules/rules.service"], function (exports_1, context_1) {
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
    var core_1, http_1, rules_service_1, CompetitionsService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            }
        ],
        execute: function () {
            CompetitionsService = (function () {
                function CompetitionsService(http, rulesService) {
                    this.http = http;
                    this.rulesService = rulesService;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Accept', 'application/json');
                }
                CompetitionsService.prototype.getCompetitionsDescription = function () {
                    return this.http.get("api/competitions").toPromise().then(function (r) { return r.json(); });
                };
                CompetitionsService.prototype.getCompetition = function (idCompetition) {
                    var _this = this;
                    return this.http.get("api/competitions/" + idCompetition)
                        .toPromise()
                        .then(function (r) { return r.json(); })
                        .then(function (c) {
                        return _this.rulesService.getRule(c.idRule).then(function (r) {
                            c.rule = r;
                            return c;
                        });
                    });
                };
                CompetitionsService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http, rules_service_1.RulesService])
                ], CompetitionsService);
                return CompetitionsService;
            }());
            exports_1("CompetitionsService", CompetitionsService);
        }
    };
});

//# sourceMappingURL=competitions.service.js.map
