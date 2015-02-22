/*
 * Créé le 4 août 2014 à 13:42:52 pour ArcCompetition
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
import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.ajdeveloppement.commons.ExceptionUtils;
import org.ajdeveloppement.commons.net.json.JsonParser;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.ManagerProfile;
import org.ajdeveloppement.concours.data.Profile;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.data.T_ManagerProfile;
import org.ajdeveloppement.concours.data.T_Profile;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpSession;
import org.ajdeveloppement.webserver.services.js.Sessions;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class ProfileModel {
	
	@SuppressWarnings("nls")
	@JsonService(key="profiles")
	public static String getProfiles(HttpSession session) {
		Sessions clientSession = new Sessions(session);
		UserSessionData userSessionData = clientSession.getSessionData();
		Map<String, String> urlParameters = session.getUrlParameters();
		
		if(session.getRequestMethod() == HttpMethod.GET) { //Lecture
			JsonParser parser = new JsonParser();
			parser.setPrettyPrinting(true);
			
			QResults<Profile, Void> profiles = T_Profile.all();
			if(userSessionData != null) {
				UUID idUtilisateur = userSessionData.getSessionUser().getIdContact();
				if(idUtilisateur != null) {
					profiles = profiles.innerJoin(ManagerProfile.class, T_Profile.ID_PROFILE.equalTo(T_ManagerProfile.ID_PROFILE))
						.where(T_ManagerProfile.ID_CONTACT.equalTo(idUtilisateur));
				}
			}
			
			if(!urlParameters.containsKey("id")) {
				return parser.parseValue(List.class, profiles.asList());
			}
			
			String idProfileStr = urlParameters.get("id");
			UUID idProfile = null;
			try {
				idProfile = UUID.fromString(idProfileStr);
			} catch(IllegalArgumentException e) {
			}
			
			return parser.parseValue(profiles.where(T_Profile.ID_PROFILE.equalTo(idProfile)).first());
		} else if(session.getRequestMethod() == HttpMethod.PUT) { //MAJ
			String jsonProfile;
			try {
				jsonProfile = session.readContentAsString(Charset.forName("UTF-8"));
				
				ObjectMapper jsonMapper = new ObjectMapper();
				Profile profile = jsonMapper.readValue(jsonProfile, Profile.class);
				
				//Pour plus de securité on ne save pas direct on affecte les propiétés voulu.
				Profile dbProfile = T_Profile.getInstanceWithPrimaryKey(profile.getId());
				dbProfile.setIdEntite(profile.getIdEntite());
				dbProfile.save();
				
				return jsonProfile;
			} catch (IOException | ObjectPersistenceException e) {
				e.printStackTrace();
				return "{\"success\":false, \"error\": \"" + ExceptionUtils.toString(e).replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r") + "\"}";
			}
			
			
		}
		
		return null;
	}
	
	@SuppressWarnings("nls")
	@JsonService(key="createProfile")
	public static String createProfile(HttpSession session) {
		Map<String, String> urlParameters = session.getUrlParameters();
		
		Sessions clientSession = new Sessions(session);
		UserSessionData userSessionData = clientSession.getSessionData();
		
		String error = "";
		
		if(userSessionData != null && userSessionData.getSessionUser() != null 
				&& urlParameters.containsKey("idEntite")) {
			
			UUID idEntite = null;
			try {
				idEntite = UUID.fromString(urlParameters.get("idEntite"));
			} catch(IllegalArgumentException e) {
				error = "Invalid idEntite UUID";
			}
			
			if(idEntite != null) {
				Entite entite = QResults.from(Entite.class).where(T_Entite.ID_ENTITE.equalTo(idEntite)).first();
				if(entite != null) {
					try {
						Profile profile = new Profile();
						profile.setIntitule(entite.getNom());
						profile.setEntite(entite);
						profile.addManager(userSessionData.getSessionUser());
					
						profile.save();
						
						return "{\"success\":true,\"entity\": " + profile.toJSON() + "}";
					} catch (ObjectPersistenceException e) {
						e.printStackTrace();
						error = ExceptionUtils.toString(e);
					}
				} else {
					error = "Invalid idEntite UUID";
				}
			}
		}
		
		return "{\"success\":false,\"error\":\"" + error.replace("\"", "\\\"") + "\"}";
	}
	
	@SuppressWarnings("nls")
	@JsonService(key="addEntityToProfile")
	public static String addEntite(HttpSession session) {
		String error = "";
		Map<String, String> urlParameters = session.getUrlParameters();
		
		UUID idProfile = null;
		try {
			idProfile = UUID.fromString(urlParameters.get("idprofile"));
		} catch(IllegalArgumentException e) {
			error = "Invalid idProfile UUID";
		}
		
		UUID idEntite = null;
		try {
			idEntite = UUID.fromString(urlParameters.get("identite"));
		} catch(IllegalArgumentException e) {
			error = "Invalid idEntite UUID";
		}
		
		if(idProfile != null && idEntite != null) {
			Profile profile = QResults.from(Profile.class).where(T_Profile.ID_PROFILE.equalTo(idProfile)).first();
			if(profile != null) {
				Entite entite = QResults.from(Entite.class).where(T_Entite.ID_ENTITE.equalTo(idEntite)).first();
				if(entite != null) {
					profile.setEntite(entite);
					try {
						profile.save();
						
						return "{\"success\":true}";
						
					} catch (ObjectPersistenceException e) {
						error = ExceptionUtils.toString(e);
					}
				}
			}
		}
		
		return "{\"success\":false,\"error\":\"" + error.replace("\"", "\\\"") + "\"}";
	}
}
