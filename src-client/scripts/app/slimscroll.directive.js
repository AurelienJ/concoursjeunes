System.register(["@angular/core", "jquery", "jquery-slimscroll"], function (exports_1, context_1) {
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
    var core_1, SlimScrollDirective;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            SlimScrollDirective = (function () {
                function SlimScrollDirective(el, renderer) {
                    var that = this;
                    this.element = jQuery(el.nativeElement);
                    this.element.slimScroll({
                        height: 'auto',
                        railVisible: true,
                        railColor: '#eeeeee',
                        railOpacity: 0.3,
                    });
                }
                SlimScrollDirective.prototype.onResize = function (event) {
                    this.element.slimScroll({
                        height: event.target.innerHeight - 50
                    });
                };
                return SlimScrollDirective;
            }());
            __decorate([
                core_1.HostListener('window:resize', ['$event']),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], SlimScrollDirective.prototype, "onResize", null);
            SlimScrollDirective = __decorate([
                core_1.Directive({ selector: '[slimscroll]' }),
                __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
            ], SlimScrollDirective);
            exports_1("SlimScrollDirective", SlimScrollDirective);
        }
    };
});

//# sourceMappingURL=slimscroll.directive.js.map
