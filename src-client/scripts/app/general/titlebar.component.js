System.register(["@angular/core", "@angular/router", "./navigator.service", "rxjs/add/operator/share"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, navigator_service_1, TitlebarComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (navigator_service_1_1) {
                navigator_service_1 = navigator_service_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            TitlebarComponent = (function () {
                function TitlebarComponent(router, navigatorService) {
                    this.router = router;
                    this.navigatorService = navigatorService;
                    this.paths = [];
                }
                TitlebarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.router.events.subscribe(function (event) {
                        _this.paths = [];
                        _this.navigatorService.navigationStack.forEach(function (item) {
                            _this.paths.push(item);
                        });
                    });
                };
                TitlebarComponent.prototype.clearAfter = function (index) {
                    this.navigatorService.clearAfter(index);
                };
                return TitlebarComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], TitlebarComponent.prototype, "title", void 0);
            TitlebarComponent = __decorate([
                core_1.Component({
                    selector: 'titlebar',
                    template: "<div class=\"content-header\">\n\t<h1>{{title}}</h1>\n\t<ol class=\"breadcrumb\">\n        <li><i class=\"fa fa-home\"></i></li>\n        <li *ngFor=\"let path of paths; let i = index\"><a [routerLink]=\"path.path\" [queryParams]=\"path.queryParams\" (click)=\"clearAfter(i)\">{{path.label}}</a></li>\n    </ol></div>"
                }),
                __metadata("design:paramtypes", [router_1.Router, navigator_service_1.NavigatorService])
            ], TitlebarComponent);
            exports_1("TitlebarComponent", TitlebarComponent);
        }
    };
});

//# sourceMappingURL=titlebar.component.js.map
