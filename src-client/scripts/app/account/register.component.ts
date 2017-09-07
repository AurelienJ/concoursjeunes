import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AccountService } from "./account.service";

import { IAccount } from "./iaccount";

@Component({
    selector: 'register',
    template: `<div class="login-box">
    <div class="login-logo">
      <a href="index.html"><b>Arc</b>Competition</a>
    </div>
    <div class="register-box-body">
      <p class="login-box-msg"><img src="images/fnd.jpg" style="width: 128px;"/><br/>Création d'un compte ArcCompetition</p>
  
      <form>
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Nom" name="name" [(ngModel)]="account.name">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <input type="text" class="form-control" placeholder="Prenom" name="firstName" [(ngModel)]="account.firstName">
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="email" class="form-control" placeholder="Email" name="email" [(ngModel)]="account.login">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Mot de passe" name="password" [(ngModel)]="account.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Retaper le mot de passe" name="passwordControl" [(ngModel)]="passwordControl" >
          <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
        </div>
        <div class="row">
            <div class="col-xs-12 alert alert-danger" *ngIf="error">{{error}}</div>
        </div>
        <div class="row">
          <div class="col-xs-7">
            <div class="checkbox icheck">
              <label>
                <input icheck type="checkbox" name="acceptCgu" [checked]="acceptCgu" (change)="acceptCgu = $event" /> j'accepte les <a href="cgu.html">conditions d'utilisation</a>
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-5">
            <button type="submit" class="btn btn-primary btn-block btn-flat" (click)="register()">S'enregistrer</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
  
      <a href="login.html" class="text-center">J'ai déjà un compte</a>
    </div>
  </div>`
})

export class RegisterComponent implements OnInit {
    public account : IAccount = <IAccount>{
    };

    public passwordControl : string;
    public acceptCgu : boolean = false;

    public error : string;

    private bodyClasses : string = "hold-transition register-page";

    constructor(private router : Router, private accountService : AccountService) { }

    ngOnInit(): void {
		$('body').addClass(this.bodyClasses);
	}
	ngOnDestroy() { 
		$('body').removeClass(this.bodyClasses);
    }

    public test(ev) {
        console.log(ev);
    }
    
    public register() {
        delete this.error;

        if(!this.account.login) {
            this.error = "Un e-mail doit être renseigné";
            
            return;
        }

        if(!this.account.name) {
            this.error = "Un nom doit être renseigné";
            
            return;
        }

        if(this.account.password != this.passwordControl) {
            this.error = "Erreur dans la saisie du mot de passe";

            return;
        }

        if(!this.acceptCgu) {
            this.error = "Les conditions générales d'utilisation doivent être validé";
            
            return;
        }

        this.accountService.register(this.account).then(a => {
            if(a) {
                this.router.navigate(['/']);
            } else {
                this.error = "Compte Invalide";
            }
        }).catch(r => {
            this.error = r._body;
        });
    }
}