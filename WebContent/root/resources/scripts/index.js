
register(['/','index.html','/general.html','/display.html','/rates.html','/editions.html'], (function(global) {
	var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");
	var QResults = Java.type("org.ajdeveloppement.commons.persistence.sql.QResults");

	var UserSessionData = Java.type("org.ajdeveloppement.concours.webapi.UserSessionData");

	var Contact = Java.type("org.ajdeveloppement.concours.data.Contact");
	var ManagerProfile = Java.type("org.ajdeveloppement.concours.data.ManagerProfile");
	var T_Contact = Java.type("org.ajdeveloppement.concours.data.T_Contact");
	var T_ManagerProfile = Java.type("org.ajdeveloppement.concours.data.T_ManagerProfile");
	
	var mainTemplate = null;

	function loadNavigationContent(basePath, template) {
		template.loadTemplate(basePath + "/templates/common/navigation.thtml");
		
		template.parse("selectedCompetition", "");
		template.parse("selectedLogiciel", "");
		template.parse("selectedDocumentation", "");
	}

	function init(server) {
		mainTemplate = new AJTemplate();
		mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
		
		mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
		
		loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	}

	function getPage(session) {
		var userSession = new Sessions(session);
		
		var defaultUser = QResults.from(Contact.class)
			.innerJoin(ManagerProfile.class, T_Contact.ID_CONTACT.equalTo(T_ManagerProfile.ID_CONTACT))
			.first();
		var userSessionData = new UserSessionData();
		userSessionData.setSessionUser(defaultUser);
		userSession.putSessionData(userSessionData);
		
		var response = ResponseFormatter.getGzipedResponseForOutputTemplate(session, mainTemplate.output());
		userSession.addCookieHeader(response);
		return response;
	}
	
	return {
		init: init,
		getPage: getPage
	};
})(this));
