/*
 * Integration des clubs et licenciés FFRS (Fédération Française de Retraite 
 * Sportive) à partir de l'extraction Excel fournit par la fédération.
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

//NOTE: Ce script est volontairement sur-commenté pour aider à la compréhension
//des développeurs néophite

//Mettre à "true" pour tester directement l'import sans avoir
//besoin de passer par le menu de l'application parente
var DEBUG_MODE = false;

var JAVA_EXCEL_API_PATH = "scripts/importXLSFFRS/jxl.jar";
var MENU_LABEL = "Import archers FFRS Excel";
var MENU_PATH = ["file","import","importxls"];

var FEUILLE_LICENCIE = 0;
var FEUILLE_CLUB = 1;
 
var parentframe = null;
var profile = null;
var sqlManager = null;
var progressMonitor = null;

var monsieurCivility = null;
var madameCivility = null;

/**
 * Recupération dans le fichier excel des infos d'un club
 *
 * @param sheet la feuille de calcul des clubs
 * @param line  la ligne de la feuille à récuperer
 */
function getRowClub(sheet, line) {
	var colIndex = 0;
	
	var row = new Array();

	row["numero"] = getCellContent(sheet, line, colIndex++);
	row["nom"] = getCellContent(sheet, line, colIndex++);
	row["adresse"] = getCellContent(sheet, line, colIndex++);
	row["codePostal"] = getCellContent(sheet, line, colIndex++);
	row["ville"] = getCellContent(sheet, line, colIndex++);
	row["tel"] = getCellContent(sheet, line, colIndex++);
	row["portable"] = getCellContent(sheet, line, colIndex++);
	row["fax"] = getCellContent(sheet, line, colIndex++);
	row["email"] = getCellContent(sheet, line, colIndex++);
	row["president"] = getCellContent(sheet, line, colIndex++);
	
	return row;
}

/**
 * Recupération dans le fichier excel des infos d'un licencié
 *
 * @param sheet la feuille de calcul des licenciés
 * @param line  la ligne de la feuille à récuperer
 */
function getRowLicencie(sheet, line) {
	var colIndex = 0;
	
	var row = new Array();
	
	row["club"] = getCellContent(sheet, line, colIndex++);
	row["sexe"] = getCellContent(sheet, line, colIndex++);
	row["nom"] = getCellContent(sheet, line, colIndex++);
	row["prenom"] = getCellContent(sheet, line, colIndex++);
	row["dateNaissance"] = getCellContent(sheet, line, colIndex++);
	row["numero"] = getCellContent(sheet, line, colIndex++);
	row["adresse1"] = getCellContent(sheet, line, colIndex++);
	row["adresse2"] = getCellContent(sheet, line, colIndex++);
	row["codePostal"] = getCellContent(sheet, line, colIndex++);
	row["ville"] = getCellContent(sheet, line, colIndex++);
	row["tel"] = getCellContent(sheet, line, colIndex++);
	row["portable"] = getCellContent(sheet, line, colIndex++);
	row["email"] = getCellContent(sheet, line, colIndex++);
	
	return row;
}

/**
 * importation des données du fichier excel fournit en parametre
 * 
 * @param sourceFile le fichier excel contenant la liste des archers et club FFRS
 */
