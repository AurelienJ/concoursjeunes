import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap';

import { DataTableModule } from "../datatable/DataTableModule";
import { GeneralModule } from '../general/general.module';

import { CompetitionsService } from './competitions.service';

import { CompetitionsComponent } from './competitions.component';
import { CompetitionComponent } from "./competition.component";

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, BsDatepickerModule, DataTableModule, GeneralModule ],
    declarations:   [ CompetitionsComponent, CompetitionComponent ],
    bootstrap:      [],
    providers:      [ CompetitionsService ],
    exports:        [ CompetitionsComponent, CompetitionComponent ]
})
export class CompetitionModule {

}