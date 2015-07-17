/*
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

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.PersitentCollection;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.SqlSession;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperCache;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.concours.builders.DistancesEtBlasonBuilder;
import org.ajdeveloppement.concours.xml.bind.BlasonAdapter;

/**
 * parametre de distances et blason pour une cible et un concurrent
 * 
 * @author Aurélien Jeoffray
 * @version 1.0
 */
@SqlTable(name="DISTANCESBLASONS",loadBuilder=DistancesEtBlasonBuilder.class)
@SqlPrimaryKey(fields="ID_DISTANCESBLASONS")
@XmlAccessorType(XmlAccessType.FIELD)
public class DistancesEtBlason implements SqlObjectPersistence {
	//private static StoreHelper<DistancesEtBlason> helper = SqlStoreHelperFactory.getStoreHelper(DistancesEtBlason.class);
	
	@XmlAttribute(name="id")
	@XmlID
	private String xmlId = null;
	
	@XmlTransient
	@SqlField(name="ID_DISTANCESBLASONS")
	private UUID idDistancesBlason;
	
	@XmlElementWrapper(name="distances",required=true)
    @XmlElement(name="distance")
	private List<Distance> distances;

	@XmlJavaTypeAdapter(BlasonAdapter.class)
	@SqlForeignKey(mappedTo="NUMBLASON")
	private Face targetFace = new Face();
	
	/**
	 * construit un DistancesEtBlason avec les options par défaut (pour sérialisation XML)
	 * 
	 */
	public DistancesEtBlason() {
	}

	/**
	 * Construit un distance et blason avec les bons paramètre
	 * 
	 * @param distances tableau des distances représenté. 1 distance par série.
	 * 	Les distances sont représenté en mètre
	 * @param targetFace le blason associé
	 */
	public DistancesEtBlason(List<Distance> distances, Face targetFace) {
		this.distances = distances;
		this.targetFace = targetFace;
	}

	/**
	 * Retourne le tableau des distances
	 * 
	 * @return le tableau des distances
	 */
	public List<Distance> getDistances() {
		return this.distances;
	}

	/**
	 * Retourne le blason de l'objet
	 * 
	 * @return le blason
	 */
	public Face getTargetFace() {
		return targetFace;
	}

	/**
	 * Définit le blason
	 * 
	 * @param targetFace le blason
	 */
	public void setTargetFace(Face targetFace) {
		this.targetFace = targetFace;
	}

	/**
	 * Définit le tableau des distances
	 * 
	 * @param distances le tableau des distances de l'objet
	 */
	public void setDistances(List<Distance> distances) {
		this.distances = distances;
	}

	/**
	 * Retourne le numéro en base de l'objet
	 * 
	 * @return le numéro en base de l'objet
	 */
	public UUID getIdDistancesBlason() {
		return idDistancesBlason;
	}

	/**
	 * Définit le numéro en base de l'objet
	 * 
	 * @param idDistancesBlason le numéro en base de l'objet
	 */
	public void setIdDistancesBlason(UUID idDistancesBlason) {
		this.idDistancesBlason = idDistancesBlason;
	}
	
	/**
	 * Sauvegarde le couple distances/blasons en base.
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(Session)
	 * @throws ObjectPersistenceException
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			SqlContext context = SqlContext.getDefaultContext();
			if(session instanceof SqlSession)
				context = ((SqlSession)session).getContext();
			
			StoreHelper<DistancesEtBlason> helper = SqlStoreHelperCache.getHelper(DistancesEtBlason.class, context);
			helper.save(this);
			
			Session.addProcessedObject(session, this);
			
			int numOrdre = 1;
			for(Distance distance : distances)
				distance.setNumOrdre(numOrdre++);
			PersitentCollection.save(distances, session, 
					Collections.<String,Object>singletonMap(T_Distance.ID_DISTANCESBLASONS.getFieldName(), idDistancesBlason));
		}
	}

	/**
	 * Retourne l'objet DistancesEtBlason associé à un concurrent pour
	 * un règlement donné.
	 * 
	 * @param reglement le règlement déterminant le DistancesEtBlason
	 * du concurrent
	 * @param concurrent le concurrent pour lequel retourné l'objet
	 * 
	 * @return l'objet DistancesEtBlason correspondant au concurrent
	 */
	public static DistancesEtBlason getDistancesEtBlasonForConcurrent(Rule reglement, Concurrent concurrent) {
//		CriteriaSet placementCriteriaSet = concurrent.getCriteriaSet().getFilteredCriteriaSet(reglement.getPlacementFilter());
//		if(placementCriteriaSet != null) {
//			return placementCriteriaSet.getDistancesEtBlason();
//		}
		
		return null;
//		List<DistancesEtBlason> ldb = reglement.getDistancesEtBlasonFor();
//		if(concurrent.isUseAlternativeTargetFace()) {
//			for(DistancesEtBlason db : ldb) {
//				 if(concurrent.getAlternativeTargetFace().equals(db.getTargetFace()))
//					return db;
//			}
//		}
//		if(ldb.size() > 0)
//			return ldb.get(0);
//		return null;
	}
	
	/**
	 * Indique si deux instances ont les mêmes distances et blason ou non
	 * 
	 * @param other l'objet avec lequel comparer
	 * @return true si similaire, false sinon
	 */
	public boolean haveSameDistancesAndTargetFace(DistancesEtBlason other) {
		if (this == other)
			return true;
		if (other == null)
			return false;

		if (!distances.equals(other.distances))
			return false;
		
		if (targetFace == null) {
			if (other.targetFace != null)
				return false;
		} else if (!targetFace.equals(other.targetFace))
			return false;
		
		return true;
	}
	
	/**
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		if(idDistancesBlason == null)
			idDistancesBlason = UUID.randomUUID();
		
		xmlId = idDistancesBlason.toString();
	}
	
	/**
	 * Used by JAXB Only
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		idDistancesBlason = UUID.fromString(xmlId);
		
		xmlId = null;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((distances == null) ? 0 : distances.hashCode());
		result = prime * result
				+ ((targetFace == null) ? 0 : targetFace.hashCode());
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
		if (!(obj instanceof DistancesEtBlason))
			return false;
		DistancesEtBlason other = (DistancesEtBlason) obj;
		if (distances == null) {
			if (other.distances != null)
				return false;
		} else if (!distances.equals(other.distances))
			return false;
		if (targetFace == null) {
			if (other.targetFace != null)
				return false;
		} else if (!targetFace.equals(other.targetFace))
			return false;
		return true;
	}

	@SuppressWarnings("nls")
	@Override
	public String toString() {	
		return "{" + targetFace.toString() + "," + distances.toString() + "}";
	}

}