import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { IRule } from '../models/IRule';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RulesService {
	private headers : Headers;

	constructor(private http : Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
	}

	public countRules(term? : string) : Promise<number> {
		return this.http.get("api/countrules", {headers: this.headers}).toPromise().then(r => r.json());
	}

	public getRules(term? : string, sortBy? : string|string[], sortOrder?: string[],
            startOffset? : number, endOffset? : number) : Promise<IRule[]> {

		let url = "api/rules";
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

		return this.http.get(url, {headers: this.headers}).toPromise().then(r => r.json());
	}

	public getRule(id : string) : Promise<IRule> {
		
		return this.http.get("api/rules/" + id, {headers: this.headers}).toPromise().then(r => r.json());
	}
}