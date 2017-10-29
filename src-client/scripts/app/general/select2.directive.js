var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, Renderer, EventEmitter } from '@angular/core';
import * as _ from "lodash";
var Select2Directive = /** @class */ (function () {
    // @HostListener('select2:select')
    // private select(e: Event) {
    // 	this.value.next(this.element.val());
    // 	this.onSelect.emit(e);
    // }
    // @HostListener('select2:unselect')
    // private unselect(e: Event) {
    // 	this.value.next(this.element.val());
    // 	this.onUnselect.emit(e);
    // }
    function Select2Directive(el, renderer) {
        this.onSelect = new EventEmitter();
        this.onUnselect = new EventEmitter();
        this.valueChange = new EventEmitter();
        var that = this;
        this.element = jQuery(el.nativeElement);
        this.element.on('select2:select', function (e) {
            that.valueChange.next(that.element.val());
            that.onSelect.emit(e);
        });
        this.element.on('select2:unselect', function (e) {
            that.valueChange.next(that.element.val());
            that.onUnselect.emit(e);
        });
    }
    Object.defineProperty(Select2Directive.prototype, "disable", {
        set: function (disable) {
            this.element.prop("disabled", disable);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Select2Directive.prototype.ngOnInit = function () {
    };
    Select2Directive.prototype.ngAfterViewInit = function () {
        this.initSelect2();
    };
    Select2Directive.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName == 'value') {
                var chng = changes[propName];
                if (!_.isEqual(chng.currentValue, chng.previousValue)) {
                    this.initSelect2();
                    this.element.val(chng.currentValue);
                    this.element.trigger("change");
                }
            }
        }
    };
    Select2Directive.prototype.initSelect2 = function () {
        if (this.element.data('select2'))
            this.element.select2("destroy");
        this.element.select2({
            placeholder: this.placeHolder,
            allowClear: true
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Select2Directive.prototype, "placeHolder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Select2Directive.prototype, "disable", null);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Select2Directive.prototype, "value", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Select2Directive.prototype, "onSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Select2Directive.prototype, "onUnselect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Select2Directive.prototype, "valueChange", void 0);
    Select2Directive = __decorate([
        Directive({ selector: '[select2]' }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], Select2Directive);
    return Select2Directive;
}());
export { Select2Directive };
//# sourceMappingURL=select2.directive.js.map