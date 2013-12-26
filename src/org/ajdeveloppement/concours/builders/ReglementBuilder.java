/*
 * Créé le 17/03/2007 à 11:10 pour ArcCompetition
 *
 * Copyright 2002-2008 - Aurélien JEOFFRAY
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
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.LoadHelper;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.Cache;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.ResultSetLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.ResultSetRowToObjectBinder;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache.Key;
import org.ajdeveloppement.concours.ApplicationCore;
import org.ajdeveloppement.concours.data.CriteriaSet;
import org.ajdeveloppement.concours.data.Criterion;
import org.ajdeveloppement.concours.data.Reglement;
import org.ajdeveloppement.concours.data.Surclassement;
import org.ajdeveloppement.concours.data.T_CriteriaSet;
import org.ajdeveloppement.concours.data.T_Criterion;
import org.ajdeveloppement.concours.data.T_Reglement;
import org.ajdeveloppement.concours.data.T_Surclassement;
import org.ajdeveloppement.concours.data.T_Tie;
import org.ajdeveloppement.concours.data.Tie;

/**
 * <p>
 * Les régalements son stocké dans la base de donnée. La présente fabrique
 * permet soit de créer un nouveau règlement, soit d'extraire un règlement
 * de la base en se basant sur son nom.
 * </p>
 * 
 * @author Aurélien JEOFFRAY
 * @version 1.0
 *
 */
public class ReglementBuilder implements ResultSetRowToObjectBinder<Reglement,Void> {
	
	private static LoadHelper<Reglement,Map<String,Object>> loadHelper = SqlLoadFactory.getLoadHelper(Reglement.class);
	private static LoadHelper<Reglement,ResultSet> resultSetLoadHelper = ResultSetLoadFactory.getLoadHelper(Reglement.class);

	/**
	 * Crée un nouveau règlement de concours
	 * 
	 * @return le règlement créer
	 */
	public static Reglement createReglement() {
		return getDefaultReglement(); 
	}
	
	/**
	 * <p>
	 * Retourne le règlement identifié par son numéro dans la base.
	 * Si aucun régalement ne correspond au numéro, celui ci est initialisé par défaut
	 * (équivalent à createReglement()).
	 * </p>
	 * <p>
	 * Pour fonctionner correctement, "ApplicationCore.dbConnection" doit auparavant être
	 * correctement instancié.
	 * </p>
	 * 
	 * @param idReglement le numéro du règlement à construire
	 * 
	 * @return le régalement construit à partir du numéro
	 * @throws ObjectPersistenceException 
	 */
	public static Reglement getReglement(UUID idReglement) throws ObjectPersistenceException {
		return getReglement(idReglement, null, false, null);
	}
	
	/**
	 * <p>
	 * Retourne le règlement identifié par son numéro dans la base.
	 * Si aucun régalement ne correspond au numéro, celui ci est initialisé par défaut
	 * (équivalent à createReglement()).
	 * </p>
	 * <p>
	 * Pour fonctionner correctement, "ApplicationCore.dbConnection" doit auparavant être
	 * correctement instancié.
	 * </p>
	 * 
	 * @param idReglement le numéro du règlement à construire
	 * @param doNotUseCache	ne pas utiliser le cache pour le chargement
	 * 
	 * @return le régalement construit à partir du numéro
	 * @throws ObjectPersistenceException 
	 */
	public static Reglement getReglement(UUID idReglement, boolean doNotUseCache) throws ObjectPersistenceException {
		return getReglement(idReglement, null, doNotUseCache, null);
	}
	
	/**
	 * <p>
	 * Retourne le règlement identifié par son numéro dans la base.
	 * Si aucun régalement ne correspond au numéro, celui ci est initialisé par défaut
	 * (équivalent à createReglement()).
	 * </p>
	 * <p>
	 * Pour fonctionner correctement, "ApplicationCore.dbConnection" doit auparavant être
	 * correctement instancié.
	 * </p>
	 * 
	 * @param idReglement le numéro du règlement à construire
	 * @param doNotUseCache	ne pas utiliser le cache pour le chargement
	 * @param sessionCache 
	 * 
	 * @return le régalement construit à partir du numéro
	 * @throws ObjectPersistenceException 
	 */
	public static Reglement getReglement(UUID idReglement, boolean doNotUseCache, SqlLoadingSessionCache sessionCache) throws ObjectPersistenceException {
		return getReglement(idReglement, null, doNotUseCache, sessionCache);
	}
	
	/**
	 * Injecte les données du resultset d'une table reglement dans
	 * un objet.
	 * 
	 * @param rs le jeux de résultat à injecter dans une instance réglement
	 * 
	 * @return le réglement construit à partir du jeux de résultat
	 * @throws ObjectPersistenceException
	 */
	public static Reglement getReglement(ResultSet rs)
			throws ObjectPersistenceException {
		return getReglement(null, rs, false, null);
	}
	
