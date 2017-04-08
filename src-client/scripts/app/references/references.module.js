System.register(["@angular/core", "../general", "./references.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, general_1, references_service_1, ReferencesModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (references_service_1_1) {
                references_service_1 = references_service_1_1;
            }
        ],
        execute: function () {
            ReferencesModule = (function () {
                function ReferencesModule() {
                }
                return ReferencesModule;
            }());
            ReferencesModule = __decorate([
                core_1.NgModule({
                    imports: [general_1.GeneralModule],
                    declarations: [],
                    bootstrap: [],
                    providers: [references_service_1.ReferencesService],
                    exports: []
                })
            ], ReferencesModule);
            exports_1("ReferencesModule", ReferencesModule);
        }
    };
});

//# sourceMappingURL=references.module.js.map
