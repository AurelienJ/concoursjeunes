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
var http_1 = require("@angular/http");
var navigator_service_1 = require("./navigator.service");
var date_service_1 = require("./date.service");
var main_component_1 = require("./main.component");
var titlebar_component_1 = require("./titlebar.component");
var arraySearch_pipe_1 = require("./arraySearch.pipe");
var uppercase_pipe_1 = require("./uppercase.pipe");
var select2_directive_1 = require("./select2.directive");
var icheck_directive_1 = require("./icheck.directive");
var slimscroll_directive_1 = require("./slimscroll.directive");
var equal_validator_directive_1 = require("./equal-validator.directive");
var GeneralModule = /** @class */ (function () {
    function GeneralModule() {
    }
    GeneralModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, platform_browser_1.BrowserModule, http_1.HttpModule],
            declarations: [main_component_1.MainComponent, titlebar_component_1.TitlebarComponent,
                arraySearch_pipe_1.TableFilterPipe, uppercase_pipe_1.UpperCasePipe,
                select2_directive_1.Select2Directive, icheck_directive_1.ICheckDirective, slimscroll_directive_1.SlimScrollDirective,
                equal_validator_directive_1.EqualValidator],
            bootstrap: [],
            providers: [navigator_service_1.NavigatorService, date_service_1.DateService],
            exports: [main_component_1.MainComponent, titlebar_component_1.TitlebarComponent,
                arraySearch_pipe_1.TableFilterPipe, uppercase_pipe_1.UpperCasePipe,
                select2_directive_1.Select2Directive, icheck_directive_1.ICheckDirective, slimscroll_directive_1.SlimScrollDirective,
                equal_validator_directive_1.EqualValidator
            ]
        })
    ], GeneralModule);
    return GeneralModule;
}());
exports.GeneralModule = GeneralModule;

//# sourceMappingURL=general.module.js.map
