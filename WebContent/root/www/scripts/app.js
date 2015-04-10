/**
 * 
 */
var App = angular.module('ArcCompetitionApp', ['ngRoute', 'datatables', 'ArcCompetitionServices' ]);

var idDefaultProfile = "523151e7-56c0-4433-a60f-12accfdb43b2"; 
var idDefaultContact = "0da8eec4-91dd-4554-a92e-ddfcde6f50b8";

/** 
 * ROUTES
 */
App.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/parameters', {
		templateUrl : 'partials/parameters/parameters.html',
		controller : 'ParametersController'
	}).when('/parameters/:subscreen', {
		templateUrl : 'partials/parameters/parameters.html',
		controller : 'ParametersController'
	}).when('/persons', {
		templateUrl : 'partials/persons/persons.html',
		controller : 'PersonsController'
	}).when('/persons/:id', {
		templateUrl : 'partials/persons/person.html',
		controller : 'PersonController'
	}).when('/entities', {
		templateUrl : 'partials/entities/searchEntities.html',
		controller : 'EntitiesController'
	}).when('/entities/:id', {
		templateUrl : 'partials/entities/entity.html',
		controller : 'EntityController'
	}).when('/rules', {
		templateUrl : 'partials/rules/rules.html',
		controller : 'RulesController'
	}).otherwise({
		redirectTo : '/parameters'
	});
} ]);

/**
 * Global Events
 */
App.run(function ($rootScope, $location) {

    var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

    $rootScope.breadcrumb = [];
});