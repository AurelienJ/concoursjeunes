import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { GeneralModule } from "../general/general.module";

import { AccountService } from "./account.service";

import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [ LoginComponent ],
    imports: [ CommonModule, RouterModule, HttpModule, BrowserModule, FormsModule, GeneralModule ],
    exports: [ LoginComponent ],
    providers: [ AccountService ],
})
export class AccountModule {}