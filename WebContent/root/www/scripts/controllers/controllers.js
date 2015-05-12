/** 
 * Controlleurs
 */
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
					ajax : '/api/entitiesDataTable',
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
			                return '<a href="#/entities/' + data.id + '"><img src="images/edit.png" class="action-button" title="editer"/></a>'
			                	+ '<a href="#/parameters" ng-click="select(\'' + data.id + '\')"><img src="images/forward.png" class="action-button" title="Séléctionner" /></a>'
			                	+ (data.removable ? '<a href="#"><img src="images/del.png" ng-click="deleteEntity(\'' + data.id + '\')" class="action-button" title="supprimer"/></a>' : '');
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

App.controller("PersonsController", [
	'$scope',
	'$rootScope',
	'$routeParams',
	'$compile',
	'DTOptionsBuilder',
	'DTColumnBuilder',
	'DTColumnDefBuilder',
	'ContactSelector',
	function($scope, $rootScope, $routeParams,
			$compile, DTOptionsBuilder, DTColumnBuilder,
			DTColumnDefBuilder, ContactSelector) {
		$rootScope.pageTitle = "Personnes";
	
		var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';
		
		$scope.dtOptions = {
				serverSide : true,
				sAjaxDataProp : 'data',
				ajax : '/api/contactsDataTable',
				dom : '<"' + toolbar_prefix
						+ 'tl ui-corner-tr"lr>' + 't' + '<"'
						+ toolbar_prefix
						+ 'bl ui-corner-br"ip>',
				language : {
					lengthMenu : "Afficher _MENU_ personnes par page",
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
				DTColumnBuilder.newColumn('name', 'Nom'),
				DTColumnBuilder.newColumn('city', 'Ville'),
				DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
		            .renderWith(function(data, type, full, meta) {
		                return '<a href="#/persons/' + data.idContact + '"><img src="images/edit.png" class="action-button" title="editer"/></a>'
		                	+ '<a href="#/parameters" ng-click="select(\'' + data.idContact + '\')"><img src="images/forward.png" class="action-button" title="Séléctionner" /></a>'
		                	+ (data.removable ? '<a href="#"><img src="images/del.png" ng-click="deleteContact(\'' + data.idContact + '\')" class="action-button" title="supprimer"/></a>' : '');
		            })
		            ];
	
		$scope.dtColumnDefs = [ 
			DTColumnDefBuilder.newColumnDef(0).renderWith(function(data, type, row) {
				return data + (row.firstName != "" ? " " + row.firstName : "");
			})
		];

		var table = null;
		
		//entitiesTable.row(this).data()
		
		$scope.select = function(idContact) {
			ContactSelector.setSelectedContact(idContact);
		};
		
		$scope.deleteContact = function(idContact) {
			
		};
		
		$scope.searchChange = function() {
			table.search($scope.personsSearchPattern).draw();
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
			path: "persons",
			name: 'Contact'
  			});
  			
  			
  		}
  ]);

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

App.controller("RulesController", [
 	'$scope',
 	'$rootScope',
 	'$routeParams',
 	'$compile',
 	'DTOptionsBuilder',
 	'DTColumnBuilder',
 	'DTColumnDefBuilder',
 	function($scope, $rootScope, $routeParams,
 			$compile, DTOptionsBuilder, DTColumnBuilder,
 			DTColumnDefBuilder) {
 		$rootScope.pageTitle = "Reglements";
 	
 		var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';
 		
 		$scope.dtOptions = {
 				serverSide : true,
 				sAjaxDataProp : 'data',
 				ajax : '/api/rulesDataTable',
 				dom : '<"' + toolbar_prefix
 						+ 'tl ui-corner-tr"lr>' + 't' + '<"'
 						+ toolbar_prefix
 						+ 'bl ui-corner-br"ip>',
 				language : {
 					lengthMenu : "Afficher _MENU_ personnes par page",
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
 				DTColumnBuilder.newColumn('name', 'Nom'),
 				DTColumnBuilder.newColumn('libelleCategorie', 'Catégorie'),
 				DTColumnBuilder.newColumn('libelleEntite', 'Entité'),
 				DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
 		            .renderWith(function(data, type, full, meta) {
 		                return '<a href="#/rules/' + data.idRule + '"><img src="images/edit.png" class="action-button" title="editer"/></a>'
 		                	+ '<a href="#/parameters" ng-click="select(\'' + data.idRule + '\')"><img src="images/forward.png" class="action-button" title="Séléctionner" /></a>'
 		                	+ (data.removable ? '<a href="#"><img src="images/del.png" ng-click="deleteContact(\'' + data.idRule + '\')" class="action-button" title="supprimer"/></a>' : '');
 		            })
 		            ];
 	
 		/*$scope.dtColumnDefs = [ 
 			DTColumnDefBuilder.newColumnDef(0).renderWith(function(data, type, row) {
 				return data + (row.firstName != "" ? " " + row.firstName : "");
 			})
 		];*/

 		var table = null;
 		
 		//entitiesTable.row(this).data()
 		
 		$scope.select = function(idContact) {
 			
 		};
 		
 		$scope.deleteContact = function(idContact) {
 			
 		};
 		
 		$scope.searchChange = function() {
 			table.search($scope.rulesSearchPattern).draw();
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
	 			path: "rules",
	 			name: 'Réglements'
   			});
   		}
   ]);

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