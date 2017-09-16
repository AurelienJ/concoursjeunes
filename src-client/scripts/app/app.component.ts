import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'app',
    templateUrl: './app.html',
})
export class AppComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        //this.route.
        moment.locale('fr')
    }
}