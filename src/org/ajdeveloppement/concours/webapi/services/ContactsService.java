/*
 * Créé le 7 avr. 2015 à 16:15:30 pour ArcCompetition
 *
 * Copyright 2002-2015 - Aurélien JEOFFRAY
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

import java.util.List;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.concours.data.Civility;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Coordinate;
import org.ajdeveloppement.concours.data.T_Civility;
import org.ajdeveloppement.concours.data.T_Contact;
import org.ajdeveloppement.concours.data.T_Coordinate;
import org.ajdeveloppement.concours.webapi.adapters.ContactAdapter;
import org.ajdeveloppement.concours.webapi.adapters.ModelViewAdapterHelper;
import org.ajdeveloppement.concours.webapi.models.CivilityModelView;
import org.ajdeveloppement.concours.webapi.models.ContactModelView;
import org.ajdeveloppement.concours.webapi.models.CoordinateModelView;

/**
 * Manipulation of Contacts Service
 * 
 * @author Aurélien JEOFFRAY
 *
 */
public class ContactsService {
	
	/**
	 * return total numbers of contacts in database
	 * 
	 * @return total numbers of contacts in database
	 */
	public int countAllContacts() {
		return T_Contact.all().count();
	}
	
	/**
	 * return numbers of contacts corresponding at filter query
	 * 
	 * @param filter the contact's filter
	 * @return numbers of contacts corresponding at filter query
	 */
	public int countWithFilter(QFilter filter) {
		return T_Contact.all().where(filter).count();
	}

	/**
	 * Return all contacts
	 * 
	 * @return
	 */
	public List<ContactModelView> getAllContacts() {
		List<Contact> contacts = T_Contact.all().orderBy(T_Contact.NAME, T_Contact.FIRSTNAME).asList();
		
		return ModelViewAdapterHelper.asModelViewList(ContactModelView.class, contacts);
	}
	
	/**
	 * 
	 * @param idEntite
	 * @return
	 */
	public List<ContactModelView> getContactsForEntite(UUID idEntite) {
		List<Contact> contacts = T_Contact.all().where(T_Contact.ID_ENTITE.equalTo(idEntite)).asList();
		
		if(contacts != null) {
			return ModelViewAdapterHelper.asModelViewList(ContactModelView.class, contacts);
		}
		
		return null;
	}
	
	public List<ContactModelView> getContactWithFilter(QFilter filter) {
		return getContactWithFilter(filter, 0, -1);
	}
	
	public List<ContactModelView> getContactWithFilter(QFilter filter, int limit, int offset) {
		QResults<Contact, Void> contactsQuery = T_Contact.all().where(filter).orderBy(T_Contact.NAME, T_Contact.FIRSTNAME);
		if(limit > 0)
			contactsQuery = contactsQuery.limit(limit, offset);
		
		List<Contact> contacts = contactsQuery.asList();
		
		if(contacts != null)
			return ModelViewAdapterHelper.asModelViewList(ContactModelView.class, contacts);
		
		return null;
	}
	
	public ContactModelView getContactById(UUID idContact) {
		Contact contact = T_Contact.getInstanceWithPrimaryKey(idContact);
		
		if(contact != null) {
			return ModelViewAdapterHelper.asModelView(ContactModelView.class, contact);
		}
		
		return null;
	}
	
	public void createOrUpdateContact(ContactModelView modelViewContact) throws ObjectPersistenceException {
		Contact contact = null;
		if(modelViewContact.getId() != null)
			contact = T_Contact.getInstanceWithPrimaryKey(modelViewContact.getId());
		
		ContactAdapter contactAdapter = new ContactAdapter(contact);
		contact = contactAdapter.toModel(modelViewContact);
		
		contact.save();
		if(!contact.getIdContact().equals(modelViewContact.getId()))
			modelViewContact.setId(contact.getIdContact());
	}
	
	public boolean deleteContact(UUID idContact) throws ObjectPersistenceException {
		Contact contact = T_Contact.getInstanceWithPrimaryKey(idContact);
		if(contact != null) {
			contact.delete();
			
			return true;
		}
		
		return false;
	}
	
	public List<CoordinateModelView> getCoordinateForIdContact(UUID idContact) {
		List<Coordinate> coordinates = T_Coordinate.all().where(T_Coordinate.ID_CONTACT.equalTo(idContact)).asList();
		
		return ModelViewAdapterHelper.asModelViewList(CoordinateModelView.class, coordinates);
	}
	
	public List<CivilityModelView> getAllCivilities() {
		List<Civility> civilites = T_Civility.all().asList();
		
		return ModelViewAdapterHelper.asModelViewList(CivilityModelView.class, civilites);
	}
}