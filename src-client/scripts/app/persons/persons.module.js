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
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTableModule } from '../datatable/DataTableModule';
import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';
import { EntitesModule } from "../entites/entites.module";
import { PersonsService } from './persons.service';
import { PersonComponent } from './person.component';
import { PersonsComponent, PersonServerSideInputDataFilterPipe } from './persons.component';
var PersonsModule = /** @class */ (function () {
    function PersonsModule() {
    }
    PersonsModule = __decorate([
        NgModule({
            imports: [RouterModule, BrowserModule, FormsModule, BsDatepickerModule, DataTableModule, GeneralModule, ReferencesModule, EntitesModule],
            declarations: [PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe],
            bootstrap: [],
            providers: [PersonsService],
            exports: [PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe]
        })
    ], PersonsModule);
    return PersonsModule;
}());
export { PersonsModule };
//# sourceMappingURL=persons.module.js.map