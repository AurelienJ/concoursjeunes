System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "@angular/forms", "../datatable/DataTableModule", "../general", "../references/references.module", "./entites.service", "./entite.component", "./entites.component", "./criterion.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, forms_1, DataTableModule_1, general_1, references_module_1, entites_service_1, entite_component_1, entites_component_1, criterion_component_1, EntitesModule;
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
            function (DataTableModule_1_1) {
                DataTableModule_1 = DataTableModule_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (references_module_1_1) {
                references_module_1 = references_module_1_1;
            },
            function (entites_service_1_1) {
                entites_service_1 = entites_service_1_1;
            },
            function (entite_component_1_1) {
                entite_component_1 = entite_component_1_1;
            },
            function (entites_component_1_1) {
                entites_component_1 = entites_component_1_1;
            },
            function (criterion_component_1_1) {
                criterion_component_1 = criterion_component_1_1;
            }
        ],
        execute: function () {
            EntitesModule = /** @class */ (function () {
                function EntitesModule() {
                }
                EntitesModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, DataTableModule_1.DataTableModule, general_1.GeneralModule, references_module_1.ReferencesModule],
                        declarations: [entites_component_1.EntitesComponent, entite_component_1.EntiteComponent, entites_component_1.EntiteServerSideInputDataFilterPipe, criterion_component_1.CriterionComponent],
                        bootstrap: [],
                        providers: [entites_service_1.EntitesService],
                        exports: [entites_component_1.EntitesComponent, entite_component_1.EntiteComponent, entites_component_1.EntiteServerSideInputDataFilterPipe, criterion_component_1.CriterionComponent]
                    })
                ], EntitesModule);
                return EntitesModule;
            }());
            exports_1("EntitesModule", EntitesModule);
        }
    };
});

//# sourceMappingURL=entites.module.js.map
