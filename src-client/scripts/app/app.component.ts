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
        //this.route.
        moment.locale('fr')
    }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //$.getScript("node_modules/admin-lte/dist/js/adminlte.min.js");
    }
}