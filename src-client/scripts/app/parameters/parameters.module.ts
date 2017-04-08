import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { DataTableModule } from '../../libs/angular2-datatable';
import { GeneralModule } from '../general';
import { ReferencesModule } from '../references/references.module';

import { ParametersComponent } from './parameters.component';

@NgModule({
    imports:        [ RouterModule, BrowserModule, DataTableModule, GeneralModule, ReferencesModule ],
    declarations:   [ ParametersComponent ],
    bootstrap:      [],
    providers:      [  ],
    exports:        [ ParametersComponent ]
})
export class ParametersModule {

}