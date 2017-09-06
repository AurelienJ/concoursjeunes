System.register(["./parameters/parameters.component", "./entites/entites.component", "./entites/entite.component", "./persons/persons.component", "./persons/person.component", "./rules/rules.component", "./rules/rule.component", "./competitions/competitions.component", "./competitions/competition.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var parameters_component_1, entites_component_1, entite_component_1, persons_component_1, person_component_1, rules_component_1, rule_component_1, competitions_component_1, competition_component_1, AppRoutes;
    return {
        setters: [
            function (parameters_component_1_1) {
                parameters_component_1 = parameters_component_1_1;
            },
            function (entites_component_1_1) {
                entites_component_1 = entites_component_1_1;
            },
            function (entite_component_1_1) {
                entite_component_1 = entite_component_1_1;
            },
            function (persons_component_1_1) {
                persons_component_1 = persons_component_1_1;
            },
            function (person_component_1_1) {
                person_component_1 = person_component_1_1;
            },
            function (rules_component_1_1) {
                rules_component_1 = rules_component_1_1;
            },
            function (rule_component_1_1) {
                rule_component_1 = rule_component_1_1;
            },
            function (competitions_component_1_1) {
                competitions_component_1 = competitions_component_1_1;
            },
            function (competition_component_1_1) {
                competition_component_1 = competition_component_1_1;
            }
        ],
        execute: function () {
            //import { UserComponent } from './user.component';
            exports_1("AppRoutes", AppRoutes = [
                { path: '', component: parameters_component_1.ParametersComponent },
                { path: 'entities', component: entites_component_1.EntitesComponent },
                { path: 'federations', component: entites_component_1.EntitesComponent },
                { path: 'clubs', component: entites_component_1.EntitesComponent },
                { path: 'newentity', component: entite_component_1.EntiteComponent },
                { path: 'entities/:id', component: entite_component_1.EntiteComponent },
                { path: 'persons', component: persons_component_1.PersonsComponent },
                { path: 'persons/:id', component: person_component_1.PersonComponent },
                { path: 'rules', component: rules_component_1.RulesComponent },
                { path: 'rules/:id', component: rule_component_1.RuleComponent },
                { path: 'competitions', component: competitions_component_1.CompetitionsComponent },
                { path: 'competitions/:id', component: competition_component_1.CompetitionComponent },
                { path: 'dashboard', component: competitions_component_1.CompetitionsComponent }
                //{ path: 'login',  co }
                //{ path: 'authToken/:token', component: LoginComponent},
                //{ path: 'user',component: UserComponent}
            ]);
        }
    };
});

//# sourceMappingURL=app.routes.js.map
