/*
 * Créé le 13 mars 2010 à 11:08:19 pour ArcCompetition
 *
 * Copyright 2002-2010 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.data;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.sql.Types;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.xml.bind.annotation.XmlIDREF;

import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.LazyPersistentCollection;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlGeneratedIdField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlSubTables;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlUnmappedFields;

/**
 * Represent a contact person. This class can be serialised with JAXB.
 * 
 * @author Aurélien JEOFFRAY
 *
 */
@SqlTable(name="CONTACT")
@SqlSubTables(Archer.class)
@SqlPrimaryKey(fields="ID_CONTACT",generatedidField=@SqlGeneratedIdField(name="ID_CONTACT",type=Types.JAVA_OBJECT))
@SqlUnmappedFields(fields="UPPER_NAME",typeFields=String.class)
public class Contact implements SqlObjectPersistence, Cloneable {
	
	@SqlField(name="ID_CONTACT")
	private UUID idContact = UUID.randomUUID();
	
	@SqlField(name="NAME")
	private String name;
	
	@SqlField(name="FIRSTNAME")
	private String firstName;
	
	@SqlField(name="DATENAISS")
	private Date dateNaissance;
	
	@SqlField(name="SEXE")
	private int sexe;
	
	@SqlForeignKey(mappedTo="ID_CIVILITY")
	private Civility civility;
	
	@SqlField(name="ADDRESS")
	private String address;
	
	@SqlField(name="ZIP_CODE")
	private String zipCode;
	
	@SqlField(name="CITY")
	private String city;
	
	@SqlField(name="COUNTRY")
	private String countryCode = "fr";  //$NON-NLS-1$
	
	@SqlField(name="NOTE")
	private String note;
	
	@XmlIDREF
	@SqlForeignKey(mappedTo="ID_ENTITE")
	private Entite entite;
	
	@SqlField(name="IDENTIFIANT")
	private String login;
	
	@SqlField(name="MOT_DE_PASSE")
	private String passwordHash;
	
	@SqlField(name="AUTH_TOKEN")
	private UUID authToken;
	
	@SqlField(name="TOKEN_IDP_EXTERNE")
	private String idpToken;
	
	@SqlField(name="LANGUAGE")
	private String language;
	
	@SqlField(name="SURBRILLANCE_EXAEQUO")
	private boolean highlightExAequo;
	
	@SqlField(name="SAISI_NON_CUMULE")
	private boolean uncumuledInput;
	
	@SqlField(name="DATEMODIF")
	private Date dateModification;
	
	@SqlChildCollection(foreignFields="ID_CONTACT",type=Coordinate.class)
	private LazyPersistentCollection<Coordinate, Void> coordinates = new LazyPersistentCollection<>(
			() -> T_Coordinate.all().where(T_Coordinate.ID_CONTACT.equalTo(idContact)));
	
	@SqlChildCollection(foreignFields="ID_CONTACT",type=CategoryContactContact.class)
	private LazyPersistentCollection<CategoryContactContact, Void> categories = new LazyPersistentCollection<>(
			() -> T_CategoryContactContact.all().where(T_CategoryContactContact.ID_CONTACT.equalTo(idContact)));
	
	@SqlChildCollection(foreignFields="ID_CONTACT",type=ManagerProfile.class)
	private LazyPersistentCollection<ManagerProfile, Void> managedProfiles = new LazyPersistentCollection<>(
			() -> T_ManagerProfile.all().where(T_ManagerProfile.ID_CONTACT.equalTo(idContact)));

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
		if(idContact == null)
			idContact = UUID.randomUUID();
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
	 * @return dateNaissance
	 */
	public Date getDateNaissance() {
		return dateNaissance;
	}

	/**
	 * @param dateNaissance dateNaissance à définir
	 */
	public void setDateNaissance(Date dateNaissance) {
		Date oldValue = this.dateNaissance;
		
		this.dateNaissance = dateNaissance;
		
		pcs.firePropertyChange("dateNaissance", oldValue, dateNaissance); //$NON-NLS-1$
	}

	/**
	 * @return sexe
	 */
	public int getSexe() {
		return sexe;
	}

