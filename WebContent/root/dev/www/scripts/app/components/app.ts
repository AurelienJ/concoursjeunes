///<reference path="../_references.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigatorService } from '../services/navigator';

@Component({
    selector: 'app',
    templateUrl: 'app.html'
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