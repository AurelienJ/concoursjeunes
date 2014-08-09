/**
 * 
 */
var searchEntitiesState = {
		selectedRow: null
}

$("#entitiesSelect").click(function(e) {
	if(pageContext["listEntities"].origin == "parameters") {
		loadContent("parameters","#main", {
			origin: "listEntities",
			action: "select",
			data: searchEntitiesState.selectedRow
		});
	}
	
	return false;
});

$("#entitiesCancel").click(function(e) {
	loadContent("parameters","#main");
	return false;
});

var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';
if ($.fn.dataTable.isDataTable( '#entitiesResultsTable' ) )
	$("#entitiesResultsTable").DataTable().destroy();
	
var entitiesTable = $("#entitiesResultsTable").DataTable({
	serverSide: true,
	ajax: '/api?key=searchEntities',
	columns: [
	          { data: 'nom' },
	          { data: 'ville' }
	      ],
	columnDefs: [
	         {
                 // The `data` parameter refers to the data for the cell (defined by the
                 // `data` option, which defaults to the column being worked with, in
                 // this case `data: 0`.
                 "render": function ( data, type, row ) {
                     return data + (row.reference != "" ? " (" + row.reference + ")" : "") ;
                 },
                 "targets": 0
             }
         ],
	/*dom: "lrtip",*/
	dom: '<"'+toolbar_prefix+'tl ui-corner-tr"lr>'
			+ 't'
			+ '<"'+toolbar_prefix+'bl ui-corner-br"ip>',
	language: {
        lengthMenu: "Afficher _MENU_ entités par page",
        zeroRecords: "Aucun enregistrement trouvé",
        info: "Affichage des entités de _START_ à _END_ sur _TOTAL_",
        infoEmpty: "Aucun enregistrement trouvé",
        infoFiltered: "(filtré sur un total de _MAX_ entités)",
        "paginate": {
            "first":      "Premier",
            "last":       "Dernier",
            "next":       "Suivant",
            "previous":   "Précédent"
        },
    }
});

$('#entitiesResultsTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        searchEntitiesState.selectedRow = null;
    } else {
    	entitiesTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        
        searchEntitiesState.selectedRow = entitiesTable.row(this).data();
    }
} );

$("#entitiesSearchInput").on("input", function(){
	entitiesTable.search( $(this).val() ).draw();
});