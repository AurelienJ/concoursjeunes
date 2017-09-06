System.register(["@angular/core", "@angular/platform-browser", "@angular/router", "ngx-bootstrap", "./general/general.module", "./references/references.module", "./account/account.module", "./competitions/competitions.module", "./entites/entites.module", "./persons/persons.module", "./rules/rules.module", "./parameters/parameters.module", "./slimscroll.directive", "./app.component", "./app.routes"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, router_1, ngx_bootstrap_1, general_module_1, references_module_1, account_module_1, competitions_module_1, entites_module_1, persons_module_1, rules_module_1, parameters_module_1, slimscroll_directive_1, app_component_1, app_routes_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ngx_bootstrap_1_1) {
                ngx_bootstrap_1 = ngx_bootstrap_1_1;
            },
            function (general_module_1_1) {
                general_module_1 = general_module_1_1;
            },
            function (references_module_1_1) {
                references_module_1 = references_module_1_1;
            },
            function (account_module_1_1) {
                account_module_1 = account_module_1_1;
            },
            function (competitions_module_1_1) {
                competitions_module_1 = competitions_module_1_1;
            },
            function (entites_module_1_1) {
                entites_module_1 = entites_module_1_1;
            },
            function (persons_module_1_1) {
                persons_module_1 = persons_module_1_1;
            },
            function (rules_module_1_1) {
                rules_module_1 = rules_module_1_1;
            },
            function (parameters_module_1_1) {
                parameters_module_1 = parameters_module_1_1;
            },
            function (slimscroll_directive_1_1) {
                slimscroll_directive_1 = slimscroll_directive_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }
        ],
        execute: function () {
            AppModule = /** @class */ (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule,
                            router_1.RouterModule.forRoot(app_routes_1.AppRoutes, { useHash: true }),
                            ngx_bootstrap_1.BsDatepickerModule.forRoot(),
                            general_module_1.GeneralModule, references_module_1.ReferencesModule, account_module_1.AccountModule, parameters_module_1.ParametersModule, competitions_module_1.CompetitionModule, entites_module_1.EntitesModule, persons_module_1.PersonsModule, rules_module_1.RulesModule],
                        declarations: [app_component_1.AppComponent, slimscroll_directive_1.SlimScrollDirective],
                        bootstrap: [app_component_1.AppComponent],
                        providers: []
                    })
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    };
});

//# sourceMappingURL=app.module.js.map
