package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.DistanceAndFacesSetMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface FaceDistanceAndFacesView {

	/**
	 * @return id
	 */
	UUID getId();

	/**
	 * @return face
	 */
	@Implementation(mapperClass=DistanceAndFacesSetMapper.class, methodModelToView="getIdFace")
	UUID getFace();

	/**
	 * @return principal
	 */
	boolean isPrincipal();

}