/*
 * Créé le 18/01/2005 pour ArcCompetition
 *
 * Copyright 2002-2007 - Aurélien JEOFFRAY
 *
 * http://arccompetition.ajdeveloppement.org
 *
 * *** CeCILL Terms *** 
 *
 * FRANCAIS:
 *
 * Ce logiciel est un programme informatique servant à gérer les compétions
 * de tir à l'Arc. 
 *
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA 
 * sur le site "http://www.cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant 
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à 
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement, 
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité. 
 * 
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez 
 * pri connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 *
 * ENGLISH:
 * 
 * This software is a computer program whose purpose is to manage the young special archery
 * tournament.
 *
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software.  You can  use, 
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info". 
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability. 
 * 
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or 
 * data to be ensured and,  more generally, to use and operate it in the 
 * same conditions as regards security. 
 * 
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 *
 *  *** GNU GPL Terms *** 
 * 
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */
package org.ajdeveloppement.concours;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Locale;

import javax.xml.bind.JAXBException;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlIDREF;
import javax.xml.bind.annotation.XmlRootElement;

import org.ajdeveloppement.commons.io.XMLSerializer;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.Federation;
import org.ajdeveloppement.concours.data.Profile;

/**
 * paramètre de configuration du profile utilisateur
 * 
 * @author  Aurélien Jeoffray
 * @version  3.0
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
/*@XmlType(propOrder={"federations", "federation", "club", "langue", "logoPath", "reglementName", "tarifs", "pdfReaderPath", "formatPapier",
		"orientation", "colonneAndLigne", "marges", "espacements", "interfaceResultatCumul", "interfaceAffResultatExEquo",
		"useProxy", "proxy", "metaDataFichesConcours", "curProfil"})*/
public class Configuration extends DefaultParameters implements Cloneable {
	
	/**
	 * Préfixe des fichiers de configuration
	 */
	public static final String CONFIG_PROFILE = "configuration_"; //$NON-NLS-1$
	/**
	 * Suffixe des fichiers de configurations
	 */
	public static final String EXT_XML = ".xml"; //$NON-NLS-1$
	
	private static String[] strLstLangue;

	@XmlAttribute
	private String version			= "3"; //$NON-NLS-1$
	
	private String reglementName	= "FFTASJF"; //$NON-NLS-1$

	private String formatPapier     = "A4";             //$NON-NLS-1$
	private String orientation      = "portrait";       //$NON-NLS-1$
	private int[] colonneAndLigne   = new int[] {9, 3}; 
	private Margin marges           = new Margin(0, 0, 0, 0);
	private double[] espacements    = new double[] {0.5, 0.5};

	private boolean interfaceResultatCumul = false;
	private boolean interfaceAffResultatExEquo = true;
	
	@XmlIDREF
	private Contact lastConnectedUser;
	@XmlIDREF
	private Profile lastSelectedProfile;

	//propriété caché
	private transient MetaDataFichesConcours metaDataFichesConcours = new MetaDataFichesConcours();
	private transient String curProfil        = "defaut";          //$NON-NLS-1$

	/**
	 * Construit la configuration 
	 */
	public Configuration() {

	}
	
	/**
	 * @return lastConnectedUser
	 */
	public Contact getLastConnectedUser() {
		return lastConnectedUser;
	}

	/**
	 * @param lastConnectedUser lastConnectedUser à définir
	 */
	public void setLastConnectedUser(Contact lastConnectedUser) {
		this.lastConnectedUser = lastConnectedUser;
	}

	/**
	 * @return lastSelectedProfile
	 */
	public Profile getLastSelectedProfile() {
		return lastSelectedProfile;
	}

	/**
	 * @param lastSelectedProfile lastSelectedProfile à définir
	 */
	public void setLastSelectedProfile(Profile lastSelectedProfile) {
		this.lastSelectedProfile = lastSelectedProfile;
	}

	/**
	 * Retourne la langue courante de l'IHM
	 * @return  String - le code langue
	 */
	public String getLangue() {
		if(lastConnectedUser != null)
			return lastConnectedUser.getLanguage();
		
		return Locale.getDefault().getLanguage();
	}

