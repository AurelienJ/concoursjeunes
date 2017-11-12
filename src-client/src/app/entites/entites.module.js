"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var DataTableModule_1 = require("../datatable/DataTableModule");
var general_module_1 = require("../general/general.module");
var references_module_1 = require("../references/references.module");
var entites_service_1 = require("./entites.service");
var entite_component_1 = require("./entite.component");
var entites_component_1 = require("./entites.component");
var criterion_component_1 = require("./criterion.component");
var entite_selector_component_1 = require("./entite-selector.component");
var EntitesModule = /** @class */ (function () {
    function EntitesModule() {
    }
    EntitesModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, DataTableModule_1.DataTableModule, general_module_1.GeneralModule, references_module_1.ReferencesModule],
            declarations: [entites_component_1.EntitesComponent, entite_component_1.EntiteComponent, entites_component_1.EntiteServerSideInputDataFilterPipe, criterion_component_1.CriterionComponent, entite_selector_component_1.EntiteSelectorComponent],
            bootstrap: [],
            providers: [entites_service_1.EntitesService],
            exports: [entites_component_1.EntitesComponent, entite_component_1.EntiteComponent, entites_component_1.EntiteServerSideInputDataFilterPipe, criterion_component_1.CriterionComponent, entite_selector_component_1.EntiteSelectorComponent]
        })
    ], EntitesModule);
    return EntitesModule;
}());
exports.EntitesModule = EntitesModule;

//# sourceMappingURL=entites.module.js.map
