import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigatorService } from './general/navigator.service';

@Component({
    selector: 'app',
    templateUrl: 'scripts/app/app.html'
})
export class AppComponent implements OnInit {
    constructor(private route : ActivatedRoute, private navigatorService : NavigatorService) {

    }

    ngOnInit() {
        //this.route.
    }

    clearNavigationPaths() {
        this.navigatorService.clear();
    }
}