	/**
	 * défini la langue de l'IHM
	 * @param langue  - la langue de l'application
	 */
	public void setLangue(String langue) {
		if(lastConnectedUser != null)
			lastConnectedUser.setLanguage(langue);
	}

	/**
	 * Retourne le nom du règlement définit par défaut pour la configuration
	 * 
	 * @return le nom du règlement
	 */
	public String getReglementName() {
		return reglementName;
	}

	/**
	 * Définit le nom du règlement définit par défaut pour la configuration
	 * 
	 * @param reglementName le nom du règlement
	 */
	public void setReglementName(String reglementName) {
		this.reglementName = reglementName;
	}

	/**
	 * <p>Retourne la fédération définit pour le profil. La fédération définit le
	 * choix des règlements proposé par défaut.</p>
	 * <p>Dans le futur, permettra le choix du club et des archers en fonction de la
	 * fédération. Mais n'est pas implémenté à ce jour.</p>
	 * 
	 * @return federation la fédération définit pour le profil
	 */
	public Federation getFederation() {
		if(lastSelectedProfile != null)
			return lastSelectedProfile.getEntite().getFederation();
		return null;
	}

	/**
	 * Définit la fédération  attaché au profil courant.
	 * 
	 * @param federation la fédération attaché au profil
	 */
	@Deprecated
	public void setFederation(Federation federation) {
	}
	
	/**
	 * Retourne le club organisateur du concours
	 * 
	 * @return le club organisateur
	 */
	public Entite getClub() {
		if(lastSelectedProfile != null)
			return lastSelectedProfile.getEntite();
		return null;
	}

	/**
	 * Définit le club organisateur du concours
	 * 
	 * @param club le club organisateur
	 */
	@Deprecated
	public void setClub(Entite club) {
	}

	/**
	 * nombre de colonne et de ligne sur une page d'étiquettes
	 * 
	 * @return  Returns the colonneAndLigne.
	 */
	public int[] getColonneAndLigne() {
		return this.colonneAndLigne;
	}

	/**
	 * Espacements entre 2 cellules d'étiquettes
	 * 
	 * @return  Returns the espacements.
	 */
	public double[] getEspacements() {
		return this.espacements;
	}


	/**
	 * Format du papier étiquettes
	 * @return  Returns the formatPapier.
	 */
	public String getFormatPapier() {
		return this.formatPapier;
	}

	/**
	 * Orientation du papier étiquettes
	 * @return  Returns the orientation.
	 */
	public String getOrientation() {
		return this.orientation;
	}

	/**
	 * Marge d'impression des étiquettes
	 * @return  Returns the marges.
	 */
	public Margin getMarges() {
		return this.marges;
	}

	/**
	 * Défini le nombre de colonne et ligne d'étiquettes
	 * @param colonneAndLigne  The colonneAndLigne to set.
	 */
	public void setColonneAndLigne(int[] colonneAndLigne) {
		this.colonneAndLigne = colonneAndLigne;
	}

	/**
	 * Définit les espacements entres cellules d'étiquettes
	 * @param espacements  The espacements to set.
	 */
	public void setEspacements(double[] espacements) {
		this.espacements = espacements;
	}

	/**
	 * Définit le format du papier étiquettes utilisé
	 * @param formatPapier  The formatPapier to set.
	 */
	public void setFormatPapier(String formatPapier) {
		this.formatPapier = formatPapier;
	}

	/**
	 * Définit l'orientation de la feuille d'étiquettes
	 * @param orientation  The orientation to set.
	 */
	public void setOrientation(String orientation) {
		this.orientation = orientation;
	}

	/**
	 * Définit les marges d'impression du papier étiquettes
	 * @param marges  The marges to set.
	 */
	public void setMarges(Margin marges) {
		this.marges = marges;
	}

	/**
	 * Donne le nom du profil courant
	 * @return  Returns the curProfil.
	 */
	public String getCurProfil() {
		return curProfil;
	}


