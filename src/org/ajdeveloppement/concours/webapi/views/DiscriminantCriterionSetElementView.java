package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.DiscriminantCriterionSetMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface DiscriminantCriterionSetElementView {

	/**
	 * @return criterionElement
	 */
	@Implementation(mapperClass=DiscriminantCriterionSetMapper.class, methodModelToView="getIdCriterionElement")
	UUID getIdCriterionElement();

	/**
	 * @return ordre
	 */
	int getOrdre();

}