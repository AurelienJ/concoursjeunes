import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DataTableModule } from '../datatable/DataTableModule';
import { GeneralModule } from '../general/general.module';
import { ReferencesModule } from '../references/references.module';

import { EntitesService } from './entites.service';

import { EntiteComponent } from './entite.component';
import { EntitesComponent, EntiteServerSideInputDataFilterPipe } from './entites.component';
import { CriterionComponent } from './criterion.component';
import { EntiteSelectorComponent } from "./entite-selector.component";

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule, ReferencesModule ],
    declarations:   [ EntitesComponent, EntiteComponent, EntiteServerSideInputDataFilterPipe, CriterionComponent, EntiteSelectorComponent ],
    bootstrap:      [],
    providers:      [ EntitesService ],
    exports:        [ EntitesComponent, EntiteComponent, EntiteServerSideInputDataFilterPipe, CriterionComponent, EntiteSelectorComponent ]
})
export class EntitesModule {

}