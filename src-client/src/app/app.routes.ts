import { Route } from "@angular/router";
import { LoginComponent } from "./account/login.component";
import { RegisterComponent } from "./account/register.component";

import { SecureAccessService } from "./account/secureaccess.service";

import { MainComponent } from "./general/main.component";

import { ParametersComponent } from './parameters/parameters.component';

import { EntitesComponent } from './entites/entites.component';
import { EntiteComponent } from './entites/entite.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person.component';
import { RulesComponent } from './rules/rules.component';
import { RuleComponent } from './rules/rule.component';

import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionComponent } from './competitions/competition.component';
//import { UserComponent } from './user.component';

export const AppRoutes : Route[] = [
    {
        path: '',
        component: MainComponent,
        canActivate: [SecureAccessService],
        children: [
            { path: '*', redirectTo: 'dashboard'},
            { path: 'dashboard', component: CompetitionsComponent },
            { path: 'entities', component: EntitesComponent },
            { path: 'federations', component: EntitesComponent },
            { path: 'clubs', component: EntitesComponent },
            { path: 'newentity', component: EntiteComponent },
            { path: 'entities/:id', component: EntiteComponent },
            { path: 'persons', component: PersonsComponent },
            { path: 'persons/:id', component: PersonComponent },
            { path: 'account', component: PersonComponent },
            { path: 'rules', component: RulesComponent },
            { path: 'rules/:id', component: RuleComponent },
            { path: 'competitions', component: CompetitionsComponent },
            { path: 'competitions/:id', component: CompetitionComponent },
            { path: 'concurrents', component: PersonsComponent },
        ]
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'register', 
        component: RegisterComponent
    }
    //{ path: 'authToken/:token', component: LoginComponent},
    //{ path: 'user',component: UserComponent}
]