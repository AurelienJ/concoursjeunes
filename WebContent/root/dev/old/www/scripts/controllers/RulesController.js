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