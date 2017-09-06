System.register(["@angular/core", "@angular/common", "./DataTable", "./DefaultSorter", "./Paginator", "./BootstrapPaginator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, DataTable_1, DefaultSorter_1, Paginator_1, BootstrapPaginator_1, DataTableModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (DataTable_1_1) {
                DataTable_1 = DataTable_1_1;
            },
            function (DefaultSorter_1_1) {
                DefaultSorter_1 = DefaultSorter_1_1;
            },
            function (Paginator_1_1) {
                Paginator_1 = Paginator_1_1;
            },
            function (BootstrapPaginator_1_1) {
                BootstrapPaginator_1 = BootstrapPaginator_1_1;
            }
        ],
        execute: function () {
            DataTableModule = /** @class */ (function () {
                function DataTableModule() {
                }
                DataTableModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule
                        ],
                        declarations: [
                            DataTable_1.DataTable,
                            DefaultSorter_1.DefaultSorter,
                            Paginator_1.Paginator,
                            BootstrapPaginator_1.BootstrapPaginator
                        ],
                        exports: [
                            DataTable_1.DataTable,
                            DefaultSorter_1.DefaultSorter,
                            Paginator_1.Paginator,
                            BootstrapPaginator_1.BootstrapPaginator
                        ]
                    })
                ], DataTableModule);
                return DataTableModule;
            }());
            exports_1("DataTableModule", DataTableModule);
        }
    };
});

//# sourceMappingURL=DataTableModule.js.map
