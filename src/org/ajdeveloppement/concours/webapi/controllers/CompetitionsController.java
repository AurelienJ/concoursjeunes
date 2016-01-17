package org.ajdeveloppement.concours.webapi.controllers;

import java.util.List;

import org.ajdeveloppement.commons.lifetime.LifeManager;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.concours.data.T_Competition;
import org.ajdeveloppement.concours.webapi.models.CompetitionModelView;
import org.ajdeveloppement.concours.webapi.models.JsDataTables;
import org.ajdeveloppement.concours.webapi.services.CompetitionsService;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.UrlParameter;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;

@WebApiController
public class CompetitionsController {
	
	/**
	 * Renvoie toutes les competitions
	 * @param context
	 * @return
	 */
	@HttpService(key="competitionsDataTable")
	public static JsDataTables getCompetitionsDataTable(HttpContext context,
			@UrlParameter("search[value]") String searchValue,
			@UrlParameter("length") int length,
			@UrlParameter("start") int start,
			@UrlParameter("draw") int draw) {
		CompetitionsService service = LifeManager.get(CompetitionsService.class);
		
		int nbTotalEntites = service.countAllCompetitions();
		
		QFilter filter = null;
		if(searchValue != null && !searchValue.isEmpty()) {
			@SuppressWarnings("nls")
			String searchPattern = String.format("%%%s%%", searchValue.toUpperCase());
			filter = T_Competition.LIEU.upper().like(searchPattern);
		}
		
		int nbFilteredEntites =  nbTotalEntites;
		if(filter != null)
			nbFilteredEntites = service.countCompetitionsWithFilter(filter);
		
		int offset = -1;
		if(length > 0)
			offset = start;
				
		JsDataTables jsDataTables = new JsDataTables();
		jsDataTables.setDraw(draw);
		jsDataTables.setRecordsTotal(nbTotalEntites);
		jsDataTables.setRecordsFiltered(nbFilteredEntites);
		jsDataTables.setData(service.getCompetitionsForFilter(filter, length, offset));
		
		return jsDataTables;
	}
	
	/**
	 * Renvoie toutes les competitions
	 * @param context
	 * @return
	 */
	@HttpService(key="competitions")
	public static List<CompetitionModelView> getCompetitions(HttpContext context) {
		CompetitionsService service = LifeManager.get(CompetitionsService.class);
		
		return service.getAllCompetitions();
	}
}