	/**
	 * Injecte les données du resultset d'une table reglement dans
	 * un objet.
	 * 
	 * @param rs le jeux de résultat à injecter dans une instance réglement
	 * @param sessionCache 
	 * 
	 * @return le réglement construit à partir du jeux de résultat
	 * @throws ObjectPersistenceException
	 */
	public static Reglement getReglement(ResultSet rs, SqlLoadingSessionCache sessionCache)
			throws ObjectPersistenceException {
		return getReglement(null, rs, false, sessionCache);
	}
	
	/**
	 * Injecte les données du resultset d'une table reglement dans
	 * un objet.
	 * 
	 * @param rs le jeux de résultat à injecter dans une instance réglement
	 * @param doNotUseCache	ne pas utiliser le cache pour le chargement
	 * 
	 * @return le réglement construit à partir du jeux de résultat
	 * @throws ObjectPersistenceException
	 */
	public static Reglement getReglement(ResultSet rs, boolean doNotUseCache)
			throws ObjectPersistenceException {
		return getReglement(null, rs, doNotUseCache, null);
	}
	
	private static Reglement getReglement(UUID idReglement, ResultSet rs, boolean doNotUseCache, SqlLoadingSessionCache sessionCache)
			throws ObjectPersistenceException {
		
		try {
			if(rs != null)
				idReglement = T_Reglement.ID_REGLEMENT.getValue(rs);
			
			Reglement reglement = null;
			if(!doNotUseCache) {
				reglement = Cache.get(Reglement.class, idReglement);
			} else {
				if(sessionCache == null)
					sessionCache = new SqlLoadingSessionCache();
				else
					reglement = sessionCache.get(Reglement.class, new Key(idReglement));
			}
			
			if(reglement == null) {
				reglement = new Reglement();
				reglement.setVersion(Reglement.CURRENT_VERSION);
		
		
				Map<Class<?>, Map<String,Object>> foreignKeys = null;
				if(rs != null) {
					foreignKeys = resultSetLoadHelper.load(reglement, rs);
					
					idReglement = reglement.getIdReglement();
				} else {
					reglement.setIdReglement(idReglement);
					
					foreignKeys = loadHelper.load(reglement);
				}
				
				if(!doNotUseCache)
					Cache.put(reglement);
				else
					sessionCache.put(reglement);
				
				reglement.setFederation(
						FederationBuilder.getFederation(
								(UUID)foreignKeys.get(Reglement.class).get(T_Reglement.ID_ENTITE.getFieldName())));
				
				Statement stmt = ApplicationCore.dbConnection.createStatement();
				try {
					reglement.setTie(
							QResults.from(Tie.class, sessionCache).where(T_Tie.ID_REGLEMENT.equalTo(idReglement)).orderBy(T_Tie.NUMORDRE).asList());
					
					// Récupération des critères
					List<Criterion> criteria = new ArrayList<Criterion>();

					try(ResultSet rsCriterion = QResults.from(Criterion.class)
							.where(T_Criterion.ID_REGLEMENT.equalTo(idReglement))
							.orderBy(T_Criterion.NUMORDRE)
							.asResultSet()) {

						while(rsCriterion.next()) {
							criteria.add(CriterionBuilder.getCriterion(reglement, rsCriterion, doNotUseCache));
						}
					}
					reglement.setListCriteria(criteria);
					
					// Récupération des distances blason
					reglement.setListPlacementCriteriaSet(
						QResults.from(CriteriaSet.class, sessionCache)
							.where(T_CriteriaSet.ID_REGLEMENT.equalTo(idReglement).and(T_CriteriaSet.ID_DISTANCESBLASONS.isNotNull()))
							.asList());
					
					// Récupération des surclassements
					reglement.setSurclassements(
							QResults.from(Surclassement.class, sessionCache).where(T_Surclassement.ID_REGLEMENT.equalTo(idReglement)).asList());
				} finally {
					stmt.close();
				}
			}
			
			return reglement;
		} catch (SQLException e) {
			throw new ObjectPersistenceException(e);
		}
	}
	
	private static Reglement getDefaultReglement() {
		Reglement reglement = new Reglement();
		
		reglement.setVersion(Reglement.CURRENT_VERSION);
		reglement.setName("C"+(new Date().getTime())); //$NON-NLS-1$
		reglement.setNbVoleeParSerie(10);

		return reglement;
	}

	@Override
	public Reglement get(ResultSet rs, SqlLoadingSessionCache sessionCache, Void binderRessourcesMap)
			throws ObjectPersistenceException {
		return getReglement(rs, sessionCache);
	}

	@Override
	public Reglement get(SqlLoadingSessionCache sessionCache,
			Void binderRessourcesMap, Object... primaryKeyValues)
			throws ObjectPersistenceException {
		// TODO Raccord de méthode auto-généré
		return null;
	}
}
