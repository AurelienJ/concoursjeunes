/*
 * Créé le 2 nov. 2012 à 15:30:59 pour ArcCompetition
 *
 * Copyright 2002-2012 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.data;

import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.ObjectPersistence;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.SessionHelper;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperFactory;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="DEPARTAGE")
@SqlPrimaryKey(fields="ID_DEPARTAGE")
public class Tie implements ObjectPersistence,Cloneable {
	
	private static StoreHelper<Tie> helper = SqlStoreHelperFactory.getStoreHelper(Tie.class);

	@XmlAttribute(name="id")
	@XmlID
	private String xmlId = null;
	
	@XmlTransient
	@SqlField(name="ID_DEPARTAGE")
	private UUID idDepartage;
	
	@XmlTransient
	@SqlForeignKey(mappedTo="ID_REGLEMENT")
	private Rule reglement;
	
	@XmlAttribute(name="field")
	@SqlField(name="FIELDNAME")
	private String fieldName;
	
	@XmlAttribute(name="ordre")
	@SqlField(name="NUMORDRE")
	private int numOrdre = 0;
	
	/**
	 * 
	 */
	public Tie() {
		
	}
	
	/**
	 * @return idDepartage
	 */
	public UUID getIdDepartage() {
		return idDepartage;
	}

	/**
	 * @param idDepartage idDepartage à définir
	 */
	public void setIdDepartage(UUID idDepartage) {
		this.idDepartage = idDepartage;
	}

	/**
	 * @return reglement
	 */
	public Rule getReglement() {
		return reglement;
	}

	/**
	 * @param reglement reglement à définir
	 */
	public void setReglement(Rule reglement) {
		this.reglement = reglement;
	}

	/**
	 * @return fieldName
	 */
	public String getFieldName() {
		return fieldName;
	}

	/**
	 * @param fieldName fieldName à définir
	 */
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	/**
	 * @return numOrdre
	 */
	public int getNumOrdre() {
		return numOrdre;
	}

	/**
	 * @param numOrdre numOrdre à définir
	 */
	public void setNumOrdre(int numOrdre) {
		this.numOrdre = numOrdre;
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#delete()
	 */
	@Override
	public void delete() throws ObjectPersistenceException {
		SessionHelper.startDeleteSession(this);
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#delete(org.ajdeveloppement.commons.persistence.Session)
	 */
	@Override
	public void delete(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			helper.delete(this);
			
			Session.addProcessedObject(session, this);
		}
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save()
	 */
	@Override
	public void save() throws ObjectPersistenceException {
		SessionHelper.startSaveSession(this);
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(org.ajdeveloppement.commons.persistence.Session)
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			if(idDepartage == null)
				idDepartage = UUID.randomUUID();
			
			reglement.save(session);
			
			helper.save(this);
			
			Session.addProcessedObject(session, this);
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((fieldName == null) ? 0 : fieldName.hashCode());
		result = prime * result
				+ ((reglement == null) ? 0 : reglement.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Tie))
			return false;
		Tie other = (Tie) obj;
		if (fieldName == null) {
			if (other.fieldName != null)
				return false;
		} else if (!fieldName.equals(other.fieldName))
			return false;
		if (reglement == null) {
			if (other.reglement != null)
				return false;
		} else if (!reglement.equals(other.reglement))
			return false;
		return true;
	}
	
	/**
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		if(idDepartage == null)
			idDepartage = UUID.randomUUID();
		xmlId = idDepartage.toString();
	}
	
	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		idDepartage = UUID.fromString(xmlId);
		
		xmlId = null;
		
		if(parent instanceof Rule)
			setReglement((Rule)parent);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#clone()
	 */
	@Override
	protected Object clone() throws CloneNotSupportedException {
		Tie clone = (Tie)super.clone();
		clone.idDepartage = null;
		return clone;
	}
}
