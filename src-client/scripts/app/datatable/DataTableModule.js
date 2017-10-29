var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataTable } from "./DataTable";
import { DefaultSorter } from "./DefaultSorter";
import { Paginator } from "./Paginator";
import { BootstrapPaginator } from "./BootstrapPaginator";
var DataTableModule = /** @class */ (function () {
    function DataTableModule() {
    }
    DataTableModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                DataTable,
                DefaultSorter,
                Paginator,
                BootstrapPaginator
            ],
            exports: [
                DataTable,
                DefaultSorter,
                Paginator,
                BootstrapPaginator
            ]
        })
    ], DataTableModule);
    return DataTableModule;
}());
export { DataTableModule };
//# sourceMappingURL=DataTableModule.js.map