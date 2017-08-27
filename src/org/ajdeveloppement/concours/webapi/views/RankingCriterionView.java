package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.RankingCriterionMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface RankingCriterionView {

	/**
	 * @return id
	 */
	UUID getId();

	/**
	 * @return name
	 */
	String getName();

	/**
	 * @return teamCriterion
	 */
	boolean isTeamCriterion();
	
	int getOrdre();

	/**
	 * @return distanceAndFacesSet
	 */
	@Implementation(mapperClass=RankingCriterionMapper.class, methodModelToView="getIdDistancesAndFacesSet")
	UUID getIdDistancesAndFacesSet();
	
	String getIdTempDistancesAndFacesSet();
	
	@CollectionType(DiscriminantCriterionSetView.class)
	@Implementation(methodModelToView="getDiscriminantCriterionSet")
	List<DiscriminantCriterionSetView> getDiscriminantCriterionSets();

}