var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from '../datatable/DataTableModule';
import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';
import { EntitesService } from './entites.service';
import { EntiteComponent } from './entite.component';
import { EntitesComponent, EntiteServerSideInputDataFilterPipe } from './entites.component';
import { CriterionComponent } from './criterion.component';
import { EntiteSelectorComponent } from "./entite-selector.component";
var EntitesModule = /** @class */ (function () {
    function EntitesModule() {
    }
    EntitesModule = __decorate([
        NgModule({
            imports: [RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule, ReferencesModule],
            declarations: [EntitesComponent, EntiteComponent, EntiteServerSideInputDataFilterPipe, CriterionComponent, EntiteSelectorComponent],
            bootstrap: [],
            providers: [EntitesService],
            exports: [EntitesComponent, EntiteComponent, EntiteServerSideInputDataFilterPipe, CriterionComponent, EntiteSelectorComponent]
        })
    ], EntitesModule);
    return EntitesModule;
}());
export { EntitesModule };
//# sourceMappingURL=entites.module.js.map