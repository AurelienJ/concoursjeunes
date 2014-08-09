/**
 * permet de rechercher le logo du club
 */
function browseLogoClub() {
	if(window.app != undefined) {
		var fichier = app.SelectFile();
		document.getElementById("logo").src = fichier;
	} else
		$('#upload').click();
};

function applyNavigationData() {
	if(pageContext["parameters"].data != undefined) {
		if(pageContext["parameters"].origin == "listEntities" && pageContext["parameters"].action == "select") {
			$("#parametersGeneralSelectedClub").html(pageContext["parameters"].data.nom);
			if(parametersData.profile == undefined)
				parametersData.profile = {};
			parametersData.profile.entite = pageContext["parameters"].data;
		}
	}
}

$('#upload').change(function() {
	var oFReader = new window.FileReader();
    oFReader.readAsDataURL(document.getElementById("upload").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("logo").src = oFREvent.target.result;
    };
});

$("#parametersGeneralClubChoice").click(function(e) {
	loadContent("listEntities","#main", {
		origin: "parameters",
		navHistory: [
		             { shortTitle: "Paramètres", name: "parameters" }
		             ]
	});
	
	return false;
});

if(parametersData.profile != undefined && parametersData.profile.entite != undefined)
	$("#parametersGeneralSelectedClub").html(parametersData.profile.entite.nom);

applyNavigationData();