function importData(sourceFile) {
	sqlManager = new org.ajdeveloppement.commons.sql.SqlManager(org.concoursjeunes.ApplicationCore.dbConnection, null);
	
	//Ouverture du fichier Excel
	var workbook = Packages.jxl.Workbook.getWorkbook(sourceFile);
	
	//Chargement des civilités
	loadCivilities();
	
	//Création de la fédé
	var federation = insertFederation();
	
	setProgressionNote("Import Club");

	//Integration des clubs
	var clubsMap = new java.util.HashMap(); //Table de correspondance entre le numéro de club et l'instance du club
	
	//Chargement de la feuille de calcul
	var clubSheet = workbook.getSheet(FEUILLE_CLUB);
	for(var i = 1; i < clubSheet.getRows(); i++) { //Boucle sur chacune des lignes de la feuille exepté la 1ère (entete)
		var rowClub = getRowClub(clubSheet, i); //Récupération des infos de la feuille de calcul
		
		if(rowClub["numero"] == "") //on ignore les lignes blanches
			continue;
		
		var club = insertClub(federation, rowClub); //création du club avec les infos récupéré au dessus
		
		clubsMap.put(club.getAgrement(), club); //ajout du club à la table de correspondance
		
		setProgressionValue((i / clubSheet.getRows()) * 100.0);
	}
	
	clubSheet = null;
	
	setProgressionNote("Import Archers");
	
	//Integation des licencié
	//Chargement de la feuille de calcul
	var licenceSheet = workbook.getSheet(FEUILLE_LICENCIE);
	for(var i = 1; i < licenceSheet.getRows(); i++) { //Boucle sur chacune des lignes de la feuille exepté la 1ère (entete)
		var rowLicence = getRowLicencie(licenceSheet, i); //Récupération des infos de la feuille de calcul
		
		if(rowLicence["numero"] == "") //on ignore les lignes blanches
			continue;
			
		insertArcher(clubsMap, rowLicence); //création des archers
		
		setProgressionValue((i / licenceSheet.getRows()) * 100.0);
	}
	setProgressionValue(100);
}

/**
 * Integration de la fédération
 */
function insertFederation() {
	var federations = org.concoursjeunes.manager.FederationManager.getAvailableFederations();
	
	var niveauCompetition = new org.concoursjeunes.CompetitionLevel();
	niveauCompetition.setLibelle("Qualificatif");
	niveauCompetition.setLang("fr");
	niveauCompetition.setDefaut(true);
	
	var niveauCompetition2 = new org.concoursjeunes.CompetitionLevel();
	niveauCompetition2.setLibelle("Championnat de France");
	niveauCompetition2.setLang("fr");

	var federation = new org.concoursjeunes.Federation();
	federation.setSigleFederation("FFRS");
	federation.setNomFederation("Fédération Française de retraite sportive");
	federation.setCodeCountry("fr");
	federation.addCompetitionLevel(niveauCompetition);
	federation.addCompetitionLevel(niveauCompetition2);
	
	if(!federations.contains(federation))
		federation.save();
	else
		federation = federations.get(federations.indexOf(federation));
	
	return federation;
}

/**
 * Integration des clubs
 *
 * @param federation la federation associé au club
 * @param rowClub la ligne de données des infos du club à integrer
 */
function insertClub(federation, rowClub) {
	//Formatage du bloc-note
	var note = "";
	if(rowClub["tel"] != "")
		note += "Telephone: " + rowClub["tel"] + "\n";
	if(rowClub["portable"] != "")
		note += "Portable: " + rowClub["portable"] + "\n";
	if(rowClub["fax"] != "")
		note += "Fax: " + rowClub["fax"] + "\n";
	if(rowClub["email"] != "")
		note += "E-mail: " + rowClub["email"] + "\n";
	
	if(rowClub["president"] != "") {
		if(note != "")
			note += "------------\n";
		note += "Président: " + rowClub["president"] + "\n";
	}

	//Declaration du club
	var entite = new org.concoursjeunes.Entite(rowClub["nom"], org.concoursjeunes.Entite.CLUB);
	entite.setAgrement(java.lang.String.format("%5s", [rowClub["numero"]]).replace(' ','0'));
	entite.setVille(rowClub["ville"]);
	
	//Recherche la présence en base
	var entites = org.concoursjeunes.manager.EntiteManager.getEntitesInDatabase(entite, null);
	if(entites.size() > 0) //si le club est déjà présent en base alors on modifie l'existant
		entite = entites.get(0);
	
	entite.setFederation(federation);
	entite.setAdresse(rowClub["adresse"].replace('\t','\n'));
	entite.setCodePostal(java.lang.String.format("%5s", [rowClub["codePostal"]]).replace(' ','0'));
	entite.setNote(note);
	
	//Sauvegarde du club
	entite.save();
	
	return entite; //retourne le club enregistré
}

/**
 * Integration des archers
 *
 * @param clubsMap table de correspondance des clubs avec leurs identifiant
 * @param rowArcher la ligne de données des infos du licencié à integrer
 */
