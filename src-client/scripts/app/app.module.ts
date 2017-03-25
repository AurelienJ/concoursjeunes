///<reference path="_references.ts"/>
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpModule, XHRBackend } from '@angular/http';
import { DataTableModule } from "../libs/angular2-datatable";

import { Select2Directive } from './select2.directive';
import { SlimScrollDirective } from './slimscroll.directive';

import { AppComponent } from './components/app';
import { TitlebarComponent } from './components/titlebar';
import { ParametersComponent } from './components/parameters';
import { CriterionComponent } from './components/criterion';
import { EntitesComponent, EntiteServerSideInputDataFilterPipe } from './components/entites';
import { EntiteComponent } from './components/entite';
import { PersonsComponent , PersonServerSideInputDataFilterPipe } from './components/persons';
import { PersonComponent } from './components/person';
import { RulesComponent, RulesServerSideInputDataFilterPipe } from './components/rules';
import { RuleComponent } from './components/rule';

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
        RouterModule.forRoot(AppRoutes, { useHash: true }), DataTableModule],
    declarations:   [ 
        AppComponent, TitlebarComponent, 
        ParametersComponent,
        CriterionComponent,
        EntitesComponent, EntiteComponent,
        PersonsComponent, PersonComponent, 
        RulesComponent, RuleComponent,
        Select2Directive, SlimScrollDirective,
        TableFilterPipe, UpperCasePipe, EntiteServerSideInputDataFilterPipe, PersonServerSideInputDataFilterPipe, RulesServerSideInputDataFilterPipe],
    bootstrap:      [AppComponent],
    providers:      [NavigatorService, ReferencesService,
        EntitesService, PersonsService, RulesService]
})
export class AppModule {

}