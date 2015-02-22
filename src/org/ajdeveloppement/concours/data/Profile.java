/*
 * Créé le 29 déc. 2013 à 15:45:26 pour ArcCompetition
 *
 * Copyright 2002-2013 - Aurélien JEOFFRAY
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
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
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
 *  (at your option) any later version.
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlID;

import org.ajdeveloppement.commons.net.json.JsonExclude;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlGeneratedIdField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@SqlTable(name="PROFILE",disableCache=true)
@SqlPrimaryKey(fields="ID_PROFILE",generatedidField=@SqlGeneratedIdField(name="ID_PROFILE"))
public class Profile implements SqlObjectPersistence {
	
	//utilisé pour donnée un identifiant unique à la sérialisation de l'objet
	@XmlID
	@XmlAttribute(name="id")
	private String xmlId;
	
	@SqlField(name="ID_PROFILE")
	private UUID id;
	
	@SqlField(name="INTITULE")
	private String intitule;
	
	private Entite entite;
	
	@SqlField(name="ID_ENTITE")
	private UUID idEntite;
	
	@SqlChildCollection(foreignFields="ID_PROFILE",type=ManagerProfile.class)
	private List<ManagerProfile> managers;
	
	/*@JsonCreator
	private static Profile create(@JsonProperty("id") UUID idProfile) {
		Profile profile = T_Profile.getInstanceWithPrimaryKey(idProfile);
				
		if(profile == null) {
			profile = new Profile();
			profile.setId(idProfile);;
		}
		
		return profile;
	}*/
	
	/**
	 * @return id
	 */
	public UUID getId() {
		return id;
	}

	/**
	 * @param id id à définir
	 */
	public void setId(UUID id) {
		this.id = id;
	}

	/**
	 * @return initule
	 */
	public String getIntitule() {
		return intitule;
	}

	/**
	 * @param initule initule à définir
	 */
	public void setIntitule(String initule) {
		this.intitule = initule;
	}

	/**
	 * @return idEntite
	 */
	public UUID getIdEntite() {
		return idEntite;
	}

	/**
	 * @param idEntite idEntite à définir
	 */
	public void setIdEntite(UUID idEntite) {
		this.idEntite = idEntite;
	}

	/**
	 * @return entite
	 */
	@JsonExclude
	public Entite getEntite() {
		if(entite == null && idEntite != null)
			entite = T_Entite.getInstanceWithPrimaryKey(idEntite);
		return entite;
	}

	/**
	 * @param entite entite à définir
	 */
	public void setEntite(Entite entite) {
		this.entite = entite;
		if(entite != null)
			this.idEntite = entite.getIdEntite();
		else
			this.idEntite = null;
	}


	/**
	 * @return managers
	 */
	public List<ManagerProfile> getManagers() {
		if(managers == null) {
			managers = QResults.from(ManagerProfile.class)
					.where(T_ManagerProfile.ID_PROFILE.equalTo(id))
					.asList();
			if(managers == null)
				managers = new ArrayList<>();
		}
		return managers;
	}

	/**
	 * @param managers managers à définir
	 */
	public void setManagers(List<ManagerProfile> managers) {
		this.managers = managers;
	}
	
	public boolean addManager(Contact manager) {
		return getManagers().add(new ManagerProfile(manager, this));
	}
	
	public boolean removeManager(Contact manager) {
		return getManagers().remove(new ManagerProfile(manager, this));
	}
	
	/**
	 * For JAXB Usage only. Do not use.
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		if(id == null)
			id = UUID.randomUUID();
		xmlId = id.toString();
		
		entite.beforeMarshal(marshaller);
	}
	
	@SuppressWarnings("nls")
	public String toJSON() {
		return String.format("{\"id\":\"%s\",\"intitule\":\"%s\",\"entite\":\"%s\"}", id, intitule, entite.getIdEntite());
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	/* (non-Javadoc)
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
		Profile other = (Profile) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
