/*
 * Copyright 2002-2009 - Aurélien JEOFFRAY
 *
 * http://arccompetition.ajdeveloppement.org
 *
 * *** CeCILL Terms *** 
 *
 * FRANCAIS:
 *
 * Ce logiciel est un programme informatique servant à gérer les compétions de type
 * spécial jeunes de tir à l'Arc. 
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
package org.ajdeveloppement.concours.data;

import java.sql.Types;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlIDREF;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlGeneratedIdField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlSubTables;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlUnmappedFields;
import org.ajdeveloppement.concours.managers.ContactManager;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Entité organisationnelle.<br>
 * Une entité peut représenté
 * <ul>
 * <li>Une Fédération</li>
 * <li>Une ligue</li>
 * <li>Un comité départemental</li>
 * <li>Un club</li>
 * </ul>
 * 
 * @author Aurélien JEOFFRAY
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name = "ENTITE")
@SqlSubTables(Federation.class)
@SqlPrimaryKey(fields = { "ID_ENTITE" },generatedidField=@SqlGeneratedIdField(name="ID_ENTITE",type=Types.JAVA_OBJECT))
@SqlUnmappedFields(fields={ "DATEMODIF", "UPPER_VILLE"})
public class Entite implements SqlObjectPersistence {

	/**
	 * Type d'entité: Fédération
	 */
	public static final int FEDERATION = 0;
	
	/**
	 * Type d'entité: Ligue
	 */
	public static final int LIGUE = 1;
	
	/**
	 * Type d'entité: Comité départementale
	 */
	public static final int CD = 2;
	
	/**
	 * Type d'entité: Club
	 */
	public static final int CLUB = 3;

	// utilisé pour donnée un identifiant unique à la sérialisation de l'objet
	@XmlID
	@XmlAttribute(name = "id", required = true)
	private String xmlId;

	@XmlTransient
	@SqlField(name = "ID_ENTITE")
	private UUID idEntite;
	@SqlField(name = "NOM")
	private String nom;
	@SqlField(name = "REFERENCE")
	private String reference;
	
	@SqlField(name = "ADRESSE")
	private String adresse;
	@SqlField(name = "CODEPOSTAL")
	private String codePostal;
	@SqlField(name = "VILLE")
	private String ville;
	@SqlField(name = "PAYS")
	private String pays = "fr"; //$NON-NLS-1$
	@SqlField(name = "NOTE")
	private String note;
	
	@SqlField(name = "LOGO")
	private String logo;
	
	@SqlField(name = "TYPEENTITE")
	private int type = CLUB;

	@XmlAttribute
	@SqlField(name = "REMOVABLE")
	private boolean removable = true;
	
	@XmlIDREF
	@SqlForeignKey(mappedTo="ID_ENTITE_PARENT")
	private Entite entiteParent;
	
	@SqlChildCollection(foreignFields="ID_ENTITE_PARENT",type=Entite.class)
	private List<Entite> entitesEnfant;
	
	@SqlChildCollection(foreignFields="ID_ENTITE",type=Rule.class)
	private List<Rule> rules;
	
	@SqlChildCollection(foreignFields="ID_ENTITE",type=CompetitionLevel.class)
	private List<CompetitionLevel> competitionLevels;
	
	@SqlChildCollection(foreignFields="ID_ORGANISATEUR",type=Competition.class)
	private List<Competition> competitions;
	
	@SqlChildCollection(foreignFields="ID_ENTITE",type=Profile.class)
	private List<Profile> profiles;

	/**
	 * 
	 */
	public Entite() {

	}

	/**
	 * Construit une nouvelle entité nommé ayant le type fournit en parametre
	 * 
	 * @param nom
	 *            le nom de l'entite
	 * @param type
	 *            le type de l'entite
	 */
	public Entite(String nom, int type) {
		this.nom = nom;
		this.type = type;
	}
	
	@JsonCreator
	private static Entite create(@JsonProperty("idEntite") UUID idEntite) {
		Entite entite = QResults.from(Entite.class).where(T_Entite.ID_ENTITE.equalTo(idEntite)).first();
		if(entite == null) {
			entite = new Entite();
			entite.setIdEntite(idEntite);
		}
		
		return entite;
	}

	/**
	 * Retourne l'identifiant de l'entite
	 * 
	 * @return l'identifiant de l'entite
	 */
	public UUID getIdEntite() {
		return idEntite;
	}

	/**
	 * Définit l'identifiant de l'entite
	 * 
	 * @param idEntite
	 *            l'identifiant de l'entite
	 */
	public void setIdEntite(UUID idEntite) {
		this.idEntite = idEntite;
	}

	/**
	 * Retourne l'adresse de l'entite
	 * 
	 * @return l'adresse de l'entite
	 */
	public String getAdresse() {
		if (adresse == null)
			return ""; //$NON-NLS-1$
		return adresse;
	}

	/**
	 * Retourne le numéro d'reference de l'association
	 * 
	 * @return le numéro d'reference
	 */
	public String getReference() {
		if (reference == null)
			return ""; //$NON-NLS-1$
		return reference;
	}

	/**
	 * Retourne le code postal de l'adresse de l'entite
	 * 
	 * @return le code postal
	 */
	public String getCodePostal() {
		if (codePostal == null)
			return ""; //$NON-NLS-1$
		return codePostal;
	}

	/**
	 * Retourne le nom de l'entite
	 * 
	 * @return le nom
	 */
	public String getNom() {
		if (nom == null)
			return ""; //$NON-NLS-1$
		return nom;
	}

	/**
	 * Retourne le type d'entite.<br>
	 * Les types possible sont: FEDERATION, LIGUE, CD, CLUB
	 * 
	 * @return le type de l'entite
	 */
	public int getType() {
		return type;
	}

	/**
	 * Retourne la ville de l'entite
	 * 
	 * @return la ville de l'entite
	 */
	public String getVille() {
		if (ville == null)
			return ""; //$NON-NLS-1$
		return ville;
	}

	/**
	 * Définit l'adresse de l'entite
	 * 
	 * @param adresse
	 *            l'adresse de l'entite
	 */
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	/**
	 * Définit le numéro de reference identifiant de manière unique l'entite
	 * 
	 * @param reference
	 *            le numéro de reference
	 */
	public void setReference(String reference) {
		this.reference = reference;
	}

	/**
	 * Définit le code postal de l'adresse de l'entite
	 * 
	 * @param codePostal
	 *            le code postal
	 */
	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	/**
	 * Définit le nom de l'entite
	 * 
	 * @param nom
	 *            le nom
	 */
	public void setNom(String nom) {
		this.nom = nom;
	}

	/**
	 * Définit le type d'entite.<br>
	 * Les types possible sont: FEDERATION, LIGUE, CD, CLUB
	 * 
	 * @param type
	 *            le type d'entite
	 */
	public void setType(int type) {
		this.type = type;
	}

	/**
	 * Définit la ville de l'entite
	 * 
	 * @param ville
	 *            la ville de l'entite
	 */
	public void setVille(String ville) {
		this.ville = ville;
	}

	/**
	 * @return pays
	 */
	public String getPays() {
		return pays;
	}

	/**
	 * @param pays pays à définir
	 */
	public void setPays(String pays) {
		this.pays = pays;
	}

	/**
	 * Retourne une note ou commentaire préalablement définit sur l'entite
	 * 
	 * @return une note sur l'entite
	 */
	public String getNote() {
		return note;
	}

	/**
	 * Ajoute une note ou commentaire sur l'entite
	 * 
	 * @param note
	 *            une note sur l'entite
	 */
	public void setNote(String note) {
		this.note = note;
	}

	/**
	 * @return logo
	 */
	public String getLogo() {
		return logo;
	}

	/**
	 * @param logo logo à définir
	 */
	public void setLogo(String logo) {
		this.logo = logo;
	}

	/**
	 * @param removable
	 *            removable à définir
	 */
	public void setRemovable(boolean removable) {
		this.removable = removable;
	}

	/**
	 * @return removable
	 */
	public boolean isRemovable() {
		return removable;
	}

	/**
	 * @return entiteParent
	 */
	public Entite getEntiteParent() {
		return entiteParent;
	}

	/**
	 * @param entiteParent entiteParent à définir
	 */
	public void setEntiteParent(Entite entiteParent) {
		this.entiteParent = entiteParent;
	}
	
	/**
	 * Retourne la fédération associé à l'entité. Si l'entité est une fédération
	 * renvoi son objet Federation correspondant
	 * 
	 * @return la federation associé à l'entité
	 */
	public Federation getFederation() {
		if(type == FEDERATION)
			return QResults.from(Federation.class).where(T_Federation.ID_ENTITE.equalTo(idEntite)).first();
		
		if(entiteParent != null) {
			return entiteParent.getFederation();
		}
		
		return null;
	}

	/**
	 * @return contacts
	 */
	@JsonIgnore
	public Iterable<Contact> getContacts() {
		if(idEntite != null)
			return ContactManager.getContactsForEntity(this);
		
		return Collections.emptyList();
	}
	
	/**
	 * @return entitesEnfant
	 */
	public List<Entite> getEntitesEnfant() {
		if(entitesEnfant != null) {
			entitesEnfant = QResults.from(Entite.class).where(T_Entite.ID_ENTITE_PARENT.equalTo(idEntite)).asList();
		}
		return entitesEnfant;
	}

	/**
	 * @param entitesEnfant entitesEnfant à définir
	 */
	public void setEntitesEnfant(List<Entite> entitesEnfant) {
		this.entitesEnfant = entitesEnfant;
	}

	/**
	 * @return rules
	 */
	public List<Rule> getRules() {
		if(rules == null) {
			rules = QResults.from(Rule.class).where(T_Rule.ID_ENTITE.equalTo(idEntite)).asList();
		}
		return rules;
	}

	/**
	 * @param rules rules à définir
	 */
	public void setRules(List<Rule> rules) {
		this.rules = rules;
	}

	/**
	 * <p>Retourne la liste de tous les niveaux de compétition accessible pour la
	 * fédération</p>
	 * 
	 * @return la liste de tous les niveaux de compétition accessible pour l'entite
	 */
	public List<CompetitionLevel> getCompetitionLevels() {
		if(competitionLevels == null) {
			competitionLevels = QResults.from(CompetitionLevel.class).where(T_CompetitionLevel.ID_ENTITE.equalTo(idEntite)).asList();
		}
		return competitionLevels;
	}

	/**
	 * <p>Définit la liste des niveaux de compétition disponible.</p>
	 * <p>Comme aucune vérification de la présence en base des niveaux n'est réalisé,
	 * cette méthode est uniquement présente pour une utilisation par les
	 * fonction de sérialisation XML.</p>
	 * <p>Utiliser à la place les méthodes {@link #addCompetitionLevel(CompetitionLevel)}
	 * et {@link #removeCompetitionLevel(CompetitionLevel)} qui assure les fonctions
	 * de persistance</p>
	 * 
	 * @param competitionLevels la liste des niveaux de compétition disponible
	 */
	public void setCompetitionLevels(List<CompetitionLevel> competitionLevels) {
		this.competitionLevels = competitionLevels;
		
		for(CompetitionLevel competitionLevel : competitionLevels)
			competitionLevel.setEntite(this);
	}
	
	/**
	 * Ajoute un niveau de compétition à la fédération. Lorsqu'un niveau
	 * de compétition est ajouté à la fédération, celui ci est immédiatement 
	 * enregistrer dans la base de données.
	 * 
	 * @param competitionLevel le niveau de compétition à ajouter à l'entité
	 */
	public void addCompetitionLevel(CompetitionLevel competitionLevel) {
		this.competitionLevels.add(competitionLevel);
		
		competitionLevel.setEntite(this);
	}
	
	/**
	 * Supprime un niveau de compétition de la fédération. Lorsqu'un niveau
	 * de compétition est supprimé de la fédération, celui ci est immédiatement 
	 * supprimé dans la base de données.
	 * 
	 * @param competitionLevel le niveau de compétition à supprimer de l'entité
	 */
	public void removeCompetitionLevel(CompetitionLevel competitionLevel) {
		this.competitionLevels.remove(competitionLevel);
	}

	/**
	 * @return competitions
	 */
	public List<Competition> getCompetitions() {
		if(competitions == null) {
			competitions = QResults.from(Competition.class).where(T_Competition.ID_ORGANISATEUR.equalTo(idEntite)).asList();
		}
		return competitions;
	}

	/**
	 * @param competitions competitions à définir
	 */
	public void setCompetitions(List<Competition> competitions) {
		this.competitions = competitions;
	}

	/**
	 * @return profiles
	 */
	public List<Profile> getProfiles() {
		if(profiles == null) {
			profiles = QResults.from(Profile.class).where(T_Profile.ID_ENTITE.equalTo(idEntite)).asList();
		}
		return profiles;
	}

	/**
	 * @param profiles profiles à définir
	 */
	public void setProfiles(List<Profile> profiles) {
		this.profiles = profiles;
	}

	@Override
	public boolean validateBeforeSave() {
		return nom != null && !nom.isEmpty();
	}

	/**
	 * 
	 * @param marshaller
	 */
	public void beforeMarshal(Marshaller marshaller) {
		if (idEntite == null)
			idEntite = UUID.randomUUID();
		xmlId = idEntite.toString();
	}

	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	public void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if (xmlId != null)
			idEntite = UUID.fromString(xmlId);

		xmlId = null;
	}

	@Override
	public String toString() {
		if ((nom == null || nom.isEmpty()) && ville != null && !ville.isEmpty())
			return ville;
		return (nom == null) ? "" : nom; //$NON-NLS-1$
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((reference == null) ? 0 : reference.hashCode());
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + type;
		result = prime * result + ((ville == null) ? 0 : ville.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Entite other = (Entite) obj;
		if (reference == null) {
			if (other.reference != null)
				return false;
		} else if (!reference.equals(other.reference))
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		if (type != other.type)
			return false;
		if (ville == null) {
			if (other.ville != null)
				return false;
		} else if (!ville.equals(other.ville))
			return false;
		return true;
	}
}