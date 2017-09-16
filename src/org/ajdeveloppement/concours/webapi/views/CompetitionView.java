package org.ajdeveloppement.concours.webapi.views;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.CompetitionMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface CompetitionView {

	/**
	 * Return the id of competition
	 * 
	 * @return the id of competition
	 */
	@Implementation(methodModelToView="getIdCompetition")
	UUID getId();
	
	/**
	 * Return the name of competition
	 * 
	 * @return the name of competition
	 */
	@Implementation(methodModelToView="getNom")
	String getName();
	
	/**
	 * @return reglement
	 */
	@Implementation(mapperClass=CompetitionMapper.class, methodModelToView="getIdRule")
	UUID getIdRule();

	/**
	 * @return organisateur
	 */
	@Implementation(mapperClass=CompetitionMapper.class, methodModelToView="getIdOrganisator")
	UUID getIdOrganisator();

	/**
	 * @return lieuCompetition
	 */
	@Implementation(methodModelToView="getLieuCompetition")
	String getPlace();
	
	@Implementation(mapperClass=CompetitionMapper.class, methodModelToView="getDates")
	@CollectionType(Date.class)
	List<Date> getDates();
	
	/**
	 * @return gestionDuel
	 */
	@Implementation(methodModelToView="isGestionDuel")
	boolean isDuel();

	/**
	 * @return competitionLevel
	 */
	@Implementation(mapperClass=CompetitionMapper.class, methodModelToView="getIdNiveauCompetition")
	UUID getIdNiveauCompetition();
	
	int getTargetsNumber();
	
	int getStartsNumber();

	/**
	 * @return judge
	 */
	@CollectionType(CompetitionJudgeView.class)
	List<CompetitionJudgeView> getJudges();

}