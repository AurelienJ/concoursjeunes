import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DataTableModule } from '../datatable';
import { GeneralModule } from '../general';
import { ReferencesModule } from '../references/references.module';

import { RulesService } from './rules.service';

import { RulesComponent, RulesServerSideInputDataFilterPipe } from './rules.component';
import { RuleComponent } from './rule.component';
import { DistancesAndFacesComponent } from './distancesAndFaces.component';
import { DetailDistancesAndFacesComponent } from './detailDistanceAndFaces.component';
import { RankingComponent } from './ranking.component';
import { DetailRankingComponent } from './detailRanking.component';

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule, 
        ReferencesModule ],
    declarations:   [ RuleComponent, RulesComponent, 
        DistancesAndFacesComponent, DetailDistancesAndFacesComponent, 
        RankingComponent, DetailRankingComponent,
        RulesServerSideInputDataFilterPipe ],
    bootstrap:      [],
    providers:      [ RulesService ],
    exports:        [ RuleComponent, RulesComponent, RulesServerSideInputDataFilterPipe ]
})
export class RulesModule {

}