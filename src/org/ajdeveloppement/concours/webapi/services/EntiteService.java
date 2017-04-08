/*
 * Créé le 7 avr. 2015 à 21:45:45 pour ArcCompetition
 *
 * Copyright 2002-2015 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.webapi.services;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QField;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.ResultRow;
import org.ajdeveloppement.concours.data.Criterion;
import org.ajdeveloppement.concours.data.CriterionElement;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.Federation;
import org.ajdeveloppement.concours.data.T_Criterion;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.data.T_Federation;
import org.ajdeveloppement.concours.webapi.models.TypeLabel;
import org.ajdeveloppement.webserver.services.webapi.helpers.JsonHelper;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class EntiteService {

	private Map<String,QField<?>> orderableField = new HashMap<>();
	
	/**
	 * 
	 */
	@SuppressWarnings("nls")
	public EntiteService() {
		orderableField.put("nom", T_Entite.NOM);
		orderableField.put("reference", T_Entite.REFERENCE);
		orderableField.put("ville", T_Entite.VILLE);
		orderableField.put("category", T_Entite.TYPEENTITE);
	}
	
	/**
	 * get filter query with given parameters
	 * 
	 * @param types
	 * @param search
	 * @return
	 */
	public QFilter getFilter(String types, UUID childOf, String search) {
		QFilter filter = null;
		if(types != null && !types.isEmpty()) {
			try {
				@SuppressWarnings("unchecked")
				List<Integer> typeValues = JsonHelper.fromJson(types, List.class);
				filter = T_Entite.TYPEENTITE.in(typeValues);
			} catch (IOException e) {
				throw new UncheckedException(e);
			}
		}
		
		if(childOf != null) {
			QFilter childOfFilter = T_Entite.ID_ENTITE_PARENT.equalTo(childOf);
			
			if(filter != null)
				filter = filter.and(childOfFilter);
			else
				filter = childOfFilter;
		}
		
		if(search != null && !search.isEmpty()) {
			String searchPattern = String.format("%%%s%%", search.toUpperCase()); //$NON-NLS-1$
			
			QFilter searchFilter = T_Entite.NOM.upper().like(searchPattern)
					.or(T_Entite.VILLE.upper().like(searchPattern))
					.or(T_Entite.REFERENCE.upper().like(searchPattern));
			
			if(filter != null)
				filter = filter.and(searchFilter);
			else
				filter = searchFilter;
		}
		return filter;
	}
	
	public int countEntitiesWithFilter(QFilter filter) {
		return T_Entite.all().where(filter).count();
	}
	
	public TypeLabel[] getTypeEntity() {
		return new TypeLabel[] {
			new TypeLabel(Entite.FEDERATION, "Fédération"),
			new TypeLabel(Entite.LIGUE, "Ligue"),
			new TypeLabel(Entite.CD, "Comité Départemental"),
			new TypeLabel(Entite.CLUB, "Club"),
		};
	}
	
	@SuppressWarnings("nls")
	public List<Entite> getEntitiesWithFilter(QFilter filter, int length, int offset, String sortBy, String sortOrder) {
		QResults<Entite, Void> entiteQuery = T_Entite.all()
				//.useBuilder(entiteBuilder)
				//.leftJoin(Federation.class, T_Entite.ID_ENTITE.equalTo(T_Federation.ID_ENTITE))
				.where(filter);
		
		if(sortBy == null || sortBy.trim().isEmpty()) {
			entiteQuery = entiteQuery.orderBy(T_Entite.NOM);
		} else {
			try {
				if(!sortBy.startsWith("["))
					sortBy = "[" + sortBy + "]";
				
				@SuppressWarnings("unchecked")
				List<String> sortByValues = JsonHelper.fromJson(sortBy, List.class);
				@SuppressWarnings("unchecked")
				List<String> sortOrderValues = JsonHelper.fromJson(sortOrder, List.class);
				if(sortByValues != null && sortByValues.size()>0) {
					List<QField<?>> orderField = new ArrayList<QField<?>>();
					int i = 0;
					for(String val : sortByValues) {
						QField<?> field = orderableField.get(val);
						if(field != null) {
							if(sortOrderValues != null && i < sortOrderValues.size() && sortOrderValues.get(i).equals("desc"))
								field = field.toOrderByDesc();
							orderField.add(field);
						}
					}
					entiteQuery = entiteQuery.orderBy(orderField.toArray(new QField<?>[orderField.size()]));
				}
				
				
			} catch (IOException e) {
				throw new UncheckedException(e);
			}
		}
		
		if(length > 0) {
			if(offset > -1)
				entiteQuery = entiteQuery.limit(length, offset);
			else
				entiteQuery = entiteQuery.limit(length);
		}
		
		List<Entite> entites = entiteQuery.asList();
		
//		return entites.stream().map(e -> {
//			if(e.getType() == Entite.FEDERATION)
//				e = T_Federation.getInstanceWithPrimaryKey(e.getIdEntite());
//			return adapter.toModelView(e);
//		}).collect(Collectors.toList());
		return entites;
	}

	public Entite getEntiteById(UUID idEntite) {
		Entite entite = T_Entite.getInstanceWithPrimaryKey(idEntite);
		
		if(entite != null)
			return entite;
		
		return null;
	}
	
	public String getEntiteNameById(UUID idEntite) throws SQLException {
		ResultRow resultRow = T_Entite.all().where(T_Entite.ID_ENTITE.equalTo(idEntite))
				.select(T_Entite.NOM).iterator().next();
		if(resultRow != null)
			return resultRow.getValue(T_Entite.NOM);
		
		return null;
	}
	
	public void createOrUpdateEntite(Entite entite) throws ObjectPersistenceException {
		if(entite != null) {
			if(entite instanceof Federation)
				((Federation)entite).setNomFederation(entite.getNom());
			
			entite.save();
		}
	}

	public List<Criterion> getCriteria(UUID idEntite) {
		List<Criterion> criteria = T_Criterion.all().where(T_Criterion.ID_ENTITE.equalTo(idEntite)).orderBy(T_Criterion.ORDRE).asList();
		return criteria;
	}
	
	public List<Criterion> saveCriteria(UUID idEntity, List<Criterion> criteria) throws ObjectPersistenceException {
		Federation federation = T_Federation.getInstanceWithPrimaryKey(idEntity);
		if(federation != null) {
			List<Criterion> sourceCriteria = federation.getCriteria();
			federation.setCriteria(criteria);
			for(Criterion sourceCriterion : sourceCriteria) {
				if(!criteria.contains(sourceCriterion))
					sourceCriterion.delete();
			}
			
			federation.save();
		}
		return criteria;
	}
	
	public void saveCriterionElement(Criterion criterion, List<CriterionElement> elements)
			throws ObjectPersistenceException {
		List<CriterionElement> sourceElements = criterion.getCriterionElements();
		
		for(CriterionElement element : elements) {
			element.setCriterion(criterion);
			element.save();
		}
		
		for(CriterionElement sourceElement : sourceElements) {
			if(!elements.contains(sourceElement))
				sourceElement.delete();
		}
	}
}
