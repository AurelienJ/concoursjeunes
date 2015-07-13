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