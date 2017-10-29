var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NavigatorService } from './navigator.service';
import { DateService } from './date.service';
import { MainComponent } from "./main.component";
import { TitlebarComponent } from './titlebar.component';
import { TableFilterPipe } from './arraySearch.pipe';
import { UpperCasePipe } from './uppercase.pipe';
import { Select2Directive } from './select2.directive';
import { ICheckDirective } from "./icheck.directive";
import { SlimScrollDirective } from './slimscroll.directive';
import { EqualValidator } from "./equal-validator.directive";
import { ControlSidebarDirective } from "./control-sidebar.directive";
var GeneralModule = /** @class */ (function () {
    function GeneralModule() {
    }
    GeneralModule = __decorate([
        NgModule({
            imports: [RouterModule, BrowserModule, HttpModule],
            declarations: [MainComponent, TitlebarComponent,
                TableFilterPipe, UpperCasePipe,
                Select2Directive, ICheckDirective, SlimScrollDirective, ControlSidebarDirective,
                EqualValidator],
            bootstrap: [],
            providers: [NavigatorService, DateService],
            exports: [MainComponent, TitlebarComponent,
                TableFilterPipe, UpperCasePipe,
                Select2Directive, ICheckDirective, SlimScrollDirective, ControlSidebarDirective,
                EqualValidator
            ]
        })
    ], GeneralModule);
    return GeneralModule;
}());
export { GeneralModule };
//# sourceMappingURL=general.module.js.map