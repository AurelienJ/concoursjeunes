import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { IAccount } from './iaccount';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

    private headers : Headers;

    private account : Observable<IAccount>;

    constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        this.account = this.http.get("api/account", {headers: this.headers}).map(r => r.json());
    }

    public isLogged() : Promise<boolean> {
        return this.getAccount().toPromise().then(a => {
            if(a)
                return true;
            return false;
        }).catch(reason => false);
    }

    public register(account : IAccount) : Observable<IAccount> {
        this.account = this.http.post("api/register", account, {headers: this.headers}).map(r => r.json());
        return this.account;
    }

    public getAccount() : Observable<IAccount> {
        return this.account;
    }

    public saveAccount(account : IAccount) : Observable<IAccount> {
        this.account = this.http.post("api/account", account, {headers: this.headers}).map(r => r.json());
        return this.account;
    }

    public login(account : IAccount) : Observable<IAccount> {
        this.account = this.http.post("api/login", account, {headers: this.headers}).map(r => r.json());
        return this.account;
    }

    public logout() : Observable<string> {
        return this.http.get("api/logout", {headers: this.headers}).map(r => r.text());
    }
}