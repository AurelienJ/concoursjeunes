System.register(["@angular/core", "./DataTable"], function (exports_1, context_1) {
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
    var core_1, DataTable_1, DefaultSorter;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DataTable_1_1) {
                DataTable_1 = DataTable_1_1;
            }
        ],
        execute: function () {
            DefaultSorter = (function () {
                function DefaultSorter(mfTable) {
                    this.mfTable = mfTable;
                    this.isSortedByMeAsc = false;
                    this.isSortedByMeDesc = false;
                }
                DefaultSorter.prototype.ngOnInit = function () {
                    var _this = this;
                    this.mfTable.onSortChange.subscribe(function (event) {
                        _this.isSortedByMeAsc = (event.sortBy == _this.sortBy && event.sortOrder == "asc");
                        _this.isSortedByMeDesc = (event.sortBy == _this.sortBy && event.sortOrder == "desc");
                    });
                };
                DefaultSorter.prototype.sort = function () {
                    if (this.isSortedByMeAsc) {
                        this.mfTable.setSort(this.sortBy, "desc");
                    }
                    else {
                        this.mfTable.setSort(this.sortBy, "asc");
                    }
                };
                return DefaultSorter;
            }());
            __decorate([
                core_1.Input("by"),
                __metadata("design:type", String)
            ], DefaultSorter.prototype, "sortBy", void 0);
            DefaultSorter = __decorate([
                core_1.Component({
                    selector: "mfDefaultSorter",
                    template: "\n        <a style=\"cursor: pointer\" (click)=\"sort()\" class=\"text-nowrap\">\n            <ng-content></ng-content>\n            <span *ngIf=\"isSortedByMeAsc\" class=\"glyphicon glyphicon-triangle-top\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"isSortedByMeDesc\" class=\"glyphicon glyphicon-triangle-bottom\" aria-hidden=\"true\"></span>\n        </a>"
                }),
                __metadata("design:paramtypes", [DataTable_1.DataTable])
            ], DefaultSorter);
            exports_1("DefaultSorter", DefaultSorter);
        }
    };
});

//# sourceMappingURL=DefaultSorter.js.map
