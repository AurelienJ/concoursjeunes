System.register(["@angular/core", "@angular/common", "@angular/router", "@angular/http", "@angular/platform-browser", "@angular/forms", "../general/general.module", "./account.service", "./login.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, router_1, http_1, platform_browser_1, forms_1, general_module_1, account_service_1, login_component_1, AccountModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (general_module_1_1) {
                general_module_1 = general_module_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }
        ],
        execute: function () {
            AccountModule = /** @class */ (function () {
                function AccountModule() {
                }
                AccountModule = __decorate([
                    core_1.NgModule({
                        declarations: [login_component_1.LoginComponent],
                        imports: [common_1.CommonModule, router_1.RouterModule, http_1.HttpModule, platform_browser_1.BrowserModule, forms_1.FormsModule, general_module_1.GeneralModule],
                        exports: [login_component_1.LoginComponent],
                        providers: [account_service_1.AccountService],
                    })
                ], AccountModule);
                return AccountModule;
            }());
            exports_1("AccountModule", AccountModule);
        }
    };
});

//# sourceMappingURL=account.module.js.map
