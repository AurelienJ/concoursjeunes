/**
 * 
 */
loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");

var File = Java.type("java.io.File");
var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");

var basePath = null;
var pageCache = [];

function loadTemplate(path) {
	var template = new AJTemplate();
	template.loadTemplate(path);
	
	return template;
}

function loadFragments() {
	var fragmentsFile = new File(basePath + "/scripts/fragments").listFiles();
	var jsFragmentsFile = Java.from(fragmentsFile);
	var scriptsPath = jsFragmentsFile
		.filter(function(val) { return val.getName().endsWith(".js") })
    	.map(function(val) { return val.getPath() });
	
	for each (var script in scriptsPath) {
		load(script);
	}
}

function init(basePath) {
	this.basePath = basePath;
	
	loadFragments();
}

function getPage(session) {
	var uri = session.getRequestUri();
	var urlParameters = session.getUrlParameters();

	if(urlParameters != null && urlParameters.containsKey("page")) {
		var page = urlParameters.page;
		
		if(pageCache[page] != undefined) {
			var content = null;
			if(pageCache[page] instanceof Function)
				content = pageCache[page]();
			else
				content = pageCache[page];
			return ResponseFormatter.getGzipedResponseForOutputTemplate(session, content);
		}
			
	}
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, "Pas de contenu");
}