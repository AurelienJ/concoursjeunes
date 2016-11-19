"use strict";
/**
 * Represent a rules criterion
 */
var Criterion = (function () {
    function Criterion() {
    }
    Object.defineProperty(Criterion.prototype, "criterionElements", {
        get: function () {
            return this._criterionElements;
        },
        set: function (elements) {
            var _this = this;
            elements.forEach(function (e) { return e.criterion = _this; });
            this._criterionElements = elements;
        },
        enumerable: true,
        configurable: true
    });
    return Criterion;
}());
exports.Criterion = Criterion;

//# sourceMappingURL=Criterion.js.map