	/**
	 * @param sexe sexe à définir
	 */
	public void setSexe(int sexe) {
		int oldValue = this.sexe;
		
		this.sexe = sexe;
		
		pcs.firePropertyChange("sexe", oldValue, sexe); //$NON-NLS-1$
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
	 * 
	 * @param civility the civility of contact
	 */
	public void setCivility(Civility civility) {
		Civility oldValue = this.civility;
		
		this.civility = civility;
		
		pcs.firePropertyChange("civility", oldValue, civility); //$NON-NLS-1$
	}

	/**
	 * Get the post address of contact
	 * 
	 * @return the post address of contact
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * Set the post address of contact
	 * 
	 * @param adress the post address of contact
	 */
	public void setAddress(String adress) {
		Object oldValue = this.address;
		
		this.address = adress;
		
		pcs.firePropertyChange("adress", oldValue, adress); //$NON-NLS-1$
	}

	/**
	 * Get the post zip code of contact
	 * 
	 * @return the post zip code of contact
	 */
	public String getZipCode() {
		return zipCode;
	}

	/**
	 * Set the post zip code of contact
	 * 
	 * @param zipCode the post zip code of contact
	 */
	public void setZipCode(String zipCode) {
		Object oldValue = this.zipCode;
		
		this.zipCode = zipCode;
		
		pcs.firePropertyChange("zipCode", oldValue, zipCode); //$NON-NLS-1$
	}

	/**
	 * Get the residence city of contact
	 * 
	 * @return the residence city of contact
	 */
	public String getCity() {
		return city;
	}

	/**
	 * Set the residence city of contact
	 * 
	 * @param city the city of contact
	 */
	public void setCity(String city) {
		Object oldValue = this.city;
		
		this.city = city;
		
		pcs.firePropertyChange("city", oldValue, city); //$NON-NLS-1$
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
	 * Get free note about contact
	 * 
	 * @return free note about contact
	 */
	public String getNote() {
		return note;
	}

	/**
	 * Set free note about contact
	 * 
	 * @param note free note about contact
	 */
	public void setNote(String note) {
		Object oldValue = this.note;
		
		this.note = note;
		
		pcs.firePropertyChange("note", oldValue, note); //$NON-NLS-1$
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
	 * @return passwordHash
	 */
	public String getPasswordHash() {
		return passwordHash;
	}

	/**
	 * @param passwordHash passwordHash à définir
	 */
	public void setPasswordHash(String passwordHash) {
		this.passwordHash = passwordHash;
	}

	public UUID getAuthToken() {
		return authToken;
	}

	public void setAuthToken(UUID authToken) {
		this.authToken = authToken;
	}

	/**
	 * @return idpToken
	 */
	public String getIdpToken() {
		return idpToken;
	}

	/**
	 * @param idpToken idpToken à définir
	 */
	public void setIdpToken(String idpToken) {
		this.idpToken = idpToken;
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

	/**
	 * Get coordinates of contact (phone, fax, mail)
	 * 
	 * @return coordinates of contact
	 */
	public Collection<Coordinate> getCoordinates() {
		return coordinates;
	}

	/**
	 * add a coordinate of contact (phone, fax, mail)
	 * 
	 * @param coordinates coordinates of contact (phone, fax, mail)
	 */
	public void addCoordinates(Coordinate coordinate) {
		coordinate.setContact(this);
		
		coordinates.add(coordinate);
	}
	
	public void removeCoordinates(Coordinate coordinate) {
		coordinates.remove(coordinate);
	}
	
	public List<CategoryContact> getCategoriesContact(){
		return categories.stream().map(ccc ->ccc.getCategoryContact()).collect(Collectors.toList());
	}
	
	/**
	 * 
	 * @param categoryContact
	 */
	public void addCategoryContact(CategoryContact categoryContact) {
		if(categoryContact != null)
			categories.add(new CategoryContactContact(this, categoryContact));
	}
	
	public void removeCategoryContact(CategoryContact categoryContact) {
		if(categoryContact != null)
			categories.remove(new CategoryContactContact(this, categoryContact));
	}
	
	/**
	 * @return managedProfiles
	 */
	public Collection<ManagerProfile> getManagedProfiles() {
		return managedProfiles;
	}

	/**
	 * @param managedProfiles managedProfiles à définir
	 */
	public void addManagedProfile(ManagerProfile managedProfile) {
		managedProfile.setManager(this);
		managedProfiles.add(managedProfile);
	}
	
	/**
	 * @param managedProfiles managedProfiles à définir
	 */
	public void removeManagedProfile(ManagerProfile managedProfile) {
		managedProfile.setManager(null);
		managedProfiles.add(managedProfile); //add is used to force save() call of managedProfile
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
		return ((civility != null && civility.getAbreviation() != null) ? civility.getAbreviation() + " " : "")  + name + " " + firstName; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
	}
	
	/**
	 * Set entity associate with contact
	 * 
	 * @param entite entity associate with contact
	 */
	public void setEntite(Entite entite) {
		Entite oldValue = this.entite;
		
		this.entite = entite;
		
		pcs.firePropertyChange("entite", oldValue, entite); //$NON-NLS-1$
	}

	/**
	 * Get entity associate with contact
	 * @return entity associate with contact
	 */
	public Entite getEntite() {
		return entite;
	}
	
	/**
	 * @return dateModification
	 */
	public Date getDateModification() {
		return dateModification;
	}

	/**
	 * @param dateModification dateModification à définir
	 */
	public void setDateModification(Date dateModification) {
		this.dateModification = dateModification;
	}
	
	@Override
	public boolean validateBeforeSave() throws ObjectPersistenceException {

		if(this.categories != null) {
			List<CategoryContactContact> originalCategoriesCollection = QResults.from(CategoryContactContact.class)
				.where(T_CategoryContactContact.ID_CONTACT.equalTo(idContact)).asList();
			
			List<UUID> currentCategoriesCollection = this.categories.stream()
					.map(ccc -> ccc.getCategoryContact().getId())
					.collect(Collectors.toList());
			
			originalCategoriesCollection.stream().filter(ccc -> !currentCategoriesCollection.contains(ccc.getCategoryContact().getId()))
				.forEach(ccc -> {
					try {
						ccc.delete();
					} catch (ObjectPersistenceException e) {
						throw new UncheckedException(e);
					}
				});
		}
		
		if(this.coordinates != null) {
			List<Coordinate> originalCoordinatesCollection = QResults.from(Coordinate.class)
				.where(T_Coordinate.ID_CONTACT.equalTo(idContact)).asList();
			
			List<UUID> currentCoordinatesCollection = this.coordinates.stream()
					.map(c -> c.getIdCoordinate())
					.collect(Collectors.toList());
			
			originalCoordinatesCollection.stream().filter(c -> !currentCoordinatesCollection.contains(c.getIdCoordinate()))
				.forEach(ccc -> {
					try {
						ccc.delete();
					} catch (ObjectPersistenceException e) {
						throw new UncheckedException(e);
					}
				});
		}
		
		return true;
	}
	
	@Override
	public String toString() {
		return getFullNameWithCivility();
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