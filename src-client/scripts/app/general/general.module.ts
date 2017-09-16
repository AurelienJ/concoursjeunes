import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NavigatorService } from './navigator.service'
import { DateService } from './date.service';

import { MainComponent } from "./main.component";
import { TitlebarComponent } from './titlebar.component'

import { NavigationSnapshot } from './NavigationSnapshot'

import { TableFilterPipe } from './arraySearch.pipe';
import { UpperCasePipe } from './uppercase.pipe';
import { Select2Directive } from './select2.directive';
import { ICheckDirective } from "./icheck.directive";
import { SlimScrollDirective } from './slimscroll.directive';
import { EqualValidator } from "./equal-validator.directive";

@NgModule({
    imports:        [ RouterModule, BrowserModule, HttpModule ],
    declarations:   [ MainComponent, TitlebarComponent,
        TableFilterPipe, UpperCasePipe,
        Select2Directive, ICheckDirective, SlimScrollDirective,
        EqualValidator ],
    bootstrap:      [],
    providers:      [ NavigatorService, DateService ],
    exports:        [ MainComponent, TitlebarComponent,
        TableFilterPipe, UpperCasePipe,
        Select2Directive, ICheckDirective, SlimScrollDirective,
        EqualValidator
     ]
})
export class GeneralModule {

}