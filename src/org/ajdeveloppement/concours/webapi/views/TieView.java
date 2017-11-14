package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface TieView {

	/**
	 * @return idDepartage
	 */
	UUID getIdDepartage();

	/**
	 * @return fieldName
	 */
	String getFieldName();

	/**
	 * @return numOrdre
	 */
	int getNumOrdre();

}