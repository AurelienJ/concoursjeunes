App.controller("RuleController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 
                                  'Restangular',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, 
			Restangular) {
		if($routeParams.id != "add") {
			Restangular.one("rules", $routeParams.id).get().then(function(rule) {
				$scope.rule = rule;
				
				$rootScope.breadcrumb.push({
					path: "rules/" + $routeParams.id,
					name: rule.name
				});
			});
		} else {
			$rootScope.breadcrumb.push({
				path: "rules/add",
				name: "Nouveau réglement"
			});
		}
		
		Restangular.all("availableEntitiesForRulesCreation").getList().then(function(entities) {
			$scope.entities = entities;
		});
		
		Restangular.all("rulesCategories").getList().then(function(categories) {
			$scope.categories = categories;
		});
			
		$scope.cancel = function() {
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
		$scope.valid = function() {
			if($routeParams.id == "add")
				Rules.save($scope.rule);
			else
				$scope.rule.$update({id: $routeParams.id });
			
			
			$rootScope.breadcrumb.pop();
			var previous = $rootScope.breadcrumb[$rootScope.breadcrumb.length-1];
			$location.path(previous.path);
		};
		
	}
]);