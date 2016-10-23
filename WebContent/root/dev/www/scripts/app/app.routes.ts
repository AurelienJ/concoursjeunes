///<reference path="_references.ts"/>
import { ParametersComponent } from './components/parameters';
import { EntitesComponent } from './components/entites';
import { EntiteComponent } from './components/entite';
//import { UserComponent } from './user.component';

export const AppRoutes = [
    { path: '', component: ParametersComponent},
    { path: 'entities', component: EntitesComponent },
    { path: 'entities/:id', component: EntiteComponent }
    //{ path: 'authToken/:token', component: LoginComponent},
    //{ path: 'user',component: UserComponent}
]