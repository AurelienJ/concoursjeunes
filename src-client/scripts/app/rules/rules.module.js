System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "@angular/forms", "../datatable", "../general", "../references/references.module", "./rules.service", "./rules.component", "./rule.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, forms_1, datatable_1, general_1, references_module_1, rules_service_1, rules_component_1, rule_component_1, RulesModule;
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
            function (datatable_1_1) {
                datatable_1 = datatable_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (references_module_1_1) {
                references_module_1 = references_module_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            },
            function (rules_component_1_1) {
                rules_component_1 = rules_component_1_1;
            },
            function (rule_component_1_1) {
                rule_component_1 = rule_component_1_1;
            }
        ],
        execute: function () {
            RulesModule = (function () {
                function RulesModule() {
                }
                RulesModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, datatable_1.DataTableModule, general_1.GeneralModule, references_module_1.ReferencesModule],
                        declarations: [rule_component_1.RuleComponent, rules_component_1.RulesComponent, rules_component_1.RulesServerSideInputDataFilterPipe],
                        bootstrap: [],
                        providers: [rules_service_1.RulesService],
                        exports: [rule_component_1.RuleComponent, rules_component_1.RulesComponent, rules_component_1.RulesServerSideInputDataFilterPipe]
                    })
                ], RulesModule);
                return RulesModule;
            }());
            exports_1("RulesModule", RulesModule);
        }
    };
});

//# sourceMappingURL=rules.module.js.map
