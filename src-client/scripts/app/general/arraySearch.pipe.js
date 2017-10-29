var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var TableFilterPipe = /** @class */ (function () {
    function TableFilterPipe() {
    }
    TableFilterPipe.prototype.transform = function (value, args) {
        var filter = null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        return filter ? value.filter(function (item) {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var element = item[key];
                    if (element && typeof element == "string" && element.toLocaleLowerCase().indexOf(filter) != -1)
                        return true;
                }
            }
            return false;
        }) : value;
    };
    TableFilterPipe = __decorate([
        Pipe({
            name: 'tableFilter'
        })
    ], TableFilterPipe);
    return TableFilterPipe;
}());
export { TableFilterPipe };
//# sourceMappingURL=arraySearch.pipe.js.map