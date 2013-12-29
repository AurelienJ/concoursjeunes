/*
 * Créé le 22 mai 07 à 15:43:45 pour ArcCompetition
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
import java.sql.SQLException;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.LoadHelper;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.ResultSetLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.ResultSetRowToObjectBinder;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache;
import org.ajdeveloppement.concours.data.Distance;
import org.ajdeveloppement.concours.data.DistancesEtBlason;
import org.ajdeveloppement.concours.data.T_Distance;
import org.ajdeveloppement.concours.data.T_DistancesEtBlason;


/**
 * @author Aurélien JEOFFRAY
 *
 */
public class DistancesEtBlasonBuilder implements ResultSetRowToObjectBinder<DistancesEtBlason,Void> {
	
	private static LoadHelper<DistancesEtBlason,Map<String,Object>> loadHelper = SqlLoadFactory.getLoadHelper(DistancesEtBlason.class);
	private static LoadHelper<DistancesEtBlason,ResultSet> resultSetLoadHelper = ResultSetLoadFactory.getLoadHelper(DistancesEtBlason.class);
	
	/**
	 * Construit un objet DistancesEtBlason en se basan sur le numero de sa reference
	 * en base ainsi que le numero de réglement.<br>
	 * Associe à l'objet DistancesEtBlason l'objet Rule lié
	 * 
	 * @param idDistancesblason Le numero de la ligne en base
	 * 
	 * @return l'objet DistancesEtBlason généré
	 * @throws ObjectPersistenceException 
	 */
	public static DistancesEtBlason getDistancesEtBlason(UUID idDistancesblason) throws ObjectPersistenceException {
		return getDistancesEtBlason(idDistancesblason, null, false, null);
	}
	
	/**
	 * Construit un objet DistancesEtBlason en se basan sur le numero de sa reference
	 * en base ainsi que le numero de réglement.<br>
	 * Associe à l'objet DistancesEtBlason l'objet Rule lié
	 * 
	 * @param idDistancesblason Le numero de la ligne en base
	 * @param doNotUseCache ne pas utiliser le cache
	 * 
	 * @return l'objet DistancesEtBlason généré
	 * @throws ObjectPersistenceException 
	 */
	public static DistancesEtBlason getDistancesEtBlason(UUID idDistancesblason, boolean doNotUseCache) throws ObjectPersistenceException {
		return getDistancesEtBlason(idDistancesblason, null, doNotUseCache, null);
	}
	
	/**
	 * Retourne le {@link DistancesEtBlason} associé à la ligne de résultat SQL fournit en paramètre. Un cache de session
	 * peut être utilisé pour acceler l'opération de chargement, réduire le nombre d'instance, et accessoirement eviter
	 * les opérations de chargement en boucle.
	 * 
	 * @param rs la ligne de résultat SQL contenant les informations de construction du {@link DistancesEtBlason}
	 * @param sessionCache cache de session utilisé lors de la session de construction
	 * @return le {@link DistancesEtBlason} généré à partir du jeux de résultat.
	 * 
	 * @throws ObjectPersistenceException
	 */
	public static DistancesEtBlason getDistancesEtBlason(ResultSet rs, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		return getDistancesEtBlason(null, rs, false, sessionCache);
	}
	
	/**
	 * Retourne le {@link DistancesEtBlason} associé à la ligne de résultat SQL fournit en paramètre. Le cache
	 * global peut être désactiver pour forcer le rechargement des données à partir de la base.
	 * 
	 * @param rs la ligne de résultat SQL contenant les informations de construction du {@link DistancesEtBlason}
	 * @param doNotUseCache indique de ne pas utiliser le cache global pour les opérations de chargement
	 * @return le {@link DistancesEtBlason} généré à partir du jeux de résultat.
	 * @throws ObjectPersistenceException
	 */
	public static DistancesEtBlason getDistancesEtBlason(ResultSet rs, boolean doNotUseCache) throws ObjectPersistenceException {
		return getDistancesEtBlason(null, rs, doNotUseCache, null);
	}
	
	/**
	 * Retourne le {@link DistancesEtBlason} associé à la ligne de résultat SQL fournit en paramètre. Le cache
	 * global peut être désactiver pour forcer le rechargement des données à partir de la base.
	 * Un cache de session peut être utiliser pour acceler l'opération de chargement, réduire le nombre d'instance, et accessoirement eviter
	 * les opérations de chargement en boucle. Ce cache de session ne sera utilisé que si <code>doNotUseCache</code> est à <code>true</code>
	 * 
	 * @param rs la ligne de résultat SQL contenant les informations de construction du {@link DistancesEtBlason}
	 * @param doNotUseCache indique de ne pas utiliser le cache global pour les opérations de chargement
	 * @param sessionCache cache de session utilisé lors de la session de construction si <code>doNotUseCache</code> est à <code>true</code>
	 * @return le {@link DistancesEtBlason} généré à partir du jeux de résultat.
	 * @throws ObjectPersistenceException
	 */
	public static DistancesEtBlason getDistancesEtBlason(ResultSet rs, boolean doNotUseCache, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		return getDistancesEtBlason(null, rs, doNotUseCache, sessionCache);
	}
	
	/**
	 * Construit un objet DistancesEtBlason en se basan sur le numero de sa reference
	 * en base ainsi que le numero de réglement.<br>
	 * Associe à l'objet DistancesEtBlason l'objet Rule lié
	 * 
	 * @param idDistancesBlason Le numero de la ligne en base
	 * @param reglement Le réglement à lié
	 * @param doNotUseCache le pas utiliser le cache
	 * 
	 * @return l'objet DistancesEtBlason généré
	 * @throws ObjectPersistenceException 
	 */
	private static DistancesEtBlason getDistancesEtBlason(UUID idDistancesBlason, ResultSet rs, 
			boolean doNotUseCache, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		DistancesEtBlason distancesEtBlason = new DistancesEtBlason();
		
		try {
			if(rs == null) {
				distancesEtBlason.setIdDistancesBlason(idDistancesBlason);
			} else {
				idDistancesBlason = T_DistancesEtBlason.ID_DISTANCESBLASONS.getValue(rs);
			}

			Map<Class<?>, Map<String,Object>> foreignKeys = null;
			
			if(rs == null) {
				foreignKeys = loadHelper.load(distancesEtBlason);
			} else {
				foreignKeys = resultSetLoadHelper.load(distancesEtBlason, rs);
			}
			
			distancesEtBlason.setDistances(
					QResults.from(Distance.class, sessionCache)
						.where(T_Distance.ID_DISTANCESBLASONS.equalTo(idDistancesBlason))
						.orderBy(T_Distance.NUMORDRE)
						.asList());
			
			if(foreignKeys != null) {
				distancesEtBlason.setTargetFace(FaceBuilder.getBlason((UUID)foreignKeys.get(DistancesEtBlason.class)
						.get(T_DistancesEtBlason.NUMBLASON.getFieldName())));
			}
		} catch (SQLException e) {
			throw new ObjectPersistenceException(e);
		}
		
		return distancesEtBlason;
	}

	@Override
	public DistancesEtBlason get(ResultSet rs, SqlLoadingSessionCache sessionCache, Void binderRessourcesMap)
			throws ObjectPersistenceException {
		return getDistancesEtBlason(rs, sessionCache);
	}

	@Override
	public DistancesEtBlason get(SqlLoadingSessionCache sessionCache,
			Void binderRessourcesMap, Object... primaryKeyValues)
			throws ObjectPersistenceException {
		// TODO Raccord de méthode auto-généré
		return null;
	}
}
