function checkPrintable(ficheConcours, options) {
	return true;
}

function printState(ficheConcours, template, document, writer, options) {
	var localeReader = options.getLangReader();
	var serie = options.getSerie();
	var depart = options.getDepart();
	var profile = options.getProfile();
	var nbSerie = ficheConcours.getParametre().getReglement().getNbSerie();

	var templateXML = new org.ajdeveloppement.commons.AJTemplate();
	templateXML.setLocalisationReader(localeReader);
	templateXML.loadTemplate(template);

	try {
		templateXML.parse("CURRENT_TIME", java.text.DateFormat.getDateInstance(java.text.DateFormat.FULL).format(new java.util.Date()));
		templateXML.parse("producer", org.concoursjeunes.AppInfos.NOM + " " + org.concoursjeunes.AppInfos.VERSION);
		templateXML.parse("author", org.ajdeveloppement.commons.XmlUtils.sanitizeText(profile.getConfiguration().getClub().getNom()));

		templateXML.parse("scoresheet.LOGO_CLUB_URI", profile.getConfiguration().getLogoPath().replaceAll("\\\\", "\\\\\\\\"));
		templateXML.parse("scoresheet.INTITULE_CLUB", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getClub().getNom()));
		templateXML.parse("scoresheet.INTITULE_CONCOURS", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getIntituleConcours()));
		templateXML.parse("scoresheet.VILLE_CLUB", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getLieuConcours()));
		templateXML.parse("scoresheet.DATE_CONCOURS", java.text.DateFormat.getDateInstance(java.text.DateFormat.LONG).format(ficheConcours.getParametre().getDate()));
		
		var nbPositions = ficheConcours.getParametre().getNbTireur();
		var percentPositions = "";
		
		templateXML.parse("scoresheet.NB_POSITIONS", nbPositions);
		
		for(var j = 0; j < nbPositions; j++) {
			percentPositions += ";" + ((100.0/nbPositions)-1) + ";1";
		}
		
		percentPositions = percentPositions.substring(1);
		templateXML.parse("scoresheet.PERCENT_POSITIONS", percentPositions);
		
		for(var j = 0; j < nbPositions; j++) {
			templateXML.parse("scoresheet.positions.cid", "");
			templateXML.parse("scoresheet.positions.cclub", "");
			templateXML.parse("scoresheet.positions.clicence", "");
			templateXML.parse("scoresheet.positions.emplacement", "");
			
			var nbFlecheParVolee = ficheConcours.getParametre().getReglement().getNbFlecheParVolee();
			//var strDistance = getPosition(k+1) + " distance, " + ficheConcours.getParametre().getReglement().getDistancesEtBlasonFor(concurrent.getCriteriaSet().getFilteredCriteriaSet(ficheConcours.getParametre().getReglement().getPlacementFilter())).getDistance()[k]+"m";
			templateXML.parse("scoresheet.positions.SERIE_NB_COL", 3 + nbFlecheParVolee);
			//templateXML.parse("scoresheet.positions.INTITULE_SERIE", strDistance);
			var colsSize = "";
			
			for(var k = 0; k < 3 + nbFlecheParVolee; k++)
				colsSize += ";" + (100.0 / (3 + nbFlecheParVolee));
			
			colsSize = colsSize.substring(1);
			templateXML.parse("scoresheet.positions.COLS_SIZE", colsSize);
			templateXML.parse("scoresheet.positions.NB_FLECHE_PAR_VOLEE", nbFlecheParVolee);
			
			for(var k = 1; k <= nbFlecheParVolee; k++) {
				templateXML.parse("scoresheet.positions.fleches.NUM_FLECHE", k);
				
				templateXML.loopBloc("scoresheet.positions.fleches");
			}
			
			for(var k = 1; k <= ficheConcours.getParametre().getReglement().getNbVoleeParSerie(); k++) {
				templateXML.parse("scoresheet.positions.volees.NUM_VOLEE", k);
				
				for(var l = 0; l < ficheConcours.getParametre().getReglement().getNbFlecheParVolee(); l++) {
					templateXML.loopBloc("scoresheet.positions.volees.pointsparfleche");
				}
				
				templateXML.loopBloc("scoresheet.positions.volees");
			}
			
			templateXML.parse("scoresheet.positions.NB_COL_TOTAL", 2 + nbFlecheParVolee);
			//templateXML.parse("scoresheet.positions.NUM_DISTANCE", getPosition(j+1));
			
			for(var k = 1; k < nbSerie; k++) {
				templateXML.parse("scoresheet.repport.distance.NumDistance", k);
				
				templateXML.loopBloc("scoresheet.repport.distance");
			}

			templateXML.loopBloc("scoresheet.positions");
			templateXML.loopBloc("scoresheet.repport");
			templateXML.loopBloc("scoresheet.complement");
		}
		
		//print(templateXML.output());
		com.lowagie.text.xml.XmlParser.parse(document, new java.io.StringReader(templateXML.output()));
	} catch (e) {
		e.printStackTrace();
	}
}

function getPosition(num) {
	switch(num) {
		case 1:
			return localeReader.getResourceString("template.first");
		case 2:
			return localeReader.getResourceString("template.second");
		case 3:
			return localeReader.getResourceString("template.third");
		case 4:
			return localeReader.getResourceString("template.forth");
		default:
			return num + localeReader.getResourceString("template.xth");
	}
}