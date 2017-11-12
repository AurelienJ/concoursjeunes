import { Component, Input } from '@angular/core';

import { NavigatorService } from './navigator.service';

import { NavigationSnapshot } from './NavigationSnapshot';

@Component({
	selector: 'titlebar',
	template: `<div class="content-header">
	<h1>{{title}}</h1>
	<ol class="breadcrumb">
        <li><i class="fa fa-home"></i></li>
        <li *ngFor="let path of paths; let i = index"><a [routerLink]="path.path" [queryParams]="path.queryParams" (click)="clearAfter(i)">{{path.label}}</a></li>
    </ol></div>`
})
export class TitlebarComponent {
	@Input()
	public title : string;

	public paths : NavigationSnapshot[] = [];

	constructor(private navigatorService : NavigatorService) {
		 this.navigatorService.subscribe(
			 navigationStack => this.paths = navigationStack);
	}

	public clearAfter(index : number) {
		this.navigatorService.clearAfter(index);
	}

}