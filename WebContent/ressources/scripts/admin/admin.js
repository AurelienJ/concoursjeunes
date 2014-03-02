/**
 * 
 */
var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");
var HttpSession = Java.type("org.ajdeveloppement.webserver.HttpSession");
var JsService = Java.type("org.ajdeveloppement.webserver.services.js.JsService");
var FilesService = Java.type("org.ajdeveloppement.webserver.services.files.FilesService");
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
	template.loadTemplate(basePath + "/templates/admin/admin.thtml");
}

function init(basePath) {
	mainTemplate = new AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","Administration");
	mainTemplate.parse("FILARIANNE", "<a href=\"tools.html\">Outils</a> &gt; Administration");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath, mainTemplate.getBlocs().get("main"));
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	var mainBloc = template.getBlocs().get("main");
	mainBloc.parse("DynConfigPath", JsService.getConfigPath().getPath());
	mainBloc.parse("DynContentPath", JsService.getContentPath().getPath());
	
	var services = HttpSession.getRequestProcessor().getServices();
	for(var i = 0; i < services.size(); i++) {
		if(services.get(i) instanceof JsService) {
			var webPages = services.get(i).getWebPageManager().getWebPages().iterator();
			
			while(webPages.hasNext()) {
				var webPage = webPages.next();
				
				var detail = "Uris<br/>" + JavaString.join("<br>", webPage.getUris());
				detail += "<br/>Script:<br/>" + JavaString.join("<br>", webPage.getScripts().stream()
						.map(function(s) {return s.script; })
						.toArray(function(size) { return new JavaStringArray(size); }));
				
				mainBloc.parse("pages.page", webPage.getName());
				mainBloc.parse("pages.detail", detail);
				
				mainBloc.loopBloc("pages");
			}
		}
	}
	
	mainBloc.parse("StaticResourcesPath", FilesService.getBasePath().getPath());
	mainBloc.parse("StaticGzipExt", JavaString.join(", ", FilesService.getAllowedGzipExt()));
	mainBloc.parse("StaticGzipCache", FilesService.getGzipCachePath().getPath());
	
	var rewriteRules = HttpSession.getRewriteUrlRules();
	if(rewriteRules != null) {
		if(rewriteRules.getRewriteUrlPatterns() != null) {
			for(var i = 0; i < rewriteRules.getRewriteUrlPatterns().size(); i++) {
				var urlPattern = rewriteRules.getRewriteUrlPatterns().get(i);
				var replacement = urlPattern.getReplacement();
				
				mainBloc.parse("rule.pattern", urlPattern.getPattern());
				mainBloc.parse("rule.replacement",replacement);
				
				mainBloc.loopBloc("rule");
			}
		} else {
			mainBloc.parseBloc("rule", "");
		}
	} else {
		mainBloc.parseBloc("rule", "");
	}
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}