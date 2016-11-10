import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ICountry } from '../models/ICountry'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReferencesService {
	private headers : Headers;

	private countries : Promise<ICountry[]>;

	constructor(private http : Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public getCountries() : Promise<ICountry[]> {
        if(!this.countries)
            this.countries = this.http.get("api/countries", {headers: this.headers})
                .toPromise().then(r => r.json());
        
        return this.countries;
    }
}