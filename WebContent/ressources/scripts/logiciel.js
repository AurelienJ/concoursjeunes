loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
loadScript("scripts/common/Authenticator.js");
//load("WebContent/ressources/scripts/common/ResponseFormatter.js");
//load("WebContent/ressources/scripts/common/Sessions.js");
//load("WebContent/ressources/scripts/common/Authenticator.js");

/**
 * 
 */
function loadNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "class=\"selected\"");
	template.parse("selectedDocumentation", "");
}

function getMainContent(basePath) {
	var template = new org.ajdeveloppement.commons.AJTemplate();
	template.loadTemplate(basePath + "/templates/logiciel.thtml");
	
	return template.output();
}

var mainTemplate = null;

function init(basePath) {
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","Présentation ArcCompetition");
	mainTemplate.parse("FILARIANNE", "<a href=\"logiciel.html\">Logiciel</a> &gt; Présentation");
	
	mainTemplate.parseBloc("head", "<link href=\"styles/softwarepresentation.css\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\" />");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	mainTemplate.parseBloc("main",getMainContent(basePath));
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