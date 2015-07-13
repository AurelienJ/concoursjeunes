App.controller("PersonController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 'Contact', 'Civility', 'Country',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, Contact, Civility, Country) {
		$scope.person = Contact.get({id: $routeParams.id });
		$scope.civilities = Civility.query();
		$scope.countries = Country.query();
		
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.valid = function() {
			$scope.person.$update({id: $routeParams.id });
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.person.$promise.then(function(contact) {
			$rootScope.breadcrumb.push({
				path: "persons/" + $routeParams.id,
				name: contact.name + " " +contact.firstName
			});
		});
	}
]);