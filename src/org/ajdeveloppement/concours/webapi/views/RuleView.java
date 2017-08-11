package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.data.Rule.TypeReglement;
import org.ajdeveloppement.concours.data.Tie;
import org.ajdeveloppement.webserver.viewbinder.annotations.CollectionType;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface RuleView {
	
	/**
	 * Retourne l'identifiant du réglement en base ou 0 si non lié à la base. Information non sérialisé en XML
	 * 
	 * @return Identifiant du réglement en base
	 */
	@Implementation(methodModelToView="getIdRule")
	UUID getId();

	/**
	 * Retourne le nom du règlement
	 * 
	 * @return le nom du règlement
	 */
	String getName();

	/**
	 * Retourne la description du réglement
	 * 
	 * @return la description du règlement
	 */
	String getDescription();

	/**
	 * Retourne le type de règlement
	 * 
	 * @return reglementType le type de règlement
	 */
	TypeReglement getReglementType();

	/**
	 * @return listDistancesEtBlason
	 */
	@CollectionType(DistanceAndFacesSetView.class)
	List<DistanceAndFacesSetView> getDistancesAndFaces();

	/**
	 * Retourne le nombre de flèche tiré par volée imposé par le règlement
	 * <p>
	 * La valeur par défaut est fixé à 3
	 * 
	 * @return le nombre de flèches tiré par volée
	 */
	int getNbFlecheParVolee();

	/**
	 * Donne le nombre de points maximum possible par flèche avec le réglement
	 * 
	 * @return nbPointsParFleche le nombre de points maximum possible par flèche
	 */
	int getNbPointsParFleche();

	/**
	 * Retourne le nombre maximum de concurrents que peut contenir une équipe
	 * sur un concours avec ce règlement
	 * <p>
	 * La valeur par défaut est fixé à 4
	 * 
	 * @return le nombre maximum de concurrents que peut contenir une équipe
	 */
	int getNbMembresEquipe();

	/**
	 * Retourne le nombre de concurrents, membre d'une équipe dont les points seront
	 * comptabilisés pour le classement par équipe
	 * <p>
	 * La valeur par défaut est fixé à 3
	 * 
	 * @return le nombre de concurrents d'une équipe dont les points seront comptabilisés
	 */
	int getNbMembresRetenu();

	/**
	 * Retourne le nombre de séries de volées (distances) que compte le concours
	 *   
	 * @return le nombre de séries devant être réalisé sur le concours
	 */
	int getNbSerie();

	/**
	 * Définit le nombre de volées que devra tirer un archer dans une série
	 * 
	 * @return le nombre de volées dans une série
	 */
	int getNbVoleeParSerie();

	/**
	 * Retourne la liste des champs de départage
	 * 
	 * @return la liste des départage
	 */
	@CollectionType(Tie.class)
	List<Tie> getTie();

	/**
	 * Permet d'identifié le règlement comme officiel ou non.<br>
	 * Un règlement officiel ne devrait pas être altéré au cours de sa vie.
	 * 
	 * @return true si le règlement est qualifié d'officiel, false dans le cas
	 *         contraire.
	 */
	boolean isOfficialReglement();

	/**
	 * Retourne l'entité associé au reglement
	 * 
	 * @return l'entité associé au reglement
	 */
	EntiteView getEntite();

	/**
	 * Retourne le numéro de la catégorie du règlement<br>
	 * La correspondance entre les numéros de catégorie et leurs libellé
	 * sont stockés dans la table CATEGORIE_REGLEMENT
	 * 
	 * @return le numéro de la catégorie du règlement
	 */
	int getIdCategory();

	/**
	 * Indique si le règlement peut être supprimé de la base ou non
	 * 
	 * @return removable <code>true</code> si le règlement peut être supprimé.
	 */
	boolean isRemovable();

	/**
	 * @return rankingCriteria
	 */
	@CollectionType(RankingCriterionView.class)
	List<RankingCriterionView> getRankingCriteria();

}