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
import { DataTableModule } from '../datatable';
import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';
import { RulesService } from './rules.service';
import { RulesComponent, RulesServerSideInputDataFilterPipe } from './rules.component';
import { RuleComponent } from './rule.component';
import { DistancesAndFacesComponent } from './distancesAndFaces.component';
import { DetailDistancesAndFacesComponent } from './detailDistanceAndFaces.component';
import { RankingComponent } from './ranking.component';
import { DetailRankingComponent } from './detailRanking.component';
var RulesModule = /** @class */ (function () {
    function RulesModule() {
    }
    RulesModule = __decorate([
        NgModule({
            imports: [RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule,
                ReferencesModule],
            declarations: [RuleComponent, RulesComponent,
                DistancesAndFacesComponent, DetailDistancesAndFacesComponent,
                RankingComponent, DetailRankingComponent,
                RulesServerSideInputDataFilterPipe],
            bootstrap: [],
            providers: [RulesService],
            exports: [RuleComponent, RulesComponent, RulesServerSideInputDataFilterPipe]
        })
    ], RulesModule);
    return RulesModule;
}());
export { RulesModule };
//# sourceMappingURL=rules.module.js.map