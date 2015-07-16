/*
 * Créé le 9 avr. 2015 à 17:19:41 pour ArcCompetition
 *
 * Copyright 2002-2015 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.webapi.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.ajdeveloppement.commons.ExceptionUtils;
import org.ajdeveloppement.commons.lifetime.LifeManager;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.Profile;
import org.ajdeveloppement.concours.webapi.UserSessionData;
import org.ajdeveloppement.concours.webapi.models.EntiteModelView;
import org.ajdeveloppement.concours.webapi.models.JsDataTables;
import org.ajdeveloppement.concours.webapi.models.RuleModelView;
import org.ajdeveloppement.concours.webapi.services.RuleService;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpReturnCode.ServerError;
import org.ajdeveloppement.webserver.HttpReturnCode.Success;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.Body;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService.Type;
import org.ajdeveloppement.webserver.services.webapi.annotations.JsonServiceId;
import org.ajdeveloppement.webserver.services.webapi.annotations.UrlParameter;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;
import org.ajdeveloppement.webserver.services.webapi.helpers.HttpSessionHelper;
import org.ajdeveloppement.webserver.services.webapi.helpers.JsonHelper;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@WebApiController
public class RulesController {

	@HttpService(key="rulesDataTable", type=Type.JSON)
	public static JsDataTables getRulesDataTable(HttpContext context,
			@UrlParameter("search[value]") String searchValue,
			@UrlParameter("length") int length,
			@UrlParameter("start") int start,
			@UrlParameter("draw") int draw) {
		RuleService service = LifeManager.get(RuleService.class);
		
		int nbTotalRules = service.countAllRules();
		int nbFilteredRules = nbTotalRules;
		if(searchValue != null && !searchValue.isEmpty())
			nbFilteredRules = service.countRulesByGlobalSearchValue(searchValue);
		
		int offset = -1;
		if(length > 0)
			offset = start;
		
		JsDataTables jsDataTables = new JsDataTables();
		jsDataTables.setDraw(draw);
		jsDataTables.setRecordsTotal(nbTotalRules);
		jsDataTables.setRecordsFiltered(nbFilteredRules);
		jsDataTables.setData(service.getRulesByGlobalSearchValue(searchValue, length, offset));
		
		return jsDataTables;
	}
	
	@HttpService(key="rulesCategories", type=Type.JSON)
	public static Object getRulesCategories(HttpContext context, @JsonServiceId int idRuleCategory) {
		RuleService service = LifeManager.get(RuleService.class);
		
		if(idRuleCategory == 0)
			return service.getAllRulesCategories();
		
		return service.getRulesCategoryById(idRuleCategory);
	}
	
	@HttpService(key="rules", type=Type.JSON)
	public static Object getRules(HttpContext context, @JsonServiceId UUID idRule) {
		RuleService service = LifeManager.get(RuleService.class);
		
		if(idRule == null)
			return service.getAllRules();
		
		return service.getRuleById(idRule);
	}

	@HttpService(key="rules",methods={HttpMethod.PUT, HttpMethod.POST}, type=Type.JSON)
	public static Object createOrUpdateRule(HttpContext context, @Body RuleModelView modelView) {
		//UserSessionData userSessionData = HttpSessionHelper.getUserSessionData(context.getSession());
		RuleService service = LifeManager.get(RuleService.class);
		
		//UUID idUtilisateur = null;
		//if(userSessionData != null)
		//	idUtilisateur = userSessionData.getSessionUser().getIdContact();
		
		try {
			service.createOrUpdateRule(modelView);
		} catch (ObjectPersistenceException e) {
			context.setReturnCode(ServerError.InternalServerError);
			return JsonHelper.getFailSuccessResponse(ExceptionUtils.toString(e));
		}
		
		if(context.getHttpRequest().getRequestMethod() == HttpMethod.POST)
			context.setReturnCode(Success.CREATED);
		
		return modelView;
	}
	
	@HttpService(key="availableEntitiesForRulesCreation", type=Type.JSON)
	public static List<EntiteModelView> getAvailableEntitiesForRulesCreation(HttpContext context) {
		UserSessionData userSessionData = HttpSessionHelper.getUserSessionData(context.getHttpRequest());
		//RuleService service = LifeManager.get(RuleService.class);
		
		List<Entite> entites = new ArrayList<Entite>();
		if(userSessionData != null) {
			Profile profile = userSessionData.getSessionProfile();
			if(profile != null && profile.getEntite() != null) {
				entites.add(profile.getEntite());
				Entite parent = profile.getEntite().getEntiteParent();
				while(parent !=  null) {
					entites.add(parent);
					
					parent = parent.getEntiteParent();
				}
				return entites.stream().map(e -> {
					EntiteModelView entite = new EntiteModelView();
					entite.setId(e.getIdEntite());
					entite.setNom(e.getNom());
					
					return entite;
				}).collect(Collectors.toList());
			}
		}
		
		return null;
	}
}
