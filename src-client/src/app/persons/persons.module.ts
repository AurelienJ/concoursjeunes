import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap';

import { DataTableModule } from '../datatable/DataTableModule';
import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';
import { EntitesModule } from "../entites/entites.module";

import { PersonsService } from './persons.service';

import { PersonComponent } from './person.component';
import { PersonsComponent, PersonServerSideInputDataFilterPipe } from './persons.component';

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, BsDatepickerModule, DataTableModule, GeneralModule, ReferencesModule, EntitesModule ],
    declarations:   [ PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe ],
    bootstrap:      [],
    providers:      [ PersonsService ],
    exports:        [ PersonComponent, PersonsComponent, PersonServerSideInputDataFilterPipe ]
})
export class PersonsModule {

}