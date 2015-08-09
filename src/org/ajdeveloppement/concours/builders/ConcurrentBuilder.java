/*
 * Copyright 2002-2008 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.builders;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.LoadHelper;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.DefaultSqlBuilder;
import org.ajdeveloppement.commons.persistence.sql.ResultSetLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.ResultSetRowToObjectBinder;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadFactory;
import org.ajdeveloppement.commons.persistence.sql.SqlLoadingSessionCache;
import org.ajdeveloppement.concours.ApplicationCore;
import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.Civility;
import org.ajdeveloppement.concours.data.Concurrent;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.CriteriaSet;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.Rule;
import org.ajdeveloppement.concours.data.T_Contact;

/**
 * Initialise un concurrent
 * 
 * @author Aurélien JEOFFRAY
 * @version 1.0
 */
public class ConcurrentBuilder implements ResultSetRowToObjectBinder<Concurrent,Rule>{

	private static LoadHelper<Archer,Map<String,Object>> loadHelper = SqlLoadFactory.getLoadHelper(Archer.class);
	private static LoadHelper<Archer,ResultSet> resultSetLoadHelper = ResultSetLoadFactory.getLoadHelper(Archer.class);
	
	/**
	 * Construit un concurrent à partir de l'enregistrement SQL fournit en paramètre. Le ResultSet doit contenir
	 * l'ensemble des champs des tables "ARCHER" et "CONTACT". Dans le cas contraire, invoque une exception
	 * 
	 * @param resultSet le jeux de résultat SQL contenant les données du concurrent
	 * @param reglement reglement le reglement appliqué à l'archer pour le qualifier en concurrent
	 * @return le concurrent produit
	 */
	public static Concurrent getConcurrent(ResultSet resultSet, Rule reglement, SqlContext context) {
		return getConcurrent(null, resultSet, reglement, context);
	}
	
	/**
	 * Construit un concurrent à partir de l'identifiant de l'archer en base et d'un réglement
	 * donnée
	 * 
	 * @param idArcher l'identifiant de l'archer
	 * @param reglement le reglement appliqué
	 * @return le concurrent construit
	 */
	public static Concurrent getConcurrent(UUID idArcher, Rule reglement) {
		return getConcurrent(idArcher, null, reglement, SqlContext.getDefaultContext());
	}
	
	/**
	 * Construit un concurrent à partir de l'identifiant de l'archer en base ou d'un jeux de résultat SQL et d'un réglement
	 * donnée. Si l'identifiant de l'archer est fournit, resultSet est ignoré.
	 * 
	 * @param idArcher l'identifiant de l'archer
	 * @param resultSet le jeux de résultat SQL contenant les données du concurrent si idArcher est null
	 * @param reglement le reglement appliqué
	 * @return l'archer construit
	 */
	private static Concurrent getConcurrent(UUID idArcher, ResultSet resultSet, Rule reglement, SqlContext context) {
		Concurrent concurrent = new Concurrent();

		try {
			Map<Class<?>, Map<String, Object>> foreignKeyValue;
			if(idArcher != null) {
				foreignKeyValue = loadHelper.load(concurrent, Collections.<String, Object>singletonMap(T_Contact.ID_CONTACT.getFieldName(), idArcher));
			} else {
				foreignKeyValue = resultSetLoadHelper.load(concurrent, resultSet);
			}
			
			UUID idCivility = (UUID)foreignKeyValue.get(Contact.class).get(T_Contact.ID_CIVILITY.getFieldName());
			if(idCivility != null) {
				DefaultSqlBuilder<Civility, Void> sqlBuilder = new DefaultSqlBuilder<>(Civility.class);
				concurrent.setCivility(sqlBuilder.get(SqlContext.getDefaultContext(), null, null, idCivility));
			}
			
			UUID idEntite = (UUID)foreignKeyValue.get(Contact.class).get(T_Contact.ID_ENTITE.getFieldName());
			if(idEntite != null) {
				DefaultSqlBuilder<Entite, Void> sqlBuilder = new DefaultSqlBuilder<>(Entite.class);
				concurrent.setEntite(sqlBuilder.get(SqlContext.getDefaultContext(), null, null, idEntite));
			}

			if(reglement != null) {
				CriteriaSet differentiationCriteria = null;
				String sql = "select NUMCRITERIASET from DISTINGUER where ID_CONTACT=? and ID_REGLEMENT=?"; //$NON-NLS-1$
				if(!ApplicationCore.dbConnection.isClosed()) {
					try (PreparedStatement pstmt = ApplicationCore.dbConnection.prepareStatement(sql)) {
						pstmt.setString(1, concurrent.getIdContact().toString());
						pstmt.setObject(2, reglement.getIdRule());
					
						try (ResultSet rsCriteriaSet = pstmt.executeQuery()) {
							if(rsCriteriaSet.first()) {
								differentiationCriteria = CriteriaSetBuilder
										.getCriteriaSet(rsCriteriaSet.getInt("NUMCRITERIASET"), context); //$NON-NLS-1$
							} else {
//								differentiationCriteria = new CriteriaSet(reglement);
//								for(Criterion key : reglement.getListCriteria()) {
//									boolean returnfirstval = true;
//									
//									if(returnfirstval) {
//										int valindex = 0;
//										while(valindex < key.getCriterionElements().size())
//											valindex++;
//										if(valindex < key.getCriterionElements().size())
//											differentiationCriteria.addCriterionElement(key.getCriterionElements().get(valindex));
//										else
//											return null;
//									}
//								}
							}
						}
					}
				}
				
				//régle de surclassement de l'archer
//				Surclassement surclassement = reglement.getSurclassement(differentiationCriteria);
//				if(surclassement != null) {
//					CriteriaSet tmpCS = surclassement.getCriteriaSetSurclasse();
//					
//					if(tmpCS == null) //si la categorie est invalide alors ne pas renvoyer l'archer
//						return null;
//					differentiationCriteria = tmpCS; //sinon retourner sa catégorie de surclassement
//					concurrent.setSurclassement(true);
//				}				
//
//				concurrent.setCriteriaSet(differentiationCriteria);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return concurrent;
	}
	
	/**
	 * Construit un nouveau concurrent à parametrer en se basant sur le reglement donnée
	 * 
	 * @param reglement
	 * @return L'objet concurrent produit à partir du reglement
	 */
	public static Concurrent getConcurrent(Rule reglement) {
		Concurrent concurrent = new Concurrent();
		
//		CriteriaSet differentiationCriteria = new CriteriaSet();
//		for(Criterion key : reglement.getListCriteria()) {
//			differentiationCriteria.addCriterionElement(key.getCriterionElements().get(0));
//		}
//		concurrent.setCriteriaSet(differentiationCriteria);
		
		return concurrent;
	}

	@Override
	public Concurrent get(ResultSet rs, SqlContext context, SqlLoadingSessionCache sessionCache, Rule binderRessourcesMap)
			throws ObjectPersistenceException {
		return getConcurrent(rs, binderRessourcesMap, context);
	}

	@Override
	public Concurrent get(SqlContext context, SqlLoadingSessionCache sessionCache,
			Rule binderRessourcesMap, Object... primaryKeyValues)
			throws ObjectPersistenceException {
		// TODO Raccord de méthode auto-généré
		return null;
	}
}