function insertArcher(clubsMap, rowArcher) {
	var idContact = null;
	
	//Recherche en base si l'archer est déjà présent
	var rs = sqlManager.executeQuery(
						java.lang.String.format("select CONTACT.ID_CONTACT from CONTACT inner join ARCHERS on CONTACT.ID_CONTACT=ARCHERS.ID_CONTACT where NAME='%s' and FIRSTNAME='%s' and NUMLICENCEARCHER='%s'", 
								[rowArcher["nom"].trim().replace("'", "''"), rowArcher["prenom"].trim().replace("'", "''"), rowArcher["numero"].trim().replace("'", "''")]));
	if(rs.first())
		idContact = rs.getObject("ID_CONTACT"); //si il est présent on récupére son id
	rs.close();
	
	//Enregistrement de l'archer
	var archer = new org.concoursjeunes.Archer();
	archer.setIdContact(idContact);
	archer.setNumLicenceArcher(rowArcher["numero"].trim());
	archer.setName(rowArcher["nom"].trim());
	archer.setFirstName(rowArcher["prenom"].trim());
	if(rowArcher["sexe"] == "Mme")
		archer.setCivility(madameCivility);
	else
		archer.setCivility(monsieurCivility);
	archer.setAdress(rowArcher["adresse1"].trim()+"\n"+rowArcher["adresse2"].trim());
	archer.setZipCode(java.lang.String.format("%5s", [rowArcher["codePostal"]]).replace(' ','0'));
	archer.setCity(rowArcher["ville"].trim());
	archer.setCountryCode("fr");
	if(clubsMap.containsKey(rowArcher["club"].trim()))
		archer.setEntite(clubsMap.get(rowArcher["club"].trim()));
	archer.setNote("Date de Naissance: " + rowArcher["dateNaissance"]);

	//Enregistrement des coordonnées
	if(rowArcher["tel"] != "" || rowArcher["portable"] != "" || rowArcher["email"] != "") {
		//var contact = org.ajdeveloppement.concours.builders.ContactBuilder.getContact(archer.getIdContact()); //Récupération du contact en base
		var coordonnees = new java.util.ArrayList();
		
		if(rowArcher["tel"] != "") {
			var telephone = new org.ajdeveloppement.concours.Coordinate(org.ajdeveloppement.concours.Coordinate.Type.HOME_PHONE, rowArcher["tel"]);
			coordonnees.add(telephone);
		}
		if(rowArcher["portable"] != "") {
			var portable = new org.ajdeveloppement.concours.Coordinate(org.ajdeveloppement.concours.Coordinate.Type.MOBILE_PHONE, rowArcher["portable"]);
			coordonnees.add(portable);
		}
		if(rowArcher["email"] != "") {
			var email = new org.ajdeveloppement.concours.Coordinate(org.ajdeveloppement.concours.Coordinate.Type.MAIL, rowArcher["email"]);
			coordonnees.add(email);
		}
		
		//Affectation des coordonnées
		archer.setCoordinates(coordonnees);
	}
	
	archer.save();
}

/**
 * Chargement des civilités
 */
function loadCivilities() {
	var civilities = org.ajdeveloppement.concours.managers.CivilityManager.getAllCivilities();
	for(var i = 0; i < civilities.size(); i++) {
		if(civilities.get(i).getAbreviation() == "M.")
			monsieurCivility = civilities.get(i);
		if(civilities.get(i).getAbreviation() == "Mme")
			madameCivility = civilities.get(i);
	}
}

/**
 * Définit le texte de progression d'avancement
 *
 * @param progressionNote le texte d'avancement
 */
function setProgressionNote(progressionNote) {
	javax.swing.SwingUtilities.invokeLater(function() { 
		progressMonitor.setNote(progressionNote);
	});
}

/**
 * Définit le pourcentage de progression d'avancement
 *
 * @param percent le pourcentage de progression
 */
function setProgressionValue(percent) {
	javax.swing.SwingUtilities.invokeLater(function() { 
		progressMonitor.setProgress(percent);
	});
}

/**
 * Récupére la valeur d'une cellule d'une feuille
 *
 * @param sheet la feuille de calcul des clubs
 * @param line  la ligne de la feuille à récuperer
 * @param column la colonne pour laquel récuperer la valeur
 */
