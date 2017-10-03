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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var NavigationSnapshot_1 = require("./NavigationSnapshot");
require("rxjs/add/operator/filter");
var NavigatorService = /** @class */ (function () {
    function NavigatorService(router, route, location) {
        this.router = router;
        this.route = route;
        this.location = location;
        this.navigationStack = [];
        //public navigationStack$ : Observable<NavigationSnapshot[]>;
        this.onChangesListeners = [];
    }
    NavigatorService.prototype.push = function (snapshot) {
        this.navigationStack.push(snapshot);
        this.onChange();
    };
    NavigatorService.prototype.pop = function () {
        var item = this.navigationStack.pop();
        this.onChange();
        return item;
    };
    NavigatorService.prototype.pushUrlSegments = function (label, url, queryParams) {
        var urlSnapshot = new NavigationSnapshot_1.NavigationSnapshot(label, url, queryParams, null);
        var currentTopUrl = this.getCurrentNavigationSnapshot();
        var previousUrl = this.getPreviousNavigationSnapshot();
        if (previousUrl && previousUrl.toPathString() == urlSnapshot.toPathString())
            this.pop();
        else if (!currentTopUrl || currentTopUrl.toPathString() != urlSnapshot.toPathString())
            this.push(urlSnapshot);
        this.onChange();
    };
    NavigatorService.prototype.subscribe = function (fn) {
        this.onChangesListeners.push(fn);
    };
    NavigatorService.prototype.unsubscribe = function (fn) {
        var i = this.onChangesListeners.indexOf(fn);
        if (i > -1) {
            this.onChangesListeners.splice(i, 1);
        }
    };
    NavigatorService.prototype.onChange = function () {
        for (var _i = 0, _a = this.onChangesListeners; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler(this.navigationStack);
        }
    };
    NavigatorService.prototype.clear = function () {
        this.navigationStack = [];
        this.onChange();
    };
    NavigatorService.prototype.clearAfter = function (index) {
        this.navigationStack.length = index + 1;
        this.onChange();
    };
    NavigatorService.prototype.goBack = function (router, returnData, returnDataType, index) {
        if (!index) {
            var previousView = this.getPreviousNavigationSnapshot();
            previousView.returnData = returnData;
            previousView.returnDataType = returnDataType;
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
                    indexView.returnDataType = returnDataType;
                    this.navigationStack.length = index + 1;
                    this.onChange();
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
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, common_1.Location])
    ], NavigatorService);
    return NavigatorService;
}());
exports.NavigatorService = NavigatorService;

//# sourceMappingURL=navigator.service.js.map
