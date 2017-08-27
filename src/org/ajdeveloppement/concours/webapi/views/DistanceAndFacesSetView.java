package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface DistanceAndFacesSetView {

	/**
	 * @return id
	 */
	UUID getId();
	
	String getTempId();

	/**
	 * @return name
	 */
	String getName();

	/**
	 * @return distancesAndFaces
	 */
	@CollectionType(DistanceAndFacesView.class)
	List<DistanceAndFacesView> getDistancesAndFaces();

}