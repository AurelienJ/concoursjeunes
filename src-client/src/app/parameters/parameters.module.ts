import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';

import { ParametersComponent } from './parameters.component';

@NgModule({
    imports:        [ BrowserModule, GeneralModule, ReferencesModule ],
    declarations:   [ ParametersComponent ],
    bootstrap:      [  ],
    providers:      [  ],
    exports:        [ ParametersComponent ]
})
export class ParametersModule {

}