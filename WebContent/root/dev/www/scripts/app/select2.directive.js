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
var core_1 = require("@angular/core");
var Select2Directive = (function () {
    function Select2Directive(el, renderer) {
        this.onSelect = new core_1.EventEmitter();
        this.onUnselect = new core_1.EventEmitter();
        this.value = new core_1.EventEmitter();
        var that = this;
        this.element = jQuery(el.nativeElement);
        this.element.select2({
            placeholder: this.placeHolder,
            allowClear: true
        });
        this.value.next(this.element.val());
        this.element.on('select2:select', function (e) {
            that.value.next(that.element.val());
            that.onSelect.emit(e);
        });
        this.element.on('select2:unselect', function (e) {
            that.value.next(that.element.val());
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
    return Select2Directive;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Select2Directive.prototype, "placeHolder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Select2Directive.prototype, "disable", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Select2Directive.prototype, "onSelect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Select2Directive.prototype, "onUnselect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], Select2Directive.prototype, "value", void 0);
Select2Directive = __decorate([
    core_1.Directive({ selector: '[select2]' }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], Select2Directive);
exports.Select2Directive = Select2Directive;

//# sourceMappingURL=select2.directive.js.map
