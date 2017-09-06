import { Component, OnInit } from '@angular/core';

import moment from 'moment';

@Component({
    selector: 'app',
    templateUrl: 'scripts/app/app.html',
})
export class AppComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
        //this.route.
        moment.locale('fr')
    }
}