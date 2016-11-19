package org.ajdeveloppement.concours.webapi.views;

import java.util.Date;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface ArcherView extends ContactView {

	/**
	 * Retourne le numéro de licence de l'archer
	 * 
	 * @return le numéro de licence (pour la ffta, 6 chiffres + 1 lettre)
	 */
	String getNumLicenceArcher();

	/**
	 * Indique si l'archer possède ou non un certificat medical de non contre indiquation
	 * à la pratique du tir à l'arc en competition
	 * 
	 * @return true si l'archer possède un certificat, false sinon
	 */
	Date getCertificat();

	/**
	 * Est ce que l'archer est handicapé ou non?
	 * 
	 * @return true si l'archer est handicapé, false sinon
	 */
	boolean isHandicape();

}