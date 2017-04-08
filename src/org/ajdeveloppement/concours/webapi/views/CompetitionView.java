package org.ajdeveloppement.concours.webapi.views;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.concours.data.CompetitionLevel;

public interface CompetitionView {

	/**
	 * @return idCompetition
	 */
	UUID getId();

	/**
	 * @return organisateur
	 */
	EntiteView getOrganisateur();

	/**
	 * @return lieuCompetition
	 */
	String getLieuCompetition();

	/**
	 * @return competitionLevel
	 */
	CompetitionLevel getCompetitionLevel();

	/**
	 * @return dateDebutConcours
	 */
	Date getDateDebutConcours();


	/**
	 * @return dateFinConcours
	 */
	Date getDateFinConcours();

	/**
	 * @return gestionDuel
	 */
	boolean isGestionDuel();

	/**
	 * @return reglement
	 */
	RuleView getReglement();

	/**
	 * @return judge
	 */
	List<CompetitionJudgeView> getJudges();

}