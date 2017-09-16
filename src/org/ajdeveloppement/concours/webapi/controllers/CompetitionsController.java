package org.ajdeveloppement.concours.webapi.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.concours.data.Competition;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.webapi.annotations.Authorize;
import org.ajdeveloppement.concours.webapi.mappers.CompetitionMapper;
import org.ajdeveloppement.concours.webapi.services.CompetitionsService;
import org.ajdeveloppement.concours.webapi.views.CompetitionView;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpResponse;
import org.ajdeveloppement.webserver.HttpReturnCode;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.Body;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpServiceId;
import org.ajdeveloppement.webserver.services.webapi.annotations.UrlParameter;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;
import org.ajdeveloppement.webserver.viewbinder.ViewsFactory;

@WebApiController
public class CompetitionsController {
	
	private HttpContext context;
	
	private CompetitionsService service;
	
	private CompetitionMapper mapper;
	
	@Inject
	public CompetitionsController(HttpContext context, CompetitionsService service, CompetitionMapper mapper) {
		this.context = context;
		this.service = service;
		this.mapper = mapper;
		
		context.addHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Pragma", "no-cache"); // HTTP 1.0. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Expires", "0"); // Proxies. //$NON-NLS-1$ //$NON-NLS-2$
	}
	
	/**
	 * Convert a Competition to CompetitionView
	 * 
	 * @param contact
	 * @return
	 */
	private CompetitionView toView(Competition competition) {
		return ViewsFactory.getView(CompetitionView.class, null, Competition.class, competition, service.getClass().getClassLoader());
	}
	
	/**
	 * Convert a Competition list to CompetitionView list
	 * 
	 * @param contacts
	 * @return
	 */
	private List<CompetitionView> toViewsList(List<Competition> competitions) {
		return competitions.stream()
				.map(c -> toView(c))
				.collect(Collectors.toList());
	}
	
	@HttpService(key = "countcompetitions")
	@Authorize(value={})
	public int countCompetitions(@UrlParameter("search") String search) {
		QFilter filter = service.getFilter( search);

		return service.countCompetitionsWithFilter(filter);
	}
	
	@HttpService(key="competitions")
	@Authorize(value={})
	public List<CompetitionView> getCompetitions(
			@UrlParameter("search") String search,
			@UrlParameter("start") int offset,
			@UrlParameter("length") int length,
			@UrlParameter("sortBy") String sortBy,
			@UrlParameter("sortOrder") String sortOrder) {
		QFilter filter = service.getFilter( search);

		return toViewsList(service.getCompetitionsForFilter(filter, length, offset));
	}
	
	/**
	 * Renvoie toutes les competitions
	 * 
	 * @param context
	 * @return
	 */
	@HttpService(key="competitions")
	@Authorize(value={})
	public List<CompetitionView> getCompetitions() {
		return toViewsList(service.getAllCompetitions());
	}
	
	@HttpService(key="competitions")
	@Authorize(value={})
	public CompetitionView getCompetition(@HttpServiceId UUID idCompetition) {
		return toView(service.getCompetition(idCompetition));
	}
	
	@HttpService(key="competitions", methods={ HttpMethod.PUT, HttpMethod.POST })
	@Authorize(value={})
	public CompetitionView saveCompetition(@Body CompetitionView view) throws ObjectPersistenceException {
		Competition competition = mapper.toCompetition(view);
		
		Contact user = context.getMetadata("User");
		if(user != null && user.getEntite() != null) {
			
			if(competition.getOrganisateur() == null)
				competition.setOrganisateur(user.getEntite());
			else if(competition.getOrganisateur() != user.getEntite()) {
				context.setCustomResponse(new HttpResponse(HttpReturnCode.ClientError.Forbidden, "plain/text",
						"You are not owner of this competition"));
				
				return null;
			}
			
			service.saveCompetition(competition);
			
			return toView(competition);
		}
		
		return null;
	}
}
