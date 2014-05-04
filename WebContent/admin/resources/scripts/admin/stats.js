loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
/**
 * 
 */
var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");
var QResults = Java.type("org.ajdeveloppement.commons.persistence.sql.QResults");
var QField = Java.type("org.ajdeveloppement.commons.persistence.sql.QField");
var HttpSession = Java.type("org.ajdeveloppement.webserver.HttpSession");
var T_Request = Java.type("org.ajdeveloppement.webserver.data.T_Request");
var JavaString = Java.type("java.lang.String");
var JavaStringArray = Java.type("java.lang.String[]");
var Pattern = Java.type("java.util.regex.Pattern");
var Date = Java.type("java.util.Date");
var LocalDateTime = Java.type("java.time.LocalDateTime");
var ZoneOffset = Java.type("java.time.ZoneOffset");

var mainTemplate = null;

function loadNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "");
	template.parse("selectedDocumentation", "");
	template.parse("selectedAdmin", "class=\"selected\"");
}

function loadAdminNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/admin/navigation.thtml");
	template.parse("selectedInfos", "");
	template.parse("selectedLogs", "");
	template.parse("selectedStats", "class=\"selected\"");
	template.parse("selectedBrowser", "");
}

function loadMainContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/admin/stats.thtml");
	
	loadAdminNavigationContent(basePath, template.getBlocs().get("navigation"));
}

function getGlobalMonthStats() {
	var dateField = QField.custom("CONCAT(YEAR(AJWEBSERVER.Request.Date),'-',MONTH(AJWEBSERVER.Request.Date),'-',DAY(AJWEBSERVER.Request.Date))");
	var requetesJournaliere = QResults.from(org.ajdeveloppement.webserver.data.Request.class)
		.where(T_Request.DATE.upperThan(Date.from(LocalDateTime.now().minusDays(30).toInstant(ZoneOffset.UTC))))
		.groupBy(dateField)
		.orderBy(dateField)
		.select(dateField.alias("Jour"), 
				QField.custom("count(*)").alias("Hits"),
				QField.custom("count(distinct AJWEBSERVER.Request.REMOTEADDRESS)").alias("Visitors"),
				QField.custom("count(distinct AJWEBSERVER.Request.URI)").alias("Pages"));
	return requetesJournaliere;
}

function init(basePath) {
	mainTemplate = new AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
	mainTemplate.parse("FILARIANNE", "<a href=\"tools.html\">Outils</a> &gt; Administration");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath, mainTemplate.getBlocs().get("main"));
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	var mainBloc = template.getBlocs().get("main");
	
	var requetesJournaliere = getGlobalMonthStats();
	
	for each (var stat in requetesJournaliere) {
		mainBloc.parse("statEntry.date", stat.get("Jour"));
		mainBloc.parse("statEntry.NbRequete", stat.get("Hits"));
		mainBloc.parse("statEntry.visitors", stat.get("Visitors"));
		mainBloc.parse("statEntry.pages", stat.get("Pages"));
		
		mainBloc.loopBloc("statEntry");
	}
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}
