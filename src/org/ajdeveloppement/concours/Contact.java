/*
 * Créé le 13 mars 2010 à 11:08:19 pour ConcoursJeunes
 *
 * Copyright 2002-2010 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

import org.ajdeveloppement.commons.persistence.ObjectPersistence;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.SqlField;
import org.ajdeveloppement.commons.persistence.sql.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHandler;
import org.ajdeveloppement.commons.persistence.sql.SqlTable;
import org.concoursjeunes.ApplicationCore;

/**
 * Represent a contact personn
 * 
 * @author Aurélien JEOFFRAY
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="CONTACT")
@SqlPrimaryKey(fields="ID_CONTACT")
public class Contact implements ObjectPersistence, Cloneable {
	
	@SqlField(name="ID_CONTACT")
	@XmlAttribute(name="id",required=true)
	private UUID idContact = UUID.randomUUID();
	
	@SqlField(name="NAME")
	private String name;
	
	@SqlField(name="FIRSTNAME")
	private String firstName;
	
	@SqlForeignKey(mappedTo="ID_CIVILITY")
	private Civility civility = new Civility();
	
	@SqlField(name="ADDRESS")
	private String adress;
	
	@SqlField(name="ZIP_CODE")
	private String zipCode;
	
	@SqlField(name="CITY")
	private String city;
	
	@SqlField(name="NOTE")
	private String note;
	
	private List<Coordinate> coordinates = new ArrayList<Coordinate>();

	private static StoreHelper<Contact> helper = null;
	static {
		try {
			helper = new StoreHelper<Contact>(new SqlStoreHandler<Contact>(
					ApplicationCore.dbConnection, Contact.class));
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	protected transient PropertyChangeSupport pcs = new PropertyChangeSupport(this);
	
	/**
	 * Create a new contact
	 */
	public Contact() { }

	/**
	 * Create a new contact
	 * 
	 * @param name the name of contact
	 * @param firstName the first name of contact
	 * @param civility the civility (Mr, Ms, ...)
	 */
	public Contact(String name, String firstName, Civility civility) {
		this.name = name;
		this.firstName = firstName;
		this.civility = civility;
	}
	
	/**
	 * add a property listener to bean
	 * 
	 * @param l the bean's listener
	 */
	public void addPropertyChangeListener(PropertyChangeListener l) {
		pcs.addPropertyChangeListener(l);
	}
	
	/**
	 * remove a property listener from bean
	 * 
	 * @param l the bean's listener
	 */
	public void removePropertyChangeListener(PropertyChangeListener l) {
		pcs.removePropertyChangeListener(l);
	}


	/**
	 * Get the id of contact
	 * 
	 * @return idContact
	 */
	public UUID getIdContact() {
		return idContact;
	}


	/**
	 * Set the id of contact
	 * 
	 * @param idContact idContact à définir
	 */
	public void setIdContact(UUID idContact) {
		this.idContact = idContact;
	}


	/**
	 * Get the name of contact
	 * 
	 * @return name of contact
	 */
	public String getName() {
		return name;
	}


	/**
	 * Set the name of contact
	 * 
	 * @param name name of contact
	 */
	public void setName(String name) {
		String oldValue = this.name;
		
		this.name = name;
		
		pcs.firePropertyChange("name", oldValue, name); //$NON-NLS-1$
	}


	/**
	 * Get the first Name of contact 
	 * 
	 * @return the first Name of contact
	 */
	public String getFirstName() {
		return firstName;
	}


	/**
	 * Set the fisrt name of contact
	 * 
	 * @param firstName the fisrt name of contact
	 */
	public void setFirstName(String firstName) {
		String oldValue = this.firstName;
		
		this.firstName = firstName;
		
		pcs.firePropertyChange("firstName", oldValue, firstName); //$NON-NLS-1$
	}


	/**
	 * Get the civility of contact
	 * 
	 * @return the civility of contact
	 */
	public Civility getCivility() {
		return civility;
	}


	/**
	 * Set the civility of contact
	 * @param civility the civility of contact
	 */
	public void setCivility(Civility civility) {
		Civility oldValue = this.civility;
		
		this.civility = civility;
		pcs.firePropertyChange("civility", oldValue, civility); //$NON-NLS-1$
	}


	/**
	 * @return adress
	 */
	public String getAdress() {
		return adress;
	}


	/**
	 * @param adress adress à définir
	 */
	public void setAdress(String adress) {
		this.adress = adress;
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
		return city;
	}


	/**
	 * @param city city à définir
	 */
	public void setCity(String city) {
		this.city = city;
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
	 * @return coordinates
	 */
	public List<Coordinate> getCoordinates() {
		return coordinates;
	}


	/**
	 * @param coordinates coordinates à définir
	 */
	public void setCoordinates(List<Coordinate> coordinates) {
		this.coordinates = coordinates;
	}

	/**
	 * Get identity of contact (firstName + name)
	 * @deprecated replaced by {@link #getFullName()}
	 * 
	 * @return the identity of contact
	 */
	@Deprecated
	public String getID() {
		return getFullName(); //$NON-NLS-1$
	}
	
	/**
	 * Get identity of contact (firstName + name)
	 * 
	 * @return the identity of contact
	 */
	public String getFullName() {
		return name + " " + firstName; //$NON-NLS-1$
	}
	
	/**
	 * Get identity of contact with civility(civility + firstName + name)
	 * 
	 * @return the identity of contact
	 */
	public String getFullNameWithCivility() {
		return civility.getAbreviation() + " " + name + " " + firstName; //$NON-NLS-1$
	}
	
	/**
	 * Save contact in database
	 */
	@Override
	public void save() throws ObjectPersistenceException {
		helper.save(this);
	}

	/**
	 * remove the contact database 
	 */
	@Override
	public void delete() throws ObjectPersistenceException {
		if(idContact != null)
			helper.delete(this);
	}
	
	/**
	 * clone the contact and all non-immutable properties
	 */
	@Override
	protected Contact clone() throws CloneNotSupportedException {
		Contact clone = (Contact)super.clone();
		clone.setIdContact(null);
		clone.pcs = new PropertyChangeSupport(clone);
		
		List<Coordinate> clonedCoordinates = new ArrayList<Coordinate>();
		if(coordinates != null) {
			for(Coordinate coordinate : clone.getCoordinates()) {
				Coordinate clonedCoordinate = coordinate.clone();
				clonedCoordinate.setContact(clone);
				clonedCoordinates.add(clonedCoordinate);
			}
			clone.setCoordinates(clonedCoordinates);
		}
		
		return clone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result
				+ ((idContact == null) ? 0 : idContact.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Contact other = (Contact) obj;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (idContact == null) {
			if (other.idContact != null)
				return false;
		} else if (!idContact.equals(other.idContact))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}