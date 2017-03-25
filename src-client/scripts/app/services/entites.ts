///<reference path="../_references.ts"/>
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { IEntite } from '../models/ientite';
import { ITypeLabel } from '../models/ITypeLabel';
import { ICountry } from '../models/ICountry';
import { Criterion } from '../models/Criterion';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntitesService {
    private entites : Map<string, IEntite> = new Map<string, IEntite>();
    private headers : Headers;

    private countries : Promise<ICountry[]>;

    constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getTypeEntite() : Promise<ITypeLabel[]> {
        return this.http.get("api/typeentity", {headers: this.headers})
            .toPromise().then(r => r.json()).catch(this.handleError);
    }

    public countEntities(types? : number[],
            childOf? : string,
            term? : string) : Promise<number> {
        let url = "api/countentities";
        
        let params : string[] = []
        if(types && types.length > 0)
            params.push("types=" + encodeURI(JSON.stringify(types)));

        if(childOf)
            params.push("childOf=" + encodeURI(childOf));

        if(term)
            params.push("search=" + encodeURI(term));
        
        if(params.length > 0)
            url += "?" + params.join("&");

        return this.http.get(url, {headers: this.headers}).toPromise().then(r => r.json());
    }

    public getEntities(types? : number[],
            childOf? : string,
            term? : string, sortBy? : string|string[], sortOrder?: string[],
            startOffset? : number, endOffset? : number) : Promise<IEntite[]> {
        let url = "api/entities";

        let params : string[] = []
        if(types && types.length > 0)
            params.push("types=" + encodeURI(JSON.stringify(types)));

        if(childOf)
            params.push("childOf=" + encodeURI(childOf));

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

        let entitiesPromise = this.http.get(url, {headers: this.headers}).toPromise();
    
        return entitiesPromise
            .then(res => res.json())
            .then((entites : IEntite[]) => {
                entites.forEach(entite => {
                    this.entites[entite.id] = entite;
                });

                return entites;
            })
            .catch(this.handleError);
    }

    public getEntity(id : string) : Promise<IEntite> {
        if(this.entites && this.entites[id]) {
            return new Promise<IEntite>((resolve, reject) => {
                 if(this.entites[id].idEntiteParent && (!this.entites[id].entiteParent || this.entites[id].entiteParent.id != this.entites[id].idEntiteParent))
                    this.getEntity(this.entites[id].idEntiteParent).then(parent => this.entites[id].entiteParent = parent);
                resolve(this.entites[id]);
            });
        } else {
            let entitiePromise = this.http.get("api/entities/" + id, {headers: this.headers}).toPromise();
        
            return entitiePromise.then(res => res.json())
                .then(entite => {
                    if((<IEntite>entite).idEntiteParent != null)
                        this.getEntity((<IEntite>entite).idEntiteParent).then(parent => (<IEntite>entite).entiteParent = parent);

                    this.entites[entite.id] = entite;
                    
                    return entite;
                })
                .catch(this.handleError);
        }
    }

    public getEntityName(id : string) : Promise<string> {
        return this.http.get("api/entityname/" + id, {headers: this.headers}).toPromise().then(r => r.text());
    }

    public saveEntite(entite : IEntite) : Promise<IEntite> {
        let entiteParent = entite.entiteParent;
        if(entiteParent)
           entite.idEntiteParent = entiteParent.id;
            
        delete entite.entiteParent;

        let url = "api/entities";

        let request;
        if(entite.id)
            request = this.http.post(url, entite, {headers: this.headers});
        else
            request = this.http.put(url, entite, {headers: this.headers});

        return request.toPromise()
            .then(response => response.json())
            .then((updatedEntite : IEntite) => {
                if((updatedEntite.idEntiteParent && !entiteParent) || (entiteParent && updatedEntite.idEntiteParent != entiteParent.id)) {
                    this.getEntity(updatedEntite.idEntiteParent).then(parent => updatedEntite.entiteParent = parent);
                } else {
                    updatedEntite.entiteParent = entiteParent;
                }
                return updatedEntite;
            })
            .catch(error => {
                entite.entiteParent = entiteParent;
                this.handleError(error);
            });
    }

    public getCriteria(idEntity : string) : Promise<Criterion[]> {
        return this.http.get("api/entities/" + idEntity + "/criteria").toPromise()
            .then(response => response.json())
            .catch(error => {
                this.handleError(error);
            });
    }

    public saveCriteria(idEntity : string, criteria : Criterion[]) {
        criteria.forEach(c => c.idFederation = idEntity);

        return this.http.post("api/entities/" + idEntity + "/criteria", criteria, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                this.handleError(error);
            });
    }

    private handleError(error: any) {
        console.error('An error occurred', error);

        return Promise.reject(error.message || error);
    }
}