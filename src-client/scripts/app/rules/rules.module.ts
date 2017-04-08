import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DataTableModule } from '../../libs/angular2-datatable';
import { GeneralModule } from '../general';
import { ReferencesModule } from '../references/references.module';

import { RulesService } from './rules.service';

import { RulesComponent, RulesServerSideInputDataFilterPipe } from './rules.component';
import { RuleComponent } from './rule.component';

@NgModule({
    imports:        [ RouterModule, BrowserModule, FormsModule, DataTableModule, GeneralModule, ReferencesModule ],
    declarations:   [ RuleComponent, RulesComponent, RulesServerSideInputDataFilterPipe ],
    bootstrap:      [],
    providers:      [ RulesService ],
    exports:        [ RuleComponent, RulesComponent, RulesServerSideInputDataFilterPipe ]
})
export class RulesModule {

}