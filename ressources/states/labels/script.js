function checkPrintable(ficheConcours, options) {
	if(ficheConcours.getConcurrentList().countArcher(options.getDepart()))
		return true;
	return false;
}

function printState(ficheConcours, template, document, writer, options) {
	var localeReader = options.getLangReader();
	var serie = options.getSerie();
	var depart = options.getDepart();
	var profile = options.getProfile();
	
	var templateEtiquettesXML = new org.ajdeveloppement.commons.AJTemplate();
	templateEtiquettesXML.loadTemplate(template);

	try {
		var nblarg = profile.getConfiguration().getColonneAndLigne()[1];
		var nbhaut = profile.getConfiguration().getColonneAndLigne()[0];
		var depart = 0;
	
		var marge_gauche = profile.getConfiguration().getMarges().left; // la marge gauche
		var marge_droite = profile.getConfiguration().getMarges().right; // la marge droite
		var marge_haut = profile.getConfiguration().getMarges().top; // la marge haut
		var marge_bas = profile.getConfiguration().getMarges().bottom; // la marge bas
		var espacement_cellule_h = profile.getConfiguration().getEspacements()[0]; // l'espacement horizontal entre cellule
		var espacement_cellule_v = profile.getConfiguration().getEspacements()[1]; // l'espacement vertical entre cellule
		eval("var pageDimension = com.lowagie.text.PageSize." + profile.getConfiguration().getFormatPapier());
		
		if(profile.getConfiguration().getOrientation().equals("landscape")) //$NON-NLS-1$
			pageDimension = pageDimension.rotate();
			
		espacement_cellule_h = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(espacement_cellule_h);
		espacement_cellule_v = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(espacement_cellule_v);
		marge_gauche = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(marge_gauche);
		marge_droite = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(marge_droite);
		marge_haut = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(marge_haut);
		marge_bas = org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(marge_bas);
	
		var zoneaffichable_x = pageDimension.getWidth() - marge_gauche - marge_droite;
		var zoneaffichable_y = pageDimension.getHeight() - marge_haut - marge_bas;
		
		var cellule_x = (zoneaffichable_x - (espacement_cellule_h * (nblarg - 1.0))) / zoneaffichable_x * 100 / nblarg - 7;
		var cellule_y = (zoneaffichable_y - (espacement_cellule_v * (nbhaut - 1.0))) / zoneaffichable_y * 100 / nbhaut;
	
		var tailles_x = 0.1 + ""; //$NON-NLS-1$
		for (var i = 0; i < nblarg; i++) {
			tailles_x += ";" + cellule_x + ";7"; //$NON-NLS-1$ //$NON-NLS-2$
			if (i < nblarg - 1)
				tailles_x += ";" + espacement_cellule_h / zoneaffichable_x * 100; //$NON-NLS-1$
		}
	
		templateEtiquettesXML.parse("CURRENT_TIME", java.text.DateFormat.getDateInstance(java.text.DateFormat.FULL).format(new java.util.Date())); //$NON-NLS-1$
		templateEtiquettesXML.parse("producer", org.concoursjeunes.AppInfos.NOM + " " + org.concoursjeunes.AppInfos.VERSION); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("author", org.ajdeveloppement.commons.XmlUtils.sanitizeText(profile.getConfiguration().getClub().getNom())); //$NON-NLS-1$
		templateEtiquettesXML.parse("pagesize", profile.getConfiguration().getFormatPapier()); //$NON-NLS-1$
		templateEtiquettesXML.parse("orientation", profile.getConfiguration().getOrientation()); //$NON-NLS-1$
		templateEtiquettesXML.parse("top", "" + org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(profile.getConfiguration().getMarges().top)); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("bottom", "" + org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(profile.getConfiguration().getMarges().bottom)); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("left", "" + org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(profile.getConfiguration().getMarges().left)); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("right", "" + org.ajdeveloppement.commons.AJToolKit.centimeterToDpi(profile.getConfiguration().getMarges().right)); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("page.columns", "" + (nblarg * 3)); //$NON-NLS-1$ //$NON-NLS-2$
		templateEtiquettesXML.parse("page.widths", tailles_x); //$NON-NLS-1$
	
		var colonne = 0;
		var ligne = 0;
		var concurrents = org.concoursjeunes.ConcurrentList.sort(ficheConcours.getConcurrentList().list(depart), org.concoursjeunes.ConcurrentList.SortCriteria.SORT_BY_TARGETS);
		
		for (var i = 0; i < concurrents.size(); i++) {
			
			if (colonne == 0)
				if(ligne < nbhaut - 1)
					templateEtiquettesXML.parse("page.ligne.leading", "" + (zoneaffichable_y * (cellule_y / 100.0) + espacement_cellule_v)); //$NON-NLS-1$ //$NON-NLS-2$
				else
					templateEtiquettesXML.parse("page.ligne.leading", "" + (zoneaffichable_y * (cellule_y / 100.0) - 1)); //$NON-NLS-1$ //$NON-NLS-2$
			templateEtiquettesXML.parse("page.ligne.colonne.cid", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrents.get(i).getID())); //$NON-NLS-1$
			templateEtiquettesXML.parse("page.ligne.colonne.cclub", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrents.get(i).getClub().toString())); //$NON-NLS-1$
			templateEtiquettesXML.parse("page.ligne.colonne.clicence", org.ajdeveloppement.commons.XmlUtils.sanitizeText(concurrents.get(i).getNumLicenceArcher())); //$NON-NLS-1$
			templateEtiquettesXML.parse("page.ligne.colonne.emplacement", new org.concoursjeunes.TargetPosition(concurrents.get(i).getCible(), concurrents.get(i).getPosition()).toString()); //$NON-NLS-1$
			if (colonne + 1 == nblarg)
				templateEtiquettesXML.parseBloc("page.ligne.colonne.interbloc", ""); //$NON-NLS-1$ //$NON-NLS-2$
	
			templateEtiquettesXML.loopBloc("page.ligne.colonne"); //$NON-NLS-1$
	
			colonne = (++colonne) % nblarg;
			if (colonne == 0) {
				templateEtiquettesXML.loopBloc("page.ligne");
				ligne++;
			}
	
			if (ligne == nbhaut) {
				templateEtiquettesXML.loopBloc("page");
	
				templateEtiquettesXML.parse("page.columns", "" + (nblarg * 3));
				templateEtiquettesXML.parse("page.widths", tailles_x);
	
				ligne = 0;
			}
		}
	
		if (colonne != 0) {
			templateEtiquettesXML.loopBloc("page.ligne");
		}
		if (ligne != 0) {
			templateEtiquettesXML.loopBloc("page");
		}
		
		/*var footer = new HeaderFooter(new Phrase("page "), new Phrase("."));
		footer.setBorder(0);
		footer.setAlignment(HeaderFooter.ALIGN_RIGHT);
		document.setFooter(footer);*/
		
		com.lowagie.text.xml.XmlParser.parse(document, new java.io.StringReader(templateEtiquettesXML.output()));
	} catch (e) {
		/*org.jdesktop.swingx.error.JXErrorPane.showDialog(null, new ErrorInfo(ApplicationCore.ajrLibelle.getResourceString("erreur"), //$NON-NLS-1$
				e.toString(), null, null, e, Level.SEVERE, null));*/
		e.printStackTrace();
	}
}