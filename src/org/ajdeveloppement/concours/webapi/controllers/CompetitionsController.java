package org.ajdeveloppement.concours.webapi.controllers;

import java.util.List;

import javax.inject.Inject;

import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.concours.data.T_Competition;
import org.ajdeveloppement.concours.webapi.annotations.Authorize;
import org.ajdeveloppement.concours.webapi.models.CompetitionModelView;
import org.ajdeveloppement.concours.webapi.models.JsDataTables;
import org.ajdeveloppement.concours.webapi.services.CompetitionsService;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.UrlParameter;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;

@WebApiController
public class CompetitionsController {
	
	private HttpContext context;
	
	private CompetitionsService service;
	
	@Inject
	public CompetitionsController(HttpContext context, CompetitionsService service) {
		this.context = context;
		this.service = service;
		
		context.addHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Pragma", "no-cache"); // HTTP 1.0. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Expires", "0"); // Proxies. //$NON-NLS-1$ //$NON-NLS-2$
	}
	
	/**
	 * Renvoie toutes les competitions
	 * @param context
	 * @return
	 */
	@HttpService(key="competitionsDataTable")
	public JsDataTables getCompetitionsDataTable(
			@UrlParameter("search[value]") String searchValue,
			@UrlParameter("length") int length,
			@UrlParameter("start") int start,
			@UrlParameter("draw") int draw) {
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
	@Authorize(value={})
	public List<CompetitionModelView> getCompetitions() {
		return service.getAllCompetitions();
	}
}
