///<reference path="_references.ts"/>
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { HttpModule, XHRBackend } from '@angular/http';
import { DataTableModule } from "angular2-datatable";

import { Select2Directive } from './select2.directive';

import { AppComponent } from './components/app';
import { TitlebarComponent } from './components/titlebar';
import { ParametersComponent } from './components/parameters';
import { EntitesComponent, EntiteServerSideInputDataFilterPipe } from './components/entites';
import { EntiteComponent } from './components/entite';
import { PersonsComponent , PersonServerSideInputDataFilterPipe } from './components/persons';
import { PersonComponent } from './components/person';
import { RulesComponent, RulesServerSideInputDataFilterPipe } from './components/rules';

import { ReferencesService } from './services/references';
import { EntitesService } from './services/entites';
import { PersonsService } from './services/persons';
import { RulesService } from './services/rules';
import { NavigatorService } from './services/navigator';

import { TableFilterPipe } from './arraySearch.pipe';
import { UpperCasePipe } from './uppercase.pipe';

import { AppRoutes } from './app.routes';

@NgModule({
    imports:        [BrowserModule, HttpModule, FormsModule, 
        RouterModule.forRoot(AppRoutes, { useHash: true }), DataTableModule, DatepickerModule],
    declarations:   [ 
        AppComponent, TitlebarComponent, 
        ParametersComponent,
        EntitesComponent, EntiteComponent,
        PersonsComponent, PersonComponent, 
        RulesComponent,
        Select2Directive,
        TableFilterPipe, UpperCasePipe, EntiteServerSideInputDataFilterPipe, PersonServerSideInputDataFilterPipe, RulesServerSideInputDataFilterPipe],
    bootstrap:      [AppComponent],
    providers:      [NavigatorService, ReferencesService,
        EntitesService, PersonsService, RulesService]
})
export class AppModule {

}