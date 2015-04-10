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
import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.Parameter;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.ajdeveloppement.commons.ExceptionUtils;
import org.ajdeveloppement.concours.webapi.annotations.Body;
import org.ajdeveloppement.concours.webapi.annotations.JsonService;
import org.ajdeveloppement.concours.webapi.annotations.JsonServiceId;
import org.ajdeveloppement.concours.webapi.annotations.UrlParameter;
import org.ajdeveloppement.concours.webapi.controllers.ContactsController;
import org.ajdeveloppement.concours.webapi.controllers.EntitiesController;
import org.ajdeveloppement.concours.webapi.controllers.ProfileController;
import org.ajdeveloppement.concours.webapi.controllers.ReferencesController;
import org.ajdeveloppement.concours.webapi.controllers.RulesController;
import org.ajdeveloppement.concours.webapi.helpers.Converter;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpResponse;
import org.ajdeveloppement.webserver.HttpReturnCode;
import org.ajdeveloppement.webserver.HttpServer;
import org.ajdeveloppement.webserver.HttpSession;
import org.ajdeveloppement.webserver.services.RequestProcessor;
import org.ajdeveloppement.webserver.services.js.ResponseFormatter;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class ApiService implements RequestProcessor {
	
	private Map<String, Map<HttpMethod, Method>> endpointsServices = new HashMap<>();
	
	private static Pattern rgxEntryPoint = Pattern.compile("/api/(?<key>[^/]+)(?:/(?<id>[^/]+))?(?<params>/.+)?/?", Pattern.CASE_INSENSITIVE); //$NON-NLS-1$
	private static Pattern rgxSubEntryPoint = Pattern.compile("/(?<key>[^/]+)(?:/(?<id>[^/]+))?(?<params>/.+)?/?", Pattern.CASE_INSENSITIVE); //$NON-NLS-1$
	
	/**
	 * Discover endpoint api service in a service container class.
	 * An endpoint service method is a static method with first parameters {@link HttpContext}
	 * and an annotation {@link JsonService}
	 * 
	 * @param servicesContainer the container taht contains service endpoint method
	 */
	private void discoverJsonServices(Class<?> servicesContainer) {
		for(Method m : servicesContainer.getMethods()) {
			JsonService endPoint = m.getAnnotation(JsonService.class);
			if(endPoint != null 
					&& Modifier.isStatic(m.getModifiers()) 
					&& m.getParameterCount() >= 1 && m.getParameterTypes()[0] == HttpContext.class
					&& m.getReturnType() == String.class) {			
				if(!endpointsServices.containsKey(endPoint.key()))
					endpointsServices.put(endPoint.key(), new HashMap<HttpMethod, Method>());
				
				for(HttpMethod method : endPoint.methods())
					endpointsServices.get(endPoint.key()).put(method, m);
			}
		}
	}
	
	private String invokeJsonService(HttpContext context, String endPointKey, String[] ids) 
			throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException {
		String jsonResponse = null;

		Map<HttpMethod, Method> serviceMethod = endpointsServices.get(endPointKey);
		if(serviceMethod != null) {
			Method methodService = serviceMethod.get(context.getSession().getRequestMethod());
			if(methodService != null) {
				
				Object[] params = new Object[methodService.getParameterCount()];
				Arrays.fill(params, null);
				params[0] = context;
				
				int idParameterIndex = 0;
				for(int i = 1; i < methodService.getParameterCount(); i++) {
					
					Parameter parameter =methodService.getParameters()[i];
					Annotation[] parametersAnnotation = parameter.getAnnotations();
					
					Class<?> parameterType = methodService.getParameterTypes()[i];
					if(parametersAnnotation != null && parametersAnnotation.length > 0) {							
						if(parameter.isAnnotationPresent(Body.class)) {
							String jsonEntity = context.getSession().readContentAsString(Charset.forName("UTF-8")); //$NON-NLS-1$
							
							ObjectMapper jsonMapper = new ObjectMapper();
							Object entiteModelView = jsonMapper.readValue(jsonEntity, methodService.getParameterTypes()[i]);
							
							params[i] = entiteModelView;
						} else if(parameter.isAnnotationPresent(UrlParameter.class)) {
							String key = parameter.getAnnotation(UrlParameter.class).value();
							if(key.isEmpty())
								key = parameter.getName();
							
							Map<String, String> urlParameters = context.getSession().getUrlParameters();
							if(urlParameters.containsKey(key)) {
								String strValue =  urlParameters.get(key);
								Object typedValue = Converter.parse(parameterType, strValue);
								params[i] = typedValue;
							}
						} else if(parameter.isAnnotationPresent(JsonServiceId.class)) {
							int index = parameter.getAnnotation(JsonServiceId.class).value();
							if(index == -1)
								index = idParameterIndex;
							
							if(ids != null && ids.length > index && ids[index] != null)
								params[i] =  Converter.parse(parameterType, ids[index]);
							idParameterIndex++;
						}
					}
				}
				jsonResponse = (String)methodService.invoke(null, params);
				
			}
		}
		
		return jsonResponse;
	}
	
	
	
	/* (non-Javadoc)
	 * @see org.ajdeveloppement.webserver.services.RequestProcessor#init()
	 */
	@Override
	public void init(HttpServer server) {
		//"org.ajdeveloppement.concours.webapi.controllers"
		discoverJsonServices(ReferencesController.class);
		
		discoverJsonServices(ContactsController.class);
		discoverJsonServices(EntitiesController.class);
		discoverJsonServices(ProfileController.class);
		discoverJsonServices(RulesController.class);
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.webserver.services.RequestProcessor#canServe(org.ajdeveloppement.webserver.HttpSession)
	 */
	@Override
	public boolean canServe(HttpSession session) {
		if(rgxEntryPoint.matcher(session.getRequestUri()).matches())
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
		Matcher m = rgxEntryPoint.matcher(uri);
		if(m.matches()) {
			Map<String,String> urlParameters = session.getUrlParameters();
			
			KeyIdPair keyIdPair = KeyIdPair.getKeyIdPair(m);
			
			String key = null;
			String[] ids = null;
			if(keyIdPair != null) {
				key = keyIdPair.getFullKey();
				ids = new String[] { keyIdPair.getId() };
			}
			
			if((key == null || key.isEmpty()) && urlParameters.containsKey("key"))
				key = urlParameters.get("key");
			
			if(key != null) {
				try {
					HttpContext context = new HttpContext(session);
					String jsonResponse = invokeJsonService(context, key, ids);
					if(jsonResponse != null) {
						HttpResponse response = ResponseFormatter.getGzipedResponseForOutputTemplate(session, jsonResponse, context.getMimeType());
						response.setReturnCode(context.getReturnCode());
						return response;
					}
				} catch (IOException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
					e.printStackTrace();
					
					return new HttpResponse(HttpReturnCode.ServerError.InternalServerError, "text/plain; charset=utf-8", ExceptionUtils.toString(e)); //$NON-NLS-1$ //$NON-NLS-2$
				}
			}
		}
		
		return new HttpResponse(HttpReturnCode.ClientError.NotFound, "text/plain; charset=utf-8", "Unknown request"); //$NON-NLS-1$ //$NON-NLS-2$
	}
	
	private static class KeyIdPair {
		private String key;
		private String id;
		
		private KeyIdPair nextPair;
		/**
		 * @param key
		 * @param id
		 */
		public KeyIdPair(String key, String id) {
			this.key = key;
			this.id = id;
		}

		/**
		 * @return id
		 */
		public String getId() {
			return id;
		}

		/**
		 * @param nextPair nextPair à définir
		 */
		public void setNextPair(KeyIdPair nextPair) {
			this.nextPair = nextPair;
		}
		
		@SuppressWarnings("nls")
		public String getFullKey() {
			String key = this.key;
			if(nextPair != null) {
				key += "/" + nextPair.getFullKey();
			}
			
			return key;
		}
		
		@SuppressWarnings("nls")
		public static KeyIdPair getKeyIdPair(Matcher matcher) {
			KeyIdPair keyIdPair = null;
			if(matcher.matches()) {
				String key = matcher.group("key");
				String id = matcher.group("id");
				String params = matcher.group("params");
				KeyIdPair nextPair = null;
				if(params != null && !params.isEmpty()) {
					Matcher subRoute = rgxSubEntryPoint.matcher(params);
					nextPair = getKeyIdPair(subRoute);
				}
				
				keyIdPair = new KeyIdPair(key, id);
				keyIdPair.setNextPair(nextPair);
			}
			
			return keyIdPair;
		}
	}
}
