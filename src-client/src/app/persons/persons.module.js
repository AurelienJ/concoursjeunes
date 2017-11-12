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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var DataTableModule_1 = require("../datatable/DataTableModule");
var general_module_1 = require("../general/general.module");
var references_module_1 = require("../references/references.module");
var entites_module_1 = require("../entites/entites.module");
var persons_service_1 = require("./persons.service");
var person_component_1 = require("./person.component");
var persons_component_1 = require("./persons.component");
var PersonsModule = /** @class */ (function () {
    function PersonsModule() {
    }
    PersonsModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, ngx_bootstrap_1.BsDatepickerModule, DataTableModule_1.DataTableModule, general_module_1.GeneralModule, references_module_1.ReferencesModule, entites_module_1.EntitesModule],
            declarations: [person_component_1.PersonComponent, persons_component_1.PersonsComponent, persons_component_1.PersonServerSideInputDataFilterPipe],
            bootstrap: [],
            providers: [persons_service_1.PersonsService],
            exports: [person_component_1.PersonComponent, persons_component_1.PersonsComponent, persons_component_1.PersonServerSideInputDataFilterPipe]
        })
    ], PersonsModule);
    return PersonsModule;
}());
exports.PersonsModule = PersonsModule;

//# sourceMappingURL=persons.module.js.map