	/**
	 * Définit le nom du profil courant
	 * @param curProfil  The curProfil to set.
	 */
	public void setCurProfil(String curProfil) {
		this.curProfil = curProfil;
	}

	/**
	 * Est ce que les champs de cumul doivent être affiché?
	 * @return  Renvoie interfaceResultatCumul.
	 */
	public boolean isInterfaceResultatCumul() {
		return interfaceResultatCumul;
	}

	/**
	 * Définit si les champs de cumul doivent être affiché
	 * @param interfaceResultatCumul  interfaceResultatCumul à définir.
	 */
	public void setInterfaceResultatCumul(boolean interfaceResultatCumul) {
		this.interfaceResultatCumul = interfaceResultatCumul;
	}

	/**
	 * Est ce qu'on met en surbriance les ex-aequo?
	 * @return  Renvoie interfaceAffResultatExEquo.
	 */
	public boolean isInterfaceAffResultatExEquo() {
		return interfaceAffResultatExEquo;
	}

	/**
	 * Définit si l'on met en surbriance les ex-aequo
	 * @param interfaceAffResultatExEquo  interfaceAffResultatExEquo à définir.
	 */
	public void setInterfaceAffResultatExEquo(boolean interfaceAffResultatExEquo) {
		this.interfaceAffResultatExEquo = interfaceAffResultatExEquo;
	}

	/**
	 * Donne le chemin du logo du club
	 * @return  Renvoie logoPath.
	 */
	public String getLogoPath() {
		if(lastSelectedProfile != null)
			return lastSelectedProfile.getEntite().getLogo();
		return null;
	}

	/**
	 * Définit le chemin du logo du club
	 * @param logoPath  logoPath à définir.
	 */
	@Deprecated
	public void setLogoPath(String logoPath) {
	}
	
	/**
	 * Retourne les méta-données des concours du profils
	 * 
	 * @return les méta-données des concours
	 */
	public MetaDataFichesConcours getMetaDataFichesConcours() {
		return metaDataFichesConcours;
	}

	/**
	 * Définit les méta-données des concours
	 * 
	 * @param metaDataFichesConcours l'objet contenant les méta-données des concours du profil
	 */
	public void setMetaDataFichesConcours(
			MetaDataFichesConcours metaDataFichesConcours) {
		this.metaDataFichesConcours = metaDataFichesConcours;
	}
	
	/**
	 * Renvoie la liste des langues disponibles
	 * 
	 * @return String[] - retourne la liste des langues disponible
	 */
	public static String[] listLangue() {
		if (strLstLangue == null) {
			String[] strLng = new File("lang").list(new FilenameFilter() {  //$NON-NLS-1$
						@Override
						public boolean accept(File dir, String name) {
							if (name.startsWith("libelle_") && name.endsWith(".properties"))  //$NON-NLS-1$ //$NON-NLS-2$
								return true;
							return false;
						}
					});

			for (int i = 0; i < strLng.length; i++)
				strLng[i] = strLng[i].substring(8, strLng[i].length() - 11);
			strLstLangue = strLng;
		}

		return strLstLangue;
	}
	
	/**
	 * Retourne les libellées localisé des locales supporté par l'application
	 * 
	 * @return les libellées localisé des locales supporté
	 */
	public static String[] getAvailableLanguages() {
		// liste les langues disponible
		String[] langues = listLangue();
		Locale[] locales = new Locale[langues.length];
		String[] libelleLangues = new String[langues.length];
		for (int i = 0; i < langues.length; i++) {
			locales[i] = new Locale(langues[i]);
			libelleLangues[i] = locales[i].getDisplayLanguage(locales[i]);
		}

		return libelleLangues;
	}

	/**
	 * sauvegarde la configuration général du programme
	 * 
	 * @throws JAXBException 
	 * @throws IOException 
	 */
	public void save() throws JAXBException, IOException {
		File f = new File(ApplicationCore.userRessources.getConfigPathForUser(),
				CONFIG_PROFILE + curProfil + EXT_XML);
		XMLSerializer.saveMarshallStructure(f, this);
	}
	
	@Override
	public Configuration clone() {
		try {
			return (Configuration)super.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
			return this;
		}
	}
}