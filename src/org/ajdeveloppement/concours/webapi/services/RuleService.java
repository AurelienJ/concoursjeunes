/*
 * Créé le 9 avr. 2015 à 17:05:03 pour ArcCompetition
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

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.Rule;
import org.ajdeveloppement.concours.data.RulesCategory;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.data.T_Rule;
import org.ajdeveloppement.concours.data.T_RulesCategory;
import org.ajdeveloppement.concours.webapi.adapters.RuleAdapter;
import org.ajdeveloppement.concours.webapi.adapters.RulesCategoryAdapter;
import org.ajdeveloppement.concours.webapi.models.RuleModelView;
import org.ajdeveloppement.concours.webapi.models.RulesCategoryModelView;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class RuleService {

	/**
	 * 
	 */
	public RuleService() {
	}
	
	
	
	private List<RuleModelView> asModelViewList(List<Rule> rules) {
		RuleAdapter adapter = new RuleAdapter();
		return rules.stream().map(r -> adapter.toModelView(r)).collect(Collectors.toList());
	}
	
	@SuppressWarnings("nls")
	private QResults<Rule, Void> queryRulesByGlobalSearchValue(String search, int length, int offset) {
		return T_Rule.all()
				.leftJoin(RulesCategory.class, T_Rule.NUMCATEGORIE_REGLEMENT.equalTo(T_RulesCategory.NUMCATEGORIE_REGLEMENT))
				.leftJoin(Entite.class, T_Rule.ID_ENTITE.equalTo(T_Entite.ID_ENTITE))
				.where(T_Rule.NOM.like("%" + search + "%")
						.or(T_RulesCategory.NOMCATEGORIE.like("%" + search + "%"))
						.or(T_Entite.NOM.like("%" + search + "%")))
				.limit(length, offset);
	}
	
	public int countAllRules() {
		return T_Rule.all().count();
	}
	
	
	public int countRulesByGlobalSearchValue(String search) {
		return queryRulesByGlobalSearchValue(search, -1, -1).count();
	}

	public List<RuleModelView> getAllRules() {
		List<Rule> rules = T_Rule.all().where(T_Rule.ID_COMPETITION.isNull()).asList();
		
		return asModelViewList(rules);
	}
	
	public List<RuleModelView> getRulesByGlobalSearchValue(String search, int length, int offset) {
		return asModelViewList(queryRulesByGlobalSearchValue(search, length, offset).asList());
	}
	
	public List<RuleModelView> getRulesForEntity(UUID idEntity) {
		if(idEntity != null) {
			List<Rule> rules = T_Rule.all().where(T_Rule.ID_ENTITE.equalTo(idEntity)).asList();
			
			return asModelViewList(rules);
		}
		
		return null;
	}
	
	public List<RuleModelView> getRulesForCompetition(UUID idCompetition) {
		if(idCompetition != null) {
			List<Rule> rules = T_Rule.all().where(T_Rule.ID_COMPETITION.equalTo(idCompetition)).asList();
			
			return asModelViewList(rules);
		}
		
		return null;
	}
	
	public RuleModelView getRuleById(UUID idRule) {
		Rule rule = T_Rule.getInstanceWithPrimaryKey(idRule);
		RuleAdapter adapter = new RuleAdapter();
		
		return adapter.toModelView(rule);
	}
	
	@SuppressWarnings("nls")
	public void createOrUpdateRule(RuleModelView ruleModelView) throws ObjectPersistenceException {
		Rule rule = null;
		if(ruleModelView.getIdRule() != null)
			rule = T_Rule.getInstanceWithPrimaryKey(ruleModelView.getIdRule());
		
		RuleAdapter adapter = new RuleAdapter(rule);
		rule = adapter.toModel(ruleModelView);
		
		if(ruleModelView.getDepartages() != null) {
			//Suppression de tous les départages qui n'existe plus
			List<String> departages = Arrays.asList(ruleModelView.getDepartages().split(","));
			rule.getTie().stream().filter(t -> !departages.contains(t.getFieldName())).forEach(t -> {
				try {
					t.delete();
				} catch (Exception e) {
					throw new UncheckedException(e);
				}
			});
			rule.getTie().removeIf(t -> !departages.contains(t.getFieldName()));
		}
		
		if(rule.getIdRule() != ruleModelView.getIdRule())
			ruleModelView.setIdRule(rule.getIdRule());
		
		rule.save();
	}
	
	public List<RulesCategoryModelView> getAllRulesCategories() {
		RulesCategoryAdapter adapter = new RulesCategoryAdapter();
		
		return T_RulesCategory.all().asList().stream().map(r -> adapter.toModelView(r)).collect(Collectors.toList());
	}
	
	public RulesCategoryModelView getRulesCategoryById(int id) {
		RulesCategoryAdapter adapter = new RulesCategoryAdapter();
		
		return adapter.toModelView(T_RulesCategory.getInstanceWithPrimaryKey(id));
	}
}
