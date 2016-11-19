package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.concours.data.Coordinate.Type;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface CoordinateView {

	/**
	 * returne id of coordinate. Id is an unique database identifier
	 * for coordinate
	 * 
	 * @return id of coordinate
	 */
	UUID getIdCoordinate();

	/**
	 * Get type of the coordinate see {@link Type} for more information
	 * 
	 * @return type of coordinate
	 */
	Type getCoordinateType();

	/**
	 * Get the coordinate value
	 * 
	 * @return the coordinate value
	 */
	String getValue();

}