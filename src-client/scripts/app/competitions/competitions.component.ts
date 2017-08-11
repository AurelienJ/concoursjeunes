import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from "../datatable/DataTable";

import { NavigatorService } from '../general';
import { CompetitionsService } from './competitions.service';

import { ICompetitionDescription, Competition } from './Competition';

@Component({
	selector: 'competitions',
	templateUrl: 'scripts/app/competitions/competitions.html'
})
export class CompetitionsComponent implements OnInit {
	private competitions : ICompetitionDescription[];
	
	/**
     * Affichage pour seléction
     */
    private forSelect : boolean;

	constructor(private router: Router,
            private route: ActivatedRoute,
            private navigatorService : NavigatorService,
			private competitionsService : CompetitionsService) { }

	ngOnInit() {
		this.competitionsService.getCompetitionsDescription().then(c => this.competitions = c);
		
		if(this.route.snapshot.queryParams["forSelect"]) {
            this.forSelect = true;
        }
	}
	
	public select(competition : ICompetitionDescription) {
		
	}
}