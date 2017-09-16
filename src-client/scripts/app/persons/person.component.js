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
///<reference path="../_references.ts"/>
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { IEntite } from '../models/ientite';
var account_service_1 = require("../account/account.service");
var entites_service_1 = require("../entites/entites.service");
var references_service_1 = require("../references/references.service");
var persons_service_1 = require("./persons.service");
var navigator_service_1 = require("../general/navigator.service");
var NavigationSnapshot_1 = require("../general/NavigationSnapshot");
require("rxjs/add/operator/share");
var PersonComponent = /** @class */ (function () {
    function PersonComponent(route, router, cdf, navigation, references, accountService, persons, entitesService) {
        this.route = route;
        this.router = router;
        this.cdf = cdf;
        this.navigation = navigation;
        this.references = references;
        this.accountService = accountService;
        this.persons = persons;
        this.entitesService = entitesService;
        this.person = {
            name: '',
            firstName: ''
        };
        this.confirmPassword = "";
        this.isPasswordRequired = false;
        this.countries = [];
        this.civilities = [];
        this.criteria = [];
        this.accountMode = false;
        this.mustUpdateView = false;
    }
    Object.defineProperty(PersonComponent.prototype, "checkPasswordRequired", {
        get: function () {
            var passwordRequired = false;
            if (this.person.newPassword && this.person.newPassword.length > 0)
                passwordRequired = true;
            return passwordRequired;
        },
        enumerable: true,
        configurable: true
    });
    PersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.idPerson = params['id'];
            _this.mustUpdateView = true;
            _this.accountMode = false;
        });
        this.route.url.subscribe(function (url) {
            _this.url = url;
            if (url[0].path == "account") {
                _this.accountService.getAccount().then(function (a) {
                    _this.person = a;
                    a.newPassword = "";
                    _this.mustUpdateView = true;
                    _this.accountMode = true;
                });
            }
            else {
                _this.mustUpdateView = true;
                _this.accountMode = false;
            }
        });
        this.references.getCountries().then(function (c) { return _this.countries = c; });
        this.persons.getCivilities().then(function (c) { return _this.civilities = c; });
    };
    PersonComponent.prototype.ngDoCheck = function () {
        this.cdf.detectChanges();
        if (this.mustUpdateView) {
            this.mustUpdateView = false;
            this.updateView();
        }
    };
    PersonComponent.prototype.updateView = function () {
        var _this = this;
        var currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
        var currentPath = NavigationSnapshot_1.NavigationSnapshot.getPath(this.url).join("/");
        if (this.person && this.person.id == this.idPerson)
            return;
        this.navigation.pushUrlSegments("Personne", this.url, null);
        currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
        if (this.accountMode) {
            this.setPerson(this.person, currentNavigationSnapshot);
        }
        else if (this.idPerson && !this.idPerson.startsWith("new")) {
            this.persons.getPerson(this.idPerson).then(function (p) {
                _this.setPerson(p, currentNavigationSnapshot);
            });
        }
        else {
            var previousNavigationSnapshot = this.navigation.getPreviousNavigationSnapshot();
            var idEntity = null;
            if (previousNavigationSnapshot && previousNavigationSnapshot.stateData
                && previousNavigationSnapshot.stateData._type == "Entite") {
                this.setEntity(previousNavigationSnapshot.stateData);
                idEntity = this.entite.id;
            }
            else if (currentNavigationSnapshot.returnData) {
                this.setEntity(currentNavigationSnapshot.returnData);
                idEntity = this.entite.id;
            }
            this.person = {
                name: '',
                firstName: '',
                idEntity: idEntity,
                type: this.idPerson == 'newArcher' ? 'archer' : 'contact'
            };
            currentNavigationSnapshot.label = "Création d'une personne";
            currentNavigationSnapshot.stateData = this.person;
        }
    };
    PersonComponent.prototype.setPerson = function (person, currentNavigationSnapshot) {
        var _this = this;
        this.person = person;
        this.age = this.calculAge(person.dateNaissance);
        if (currentNavigationSnapshot.returnData) {
            this.setEntity(currentNavigationSnapshot.returnData);
            this.person.idEntity = this.entite.id;
        }
        else if (this.person.idEntity) {
            this.entitesService.getEntity(this.person.idEntity).then(function (entity) { return _this.setEntity(entity); });
        }
        currentNavigationSnapshot.label = person.name + " " + person.firstName;
        currentNavigationSnapshot.stateData = person;
    };
    PersonComponent.prototype.setEntity = function (entity) {
        var _this = this;
        this.entite = entity;
        if (this.entite.idEntiteParent)
            this.entitesService.getCriteria(this.entite.idEntiteParent).then(function (c) { return _this.criteria = c; });
        else if (this.entite.type == 0)
            this.entitesService.getCriteria(this.entite.id).then(function (c) { return _this.criteria = c; });
        else
            this.criteria = [];
    };
    PersonComponent.prototype.getCriterionElementById = function (idCriterionElement) {
        for (var i = 0; i < this.criteria.length; i++) {
            var criterion = this.criteria[i];
            var element = criterion.criterionElements.find(function (e) { return e.id == idCriterionElement; });
            if (element)
                return { criterion: criterion, element: element };
        }
        ;
    };
    PersonComponent.prototype.getCriterionElement = function (criterion) {
        var _this = this;
        if (this.person.discriminantCriterionSet && this.person.discriminantCriterionSet.elements) {
            var element = this.person.discriminantCriterionSet.elements.find(function (e) { return _this.getCriterionElementById(e.idCriterionElement).criterion.id == criterion.id; });
            if (element)
                return element.idCriterionElement;
        }
    };
    PersonComponent.prototype.setCriterionElement = function (criterion, idCriterionElement) {
        var _this = this;
        if (!this.person.discriminantCriterionSet) {
            this.person.discriminantCriterionSet = {
                elements: []
            };
        }
        else if (!this.person.discriminantCriterionSet.elements) {
            this.person.discriminantCriterionSet.elements = [];
        }
        var discriminantCriterionSetElement = this.person.discriminantCriterionSet.elements.find(function (e) { return _this.getCriterionElementById(e.idCriterionElement).criterion.id == criterion.id; });
        if (discriminantCriterionSetElement) {
            discriminantCriterionSetElement.idCriterionElement = idCriterionElement;
        }
        else {
            this.person.discriminantCriterionSet.elements.push({
                idCriterionElement: idCriterionElement,
                ordre: this.person.discriminantCriterionSet.elements.length + 1
            });
        }
    };
    PersonComponent.prototype.setDateCertificat = function (date) {
        try {
            var validDate = this.toDate(date);
            if (validDate.getFullYear() >= new Date().getFullYear() - 1
                && validDate.getFullYear() <= new Date().getFullYear())
                this.person.certificat = validDate;
        }
        catch (e) { }
    };
    PersonComponent.prototype.setDateNaissance = function (date) {
        try {
            var validDate = this.toDate(date);
            if (validDate.getFullYear() >= new Date().getFullYear() - 1
                && validDate.getFullYear() <= new Date().getFullYear())
                this.person.dateNaissance = validDate;
            this.age = this.calculAge(validDate);
        }
        catch (e) { }
    };
    PersonComponent.prototype.toDate = function (date) {
        return new Date(date);
    };
    PersonComponent.prototype.calculAge = function (dateNaissance) {
        if (!dateNaissance)
            return 0;
        var td = new Date(); // Le date d'ouverture de la page (aujourd'hui)		
        var age = td.getFullYear() - dateNaissance.getFullYear(); // l'âge du patient
        var mMois = td.getMonth() - dateNaissance.getMonth(); // On calcul  le mois de la date - le mois de la date de naissance
        if (mMois < 0) {
            age = age - 1; // On enléve 1 ans a l'age
        }
        else {
            if (mMois == 0) {
                var mDate = td.getDate() - dateNaissance.getDate();
                if (mDate < 0) {
                    age = age - 1;
                }
            }
        }
        return age; // que l'on place dans le input d'id Age
    };
    PersonComponent.prototype.cancel = function () {
        this.navigation.goBack(this.router, null, -1);
    };
    PersonComponent.prototype.validate = function (f) {
        var _this = this;
        if (!this.accountMode) {
            this.persons.savePerson(this.person).then(function (person) {
                _this.navigation.goBack(_this.router, null, -1);
            }).catch(function (reason) {
                _this.error = reason;
            });
        }
        else {
            this.accountService.saveAccount(this.person).then(function (person) {
                _this.navigation.goBack(_this.router, null, -1);
            }).catch(function (reason) {
                _this.error = reason;
            });
        }
    };
    PersonComponent = __decorate([
        core_1.Component({
            selector: 'person',
            template: "<titlebar title=\"{{person.name}} {{person.firstName}} &nbsp;\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n\t\t\t\t<form class=\"form-horizontal\" #personForm=\"ngForm\" (ngSubmit)=\"validate(personForm)\">\n\t\t\t\t<div class=\"nav-tabs-custom\">\n\t\t\t\t\t<ul class=\"nav nav-tabs\">\n\t\t\t\t\t\t<li [class.active]=\"!activePane || activePane=='identity'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='identity'\">Identit\u00E9</a></li>\n\t\t\t\t\t\t<li *ngIf=\"accountMode\" [class.active]=\"activePane=='account'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='account'\">Compte <!--<span class=\"badge bg-red\">{{personForm.controls[\"newPassword\"]?.errors?.length + personForm.controls[\"confirmPassword\"]?.errors?.length}}</span>--></a></li>\n\t\t\t\t\t\t<li *ngIf=\"person.type == 'archer'\" [class.active]=\"activePane=='category'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='category'\">Categorie</a></li>\n\t\t\t\t\t\t<li *ngIf=\"person.type == 'archer'\" [class.active]=\"activePane=='activity'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='activity'\">Activit\u00E9s</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div class=\"tab-content main-pane\">\n\t\t\t\t\t\t<div id=\"identity\" class=\"tab-pane\" [class.active]=\"!activePane || activePane=='identity'\">\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : personEntityField.invalid}\">\n\t\t\t\t\t\t\t\t\t<label for=\"personEntity\" class=\"col-sm-2 control-label\">Associ\u00E9 \u00E0 l'entit\u00E9</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<p class=\"form-control-static\">\n\t\t\t\t\t\t\t\t\t\t\t<entite-selector\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"personEntity\" name=\"personEntity\" #personEntityField=\"ngModel\"\n\t\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"person.idEntity\"\n\t\t\t\t\t\t\t\t\t\t\t\trequired></entite-selector>\n\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"personEntityField.errors?.required\">\n\t\t\t\t\t\t\t\t\t\t\tLa personne doit \u00EAtre associ\u00E9 \u00E0 une entit\u00E9\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t<h4>Identit\u00E9</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCivility\" class=\"col-sm-2 control-label\">Civilit\u00E9</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<select id=\"personCivility\" class=\"form-control\" [(ngModel)]=\"person.idCivility\" name=\"personCivility\">\n\t\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let civility of civilities\" [value]=\"civility.id\">{{civility.abreviation}}</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : personNameField.invalid}\">\n\t\t\t\t\t\t\t\t\t<label for=\"personName\" class=\"col-sm-2 control-label\">Nom</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\tid=\"personName\" name=\"personName\" #personNameField=\"ngModel\"\n\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"person.name\"\n\t\t\t\t\t\t\t\t\t\t\trequired\n\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Nom\" \n\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"/>\n\t\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"personNameField.errors?.required\">\n\t\t\t\t\t\t\t\t\t\t\tUn nom est obligatoire\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : personFirstNameField.invalid}\">\n\t\t\t\t\t\t\t\t\t<label for=\"personFirstName\" class=\"col-sm-2 control-label\">Prenom</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\"\n\t\t\t\t\t\t\t\t\t\t\tid=\"personFirstName\" name=\"personFirstName\" #personFirstNameField=\"ngModel\"\n\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"person.firstName\"\n\t\t\t\t\t\t\t\t\t\t\trequired\n\t\t\t\t\t\t\t\t\t\t\tplaceholder=\"Prenom\" \n\t\t\t\t\t\t\t\t\t\t\tclass=\"form-control\"/>\n\t\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"personFirstNameField.errors?.required\">\n\t\t\t\t\t\t\t\t\t\t\tUn pr\u00E9nom est obligatoire\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"dateNaissance\" class=\"col-sm-2 control-label\">Date de naissance</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"input-group date\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<input bsDatepicker [bsConfig]=\"{ containerClass: 'theme-dark-blue', locale: 'fr'}\" [(ngModel)]=\"person.dateNaissance\" type=\"text\" id=\"dateNaissance\" name=\"dateNaissance\" class=\"form-control\" data-date-format=\"yyyy-mm-dd\" lang=\"fr\">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"age\" class=\"col-sm-2 control-label\">Age</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<p class=\"form-control-static\">{{age}} ans</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"licence\" class=\"col-sm-2 control-label\">Licence</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Licence\" id=\"licence\" name=\"licence\" class=\"form-control\" [(ngModel)]=\"person.numLicenceArcher\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"certificat\" class=\"col-sm-2 control-label\">Certificat</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"input-group date\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<input bsDatepicker [bsConfig]=\"{ containerClass: 'theme-dark-blue', locale: 'fr', firstDayOfWeek: 1}\" [(ngModel)]=\"person.certificat\" type=\"text\" id=\"certificat\" name=\"certificat\" class=\"form-control\" data-date-format=\"yyyy-mm-dd\" lang=\"fr\">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>Coordonn\u00E9es</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personAddress\" class=\"col-sm-2 control-label\">Adresse</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><textarea rows=\"4\" placeholder=\"Adresse\" id=\"personAddress\" name=\"personAddress\" class=\"form-control\" [(ngModel)]=\"person.address\"></textarea></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personZipCode\" class=\"col-sm-2 control-label\">Code postal</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Code postal\" id=\"personZipCode\" name=\"personZipCode\" class=\"form-control\" [(ngModel)]=\"person.zipCode\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCity\" class=\"col-sm-2 control-label\">Ville</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input placeholder=\"Ville\" id=\"personCity\" name=\"personCity\" class=\"form-control\" [(ngModel)]=\"person.city\" /></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCountry\" class=\"col-sm-2 control-label\">Pays</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><select id=\"personCountry\" name=\"personCountry\" class=\"form-control\" [(ngModel)]=\"person.countryCode\">\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let country of countries\" [value]=\"country.code\">{{country.libelle}}</option>\n\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>Divers</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personNotes\" class=\"col-sm-2 control-label\">Notes</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><textarea rows=\"8\" placeholder=\"Notes\" id=\"personNotes\" name=\"personNotes\" class=\"form-control\" [(ngModel)]=\"person.note\"></textarea></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"account\" class=\"tab-pane\" [class.active]=\"activePane=='account'\" *ngIf=\"accountMode\">\n\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : loginField.invalid}\">\n\t\t\t\t\t\t\t\t<label for=\"login\" class=\"col-sm-2 control-label\">E-mail</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t<input type=\"email\" email required placeholder=\"E-Mail\" id=\"login\" #loginField=\"ngModel\" name=\"login\" class=\"form-control\" [(ngModel)]=\"person.login\"/>\n\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"loginField.errors?.email\">\n\t\t\t\t\t\t\t\t\t\tL'email doit \u00EAtre de la forme mon.nom@domaine.tld\n\t\t\t\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"loginField.errors?.required\">\n\t\t\t\t\t\t\t\t\t\tL'email est obligatoire\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : passwordField.invalid}\">\n\t\t\t\t\t\t\t\t<label for=\"password\" class=\"col-sm-2 control-label\">Mot de passe actuel</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t<input type=\"password\"\n\t\t\t\t\t\t\t\t\t\tid=\"password\" name=\"password\" #passwordField=\"ngModel\"\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"person.password\"\n\t\t\t\t\t\t\t\t\t\t[required]=\"checkPasswordRequired ? 'true' : 'false'\"\n\t\t\t\t\t\t\t\t\t\tplaceholder=\"Mot de passe actuel\"\n\t\t\t\t\t\t\t\t\t\tclass=\"form-control\" />\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"passwordField.errors?.required\">\n\t\t\t\t\t\t\t\t\t\tVous devez saisir votre mot de passe actuel pour pouvoir le changer\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : newPasswordField.invalid}\">\n\t\t\t\t\t\t\t\t<label for=\"newPassword\" class=\"col-sm-2 control-label\">Nouveau mot de passe</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t<input type=\"password\"\n\t\t\t\t\t\t\t\t\t\tid=\"newPassword\" #newPasswordField=\"ngModel\" name=\"newPassword\"\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"person.newPassword\"\n\t\t\t\t\t\t\t\t\t\tminlength=\"8\" validateEqual=\"confirmPassword\" reverse=\"true\"\n\t\t\t\t\t\t\t\t\t\tplaceholder=\"Nouveau mot de passe\"\n\t\t\t\t\t\t\t\t\t\tclass=\"form-control\" />\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"newPasswordField.errors?.minlength\">\n\t\t\t\t\t\t\t\t\t\tLe mot de passe doit faire au moins {{newPasswordField.errors.minlength.requiredLength}} caract\u00E8res\n\t\t\t\t\t\t\t\t\t\t({{newPasswordField.errors.minlength.actualLength}} actuellement)\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group\" [ngClass]=\"{'has-error' : confirmPasswordField.errors}\">\n\t\t\t\t\t\t\t\t<label for=\"confirmPassword\" class=\"col-sm-2 control-label\">Confirmation mot de passe</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t<input type=\"password\"\n\t\t\t\t\t\t\t\t\t\tid=\"confirmPassword\" #confirmPasswordField=\"ngModel\" name=\"confirmPassword\"\n\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"confirmPassword\"\n\t\t\t\t\t\t\t\t\t\tvalidateEqual=\"newPassword\"\n\t\t\t\t\t\t\t\t\t\tplaceholder=\"Confirmation mot de passe\"\n\t\t\t\t\t\t\t\t\t\tclass=\"form-control\" />\n\t\t\t\t\t\t\t\t\t<span class=\"help-block\" *ngIf=\"confirmPasswordField.errors?.validateEqual === false\">\n\t\t\t\t\t\t\t\t\t\tLa confirmation ne correspond pas!\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"category\" class=\"tab-pane\" [class.active]=\"activePane=='category'\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t<div *ngFor=\"let criterion of criteria\" class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"criterion-elements-{{criterion.id}}\" class=\"col-sm-2 control-label\">{{criterion.libelle}}</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t<select select2  [value]=\"getCriterionElement(criterion)\" (valueChange)=\"setCriterionElement(criterion, $event)\" name=\"criterion-elements-{{criterion.id}}\" class=\"form-control\" style=\"width: 200px;\">\n\t\t\t\t\t\t\t\t<option *ngFor=\"let element of criterion.criterionElements\" value=\"{{element.id}}\" [attr.selected]=\"getCriterionElement(criterion) == element.id ? 'selected' : null\">{{element.libelle}}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"activity\" class=\"tab-pane\" [class.active]=\"activePane=='activity'\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\tPour les archers - activit\u00E9 de l'archer sur les comp\u00E9titions\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n\t\t\t\t{{error}}\n\t\t\t\t</div>\n\n\t\t\t\t<button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n\t\t\t\t<button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"submit\"\n\t\t\t\t\t[disabled]=\"personForm.invalid\">Valider</button>\n\t\t\t\t<span class=\"text-danger pull-right\" style=\"padding: 6px 12px;\" role=\"alert\" *ngIf=\"personForm.invalid\">Tous les champs ne sont pas valide. Validation impossible!</span>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            core_1.ChangeDetectorRef,
            navigator_service_1.NavigatorService,
            references_service_1.ReferencesService,
            account_service_1.AccountService,
            persons_service_1.PersonsService,
            entites_service_1.EntitesService])
    ], PersonComponent);
    return PersonComponent;
}());
exports.PersonComponent = PersonComponent;

//# sourceMappingURL=person.component.js.map
