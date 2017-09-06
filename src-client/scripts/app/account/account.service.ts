import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { IAccount } from './iaccount';

@Injectable()
export class AccountService {

    private headers : Headers;

    constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public register(account : IAccount) : Promise<IAccount> {
        return this.http.post("api/register", account, {headers: this.headers}).toPromise().then(r => r.json());
    }

    public login(account : IAccount) : Promise<IAccount> {
        return this.http.post("api/login", account, {headers: this.headers}).toPromise().then(r => r.json());
    }

    public logout() : Promise<string> {
        return this.http.get("api/logout", {headers: this.headers}).toPromise().then(r => r.text());
    }
}