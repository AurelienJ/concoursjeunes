/*
 * Créé le 3 sept. 2017 à 21:21:02 pour ArcCompetition
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
package org.ajdeveloppement.concours.webapi.controllers;

import java.util.Calendar;
import java.util.UUID;

import javax.inject.Inject;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.T_Contact;
import org.ajdeveloppement.concours.webapi.annotations.Authorize;
import org.ajdeveloppement.concours.webapi.mappers.AccountMapper;
import org.ajdeveloppement.concours.webapi.services.AccountService;
import org.ajdeveloppement.concours.webapi.views.AccountView;
import org.ajdeveloppement.webserver.HttpMethod;
import org.ajdeveloppement.webserver.HttpResponse;
import org.ajdeveloppement.webserver.HttpReturnCode;
import org.ajdeveloppement.webserver.HttpReturnCode.Success;
import org.ajdeveloppement.webserver.services.webapi.HttpContext;
import org.ajdeveloppement.webserver.services.webapi.annotations.Body;
import org.ajdeveloppement.webserver.services.webapi.annotations.HttpService;
import org.ajdeveloppement.webserver.services.webapi.annotations.WebApiController;
import org.ajdeveloppement.webserver.services.webapi.helpers.HttpSessionHelper;
import org.ajdeveloppement.webserver.viewbinder.ViewsFactory;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@WebApiController
public class AccountController {
	
	private static final String USER_SESSION_KEY = "User"; //$NON-NLS-1$
	private static final int SESSION_DELAY = 60 * 60 * 24; //24H
	private static final int SESSION_LONG_DELAY = SESSION_DELAY * 182; //6 mois
	
	private HttpContext context;
	
	private AccountService service;
	
	private AccountMapper accountMapper;
	
	@Inject
	public AccountController(HttpContext context, AccountService service, AccountMapper accountMapper) {
		this.context = context;
		this.service = service;
		this.accountMapper = accountMapper;
		
		context.addHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Pragma", "no-cache"); // HTTP 1.0. //$NON-NLS-1$ //$NON-NLS-2$
		context.addHeader("Expires", "0"); // Proxies. //$NON-NLS-1$ //$NON-NLS-2$
	}
	
	/**
	 * @param contact
	 */
	private void putInSessionCache(Contact contact, boolean keepAuth) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.SECOND,  keepAuth ? SESSION_LONG_DELAY : SESSION_DELAY);

		HttpSessionHelper.putUserSessionData(context.getHttpRequest(), contact.getIdContact(), USER_SESSION_KEY, true, calendar.getTime());
		
		HttpSessionHelper.addSessionCookieHeader(context, keepAuth ? SESSION_LONG_DELAY : SESSION_DELAY, true);
	}
	
	@HttpService(key = "authenticate")
	public AccountView authenticate() {
		UUID idContact = HttpSessionHelper.getUserSessionData(context.getHttpRequest(), USER_SESSION_KEY);
		if(idContact != null) {
			Contact contact = T_Contact.getInstanceWithPrimaryKey(idContact);
			if(contact != null) {
				
				return ViewsFactory.getView(AccountView.class,contact);
			}
		}
		
		context.setCustomResponse(new HttpResponse(
				HttpReturnCode.ClientError.Unauthorized, "text/plain", "Bad authentification token")); //$NON-NLS-1$ //$NON-NLS-2$
		
		return null;
	}
	
	@HttpService(key = "register",methods=HttpMethod.POST)
	public AccountView register(@Body AccountView account) throws ObjectPersistenceException {
		if(account.getLogin() == null || account.getLogin().trim().isEmpty()) {
			context.setCustomResponse(new HttpResponse(
					HttpReturnCode.ClientError.Forbidden, "text/plain", "Bad login")); //$NON-NLS-1$ //$NON-NLS-2$
			
			return null;
		}
		
		Contact contact = service.getContactWithLogin(account.getLogin());
		if(contact == null) {
			contact = accountMapper.toContact(account);
			
			putInSessionCache(contact, false);
			
			return ViewsFactory.getView(AccountView.class, service.saveAccount(contact));
		}
		
		context.setCustomResponse(new HttpResponse(
				HttpReturnCode.ClientError.Forbidden, "text/plain", "Login already exists")); //$NON-NLS-1$ //$NON-NLS-2$
		
		return null;
	}
	
	@HttpService(key = "login",methods=HttpMethod.POST)
	public AccountView login(@Body AccountView account) {
		Contact contact = null;
		if(account.getLogin() != null && !account.getLogin().isEmpty())
			contact = service.getContactWithLogin(account.getLogin());
		else if(account.getAuthToken() != null) 
			contact= service.getContactWithAuthToken(account.getAuthToken());
		
		if(contact != null) {
			if(service.verifyContactPassword(contact, account.getPassword())) {
				putInSessionCache(contact, account.isKeepAuth());
				
				return ViewsFactory.getView(AccountView.class, contact);
			}
			
			context.setCustomResponse(new HttpResponse(
					HttpReturnCode.ClientError.Unauthorized, "text/plain", "Bad password")); //$NON-NLS-1$ //$NON-NLS-2$
			
		} else {
			context.setCustomResponse(new HttpResponse(
					HttpReturnCode.ClientError.Unauthorized, "text/plain", "Bad user")); //$NON-NLS-1$ //$NON-NLS-2$
		}

		return null;
	}

	
	@HttpService(key = "logout")
	@Authorize(value={})
	public String logout() {
		HttpSessionHelper.removeUserSessionData(context.getHttpRequest(), USER_SESSION_KEY);
		
		HttpSessionHelper.addSessionCookieHeader(context, -1, true); //delete cookie
		
		return "logout"; //$NON-NLS-1$
	}
	
	@HttpService(key = "account")
	@Authorize(value={})
	public AccountView getAccount() {
		Contact sessionContact = context.getMetadata("User");
		if(sessionContact != null) {
			return ViewsFactory.getView(AccountView.class, sessionContact);
		}
		
		return null;
	}
	
	@HttpService(key = "account",methods=HttpMethod.POST)
	@Authorize(value={})
	public AccountView updateAccount(@Body AccountView accountView) throws ObjectPersistenceException {
		if(accountView != null) {
			Contact sessionContact = context.getMetadata("User"); //$NON-NLS-1$
			if(sessionContact !=null && accountView.getId().equals(sessionContact.getIdContact())) {
			
				Contact contact =  null;
				if(accountView.getPassword() != null && !accountView.getPassword().isEmpty()
						&& accountView.getNewPassword() != null && !accountView.getNewPassword().isEmpty()
						&& !accountView.getPassword().equals(accountView.getNewPassword())) {
					

					if(service.verifyContactPassword(sessionContact, accountView.getPassword())) {
						contact = accountMapper.toContact(accountView);
						
						contact.setPasswordHash(service.getPasswordHash(contact, accountView.getNewPassword()));
					} else {
						context.setCustomResponse(new HttpResponse(
								HttpReturnCode.ClientError.Forbidden, "text/plain", "Invalid password")); //$NON-NLS-1$ //$NON-NLS-2$
					}
				} else {
					//do not change password
					accountView.setPassword("");
					contact = accountMapper.toContact(accountView);
				}
				
				if(contact != null) {
					service.saveAccount(contact);
					
					if(context.getHttpRequest().getRequestMethod() == HttpMethod.POST)
						context.setReturnCode(Success.CREATED);
					
					return ViewsFactory.getView(AccountView.class,contact);
				}				
				
				return null;
			} 
			
			context.setCustomResponse(new HttpResponse(
					HttpReturnCode.ClientError.Forbidden, "text/plain", "Invalid account")); //$NON-NLS-1$ //$NON-NLS-2$
		}
		return null;
	}
}
