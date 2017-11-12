"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var general_module_1 = require("../general/general.module");
var account_service_1 = require("./account.service");
var secureaccess_service_1 = require("./secureaccess.service");
var login_component_1 = require("./login.component");
var register_component_1 = require("./register.component");
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            declarations: [login_component_1.LoginComponent, register_component_1.RegisterComponent],
            imports: [common_1.CommonModule, router_1.RouterModule, http_1.HttpModule, platform_browser_1.BrowserModule, forms_1.FormsModule, general_module_1.GeneralModule],
            exports: [login_component_1.LoginComponent, register_component_1.RegisterComponent],
            providers: [account_service_1.AccountService, secureaccess_service_1.SecureAccessService],
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;

//# sourceMappingURL=account.module.js.map
