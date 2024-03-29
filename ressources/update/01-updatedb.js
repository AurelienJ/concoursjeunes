//mapping:
// int dbVersion - version de la base de donnée
// SqlManager sql - moteur de base de données

function updateReglements() {
	//liste l'ensemble des fichiers de réglements
	var updatePath = new java.io.File(org.concoursjeunes.ApplicationCore.staticParameters.getResourceString("path.ressources"), "update");
	var reglements = org.ajdeveloppement.commons.io.FileUtils.listAllFiles(updatePath, ".*\\.reglement");
	var rManager = org.concoursjeunes.manager.ReglementManager.getInstance();
	for(var i = 0; i < reglements.size(); i++) {
		rManager.importReglement(reglements.get(i));
	}
}

if(dbVersion == 0) {
	//passe l'ensemble des scripts de base
	sql.executeScript("01-create_db.sql");
	sql.executeScript("../sql/ImportClubFFTA.sql");
	sql.executeUpdate("RUNSCRIPT FROM 'ressources/sql/ImportVillesFr.sql'");
	//sql.executeScript("../sql/ImportVillesFr.sql");
	
	updateReglements();
	sql.executeScript("../sql/ImportClubLFBTA.sql");
} else {
	if(dbVersion < 20) {
		sql.executeScript("01-dropoldtable.sql");
		sql.executeScript("01-create_db.sql");
		
		sql.executeUpdate("ALTER TABLE ENTITE ADD DATEMODIF DATE DEFAULT CURRENT_DATE()");
	}
	
	if(dbVersion < 21) {
		sql.executeUpdate("update REGLEMENT set REMOVABLE=FALSE where NOMREGLEMENT like 'FFTA%'");
	}

	if(dbVersion < 30) {
		sql.executeScript("02-V21toV30.sql", true);
		sql.executeScript("../sql/ImportClubFFTA.sql");
		sql.executeUpdate("RUNSCRIPT FROM 'ressources/sql/ImportVillesFr.sql'");
		
		updateReglements();
		sql.executeScript("../sql/ImportClubLFBTA.sql");
	} else if(dbVersion < 31) {

		sql.executeUpdate("ALTER TABLE CONTACT ADD UPPER_NAME IF NOT EXISTS VARCHAR(128) as UPPER(NAME)");
		sql.executeUpdate("CREATE INDEX IF NOT EXISTS I_UPPER_NAME ON CONTACT (UPPER_NAME ASC)");
	}
	
	if(dbVersion < 32) {
		sql.executeUpdate("UPDATE BLASONS SET IMAGE='targetface_ffta_beursault.gif' WHERE NUMBLASON=8");
		//sql.executeUpdate("UPDATE BLASONS SET IMAGE='targetface_ffta_beursault.gif' WHERE NUMBLASON=8");
	}
	
	if(dbVersion < 33) {
		sql.executeUpdate("MERGE INTO BLASONS VALUES (10, STRINGDECODE('80cm R\u00e9duit (5-10)'), 0.5, 0.5, 1, 79, 'targetface_fita_80_reducted.png');");
		sql.executeUpdate("MERGE INTO BLASONS VALUES (11, STRINGDECODE('60cm R\u00e9duit (8-10)'), 0.5, 0.5, 1, 58, 'targetface_fita_60_reducted.png')");
		sql.executeUpdate("MERGE INTO ANCRAGES_BLASONS VALUES (11, 0, 0, 0)");
		sql.executeUpdate("MERGE INTO ANCRAGES_BLASONS VALUES (11, 1, 0.5, 0)");
		sql.executeUpdate("MERGE INTO ANCRAGES_BLASONS VALUES (11, 2, 0, 0.5)");
		sql.executeUpdate("MERGE INTO ANCRAGES_BLASONS VALUES (11, 3, 0.5, 0.5)");
		
		updateReglements();
	}
	
	if(dbVersion < 34) {
		sql.executeUpdate("UPDATE FEDERATION SET NUMFEDERATION=(SELECT MAX(NUMFEDERATION)+1 FROM FEDERATION) WHERE NUMFEDERATION=0");
	}
	if(dbVersion < 35) {
		sql.executeUpdate("delete from criteriaset where numcriteriaset in (select cs1.numcriteriaset  from criteriaset cs1 inner join criteriaset  cs2 on cs2.Idcriteriaset=REPLACE(cs1.IDCRITERIASET, 'R=0,',CONCAT('R=',cs1.NUMREGLEMENT,',')) where cs1.Idcriteriaset like 'R=0,%')");
		sql.executeUpdate("UPDATE CRITERIASET SET IDCRITERIASET=REPLACE(IDCRITERIASET, 'R=0,',CONCAT('R=',NUMREGLEMENT,','))");
	}
}

if(dbVersion != org.concoursjeunes.ApplicationCore.DB_RELEASE_REQUIRED) {
	//mise à jour du numero de version de la base
	sql.executeScript("99-updatedbver.sql");
}
