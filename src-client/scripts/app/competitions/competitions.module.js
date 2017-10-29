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
import { BsDatepickerModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { DataTableModule } from "../datatable/DataTableModule";
import { GeneralModule } from '../general/general.module';
import { CompetitionsService } from './competitions.service';
import { CompetitionsComponent } from './competitions.component';
import { CompetitionComponent } from "./competition.component";
import { CompetitionParametersComponent } from "./competition-parameters.component";
import { CompetitionShootingLineComponent } from "./competition-shootingline.componenent";
import { CompetitorComponent } from "./competitor.component";
import { TargetComponent } from "./target.component";
import { NumToLetterPipe } from "./numToLetter.pipe";
var CompetitionModule = /** @class */ (function () {
    function CompetitionModule() {
    }
    CompetitionModule = __decorate([
        NgModule({
            imports: [RouterModule, BrowserModule, FormsModule,
                BsDatepickerModule, ButtonsModule, TooltipModule,
                DataTableModule, GeneralModule],
            declarations: [CompetitionsComponent, CompetitionComponent, CompetitionParametersComponent, CompetitionShootingLineComponent, CompetitorComponent,
                TargetComponent,
                NumToLetterPipe],
            bootstrap: [],
            providers: [CompetitionsService],
            exports: [CompetitionsComponent, CompetitionComponent]
        })
    ], CompetitionModule);
    return CompetitionModule;
}());
export { CompetitionModule };
//# sourceMappingURL=competitions.module.js.map