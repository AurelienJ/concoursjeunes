var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NavigatorService } from "./navigator.service";
import { AccountService } from "../account/account.service";
var MainComponent = /** @class */ (function () {
    function MainComponent(router, navigatorService, accountService) {
        this.router = router;
        this.navigatorService = navigatorService;
        this.accountService = accountService;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().then(function (a) { return _this.account = a; }).catch(function (reason) { });
    };
    MainComponent.prototype.clearNavigationPaths = function () {
        this.navigatorService.clear();
    };
    MainComponent.prototype.logout = function () {
        var _this = this;
        this.accountService.logout().then(function (r) {
            _this.router.navigate(["/login"]);
        });
    };
    MainComponent = __decorate([
        Component({
            selector: 'main',
            templateUrl: './main.component.html'
        }),
        __metadata("design:paramtypes", [Router, NavigatorService, AccountService])
    ], MainComponent);
    return MainComponent;
}());
export { MainComponent };
//# sourceMappingURL=main.component.js.map