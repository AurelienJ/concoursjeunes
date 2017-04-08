System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "../../libs/angular2-datatable", "../general", "../references/references.module", "./parameters.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, angular2_datatable_1, general_1, references_module_1, parameters_component_1, ParametersModule;
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
            function (angular2_datatable_1_1) {
                angular2_datatable_1 = angular2_datatable_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (references_module_1_1) {
                references_module_1 = references_module_1_1;
            },
            function (parameters_component_1_1) {
                parameters_component_1 = parameters_component_1_1;
            }
        ],
        execute: function () {
            ParametersModule = (function () {
                function ParametersModule() {
                }
                return ParametersModule;
            }());
            ParametersModule = __decorate([
                core_1.NgModule({
                    imports: [router_1.RouterModule, platform_browser_1.BrowserModule, angular2_datatable_1.DataTableModule, general_1.GeneralModule, references_module_1.ReferencesModule],
                    declarations: [parameters_component_1.ParametersComponent],
                    bootstrap: [],
                    providers: [],
                    exports: [parameters_component_1.ParametersComponent]
                })
            ], ParametersModule);
            exports_1("ParametersModule", ParametersModule);
        }
    };
});

//# sourceMappingURL=parameters.module.js.map
