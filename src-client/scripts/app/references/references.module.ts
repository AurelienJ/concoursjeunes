import { NgModule } from '@angular/core';

import { GeneralModule } from '../general/general.module';

import { ReferencesService } from './references.service';


@NgModule({
    imports:        [ GeneralModule ],
    declarations:   [  ],
    bootstrap:      [],
    providers:      [ ReferencesService ],
    exports:        [  ]
})
export class ReferencesModule {

}