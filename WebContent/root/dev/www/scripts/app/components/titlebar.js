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
///<reference path="../_references.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var navigator_1 = require("../services/navigator");
require("rxjs/add/operator/share");
var TitlebarComponent = (function () {
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
    __metadata("design:paramtypes", [router_1.Router, navigator_1.NavigatorService])
], TitlebarComponent);
exports.TitlebarComponent = TitlebarComponent;

//# sourceMappingURL=titlebar.js.map
