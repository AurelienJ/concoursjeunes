import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AccountService } from "./account.service";

import { IAccount } from "./iaccount";

@Component({
	selector: 'login',
	template: `<div class="login-page login-box">
	<div class="login-logo">
	  <a href="index.html"><b>Arc</b>Competition</a>
	</div>
	<!-- /.login-logo -->
	<div class="login-box-body">
	  
	  <p class="login-box-msg"><img src="images/fnd.jpg" style="width: 128px;"/><br/>Authentification pour démarrer une session</p>
  
	  <form>
		<div class="form-group has-feedback">
		  <input type="email" class="form-control" placeholder="Email" name="email" [(ngModel)]="account.login" />
		  <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
		</div>
		<div class="form-group has-feedback">
		  <input type="password" class="form-control" placeholder="Password" name="password" [(ngModel)]="account.password"/>
		  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
		</div>
		<div class="row">
		  <div class="col-xs-7">
			<div class="checkbox icheck">
			  <label>
				<input icheck type="checkbox" [checked]="account.keepAuth" (change)="account.keepAuth = $event" name="keepAuth" /> Se souvenir de moi
			  </label>
			</div>
		  </div>
		  <!-- /.col -->
		  <div class="col-xs-5">
			<button type="submit" class="btn btn-primary btn-block btn-flat" (click)="auth()">S'authentifier</button>
		  </div>
		  <!-- /.col -->
		</div>
		<div class="row">
			<div class="col-xs-12 alert alert-danger" *ngIf="loginError || passwordError">{{loginError}} {{passwordError}}</div>
		</div>
	  </form>
  
	  <!--<div class="social-auth-links text-center">
		<p>- OU -</p>
		<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> S'authentifier avec
		  Facebook</a>
		<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> S'authentifier avec
		  Google+</a>
	  </div>-->
	  <!-- /.social-auth-links -->
  
	  <a href="#">J'ai oublier mon mot de passe</a><br>
	  <a [routerLink]="['/register']" class="text-center">Créer mon compte</a>
  
	</div>
	<!-- /.login-box-body -->
  </div>`
})

export class LoginComponent implements OnInit {
	public account : IAccount = <IAccount>{};

	public loginError: string;
	public passwordError: string;

	private bodyClasses : string = "hold-transition login-page";

	constructor(private router : Router, private accountService : AccountService) { }

	ngOnInit(): void {
		$('body').addClass(this.bodyClasses);
	}
	ngOnDestroy() { 
		$('body').removeClass(this.bodyClasses);
	}

	public auth() {
		this.accountService.login(this.account).then(account => {
			this.router.navigate(['/']);
		}).catch(r => {
			if(r._body == "Bad password") {
				this.passwordError = "Mot de passe invalide";
			} else if(r._body == "Bad user") {
				this.loginError = "Identifiant invalide";
			}
		});
	}
}