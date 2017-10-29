var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "./account.service";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, accountService) {
        this.router = router;
        this.accountService = accountService;
        this.account = {};
        this.bodyClasses = "hold-transition login-page";
    }
    LoginComponent.prototype.ngOnInit = function () {
        $('body').addClass(this.bodyClasses);
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        $('body').removeClass(this.bodyClasses);
    };
    LoginComponent.prototype.auth = function () {
        var _this = this;
        this.accountService.login(this.account).then(function (account) {
            _this.router.navigate(['/']);
        }).catch(function (r) {
            if (r._body == "Bad password") {
                _this.passwordError = "Mot de passe invalide";
            }
            else if (r._body == "Bad user") {
                _this.loginError = "Identifiant invalide";
            }
        });
    };
    LoginComponent = __decorate([
        Component({
            selector: 'login',
            template: "<div class=\"login-page login-box\">\n\t<div class=\"login-logo\">\n\t  <a href=\"index.html\"><b>Arc</b>Competition</a>\n\t</div>\n\t<!-- /.login-logo -->\n\t<div class=\"login-box-body\">\n\t  \n\t  <p class=\"login-box-msg\"><img src=\"images/fnd.jpg\" style=\"width: 128px;\"/><br/>Authentification pour d\u00E9marrer une session</p>\n  \n\t  <form>\n\t\t<div class=\"form-group has-feedback\">\n\t\t  <input type=\"email\" class=\"form-control\" placeholder=\"Email\" name=\"email\" [(ngModel)]=\"account.login\" />\n\t\t  <span class=\"glyphicon glyphicon-envelope form-control-feedback\"></span>\n\t\t</div>\n\t\t<div class=\"form-group has-feedback\">\n\t\t  <input type=\"password\" class=\"form-control\" placeholder=\"Password\" name=\"password\" [(ngModel)]=\"account.password\"/>\n\t\t  <span class=\"glyphicon glyphicon-lock form-control-feedback\"></span>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t  <div class=\"col-xs-7\">\n\t\t\t<div class=\"checkbox icheck\">\n\t\t\t  <label>\n\t\t\t\t<input icheck type=\"checkbox\" [checked]=\"account.keepAuth\" (change)=\"account.keepAuth = $event\" name=\"keepAuth\" /> Se souvenir de moi\n\t\t\t  </label>\n\t\t\t</div>\n\t\t  </div>\n\t\t  <!-- /.col -->\n\t\t  <div class=\"col-xs-5\">\n\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-block btn-flat\" (click)=\"auth()\">S'authentifier</button>\n\t\t  </div>\n\t\t  <!-- /.col -->\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-xs-12 alert alert-danger\" *ngIf=\"loginError || passwordError\">{{loginError}} {{passwordError}}</div>\n\t\t</div>\n\t  </form>\n  \n\t  <!--<div class=\"social-auth-links text-center\">\n\t\t<p>- OU -</p>\n\t\t<a href=\"#\" class=\"btn btn-block btn-social btn-facebook btn-flat\"><i class=\"fa fa-facebook\"></i> S'authentifier avec\n\t\t  Facebook</a>\n\t\t<a href=\"#\" class=\"btn btn-block btn-social btn-google btn-flat\"><i class=\"fa fa-google-plus\"></i> S'authentifier avec\n\t\t  Google+</a>\n\t  </div>-->\n\t  <!-- /.social-auth-links -->\n  \n\t  <a href=\"#\">J'ai oublier mon mot de passe</a><br>\n\t  <a [routerLink]=\"['/register']\" class=\"text-center\">Cr\u00E9er mon compte</a>\n  \n\t</div>\n\t<!-- /.login-box-body -->\n  </div>"
        }),
        __metadata("design:paramtypes", [Router, AccountService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map