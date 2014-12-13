package org.ajdeveloppement.concours.plugins.scriptext;

import org.ajdeveloppement.concours.ui.ConcoursJeunesFrame;
import org.concoursjeunes.Profile;

public interface ScriptExtInterface {
	/**
	 * Execute les opérations de chargement du script
	 * 
	 * @param parentframe
	 * @param profile
	 */
	public void start(ConcoursJeunesFrame parentframe, Profile profile);
	
	/**
	 *  Execute les opérations de déchargement du script
	 */
	public void stop();
}
