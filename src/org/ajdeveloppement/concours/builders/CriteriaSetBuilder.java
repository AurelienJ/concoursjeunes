/*
 * Créé le 22 mai 07 à 12:50:28 pour ArcCompetition
 *
 * Copyright 2002-2007 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.builders;

import java.sql.ResultSet;
import java.util.Map;

import org.ajdeveloppement.commons.persistence.LoadHelper;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.Cache;
import org.ajdeveloppement.commons.persistence.sql.ResultSetLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.ResultSetRowToObjectBinder;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache;
import org.ajdeveloppement.concours.data.CriteriaSet;

/**
 * Construit un jeux de critères à partir des données en base
 * 
 * @author Aurélien JEOFFRAY
 *
 */
public class CriteriaSetBuilder implements ResultSetRowToObjectBinder<CriteriaSet, Void>{
	
	private static LoadHelper<CriteriaSet,Map<String,Object>> loadHelper = SqlLoadFactory.getLoadHelper(CriteriaSet.class);
	private static LoadHelper<CriteriaSet,ResultSet> resultSetLoadHelper = ResultSetLoadFactory.getLoadHelper(CriteriaSet.class);
	
	/**
	 * Construit un jeux de critéres à partir des valeurs de la clé primaire de la table en base
	 * 
	 * @param numCriteriaSet le numero d'identifiant du jeux de critères dans la base
	 * 
	 * @return le jeux de critères concerné
	 * @throws ObjectPersistenceException 
	 */
	public static CriteriaSet getCriteriaSet(int numCriteriaSet) throws ObjectPersistenceException {
		return getCriteriaSet(null, numCriteriaSet, false, null);
	}
	
	/**
	 * Construit un jeux de critéres à partir des valeurs de la clé primaire de la table en base
	 * 
	 * @param numCriteriaSet le numero d'identifiant du jeux de critères dans la base
	 * @param doNotUseCache ne pas utiliser le cache
	 * @param sessionCache 
	 * 
	 * @return le jeux de critères concerné
	 * @throws ObjectPersistenceException 
	 */
	public static CriteriaSet getCriteriaSet(int numCriteriaSet, boolean doNotUseCache, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		return getCriteriaSet(null, numCriteriaSet, false, null);
	}
	
	/**
	 * @param rs
	 * @param sessionCache
	 * @return le jeux de critères concerné
	 * @throws ObjectPersistenceException
	 */
	public static CriteriaSet getCriteriaSet(ResultSet rs, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		return getCriteriaSet(rs, 0, false, null);
	}
	
	
	private static CriteriaSet getCriteriaSet(ResultSet rs, int numCriteriaSet, boolean doNotUseCache, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		if(rs != null) {
//			try {
//				numCriteriaSet = T_CriteriaSet.NUMCRITERIASET.getValue(rs);
//			} catch (SQLException e) {
//				throw new ObjectPersistenceException(e);
//			}
		}
		
		CriteriaSet criteriaSet = null;
		if(!doNotUseCache)
			criteriaSet = Cache.get(CriteriaSet.class, numCriteriaSet);
		else {
			if(sessionCache == null)
				sessionCache = new SqlLoadingSessionCache();
			
			criteriaSet = sessionCache.get(CriteriaSet.class, new SqlLoadingSessionCache.Key(numCriteriaSet));
		}
			
		if(criteriaSet == null) {
			criteriaSet = new CriteriaSet();
//			criteriaSet.setNumCriteriaSet(numCriteriaSet);
			
			Map<Class<?>,Map<String,Object>> foreignKeysValues = null;
			if(rs == null)
				foreignKeysValues = loadHelper.load(criteriaSet);
			else {
				foreignKeysValues = resultSetLoadHelper.load(criteriaSet, rs);
			}
			
//			criteriaSet.setReglement(ReglementBuilder.getReglement(
//					(UUID)foreignKeysValues.get(CriteriaSet.class).get(T_CriteriaSet.ID_REGLEMENT.getFieldName()),
//					doNotUseCache,
//					sessionCache)
//				);
			
//			criteriaSet.setElements(
//				QResults.from(CriteriaSetElement.class, sessionCache)
//					.where(T_CriteriaSetElement.ID_JEUX_CRITERES_DISCRIMINANT.equalTo(numCriteriaSet))
//					.asList());

			if(!doNotUseCache)
				Cache.put(criteriaSet);
		}
		return criteriaSet;
	}

	@Override
	public CriteriaSet get(ResultSet rs, SqlLoadingSessionCache sessionCache,
			Void binderRessourcesMap) throws ObjectPersistenceException {
		return getCriteriaSet(rs, sessionCache);
	}

	@Override
	public CriteriaSet get(SqlLoadingSessionCache sessionCache,
			Void binderRessourcesMap, Object... primaryKeyValues)
			throws ObjectPersistenceException {
		// TODO Raccord de méthode auto-généré
		return null;
	}
}
