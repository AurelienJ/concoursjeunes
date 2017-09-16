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
  
      <form #registerForm="ngForm" (ngSubmit)="register()">
        <div class="form-group has-feedback" [ngClass]="{'has-error': nameField.errors}">
          <input type="text" class="form-control" placeholder="Nom"
            name="name" #nameField="ngModel"
            [(ngModel)]="account.name"
            required>
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback" [ngClass]="{'has-error': firstNameField.errors}">
            <input type="text" class="form-control" placeholder="Prenom" name="firstName" #firstNameField="ngModel" [(ngModel)]="account.firstName" required>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback" [ngClass]="{'has-error': emailField.errors}">
          <input type="email" class="form-control" placeholder="Email" name="email" #emailField="ngModel" [(ngModel)]="account.login" required email>
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <span class="help-block" *ngIf="emailField.errors?.email">
            L'email doit être de la forme mon.nom@domaine.tld
          </span>
        </div>
        <div class="form-group has-feedback" [ngClass]="{'has-error': passwordField.errors}">
          <input type="password" class="form-control" placeholder="Mot de passe" name="password" #passwordField="ngModel"
            [(ngModel)]="account.password"
            required validateEqual="passwordControl" reverse="true" pattern="(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,}).*">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <span class="help-block" *ngIf="passwordField.errors?.pattern">
            Le mot de passe doit au minimum contenir des minuscules, majuscules et chiffres avec une taille minimum de 8 caractères
          </span>
        </div>
        <div class="form-group has-feedback" [ngClass]="{'has-error': passwordControlField.errors}">
          <input type="password" class="form-control" placeholder="Retaper le mot de passe" name="passwordControl" #passwordControlField="ngModel"
            [(ngModel)]="passwordControl"
            required validateEqual="password">
          <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
          <span class="help-block" *ngIf="passwordControlField.errors?.validateEqual === false">
            La confirmation ne correspond pas!
          </span>
        </div>
        <div class="row">
            <div class="col-xs-12 alert alert-danger" *ngIf="error">{{error}}</div>
        </div>
        <div class="row">
          <div class="col-xs-7">
            <div class="checkbox icheck">
              <label>
                <input icheck type="checkbox"
                  name="acceptCgu"
                  [checked]="acceptCgu" (change)="acceptCgu = $event"
                  /> j'accepte les <a href="cgu.html">conditions d'utilisation</a>
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-5">
            <button type="submit" class="btn btn-primary btn-block btn-flat" [disabled]="registerForm.invalid">S'enregistrer</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
  
      <a [routerLink]="['/login']" class="text-center">J'ai déjà un compte</a>
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