import { Component, OnInit } from '@angular/core';

import { NavigatorService } from "./navigator.service";

@Component({
	selector: 'main',
	templateUrl: 'scripts/app/general/main.component.html'
})

export class MainComponent implements OnInit {
	constructor(private navigatorService : NavigatorService) { }

	ngOnInit() { }

	clearNavigationPaths() {
        this.navigatorService.clear();
    }
}