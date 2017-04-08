import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ICompetitionDescription, Competition } from './Competition';

@Injectable()
export class CompetitionsService {

	private headers : Headers;

	constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

	getCompetitionsDescription() : Promise<ICompetitionDescription[]>{
		return this.http.get("api/competitions").toPromise().then(r => r.json());
	}

	getCompetition(idCompetition : string) : Promise<Competition>{
		return this.http.get("api/competitions/" + idCompetition).toPromise().then(r => r.json());
	}
}