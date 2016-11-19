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
var AppComponent = (function () {
    function AppComponent(route, navigatorService) {
        this.route = route;
        this.navigatorService = navigatorService;
    }
    AppComponent.prototype.ngOnInit = function () {
        //this.route.
    };
    AppComponent.prototype.clearNavigationPaths = function () {
        this.navigatorService.clear();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: "\n    <header class=\"main-header\">\n        <a class=\"logo\" href=\"http://arccompetition.ajdeveloppement.org\">\n            <span class=\"logo-mini\"><b>A</b>C</span>\n            <span class=\"logo-lg\"><b>Arc</b>Competition</span>\n        </a>\n         <nav class=\"navbar navbar-static-top\" role=\"navigation\">\n            <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\n                <span class=\"sr-only\">Toggle navigation</span>\n            </a>\n            <!---->\n            <!-- Navbar Right Menu -->\n            <div class=\"navbar-custom-menu\">\n                <ul class=\"nav navbar-nav\">\n                    <li><a href=\"#\"><i class=\"fa fa-gears\"></i></a></li>\n                </ul>\n            </div>\n            <div class=\"navbar-custom-menu navbar-titre navbar-custom-menu-left\">Gestion des competitions de Tir \u00E0 l'Arc</div>\n        </nav>\n    </header>\n   \n    <!-- Sidebar -->\n    <aside class=\"main-sidebar\">\n        <div slimscroll>\n        <!-- user panel (Optional) -->\n        <div class=\"logo-panel\">\n        <div class=\"image\">\n            <img src=\"images/fnd.jpg\" alt=\"ArcCompetion\" />\n        </div>\n        <!--<div class=\"pull-left info\">\n            <span class=\"masquable\"><br />Gestion des competitions de Tir \u00E0 l'Arc</span>\n        </div>-->\n        </div>\n\n        <!-- Search Form (Optional) -->\n        <form action=\"#\" method=\"get\" class=\"sidebar-form\">\n        <div class=\"input-group\">\n            <input type=\"text\" name=\"q\" class=\"form-control\" placeholder=\"Recherche...\">\n            <span class=\"input-group-btn\">\n            <button type=\"submit\" name=\"search\" id=\"search-btn\" class=\"btn btn-flat\"><i class=\"fa fa-search\"></i></button>\n            </span>\n        </div>\n        </form>\n        \n        <ul class=\"sidebar-menu\">\n            <li class=\"header\">Gestion</li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['dashboard']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-dashboard\"></i><span>Tableau de bord</span></a></li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['competition']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-asterisk\"></i><span>Comp\u00E9titions</span></a></li>\n\n            <li class=\"header\">Base de donn\u00E9es</li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['persons']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-users\"></i><span>Personnes</span></a></li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['entities']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-building\"></i><span>Entit\u00E9s</span></a></li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['rules']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-book\"></i><span>R\u00E9glements</span></a></li>\n\n            <li class=\"header\">Divers</li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['importexport']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-exchange\"></i><span>Import/Export</span></a></li>\n            <li [routerLinkActive]=\"['active']\"><a [routerLink]=\"['tools']\" (click)=\"clearNavigationPaths()\"><i class=\"fa fa-briefcase\"></i><span>Outils</span></a></li>\n        </ul>\n        </div>\n    </aside>\n    <div class=\"content-wrapper\">\n        <router-outlet></router-outlet>     \n    </div>\n    "
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, navigator_1.NavigatorService])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.js.map
