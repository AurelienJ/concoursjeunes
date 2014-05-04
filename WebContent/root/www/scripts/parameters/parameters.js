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

$(document).ready(function() {
	$('#upload').change(function() {
		var oFReader = new window.FileReader();
	    oFReader.readAsDataURL(document.getElementById("upload").files[0]);
	
	    oFReader.onload = function (oFREvent) {
	        document.getElementById("logo").src = oFREvent.target.result;
	    };
	});
});