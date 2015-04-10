/*
 * Créé le 4 août 2014 à 13:36:13 pour ArcCompetition
 *
 * Copyright 2002-2014 - Aurélien JEOFFRAY
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

import java.util.UUID;

import org.ajdeveloppement.commons.ExceptionUtils;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.webapi.HttpContext;
import org.ajdeveloppement.concours.webapi.annotations.Body;
import org.ajdeveloppement.concours.webapi.annotations.JsonService;
import org.ajdeveloppement.concours.webapi.annotations.JsonServiceId;
import org.ajdeveloppement.concours.webapi.annotations.UrlParameter;
import org.ajdeveloppement.concours.webapi.annotations.WebApiController;
import org.ajdeveloppement.concours.webapi.helpers.JsonHelper;
import org.ajdeveloppement.concours.webapi.models.EntiteModelView;
import org.ajdeveloppement.concours.webapi.models.JsDataTables;
import org.ajdeveloppement.concours.webapi.services.EntiteService;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpReturnCode.ServerError;
import org.ajdeveloppement.webserver.HttpReturnCode.Success;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@WebApiController
public class EntitiesController {
	
	/**
	 * Retourne la liste des entités eventuellement filtré
	 * au format "http://datatables.net" (Json)
	 * 
	 * @param session la requete Http de filtrage
	 * @return réponse json avec la liste des entités trouvé
	 */
	@SuppressWarnings("nls")
	@JsonService(key="entitiesDataTable")
	public static String getEntitiesDataTable(HttpContext context,
			@UrlParameter("search[value]") String searchValue,
			@UrlParameter("length") int length,
			@UrlParameter("start") int start,
			@UrlParameter("draw") int draw) {	
		EntiteService service = new EntiteService();
		
		int nbTotalEntites = service.countAllEntities();
		
		QFilter filter = null;
		if(searchValue != null && !searchValue.isEmpty()) {
			String searchPattern = String.format("%%%s%%", searchValue.toUpperCase());
			filter = T_Entite.NOM.upper().like(searchPattern)
					.or(T_Entite.VILLE.upper().like(searchPattern))
					.or(T_Entite.REFERENCE.upper().like(searchPattern));
		}
		
		int nbFilteredEntites =  nbTotalEntites;
		if(filter != null)
			nbFilteredEntites = service.countEntitiesWithFilter(filter);
		
		int offset = -1;
		if(length > 0)
			offset = start;
				
		JsDataTables jsDataTables = new JsDataTables();
		jsDataTables.setDraw(draw);
		jsDataTables.setRecordsTotal(nbTotalEntites);
		jsDataTables.setRecordsFiltered(nbFilteredEntites);
		jsDataTables.setData(service.getEntitiesWithFilter(filter, length, offset));
		
		return jsDataTables.toJSON();
	}
	
	@JsonService(key="entities",methods=HttpMethod.GET)
	public static String getEntities(HttpContext context, @JsonServiceId UUID id) {

		EntiteService service = new EntiteService();
		if(id != null) {
			EntiteModelView entite = service.getEntiteById(id);
			if(entite != null) {
				return JsonHelper.toJson(entite);
			}
		} else {
			return JsonHelper.toJson(service.getAllEntities());
		}
		
		return null;
	}
	
	@JsonService(key="entities",methods={HttpMethod.PUT, HttpMethod.POST})
	public static String createOrUpdateEntity(HttpContext context, @Body EntiteModelView entiteModelView) {
		boolean success = true;
		String error = null;
		try {
			EntiteService service = new EntiteService();
			service.createOrUpdateEntite(entiteModelView);

			if(context.getSession().getRequestMethod() == HttpMethod.POST)
				context.setReturnCode(Success.CREATED);
			
			return JsonHelper.toJson(entiteModelView);
		} catch (IllegalArgumentException | ObjectPersistenceException e) {
			e.printStackTrace();
			error = ExceptionUtils.toString(e);
			context.setReturnCode(ServerError.InternalServerError);
			success = false;
		}
		
		if(!success)
			return JsonHelper.getFailSuccessResponse(error);
		
		return null;
	}
}
