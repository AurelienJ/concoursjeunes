loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
loadScript("scripts/common/database/database.js");

var mainTemplate = null;
var basePath = null;

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

function loadMainContent(basePath) {
	//mainTemplate.getBlocs().get("script").loadTemplate(basePath + "/templates/parameters/scriptsSection.thtml");
	mainTemplate.getBlocs().get("main").loadTemplate(basePath + "/templates/tools/tools.thtml");
}


function init(basePath) {
	this.basePath = basePath;
	
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","Outils");
	mainTemplate.parse("FILARIANNE", "Outils");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath);
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}