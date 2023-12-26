/*
 * Créé le 26 déc. 2023 à 20:41:50 pour concoursjeunes / ArcCompétition
 *
 * Copyright 2002-2023 - Aurélien JEOFFRAY
 *
 * http://www.concoursjeunes.org
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
package org.ajdeveloppement.concours.plugins.githubupdate;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpClient.Redirect;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.swing.JFrame;

import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.concours.ui.ConcoursJeunesFrame;
import org.concoursjeunes.AppInfos;
import org.concoursjeunes.Profile;
import org.concoursjeunes.plugins.Plugin;
import org.concoursjeunes.plugins.PluginEntry;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@Plugin(type = Plugin.Type.UI_STARTUP)
public class GithubUpdateStartup {
	private ConcoursJeunesFrame concoursJeunesFrame;
	
	private final AjResourcesReader pluginRessources = new AjResourcesReader("properties.GithubUpdatePlugin"); //$NON-NLS-1$
	private AjResourcesReader pluginLocalisation = new AjResourcesReader("org.ajdeveloppement.concours.plugins.githubupdate.GithubUpdateStartup_libelle", GithubUpdateStartup.class.getClassLoader()); //$NON-NLS-1$
	
	public GithubUpdateStartup(JFrame appFrame, Profile profile) {
		concoursJeunesFrame = (ConcoursJeunesFrame)appFrame;
	}
	
	@PluginEntry
	public void checkUpdate() {
		var httpClient = HttpClient.newBuilder()
				.followRedirects(Redirect.NORMAL)
				.build();
		
		try {
			var request = HttpRequest.newBuilder()
					.uri(new URI(pluginRessources.getResourceString("github.release.latest.uri")))
					.GET()
					.build();
			
			httpClient.sendAsync(request, BodyHandlers.ofInputStream())
				.thenApply(HttpResponse::body)
				.thenAccept(response -> {
					JsonReader jsReader = Json.createReader(response);
					JsonObject jsObject = jsReader.readObject();
					var releaseUrl = jsObject.getString("html_url");
					var name = jsObject.getString("name");
					
					Version currentVersion = new Version(AppInfos.VERSION);
					Version releaseVersion = new Version(name.replaceAll("[^0-9\\.]", ""));
					
					if(releaseVersion.compareTo(currentVersion) > 0) {
						concoursJeunesFrame.setExtendedActionsContent(pluginLocalisation.getResourceString("update.notification", releaseUrl, name));
						
						concoursJeunesFrame.displayHome();
					}
						
				});
		} catch (URISyntaxException e) {
			// TODO Bloc catch auto-généré
			e.printStackTrace();
		}
		
		
	}
	
	public class Version implements Comparable<Version> {

	    private String version;

	    public final String get() {
	        return this.version;
	    }

	    public Version(String version) {
	        if(version == null)
	            throw new IllegalArgumentException("Version can not be null");
	        if(!version.matches("[0-9]+(\\.[0-9]+)*"))
	            throw new IllegalArgumentException("Invalid version format");
	        this.version = version;
	    }

	    @Override public int compareTo(Version that) {
	        if(that == null)
	            return 1;
	        String[] thisParts = this.get().split("\\.");
	        String[] thatParts = that.get().split("\\.");
	        int length = Math.max(thisParts.length, thatParts.length);
	        for(int i = 0; i < length; i++) {
	            int thisPart = i < thisParts.length ?
	                Integer.parseInt(thisParts[i]) : 0;
	            int thatPart = i < thatParts.length ?
	                Integer.parseInt(thatParts[i]) : 0;
	            if(thisPart < thatPart)
	                return -1;
	            if(thisPart > thatPart)
	                return 1;
	        }
	        return 0;
	    }

	    @Override public boolean equals(Object that) {
	        if(this == that)
	            return true;
	        if(that == null)
	            return false;
	        if(this.getClass() != that.getClass())
	            return false;
	        return this.compareTo((Version) that) == 0;
	    }

	}
}
