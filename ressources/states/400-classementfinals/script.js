function checkPrintable(ficheConcours, options) {
	var phasesFinales = new org.ajdeveloppement.concours.PhasesFinales(ficheConcours);
	if(phasesFinales == null || phasesFinales.getClassement().size() == 0)
		return false;
	return true;
}

function printState(ficheConcours, template, document, writer, options) {
	var localeReader = options.getLangReader();
	var serie = options.getSerie();
	var depart = options.getDepart();
	var profile = options.getProfile();
	
	//*************************************************************************
	var strClassement = "";
	if (ficheConcours.getConcurrentList() != null && ficheConcours.getConcurrentList().countArcher() > 0) {
		
		writer.setPageEvent(new org.concoursjeunes.state.PageFooter());
		
		var tplClassement = new org.ajdeveloppement.commons.AJTemplate();
		var strArbitreResp = "";
		var strArbitresAss = "";
		
		var phasesFinales = new org.ajdeveloppement.concours.PhasesFinales(ficheConcours);
		if(phasesFinales == null)
			return;
		
		tplClassement.setLocalisationReader(localeReader);
		tplClassement.loadTemplate(template);
		
		tplClassement.parse("CURRENT_TIME", java.text.DateFormat.getDateInstance(java.text.DateFormat.FULL).format(new java.util.Date()));
		tplClassement.parse("LOGO_CLUB_URI", ficheConcours.getProfile().getConfiguration().getLogoPath().replaceAll("\\\\", "\\\\\\\\")); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		tplClassement.parse("INTITULE_CLUB", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getClub().getNom())); //$NON-NLS-1$
		tplClassement.parse("INTITULE_CONCOURS", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getIntituleConcours()));
		tplClassement.parse("VILLE_CLUB", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getLieuConcours()));
		tplClassement.parse("DATE_CONCOURS", java.text.DateFormat.getDateInstance(java.text.DateFormat.LONG).format(ficheConcours.getParametre().getDateDebutConcours()));
		tplClassement.parse("author", org.ajdeveloppement.commons.XmlUtils.sanitizeText(ficheConcours.getParametre().getClub().getNom()));
		
		var arbitres = ficheConcours.getParametre().getJudges();
		for (var i = 0; i < arbitres.size(); i++) {
			if (arbitres.get(i).isResponsable())
				strArbitreResp = arbitres.get(i).getFullName();
			else {
				if (!strArbitresAss.equals(""))
					strArbitresAss += ", ";
				strArbitresAss += arbitres.get(i).getFullName();
			}
		}
		tplClassement.parse("ARBITRE_RESPONSABLE", org.ajdeveloppement.commons.XmlUtils.sanitizeText(strArbitreResp));
		tplClassement.parse("ARBITRES_ASSISTANT", org.ajdeveloppement.commons.XmlUtils.sanitizeText(strArbitresAss));
		tplClassement.parse("NB_CLUB", "" + ficheConcours.getConcurrentList().countCompagnie());
		tplClassement.parse("NB_TIREURS", "" + ficheConcours.getConcurrentList().countArcher());
		
		var concurrentsClasse = phasesFinales.getClassement();
		
		var scnalst = concurrentsClasse.keySet();
		var scnaUse = new java.util.ArrayList(scnalst);
		org.concoursjeunes.CriteriaSet.sortCriteriaSet(scnaUse, ficheConcours.getParametre().getReglement().getListCriteria());
		
		for (var i = 0; i < scnaUse.size(); i++) {
			var concurrentInserted = false;
			var sortList = concurrentsClasse.get(scnaUse.get(i));
			
			if (sortList.size() > 0) {
				var strSCNA = org.concoursjeunes.localisable.CriteriaSetLibelle.getLibelle(scnaUse.get(i), ficheConcours.getProfile().getLocalisation());
				
				tplClassement.parse("categories.CATEGORIE", org.ajdeveloppement.commons.XmlUtils.sanitizeText(strSCNA)); //$NON-NLS-1$

				var place = 0;
				var scorePrecedent = -1;
				var phasePrecedente = -1;
				for(var j = 0; j < sortList.size(); j++) {
					var concurrent = sortList.get(j);

					if(concurrent == null)
						continue;
					
					var phase = -1;
					for(var k = 0; k < 6; k++) {
						if(concurrent.getScorePhasefinale(k) != 0) {
							phase = k;
							break;
						}
					}
					if(phase == -1)
						continue;
					
					if(phasePrecedente != phase || concurrent.getScorePhasefinale(phase) != scorePrecedent)
						place++;
					
					scorePrecedent = concurrent.getScorePhasefinale(phase);
					phasePrecedente = phase;
	
					tplClassement.parse("categories.classement.PLACE", "" + place); //$NON-NLS-1$
					tplClassement.parse("categories.classement.IDENTITEE", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrent.getFullName())); //$NON-NLS-1$
					tplClassement.parse("categories.classement.CLUB", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrent.getEntite().toString())); //$NON-NLS-1$
					tplClassement.parse("categories.classement.NUM_LICENCE", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrent.getNumLicenceArcher())); //$NON-NLS-1$
					var keys = ficheConcours.getParametre().getReglement().getListCriteria();
					var catStr = "";
					for (var k = 0; k < keys.size(); k++)
						catStr += concurrent.getCriteriaSet().getCriterionElement(keys.get(k)).getCode();
					tplClassement.parse("categories.classement.categorie", org.ajdeveloppement.commons.XmlUtils.sanitizeText(catStr));
					tplClassement.parse("categories.classement.PHASE", (phase > 0 || place < 3) ? ficheConcours.getProfile().getLocalisation().getResourceString("duel.phase."+phase) : ficheConcours.getProfile().getLocalisation().getResourceString("duel.phase.smallfinal")); //$NON-NLS-1$ //$NON-NLS-2$
					tplClassement.parse("categories.classement.SCORE", "" + concurrent.getScorePhasefinale(phase)); //$NON-NLS-1$
					
					tplClassement.loopBloc("categories.classement"); //$NON-NLS-1$
					
					concurrentInserted = true;
				}
				
				if(concurrentInserted)
					tplClassement.loopBloc("categories"); //$NON-NLS-1$
			}
			
			//if(!concurrentInserted)
			//	tplClassement.parseBloc("categories","");
		}
		com.lowagie.text.xml.XmlParser.parse(document, new java.io.StringReader(tplClassement.output()));
	}
	//*************************************************************************
}