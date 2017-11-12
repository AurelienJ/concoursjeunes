import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { GeneralModule } from "../general/general.module";

import { AccountService } from "./account.service";
import { SecureAccessService } from "./secureaccess.service";

import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

@NgModule({
    declarations: [ LoginComponent, RegisterComponent ],
    imports: [ CommonModule, RouterModule, HttpModule, BrowserModule, FormsModule, GeneralModule ],
    exports: [ LoginComponent, RegisterComponent ],
    providers: [ AccountService, SecureAccessService ],
})
export class AccountModule {}