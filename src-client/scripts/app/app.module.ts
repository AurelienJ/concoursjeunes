///<reference path="_references.ts"/>
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap';

import { GeneralModule } from './general/general.module';
import { ReferencesModule } from './references/references.module';
import { AccountModule } from "./account/account.module";
import { CompetitionModule } from './competitions/competitions.module';
import { EntitesModule } from './entites/entites.module';
import { PersonsModule } from './persons/persons.module';
import { RulesModule } from './rules/rules.module';
import { ParametersModule } from './parameters/parameters.module';

import { AppComponent } from './app.component';

import { AppRoutes } from './app.routes';

@NgModule({
    imports:        [ BrowserModule, 
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        BsDatepickerModule.forRoot(),
        GeneralModule, ReferencesModule, AccountModule, ParametersModule, CompetitionModule, EntitesModule, PersonsModule, RulesModule],
    declarations:   [ AppComponent ],
    bootstrap:      [ AppComponent],
    providers:      [  ]
})
export class AppModule {

}