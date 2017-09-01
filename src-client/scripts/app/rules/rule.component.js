System.register(["@angular/core", "@angular/router", "../references/references.service", "./rules.service", "../entites/entites.service", "../general", "./model/Rule"], function (exports_1, context_1) {
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
    var core_1, router_1, references_service_1, rules_service_1, entites_service_1, general_1, Rule_1, RuleComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (references_service_1_1) {
                references_service_1 = references_service_1_1;
            },
            function (rules_service_1_1) {
                rules_service_1 = rules_service_1_1;
            },
            function (entites_service_1_1) {
                entites_service_1 = entites_service_1_1;
            },
            function (general_1_1) {
                general_1 = general_1_1;
            },
            function (Rule_1_1) {
                Rule_1 = Rule_1_1;
            }
        ],
        execute: function () {
            RuleComponent = (function () {
                function RuleComponent(route, router, navigation, references, rulesService, entiteService) {
                    this.route = route;
                    this.router = router;
                    this.navigation = navigation;
                    this.references = references;
                    this.rulesService = rulesService;
                    this.entiteService = entiteService;
                    this.rule = new Rule_1.Rule();
                    this.mustUpdateView = false;
                }
                RuleComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.rulesService.getRulesCategories().then(function (rc) { return _this.rulesCategories = rc; });
                    this.route.params.subscribe(function (params) {
                        var idRule = params['id'];
                        if (idRule != "new")
                            _this.idRule = idRule;
                        else
                            _this.idRule = undefined;
                        var currentNavigationSnapshot = _this.navigation.getCurrentNavigationSnapshot();
                        var currentPath = general_1.NavigationSnapshot.getPath(_this.route.snapshot.url).join("/");
                        if (currentNavigationSnapshot
                            && currentPath == currentNavigationSnapshot.path.join("/")
                            && currentNavigationSnapshot.stateData
                            && currentNavigationSnapshot.stateData.id == _this.idRule) {
                            _this.rule = currentNavigationSnapshot.stateData;
                            if (currentNavigationSnapshot.returnData) {
                                var entite = currentNavigationSnapshot.returnData;
                                _this.rule.idEntite = entite.id;
                                _this.rule.libelleEntite = entite.nom;
                            }
                        }
                        else {
                            _this.navigation.pushUrlSegments("Reglement", _this.route.snapshot.url, null);
                            currentNavigationSnapshot = _this.navigation.getCurrentNavigationSnapshot();
                            if (_this.idRule) {
                                _this.rulesService.getRule(_this.idRule).then(function (r) {
                                    _this.rule = r;
                                    _this.entiteService.getEntity(r.idEntite).then(function (e) {
                                        r.libelleEntite = e.nom;
                                    });
                                    currentNavigationSnapshot.label = r.name;
                                    currentNavigationSnapshot.stateData = r;
                                });
                            }
                            else {
                                _this.rule = new Rule_1.Rule();
                                currentNavigationSnapshot.label = "Nouveau réglement";
                                currentNavigationSnapshot.stateData = _this.rule;
                            }
                        }
                        //this.mustUpdateView = true;
                    });
                };
                RuleComponent.prototype.ngDoCheck = function () {
                    /*if(this.mustUpdateView) {
                        this.mustUpdateView = false;
            
                        
                    }*/
                };
                RuleComponent.prototype.keyNumericFilter = function (event) {
                    var pattern = /[0-9\+\-\ ]/;
                    var inputChar = String.fromCharCode(event.charCode);
                    // console.log(inputChar, e.charCode);
                    if (!pattern.test(inputChar) && event.charCode > 0) {
                        // invalid character, prevent input
                        event.preventDefault();
                    }
                };
                RuleComponent.prototype.cancel = function () {
                    this.navigation.goBack(this.router, null, -1);
                };
                RuleComponent.prototype.validate = function () {
                    var _this = this;
                    this.rulesService.saveRule(this.rule)
                        .then(function (rule) { return _this.navigation.goBack(_this.router, null, -1); })
                        .catch(function (reason) { return _this.error = reason; });
                };
                RuleComponent = __decorate([
                    core_1.Component({
                        selector: 'rule',
                        template: "<titlebar title=\"{{rule.name || 'Reglement'}}\"></titlebar>\n\t<div class=\"content body\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n\t\t\t\t<form #ruleForm=\"ngForm\">\n\t\t\t\t<div class=\"nav-tabs-custom\">\n\t\t\t\t\t<ul class=\"nav nav-tabs\">\n\t\t\t\t\t\t<li [class.active]=\"!activePane || activePane=='general'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='general'\">G\u00E9n\u00E9ral</a></li>\n\t\t\t\t\t\t<li [class.active]=\"activePane=='distancesAndFaces'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='distancesAndFaces'\">Distances et Blasons</a></li>\n\t\t\t\t\t\t<li [class.active]=\"activePane=='ranking'\"><a href=\"javascript:void(0)\" data-toogle=\"tab\" (click)=\"activePane='ranking'\">Classement</a></li>\n\t\t\t\t\t\t\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div class=\"tab-content\">\n\t\t\t\t\t\t<div id=\"general\" class=\"tab-pane form-horizontal\" [class.active]=\"!activePane || activePane=='general'\">\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>D\u00E9tail</h4>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label class=\"col-md-3 col-lg-2 control-label\">R\u00E9glement rattach\u00E9 \u00E0</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\">\n\t\t\t\t\t\t\t\t\t<p class=\"form-control-static\">\n\t\t\t\t\t\t\t\t\t<a [routerLink]=\"['/entities', rule.idEntite]\">{{rule.libelleEntite}}</a> - \n\t\t\t\t\t\t\t\t\t<a [routerLink]=\"['/federations']\" [queryParams]=\"{forSelect : true}\" id=\"entityFederation\">Choisir...</a>\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleCategory\" class=\"col-md-3 col-lg-2 control-label\">Cat\u00E9gorie</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><select id=\"ruleCategory\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" name=\"ruleCategory\" class=\"form-control\" [(ngModel)]=\"rule.idCategory\">\n\t\t\t\t\t\t\t\t\t\t<option *ngFor=\"let category of rulesCategories\" [value]=\"category.id\">{{category.name}}</option>\n\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleName\" class=\"col-md-3 col-lg-2 control-label\">Nom</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"text\" placeholder=\"Nom\" id=\"ruleName\" name=\"ruleName\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.name\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleDescription\" class=\"col-md-3 col-lg-2 control-label\">Description</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><textarea placeholder=\"Description\" id=\"ruleDescription\" name=\"ruleDescription\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.description\"></textarea></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\" [class.has-error]=\"ruleNbSerie.errors\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbSerie\" class=\"col-md-3 col-lg-2 control-label\">Nombre de s\u00E9rie</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"number\" placeholder=\"Nombre de s\u00E9rie\"\n\t\t\t\t\t\t\t\t\t\t\tpattern=\"[0-9]+\" \n\t\t\t\t\t\t\t\t\t\t\t#ruleNbSerie=\"ngModel\" \n\t\t\t\t\t\t\t\t\t\t\t(keypress)=\"keyNumericFilter($event)\"\n\t\t\t\t\t\t\t\t\t\t\tid=\"ruleNbSerie\" name=\"ruleNbSerie\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbSerie\"/>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbVoleeParSerie\" class=\"col-md-3 col-lg-2 control-label\">Nombre de vol\u00E9e par s\u00E9rie</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"number\" placeholder=\"Nombre de vol\u00E9e par s\u00E9rie\" id=\"ruleNbVoleeParSerie\" name=\"ruleNbVoleeParSerie\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbVoleeParSerie\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbFlecheParVolee\" class=\"col-md-3 col-lg-2 control-label\">Nombre de fl\u00E8che par vol\u00E9e</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"number\" placeholder=\"Nombre de fl\u00E8che par vol\u00E9e\" id=\"ruleNbFlecheParVolee\" name=\"ruleNbFlecheParVolee\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbFlecheParVolee\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbPointsParFleche\" class=\"col-md-3 col-lg-2 control-label\">Nombre de point par fl\u00E8che</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"number\" placeholder=\"Nombre de point maximal par fl\u00E8che\" id=\"ruleNbPointsParFleche\" name=\"ruleNbPointsParFleche\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbPointsParFleche\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleDepartages\" class=\"col-md-3 col-lg-2 control-label\">Crit\u00E8res de d\u00E9partage</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"text\" placeholder=\"Crit\u00E8res de d\u00E9partage\" id=\"ruleDepartages\" name=\"ruleDepartages\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.departages\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t<section class=\"formulaire\">\n\t\t\t\t\t\t\t\t<h4>Equipes</h4>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbMembresEquipe\" class=\"col-md-3 col-lg-2 control-label\">Taille maximale \u00E9quipe</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"number\" placeholder=\"Taille maximale \u00E9quipe\" id=\"ruleNbMembresEquipe\" name=\"ruleNbMembresEquipe\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbMembresEquipe\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t<label for=\"ruleNbMembresRetenu\" class=\"col-md-3 col-lg-2 control-label\">Nombre de co\u00E9quipier comptant pour le classement</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-md-9 col-lg-10\"><input type=\"number\" placeholder=\"Nombre de co\u00E9quipier comptant pour le classement\" id=\"ruleNbMembresRetenu\" name=\"ruleNbMembresRetenu\" class=\"form-control\" [attr.disabled]=\"rule.officialReglement ? 'disabled' : null\" [(ngModel)]=\"rule.nbMembresRetenu\"/></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div id=\"distancesAndFaces\" class=\"tab-pane\" [class.active]=\"activePane=='distancesAndFaces'\">\n\t\t\t\t\t\t\t<distances-faces [(distancesAndFacesSet)]=\"rule.distancesAndFaces\" [nbSerie]=\"rule.nbSerie\"></distances-faces>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div id=\"ranking\" class=\"tab-pane\" [class.active]=\"activePane=='ranking'\">\n\t\t\t\t\t\t\t<ranking [(rankingCriteria)]=\"rule.rankingCriteria\" [distancesAndFacesSet]=\"rule.distancesAndFaces\" [idFederation]=\"rule.idEntite\"></ranking>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"error\">\n\t\t\t\t{{error}}\n\t\t\t\t</div>\n\n\t\t\t\t<button class=\"btn btn-primary pull-right\" type=\"button\" (click)=\"cancel()\">Annuler</button>\n\t\t\t\t<button class=\"btn btn-success pull-right\" style=\"margin-right: 5px;\" type=\"button\" (click)=\"validate()\">Valider</button>\n\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
                    }),
                    __metadata("design:paramtypes", [router_1.ActivatedRoute,
                        router_1.Router,
                        general_1.NavigatorService,
                        references_service_1.ReferencesService,
                        rules_service_1.RulesService,
                        entites_service_1.EntitesService])
                ], RuleComponent);
                return RuleComponent;
            }());
            exports_1("RuleComponent", RuleComponent);
        }
    };
});

//# sourceMappingURL=rule.component.js.map
