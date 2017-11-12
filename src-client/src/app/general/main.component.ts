import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";

import { NavigatorService } from "./navigator.service";
import { AccountService } from "../account/account.service";
import { IAccount } from '../account/iaccount';

@Component({
	selector: 'main',
	templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
	public account : IAccount;

	constructor(private router : Router, private navigatorService : NavigatorService, private accountService : AccountService) { }

	ngOnInit() {
		this.accountService.getAccount().subscribe(a => this.account = a);
	}

	public clearNavigationPaths() {
        this.navigatorService.clear();
	}
	
	public logout() {
		this.accountService.logout().subscribe(r => {
			this.router.navigate(["/login"]);
		})
	}
}