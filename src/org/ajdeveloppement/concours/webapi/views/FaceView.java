package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;

public interface FaceView {

	/**
	 * Retourne le nom du blason
	 * 
	 * @return name le nom du blason
	 */
	String getName();

	/**
	 * Le ratio horizontal définissant le blason.<br>
	 * Le ratio représente une fraction de la taille de la cible (valeur comprise
	 * entre 0 et 1)
	 * 
	 * @return horizontalRatio le ratio horizontal de la cible
	 */
	double getHorizontalRatio();

	/**
	 * Le ratio vertical définissant le blason.<br>
	 * Le ratio représente une fraction de la taille de la cible (valeur comprise
	 * entre 0 et 1)
	 * 
	 * @return verticalRatio le ratio vertical de la cible
	 */
	double getVerticalRatio();

	/**
	 * Le nombre d'archer que peut supporter le blason<br>
	 * <i>par exemple un blason de 40 ne peut supporter qu'un seul archer,
	 * alors qu'un blason de 80 supporte jusqu'à 4 archers</i>
	 * 
	 * @return le nombre d'archer pouvant tiré sur le même blason
	 */
	int getNbArcher();

	/**
	 * Le numéro d'ordre de la cible. Le numéro d'ordre permet de classer
	 * les blasons dans l'ordre.
	 * 
	 * @return le numéro d'ordre du blason
	 */
	int getNumordre();

	/**
	 * Le numéro de blason tel que définit dans la base.<br>
	 * Ce numéro n'est pas destiné à être utilisé directement,
	 * mais uniquement par afin de permettre la persistance de l'objet
	 * 
	 * @return le numéro de reference du blason dans la base ou 0 si non définit 
	 */
	UUID getId();

	/**
	 * Retourne la table des points d'ancrages possible du blason
	 * 
	 * @return la table des points d'ancrages possible du blason
	 */
	@CollectionType(AncrageView.class)
	List<AncrageView> getAncrages();

	/**
	 * Retourne le nom du fichier image représentant le blason
	 * 
	 * @return le nom de l'image du blason
	 */
	String getTargetFaceImage();

}