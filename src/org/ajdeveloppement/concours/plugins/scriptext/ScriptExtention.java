/*
 * Créé le 20 févr. 2010 à 20:11:07 pour ConcoursJeunes
 *
 * Copyright 2002-2010 - Aurélien JEOFFRAY
 *
 * http://www.concoursjeunes.org
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
package org.ajdeveloppement.concours.plugins.scriptext;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;
import java.net.MalformedURLException;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.concoursjeunes.plugins.Plugin;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@XmlRootElement(name="scriptext")
@XmlAccessorType(XmlAccessType.FIELD)
public class ScriptExtention {
	private Plugin.Type type;
	private String scriptName;
	private String scriptVersion;
	private String scriptFile = "script.js"; //$NON-NLS-1$
	private String mainFunction;
	private boolean asynchrone = false;

	@XmlTransient
	private String mainPath = ""; //$NON-NLS-1$
	@XmlTransient
	private ScriptExtInterface invocableEngine;
	
	public ScriptExtention() {
		
	}

	/**
	 * Indique le type d'extention. Correspond au moment ou le
	 * script est exécuté.
	 * 
	 * @return le type d'extention
	 */
	public Plugin.Type getType() {
		return type;
	}

	public void setType(Plugin.Type type) {
		this.type = type;
	}

	public String getScriptName() {
		return scriptName;
	}

	public void setScriptName(String scriptName) {
		this.scriptName = scriptName;
	}
	
	public String getScriptId() {
		return new File(getMainPath()).getName();
	}

	public String getScriptVersion() {
		return scriptVersion;
	}

	public void setScriptVersion(String scriptVersion) {
		this.scriptVersion = scriptVersion;
	}

	public String getScriptFile() {
		return scriptFile;
	}

	public void setScriptFile(String scriptFile) {
		this.scriptFile = scriptFile;
	}

	public String getMainFunction() {
		return mainFunction;
	}

	public void setMainFunction(String mainFunction) {
		this.mainFunction = mainFunction;
	}

	/**
	 * <p>Pour les extentions de Type STARTUP, indique
	 * si elle doivent se lancer de manière synchrone ou asynchrone.</p>
	 * <p>En mode synchrone, le script est exécuté dans le même Thread que l'application
	 * et bloque la suite du processus de lancement tant qu'il n'est pas terminé.
	 * En asynchrone, lance le script et poursuit en parallèle la phase
	 * d'initialisation du programme</p>
	 * 
	 * @return <code>true</code> si l'on souhaite passer en asynchrone.
	 */
	public boolean isAsynchrone() {
		return asynchrone;
	}

	public void setAsynchrone(boolean asynchrone) {
		this.asynchrone = asynchrone;
	}

	public String getMainPath() {
		return mainPath;
	}

	public void setMainPath(String mainPath) {
		this.mainPath = mainPath;
	}
	
	private transient Writer outputWriter;
	public void setWriter(Writer outputWriter) {
		this.outputWriter = outputWriter;
	}

	/**
	 * Compile le script de l'extention.
	 * 
	 * @throws MalformedURLException
	 * @throws IOException
	 * @throws ScriptException
	 */
	public void compileScript() throws MalformedURLException, IOException, ScriptException {
		ScriptEngineManager se = new ScriptEngineManager();
		ScriptEngine scriptEngine = se.getEngineByName("JavaScript"); //$NON-NLS-1$
		if(outputWriter != null)
			scriptEngine.getContext().setWriter(outputWriter);
		if(scriptEngine != null) {
			Reader reader = new BufferedReader(new InputStreamReader(
                    new FileInputStream(new File(mainPath, scriptFile)), "UTF-8")); //$NON-NLS-1$
			scriptEngine.put(ScriptEngine.FILENAME, scriptFile);
			scriptEngine.eval(reader);
			reader.close();
			
			invocableEngine = ((Invocable)scriptEngine).getInterface(ScriptExtInterface.class);
			if(invocableEngine == null) {
				scriptEngine.eval("function start(parentframe, profile) { this.load(parentframe, profile); }; function stop() { unload(); }"); //$NON-NLS-1$
				invocableEngine = ((Invocable)scriptEngine).getInterface(ScriptExtInterface.class);
			}
			//invocableEngine = (Invocable)scriptEngine;
		}
	}
	
	/**
	 * Retourne l'instance du script compilé ou null si le scrip n'est pas encore compilé
	 * 
	 * @return l'instance du script compilé ou null si le scrip n'est pas encore compilé
	 */
	public ScriptExtInterface getScriptInterface() {
		return invocableEngine;
	}
	
//	/**
//	 * Execute le script à la condition qu'il ai été préalablement
//	 * compilé avec {@link #compileScript()}.
//	 * 
//	 * @param parentframe
//	 * @param profile
//	 * @throws ScriptException
//	 * @throws NoSuchMethodException
//	 */
//	public void runScript(Object... args) throws ScriptException, NoSuchMethodException {
//		if(invocableEngine != null && mainFunction != null)
//			invocableEngine.invokeFunction(mainFunction, args);
//	}
}
