import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { DateService } from '../general/date.service';

import { IEntite } from '../entites/ientite';
import { ICountry } from '../references/ICountry'
import { IPerson } from './IPerson'
import { ICivility } from './ICivility'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonsService {
	private headers : Headers;

	private civilities : Promise<ICivility[]>;

	constructor(private http : Http, private dateService : DateService) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	private convertDates(person : IPerson) {
		if(person.dateNaissance)
			person.dateNaissance = new Date(person.dateNaissance);
		if(person.certificat)
			person.certificat = new Date(person.certificat);
		if(person.dateModification)
			person.dateModification = new Date(person.dateModification);
	}

	public getCivilities() : Promise<ICivility[]> {
		if(this.civilities)
			return this.civilities;

		this.civilities = this.http.get("api/civilities", {headers: this.headers}).toPromise().then(r => r.json());

		return  this.civilities;
	}

	public countPersons(term? : string) : Promise<number> {
		let url = "api/countcontacts";

		let params : string[] = []
        if(term)
            params.push("search=" + encodeURI(term));

        if(params.length > 0)
            url += "?" + params.join("&");

        let contactsPromise = this.http.get(url, {headers: this.headers}).toPromise();

		return contactsPromise.then(r => r.json());
	}

	/*public getPersons() : Promise<IPerson[]> {
		return this.http.get("api/contacts", {headers: this.headers}).toPromise().then(r => r.json());
	}*/

	public getPersons(term? : string, sortBy? : string|string[], sortOrder?: string[],
            startOffset? : number, endOffset? : number) : Promise<IPerson[]> {
		let url = "api/contacts";

		let params : string[] = []
        if(term)
            params.push("search=" + encodeURI(term));

        if(sortBy)
            params.push("sortBy=" + encodeURI(JSON.stringify(sortBy)));

        if(sortBy && sortOrder)
            params.push("sortOrder=" + encodeURI(JSON.stringify(sortOrder)));

        if(startOffset)
            params.push("start=" + startOffset);

        if(endOffset)
            params.push("length=" + (endOffset-(startOffset|0)));

        if(params.length > 0)
            url += "?" + params.join("&");

        let contactsPromise = this.http.get(url, {headers: this.headers}).toPromise();

		return contactsPromise.then(r => this.dateService.jsonWithDate(r.text()));
	}

	public getPersonsForEntity(idEntity : string) : Promise<IPerson[]>{
		return this.http.get("api/entities/" + idEntity + "/contacts", {headers: this.headers})
			.toPromise()
			.then(r => this.dateService.jsonWithDate(r.text()));
	}

	public getPerson(idPerson : string) : Promise<IPerson> {
		return this.http.get("api/contacts/" + idPerson, {headers: this.headers}).toPromise().then(r => this.dateService.jsonWithDate(r.text()));
	}

	public savePerson(person : IPerson) : Promise<IPerson> {
		let url = "api/contacts";

		if(person.id) {
			return this.http.post(url, person,{headers: this.headers})
				.toPromise()
				.then(r => this.dateService.jsonWithDate(r.text()));
		} else {
			return this.http.put(url, person,{headers: this.headers})
				.toPromise()
				.then(r => this.dateService.jsonWithDate(r.text()));
		}
	}
}