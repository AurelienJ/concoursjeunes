/*
 * Exemple de script
 * 
 * Doc javascript dans une application java:
 * http://docs.oracle.com/javase/6/docs/technotes/guides/scripting/programmer_guide/index.html
 * 
 * Doc API concoursjeunes:
 * http://hudson.ajdeveloppement.org/job/ConcoursJeunes_2.3_Release/javadoc/
 * 
 * Les fonctions load() et unload() ne doivent pas être supprimées pour que le script 
 * fonctionne
 * 
 * @author: <Votre Nom>
 */
 
//Charge de manière global le package javax.swing pour eviter de prefixer les class
//de ce package dans la suite du code
var swing = new JavaImporter(javax.swing);

with(swing) {

	/**
	 * !! Ne Pas supprimer !
	 * Charge le script
	 *
	 * @param parentframe la fenetre parente
	 * @param profile le profile utilisateur courant
	 */
	function load(parentframe, profile) {
		//Inserer ici le code de votre script
		
		//Exemple: code de trace d'execution pour débugage
		print("debug");
	
		
		//Affichage d'une boite de dialogue
		JOptionPane.showMessageDialog(parentframe,
			"Hello World!", "Test", javax.swing.JOptionPane.WARNING_MESSAGE);
	}
	
	/**
	 * !! Ne Pas supprimer !
	 * Décharge le script
	 */
	function unload() {
	}
}
