/*
 * Créé le 3 sept. 2017 à 21:50:13 pour ArcCompetition
 *
 * Copyright 2002-2017 - Aurélien JEOFFRAY
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

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.ajdeveloppement.commons.Converters;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.T_Contact;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class AccountService {
	private MessageDigest digest;
	
	public AccountService() throws NoSuchAlgorithmException {
		digest = MessageDigest.getInstance("SHA-256"); //$NON-NLS-1$
	}
	
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

	public static boolean validateMail(String emailStr) {
	        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX .matcher(emailStr);
	        return matcher.find();
	}
	
	/**
	 * Return the password hash of contact for given password
	 * 
	 * @param contact
	 * @param password
	 * @return
	 */
	public String getPasswordHash(Contact contact, String password) {
		if(password == null || password.trim().isEmpty())
			return null;
		
		String id = contact.getIdContact().toString();
		
		String passwordHash = Converters.byteArrayToHexString(
				digest.digest((id + password).getBytes(StandardCharsets.UTF_8)));
		
		return passwordHash;
	}
	
	public Contact getContactWithLogin(String login) {
		return T_Contact.all().where(T_Contact.IDENTIFIANT.equalTo(login)).first();
	}
	
	public Contact getContactWithAuthToken(UUID authToken) {
		return T_Contact.all().where(T_Contact.AUTH_TOKEN.equalTo(authToken)).first();
	}
	
	/**
	 * Verify if user password is valid
	 * 
	 * @param contact the user's contact object
	 * @param password the user password
	 * @return return true if it's the good password
	 */
	public boolean verifyContactPassword(Contact contact, String password) {
		return contact.getPasswordHash().equals(getPasswordHash(contact, password));
	}
	
	public Contact saveAccount(Contact contact) throws ObjectPersistenceException {
		if(!contact.getLogin().isEmpty()
				&& !contact.getName().isEmpty()
				&& !contact.getFirstName().isEmpty()
				&& !contact.getPasswordHash().isEmpty()
				&& validateMail(contact.getLogin())) {
		
			contact.save();
			
			return contact;
		}
		
		return null;
	}
}
