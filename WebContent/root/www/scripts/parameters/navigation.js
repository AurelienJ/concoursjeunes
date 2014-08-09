var parametersData = { };

$.ajax({
	dataType: "json",
	url: "/api",
	data: { key: "profiles" },
	async: false,
	success: function(data) {
		if(data.length == 1) {
			parametersData.profile = data[0];
		}
	}
});

$("#parameters\\.general\\.menu").addClass("selected");
loadContent("parameters.general", "#parametersContent");

$("#parameters\\.general\\.menu a").click(function(e) {
	$("#parametersMainMenu li").removeClass("selected");
	$("#parameters\\.general\\.menu").addClass("selected");
	loadContent("parameters.general", "#parametersContent");
	
	return false;
});

$("#parameters\\.display\\.menu a").click(function(e) {
	$("#parametersMainMenu li").removeClass("selected");
	$("#parameters\\.display\\.menu").addClass("selected");
	loadContent("parameters.display", "#parametersContent");
	
	return false;
});

$("#parameters\\.rates\\.menu a").click(function(e) {
	$("#parametersMainMenu li").removeClass("selected");
	$("#parameters\\.rates\\.menu").addClass("selected");
	loadContent("parameters.rates", "#parametersContent");
	
	return false;
});

$("#parameters\\.editons\\.menu a").click(function(e) {
	$("#parametersMainMenu li").removeClass("selected");
	$("#parameters\\.editons\\.menu").addClass("selected");
	loadContent("parameters.editons", "#parametersContent");
	
	return false;
});

$("#parametersValid").click(function(e) {
	if(parametersData.profile != undefined && parametersData.profile != null) {
		$.getJSON(
			"/api",
			{
				key: "addEntityToProfile",
				idProfile: parametersData.profile.id,
				idEntite: parametersData.profile.entite.idEntite
			},
			function(data) {
				if(data.success) {
					alert("ok");
				}
			});
	}
	return false;
});