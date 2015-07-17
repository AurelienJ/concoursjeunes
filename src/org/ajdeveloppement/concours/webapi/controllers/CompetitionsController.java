package org.ajdeveloppement.concours.webapi.controllers;

import java.util.List;

import org.ajdeveloppement.commons.lifetime.LifeManager;
import org.ajdeveloppement.concours.webapi.models.CompetitionModelView;
import org.ajdeveloppement.concours.webapi.services.CompetitionsService;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService.Type;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;

@WebApiController
public class CompetitionsController {
	
	/**
	 * Renvoie toutes les competitions
	 * @param context
	 * @return
	 */
	@HttpService(key="competitions", type=Type.JSON)
	public static List<CompetitionModelView> getCompetitions(HttpContext context) {
		CompetitionsService service = LifeManager.get(CompetitionsService.class);
		
		return service.getAllCompetition();
	}
}
