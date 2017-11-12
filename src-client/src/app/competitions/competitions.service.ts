import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { DateService } from "../general/date.service";
import { RulesService } from '../rules/rules.service';
import { ICompetitionDescription, ICompetition } from './model/ICompetition';

@Injectable()
export class CompetitionsService {

	private headers : Headers;

	constructor(private http : Http, private dateService : DateService, private rulesService : RulesService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

	getCompetitionsDescription() : Promise<ICompetitionDescription[]>{
		return this.http.get("api/competitions").toPromise().then(r => this.dateService.jsonWithDate(r.text()));
	}

	getCompetition(idCompetition : string) : Promise<ICompetition>{
		return this.http.get("api/competitions/" + idCompetition)
			.toPromise()
			.then(r => this.dateService.jsonWithDate(r.text()))
			.then(c => {
				return this.rulesService.getRule(c.idRule).then(r => {
					c.rule = r;
					return c;
				});
			});
	}

	saveCompetition(competition : ICompetition) : Promise<ICompetition> {
		//if(typeof competition.dates[0] !== "Date")
			
		return this.http.post("api/competitions", competition, { headers : this.headers }).toPromise().then(r => this.dateService.jsonWithDate(r.text()));
	}
}