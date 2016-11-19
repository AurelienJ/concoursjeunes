///<reference path="_references.ts"/>
import { ParametersComponent } from './components/parameters';
import { EntitesComponent } from './components/entites';
import { EntiteComponent } from './components/entite';
import { PersonsComponent } from './components/persons';
import { PersonComponent } from './components/person';
import { RulesComponent } from './components/rules';
import { RuleComponent } from './components/rule';
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
    { path: 'rules/:id', component: RuleComponent }
    //{ path: 'authToken/:token', component: LoginComponent},
    //{ path: 'user',component: UserComponent}
]