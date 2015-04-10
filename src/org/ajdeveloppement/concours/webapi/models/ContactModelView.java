/*
 * Créé le 7 avr. 2015 à 14:18:08 pour ArcCompetition
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
package org.ajdeveloppement.concours.webapi.models;

import java.util.UUID;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class ContactModelView {
	private UUID idContact;
	
	private String name;
	
	private String firstName;

	private UUID idCivility;
	
	private String address;
	
	private String zipCode;
	
	private String city;
	
	private String countryCode;
	
	private String note;
	
	private UUID idEntite;
	
	private String login;
	
	private String language;
	
	private boolean highlightExAequo;
	
	/**
	 * @return idContact
	 */
	public UUID getIdContact() {
		return idContact;
	}

	/**
	 * @param idContact idContact à définir
	 */
	public void setIdContact(UUID idContact) {
		this.idContact = idContact;
	}

	/**
	 * @return name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name name à définir
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName firstName à définir
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return idCivility
	 */
	public UUID getIdCivility() {
		return idCivility;
	}

	/**
	 * @param idCivility idCivility à définir
	 */
	public void setIdCivility(UUID idCivility) {
		this.idCivility = idCivility;
	}

	/**
	 * @return adress
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param adress adress à définir
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @return zipCode
	 */
	public String getZipCode() {
		return zipCode;
	}

	/**
	 * @param zipCode zipCode à définir
	 */
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	/**
	 * @return city
	 */
	public String getCity() {
		if(city == null)
			return ""; //$NON-NLS-1$
		return city;
	}

	/**
	 * @param city city à définir
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return countryCode
	 */
	public String getCountryCode() {
		return countryCode;
	}

	/**
	 * @param countryCode countryCode à définir
	 */
	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	/**
	 * @return note
	 */
	public String getNote() {
		return note;
	}

	/**
	 * @param note note à définir
	 */
	public void setNote(String note) {
		this.note = note;
	}

	/**
	 * @return idEntite
	 */
	public UUID getIdEntite() {
		return idEntite;
	}

	/**
	 * @param idEntite idEntite à définir
	 */
	public void setIdEntite(UUID idEntite) {
		this.idEntite = idEntite;
	}

	/**
	 * @return login
	 */
	public String getLogin() {
		return login;
	}

	/**
	 * @param login login à définir
	 */
	public void setLogin(String login) {
		this.login = login;
	}

	/**
	 * @return language
	 */
	public String getLanguage() {
		return language;
	}

	/**
	 * @param language language à définir
	 */
	public void setLanguage(String language) {
		this.language = language;
	}

	/**
	 * @return highlightExAequo
	 */
	public boolean isHighlightExAequo() {
		return highlightExAequo;
	}

	/**
	 * @param highlightExAequo highlightExAequo à définir
	 */
	public void setHighlightExAequo(boolean highlightExAequo) {
		this.highlightExAequo = highlightExAequo;
	}

	/**
	 * @return uncumuledInput
	 */
	public boolean isUncumuledInput() {
		return uncumuledInput;
	}

	/**
	 * @param uncumuledInput uncumuledInput à définir
	 */
	public void setUncumuledInput(boolean uncumuledInput) {
		this.uncumuledInput = uncumuledInput;
	}

	private boolean uncumuledInput;

}
