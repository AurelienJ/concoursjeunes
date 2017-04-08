///<reference path="_references.ts"/>
import { ParametersComponent } from './parameters/parameters.component';

import { EntitesComponent } from './entites/entites.component';
import { EntiteComponent } from './entites/entite.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person.component';
import { RulesComponent } from './rules/rules.component';
import { RuleComponent } from './rules/rule.component';

import { CompetitionsComponent } from './competitions/competitions.component';
//import { UserComponent } from './user.component';

export const AppRoutes = [
    { path: '', component: ParametersComponent},
    { path: 'entities', component: EntitesComponent },
    { path: 'federations', component: EntitesComponent },
    { path: 'clubs', component: EntitesComponent },
    { path: 'newentity', component: EntiteComponent },
    { path: 'entities/:id', component: EntiteComponent },
    { path: 'persons', component: PersonsComponent },
    { path: 'persons/:id', component: PersonComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'rules/:id', component: RuleComponent },
    { path: 'competitions', component: CompetitionsComponent },
	{ path: 'dashboard', component: CompetitionsComponent }
    //{ path: 'authToken/:token', component: LoginComponent},
    //{ path: 'user',component: UserComponent}
]