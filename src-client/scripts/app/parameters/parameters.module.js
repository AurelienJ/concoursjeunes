"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var general_module_1 = require("../general/general.module");
var references_module_1 = require("../references/references.module");
var parameters_component_1 = require("./parameters.component");
var ParametersModule = /** @class */ (function () {
    function ParametersModule() {
    }
    ParametersModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, general_module_1.GeneralModule, references_module_1.ReferencesModule],
            declarations: [parameters_component_1.ParametersComponent],
            bootstrap: [],
            providers: [],
            exports: [parameters_component_1.ParametersComponent]
        })
    ], ParametersModule);
    return ParametersModule;
}());
exports.ParametersModule = ParametersModule;

//# sourceMappingURL=parameters.module.js.map
