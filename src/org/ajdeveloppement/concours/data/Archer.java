/*
 * Copyright 2002-2007 - Aurélien JEOFFRAY
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
 *  any later version.
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

import java.sql.SQLException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlSession;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperCache;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlUnmappedFields;
import org.ajdeveloppement.concours.builders.ConcurrentBuilder;
import org.ajdeveloppement.concours.data.CategoryContact.IdDefaultCategory;
import org.ajdeveloppement.concours.managers.ConcurrentManager;

/**
 * Class représentant un archer indépendamment d'un concours
 * 
 * @author Aurélien JEOFFRAY
 * @version 1.0
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="ARCHERS",loadBuilder=ConcurrentBuilder.class)
@SqlPrimaryKey(fields="ID_CONTACT")
@SqlUnmappedFields(fields={"ID_CONTACT","SEXE","CATEGORIE","NIVEAU","ARC","DATENAISS","DATEMODIF"},
	typeFields={UUID.class, Integer.class, Integer.class, Integer.class, Integer.class, Date.class, Date.class})
public class Archer extends Contact {
	private static CategoryContact archerCategoryContact = null;

	@SqlField(name="NUMLICENCEARCHER",sqlType="VARCHAR",size=32)
	private String numLicenceArcher;

	@SqlField(name="CERTIFMEDICAL",sqlType="BOOLEAN")
	private boolean certificat      = false;
	private boolean handicape		= false;

	/**
	 * Constructeur vide nécessaire à l'initialisation correct de l'objet
	 * dans le cas d'une déserialisation XML
	 *
	 */
	public Archer() { }
	
	
	/**
	 * Retourne le numéro de licence de l'archer
	 * 
	 * @return le numéro de licence (pour la ffta, 6 chiffres + 1 lettre)
	 */
	public String getNumLicenceArcher() {
		if(numLicenceArcher == null)
			return ""; //$NON-NLS-1$
		return numLicenceArcher;
	}

	/**
	 * Définit le numéro de licence de l'archer
	 * 
	 * @param numLicenceArcher le numéro de licence de l'archer
	 */
	public void setNumLicenceArcher(String numLicenceArcher) {
		String oldValue = this.numLicenceArcher;
		
		this.numLicenceArcher = numLicenceArcher;
		
		pcs.firePropertyChange("numLicenceArcher", oldValue, numLicenceArcher); //$NON-NLS-1$
	}
	
	/**
	 * Indique si l'archer possède ou non un certificat medical de non contre indiquation
	 * à la pratique du tir à l'arc en competition
	 * 
	 * @return true si l'archer possède un certificat, false sinon
	 */
	public boolean isCertificat() {
		return certificat;
	}

	/**
	 * Définit si l'archer possède (true) ou non (false) un certificat médical
	 * 
	 * @param certificat true si l'archer possède un certificat, false sinon
	 */
	public void setCertificat(boolean certificat) {
		boolean oldValue = this.certificat;
		
		this.certificat = certificat;
		
		pcs.firePropertyChange("certificat", oldValue, certificat); //$NON-NLS-1$
	}

	/**
	 * Est ce que l'archer est handicapé ou non?
	 * 
	 * @return true si l'archer est handicapé, false sinon
	 */
	public boolean isHandicape() {
		return handicape;
	}

	/**
	 * Définit si l'archer est handicapé ou non
	 * 
	 * @param handicape true si l'archer est handicapé, false sinon
	 */
	public void setHandicape(boolean handicape) {
		boolean oldValue = this.handicape;
		
		this.handicape = handicape;
		
		pcs.firePropertyChange("handicape", oldValue, handicape); //$NON-NLS-1$
	}

	/**
	 * Test si l'archer possède dans la base des homonymes (même nom et prenom)
	 * 
	 * @return true su l'archer possède des homonyme, false sinon
	 */
	public boolean haveHomonyme() {
		Archer aComparant = new Archer();
		aComparant.setName(getName());
		aComparant.setFirstName(getFirstName());

		List<Concurrent> homonyme = ConcurrentManager.getArchersInDatabase(aComparant, null, null);

		return (homonyme.size() > 1);
	}

	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			//Avant d'enregistrer, on recherche dans la base si il n'y a pas déjà un enregistrement pour ce contact avec
			//un autre id
			try {
				UUID savedidContact = QResults.from(Archer.class)
					.where(T_Contact.NAME.equalTo(this.getName())
							.and(T_Contact.FIRSTNAME.equalTo(this.getFirstName()))
							.and(T_Archer.NUMLICENCEARCHER.equalTo(this.getNumLicenceArcher())))
					.singleValue(T_Contact.ID_CONTACT);
				
				if(savedidContact != null && !savedidContact.equals(getIdContact()))
					return;
			} catch (SQLException e) {
				throw new ObjectPersistenceException(e);
			}
			
			if(archerCategoryContact == null) {
				archerCategoryContact = QResults.from(CategoryContact.class)
					.where(T_CategoryContact.ID_CATEGORIE_CONTACT.equalTo(IdDefaultCategory.BOWMAN.value()))
					.first();
			}
			if(getCategories().indexOf(archerCategoryContact) == -1)
				addCategoryContact(archerCategoryContact);
			
			super.save(session);
			
			SqlContext context = SqlContext.getDefaultContext();
			if(session instanceof SqlSession)
				context = ((SqlSession)session).getContext();
			
			StoreHelper<Archer> helper = SqlStoreHelperCache.getHelper(Archer.class, context);
			helper.save(this, Collections.<String, Object>singletonMap(T_Archer.ID_CONTACT.getFieldName(), getIdContact()));
		}
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime
				* result
				+ ((numLicenceArcher == null) ? 0 : numLicenceArcher.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Archer other = (Archer) obj;
		if (numLicenceArcher == null) {
			if (other.numLicenceArcher != null)
				return false;
		} else if (!numLicenceArcher.equals(other.numLicenceArcher))
			return false;
		return true;
	}


	@Override
	protected Archer clone() throws CloneNotSupportedException {
		return clone(true);
	}
	
	@Override
	protected Archer clone(boolean conserveId) throws CloneNotSupportedException {
		Archer clone = (Archer)super.clone(conserveId);
		
		return clone;
	}
}