///<reference path="_references.ts"/>
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { DataTableModule } from "../libs/angular2-datatable";
import { GeneralModule } from './general/general.module';
import { ReferencesModule } from './references/references.module';
import { CompetitionModule } from './competitions/competitions.module';
import { EntitesModule } from './entites/entites.module';
import { PersonsModule } from './persons/persons.module';
import { RulesModule } from './rules/rules.module';
import { ParametersModule } from './parameters/parameters.module';

import { SlimScrollDirective } from './slimscroll.directive';

import { AppComponent } from './app.component';

import { AppRoutes } from './app.routes';

@NgModule({
    imports:        [ BrowserModule, 
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        GeneralModule, ReferencesModule, ParametersModule, CompetitionModule, EntitesModule, PersonsModule, RulesModule],
    declarations:   [ AppComponent, SlimScrollDirective ],
    bootstrap:      [ AppComponent],
    providers:      [  ]
})
export class AppModule {

}