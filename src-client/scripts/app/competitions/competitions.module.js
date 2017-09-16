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
var competitions_service_1 = require("./competitions.service");
var competitions_component_1 = require("./competitions.component");
var competition_component_1 = require("./competition.component");
var CompetitionModule = /** @class */ (function () {
    function CompetitionModule() {
    }
    CompetitionModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, ngx_bootstrap_1.BsDatepickerModule, DataTableModule_1.DataTableModule, general_module_1.GeneralModule],
            declarations: [competitions_component_1.CompetitionsComponent, competition_component_1.CompetitionComponent],
            bootstrap: [],
            providers: [competitions_service_1.CompetitionsService],
            exports: [competitions_component_1.CompetitionsComponent, competition_component_1.CompetitionComponent]
        })
    ], CompetitionModule);
    return CompetitionModule;
}());
exports.CompetitionModule = CompetitionModule;

//# sourceMappingURL=competitions.module.js.map
