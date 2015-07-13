App.controller("ParametersController", [ '$scope', '$rootScope', '$routeParams', 'Restangular', 'EntitySelector', 
	function($scope, $rootScope, $routeParams, Restangular, EntitySelector) {
		$rootScope.pageTitle = "Paramètres";

		if ($routeParams.subscreen)
			$scope.subscreen = $routeParams.subscreen;
		else
			$scope.subscreen = "general";
		
		 Restangular.one('profiles', idDefaultProfile).get().then(function(profile) {
			$scope.profile = profile;
			
			if(profile.idEntite && (!EntitySelector.getSelectedEntity() || EntitySelector.getSelectedEntity() != profile.idEntite)) {
				if(!EntitySelector.getSelectedEntity()) {
					Restangular.one('entities', profile.idEntite).get().then(function(entity) {
						 $scope.entity = entity;
					});
					EntitySelector.setSelectedEntity(profile.idEntite);
				} else {
					Restangular.one('entities', EntitySelector.getSelectedEntity()).get().then(function(entity) {
						 $scope.entity = entity;
					});
					$scope.profile.idEntite = EntitySelector.getSelectedEntity();
				}
			} else if(EntitySelector.getSelectedEntity()) {
				Restangular.one('entities', EntitySelector.getSelectedEntity()).get().then(function(entity) {
					 $scope.entity = entity;
				});
				$scope.profile.idEntite = EntitySelector.getSelectedEntity();
			}
		});
		
		Restangular.one('contacts', idDefaultContact).get().then(function(contact) {
			 $scope.contact = contact;
		});
		
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
			$scope.profile.save();
			
			return false;
		}
	}
]);