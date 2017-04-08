import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { DataTableModule } from '../../libs/angular2-datatable';
import { GeneralModule } from '../general'

import { CompetitionsService } from './competitions.service'

import { CompetitionsComponent } from './competitions.component'

@NgModule({
    imports:        [ RouterModule, BrowserModule, DataTableModule, GeneralModule ],
    declarations:   [ CompetitionsComponent ],
    bootstrap:      [],
    providers:      [ CompetitionsService ],
    exports:        [ CompetitionsComponent ]
})
export class CompetitionModule {

}