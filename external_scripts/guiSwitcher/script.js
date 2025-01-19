/*
 * Changement du look and feel de l'application en fonction de ceux installés
 * sur le système.
 *
 * http://www.concoursjeunes.org
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA 
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant 
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à 
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement, 
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité. 
 * 
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez 
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 * 
 * @author Aurélien JEOFFRAY
 */
 
var listLookAndFeel = null;
var parentframe = null;
var profile = null;

var USER_THEME_FILE = "user.theme";

/**
 * Rafraichi l'interface pour appliquer le nouveau theme à l'ensemble des composants
 */
function refreshUI() {
	profile.closeAllFichesConcours();
	javax.swing.SwingUtilities.updateComponentTreeUI(parentframe);
}

/**
 * Charge, si il existe, le theme de l'utilisateur précédament enregistré
 */
function loadTheme() {
	var currentThemeFile = new java.io.File(org.concoursjeunes.ApplicationCore.userRessources.getUserPath(), USER_THEME_FILE);
	if(currentThemeFile.exists()) {
		var reader = new java.io.BufferedReader(new java.io.FileReader(currentThemeFile));
		try {
			var currentTheme = reader.readLine();
			javax.swing.UIManager.setLookAndFeel(currentTheme);
			
			refreshUI();
		} catch(e) {
		} finally {
			reader.close();
		}
	}
}

/**
 * Enregistre le theme selectionné par l'utilisateur
 *
 * @param theme le theme à enregistrer
 */
function saveTheme(theme) {
	var currentThemeFile = new java.io.FileWriter(
		new java.io.File(org.concoursjeunes.ApplicationCore.userRessources.getUserPath(), USER_THEME_FILE));
	try {
		currentThemeFile.append(theme);
	}  finally {
		currentThemeFile.close();
	}
}

/**
 * !! Ne Pas supprimer !
 * Charge le script
 *
 * @param parentframe la fenetre parente
 * @param profile le profile utilisateur courant
 */
function load(parentframe, profile) {
	this.parentframe = parentframe;
	this.profile = profile;	
	
	loadTheme();
	
	listLookAndFeel = javax.swing.UIManager.getInstalledLookAndFeels();
	for(var i = 0; i < listLookAndFeel.length; i++) {
		var item = javax.swing.JMenuItem(listLookAndFeel[i].getName());
		item.setActionCommand(listLookAndFeel[i].getClassName());
		org.ajdeveloppement.commons.ui.MenuBarTools.addItem(item, parentframe.getJMenuBar(), 
			["tools","themes",listLookAndFeel[i].getName()]);

		item.addActionListener(function(e) {
			javax.swing.UIManager.setLookAndFeel(e.getActionCommand());

			refreshUI();
			
			saveTheme(e.getActionCommand());
		});
	}
}

/**
 * !! Ne Pas supprimer !
 * Décharge le script
 */
function unload() {
	if(this.parentframe != null) {
		listLookAndFeel = javax.swing.UIManager.getInstalledLookAndFeels();
		for(var i = 0; i < listLookAndFeel.length; i++) {
			org.ajdeveloppement.commons.ui.MenuBarTools.removeItem(this.parentframe.getJMenuBar(), 
				["tools","themes",listLookAndFeel[i].getName(),""]);	
		}	
	}
}
