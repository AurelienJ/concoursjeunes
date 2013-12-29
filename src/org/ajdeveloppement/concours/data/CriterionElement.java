/*
 * Copyright 2002-2007 - Aurélien JEOFFRAY
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
 * pri connaissance de la licence CeCILL, et que vous en avez accepté les
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
import org.ajdeveloppement.concours.builders.CriterionElementBuilder;

/**
 * Element de critère
 * 
 * @author Aurélien JEOFFRAY
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="ELEMENT_CRITERE_DISCRIMINANT",loadBuilder=CriterionElementBuilder.class)
@SqlPrimaryKey(fields={"ID_ELEMENT_CRITERE_DISCRIMINANT"})
public class CriterionElement implements ObjectPersistence, Cloneable {
	private static StoreHelper<CriterionElement> helper = SqlStoreHelperFactory.getStoreHelper(CriterionElement.class);
	
	//utilisé pour donnée un identifiant unique à la sérialisation de l'objet
	@XmlID
	@XmlAttribute(name="id")
	private String xmlId;
	
	@SqlField(name="ID_ELEMENT_CRITERE_DISCRIMINANT")
	private UUID id;
	
	@SqlField(name="CODE")
    private String code = ""; //$NON-NLS-1$
	@SqlField(name="NOM")
    private String libelle = ""; //$NON-NLS-1$

	@SqlField(name="ORDRE")
    private int numordre = 0;
	
	@XmlTransient
	@SqlForeignKey(mappedTo={"ID_CRITERE_DISCRIMINANT"})
	private Criterion criterion;
	
	@SqlForeignKey(mappedTo={"ID_ELEMENT_CRITERE_DISCRIMINANT_REFERENCE"})
	private CriterionElement elementReference;
	/**
	 * 
	 */
    public CriterionElement() {
        
    }
    
    /**
     * Construit un nouvel élément de critère avec le code fournit en paramètre
     * 
     * @param code le code de l'élément
     */
    public CriterionElement(String code) {
        this.code = code;
    }

    /**
	 * Renvoie le code de l'élément
	 * 
	 * @return le code de l'élément
	 */
    public String getCode() {
        return code;
    }

    /**
	 * Définit le code de l'élément
	 * 
	 * @param code le code de l'élément
	 */
    public void setCode(String code) {
        this.code = code;
    }

	/**
	 * Retourne le critère parent de l'élément
	 * 
	 * @return criterion le critère parent de l'élément
	 */
	public Criterion getCriterion() {
		return criterion;
	}

	/**
	 * Définit le critère parent de l'élément
	 * 
	 * @param criterion le critère parent de l'élément
	 */
	public void setCriterion(Criterion criterion) {
		this.criterion = criterion;
	}

    /**
	 * Renvoi le libellé de l'élément
	 * 
	 * @return le libellé de l'élément
	 */
    public String getLibelle() {
        return libelle;
    }

    /**
	 * Définit le libelle de l'élément
	 * 
	 * @param libelle le libellé de l'élément
	 */
    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    /**
     * Retourne le numéro d'ordre d'affichage de l'élément
     * 
     * @return le numéro d'ordre d'affichage de l'élément
     */
    public int getNumordre() {
    	return numordre;
    }

    /**
     * Définit le numéro d'ordre d'affichage de l'élément
     * 
     * @param numordre le numéro d'ordre d'affichage de l'élément
     */
	public void setNumordre(int numordre) {
    	this.numordre = numordre;
    }
	
	@Override
	public void save() throws ObjectPersistenceException {
		SessionHelper.startSaveSession(this);
	}
	
	@Override
	public void delete() throws ObjectPersistenceException {
		SessionHelper.startDeleteSession(this);
	}
	/**
	 * Sauvegarde l'élement de critère dans la base.  Les arguments sont ignoré
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(Session)
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			if(criterion!=null)
				criterion.save(session);
			
			helper.save(this);
			
			Session.addProcessedObject(session, this);
		}
	}
	
	/**
	 * Supprime de la base le présent élément. Les arguments sont ignoré
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#delete(Session)
	 */
	@Override
	public void delete(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			helper.delete(this);
			
			Session.addProcessedObject(session, this);
		}
	}
	
	/**
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		xmlId = UUID.randomUUID().toString();
	}

	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if(parent instanceof Criterion)
			criterion = (Criterion)parent;
	}

	/**
     * retourne le libelle de l'élément
     */
    @Override
    public String toString() {
        return code;
    }
    
    /**
     * Test si deux éléments de critères sont équivalent
     * 
     * @param criterionElement - l'objet à comparer
     * @return boolean - le résultats de la comparaison de critères
     */
//    public boolean equals(CriterionElement criterionElement) {
//        return code.equals(criterionElement.getCode());
//    }
    
    /**
     * donne le hash de l'objet en se basant sur celui de son code
     */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result
				+ ((criterion == null) ? 0 : criterion.hashCode());
		return result;
	}

	/**
     * Test si deux critères sont équivalent en se basant sur la comparaison d'objet
     * 
     * @param obj - l'objet à comparer
     * @return boolean - le résultats de la comparaison de critères
     */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CriterionElement other = (CriterionElement) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (criterion == null) {
			if (other.criterion != null)
				return false;
		} else if (!criterion.equals(other.criterion))
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#clone()
	 */
	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
}
