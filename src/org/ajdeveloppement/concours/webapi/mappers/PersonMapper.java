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
package org.ajdeveloppement.concours.webapi.mappers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.CategoryContact;
import org.ajdeveloppement.concours.data.CategoryContact.IdDefaultCategory;
import org.ajdeveloppement.concours.data.Civility;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Coordinate;
import org.ajdeveloppement.concours.data.T_CategoryContact;
import org.ajdeveloppement.concours.data.T_Civility;
import org.ajdeveloppement.concours.data.T_Contact;
import org.ajdeveloppement.concours.data.T_Coordinate;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.data.mappers.ArcherMapper;
import org.ajdeveloppement.concours.webapi.views.ArcherView;
import org.ajdeveloppement.concours.webapi.views.ContactView;
import org.ajdeveloppement.concours.webapi.views.CoordinateView;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeforeMapping;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@Mapper(uses = { DiscriminantCriterionSetMapper.class, EntiteMapper.class}, componentModel="js330", collectionMappingStrategy=CollectionMappingStrategy.ADDER_PREFERRED)
public abstract class PersonMapper {
	
	@Inject
	ArcherMapper archerMapper;
	
	@SuppressWarnings("nls")
	public static String getType(Contact contact) {
		if(contact instanceof Archer)
			return "archer";
		return "contact";
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
		if(contact != null)
			return contact.getCategoriesContact().stream().map(c -> c.getId()).collect(Collectors.toList());
		
		return null;
	}
	
	public static void setCategories(ContactView contactView, Contact contact) {
		if(!(contactView.getCategories() != null && getCategories(contact).equals(contactView.getCategories()))) {
			if(contactView.getCategories() != null) {
				T_CategoryContact.all().where(T_CategoryContact.ID_CATEGORIE_CONTACT.in(contactView.getCategories()))
					.forEach(cc -> contact.addCategoryContact(cc));
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
	
	private boolean isArcher(ContactView contactView) {
		return contactView.getType().equals("archer") || (contactView.getCategories() != null && contactView.getCategories().contains(IdDefaultCategory.BOWMAN.value())); //$NON-NLS-1$
	}
	
	@BeforeMapping
	public Contact getContact(ContactView contactView, @MappingTarget Class<?> type) {
		Contact contact = null;
		
		if(contactView.getId() != null)
			contact = T_Contact.getInstanceWithPrimaryKey(contactView.getId());
		
		if(contact == null) {
			if(contactView.getCategories() != null && contactView.getCategories().contains(IdDefaultCategory.BOWMAN.value())) {
				contact = new Archer();
			} else {
				contact = new Contact();
			}
		}
		
		return contact;
	}
	
	//public abstract Contact asContact(ContactView contactView);
	
	public Contact asContact(ArcherView contactView) {
		Contact contact = null;
		
		if(contactView.getId() != null)
			contact = T_Contact.getInstanceWithPrimaryKey(contactView.getId());
		
		if(contact != null) {
			if(isArcher(contactView) && !(contact instanceof Archer)) {
				SqlContext.getDefaultContext().getCache().remove(contact);
				contact = archerMapper.upgradeContact(contact);
			} else if((contact instanceof Archer) 
					&& !isArcher(contactView)) {
				Archer archer = (Archer)contact;
				contact = archerMapper.downgradeArcher(archer);
				SqlContext.getDefaultContext().getCache().remove(archer);
			}
		} else if(contact == null) {
			if(isArcher(contactView)) {
				contact = new Archer();
			} else {
				contact = new Contact();
			}
		}
		
		if(contact instanceof Archer)
			updateArcherFromArcherView(contactView, (Archer)contact);
		else
			updateContactFromContactView(contactView, contact);
		
		return contact;
	}
	
	@Mapping(source = "id", target = "idContact")
	@Mapping(source = "idCivility", target = "civility")
	@Mapping(source = "idEntity", target = "entite")
	@Mapping(target = "idpToken", ignore = true)
	@Mapping(target = "passwordHash", ignore = true)
	@Mapping(target = "managedProfiles", ignore = true)
	@Mapping(target = "categoriesContact", source = "categories")
	@Mapping(target = "authToken", ignore = true)
	public abstract void updateContactFromContactView(ContactView view, @MappingTarget Contact contact);
	
	@Mapping(source = "id", target = "idContact")
	@Mapping(source = "idCivility", target = "civility")
	@Mapping(source = "idEntity", target = "entite")
	@Mapping(target = "idpToken", ignore = true)
	@Mapping(target = "passwordHash", ignore = true)
	@Mapping(target = "managedProfiles", ignore = true)
	@Mapping(target = "categoriesContact", source = "categories")
	@Mapping(target = "authToken", ignore = true)
	public abstract void updateArcherFromArcherView(ArcherView view, @MappingTarget Archer contact);
	
	@AfterMapping
	public void afterUpdateContactFromContactView(ContactView view, @MappingTarget Contact contact) {
		contact.getCoordinates().forEach(c -> c.setContact(contact));
	}
	
	public Civility asCivility(UUID id) {
		if(id != null)
			return T_Civility.getInstanceWithPrimaryKey(id);
		return null;
	}
	
	public Coordinate asCoordinate(CoordinateView view) {
		Coordinate coordinate = null;
		
		if(view.getIdCoordinate() != null)
			coordinate = T_Coordinate.getInstanceWithPrimaryKey(view.getIdCoordinate());
		
		if(coordinate == null)
			coordinate = new Coordinate();
		
		updateCoordinateFromCoordinateView(view, coordinate);
		
		return coordinate;
	}
	
	@Mapping(target = "contact", ignore = true)
	public abstract void updateCoordinateFromCoordinateView(CoordinateView view, @MappingTarget Coordinate coordinate);
	
	public CategoryContact asCategoryContact(UUID id) {
		if(id != null) {
			return T_CategoryContact.getInstanceWithPrimaryKey(id);
		}
		
		return null;
	}
}
