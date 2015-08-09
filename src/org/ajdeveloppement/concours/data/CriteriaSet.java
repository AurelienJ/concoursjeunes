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
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.PersitentCollection;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlContext;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.SqlSession;
import org.ajdeveloppement.commons.persistence.sql.SqlStoreHelperCache;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlGeneratedIdField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlUnmappedFields;
import org.ajdeveloppement.concours.builders.CriteriaSetBuilder;

/**
 * Jeux de critères utilisé pour distinguer un archer a des fins
 * de classements/placements et/ou informations
 * 
 * @author  Aurélien Jeoffray
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="JEUX_CRITERES_DISCRIMINANT",loadBuilder=CriteriaSetBuilder.class)
@SqlPrimaryKey(fields="ID_JEUX_CRITERES_DISCRIMINANT",generatedidField=@SqlGeneratedIdField(name="ID_JEUX_CRITERES_DISCRIMINANT"))
@SqlUnmappedFields(fields={"IDCRITERIASET"})
public class CriteriaSet implements SqlObjectPersistence,Cloneable {
	//private static StoreHelper<CriteriaSet> helper = SqlStoreHelperFactory.getStoreHelper(CriteriaSet.class);

	@XmlAttribute(name="id")
	@XmlID
	private String xmlId = null;
	
	@XmlTransient
	@SqlField(name="ID_JEUX_CRITERES_DISCRIMINANT")
	private UUID id;
	
	@SqlForeignKey(mappedTo="ID_CRITERE_CLASSEMENT")
	private RankingCriterion rankingCriterion;
	
	@SqlChildCollection(foreignFields="ID_JEUX_CRITERES_DISCRIMINANT",type=RateCategory.class)
	@XmlTransient
	private List<RateCategory> tarifsCategorie = null;
	
	@SqlChildCollection(foreignFields="ID_JEUX_CRITERES_DISCRIMINANT",type=CriteriaSetElement.class)
	private List<CriteriaSetElement> elements;
	private transient Map<Criterion, CriterionElement> indexedElement = new HashMap<Criterion, CriterionElement>(5);

	/**
	 * Initialise un nouveau jeux de critères
	 */
	public CriteriaSet() {
	}
	
	/**
	 * Initialise un nouveau jeux de critères pour le réglement fournit en paramètre.
	 * 
	 * @param rankingCriterion le critère de classement associé aux jeux de critère discriminant
	 */
	public CriteriaSet(RankingCriterion rankingCriterion) {
		this(rankingCriterion, null);
	}

	/**
	 * Initialise un nouveau jeux de critères avec les critères fournit en paramètre.
	 * 
	 * @param elements les critères constitutif du jeux de critères
	 */
	public CriteriaSet(List<CriteriaSetElement> elements) {
		this(null, elements);
	}
	
	/**
	 * Initialise un nouveau jeux de critères avec les critères fournit en paramètre et
	 * associé au réglement fournit.
	 * 
	 * @param rankingCriterion le critère de classement associé aux jeux de critère discriminant
	 * @param elements les critères constitutif du jeux de critères
	 */
	public CriteriaSet(RankingCriterion rankingCriterion, List<CriteriaSetElement> elements) {
		this.rankingCriterion = rankingCriterion;
		
		if(elements != null) {
			this.elements = elements;
			reindexElements();
		}
	}
	
	private void reindexElements() {
		indexedElement.clear();
		for(CriteriaSetElement element : elements)
			indexedElement.put(element.getCriterionElement().getCriterion(), element.getCriterionElement());
	}

	/**
	 * @return the id of criteria set
	 */
	public UUID getId() {
		return id;
	}

	/**
	 * @param id numCriteriaSet à définir
	 */
	public void setId(UUID id) {
		this.id = id;
	}

	/**
	 * @return rankingCriterion
	 */
	public RankingCriterion getRankingCriterion() {
		return rankingCriterion;
	}

	/**
	 * @param rankingCriterion rankingCriterion à définir
	 */
	public void setRankingCriterion(RankingCriterion rankingCriterion) {
		this.rankingCriterion = rankingCriterion;
	}

	/**
	 * @return tarifsCategorie
	 */
	public List<RateCategory> getTarifsCategorie() {
		if(tarifsCategorie == null) {
			tarifsCategorie = QResults.from(RateCategory.class)
					.where(T_RateCategory.ID_JEUX_CRITERES_DISCRIMINANT.equalTo(id))
					.asList();
		}
		return tarifsCategorie;
	}

	/**
	 * @param tarifsCategorie tarifsCategorie à définir
	 */
	public void setTarifsCategorie(List<RateCategory> tarifsCategorie) {
		this.tarifsCategorie = tarifsCategorie;
	}

	/**
	 * Retourne l'element de critères correspondant au critères données en parametre
	 * 
	 * @param criterion le critère pour lequel retourné son élément
	 * @return l'element de critère
	 */
	public CriterionElement getCriterionElement(Criterion criterion) {
		if(elements.size() != indexedElement.size())
			reindexElements();
		return indexedElement.get(criterion);
	}

	/**
	 * Définit un element pour un critère donné
	 * 
	 * @param element l'element à définir
	 */
	public void addCriterionElement(CriterionElement element) {
		if(element != null) {
			elements.add(new CriteriaSetElement(this, element));
			indexedElement.put(element.getCriterion(), element);
		}
	}
	
	/**
	 * @return elements
	 */
	public List<CriteriaSetElement> getElements() {
		return Collections.unmodifiableList(elements);
	}

	/**
	 * @param elements elements à définir
	 */
	public void setElements(List<CriteriaSetElement> elements) {
		this.elements = elements;
		for(CriteriaSetElement element : elements)
			element.setCriteriaSet(this);
		reindexElements();
	}

	/**
	 * Retourne le jeux de critère courant, filtré en fonction de la table de filtrage
	 * fournit en paramètre
	 * 
	 * @param criteriaFilter la table de filtrage des critères inclue dans le jeux retourné
	 * @return le jeux de critères filtré.
	 */
	public CriteriaSet getFilteredCriteriaSet(Map<Criterion, Boolean> criteriaFilter) {
		if(criteriaFilter == null)
			return this;
		
		CriteriaSet criteriaSet = new CriteriaSet();
		criteriaSet.setRankingCriterion(rankingCriterion);
		for(CriteriaSetElement csElement : elements) {
			Criterion criterion = csElement.getCriterionElement().getCriterion();
			if(criteriaFilter.containsKey(criterion) && criteriaFilter.get(criterion))
				criteriaSet.addCriterionElement(csElement.getCriterionElement());
		}
		
		/*if(criteriaFilter.equals(reglement.getPlacementFilter())) {
			CriteriaSet reglementCriteriaSet = reglement.getPlacementCriteriaSet(criteriaSet);
			if(reglementCriteriaSet != null)
				criteriaSet = reglementCriteriaSet;
		}*/
		return criteriaSet;
	}
	
	@SuppressWarnings("nls")
	private String getUID() {
		//garantie l'ordre des éléments
		List<String> l = new ArrayList<String>();
		for(CriteriaSetElement csElement : elements) {
			Criterion criterion = csElement.getCriterionElement().getCriterion();
			CriterionElement element = csElement.getCriterionElement();
			String criterionCode = "";
			String elementCode = "";
			if(criterion != null)
				criterionCode = criterion.getCode();
			if(element != null)
				elementCode = element.getCode();
			l.add(criterionCode+"="+elementCode);
		}
		Collections.sort(l);
		String uid = "{";
		for(String e : l) {
			if(uid.length() > 1)
				uid += ",";
			uid += e;
		}
		uid += "}";
		UUID idReglement= null;
		/*if(reglement != null)
			idReglement = reglement.getIdReglement();*/
		return "R=" + (idReglement != null ? idReglement.toString() : "") + ",S=" + uid;
	}
	
	/**
	 * Sauvegarde en base le jeux de critère. Les arguments sont ignoré
	 * 
	 * @see org.ajdeveloppement.commons.persistence.ObjectPersistence#save(Session)
	 * 
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			//vérifie si le jeux n'existe pas déjà
			String uid = getUID();
	
			SqlContext context = SqlContext.getDefaultContext();
			if(session instanceof SqlSession)
				context = ((SqlSession)session).getContext();
			
			StoreHelper<CriteriaSet> helper = SqlStoreHelperCache.getHelper(CriteriaSet.class, context);
			helper.save(this, Collections.<String, Object>singletonMap("IDCRITERIASET", uid)); //$NON-NLS-1$
			
			if(context != null)
				context.getCache().put(this);
			
			Session.addProcessedObject(session, this);
			
			PersitentCollection.save(elements, session, 
					Collections.<String,Object>singletonMap(T_CriteriaSetElement.ID_JEUX_CRITERES_DISCRIMINANT.getFieldName(), id));
		}
	}
	
	/**
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		xmlId = id.toString();
	}
	
	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if(xmlId != null && !xmlId.isEmpty())
			id = UUID.fromString(xmlId);
		
		if(parent instanceof RankingCriterion)
			setRankingCriterion((RankingCriterion)parent);
	}
	
	/**
	 * Tri les critères de distinction selon l'ordre de la table listCriteria
	 * 
	 * @param differentiationCriteriaTable
	 * @param listCriteria
	 */
	public static void sortCriteriaSet(List<CriteriaSet> differentiationCriteriaTable, List<Criterion> listCriteria) {

		//boucle sur a liste des critères disponible dans l'ordre d'affichage
		for(int i = 0; i < listCriteria.size(); i++) {
			Criterion testedCriterion = listCriteria.get(i);
			
			//boucle sur la liste de critère de distinction retourné (comparaison d'élément
			for(int j = 0; j < differentiationCriteriaTable.size() - 1; j++) {
				for(int k = j + 1; k < differentiationCriteriaTable.size(); k++) {
					
					//récupération des valeurs de critère
					CriterionElement result1 = differentiationCriteriaTable.get(j).getCriterionElement(testedCriterion);
					CriterionElement result2 = differentiationCriteriaTable.get(k).getCriterionElement(testedCriterion);

					boolean regle;

					int index1 = testedCriterion.getCriterionElements().indexOf(result1);
					int index2 = testedCriterion.getCriterionElements().indexOf(result2);

					regle = index1 > index2;

					//pour les critères déjà passé en revue, vérifie qu'il y ai égalité
					for(int l = 0; l < i; l++) {
						Criterion otherCriterion = listCriteria.get(l);

						CriterionElement otherresult1 = differentiationCriteriaTable.get(j).getCriterionElement(otherCriterion);
						CriterionElement otherresult2 = differentiationCriteriaTable.get(k).getCriterionElement(otherCriterion);

						int otherindex1 = otherCriterion.getCriterionElements().indexOf(otherresult1);
						int otherindex2 = otherCriterion.getCriterionElements().indexOf(otherresult2);

						regle = regle && otherindex1 == otherindex2;
					}

					if(regle) {
						Collections.swap(differentiationCriteriaTable, j, k);
					}
				}
			}
		}
	}

	/**
	 * Retourne le liste des jeux de critères possible pour un règlement donné en fonction du filtre appliqué
	 * 
	 * @param rankingCriterion le critère de classement associé
	 * @param criteriaFilter - le filtre du jeux
	 * @return la liste des jeux de critères retourné
	 */
	public static CriteriaSet[] listCriteriaSet(RankingCriterion rankingCriterion, Map<Criterion, Boolean> criteriaFilter) {       
		//crée la population complete pour l'ensemble des critères
		//objet de référence
		CriteriaSet[] referents = new CriteriaSet[] { new CriteriaSet(rankingCriterion) };

		//boucle sur les critères du règlement
		/*for(Criterion key : reglement.getListCriteria()) {
			CriteriaSet[][] children = new CriteriaSet[referents.length][];

			if(criteriaFilter.get(key)) {
				for(int i = 0; i < referents.length; i++) {
					List<CriteriaSet> childList = getChildrenPopulation(reglement, referents[i], key);
					children[i] = childList.toArray(new CriteriaSet[childList.size()]);
				}
				if(children.length > 0) {
					referents = new CriteriaSet[children[0].length*referents.length];
					int inc = 0;
					for(int i = 0; i < children.length; i++) {
						for(int j = 0; j < children[i].length; j++) {
							referents[inc++] = children[i][j];
						}
					}
				}
			}
		}*/

		return referents;
	}

	/**
	 * Retourne une liste de jeux de critères enfant par rapport au jeux de reference
	 * 
	 * @param rankingCriterion le règlement servant de base
	 * @param referent le jeux de critère de reference
	 * @param criterion le critère de reference
	 * @return les enfants
	 */
	private static List<CriteriaSet> getChildrenPopulation(RankingCriterion rankingCriterion, CriteriaSet referent, Criterion criterion) {
		//crée la table des enfants
		List<CriteriaSet> children = new ArrayList<CriteriaSet>();

		for(CriterionElement element : criterion.getCriterionElements()) {
			//initialise les critères
			CriteriaSet tempCrit = new CriteriaSet();
			tempCrit.setRankingCriterion(rankingCriterion);
			tempCrit.setElements(referent.getElements());
			tempCrit.addCriterionElement(element);
			children.add(tempCrit);
		}

		return children;
	}

	/**
	 * test l'equivalence de deux jeux de critères
	 * 
	 * @param criteriaSet le jeux de critère avec lequel comparer
	 * @return true si equivalent, false sinon
	 */
	public boolean equals(CriteriaSet criteriaSet) {
		boolean isEquals = true;
		
		if(elements.size() != criteriaSet.getElements().size())
			return false;

		if(!getUID().equals(criteriaSet.getUID()))
			isEquals = false;

		return isEquals;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if(obj == null)
			return false;
		if (this == obj)
			return true;
		if (getClass() != obj.getClass())
			return false;

		final CriteriaSet other = (CriteriaSet) obj;

		return equals(other);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return getUID().hashCode();
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return getUID();
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#clone()
	 */
	@Override
	protected Object clone() throws CloneNotSupportedException {
		CriteriaSet clone = (CriteriaSet)super.clone();
		/*List<DistancesEtBlasonAlternatif> clonedAlternative = new ArrayList<DistancesEtBlasonAlternatif>();
		for(DistancesEtBlasonAlternatif alternatif : distancesEtBlasonAlternatifs) {
			clonedAlternative.add((DistancesEtBlasonAlternatif)alternatif.clone());
		}
		clone.setDistancesEtBlasonAlternatifs(clonedAlternative);*/
		
		clone.setTarifsCategorie(new ArrayList<RateCategory>(tarifsCategorie));
		
		List<CriteriaSetElement> clonedElements = new ArrayList<CriteriaSetElement>();
		for(CriteriaSetElement element : elements) {
			clonedElements.add((CriteriaSetElement)element.clone());
		}
		clone.setElements(clonedElements);
		
		clone.reindexElements();
		return clone;
	}
}
