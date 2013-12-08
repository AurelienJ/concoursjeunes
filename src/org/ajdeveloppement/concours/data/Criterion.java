/*
 * Copyright 2002-2009 - Aurélien JEOFFRAY
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.ObjectPersistence;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.Cache;
import org.ajdeveloppement.commons.persistence.sql.PersitentCollection;
import org.ajdeveloppement.commons.persistence.sql.SessionHelper;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperFactory;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.concours.builders.CriterionBuilder;

/**
 * Caractéristique d'un critère de distinction
 * 
 * @author Aurélien JEOFFRAY
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="CRITERE",loadBuilder=CriterionBuilder.class)
@SqlPrimaryKey(fields={"CODECRITERE","ID_REGLEMENT"})
public class Criterion implements ObjectPersistence, Cloneable {
	/**
	 * Tri des éléments du critères croissant
	 */
    public static final int SORT_ASC = 1;
    
    /**
     * Tri des éléments du critères décroissant
     */
    public static final int SORT_DESC = -1;
    
    /**
     * Critères générique de la table Archer
     */
    public static final String[] CRITERES_TABLE_ARCHERS = {
    	T_Archer.SEXE.getFieldName(),
    	T_Archer.CATEGORIE.getFieldName(), 
    	T_Archer.NIVEAU.getFieldName(),
    	T_Archer.ARC.getFieldName()
    };
    
    @XmlID
    @XmlAttribute
    @SqlField(name="CODECRITERE")
    private String code = ""; //$NON-NLS-1$
    @SqlField(name="LIBELLECRITERE")
    private String libelle = ""; //$NON-NLS-1$
    @SqlField(name="SORTORDERCRITERE")
    private int sortOrder = SORT_ASC;
    @SqlField(name="CLASSEMENT")
    private boolean classement = false;
    @SqlField(name="CLASSEMENTEQUIPE")
    private boolean classementEquipe = false;
    @SqlField(name="PLACEMENT")
    private boolean placement = false;
    @SqlField(name="CODEFFTA")
    private String champsTableArchers = ""; //$NON-NLS-1$
    @SqlField(name="NUMORDRE")
    private int numordre = 0;
    @XmlElementWrapper(name="criterionelements",required=true)
    @XmlElement(name="element")
    private List<CriterionElement> criterionElements = new ArrayList<CriterionElement>();
    
    @XmlTransient
    @SqlForeignKey(mappedTo="ID_REGLEMENT")
    private Reglement reglement;
    
    private static StoreHelper<Criterion> helper = SqlStoreHelperFactory.getStoreHelper(Criterion.class);
    
    /**
     * 
     */
    public Criterion() {
        
    }
    
    /**
     * Initialise un nouveau critère avec le code "code"
     * 
     * @param code le code du critère
     */
    public Criterion(String code) {
        this.code = code;
    }

    /**
	 * Renvoi le code du critère
	 * @return le code du critère
	 */
    public String getCode() {
        return code;
    }

    /**
	 * Définit le code du critère
	 * 
	 * @param code le code du critère
	 */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * Retourne le règlement associé au critère
     * 
	 * @return le règlement associé au critère
	 */
	public Reglement getReglement() {
		return reglement;
	}

	/**
	 * Associe un règlement au critère
	 * 
	 * @param reglement le règlement associé au critère
	 */
	public void setReglement(Reglement reglement) {
		if(this.reglement != null && !this.reglement.equals(reglement))
			this.reglement.removeCriterion(this);
		
		this.reglement = reglement;
	}
	
	/**
	 * Associe un règlement au critère
	 * 
	 * @deprecated Remplacé par {@link #setReglement(Reglement)}
	 * 
	 * @param reglement le règlement associé au critère
	 */
	@Deprecated
	public void setReglementParent(Reglement reglement) {
		setReglement(reglement);
	}

	/**
	 * Renvoie le libellé du critère
	 * 
	 * @return le libellé du critère
	 */
    public String getLibelle() {
        return libelle;
    }

    /**
	 * Définit le libellé du critère
	 * 
	 * @param libelle le libellé du critère
	 */
    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }
    
    /**
	 * Renvoie l'ordre de tri du critère
	 * 
	 * @return l'ordre de tri du critère
	 */
    public int getSortOrder() {
        return sortOrder;
    }

    /**
	 * Définit l'ordre de tri du critère
	 * 
	 * @param sortOrder  Ordre de tri à appliquer pour le critère.
	 */
    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    /**
     * Retourne le numéro d'ordre d'affichage du critère
     * 
     * @return le numéro d'ordre d'affichage du critère
     */
    public int getNumordre() {
    	return numordre;
    }

    /**
     * Définit le numéro d'ordre d'affichage du critère
     * 
     * @param numordre le numéro d'ordre d'affichage du critère
     */
	public void setNumordre(int numordre) {
    	this.numordre = numordre;
    }

    /**
     * Test si deux critères sont équivalent
     * 
     * @param criterion
     * @return boolean - le résultats de la comparaison de critères
     */
