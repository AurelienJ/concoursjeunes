App.controller("PersonController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 'Restangular',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, Restangular) {
		Restangular.one("contacts", $routeParams.id).get().then(function(contact) {
			$scope.person = contact;
			$rootScope.breadcrumb.push({
				path: "persons/" + $routeParams.id,
				name: contact.name + " " +contact.firstName
			});
		});
		
		Restangular.all("civilities").getList().then(function(civilities) {
			$scope.civilities = civilities;
		})
		
		Restangular.all("countries").getList().then(function(countries) {
			$scope.countries = countries;
		})
		
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			if(previous)
				$location.path(previous.path);
		};
		
		$scope.valid = function() {
			$scope.person.save();
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			if(previous)
				$location.path(previous.path);
		};
	}
]);