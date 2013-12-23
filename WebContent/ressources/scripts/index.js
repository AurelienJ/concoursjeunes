loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
loadScript("scripts/common/database/database.js");

function openDatabase(basePath) {
	var database = new Database();
	database.connectionString = "jdbc:h2:" + basePath + "/arccompetition";
	database.user = "sa";
	database.password = "";

	return database.connect();
}

function loadNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "");
	template.parse("selectedDocumentation", "");
}

function loadMainContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/parameters.thtml");
}

var mainTemplate = null;

function init(basePath) {
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
	mainTemplate.parse("FILARIANNE", "Accueil");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath, mainTemplate.getBlocs().get("main"));
}

function getPage(session) {
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, mainTemplate.output());
}