//    public boolean equals(Criterion criterion) {
//        return code.equals(criterion.getCode());
//    }
    
    /**
     * Test si deux critères sont équivalent en se basant sur la comparaison d'objet
     */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Criterion other = (Criterion) obj;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (reglement == null) {
			if (other.reglement != null)
				return false;
		} else if (!reglement.equals(other.reglement))
			return false;
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result
				+ ((reglement == null) ? 0 : reglement.hashCode());
		return result;
	}
    
    /**
     * renvoie le libelle du critère
     */
    @Override
    public String toString() {
        return code;
    }

    /**
	 * Est ce que c'est un critère de classement?
	 * 
	 * @return <code>true</code> si c'est un critère de classement, <code>false</code> sinon
	 */
    public boolean isClassement() {
        return classement;
    }

    /**
	 * Définit si c'est un critère de classement
	 * 
	 * @param classement <code>true</code> si c'est un critère de classement, <code>false</code> sinon
	 */
    public void setClassement(boolean classement) {
        this.classement = classement;
    }

    /**
     * Donne si le critère est utilisé ou non à des fins de classement
     * par équipe
     * 
     * @return <i>true</i> si utilisé pour le classement par équipe, <i>false</i> sinon
     */
    public boolean isClassementEquipe() {
		return classementEquipe;
	}

    /**
     * Définit si le critère est utilisé ou non à des fins de classement
     * 
     * @param classementEquipe <i>true</i> si utilisé pour le classement par équipe, <i>false</i> sinon
     */
	public void setClassementEquipe(boolean classementEquipe) {
		this.classementEquipe = classementEquipe;
	}

	/**
	 * Est ce que c'est un critère de placement?
	 * 
	 * @return <code>true</code> si c'est un critère de placement, <code>false</code> sinon
	 */
    public boolean isPlacement() {
        return placement;
    }

    /**
	 * Définit si c'est un critère de placement
	 * 
	 * @param placement <code>true</code> si c'est un critère de placement, <code>false</code> sinon
	 */
    public void setPlacement(boolean placement) {
        this.placement = placement;
    }

    /**
     * Retourne, si associé, le champ de la table Archers correspondant au critère
     * 
	 * @return  Renvoie le champ de la table Archer du critère.
	 */
    public String getChampsTableArchers() {
        return champsTableArchers;
    }

    /**
     * Définit, si il existe une correspondance, le champ de la table Archer associé
     * 
	 * @param champTableArchers le champ de la table Archer du critère
	 */
    public void setChampsTableArchers(String champTableArchers) {
    	if(champTableArchers.equals("arme")) //$NON-NLS-1$
    		champTableArchers = "ARC"; //$NON-NLS-1$
        this.champsTableArchers = champTableArchers;
    }

	/**
	 * Retourne la liste des éléments lié au critère
	 * 
	 * @return la liste des éléments du critère
	 */
	public List<CriterionElement> getCriterionElements() {
		return criterionElements;
	}

	/**
	 * Définit la liste des éléments lié au critère
	 * 
	 * @param criterionElements la liste des éléments du critère
	 */
	public void setCriterionElements(List<CriterionElement> criterionElements) {
		this.criterionElements = criterionElements;
		
		for(CriterionElement element : criterionElements)
			element.setCriterion(this);
	}
	
	public void addCriterionElement(CriterionElement criterionElement) {
		criterionElements.add(criterionElement);
		
		criterionElement.setCriterion(this);
	}
	
	public void removeCriterionElement(CriterionElement criterionElement) {
		criterionElements.remove(criterionElement);
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
	 * Sauvegarde le critère en base.
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(Session)
	 */
	@SuppressWarnings("nls")
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			reglement.save(session);
			
			helper.save(this); //$NON-NLS-1$
			
			Session.addProcessedObject(session, this);
			
			Cache.put(this);
	
			Map<String, Object> fkMap = new HashMap<String, Object>();
			fkMap.put(T_CriterionElement.CODECRITERE.getFieldName(), code);
			fkMap.put(T_CriterionElement.ID_REGLEMENT.getFieldName(), reglement.getIdReglement());
			
			int numordre = 1;
			for(CriterionElement criterionElement : criterionElements) {
				criterionElement.setNumordre(numordre++);
			}
			
			PersitentCollection.save(criterionElements, session, fkMap);
		}
	}
	
	/** 
	 * Supprime le critère de la base.
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#delete(Session)
	 */
	@Override
	public void delete(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			helper.delete(this);
			
			Cache.remove(this);

			Session.addProcessedObject(session, this);
		}
	}
	
	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if(parent instanceof Reglement)
			reglement = (Reglement)parent;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#clone()
	 */
	@Override
	protected Object clone() throws CloneNotSupportedException {
		Criterion clone = (Criterion)super.clone();
		List<CriterionElement> clonedElements = new ArrayList<CriterionElement>();
		for(CriterionElement element : criterionElements) {
			CriterionElement clonedElement = (CriterionElement)element.clone();
			clonedElements.add(clonedElement);
		}
		clone.setCriterionElements(clonedElements);
		
		return clone;
	}
}
