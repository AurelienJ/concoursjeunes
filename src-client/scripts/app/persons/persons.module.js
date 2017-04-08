System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "@angular/forms", "../../libs/angular2-datatable", "../general", "../references/references.module", "./persons.service", "./person.component", "./persons.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, forms_1, angular2_datatable_1, general_1, references_module_1, persons_service_1, person_component_1, persons_component_1, PersonsModule;
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
            function (angular2_datatable_1_1) {
                angular2_datatable_1 = angular2_datatable_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (references_module_1_1) {
                references_module_1 = references_module_1_1;
            },
            function (persons_service_1_1) {
                persons_service_1 = persons_service_1_1;
            },
            function (person_component_1_1) {
                person_component_1 = person_component_1_1;
            },
            function (persons_component_1_1) {
                persons_component_1 = persons_component_1_1;
            }
        ],
        execute: function () {
            PersonsModule = (function () {
                function PersonsModule() {
                }
                return PersonsModule;
            }());
            PersonsModule = __decorate([
                core_1.NgModule({
                    imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, angular2_datatable_1.DataTableModule, general_1.GeneralModule, references_module_1.ReferencesModule],
                    declarations: [person_component_1.PersonComponent, persons_component_1.PersonsComponent, persons_component_1.PersonServerSideInputDataFilterPipe],
                    bootstrap: [],
                    providers: [persons_service_1.PersonsService],
                    exports: [person_component_1.PersonComponent, persons_component_1.PersonsComponent, persons_component_1.PersonServerSideInputDataFilterPipe]
                })
            ], PersonsModule);
            exports_1("PersonsModule", PersonsModule);
        }
    };
});

//# sourceMappingURL=persons.module.js.map
