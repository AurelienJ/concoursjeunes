import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputData, DataEvent } from '../../libs/angular2-datatable';

import { NavigatorService } from '../services/navigator';
import { CompetitionsService } from '../services/competitions';

import { ICompetitionDescription, Competition } from '../models/Competition';

@Component({
	moduleId: module.id,
	selector: 'competitions',
	templateUrl: 'competitions.html'
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