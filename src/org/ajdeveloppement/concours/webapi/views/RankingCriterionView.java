package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

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

	/**
	 * @return distanceAndFacesSet
	 */
	DistanceAndFacesSetView getDistanceAndFacesSet();

}