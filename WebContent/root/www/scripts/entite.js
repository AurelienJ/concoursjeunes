/**
 * 
 */
if(pageContext["entite"].data != undefined) {
	$("#entityName").val(pageContext["entite"].data.nom);
	$("#entityReference").val(pageContext["entite"].data.reference);
	$("#entityFederation").html(pageContext["entite"].data.entiteParent.nom);
}