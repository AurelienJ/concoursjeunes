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

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.LazyPersistentCollection;
import org.ajdeveloppement.commons.persistence.sql.QField;
import org.ajdeveloppement.commons.persistence.sql.QFilter;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.CategoryContact;
import org.ajdeveloppement.concours.data.CategoryContact.IdDefaultCategory;
import org.ajdeveloppement.concours.data.Civility;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Coordinate;
import org.ajdeveloppement.concours.data.Criterion;
import org.ajdeveloppement.concours.data.DiscriminantCriterionSet;
import org.ajdeveloppement.concours.data.DiscriminantCriterionSetElement;
import org.ajdeveloppement.concours.data.T_Archer;
import org.ajdeveloppement.concours.data.T_CategoryContact;
import org.ajdeveloppement.concours.data.T_Civility;
import org.ajdeveloppement.concours.data.T_Contact;
import org.ajdeveloppement.concours.data.T_Coordinate;

/**
 * Manipulation of Contacts Service
 * 
 * @author Aurélien JEOFFRAY
 *
 */
public class PersonsService {
	
	private CategoryContact archerCategoryContact = null;
	
	public PersonsService() {
		archerCategoryContact = QResults.from(CategoryContact.class)
				.where(T_CategoryContact.ID_CATEGORIE_CONTACT.equalTo(IdDefaultCategory.BOWMAN.value()))
				.first();
	}
	
	private QResults<Contact, Void> getContacts() {
		return QResults.from(Contact.class)
				/*.useBuilder(contactBuilder)
				.leftJoin(Archer.class, T_Contact.ID_CONTACT.equalTo(T_Archer.ID_CONTACT))*/;
	}
	
	public QFilter getFilter(String search) {
		QFilter filter = null;
		
		if(search != null && !search.isEmpty()) {
			QField<String> fullName = QField.custom("CONCAT(" + T_Contact.NAME.toString() + ", ' ', " + T_Contact.FIRSTNAME.toString() + ")");
			
			String searchPattern = String.format("%%%s%%", search.toUpperCase());
			filter = fullName.upper().like(searchPattern).or(T_Contact.CITY.upper().like(searchPattern));
		}
		return filter;
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
	
	public QResults<Contact, Void> getContactWithFilter(QFilter filter) {
		return getContactWithFilter(filter, 0, -1);
	}
	
	public QResults<Contact, Void> getContactWithFilter(QFilter filter, int limit, int offset) {
		QResults<Contact, Void> contactsQuery = getContacts()
				.where(filter).orderBy(T_Contact.NAME, T_Contact.FIRSTNAME);
		if(limit > 0)
			contactsQuery = contactsQuery.limit(limit, offset);
		
		return contactsQuery;
		
//		if(contacts != null)
//			return ModelViewAdapterHelper.asModelViewList(ContactModelView.class, contacts);
//		
//		return null;
	}
	
	/**
	 * 
	 * @param idEntite
	 * @return
	 */
	public List<Contact> getContactsForEntite(UUID idEntite) {
		return getContacts().where(T_Contact.ID_ENTITE.equalTo(idEntite)).orderBy(T_Contact.NAME).asList();
		
//		if(contacts != null) {
//			return ModelViewAdapterHelper.asModelViewList(ContactModelView.class, contacts);
//		}
//		
//		return null;
	}
	
	
	
	public Contact getContactById(UUID idContact) {
		return getContacts().where(T_Contact.ID_CONTACT.equalTo(idContact)).first();
	}
	
	public void createOrUpdateContact(Contact contact) throws ObjectPersistenceException {
		if(contact instanceof Archer) {
			
			Contact dbContact = QResults.from(Archer.class)
				.where(T_Contact.NAME.equalTo(contact.getName())
						.and(T_Contact.FIRSTNAME.equalTo(contact.getFirstName()))
						.and(T_Archer.NUMLICENCEARCHER.equalTo(((Archer)contact).getNumLicenceArcher())))
				.first();
			
			if(dbContact != null && !dbContact.getIdContact().equals(contact.getIdContact()))
				throw new ObjectPersistenceException("Impossible d'inserer un archer en double");
			
			Archer archer = (Archer)contact;
			
			List<Criterion> criteria = archer.getEntite().getFederation().getCriteria();
			
			Map<Criterion, DiscriminantCriterionSetElement> selectedElements;
			if(archer.getDiscriminantCriterionSet() != null) {
				LazyPersistentCollection<DiscriminantCriterionSetElement, Void> elements
					= (LazyPersistentCollection<DiscriminantCriterionSetElement, Void>)archer.getDiscriminantCriterionSet().getElements();
	
				selectedElements = StreamSupport.stream(elements.getUncommitedItems().spliterator(), false)
						.collect(Collectors.toMap(e -> {
							return e.getCriterionElement().getCriterion();
						}, e -> e));
			} else {
				selectedElements = Collections.emptyMap();
				archer.setDiscriminantCriterionSet(new DiscriminantCriterionSet());
			}
			
			int ordre = archer.getDiscriminantCriterionSet().getElements().size();
			for (Criterion criterion : criteria) {
				if(criterion.getCriterionElements().size() > 0 && !selectedElements.containsKey(criterion)) {
					DiscriminantCriterionSetElement element = new DiscriminantCriterionSetElement();
					element.setCriterionElement(criterion.getCriterionElements().get(0));
					element.setDiscriminantCriterionSet(archer.getDiscriminantCriterionSet());
					element.setOrdre(ordre++);
					archer.getDiscriminantCriterionSet().addElement(element);
				}
			}

			if(archerCategoryContact!= null)
				contact.addCategoryContact(archerCategoryContact);
		}
		
		contact.save();
	}
	
	public boolean deleteContact(UUID idContact) throws ObjectPersistenceException {
		Contact contact = T_Contact.getInstanceWithPrimaryKey(idContact);
		if(contact != null) {
			contact.delete();
			
			return true;
		}
		
		return false;
	}
	
	public List<Coordinate> getCoordinatesForIdContact(UUID idContact) {
		return T_Coordinate.all().where(T_Coordinate.ID_CONTACT.equalTo(idContact)).asList();
	}
	
	public List<Civility> getAllCivilities() {
		return T_Civility.all().asList();
	}
}
