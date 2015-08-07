App.controller("CompetitionController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 'Restangular',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, Restangular) {
		if($routeParams.id && $routeParams.id != 'new') {
			Restangular.one("competitions", $routeParams.id).get().then(function(entity) {
				 $scope.competition = entity;
				 
				 $rootScope.breadcrumb.push({
						path: "competitions/" + $routeParams.id,
						name: entity.nom
					});
			});
		} else {
			$rootScope.breadcrumb.push({
				path: "competitions/new",
				name: "Nouvelle competition"
			});
		}
		
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.valid = function() {
			$scope.competition.id = $routeParams.id;
			$scope.competition.save();
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
	}
]);