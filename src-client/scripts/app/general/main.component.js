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
var router_1 = require("@angular/router");
var navigator_service_1 = require("./navigator.service");
var account_service_1 = require("../account/account.service");
var MainComponent = /** @class */ (function () {
    function MainComponent(router, navigatorService, accountService) {
        this.router = router;
        this.navigatorService = navigatorService;
        this.accountService = accountService;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().then(function (a) { return _this.account = a; });
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
        core_1.Component({
            selector: 'main',
            templateUrl: './main.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, navigator_service_1.NavigatorService, account_service_1.AccountService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;

//# sourceMappingURL=main.component.js.map
