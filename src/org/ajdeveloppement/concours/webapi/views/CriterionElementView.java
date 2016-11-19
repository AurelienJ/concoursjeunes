package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface CriterionElementView {

	UUID getid();
	/**
	 * Renvoie le code de l'élément
	 * 
	 * @return le code de l'élément
	 */
	String getCode();

	/**
	 * Renvoi le libellé de l'élément
	 * 
	 * @return le libellé de l'élément
	 */
	String getLibelle();

	/**
	 * Retourne le numéro d'ordre d'affichage de l'élément
	 * 
	 * @return le numéro d'ordre d'affichage de l'élément
	 */
	int getNumordre();

}