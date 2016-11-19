package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.webserver.services.webapi.helpers.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface CivilityView {

	/**
	 * Get database id of civility. Can be <code>null</code>
	 * if civility is not in database and never serialised
	 * 
	 * @return id of civility
	 */
	@Implementation(methodModelToView="getIdCivility")
	UUID getId();

	/**
	 * Get short form of Civility (ex: M., Mr.,Mrs.)
	 * 
	 * @return short form of Civility
	 */
	String getAbreviation();

	/** 
	 * Get long form of civility (ex: Mister, Misses)
	 * 
	 * @return long form of civility
	 */
	String getLibelle();

	/**
	 * Get if a civility is corporate or physical
	 * 
	 * @return <code>true</code> if it's a corporate civility, <code>false</code> else
	 */
	boolean isMorale();

}