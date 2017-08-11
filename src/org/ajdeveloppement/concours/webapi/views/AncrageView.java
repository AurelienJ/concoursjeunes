package org.ajdeveloppement.concours.webapi.views;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface AncrageView {

	/**
	 * Retourne l'emplacement sur la cible de l'ancrage. Correspond aux valeur des
	 * variables static <code>POSITION_</code>
	 * 
	 * @return l'emplacement sur la cible de l'ancrage.
	 */
	int getEmplacement();

	/**
	 * Retourne la position relative du blason sur l'axe horizontal<br>
	 * Les positions sont exprimé en fraction de la taille de la cible
	 * (valeur comprise entre 0 et 1)
	 * 
	 * @return la fraction correspondant à la position du blason sur l'axe X
	 */
	double getX();

	/**
	 * Retourne la position relative du blason sur l'axe vertical<br>
	 * Les positions sont exprimé en fraction de la taille de la cible
	 * (valeur comprise entre 0 et 1)
	 * 
	 * @return la fraction correspondant à la position du blason sur l'axe Y
	 */
	double getY();

}