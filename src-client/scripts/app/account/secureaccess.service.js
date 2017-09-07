System.register(["@angular/core", "@angular/router", "./account.service"], function (exports_1, context_1) {
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
    var core_1, router_1, account_service_1, SecureAccessService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }
        ],
        execute: function () {
            SecureAccessService = /** @class */ (function () {
                function SecureAccessService(router, accountService) {
                    this.router = router;
                    this.accountService = accountService;
                    this.accountService.authenticate();
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
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [router_1.Router, account_service_1.AccountService])
                ], SecureAccessService);
                return SecureAccessService;
            }());
            exports_1("SecureAccessService", SecureAccessService);
        }
    };
});

//# sourceMappingURL=secureaccess.service.js.map
