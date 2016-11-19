"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="_references.ts"/>
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var http_1 = require("@angular/http");
var angular2_datatable_1 = require("angular2-datatable");
var select2_directive_1 = require("./select2.directive");
var slimscroll_directive_1 = require("./slimscroll.directive");
var app_1 = require("./components/app");
var titlebar_1 = require("./components/titlebar");
var parameters_1 = require("./components/parameters");
var entites_1 = require("./components/entites");
var entite_1 = require("./components/entite");
var persons_1 = require("./components/persons");
var person_1 = require("./components/person");
var rules_1 = require("./components/rules");
var rule_1 = require("./components/rule");
var references_1 = require("./services/references");
var entites_2 = require("./services/entites");
var persons_2 = require("./services/persons");
var rules_2 = require("./services/rules");
var navigator_1 = require("./services/navigator");
var arraySearch_pipe_1 = require("./arraySearch.pipe");
var uppercase_pipe_1 = require("./uppercase.pipe");
var app_routes_1 = require("./app.routes");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule,
            router_1.RouterModule.forRoot(app_routes_1.AppRoutes, { useHash: true }), angular2_datatable_1.DataTableModule, ng2_bootstrap_1.DatepickerModule],
        declarations: [
            app_1.AppComponent, titlebar_1.TitlebarComponent,
            parameters_1.ParametersComponent,
            entites_1.EntitesComponent, entite_1.EntiteComponent,
            persons_1.PersonsComponent, person_1.PersonComponent,
            rules_1.RulesComponent, rule_1.RuleComponent,
            select2_directive_1.Select2Directive, slimscroll_directive_1.SlimScrollDirective,
            arraySearch_pipe_1.TableFilterPipe, uppercase_pipe_1.UpperCasePipe, entites_1.EntiteServerSideInputDataFilterPipe, persons_1.PersonServerSideInputDataFilterPipe, rules_1.RulesServerSideInputDataFilterPipe
        ],
        bootstrap: [app_1.AppComponent],
        providers: [navigator_1.NavigatorService, references_1.ReferencesService,
            entites_2.EntitesService, persons_2.PersonsService, rules_2.RulesService]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
