//load("WebContent/ressources/scripts/common/ResponseFormatter.js");
//load("WebContent/ressources/scripts/common/Sessions.js");
//load("WebContent/ressources/scripts/common/Authenticator.js");
loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
loadScript("scripts/common/Authenticator.js");
/**
 * 
 */
function getNavigationContent(basePath) {
	var template = new org.ajdeveloppement.commons.AJTemplate();
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "class=\"selected\"");
	template.parse("selectedLogiciel", "");
	template.parse("selectedDocumentation", "");
	
	return template.output();
}

function getMainContent() {
	return competitionTemplate.output();
}

var mainTemplate = null;
var competitionTemplate = null;

function init(basePath) {
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","Suivre les compétitions");
	mainTemplate.parse("FILARIANNE", "<a href=\"logiciel.html\">Compétitions</a> &gt; Ma Région");
	
	mainTemplate.parseBloc("head", "<link href=\"styles/competitions.css\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\" />");
	mainTemplate.parseBloc("navigation",getNavigationContent(basePath));
	
	competitionTemplate = mainTemplate.getBlocs().get("main");
	competitionTemplate.loadTemplate(basePath + "/templates/competition.thtml");
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	var auth = new Authenticator(session);
	var user = auth.getLoggedUser();
	if(user != null) {
		template.parseBloc("auth", "<span style=\"color:white;\">" +  user.getLogin() + "</span>");
	}
	
	var response = ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
	auth.getAppSession().addCookieHeader(response);
	
	return response;
}