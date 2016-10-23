/**
 * 
 */
pageCache["parameters.display"] = (function() {
		var template = loadTemplate(basePath + "/templates/parameters/display.thtml");
		
		var libelleLangues = org.ajdeveloppement.concours.Configuration.getAvailableLanguages();
		for(var libelle in libelleLangues) {
			template.parse("locale.langCode", libelle);
			template.parse("locale.langLabel", libelleLangues[libelle]);
			
			template.loopBloc("locale");
		}
		
		return template.output();
	})();