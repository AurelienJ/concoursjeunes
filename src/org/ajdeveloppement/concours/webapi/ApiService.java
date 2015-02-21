/*
 * Créé le 31 juil. 2014 à 13:05:50 pour ArcCompetition
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
package org.ajdeveloppement.concours.webapi;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.ajdeveloppement.commons.ExceptionUtils;
import org.ajdeveloppement.webserver.HttpResponse;
import org.ajdeveloppement.webserver.HttpReturnCode;
import org.ajdeveloppement.webserver.HttpServer;
import org.ajdeveloppement.webserver.HttpSession;
import org.ajdeveloppement.webserver.services.RequestProcessor;
import org.ajdeveloppement.webserver.services.js.ResponseFormatter;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class ApiService implements RequestProcessor {
	
	private Map<String, Method> endpointsServices = new HashMap<>();
	
	private Pattern rgxEntryPoint = Pattern.compile("/api/(?<key>[^/]+)(?:/(?<id>[^/]+))?(?<params>/.+)?", Pattern.CASE_INSENSITIVE); //$NON-NLS-1$
	
	private void discoverJsonServices(Class<?> servicesContainer) {
		for(Method m : servicesContainer.getMethods()) {
			JsonService endPoint = m.getAnnotation(JsonService.class);
			if(endPoint != null 
					&& Modifier.isStatic(m.getModifiers()) 
					&& m.getParameterCount() == 1 && m.getParameterTypes()[0] == HttpSession.class
					&& m.getReturnType() == String.class) {
				endpointsServices.put(endPoint.key(), m);
			}
		}
	}
	
	private String invokeJsonService(HttpSession session, String endPointKey) 
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		String jsonResponse = null;
		
		Method methodService = endpointsServices.get(endPointKey);
		if(methodService != null) {
			jsonResponse = (String)methodService.invoke(null, session);
		}
		
		return jsonResponse;
	}
	
	/* (non-Javadoc)
	 * @see org.ajdeveloppement.webserver.services.RequestProcessor#init()
	 */
	@Override
	public void init(HttpServer server) {
		discoverJsonServices(ContactsModel.class);
		discoverJsonServices(EntitiesModel.class);
		discoverJsonServices(ProfileModel.class);
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.webserver.services.RequestProcessor#canServe(org.ajdeveloppement.webserver.HttpSession)
	 */
	@Override
	public boolean canServe(HttpSession session) {
		if(session.getRequestUri().startsWith("/api")) //$NON-NLS-1$
			return true;
		
		return false;
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.webserver.services.RequestProcessor#serve(org.ajdeveloppement.webserver.HttpSession)
	 */
	@SuppressWarnings("nls")
	@Override
	public HttpResponse serve(HttpSession session) {
		String uri = session.getRequestUri();
		if(uri.startsWith("/api")) {
			Map<String,String> urlParameters = session.getUrlParameters();
			
			String key = null;
			String id = null;
			Matcher m = rgxEntryPoint.matcher(uri);
			if(m.matches()) {
				key = m.group("key");
				id = m.group("id");
			}
			
			if(key == null && urlParameters.containsKey("key"))
				key = urlParameters.get("key");
			
			if(id != null && !id.isEmpty())
				urlParameters.put("id", id);
			
			if(key != null) {
				try {
					String jsonResponse = invokeJsonService(session, key);
					if(jsonResponse != null)
						return ResponseFormatter.getGzipedResponseForOutputTemplate(session, jsonResponse, "application/json");
				} catch (IOException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
					e.printStackTrace();
					
					return new HttpResponse(HttpReturnCode.ServerError.InternalServerError, "text/plain; charset=utf-8", ExceptionUtils.toString(e)); //$NON-NLS-1$ //$NON-NLS-2$
				}
			}
		}
		
		return new HttpResponse(HttpReturnCode.ClientError.NotFound, "text/plain; charset=utf-8", "Unknown request"); //$NON-NLS-1$ //$NON-NLS-2$
	}
}
