/*
 * Créé le 22 mai 07 à 14:13:58 pour ArcCompetition
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

import org.ajdeveloppement.commons.persistence.LoadHelper;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.ResultSetLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.ResultSetRowToObjectBinder;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache;
import org.ajdeveloppement.concours.data.Criterion;
import org.ajdeveloppement.concours.data.Rule;
import org.ajdeveloppement.concours.data.T_Criterion;
import org.ajdeveloppement.concours.managers.CriterionElementManager;

/**
 * Permet l'instanciation d'un objet critère
 * 
 * @author Aurélien JEOFFRAY
 *
 */
public class CriterionBuilder implements ResultSetRowToObjectBinder<Criterion, Rule> {
	
	private static LoadHelper<Criterion,Map<String,Object>> loadHelper = SqlLoadFactory.getLoadHelper(Criterion.class);
	private static LoadHelper<Criterion,ResultSet> resultSetLoadHelper = ResultSetLoadFactory.getLoadHelper(Criterion.class);
	
	/**
	 * Retourne un critère à partir des informations en base
	 * 
	 * @param codeCritere le code du critère à construire
	 * @param reglement le réglement parent du critère
	 * 
	 * @return le critère correspondant
	 * @throws ObjectPersistenceException 
	 */
	public static Criterion getCriterion(String codeCritere, Rule reglement, SqlContext context) throws ObjectPersistenceException {
		return getCriterion(codeCritere, reglement, null, false, context);
	}
	
	/**
	 * Retourne un critère à partir des informations en base
	 * 
	 * @param codeCritere le code du critère à construire
	 * @param reglement le réglement parent du critère
	 * @param doNotUseCache si <code>true</code>, ne pas utiliser le cache (force la création d'une instance à partir de la base)
	 * 
	 * @return le critère correspondant
	 * @throws ObjectPersistenceException 
	 */
	public static Criterion getCriterion(String codeCritere, Rule reglement, boolean doNotUseCache, SqlContext context) throws ObjectPersistenceException {
		return getCriterion(codeCritere, reglement, null, doNotUseCache, context);
	}
	
	/**
	 * Retourne un critère à partir des informations en base
	 * 
	 * @param reglement le réglement parent du critère
	 * @param rs le jeux de résultat SQL contenant les informations du critère
	 * 
	 * @return le critère correspondant
	 * @throws ObjectPersistenceException 
	 */
	public static Criterion getCriterion(Rule reglement, ResultSet rs, SqlContext context) throws ObjectPersistenceException {
		return getCriterion(null, reglement, rs, false, context);
	}
	
	/**
	 * Retourne un critère à partir des informations en base
	 * 
	 * @param reglement le réglement parent du critère
	 * @param rs le jeux de résultat SQL contenant les informations du critère
	 * @param doNotUseCache si <code>true</code>, ne pas utiliser le cache (force la création d'une instance à partir de la base)
	 * 
	 * @return le critère correspondant
	 * @throws ObjectPersistenceException 
	 */
	public static Criterion getCriterion(Rule reglement, ResultSet rs, boolean doNotUseCache, SqlContext context) throws ObjectPersistenceException {
		return getCriterion(null, reglement, rs, doNotUseCache, context);
	}
	
	/**
	 * Retourne un critère à partir des informations en base
	 * 
	 * @param codeCritere Le code du critère à retourner  (si aucun jeux de résultat n'est fournit)
	 * @param reglement le réglement associé au critère
	 * @param rs le jeux de résultat SQL contenant le critère (si le code n'est pas fournit)
	 * @param doNotUseCache si <code>true</code>, ne pas utiliser le cache (force la création d'une instance à partir de la base)
	 * 
	 * @return le critère demandé
	 * @throws ObjectPersistenceException
	 */
	private static Criterion getCriterion(String codeCritere, Rule reglement, ResultSet rs, boolean doNotUseCache, SqlContext context) throws ObjectPersistenceException {
		if(rs != null) {
			try {
				codeCritere = T_Criterion.CODE.getValue(rs);
			} catch (SQLException e) {
				throw new ObjectPersistenceException(e);
			}
		}
		
		Criterion criterion = null;
		
		if(!doNotUseCache && context != null)
			criterion = context.getCache().get(Criterion.class, codeCritere, reglement.getIdRule());
		
		if(criterion == null) {
			criterion = new Criterion();
			criterion.setReglement(reglement);
			if(rs == null) {
				criterion.setCode(codeCritere);
				
				loadHelper.load(criterion);
			} else {
				resultSetLoadHelper.load(criterion, rs);
			}
			
			if(!doNotUseCache&& context != null)
				context.getCache().put(criterion);
			
			criterion.setCriterionElements(CriterionElementManager.getAllCriterionElementsFor(criterion));
		}

		return criterion;
	}

	@Override
	public Criterion get(ResultSet rs, SqlContext context, SqlLoadingSessionCache sessionCache,
			Rule binderRessourcesMap) throws ObjectPersistenceException {
		return getCriterion(binderRessourcesMap, rs, context);
	}

	@Override
	public Criterion get(SqlContext context, SqlLoadingSessionCache sessionCache,
			Rule binderRessourcesMap, Object... primaryKeyValues)
			throws ObjectPersistenceException {
		// TODO Raccord de méthode auto-généré
		return null;
	}
}