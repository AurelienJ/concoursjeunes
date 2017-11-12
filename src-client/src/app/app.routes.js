"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./account/login.component");
var register_component_1 = require("./account/register.component");
var secureaccess_service_1 = require("./account/secureaccess.service");
var main_component_1 = require("./general/main.component");
var entites_component_1 = require("./entites/entites.component");
var entite_component_1 = require("./entites/entite.component");
var persons_component_1 = require("./persons/persons.component");
var person_component_1 = require("./persons/person.component");
var rules_component_1 = require("./rules/rules.component");
var rule_component_1 = require("./rules/rule.component");
var competitions_component_1 = require("./competitions/competitions.component");
var competition_component_1 = require("./competitions/competition.component");
//import { UserComponent } from './user.component';
exports.AppRoutes = [
    {
        path: '',
        component: main_component_1.MainComponent,
        canActivate: [secureaccess_service_1.SecureAccessService],
        children: [
            { path: '*', redirectTo: 'dashboard' },
            { path: 'dashboard', component: competitions_component_1.CompetitionsComponent },
            { path: 'entities', component: entites_component_1.EntitesComponent },
            { path: 'federations', component: entites_component_1.EntitesComponent },
            { path: 'clubs', component: entites_component_1.EntitesComponent },
            { path: 'newentity', component: entite_component_1.EntiteComponent },
            { path: 'entities/:id', component: entite_component_1.EntiteComponent },
            { path: 'persons', component: persons_component_1.PersonsComponent },
            { path: 'persons/:id', component: person_component_1.PersonComponent },
            { path: 'account', component: person_component_1.PersonComponent },
            { path: 'rules', component: rules_component_1.RulesComponent },
            { path: 'rules/:id', component: rule_component_1.RuleComponent },
            { path: 'competitions', component: competitions_component_1.CompetitionsComponent },
            { path: 'competitions/:id', component: competition_component_1.CompetitionComponent },
            { path: 'concurrents', component: persons_component_1.PersonsComponent },
        ]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    }
    //{ path: 'authToken/:token', component: LoginComponent},
    //{ path: 'user',component: UserComponent}
];

//# sourceMappingURL=app.routes.js.map
