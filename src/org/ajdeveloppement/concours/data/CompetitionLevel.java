/*
 * Créé le 13 avr. 2009 à 20:57:53 pour ArcCompetition
 *
 * Copyright 2002-2009 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.data;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.SqlSession;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperCache;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.concours.helpers.LibelleHelper;

/**
 * Représente le niveau d'une compétition.
 * 
 * @author Aurélien JEOFFRAY
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="NIVEAU_COMPETITION")
@SqlPrimaryKey(fields={"ID_NIVEAU_COMPETITION"})
public class CompetitionLevel implements SqlObjectPersistence {
	@XmlTransient
	@SqlField(name="ID_NIVEAU_COMPETITION")
	private UUID id = UUID.randomUUID();
	
	@XmlTransient
	@SqlField(name="ID_LIBELLE")
	private UUID idLibelle = null;
	
	@SqlField(name="DEFAUT")
	private boolean defaut = false;
	
	@XmlTransient
	@SqlForeignKey(mappedTo="ID_ENTITE")
	private Entite entite;
	
	@SqlField(name="ORDRE")
	private int ordre;
	
	//Pour mise à jour ancienne version
	private String libelle = null;
	private String lang = null;
	private List<Libelles> libelles = null;
	private transient Map<String, String> localizedLibelle;
	
	//private static StoreHelper<CompetitionLevel> helper = SqlStoreHelperFactory.getStoreHelper(CompetitionLevel.class);
	
	/**
	 * 
	 */
	public CompetitionLevel() {
		
	}

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
	 * @return entite
	 */
	public Entite getEntite() {
		return entite;
	}

	/**
	 * @param entite federation à définir
	 */
	public void setEntite(Entite entite) {
		this.entite = entite;
		
		if(idLibelle == null && entite != null) {
			try {
				String lang = null;
				String libelle = null;
				if(localizedLibelle != null) {
					for(Entry<String, String> entry: localizedLibelle.entrySet()) {
						lang = entry.getKey();
						libelle = entry.getValue();
						break;
					}
				}
				if(libelle != null && !libelle.isEmpty()) {
					idLibelle = QResults.from(Libelle.class)
						.where(T_Libelle.ID_LIBELLE.in(QResults.from(CompetitionLevel.class)
									//.where(T_CompetitionLevel.ID.equalTo(federation.getIdEntite()))
									.asSubQuery(T_CompetitionLevel.ID_LIBELLE))
								.and(T_Libelle.LANG.equalTo(lang))
								.and(T_Libelle.LIBELLE.equalTo(libelle)))
						.singleValue(T_Libelle.ID_LIBELLE);
				}
			} catch (SQLException e) {
				throw new UncheckedException(e);
			}
		}
	}

	/**
	 * @param lang la langue des libellés de niveau de compétition au format ISO 639 (langue sur 2 caractères).
	 * @return libelle
	 */
	public String getLibelle(String lang) {
		if(localizedLibelle == null)
			localizedLibelle = new HashMap<String, String>();
		else {
			if(localizedLibelle.containsKey(lang))
				return localizedLibelle.get(lang);
		}
		
		String libelle = null;
				
		if(idLibelle != null) {
			libelle = LibelleHelper.getLibelle(idLibelle, lang);
			localizedLibelle.put(lang, libelle);
		}
	
		return libelle;
	}
	
	/**
	 * Retourne La liste des langues disponible pour le libellé
	 * 
	 * @return La liste des langues disponible pour le libellé
	 */
	public List<String> getAvailableLangForLibelle() {
		if(idLibelle != null)
			return LibelleHelper.getAvailableLangForLibelle(idLibelle);
		
		return null;
	}

	/**
	 * @param libelle libelle à définir
	 * @param lang la langue du libellé
	 */
	public void setLibelle(String libelle, String lang) {
		if(localizedLibelle == null)
			localizedLibelle = new HashMap<String, String>();
		
		localizedLibelle.put(lang, libelle);
	}
	
	/**
	 * @param defaut defaut à définir
	 */
	public void setDefaut(boolean defaut) {
		this.defaut = defaut;
	}

	/**
	 * @return defaut
	 */
	public boolean isDefaut() {
		return defaut;
	}

	/** 
	 * Sauvegarde en base un niveau de compétition
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(Session)
	 * 
	 * @throws ObjectPersistenceException
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			if(localizedLibelle != null) {
				for(Entry<String,String> entry : localizedLibelle.entrySet()) {
					String libelle = null;
					if(idLibelle != null)
						libelle = LibelleHelper.getLibelle(idLibelle, entry.getKey());
					if(libelle == null || !libelle.equals(entry.getValue())) {
						Libelle newLibelle = new Libelle(idLibelle, entry.getValue(), entry.getKey());
						newLibelle.save(session);
						
						idLibelle = newLibelle.getIdLibelle();
					}
				}
			}
			
			SqlContext context = SqlContext.getDefaultContext();
			if(session instanceof SqlSession)
				context = ((SqlSession)session).getContext();
			
			StoreHelper<CompetitionLevel> helper = SqlStoreHelperCache.getHelper(CompetitionLevel.class, context);
			helper.save(this);
			
			Session.addProcessedObject(session, this);
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id.hashCode();
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
		CompetitionLevel other = (CompetitionLevel) obj;
		if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return getLibelle(LibelleHelper.getDefaultLanguage());
	}
	
	/**
	 * Use only by JAXB. Do not use.
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		//Force le chargement de tous les libellés
		if(idLibelle != null) {
			for(String lang : getAvailableLangForLibelle()) {
				getLibelle(lang);
			}
		}
		if(localizedLibelle != null) {
			
			if(libelles == null)
				libelles = new ArrayList<>();
			else
				libelles.clear();
			for(Entry<String, String> entry: localizedLibelle.entrySet()) {
				Libelles ls = new Libelles();
				ls.lang = entry.getKey();
				ls.libelle= entry.getValue();
				
				libelles.add(ls);
			}
		}
	}
	
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if(lang != null && libelle != null) {
			setLibelle(libelle, lang);
			
			libelle = null;
			lang = null;
		}
		
		if(libelles != null) {
			if(localizedLibelle == null)
				localizedLibelle = new HashMap<>();
			for(Libelles l : libelles) {
				localizedLibelle.put(l.lang, l.libelle);	
			}
			libelles = null;
		}
	}
	
	@XmlAccessorType(XmlAccessType.FIELD)
	private static class Libelles {
		@XmlAttribute()
		public String lang = null;
		@XmlAttribute()
		public String libelle = null;
	}
}
