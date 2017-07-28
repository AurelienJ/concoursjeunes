package org.ajdeveloppement.concours.webapi.views;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.PersonMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View(defaultMapperClass=PersonMapper.class)
public interface ContactView {

	@Implementation(mapperClass=PersonMapper.class, methodModelToView="getType")
	String getType();
	
	/**
	 * Get the id of contact
	 * 
	 * @return idContact
	 */
	@Implementation(methodModelToView="getIdContact")
	UUID getId();

	/**
	 * Get the name of contact
	 * 
	 * @return name of contact
	 */
	String getName();

	/**
	 * Get the first Name of contact 
	 * 
	 * @return the first Name of contact
	 */
	String getFirstName();

	/**
	 * @return dateNaissance
	 */
	Date getDateNaissance();

	/**
	 * @return sexe
	 */
	int getSexe();

	/**
	 * Get the civility of contact
	 * 
	 * @return the civility of contact
	 */
	@Implementation(mapperClass=PersonMapper.class, methodModelToView="getIdCivility", methodViewToModel="setIdCivility")
	UUID getIdCivility();

	/**
	 * Get the post address of contact
	 * 
	 * @return the post address of contact
	 */
	String getAddress();

	/**
	 * Get the post zip code of contact
	 * 
	 * @return the post zip code of contact
	 */
	String getZipCode();

	/**
	 * Get the residence city of contact
	 * 
	 * @return the residence city of contact
	 */
	String getCity();

	/**
	 * @return countryCode
	 */
	String getCountryCode();

	/**
	 * Get free note about contact
	 * 
	 * @return free note about contact
	 */
	String getNote();

	/**
	 * @return login
	 */
	String getLogin();

	/**
	 * @return language
	 */
	String getLanguage();

	/**
	 * @return highlightExAequo
	 */
	boolean isHighlightExAequo();

	/**
	 * @return uncumuledInput
	 */
	boolean isUncumuledInput();

	/**
	 * Get coordinates of contact (phone, fax, mail)
	 * 
	 * @return coordinates of contact
	 */
	@CollectionType(CoordinateView.class)
	List<CoordinateView> getCoordinates();

	/**
	 * Get categories of contact
	 * 
	 * @return categories the categories of contact
	 */
	@CollectionType(UUID.class)
	@Implementation(mapperClass=PersonMapper.class, methodModelToView="getCategories",methodViewToModel="setCategories")
	List<UUID> getCategories();

	/**
	 * Get entity associate with contact
	 * @return entity associate with contact
	 */
	@Implementation(mapperClass=PersonMapper.class, methodModelToView="getIdEntity",methodViewToModel="setIdEntity")
	UUID getIdEntity();

	/**
	 * @return dateModification
	 */
	Date getDateModification();

}