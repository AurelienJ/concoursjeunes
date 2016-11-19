/*
 * Créé le 13 nov. 2016 à 12:13:29 pour ArcCompetition
 *
 * Copyright 2002-2016 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.webapi.adapters;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.CategoryContact;
import org.ajdeveloppement.concours.data.CategoryContact.IdDefaultCategory;
import org.ajdeveloppement.concours.data.CategoryContactContact;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.T_CategoryContact;
import org.ajdeveloppement.concours.data.T_Civility;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.webapi.services.PersonsService;
import org.ajdeveloppement.concours.webapi.views.ContactView;
import org.ajdeveloppement.webserver.services.webapi.helpers.ModelViewMapper;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class PersonViewMapper {
	
	private PersonsService personsService;
	
	public PersonViewMapper(PersonsService personsService) {
		this.personsService = personsService;
	}
	
	/**
	 * Return id of contact's civility if exists
	 * 
	 * @param contact
	 * @return
	 */
	public static UUID getIdCivility(Contact contact) {
		if(contact != null && contact.getCivility() != null)
			return contact.getCivility().getIdCivility();
		
		return null;
	}
	
	/**
	 * Inject the view civility in model
	 * 
	 * @param contactView
	 * @param contact
	 */
	public static void setIdCivility(ContactView contactView, Contact contact) {
		if(contactView != null && contact != null) {
			if(!(contactView.getIdCivility() != null
					&& contact.getCivility() != null
					&& contact.getCivility().getIdCivility().equals(contactView.getIdCivility()))) {
				contact.setCivility(T_Civility.getInstanceWithPrimaryKey(contactView.getIdCivility()));
			}
		}
	}
	
	/**
	 * Return ids of contact's categories if exists
	 * 
	 * @param contact
	 * @return
	 */
	public static List<UUID> getCategories(Contact contact) {
		if(contact != null && contact.getCategories() != null)
			return  contact.getCategories().stream().map(c -> c.getCategoryContact().getId()).collect(Collectors.toList());
		
		return null;
	}
	
	public static void setCategories(ContactView contactView, Contact contact) {
		if(!(contactView.getCategories() != null && contact.getCategories() != null && getCategories(contact).equals(contactView.getCategories()))) {
			if(contactView.getCategories() != null) {
				List<CategoryContact> categories = T_CategoryContact.all().where(T_CategoryContact.ID_CATEGORIE_CONTACT.in(contactView.getCategories())).asList();
				List<CategoryContactContact> categoriesContact = categories.stream().map(cc -> new CategoryContactContact(contact, cc)).collect(Collectors.toList());
				

				contact.setCategories(categoriesContact);
			}
		}
	}
	
	/**
	 * Return id of contact's entity
	 * 
	 * @param contact
	 * @return
	 */
	public static UUID getIdEntity(Contact contact) {
		if(contact != null && contact.getEntite() != null)
			return contact.getEntite().getIdEntite();
		
		return null;
	}
	
	public static void setIdEntity(ContactView contactView, Contact contact) {
		if(contactView != null && contact != null) {
			if(!(contactView.getIdEntity() != null
					&& contact.getEntite() != null
					&& contact.getEntite().getIdEntite().equals(contactView.getIdEntity()))) {
				contact.setEntite(T_Entite.getInstanceWithPrimaryKey(contactView.getIdEntity()));
			}
		}
	}
	
	public Contact getContactFor(ContactView contactView) {
		Contact contact = null;
		
		if(contactView.getId() != null)
			contact = personsService.getContactById(contactView.getId());
		
		if(contact == null) {
			if(contactView.getCategories() != null && contactView.getCategories().contains(IdDefaultCategory.BOWMAN.value())) {
				contact = new Archer();
			} else {
				contact = new Contact();
			}
		}
		
		try {
			ModelViewMapper.mapModelViewToModel(contactView, contact);
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException
				| SecurityException | IntrospectionException e) {
			throw new UncheckedException(e);
		}
		
		return contact;
	}
}
