///<reference path="../_references.ts"/>
import { Component, OnInit, Input } from '@angular/core';
import { UrlSegment,Router, NavigationEnd } from '@angular/router';

import { NavigatorService } from '../services/navigator';

import { NavigationSnapshot } from '../models/NavigationSnapshot';

import 'rxjs/add/operator/share';

@Component({
	selector: 'titlebar',
	template: `<div class="content-header">
	<h1>{{title}}</h1>
	<ol class="breadcrumb">
        <li><i class="fa fa-home"></i></li>
        <li *ngFor="let path of paths; let i = index"><a [routerLink]="path.path" [queryParams]="path.queryParams" (click)="clearAfter(i)">{{path.label}}</a></li>
    </ol></div>`
})
export class TitlebarComponent implements OnInit {
	@Input()
	public title : string;

	public paths = [];

	constructor(private router : Router, private navigatorService : NavigatorService) {
	}

	ngOnInit() {
		this.router.events.subscribe((event : NavigationEnd)  => {
			this.paths = [];
			this.navigatorService.navigationStack.forEach(item => {
				this.paths.push(item);
			});
		});
	}

	clearAfter(index : number) {
		this.navigatorService.clearAfter(index);
	}
}