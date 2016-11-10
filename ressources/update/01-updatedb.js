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

if(dbVersion == 0) {
	//passe l'ensemble des scripts de base
	sql.executeScript("01-create_db.sql",true);
	sql.executeScript("01-create_db-webserver.sql",true);
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
		sql.executeUpdate("alter table ARCHER drop column CERTIFMEDICAL");
		sql.executeUpdate("alter table ARCHER add column CERTIFMEDICAL DATE NULL");
	}
}

//sql.executeScript("01-create_db-webserver.sql",true);

if(dbVersion != org.ajdeveloppement.concours.ApplicationCore.DB_RELEASE_REQUIRED) {
	//mise à jour du numero de version de la base
	sql.executeScript("99-updatedbver.sql");
}
