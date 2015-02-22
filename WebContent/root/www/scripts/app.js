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
	}).when('/entities', {
		templateUrl : 'partials/entities/searchEntities.html',
		controller : 'EntitiesController'
	}).when('/entities/:id', {
		templateUrl : 'partials/entities/entity.html',
		controller : 'EntityController'
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

/** 
 * Controlleurs
 */
App.controller("ParametersController", [ '$scope', '$rootScope', '$routeParams', 'Profile', 'Contact', 'Entity', 'EntitySelector', 
	function($scope, $rootScope, $routeParams, Profile, Contact, Entity, EntitySelector) {
		$rootScope.pageTitle = "Paramètres";

		if ($routeParams.subscreen)
			$scope.subscreen = $routeParams.subscreen;
		else
			$scope.subscreen = "general";
		
		$scope.profile = Profile.get({ id: idDefaultProfile }, function() {
			if($scope.profile.idEntite && (!EntitySelector.getSelectedEntity() || EntitySelector.getSelectedEntity() != $scope.profile.idEntite)) {
				if(!EntitySelector.getSelectedEntity()) {
					$scope.entity = Entity.get({id: $scope.profile.idEntite});
					EntitySelector.setSelectedEntity($scope.profile.idEntite);
				} else {
					$scope.entity = Entity.get({id: EntitySelector.getSelectedEntity()});
					$scope.profile.idEntite = EntitySelector.getSelectedEntity();
				}
			} else if(EntitySelector.getSelectedEntity()) {
				$scope.entity =	Entity.get({id: EntitySelector.getSelectedEntity()});
				$scope.profile.idEntite = EntitySelector.getSelectedEntity();
			}
		});
		
		$scope.contact = Contact.get({ id: idDefaultContact });
		
		if ($scope.subscreen == "display") {
			$scope.langs = [ {
				code : "fr",
				label : "français"
			}, {
				code : "en",
				label : "english"
			} ];
			//$scope.selectedLang = $scope.langs[0];
		}
		
		$scope.valid = function() {
			$scope.profile.$update();
			
			return false;
		}
	}
]);

App.controller("EntitiesController", [
		'$scope',
		'$rootScope',
		'$routeParams',
		'$compile',
		'DTOptionsBuilder',
		'DTColumnBuilder',
		'DTColumnDefBuilder',
		'EntitySelector',
		function($scope, $rootScope, $routeParams,
				$compile, DTOptionsBuilder, DTColumnBuilder,
				DTColumnDefBuilder, EntitySelector) {
			$rootScope.pageTitle = "Entités";
		
			var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';
			
			$scope.dtOptions = {
					serverSide : true,
					sAjaxDataProp : 'data',
					ajax : '/api/entities',
					dom : '<"' + toolbar_prefix
							+ 'tl ui-corner-tr"lr>' + 't' + '<"'
							+ toolbar_prefix
							+ 'bl ui-corner-br"ip>',
					language : {
						lengthMenu : "Afficher _MENU_ entités par page",
						zeroRecords : "Aucun enregistrement trouvé",
						info : "Affichage des entités de _START_ à _END_ sur _TOTAL_",
						infoEmpty : "Aucun enregistrement trouvé",
						infoFiltered : "(filtré sur un total de _MAX_ entités)",
						paginate : {
							"first" : "Premier",
							"last" : "Dernier",
							"next" : "Suivant",
							"previous" : "Précédent"
						}
					},
					createdRow: function(row, data, dataIndex) {
			            // Recompiling so we can bind Angular directive to the DT
			            $compile(angular.element(row).contents())($scope);
			        }
				};
		
			$scope.dtColumns = [
					DTColumnBuilder.newColumn('nom', 'Nom'),
					DTColumnBuilder.newColumn('ville', 'Ville'),
					DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
			            .renderWith(function(data, type, full, meta) {
			                return '<a href="#/entities/' + data.idEntite + '"><img src="images/edit.png" class="action-button" title="editer"/></a>'
			                	+ '<a href="#/parameters" ng-click="select(\'' + data.idEntite + '\')"><img src="images/forward.png" class="action-button" title="Séléctionner" /></a>'
			                	+ (data.removable ? '<a href="#"><img src="images/del.png" ng-click="deleteEntity(\'' + data.idEntite + '\')" class="action-button" title="supprimer"/></a>' : '');
			            })
			            ];
		
			$scope.dtColumnDefs = [ 
				DTColumnDefBuilder.newColumnDef(0).renderWith(function(data, type, row) {
					return data + (row.reference != "" ? " (" + row.reference + ")" : "");
				})
			];

			var table = null;
			
			//entitiesTable.row(this).data()
			
			$scope.select = function(idEntity) {
				EntitySelector.setSelectedEntity(idEntity);
			};
			
			$scope.deleteEntity = function(idEntite) {
				
			};
			
			$scope.searchChange = function() {
				table.search($scope.entitiesSearchPattern).draw();
			};
			
			$scope.$on('event:dataTableLoaded', function(event, loadedDT) {
			    // loadedDT === {"id": "foobar", "DataTable": oTable, "dataTable": $oTable}
				
				table = loadedDT.DataTable;

			    // loadedDT.DataTable is the DataTable API instance
			    // loadedDT.dataTable is the jQuery Object
			    // See http://datatables.net/manual/api#Accessing-the-API
			});
			
			$rootScope.breadcrumb = [];
			
			$rootScope.breadcrumb.push({
				path: "entities",
				name: 'Entités'
			});
			
			
		}
]);

App.controller("EntityController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 'Entity',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, Entity) {
		$scope.entity = Entity.get({id: $routeParams.id });
		
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.valid = function() {
			$scope.entity.$update({id: $routeParams.id });
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.entity.$promise.then(function(entity) {
			$rootScope.breadcrumb.push({
				path: "entities/" + $routeParams.id,
				name: entity.nom
			});
		});
	}
]);

/** 
 * Services
 */

var Services = angular.module('ArcCompetitionServices', ['ngResource']);

Services.factory('Entity', ['$resource', function($resource) {
	return $resource("/api/entities/:id", {}, {
		query: {method: 'GET', isArray: true},
		update: {method: 'PUT'}
	});
}]);

Services.service('EntitySelector', function() {
	var selectedEntity = null;
	
	return {
		getSelectedEntity: function() { return selectedEntity; },
		setSelectedEntity: function(entity) { selectedEntity = entity; }
	}
});

Services.factory('Profile', ['$resource', function($resource) {
	return $resource("/api/profiles/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.factory("Contact", ['$resource', function($resource) {
return $resource("/api/contacts/:id", {}, {
		
	});
}]);