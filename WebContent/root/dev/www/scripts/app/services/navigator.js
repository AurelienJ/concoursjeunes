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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var NavigationSnapshot_1 = require('../models/NavigationSnapshot');
require('rxjs/add/operator/filter');
var NavigatorService = (function () {
    //public navigationStack$ : Observable<NavigationSnapshot[]>;
    function NavigatorService(router, route, location) {
        this.router = router;
        this.route = route;
        this.location = location;
        this.navigationStack = [];
    }
    NavigatorService.prototype.push = function (snapshot) {
        this.navigationStack.push(snapshot);
    };
    NavigatorService.prototype.pop = function () {
        return this.navigationStack.pop();
    };
    NavigatorService.prototype.pushUrlSegments = function (label, url, queryParams) {
        var urlSnapshot = new NavigationSnapshot_1.NavigationSnapshot(label, url, queryParams, null);
        var currentTopUrl = this.getCurrentNavigationSnapshot();
        var previousUrl = this.getPreviousNavigationSnapshot();
        if (previousUrl && previousUrl.toPathString() == urlSnapshot.toPathString())
            this.pop();
        else if (!currentTopUrl || currentTopUrl.toPathString() != urlSnapshot.toPathString())
            this.push(urlSnapshot);
    };
    NavigatorService.prototype.clear = function () {
        this.navigationStack = [];
    };
    NavigatorService.prototype.clearAfter = function (index) {
        this.navigationStack.length = index + 1;
    };
    NavigatorService.prototype.goBack = function (router, returnData, index) {
        if (!index) {
            var previousView = this.getPreviousNavigationSnapshot();
            previousView.returnData = returnData;
            this.pop();
            router.navigate(previousView.path, { queryParams: previousView.queryParams });
        }
        else {
            if (index < 0)
                index = this.navigationStack.length - 1 + index;
            if (index >= 0 && index < this.navigationStack.length) {
                var indexView = this.navigationStack[index];
                if (indexView) {
                    indexView.returnData = returnData;
                    this.navigationStack.length = index + 1;
                    router.navigate(indexView.path, { queryParams: indexView.queryParams });
                }
            }
        }
    };
    /**
     * Retourne le point de navigation courant
     */
    NavigatorService.prototype.getCurrentNavigationSnapshot = function () {
        if (this.navigationStack && this.navigationStack.length > 0)
            return this.navigationStack[this.navigationStack.length - 1];
        return null;
    };
    /**
     * Retourne le point de navigation précédent
     */
    NavigatorService.prototype.getPreviousNavigationSnapshot = function () {
        if (this.navigationStack && this.navigationStack.length > 1)
            return this.navigationStack[this.navigationStack.length - 2];
        return null;
    };
    NavigatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], NavigatorService);
    return NavigatorService;
}());
exports.NavigatorService = NavigatorService;

//# sourceMappingURL=navigator.js.map
