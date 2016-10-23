///<reference path="../_references.ts"/>
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { IEntite } from '../models/ientite';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntitesService {
    private entites : IEntite[]
    private headers : Headers;

    constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getEntities() : Promise<IEntite[]> {
        let entitiesPromise = this.http.get("api/entities", {headers: this.headers}).toPromise();
    
        return entitiesPromise.then(res => res.json()).catch(this.handleError);
    }

    getEntitie(id : string) : Promise<IEntite> {
        let entitiePromise = this.http.get("api/entities/" + id, {headers: this.headers}).toPromise();
    
        return entitiePromise.then(res => res.json())
        .then(entite => {
            if((<IEntite>entite).idEntiteParent != null)
               this.getEntitie((<IEntite>entite).idEntiteParent).then(parent => (<IEntite>entite).entiteParent = parent);

            return entite;
        })
        .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }
}