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
var datatable_1 = require("../datatable");
var general_module_1 = require("../general/general.module");
var references_module_1 = require("../references/references.module");
var rules_service_1 = require("./rules.service");
var rules_component_1 = require("./rules.component");
var rule_component_1 = require("./rule.component");
var distancesAndFaces_component_1 = require("./distancesAndFaces.component");
var detailDistanceAndFaces_component_1 = require("./detailDistanceAndFaces.component");
var ranking_component_1 = require("./ranking.component");
var detailRanking_component_1 = require("./detailRanking.component");
var RulesModule = /** @class */ (function () {
    function RulesModule() {
    }
    RulesModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, platform_browser_1.BrowserModule, forms_1.FormsModule, datatable_1.DataTableModule, general_module_1.GeneralModule,
                references_module_1.ReferencesModule],
            declarations: [rule_component_1.RuleComponent, rules_component_1.RulesComponent,
                distancesAndFaces_component_1.DistancesAndFacesComponent, detailDistanceAndFaces_component_1.DetailDistancesAndFacesComponent,
                ranking_component_1.RankingComponent, detailRanking_component_1.DetailRankingComponent,
                rules_component_1.RulesServerSideInputDataFilterPipe],
            bootstrap: [],
            providers: [rules_service_1.RulesService],
            exports: [rule_component_1.RuleComponent, rules_component_1.RulesComponent, rules_component_1.RulesServerSideInputDataFilterPipe]
        })
    ], RulesModule);
    return RulesModule;
}());
exports.RulesModule = RulesModule;

//# sourceMappingURL=rules.module.js.map
