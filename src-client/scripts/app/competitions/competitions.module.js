System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "@angular/forms", "ngx-bootstrap", "../datatable/DataTableModule", "../general", "./competitions.service", "./competitions.component", "./competition.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, forms_1, ngx_bootstrap_1, DataTableModule_1, general_1, competitions_service_1, competitions_component_1, competition_component_1, CompetitionModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (ngx_bootstrap_1_1) {
                ngx_bootstrap_1 = ngx_bootstrap_1_1;
            },
            function (DataTableModule_1_1) {
                DataTableModule_1 = DataTableModule_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (competitions_service_1_1) {
                competitions_service_1 = competitions_service_1_1;
            },
            function (competitions_component_1_1) {
                competitions_component_1 = competitions_component_1_1;
            },
            function (competition_component_1_1) {
                competition_component_1 = competition_component_1_1;
            }
        ],
        execute: function () {
            CompetitionModule = (function () {
                function CompetitionModule() {
                }
                CompetitionModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, ngx_bootstrap_1.BsDatepickerModule, DataTableModule_1.DataTableModule, general_1.GeneralModule],
                        declarations: [competitions_component_1.CompetitionsComponent, competition_component_1.CompetitionComponent],
                        bootstrap: [],
                        providers: [competitions_service_1.CompetitionsService],
                        exports: [competitions_component_1.CompetitionsComponent, competition_component_1.CompetitionComponent]
                    })
                ], CompetitionModule);
                return CompetitionModule;
            }());
            exports_1("CompetitionModule", CompetitionModule);
        }
    };
});

//# sourceMappingURL=competitions.module.js.map
