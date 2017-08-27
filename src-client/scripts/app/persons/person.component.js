System.register(["@angular/core", "@angular/router", "../entites/entites.service", "../references/references.service", "./persons.service", "../general", "rxjs/add/operator/share"], function (exports_1, context_1) {
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
    var core_1, router_1, entites_service_1, references_service_1, persons_service_1, general_1, PersonComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (entites_service_1_1) {
                entites_service_1 = entites_service_1_1;
            },
            function (references_service_1_1) {
                references_service_1 = references_service_1_1;
            },
            function (persons_service_1_1) {
                persons_service_1 = persons_service_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            PersonComponent = (function () {
                function PersonComponent(route, router, navigation, references, persons, entitesService) {
                    this.route = route;
                    this.router = router;
                    this.navigation = navigation;
                    this.references = references;
                    this.persons = persons;
                    this.entitesService = entitesService;
                    this.person = {
                        name: '',
                        firstName: ''
                    };
                    this.countries = [];
                    this.civilities = [];
                    this.criteria = [];
                    this.mustUpdateView = false;
                }
                PersonComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params.subscribe(function (params) {
                        _this.idPerson = params['id'];
                        _this.mustUpdateView = true;
                    });
                    this.route.url.subscribe(function (url) {
                        _this.url = url;
                        _this.mustUpdateView = true;
                    });
                    this.references.getCountries().then(function (c) { return _this.countries = c; });
                    this.persons.getCivilities().then(function (c) { return _this.civilities = c; });
                };
                PersonComponent.prototype.ngDoCheck = function () {
                    if (this.mustUpdateView) {
                        this.mustUpdateView = false;
                        this.updateView();
                    }
                };
                PersonComponent.prototype.updateView = function () {
                    var _this = this;
                    var currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
                    var currentPath = general_1.NavigationSnapshot.getPath(this.url).join("/");
                    if (this.person && this.person.id == this.idPerson)
                        return;
                    this.navigation.pushUrlSegments("Personne", this.url, null);
                    currentNavigationSnapshot = this.navigation.getCurrentNavigationSnapshot();
                    if (this.idPerson && !this.idPerson.startsWith("new")) {
                        this.persons.getPerson(this.idPerson).then(function (p) {
                            _this.person = p;
                            _this.age = _this.calculAge(p.dateNaissance);
                            if (currentNavigationSnapshot.returnData) {
                                _this.setEntity(currentNavigationSnapshot.returnData);
                                _this.person.idEntity = _this.entite.id;
                            }
                            else if (_this.person.idEntity) {
                                _this.entitesService.getEntity(_this.person.idEntity).then(function (entity) { return _this.setEntity(entity); });
                            }
                            currentNavigationSnapshot.label = p.name + " " + p.firstName;
                            currentNavigationSnapshot.stateData = p;
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
                /*formatDate(date : Date) : string{
                    return moment(date).format('DD/MM/YYYY');
                }*/
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
                PersonComponent.prototype.validate = function () {
                    var _this = this;
                    this.persons.savePerson(this.person).then(function (person) {
                        _this.navigation.goBack(_this.router, null, -1);
                    }).catch(function (reason) {
                        _this.error = reason;
                    });
                };
                PersonComponent = __decorate([
                    core_1.Component({
                        selector: 'person',
                        template: "<titlebar title=\"{{person.name}} {{person.firstName}} &nbsp;\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n\t\t\t\t<form class=\"form-horizontal\">\n\t\t\t\t<div class=\"nav-tabs-custom\">\n\t\t\t\t\t<ul class=\"nav nav-tabs\">\n\t\t\t\t\t\t<li [class.active]=\"!activePane || activePane=='identity'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='identity'\">Identit\u00E9</a></li>\n\t\t\t\t\t\t<li *ngIf=\"person.type == 'archer'\" [class.active]=\"activePane=='category'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='category'\">Categorie</a></li>\n\t\t\t\t\t\t<li *ngIf=\"person.type == 'archer'\" [class.active]=\"activePane=='activity'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='activity'\">Activit\u00E9s</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div class=\"tab-content\">\n\t\t\t\t\t\t<div id=\"identity\" class=\"tab-pane\" [class.active]=\"!activePane || activePane=='identity'\">\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personEntity\" class=\"col-sm-2 control-label\">Associ\u00E9 \u00E0 l'entit\u00E9</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"form-control no-border\">\n\t\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"entite\" ><a [routerLink]=\"['/entities', entite.id]\">{{entite.nom}}</a> - </span>\n\t\t\t\t\t\t\t\t\t\t\t<a [routerLink]=\"['/entities']\" [queryParams]=\"{forSelect : true}\" id=\"entity\">Choisir...</a>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t<h4>Identit\u00E9</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCivility\" class=\"col-sm-2 control-label\">Civilit\u00E9</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<select id=\"personCivility\" class=\"form-control\" [(ngModel)]=\"person.idCivility\" name=\"personCivility\">\n\t\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let civility of civilities\" [value]=\"civility.id\">{{civility.abreviation}}</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personName\" class=\"col-sm-2 control-label\">Nom</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Nom\" id=\"personName\" name=\"personName\" class=\"form-control\" [(ngModel)]=\"person.name\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personFirstName\" class=\"col-sm-2 control-label\">Prenom</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Prenom\" id=\"personFirstName\" name=\"personFirstName\" class=\"form-control\" [(ngModel)]=\"person.firstName\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"dateNaissance\" class=\"col-sm-2 control-label\">Date de naissance</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"input-group date\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<input [ngModel]=\"person.dateNaissance | date: 'yyyy-MM-dd'\" (ngModelChange)=\"setDateNaissance($event)\" type=\"date\" id=\"dateNaissance\" name=\"dateNaissance\" class=\"form-control\" data-date-format=\"yyyy-mm-dd\" lang=\"fr\">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t<label for=\"age\" class=\"col-sm-2 control-label\">Age</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t<span class=\"form-control no-border\">{{age}} ans</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"licence\" class=\"col-sm-2 control-label\">Licence</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Licence\" id=\"licence\" name=\"licence\" class=\"form-control\" [(ngModel)]=\"person.numLicenceArcher\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t\t\t<label for=\"certificat\" class=\"col-sm-2 control-label\">Certificat</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"input-group date\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-calendar\"></i>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<input [ngModel]=\"person.certificat | date: 'yyyy-MM-dd'\" (ngModelChange)=\"setDateCertificat($event)\" type=\"date\" id=\"certificat\" name=\"certificat\" class=\"form-control\" data-date-format=\"yyyy-mm-dd\" lang=\"fr\">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>Coordonn\u00E9es</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personAddress\" class=\"col-sm-2 control-label\">Adresse</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><textarea rows=\"4\" placeholder=\"Adresse\" id=\"personAddress\" name=\"personAddress\" class=\"form-control\" [(ngModel)]=\"person.address\"></textarea></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personZipCode\" class=\"col-sm-2 control-label\">Code postal</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Code postal\" id=\"personZipCode\" name=\"personZipCode\" class=\"form-control\" [(ngModel)]=\"person.zipCode\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCity\" class=\"col-sm-2 control-label\">Ville</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><input placeholder=\"Ville\" id=\"personCity\" name=\"personCity\" class=\"form-control\" [(ngModel)]=\"person.city\" /></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personCountry\" class=\"col-sm-2 control-label\">Pays</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><select id=\"personCountry\" name=\"personCountry\" class=\"form-control\" [(ngModel)]=\"person.countryCode\">\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let country of countries\" [value]=\"country.code\">{{country.libelle}}</option>\n\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>Divers</h4>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"personNotes\" class=\"col-sm-2 control-label\">Notes</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-10\"><textarea rows=\"8\" placeholder=\"Notes\" id=\"personNotes\" name=\"personNotes\" class=\"form-control\" [(ngModel)]=\"person.note\"></textarea></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"category\" class=\"tab-pane\" [class.active]=\"activePane=='category'\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\t<div *ngFor=\"let criterion of criteria\" class=\"form-group\">\n\t\t\t\t\t\t\t<label for=\"criterion-elements-{{criterion.id}}\" class=\"col-sm-2 control-label\">{{criterion.libelle}}</label>\n\t\t\t\t\t\t\t<div class=\"col-sm-10\">\n\t\t\t\t\t\t\t<select select2 name=\"criterion-elements-{{criterion.id}}\" class=\"form-control\" style=\"width: 200px;\">\n\t\t\t\t\t\t\t\t<option *ngFor=\"let element of criterion.criterionElements\" value=\"element\">{{element.libelle}}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"activity\" class=\"tab-pane\" [class.active]=\"activePane=='activity'\" *ngIf=\"person.type == 'archer'\">\n\t\t\t\t\t\t\tPour les archers - activit\u00E9 de l'archer sur les comp\u00E9titions\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n\t\t\t\t{{error}}\n\t\t\t\t</div>\n\n\t\t\t\t<button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n\t\t\t\t<button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"button\" (click)=\"validate()\">Valider</button>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
                    }),
                    __metadata("design:paramtypes", [router_1.ActivatedRoute,
                        router_1.Router,
                        general_1.NavigatorService,
                        references_service_1.ReferencesService,
                        persons_service_1.PersonsService,
                        entites_service_1.EntitesService])
                ], PersonComponent);
                return PersonComponent;
            }());
            exports_1("PersonComponent", PersonComponent);
        }
    };
});

//# sourceMappingURL=person.component.js.map
