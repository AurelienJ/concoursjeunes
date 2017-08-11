package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface DistanceAndFacesSetView {

	/**
	 * @return id
	 */
	UUID getId();

	/**
	 * @return name
	 */
	String getName();

	/**
	 * @return distancesAndFaces
	 */
	List<DistanceAndFacesView> getDistancesAndFaces();

}