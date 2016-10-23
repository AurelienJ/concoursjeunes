///<reference path="_references.ts"/>
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpModule, XHRBackend } from '@angular/http';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';
import { ParametersComponent } from './components/parameters';
import { EntitesComponent } from './components/entites';
import { EntiteComponent } from './components/entite';

import { EntitesService } from './services/entites';

import { AppRoutes } from './app.routes';

@NgModule({
    imports:        [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(AppRoutes, { useHash: true }), DataTableModule],
    declarations:   [AppComponent, ParametersComponent, EntitesComponent, EntiteComponent],
    bootstrap:      [AppComponent],
    providers:      [EntitesService]
})
export class AppModule {

}