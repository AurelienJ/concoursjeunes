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
var http_1 = require("@angular/http");
var AccountService = /** @class */ (function () {
    function AccountService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.account = this.http.get("api/account", { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
    }
    AccountService.prototype.isLogged = function () {
        return this.getAccount().then(function (a) {
            if (a)
                return true;
            return false;
        }).catch(function (reason) { return false; });
    };
    AccountService.prototype.register = function (account) {
        this.account = this.http.post("api/register", account, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
        return this.account;
    };
    AccountService.prototype.getAccount = function () {
        //this.account = this.http.get("api/account", {headers: this.headers}).toPromise().then(r => r.json());
        return this.account;
    };
    AccountService.prototype.saveAccount = function (account) {
        this.account = this.http.post("api/account", account, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
        return this.account;
    };
    AccountService.prototype.login = function (account) {
        this.account = this.http.post("api/login", account, { headers: this.headers }).toPromise().then(function (r) { return r.json(); });
        return this.account;
    };
    AccountService.prototype.logout = function () {
        return this.http.get("api/logout", { headers: this.headers }).toPromise().then(function (r) { return r.text(); });
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;

//# sourceMappingURL=account.service.js.map
