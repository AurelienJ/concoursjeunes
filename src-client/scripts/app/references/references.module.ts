import { NgModule } from '@angular/core'

import { GeneralModule } from '../general'

import { ReferencesService } from './references.service'


@NgModule({
    imports:        [ GeneralModule ],
    declarations:   [  ],
    bootstrap:      [],
    providers:      [ ReferencesService ],
    exports:        [  ]
})
export class ReferencesModule {

}