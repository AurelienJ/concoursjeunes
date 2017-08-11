package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.DistanceAndFacesSetMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface DistanceAndFacesView {

	/**
	 * @return id
	 */
	UUID getId();

	/**
	 * @return distance
	 */
	double getDistance();

	/**
	 * @return serie
	 */
	int getSerie();

	/**
	 * @return facesDistanceAndFaces
	 */
	List<FaceDistanceAndFacesView> getFacesDistanceAndFaces();

	/**
	 * Retourne le blason par défaut associé à la série
	 * @return
	 */
	@Implementation(mapperClass=DistanceAndFacesSetMapper.class, methodModelToView="getIdFace")
	UUID getDefaultFace();

}