import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { IAccount } from './iaccount';

@Injectable()
export class AccountService {

    private headers : Headers;

    private account : Promise<IAccount>;

    constructor(private http : Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public isLogged() : Promise<boolean> {
        return this.getAccount().then(a => {
            if(a)
                return true;
    
            return false;
        });
    }

    public getAccount() : Promise<IAccount> {
        return this.account;
    }

    public register(account : IAccount) : Promise<IAccount> {
        this.account = this.http.post("api/register", account, {headers: this.headers}).toPromise().then(r => r.json());
        return this.account;
    }

    public authenticate() : Promise<IAccount> {
        this.account = this.http.get("api/authenticate", {headers: this.headers}).toPromise().then(r => r.json());
        return this.account;
    }

    public login(account : IAccount) : Promise<IAccount> {
        this.account = this.http.post("api/login", account, {headers: this.headers}).toPromise().then(r => r.json());
        return this.account;
    }

    public logout() : Promise<string> {
        return this.http.get("api/logout", {headers: this.headers}).toPromise().then(r => r.text());
    }
}