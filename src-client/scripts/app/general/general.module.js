System.register(["@angular/core", "@angular/router", "@angular/platform-browser", "@angular/http", "./navigator.service", "./date.service", "./main.component", "./titlebar.component", "./arraySearch.pipe", "./uppercase.pipe", "./select2.directive", "./icheck.directive", "./slimscroll.directive"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, platform_browser_1, http_1, navigator_service_1, date_service_1, main_component_1, titlebar_component_1, arraySearch_pipe_1, uppercase_pipe_1, select2_directive_1, icheck_directive_1, slimscroll_directive_1, GeneralModule;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (navigator_service_1_1) {
                navigator_service_1 = navigator_service_1_1;
            },
            function (date_service_1_1) {
                date_service_1 = date_service_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (titlebar_component_1_1) {
                titlebar_component_1 = titlebar_component_1_1;
            },
            function (arraySearch_pipe_1_1) {
                arraySearch_pipe_1 = arraySearch_pipe_1_1;
            },
            function (uppercase_pipe_1_1) {
                uppercase_pipe_1 = uppercase_pipe_1_1;
            },
            function (select2_directive_1_1) {
                select2_directive_1 = select2_directive_1_1;
            },
            function (icheck_directive_1_1) {
                icheck_directive_1 = icheck_directive_1_1;
            },
            function (slimscroll_directive_1_1) {
                slimscroll_directive_1 = slimscroll_directive_1_1;
            }
        ],
        execute: function () {
            GeneralModule = /** @class */ (function () {
                function GeneralModule() {
                }
                GeneralModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule, platform_browser_1.BrowserModule, http_1.HttpModule],
                        declarations: [main_component_1.MainComponent, titlebar_component_1.TitlebarComponent, arraySearch_pipe_1.TableFilterPipe, uppercase_pipe_1.UpperCasePipe, select2_directive_1.Select2Directive, icheck_directive_1.ICheckDirective, slimscroll_directive_1.SlimScrollDirective],
                        bootstrap: [],
                        providers: [navigator_service_1.NavigatorService, date_service_1.DateService],
                        exports: [main_component_1.MainComponent, titlebar_component_1.TitlebarComponent, arraySearch_pipe_1.TableFilterPipe, uppercase_pipe_1.UpperCasePipe, select2_directive_1.Select2Directive, icheck_directive_1.ICheckDirective, slimscroll_directive_1.SlimScrollDirective]
                    })
                ], GeneralModule);
                return GeneralModule;
            }());
            exports_1("GeneralModule", GeneralModule);
        }
    };
});

//# sourceMappingURL=general.module.js.map
