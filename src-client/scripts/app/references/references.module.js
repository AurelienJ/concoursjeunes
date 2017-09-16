"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var general_module_1 = require("../general/general.module");
var references_service_1 = require("./references.service");
var ReferencesModule = /** @class */ (function () {
    function ReferencesModule() {
    }
    ReferencesModule = __decorate([
        core_1.NgModule({
            imports: [general_module_1.GeneralModule],
            declarations: [],
            bootstrap: [],
            providers: [references_service_1.ReferencesService],
            exports: []
        })
    ], ReferencesModule);
    return ReferencesModule;
}());
exports.ReferencesModule = ReferencesModule;

//# sourceMappingURL=references.module.js.map
