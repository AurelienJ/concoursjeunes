/**
 * 
 */
var App = angular.module('ArcCompetitionApp', ['ngRoute', 'datatables', 'ArcCompetitionServices', 'restangular' ]);

//var idDefaultProfile = "523151e7-56c0-4433-a60f-12accfdb43b2";
var idDefaultProfile = "e24eb0bf-35d0-4828-b8de-c6987fae2eea";
//var idDefaultContact = "0da8eec4-91dd-4554-a92e-ddfcde6f50b8";
var idDefaultContact = "4eddf604-08b5-4ca4-8fd0-821919924817";

/** 
 * ROUTES
 */
App.config([ '$routeProvider','RestangularProvider', function($routeProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('/api');
	
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
	}).when('/rules/:id', {
		templateUrl : 'partials/rules/rule.html',
		controller : 'RuleController'
	}).otherwise({
		redirectTo : '/parameters'
	});
} ]);

/**
 * Global Events
 */
App.run(['$rootScope', '$location', 'Authenticate', 'Restangular', function ($rootScope, $location, Authenticate, Restangular) {
	
	//Restangular.setBaseUrl(BaseUrlCalculator.calculate());

    var history = [];
    
    Authenticate.save({idpToken: idDefaultContact});

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

    $rootScope.breadcrumb = [];
}]);