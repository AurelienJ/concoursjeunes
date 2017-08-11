package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface CompetitionJudgeView {

	UUID getIdJudge();

	/**
	 * Indique si l'arbitre est responsable
	 * 
	 * @return true si l'arbitre est responsable sur le concours
	 */
	boolean isResponsable();

}