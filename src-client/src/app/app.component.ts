import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor() {

    }

    ngOnInit() {
        moment.locale('fr')
    }

    ngAfterViewInit() {
    }
}