import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DataTableModule } from '../../libs/angular2-datatable';
import { GeneralModule } from '../general';
import { ReferencesModule } from '../references/references.module';

import { PersonsService } from './persons.service';

import { PersonComponent } from './person.component';
import { PersonsComponent, PersonServerSideInputDataFilterPipe } from './persons.component';

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule, ReferencesModule ],
    declarations:   [ PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe ],
    bootstrap:      [],
    providers:      [ PersonsService ],
    exports:        [ PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe ]
})
export class PersonsModule {

}