import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NavigatorService } from './navigator.service'

import { TitlebarComponent } from './titlebar.component'

import { NavigationSnapshot } from './NavigationSnapshot'

import { TableFilterPipe } from './arraySearch.pipe';
import { Select2Directive } from './select2.directive';
import { UpperCasePipe } from './uppercase.pipe';

@NgModule({
    imports:        [ RouterModule, BrowserModule, HttpModule ],
    declarations:   [ TitlebarComponent, TableFilterPipe, UpperCasePipe, Select2Directive ],
    bootstrap:      [],
    providers:      [ NavigatorService ],
    exports:        [ TitlebarComponent, TableFilterPipe, UpperCasePipe, Select2Directive ]
})
export class GeneralModule {

}