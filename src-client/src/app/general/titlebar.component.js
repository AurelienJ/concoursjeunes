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
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../_references.ts"/>
var core_1 = require("@angular/core");
var navigator_service_1 = require("./navigator.service");
var TitlebarComponent = /** @class */ (function () {
    function TitlebarComponent(navigatorService) {
        var _this = this;
        this.navigatorService = navigatorService;
        this.paths = [];
        this.navigatorService.subscribe(function (navigationStack) { return _this.paths = navigationStack; });
    }
    TitlebarComponent.prototype.clearAfter = function (index) {
        this.navigatorService.clearAfter(index);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TitlebarComponent.prototype, "title", void 0);
    TitlebarComponent = __decorate([
        core_1.Component({
            selector: 'titlebar',
            template: "<div class=\"content-header\">\n\t<h1>{{title}}</h1>\n\t<ol class=\"breadcrumb\">\n        <li><i class=\"fa fa-home\"></i></li>\n        <li *ngFor=\"let path of paths; let i = index\"><a [routerLink]=\"path.path\" [queryParams]=\"path.queryParams\" (click)=\"clearAfter(i)\">{{path.label}}</a></li>\n    </ol></div>"
        }),
        __metadata("design:paramtypes", [navigator_service_1.NavigatorService])
    ], TitlebarComponent);
    return TitlebarComponent;
}());
exports.TitlebarComponent = TitlebarComponent;

//# sourceMappingURL=titlebar.component.js.map