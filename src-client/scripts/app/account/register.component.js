System.register(["@angular/core", "@angular/router", "./account.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, account_service_1, RegisterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (account_service_1_1) {
                account_service_1 = account_service_1_1;
            }
        ],
        execute: function () {
            RegisterComponent = /** @class */ (function () {
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
                RegisterComponent.prototype.test = function (ev) {
                    console.log(ev);
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
                        template: "<div class=\"login-box\">\n    <div class=\"login-logo\">\n      <a href=\"index.html\"><b>Arc</b>Competition</a>\n    </div>\n    <div class=\"register-box-body\">\n      <p class=\"login-box-msg\"><img src=\"images/fnd.jpg\" style=\"width: 128px;\"/><br/>Cr\u00E9ation d'un compte ArcCompetition</p>\n  \n      <form>\n        <div class=\"form-group has-feedback\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Nom\" name=\"name\" [(ngModel)]=\"account.name\">\n          <span class=\"glyphicon glyphicon-user form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Prenom\" name=\"firstName\" [(ngModel)]=\"account.firstName\">\n            <span class=\"glyphicon glyphicon-user form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Email\" name=\"email\" [(ngModel)]=\"account.login\">\n          <span class=\"glyphicon glyphicon-envelope form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\">\n          <input type=\"password\" class=\"form-control\" placeholder=\"Mot de passe\" name=\"password\" [(ngModel)]=\"account.password\">\n          <span class=\"glyphicon glyphicon-lock form-control-feedback\"></span>\n        </div>\n        <div class=\"form-group has-feedback\">\n          <input type=\"password\" class=\"form-control\" placeholder=\"Retaper le mot de passe\" name=\"passwordControl\" [(ngModel)]=\"passwordControl\" >\n          <span class=\"glyphicon glyphicon-log-in form-control-feedback\"></span>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12 alert alert-danger\" *ngIf=\"error\">{{error}}</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-7\">\n            <div class=\"checkbox icheck\">\n              <label>\n                <input icheck type=\"checkbox\" name=\"acceptCgu\" [checked]=\"acceptCgu\" (change)=\"acceptCgu = $event\" /> j'accepte les <a href=\"cgu.html\">conditions d'utilisation</a>\n              </label>\n            </div>\n          </div>\n          <!-- /.col -->\n          <div class=\"col-xs-5\">\n            <button type=\"submit\" class=\"btn btn-primary btn-block btn-flat\" (click)=\"register()\">S'enregistrer</button>\n          </div>\n          <!-- /.col -->\n        </div>\n      </form>\n  \n      <a href=\"login.html\" class=\"text-center\">J'ai d\u00E9j\u00E0 un compte</a>\n    </div>\n  </div>"
                    }),
                    __metadata("design:paramtypes", [router_1.Router, account_service_1.AccountService])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    };
});

//# sourceMappingURL=register.component.js.map
