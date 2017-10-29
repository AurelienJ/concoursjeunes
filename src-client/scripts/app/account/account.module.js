var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        NgModule({
            declarations: [LoginComponent, RegisterComponent],
            imports: [CommonModule, RouterModule, HttpModule, BrowserModule, FormsModule, GeneralModule],
            exports: [LoginComponent, RegisterComponent],
            providers: [AccountService, SecureAccessService],
        })
    ], AccountModule);
    return AccountModule;
}());
export { AccountModule };
//# sourceMappingURL=account.module.js.map