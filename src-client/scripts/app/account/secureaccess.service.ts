import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable"

import { AccountService } from './account.service';

@Injectable()
export class SecureAccessService implements CanActivate{

    constructor(private router: Router, private accountService : AccountService) {
        this.accountService.authenticate();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.accountService.isLogged().then(isAuth => {

            if(!isAuth)
                this.router.navigate(['/login']);

            return isAuth;
        }).catch(() => {
            this.router.navigate(['/login']);

            return false;
        });
    }
}