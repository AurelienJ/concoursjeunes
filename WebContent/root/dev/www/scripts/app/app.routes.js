"use strict";
///<reference path="_references.ts"/>
var parameters_1 = require('./components/parameters');
var entites_1 = require('./components/entites');
var entite_1 = require('./components/entite');
var persons_1 = require('./components/persons');
var person_1 = require('./components/person');
var rules_1 = require('./components/rules');
//import { UserComponent } from './user.component';
exports.AppRoutes = [
    { path: '', component: parameters_1.ParametersComponent },
    { path: 'entities', component: entites_1.EntitesComponent },
    { path: 'federations', component: entites_1.EntitesComponent },
    { path: 'clubs', component: entites_1.EntitesComponent },
    { path: 'newentity', component: entite_1.EntiteComponent },
    { path: 'entities/:id', component: entite_1.EntiteComponent },
    { path: 'persons', component: persons_1.PersonsComponent },
    { path: 'persons/:id', component: person_1.PersonComponent },
    { path: 'rules', component: rules_1.RulesComponent }
];

//# sourceMappingURL=app.routes.js.map
