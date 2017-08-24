package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface DiscriminantCriterionSetView {

	/**
	 * @return idDiscriminantCriterionSet
	 */
	@Implementation(methodModelToView="getIdDiscriminantCriterionSet")
	UUID getId();
	
	@Implementation(methodModelToView="toString")
	String getName();

	/**
	 * @return elements
	 */
	@CollectionType(DiscriminantCriterionSetElementView.class)
	List<DiscriminantCriterionSetElementView> getElements();

}