"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Target = /** @class */ (function () {
    function Target(startCompetitors) {
        this.startCompetitors = startCompetitors;
    }
    Object.defineProperty(Target.prototype, "nbPositions", {
        get: function () {
            return this._nbPositions;
        },
        set: function (value) {
            this._nbPositions = value;
            this.targetCompetitors = new Array(value);
        },
        enumerable: true,
        configurable: true
    });
    Target.prototype.getCompetitor = function (position) {
        var _this = this;
        if (this.startCompetitors)
            return this.startCompetitors.find(function (c) { return c.target == _this.numero && c.position == position; });
        return null;
    };
    Object.defineProperty(Target.prototype, "competitors", {
        get: function () {
            for (var i = 0; i < this.nbPositions; i++) {
                this.targetCompetitors[i] = this.getCompetitor(i);
            }
            return this.targetCompetitors;
        },
        enumerable: true,
        configurable: true
    });
    return Target;
}());
exports.Target = Target;

//# sourceMappingURL=Target.js.map