function getCellContent(sheet, line, column) {
	return sheet.getCell(column,line).getContents().trim();
}

/**
 * Lancement de l'Action d'import du fichier Excel
 */
function importAction() {
	//Filtre de recherche de fichier
	var filter = new javax.swing.filechooser.FileNameExtensionFilter("Fichiers Excel (*.xls)", ["xls"]);
	
	//Initialisation de la boite de dialogue de selection de fichier
	var fileChooser = new javax.swing.JFileChooser();
	fileChooser.setFileSelectionMode(javax.swing.JFileChooser.FILES_ONLY);
	fileChooser.addChoosableFileFilter(filter);
	
	//Ouverture de la boite de dialogue et attente de la selection utilisateur
	if (fileChooser.showOpenDialog(parentframe) == javax.swing.JFileChooser.APPROVE_OPTION) { //si l'utilisateur selectionne un fichier
		var selectedFile = fileChooser.getSelectedFile();
		
		//On s'assure d'avoir selectionné un fichier excel
		if(selectedFile != null && selectedFile.getName().endsWith(".xls")) {
			//initialisation de la boite de dialogue de progression
			progressMonitor = new javax.swing.ProgressMonitor(parentframe,
								  "Import Fichier Excel FFRS",
								  "", 0, 100);
			progressMonitor.setProgress(0);
			progressMonitor.setMillisToDecideToPopup(1000); //Affichage de la boite de progression après une seconde
			
			//Création d'un processus de traitement asynchrone des données pour l'import
			var thread = new java.lang.Thread(function() {
				try {
					//import des données
					importData(selectedFile);
				
					//Affichage d'une boite de dialogue de fin de traitement
					javax.swing.SwingUtilities.invokeLater(function() {
						javax.swing.JOptionPane.showMessageDialog(parentframe, "Import Terminé");
					});
				} catch(exception) {
					javax.swing.SwingUtilities.invokeLater(function() {
						javax.swing.JOptionPane.showMessageDialog(parentframe, "Erreur d'integration, un élément n'a pas été identifié correctement dans le fichier", "Fichier Invalide", javax.swing.JOptionPane.ERROR_MESSAGE);
					});
					java.lang.System.err.println(exception.toString());
				}
			});
			
			//lancement de l'import
			thread.start();
		} else {
			//Affichage d'un message d'erreur si le fichier est invalide
			javax.swing.JOptionPane.showMessageDialog(parentframe, "Fichier selectionné invalide", "Fichier Invalide", javax.swing.JOptionPane.ERROR_MESSAGE);
		}
	}
}

/**
 * Chargement du script
 */
function load(parentframe, profile) {
	this.parentframe = parentframe;
	this.profile = profile;

	//Chargement de la librairie necessaire à la lecture des fichiers Excel
	org.ajdeveloppement.commons.ClassPathHacker.addFile(
		new java.io.File(org.concoursjeunes.ApplicationCore.userRessources.getUserPath(), JAVA_EXCEL_API_PATH));

	if(!DEBUG_MODE) { //On est pas en mode debugage
		//Ajout de l'entrée dans le menu de l'application pour lancer l'import
		var item = new javax.swing.JMenuItem(MENU_LABEL);
		item.setActionCommand("importxls");
		org.ajdeveloppement.commons.ui.MenuBarTools.addItem(item, parentframe.getJMenuBar(), MENU_PATH);
	
		//Juste pour information dans la console
		java.lang.System.out.println("Menu Ajouté sous Fichier->Importer...");
		java.lang.System.out.println("Utlisez ce menu pour lancer l'import Excel");
	
		//Action au clic sur l'entrée du menu
		item.addActionListener(function(e) {
			importAction();
		});
	} else {
		//En mode débugage on passe directement à l'action d'import
		importAction();
	}
}

/**
 * Déchargement du script
 */
function unload() {
	if(this.parentframe != null && !DEBUG_MODE) {
		var removePath = MENU_PATH;
		removePath.push("");
		
		org.ajdeveloppement.commons.ui.MenuBarTools.removeItem(this.parentframe.getJMenuBar(), removePath);
	}
	parentframe = null;
	profile = null;
	sqlManager = null;
	progressMonitor = null;

	monsieurCivility = null;
	madameCivility = null;
}
