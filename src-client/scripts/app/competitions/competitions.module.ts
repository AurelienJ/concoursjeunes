import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule, ButtonsModule } from 'ngx-bootstrap';
import { DndModule } from 'ng2-dnd';

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

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, BsDatepickerModule, DndModule, 
        ButtonsModule, DataTableModule, GeneralModule ],
    declarations:   [ CompetitionsComponent, CompetitionComponent, CompetitionParametersComponent, CompetitionShootingLineComponent, CompetitorComponent, 
        TargetComponent,
        NumToLetterPipe],
    bootstrap:      [],
    providers:      [ CompetitionsService ],
    exports:        [ CompetitionsComponent, CompetitionComponent ]
})
export class CompetitionModule {

}