App.controller("EntityController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 'Restangular',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, Restangular) {
		Restangular.one("entities", $routeParams.id).get().then(function(entity) {
			 $scope.entity = entity;
			 
			 $rootScope.breadcrumb.push({
					path: "entities/" + $routeParams.id,
					name: entity.nom
				});
		});
		
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.valid = function() {
			$scope.entity.id = $routeParams.id;
			$scope.entity.save();
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
	}
]);