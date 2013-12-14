loadScript("scripts/common/database/database.js");

function openDatabase() {
	var database = new Database();
	database.connectionString = "jdbc:mysql://192.168.0.5/concours?useUnicode=true&characterEncoding=UTF-8&useJvmCharsetConverters=true";
	database.user = "root";
	database.password ="aXRud3Ni";

	return database.connect();
}

function getNavigationContent(basePath) {
	var template = new org.ajdeveloppement.commons.AJTemplate();
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "class=\"selected\"");
	template.parse("selectedDocumentation", "");
	
	return template.output();
}

var mainTemplate = null;
var contentTemplate = null;
var dbConnection = null;

function init(basePath) {
	mainTemplate = new org.ajdeveloppement.commons.AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	mainTemplate.parse("TITRE","Actualités ArcCompetition");
	mainTemplate.parse("FILARIANNE", "<a href=\"logiciel.html\">Logiciel</a> &gt; Actualités");
	
	mainTemplate.parseBloc("head", "<link href=\"styles/actualites.css\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\" />");
	mainTemplate.parseBloc("navigation",getNavigationContent(basePath));
	
	contentTemplate = new org.ajdeveloppement.commons.AJTemplate();
	contentTemplate.loadTemplate(basePath + "/templates/actualites-logiciel.thtml");
}

function getMainContent(params) {
	
	var formatDate = new java.text.SimpleDateFormat("dd/MM/yyyy kk:mm:ss"); 
	
	contentTemplate.reset();
	
	if(dbConnection != null) {
		var sql = "";
		var prevIndex = 0;
		var lastArticle = -1;
		var indexArticle = 0;
		
		if(params != null &&params.containsKey("index")) {
			indexArticle = java.lang.Integer.parseInt(params.get("index"));
		}
		
		if(indexArticle != 0) {
			sql = "select max(NumArticle) as PrevIndex from (select NumArticle from AjArticle_Article where NumPage=1 and NumPartie=2 "
				 + "and NumArticle > ? order by NumArticle LIMIT 10) as A;";
			var pstmt = dbConnection.prepareStatement(sql);
			pstmt.setInt(1, indexArticle);
			
			var result = pstmt.executeQuery();
			try {
				if(result.next()) {
					prevIndex = result.getInt("PrevIndex");
				}
			} finally {
				result.close();
			}
		}
		
		var sql = "select NumArticle, DateArticle, NomArticle, Article, AuteurArticle,EnableCommentaires "
				+ "from AjArticle_Article where NumPage=1 and NumPartie=2 ";
		if(indexArticle != 0)
			sql += "and NumArticle <= ? ";
		sql += "order by DateArticle desc, NumArticle desc LIMIT 10;";
		
		var pstatement = dbConnection.prepareStatement(sql);
		if(indexArticle != 0)
			pstatement.setInt(1, indexArticle);
		var rs = pstatement.executeQuery();
		try {
			while(rs.next()) {
				lastArticle = rs.getInt("NumArticle");
				contentTemplate.parse("article.TitreArticle", rs.getString("NomArticle"));
				contentTemplate.parse("article.ContenuArticle", rs.getString("Article"));
				
				if(rs.getBoolean("EnableCommentaires")) {
					sql = "select count(*) as NbCommentaires from AjArticle_Commentaires "
							+ "where NumArticle=? and NumPage=1 and NumPartie=2";
					
					var nbCommentaires = 0;
					var commentaireArticles = dbConnection.prepareStatement(sql);
					commentaireArticles.setInt(1, lastArticle);
					var rsNbCommentaire = commentaireArticles.executeQuery();
					if(rsNbCommentaire.next()) {
						nbCommentaires = rsNbCommentaire.getInt("NbCommentaires");
					}
					
					if(nbCommentaires == 0)
						contentTemplate.parse("article.commentaire", "<a href=\"\">Ajouter votre commentaire</a> - ");
					else
						contentTemplate.parse("article.commentaire", "<a href=\"\">" + nbCommentaires + " commentaire</a> - ");
				}
				else
					contentTemplate.parse("article.commentaire", "");
				contentTemplate.parse("article.auteur", rs.getString("AuteurArticle"));
				contentTemplate.parse("article.date", formatDate.format(rs.getTimestamp("DateArticle")));
				
				contentTemplate.loopBloc("article");
			}
			
			if(prevIndex > 0) {
				contentTemplate.useBlocTemplate("suivant");
				contentTemplate.parse("suivant.index", prevIndex);
			} else {
				contentTemplate.parseBloc("suivant","");
			}
			
			if(lastArticle-1 > 1) {
				contentTemplate.useBlocTemplate("precedent");
				contentTemplate.parse("precedent.index", lastArticle-1);
			} else {
				contentTemplate.parseBloc("precedent","");
			}
		} finally {
			rs.close();
		}
	}
	
	return contentTemplate.output();
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	template.parseBloc("main",getMainContent(session.getUrlParameters()));
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}