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
	mainTemplate.getBlocs().get("script").loadTemplate(basePath + "/templates/parameters/scriptsSection.thtml");
	mainTemplate.getBlocs().get("main").loadTemplate(basePath + "/templates/parameters/general.thtml");
}

function showDisplay(template) {
	var mainBloc = template.getBlocs().get("main");
	mainBloc.loadTemplate(basePath + "/templates/parameters/display.thtml");
	
	var libelleLangues = org.ajdeveloppement.concours.Configuration.getAvailableLanguages();
	for(var libelle in libelleLangues) {
		mainBloc.parse("locale.langCode", libelle);
		mainBloc.parse("locale.langLabel", libelleLangues[libelle]);
		
		mainBloc.loopBloc("locale");
	}
}

function showRates(template) {
	var mainBloc = template.getBlocs().get("main");
	mainBloc.loadTemplate(basePath + "/templates/parameters/rates.thtml");
}

function init(basePath) {
	this.basePath = basePath;
	
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
	mainTemplate.parse("FILARIANNE", "Parametrage");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath);
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	if(session.getRequestUri().equals("/display.html")) {
		showDisplay(template);
	} else if(session.getRequestUri().equals("/rates.html")) {
		showRates(template);
	}
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}