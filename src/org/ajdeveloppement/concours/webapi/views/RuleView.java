package org.ajdeveloppement.concours.webapi.views;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.concours.data.Competition;
import org.ajdeveloppement.concours.data.CriteriaSet;
import org.ajdeveloppement.concours.data.Criterion;
import org.ajdeveloppement.concours.data.DistancesEtBlason;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.RankingCriterion;
import org.ajdeveloppement.concours.data.Rule.TypeReglement;
import org.ajdeveloppement.concours.data.RulesCategory;
import org.ajdeveloppement.concours.data.Surclassement;
import org.ajdeveloppement.concours.data.Tie;
import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View()
public interface RuleView {

	/**
	 * Retourne le numéro de version interne du règlement.
	 * La version courante retourné par un fichier sérialisé devrais être 2.
	 * Si c'est 1 alors envisager de passer par une routine de mise à jour des réglements (opération
	 * généralement effectué par l'extension PhoenixPlugin)
	 * 
	 * @return version le numéro de version du règlement.
	 */
	int getVersion();

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
	 * @return competition
	 */
	Competition getCompetition();

	/**
	 * <p>
	 * Retourne la liste des critères de distinction des archers pouvant être
	 * utilisé sur les concours exploitant ce règlement.
	 * </p>
	 * <p>
	 * Les critères retournés peuvent être soit determinant pour le classement,
	 * le placement, les deux ou simplement informatif.
	 * </p>
	 * 
	 * @return la liste des critères de distinction utilisé pour le règlement
	 */
	List<CriterionView> getListCriteria();

	/**
	 * Retourne le tableau de surclassement à appliquer sur
	 * le règlement
	 * 
	 * @return le tableau de surclassement
	 */
	List<Surclassement> getSurclassements();

	/**
	 * Retourne, si il existe, le surclassement associé au jeux de critère
	 * 
	 * @param criteriaSet le jeux de critère petentielement surclassé ou désactivé
	 * @return le surclassement si exisant
	 */
	Surclassement getSurclassement(CriteriaSet criteriaSet);

	/**
	 * @return placementCriteriaSet
	 */
	List<CriteriaSet> getListPlacementCriteriaSet();

	/**
	 * @return listDistancesEtBlason
	 */
	List<DistancesEtBlason> getListDistancesEtBlason();

	/**
	 * Renvoi la politique de placement.
	 * 
	 * @return Renvoi le filtre de critère en place
	 *         pour le placement des archers
	 */
	Map<Criterion, Boolean> getPlacementFilter();

	/**
	 * Retourne la liste des critères de classement valide sur le règlement,
	 * sont donc exclue de la liste les jeux de critères surclassé ou interdit
	 * 
	 * @return liste des critères de classement valide sur le règlement
	 */
	List<CriteriaSet> getValidClassementCriteriaSet();

	/**
	 * Retourne la liste des critères de placement valide sur le règlement,
	 * sont donc exclue de la liste les jeux de critères surclassé ou interdit
	 * 
	 * @return liste des critères de placement valide sur le règlement
	 */
	List<CriteriaSet> getValidPlacementCriteriaSet();

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
	Entite getEntite();

	/**
	 * Retourne le numéro de la catégorie du règlement<br>
	 * La correspondance entre les numéros de catégorie et leurs libellé
	 * sont stockés dans la table CATEGORIE_REGLEMENT
	 * 
	 * @return le numéro de la catégorie du règlement
	 */
	RulesCategory getCategory();

	/**
	 * Indique si le règlement peut être supprimé de la base ou non
	 * 
	 * @return removable <code>true</code> si le règlement peut être supprimé.
	 */
	boolean isRemovable();

	/**
	 * @return rankingCriteria
	 */
	List<RankingCriterion> getRankingCriteria();

}