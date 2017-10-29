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
import { Router } from "@angular/router";
import { AccountService } from './account.service';
var SecureAccessService = /** @class */ (function () {
    function SecureAccessService(router, accountService) {
        this.router = router;
        this.accountService = accountService;
    }
    SecureAccessService.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.accountService.isLogged().then(function (isAuth) {
            if (!isAuth)
                _this.router.navigate(['/login']);
            return isAuth;
        }).catch(function () {
            _this.router.navigate(['/login']);
            return false;
        });
    };
    SecureAccessService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, AccountService])
    ], SecureAccessService);
    return SecureAccessService;
}());
export { SecureAccessService };
//# sourceMappingURL=secureaccess.service.js.map