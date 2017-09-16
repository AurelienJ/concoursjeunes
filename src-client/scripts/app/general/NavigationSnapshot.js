"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavigationSnapshot = /** @class */ (function () {
    function NavigationSnapshot(label, currentUrl, queryParams, stateData) {
        this.label = label;
        this.currentUrl = currentUrl;
        this.queryParams = queryParams;
        this.stateData = stateData;
        this.path = NavigationSnapshot.getPath(currentUrl);
    }
    NavigationSnapshot.prototype.toPathString = function () {
        var pathString = this.path.join("/");
        if (this.queryParams) {
            var params = [];
            for (var key in this.queryParams) {
                if (this.queryParams.hasOwnProperty(key)) {
                    var element = this.queryParams[key];
                    params.push(key + "=" + element.toString());
                }
            }
            if (params.length > 0)
                pathString += "?" + params.join("&");
        }
        return pathString;
    };
    NavigationSnapshot.getPath = function (url) {
        var path = url.map(function (u) { return u.path; });
        path.unshift("/");
        return path;
    };
    return NavigationSnapshot;
}());
exports.NavigationSnapshot = NavigationSnapshot;

//# sourceMappingURL=NavigationSnapshot.js.map
