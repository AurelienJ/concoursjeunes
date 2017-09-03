import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { RulesService } from '../rules/rules.service';
import { ICompetitionDescription, ICompetition } from './Competition';

@Injectable()
export class CompetitionsService {

	private headers : Headers;

	constructor(private http : Http, private rulesService : RulesService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

	getCompetitionsDescription() : Promise<ICompetitionDescription[]>{
		return this.http.get("api/competitions").toPromise().then(r => r.json());
	}

	getCompetition(idCompetition : string) : Promise<ICompetition>{
		return this.http.get("api/competitions/" + idCompetition)
			.toPromise()
			.then(r => r.json())
			.then(c => {
				return this.rulesService.getRule(c.idRule).then(r => {
					c.rule = r;
					return c;
				});
			});
	}
}