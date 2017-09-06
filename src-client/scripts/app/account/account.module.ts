import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";

import { AccountService } from "./account.service";

@NgModule({
    declarations: [],
    imports: [ CommonModule, HttpModule ],
    exports: [],
    providers: [ AccountService ],
})
export class AccountModule {}