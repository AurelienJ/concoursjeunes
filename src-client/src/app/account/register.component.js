"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("./account.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, accountService) {
        this.router = router;
        this.accountService = accountService;
        this.account = {};
        this.acceptCgu = false;
        this.bodyClasses = "hold-transition register-page";
    }
    RegisterComponent.prototype.ngOnInit = function () {
        $('body').addClass(this.bodyClasses);
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        $('body').removeClass(this.bodyClasses);
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        delete this.error;
        if (!this.account.login) {
            this.error = "Un e-mail doit être renseigné";
            return;
        }
        if (!this.account.name) {
            this.error = "Un nom doit être renseigné";
            return;
        }
        if (this.account.password != this.passwordControl) {
            this.error = "Erreur dans la saisie du mot de passe";
            return;
        }
        if (!this.acceptCgu) {
            this.error = "Les conditions générales d'utilisation doivent être validé";
            return;
        }
        this.accountService.register(this.account).then(function (a) {
            if (a) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = "Compte Invalide";
            }
        }).catch(function (r) {
            _this.error = r._body;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            template: "<div class=\"login-box\">\n    <div class=\"login-logo\">\n      <a href=\"index.html\"><b>Arc</b>Competition</a>\n    </div>\n    <div class=\"register-box-body\">\n      <p class=\"login-box-msg\"><img src=\"images/fnd.jpg\" style=\"width: 128px;\"/><br/>Cr\u00E9ation d'un compte ArcCompetition</p>\n  \n      <form #registerForm=\"ngForm\" (ngSubmit)=\"register()\">\n        <div class=\"form-group has-feedback\" [ngClass]=\"{'has-error': nameField.errors}\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Nom\"\n            name=\"name\" #nameField=\"ngModel\"\n            [(ngModel)]=\"account.name\"\n            required>\n          <span class=\"glyphicon glyphicon-user form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\" [ngClass]=\"{'has-error': firstNameField.errors}\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Prenom\" name=\"firstName\" #firstNameField=\"ngModel\" [(ngModel)]=\"account.firstName\" required>\n            <span class=\"glyphicon glyphicon-user form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\" [ngClass]=\"{'has-error': emailField.errors}\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Email\" name=\"email\" #emailField=\"ngModel\" [(ngModel)]=\"account.login\" required email>\n          <span class=\"glyphicon glyphicon-envelope form-control-feedback\"></span>\n          <span class=\"help-block\" *ngIf=\"emailField.errors?.email\">\n            L'email doit \u00EAtre de la forme mon.nom@domaine.tld\n          </span>\n        </div>\n        <div class=\"form-group has-feedback\" [ngClass]=\"{'has-error': passwordField.errors}\">\n          <input type=\"password\" class=\"form-control\" placeholder=\"Mot de passe\" name=\"password\" #passwordField=\"ngModel\"\n            [(ngModel)]=\"account.password\"\n            required validateEqual=\"passwordControl\" reverse=\"true\" pattern=\"(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,}).*\">\n          <span class=\"glyphicon glyphicon-lock form-control-feedback\"></span>\n          <span class=\"help-block\" *ngIf=\"passwordField.errors?.pattern\">\n            Le mot de passe doit au minimum contenir des minuscules, majuscules et chiffres avec une taille minimum de 8 caract\u00E8res\n          </span>\n        </div>\n        <div class=\"form-group has-feedback\" [ngClass]=\"{'has-error': passwordControlField.errors}\">\n          <input type=\"password\" class=\"form-control\" placeholder=\"Retaper le mot de passe\" name=\"passwordControl\" #passwordControlField=\"ngModel\"\n            [(ngModel)]=\"passwordControl\"\n            required validateEqual=\"password\">\n          <span class=\"glyphicon glyphicon-log-in form-control-feedback\"></span>\n          <span class=\"help-block\" *ngIf=\"passwordControlField.errors?.validateEqual === false\">\n            La confirmation ne correspond pas!\n          </span>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12 alert alert-danger\" *ngIf=\"error\">{{error}}</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-7\">\n            <div class=\"checkbox icheck\">\n              <label>\n                <input icheck type=\"checkbox\"\n                  name=\"acceptCgu\"\n                  [checked]=\"acceptCgu\" (change)=\"acceptCgu = $event\"\n                  /> j'accepte les <a href=\"cgu.html\">conditions d'utilisation</a>\n              </label>\n            </div>\n          </div>\n          <!-- /.col -->\n          <div class=\"col-xs-5\">\n            <button type=\"submit\" class=\"btn btn-primary btn-block btn-flat\" [disabled]=\"registerForm.invalid\">S'enregistrer</button>\n          </div>\n          <!-- /.col -->\n        </div>\n      </form>\n  \n      <a [routerLink]=\"['/login']\" class=\"text-center\">J'ai d\u00E9j\u00E0 un compte</a>\n    </div>\n  </div>"
        }),
        __metadata("design:paramtypes", [router_1.Router, account_service_1.AccountService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;

//# sourceMappingURL=register.component.js.map
