/**
 * 
 */
var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");
var QResults = Java.type("org.ajdeveloppement.commons.persistence.sql.QResults");
var HttpSession = Java.type("org.ajdeveloppement.webserver.HttpSession");
var JavaString = Java.type("java.lang.String");
var JavaStringArray = Java.type("java.lang.String[]");
var Pattern = Java.type("java.util.regex.Pattern");

RegExp.quote = function(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

var mainTemplate = null;

function loadNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "");
	template.parse("selectedDocumentation", "");
	template.parse("selectedAdmin", "class=\"selected\"");
}

function loadMainContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/admin/log.thtml");
}

function init(basePath) {
	mainTemplate = new AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
	mainTemplate.parse("FILARIANNE", "Administration");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath, mainTemplate.getBlocs().get("main"));
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	var mainBloc = template.getBlocs().get("main");
	
	var logs = QResults.from(org.ajdeveloppement.webserver.data.Request.class)
		.orderBy(org.ajdeveloppement.webserver.data.T_Request.DATE.toOrderByDesc())
		.limit(100);
	
	for each (var log in logs) {
		mainBloc.parse("logEntry.date", log.getDate());
		mainBloc.parse("logEntry.method", log.getMethod());
		mainBloc.parse("logEntry.uri", log.getUri());
		mainBloc.parse("logEntry.responseCode", log.getResponseCode());
		mainBloc.parse("logEntry.ipAddress", log.getRemoteAddress());
		mainBloc.parse("logEntry.userAgent", log.getUserAgent());
		
		mainBloc.loopBloc("logEntry");
	}
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}
