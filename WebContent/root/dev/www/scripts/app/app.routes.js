"use strict";
///<reference path="_references.ts"/>
var parameters_1 = require('./components/parameters');
var entites_1 = require('./components/entites');
var entite_1 = require('./components/entite');
//import { UserComponent } from './user.component';
exports.AppRoutes = [
    { path: '', component: parameters_1.ParametersComponent },
    { path: 'entities', component: entites_1.EntitesComponent },
    { path: 'entities/:id', component: entite_1.EntiteComponent }
];

//# sourceMappingURL=app.routes.js.map
