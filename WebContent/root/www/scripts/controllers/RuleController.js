App.controller("RuleController", ['$scope', '$rootScope', '$route', '$routeParams','$compile','$http', '$location', 
                                  'Rules','RulesCategories','AvailableEntitiesForRulesCreation',
	function($scope, $rootScope, $route, $routeParams, $compile, $http, $location, 
			Rules, RulesCategories, AvailableEntitiesForRulesCreation) {
		if($routeParams.id != "add") {
			$scope.rule = Rules.get({id: $routeParams.id });
			$scope.rule.$promise.then(function(rule) {
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
		$scope.entities = AvailableEntitiesForRulesCreation.query();
		$scope.categories = RulesCategories.query();
			
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