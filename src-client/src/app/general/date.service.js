"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateService = /** @class */ (function () {
    function DateService() {
    }
    DateService.prototype.jsonWithDate = function (value) {
        return JSON.parse(value, this.dateReviver);
    };
    DateService.prototype.dateReviver = function (key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|[\+-]\d{2}:?(\d{2})?))?$/.exec(value);
            if (a) {
                return new Date(value);
            }
        }
        return value;
    };
    ;
    DateService = __decorate([
        core_1.Injectable()
    ], DateService);
    return DateService;
}());
exports.DateService = DateService;

//# sourceMappingURL=date.service.js.map