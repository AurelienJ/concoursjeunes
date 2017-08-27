//mapping:
// int dbVersion - version de la base de donnée
// SqlManager sql - moteur de base de données

function updateReglements() {
	//liste l'ensemble des fichiers de réglements
	var updatePath = new java.io.File(org.ajdeveloppement.concours.ApplicationCore.staticParameters.getResourceString("path.ressources"), "update");
	var reglements = org.ajdeveloppement.commons.io.FileUtils.listAllFiles(updatePath, ".*\\.reglement");
	var rManager = org.ajdeveloppement.concours.managers.ReglementManager.getInstance();
	for(var i = 0; i < reglements.size(); i++) {
		rManager.importReglement(reglements.get(i));
	}
}

//dbVersion = org.ajdeveloppement.concours.ApplicationCore.DB_RELEASE_REQUIRED;
//sql.executeUpdate("UPDATE PARAM SET DBVERSION=" + org.ajdeveloppement.concours.ApplicationCore.DB_RELEASE_REQUIRED + ";");

if(dbVersion == 0) {
	//passe l'ensemble des scripts de base
	sql.executeScript("01-create_db.sql",true);
	sql.executeScript("01-create_db-webserver.sql",true);
	sql.executeScript("02-referenceData.sql",true);
	sql.executeScript("../sql/ImportClubFFTA.sql",true);
	//sql.executeUpdate("RUNSCRIPT FROM 'ressources/sql/ImportVillesFr.sql'");
	//sql.executeScript("../sql/ImportVillesFr.sql");
	
	//updateReglements();
	//sql.executeScript("../sql/ImportClubLFBTA.sql");
} else { 
	if(dbVersion < 34)
		sql.executeUpdate("ALTER TABLE AJWEBSERVER.Request ADD Referer VARCHAR(255)");
	
	if(dbVersion < 35)
		sql.executeScript("../sql/ImportClubFFTA.sql",true);
	
	/*if(dbVersion < 36) {
		sql.executeUpdate("INSERT INTO CATEGORIE_REGLEMENT (NUMCATEGORIE_REGLEMENT, NOMCATEGORIE) VALUES (1, 'Salle')");
		sql.executeUpdate("INSERT INTO CATEGORIE_REGLEMENT (NUMCATEGORIE_REGLEMENT, NOMCATEGORIE) VALUES (2, 'Exterieur')");
		sql.executeUpdate("INSERT INTO CATEGORIE_REGLEMENT (NUMCATEGORIE_REGLEMENT, NOMCATEGORIE) VALUES (3, 'Jeunes')");
		sql.executeUpdate("INSERT INTO CATEGORIE_REGLEMENT (NUMCATEGORIE_REGLEMENT, NOMCATEGORIE) VALUES (4, 'Autres')");
	}*/
	if(dbVersion < 37)
		sql.executeUpdate("ALTER TABLE DEPARTAGE ALTER ID_DEPARTAGE UUID NOT NULL DEFAULT RANDOM_UUID()");
	
	if(dbVersion < 38) {
		sql.executeUpdate("ALTER TABLE ARCHER DROP COLUMN CERTIFMEDICAL");
		sql.executeUpdate("ALTER TABLE ARCHER ADD COLUMN CERTIFMEDICAL DATE NULL");
	}
	
	if(dbVersion < 39) {
		sql.executeUpdate("ALTER TABLE CRITERE_DISCRIMINANT DROP COLUMN ID_REGLEMENT");
		sql.executeUpdate("ALTER TABLE CONTACT ADD COLUMN DATENAISS DATE");
		sql.executeUpdate("ALTER TABLE CONTACT ADD COLUMN SEXE INTEGER");
		sql.executeUpdate("ALTER TABLE CONTACT ADD COLUMN DATEMODIF DATE DEFAULT CURRENT_DATE()");
		
		sql.executeUpdate("UPDATE CONTACT C SET DATENAISS = (SELECT DATENAISS FROM ARCHER A WHERE A.ID_CONTACT=C.ID_CONTACT)");
		sql.executeUpdate("UPDATE CONTACT C SET SEXE = (SELECT SEXE FROM ARCHER A WHERE A.ID_CONTACT=C.ID_CONTACT)");
		
		sql.executeUpdate("ALTER TABLE ARCHER DROP COLUMN DATENAISS");
		sql.executeUpdate("ALTER TABLE ARCHER DROP COLUMN SEXE");
		sql.executeUpdate("ALTER TABLE ARCHER DROP COLUMN DATEMODIF");
	}
	
	if(dbVersion < 40) {
		sql.executeUpdate("CREATE TABLE IF NOT EXISTS COMPETITION_JUDGE ("
			+ "ID_COMPETITION			UUID NOT NULL,"
			+ "ID_CONTACT				UUID NOT NULL,"
			+ "RESPONSABLE				BOOLEAN NOT NULL DEFAULT FALSE,"
			+ ""
			+ "PRIMARY KEY (ID_COMPETITION, ID_CONTACT),"
			+ "FOREIGN KEY (ID_COMPETITION) REFERENCES COMPETITION (ID_COMPETITION) ON UPDATE CASCADE ON DELETE CASCADE,"
			+ "FOREIGN KEY (ID_CONTACT) REFERENCES ARCHER (ID_CONTACT) ON UPDATE CASCADE ON DELETE RESTRICT"
			+ ");");
	}
	
	if(dbVersion < 41) {
		sql.executeUpdate("CREATE TABLE IF NOT EXISTS OPTIONS_CRITERE_CLASSEMENT ("
				+ "ID_CRITERE_CLASSEMENT	UUID NOT NULL,"
				+ "ID_CONTACT				UUID NOT NULL,"
				+ "ID_COMPETITION			UUID NOT NULL,"
				+ "SERIE					INTEGER,"
				+ "ID_BLASON				UUID NOT NULL,"
				+ ""
				+ "PRIMARY KEY (ID_CRITERE_CLASSEMENT, ID_CONTACT, ID_COMPETITION, SERIE),"
				+ "FOREIGN KEY (ID_CRITERE_CLASSEMENT) REFERENCES CRITERE_CLASSEMENT (ID_CRITERE_CLASSEMENT) ON UPDATE CASCADE ON DELETE RESTRICT,"
				+ "FOREIGN KEY (ID_CONTACT, ID_COMPETITION) REFERENCES CONCURRENT (ID_CONTACT, ID_COMPETITION) ON UPDATE CASCADE ON DELETE CASCADE,"
				+ "FOREIGN KEY (ID_BLASON) REFERENCES BLASON (ID_BLASON) ON UPDATE CASCADE ON DELETE RESTRICT"
				+ ");");
		sql.executeUpdate("ALTER TABLE CONCURRENT DROP COLUMN ID_BLASON_DISTANCE_BLASONS_ALTERNATIF");
	}
	
	if(dbVersion < 42) {
		sql.executeUpdate("ALTER TABLE ARCHER ADD COLUMN ID_JEUX_CRITERES_DISCRIMINANT UUID");
		sql.executeUpdate("ALTER TABLE ARCHER ADD FOREIGN KEY (ID_JEUX_CRITERES_DISCRIMINANT) REFERENCES JEUX_CRITERES_DISCRIMINANT (ID_JEUX_CRITERES_DISCRIMINANT) ON UPDATE CASCADE ON DELETE RESTRICT");
	}
	
	if(dbVersion < 43) {
		sql.executeUpdate("ALTER TABLE CRITERE_CLASSEMENT ADD COLUMN ORDRE INTEGER");
	}
}

if(dbVersion != org.ajdeveloppement.concours.ApplicationCore.DB_RELEASE_REQUIRED) {
	//mise à jour du numero de version de la base
	sql.executeUpdate("UPDATE PARAM SET DBVERSION=" + org.ajdeveloppement.concours.ApplicationCore.DB_RELEASE_REQUIRED + ";");
}
