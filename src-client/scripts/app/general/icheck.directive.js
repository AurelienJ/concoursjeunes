var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
var ICheckDirective = /** @class */ (function () {
    function ICheckDirective(el) {
        this.change = new EventEmitter();
        this.element = jQuery(el.nativeElement);
    }
    ICheckDirective.prototype.ngAfterViewInit = function () {
        var that = this;
        this.element.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
        this.element.on('ifToggled', function (event) {
            that.change.emit(that.element[0].checked);
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ICheckDirective.prototype, "change", void 0);
    ICheckDirective = __decorate([
        Directive({ selector: '[icheck]' }),
        __metadata("design:paramtypes", [ElementRef])
    ], ICheckDirective);
    return ICheckDirective;
}());
export { ICheckDirective };
//# sourceMappingURL=icheck.directive.js.map