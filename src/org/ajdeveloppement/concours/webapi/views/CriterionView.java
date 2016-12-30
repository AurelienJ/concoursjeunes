package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.webapi.mappers.CriterionMapper;
import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface CriterionView {

	/**
	 * @return id
	 */
	UUID getId();

	/**
	 * Renvoi le code du critère
	 * @return le code du critère
	 */
	String getCode();

	/**
	 * Renvoie le libellé du critère
	 * 
	 * @return le libellé du critère
	 */
	String getLibelle();

	/**
	 * Retourne le numéro d'ordre d'affichage du critère
	 * 
	 * @return le numéro d'ordre d'affichage du critère
	 */
	int getNumordre();
	
	@Implementation(mapperClass=CriterionMapper.class,methodModelToView="getIdFederation")
	UUID getIdFederation();

	/**
	 * Retourne la liste des éléments lié au critère
	 * 
	 * @return la liste des éléments du critère
	 */
	@CollectionType(CriterionElementView.class)
	List<CriterionElementView> getCriterionElements();

}