import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from "../datatable/DataTable";

import { NavigatorService } from '../general/navigator.service';
import { CompetitionsService } from './competitions.service';

import { ICompetitionDescription, ICompetition } from './model/ICompetition';

@Component({
	selector: 'competitions',
	templateUrl: './competitions.html'
})
export class CompetitionsComponent implements OnInit {
	public competitions : ICompetitionDescription[];
	
	/**
     * Affichage pour seléction
     */
    private forSelect : boolean;

	constructor(private router: Router,
            private route: ActivatedRoute,
            private navigatorService : NavigatorService,
			private competitionsService : CompetitionsService) { }

	ngOnInit() {
		this.navigatorService.pushUrlSegments("Compétitions", this.route.snapshot.url, this.route.snapshot.queryParams);
        
		this.competitionsService.getCompetitionsDescription().then(c => this.competitions = c);
		
		if(this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }
	}
	
	public select(competition : ICompetitionDescription) {
		
	}
}