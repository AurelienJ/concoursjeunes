"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../_references.ts"/>
var core_1 = require("@angular/core");
var ParametersComponent = /** @class */ (function () {
    function ParametersComponent() {
    }
    ParametersComponent = __decorate([
        core_1.Component({
            selector: 'parameters',
            template: "<div class=\"content-header\">\n    <h1>Param\u00E8tres</h1>\n    <ol class=\"breadcrumb\">\n        <li>Accueil</li>\n        <li class=\"active\">Param\u00E8tres</li>\n    </ol>\n    </div>\n    <div class=\"content body\">\n\n    </div>\n    "
        })
    ], ParametersComponent);
    return ParametersComponent;
}());
exports.ParametersComponent = ParametersComponent;

//# sourceMappingURL=parameters.component.js.map