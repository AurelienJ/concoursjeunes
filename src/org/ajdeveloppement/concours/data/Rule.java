/*
 * Créé le 02/03/2007 à 17:36 pour ArcCompetition
 *
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

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.Session;
import org.ajdeveloppement.commons.persistence.StoreHelper;
import org.ajdeveloppement.commons.persistence.sql.Cache;
import org.ajdeveloppement.commons.persistence.sql.PersitentCollection;
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


/**
 * <p>
 * Représentation d'un règlement de concours. Un règlement fixe les règles
 * arbitral appliqué à un concours. Un seul règlement peut être appliqué sur un
 * concours, et à plus forte raison à tous les archers du concours.
 * </p>
 * <p>
 * On retrouve dans un règlement les éléments essentiel afin de compter les
 * points ainsi que l'ensemble des critères de classement et de placement qui
 * doivent être appliqué sur un concours.
 * </p>
 * <p>
 * Un règlement peut être qualifié d'"officiel" ou non. Si il est qualifié
 * d'officiel, celui ci ne devrait pas être altéré par les vue/contrôleur. La
 * méthode {@link #isOfficialReglement()}</i> est utilisé pour déterminé si le
 * règlement doit être considéré ou non comme officiel. Cette qualification doit
 * permettre d'effectuer des classement inter-club, inter-concours avec
 * l'assurance que les critères d'évaluation sont en tout point identique.
 * </p>
 * 
 * @author Aurélien JEOFFRAY
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="REGLEMENT")
@SqlPrimaryKey(fields="ID_REGLEMENT", generatedidField=@SqlGeneratedIdField(name="ID_REGLEMENT",type=Types.JAVA_OBJECT))
public class Rule implements SqlObjectPersistence, Cloneable {

	/**
	 * Type de réglement
	 */
	public enum TypeReglement {
		/**
		 * Règlement sur cible anglaise
		 */
		TARGET,
		/**
		 * Règlement nature (3D, Campagne, Tir Nature)
		 */
		NATURE
	}

	/**
	 * Le numéro de version courant du format de réglement
	 */
	public static final int CURRENT_VERSION = 1;
	
	@XmlAttribute
	private int version = 1;
	
	@XmlAttribute(name="id")
	@XmlID
	private String xmlId = null;
	
	@XmlTransient
	@SqlField(name="ID_REGLEMENT")
	private UUID idRule;
	
	@XmlTransient
	@SqlForeignKey(mappedTo="ID_COMPETITION")
	private Competition competition;
	
	@XmlAttribute
	@XmlID
	@SqlField(name="NOM")
	private String name = "default"; //$NON-NLS-1$

	@SqlField(name="DESCRIPTION")
	private String description = ""; //$NON-NLS-1$

	@SqlField(name="NBSERIE")
	private int nbSerie = 2;
	@SqlField(name="NBVOLEEPARSERIE")
	private int nbVoleeParSerie = 6;
	@SqlField(name="NBFLECHEPARVOLEE")
	private int nbFlecheParVolee = 3;
	@SqlField(name="NBPOINTSPARFLECHE")
	private int nbPointsParFleche = 10;
	@SqlField(name="NBMEMBRESEQUIPE")
	private int nbMembresEquipe = 4;
	@SqlField(name="NBMEMBRESRETENU")
	private int nbMembresRetenu = 3;
	@SqlField(name="ISOFFICIAL")
	private boolean officialReglement = false;

	@XmlElementWrapper(name="criteria",required=true)
    @XmlElement(name="criterion")
	private List<Criterion> listCriteria = new ArrayList<>();
	@XmlElementWrapper(name="distancesEtBlasons",required=true)
    @XmlElement(name="distancesEtBlason")
	private List<DistancesEtBlason> listDistancesEtBlason = new ArrayList<>();
	@XmlElementWrapper(name="surclassements",required=true)
	@XmlElement(name="surclassement")
	private List<Surclassement> surclassements = new ArrayList<>();
	@XmlElementWrapper(name="placementsCriteriaSet",required=true)
	@XmlElement(name="placementCriteriaSet")
	private List<CriteriaSet> listPlacementCriteriaSet = new ArrayList<>();
	@XmlElementWrapper(name="departages",required=true)
    @XmlElement(name="departage")
	@SqlChildCollection(foreignFields="ID_REGLEMENT", type=Tie.class)
	private List<Tie> tie = new ArrayList<>();
	
	@SqlChildCollection(foreignFields="ID_REGLEMENT", type=RankingCriterion.class)
	private List<RankingCriterion> rankingCriteria;

	@SqlForeignKey(mappedTo="ID_ENTITE")
	private Entite entite = new Entite();
	@SqlForeignKey(mappedTo="NUMCATEGORIE_REGLEMENT")
	private RulesCategory category;
	@SqlField(name="TYPEREGLEMENT")
	private TypeReglement reglementType = TypeReglement.TARGET;
	@SqlField(name="REMOVABLE")
	private boolean removable = true;
	
	private transient Map<CriteriaSet, Surclassement> indexedSurclassement = new HashMap<CriteriaSet, Surclassement>();
	
	protected transient PropertyChangeSupport pcs = new PropertyChangeSupport(this);

	/**
	 * Constructeur java-beans. Initialise un règlement par défaut
	 * 
	 */
	public Rule() {
	}

	/**
	 * Initialise un règlement par défaut en le nommant
	 * 
	 * @param name le nom du règlement à créer
	 */
	public Rule(String name) {
		this.name = name;
	}
	
	private void reindexSurclassement() {
		indexedSurclassement.clear();
		for(Surclassement surclassement : surclassements)
			indexedSurclassement.put(surclassement.getCriteriaSet(), surclassement);
	}
	
	/**
	 * Permet d'ajouter un auditeur PropertyChangeListener
	 * @param l l'auditeur
	 */
	public void addPropertyChangeListener(PropertyChangeListener l) {
		pcs.addPropertyChangeListener(l);
	}
	
	/**
	 * Permet de supprimer un auditeur PropertyChangeListener
	 * @param l l'auditeur à supprimer
	 */
	public void removePropertyChangeListener(PropertyChangeListener l) {
		pcs.removePropertyChangeListener(l);
	}

	/**
	 * Retourne le numéro de version interne du règlement.
	 * La version courante retourné par un fichier sérialisé devrais être 2.
	 * Si c'est 1 alors envisager de passer par une routine de mise à jour des réglements (opération
	 * généralement effectué par l'extension PhoenixPlugin)
	 * 
	 * @return version le numéro de version du règlement.
	 */
	public int getVersion() {
		return version;
	}

	/**
	 * Définit le numéro interne de version du règlement. Doit
	 * être actuellement définit à 2 utiliser la constante {@link #CURRENT_VERSION}.
	 * 
	 * @param version le numéro de version du règlement.
	 */
	public void setVersion(int version) {
		this.version = version;
	}

	/**
	 * Retourne l'identifiant du réglement en base ou 0 si non lié à la base. Information non sérialisé en XML
	 * 
	 * @return Identifiant du réglement en base
	 */
	public UUID getIdRule() {
		if(idRule == null)
			idRule = UUID.randomUUID();
		return idRule;
	}

	/**
	 * Définit l'identifiant du réglement en base
	 * 
	 * @param idRule Identifiant du réglement en base
	 */
	public void setIdRule(UUID idReglement) {
		Object oldValue = this.idRule;
		
		this.idRule = idReglement;
		
		pcs.firePropertyChange("idRule", oldValue, idReglement); //$NON-NLS-1$
	}

	/**
	 * Retourne le nom du règlement
	 * 
	 * @return le nom du règlement
	 */
	public String getName() {
		return name;
	}

	/**
	 * Donne ou change le nom du règlement
	 * 
	 * @param name le nom à donner au règlement
	 */
	public void setName(String name) {
		Object oldValue = this.name;
		
		this.name = name;
		
		pcs.firePropertyChange("name", oldValue, name); //$NON-NLS-1$
	}
	
	/**
	 * Retourne la description du réglement
	 * 
	 * @return la description du règlement
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * Définit la description du réglement
	 * 
	 * @param description la description du règlement
	 */
	public void setDescription(String description) {
		Object oldValue = this.description;
		
		this.description = description;
		
		pcs.firePropertyChange("description", oldValue, description); //$NON-NLS-1$
	}

	/**
	 * Retourne le type de règlement
	 * 
	 * @return reglementType le type de règlement
	 */
	public TypeReglement getReglementType() {
		return reglementType;
	}

	/**
	 * Définit le type de règlement
	 * 
	 * @param reglementType le type de règlement
	 */
	public void setReglementType(TypeReglement reglementType) {
		Object oldValue = this.reglementType;
		
		this.reglementType = reglementType;
		
		pcs.firePropertyChange("reglementType", oldValue, reglementType); //$NON-NLS-1$
	}

	/**
	 * @return competition
	 */
	public Competition getCompetition() {
		return competition;
	}

	/**
	 * @param competition competition à définir
	 */
	public void setCompetition(Competition competition) {
		this.competition = competition;
	}

	/**
	 * <p>
	 * Retourne la liste des critères de distinction des archers pouvant être
	 * utilisé sur les concours exploitant ce règlement.
	 * </p>
	 * <p>
	 * Les critères retournés peuvent être soit determinant pour le classement,
	 * le placement, les deux ou simplement informatif.
	 * </p>
	 * 
	 * @return la liste des critères de distinction utilisé pour le règlement
	 */
	public List<Criterion> getListCriteria() {
		return listCriteria;
	}

	/**
	 * Définit la liste des critères de distinction du règlement.
	 * 
	 * <i>Méthode essentiellement utile à la déserialisation. Ne devrait pas être
	 * utilisé directement.</i>
	 * 
	 * @param listCriteria la liste des critères de distinction du règlement.
	 */
	public void setListCriteria(List<Criterion> listCriteria) {
		Object oldValue = this.listCriteria;
		
		this.listCriteria = listCriteria;
		
		for(Criterion criterion : listCriteria)
			criterion.setReglement(this);
		
		pcs.firePropertyChange("listCriteria", oldValue, listCriteria); //$NON-NLS-1$
	}
	
	/**
	 * Ajoute un critère au réglement
	 * 
	 * @param criterion le critère à ajouter au réglement
	 */
	public void addCriterion(Criterion criterion) {
		listCriteria.add(criterion);
		
		criterion.setReglement(this);
	}
	
	/**
	 * Supprime un critère du réglement.
	 * 
	 * @param criterion le critèrev à supprimer
	 */
	public void removeCriterion(Criterion criterion) {
		listCriteria.remove(criterion);
	}

	/**
	 * Retourne le tableau de surclassement à appliquer sur
	 * le règlement
	 * 
	 * @return le tableau de surclassement
	 */
	public List<Surclassement> getSurclassements() {
		return Collections.unmodifiableList(surclassements);
	}

	/**
	 * Définit le tableau de surclassement à appliquer sur
	 * le règlement
	 * 
	 * @param surclassements le tableau de surclassement
	 */
	public void setSurclassements(List<Surclassement> surclassements) {
		Object oldValue = this.surclassements;
		
		this.surclassements = surclassements;
		
		for(Surclassement surclassement : surclassements) {
			surclassement.setReglement(this);
		}
		reindexSurclassement();
		
		pcs.firePropertyChange("surclassements", oldValue, surclassements); //$NON-NLS-1$
	}
	
	/**
	 * Retourne, si il existe, le surclassement associé au jeux de critère
	 * 
	 * @param criteriaSet le jeux de critère petentielement surclassé ou désactivé
	 * @return le surclassement si exisant
	 */
	public Surclassement getSurclassement(CriteriaSet criteriaSet) {
		if(indexedSurclassement.size() != surclassements.size())
			reindexSurclassement();
		return indexedSurclassement.get(criteriaSet);
	}
	
	/**
	 * 
	 * @param criteriaSet
	 * @return <code>true</code> si le critère doit être surclassé
	 */
	public boolean isSurclasseOrDisable(CriteriaSet criteriaSet) {
		if(indexedSurclassement.size() != surclassements.size())
			reindexSurclassement();
		return indexedSurclassement.containsKey(criteriaSet);
	}
	
	/**
	 * Ajout d'un surclassement
	 * 
	 * @param criteriaSet
	 * @param criteriaSetSurclasse
	 */
	public void addSurclassement(CriteriaSet criteriaSet, CriteriaSet criteriaSetSurclasse) {
		Surclassement surclassement = new Surclassement(criteriaSet, criteriaSetSurclasse);
		surclassement.setReglement(this);
		
		surclassements.add(surclassement);
		indexedSurclassement.put(surclassement.getCriteriaSet(), surclassement);
	}
	
	/**
	 * Suppression d'un surclassement
	 * 
	 * @param criteriaSet
	 */
	public void removeSurclassement(CriteriaSet criteriaSet) {
		Surclassement surclassement = indexedSurclassement.remove(criteriaSet);
		surclassements.remove(surclassement);
	}

	/**
	 * @return placementCriteriaSet
	 */
	public List<CriteriaSet> getListPlacementCriteriaSet() {
		return Collections.unmodifiableList(listPlacementCriteriaSet);
	}

	/**
	 * @param placementCriteriaSet placementCriteriaSet à définir
	 */
	public void setListPlacementCriteriaSet(List<CriteriaSet> placementCriteriaSet) {
		this.listPlacementCriteriaSet = placementCriteriaSet;
		
		listDistancesEtBlason.clear();
//		for(CriteriaSet criteriaSet : placementCriteriaSet) {
//			criteriaSet.setReglement(this);
//			
//			if(!listDistancesEtBlason.contains(criteriaSet.getDistancesEtBlason())) {
//				listDistancesEtBlason.add(criteriaSet.getDistancesEtBlason());
//				if(criteriaSet.getDistancesEtBlasonAlternatifs() != null) {
//					for (DistancesEtBlasonAlternatif alternative : criteriaSet.getDistancesEtBlasonAlternatifs()) {
//						if(!listDistancesEtBlason.contains(alternative.getDistancesEtBlason())) {
//							listDistancesEtBlason.add(alternative.getDistancesEtBlason());
//						}
//					}
//				}
//			}
//		}
	}
	
	/**
	 * Retourne l'instance de placement lié au jeux de critère fournit
	 * 
	 * @param criteriaSet le jeux de critère de placement.
	 * @return l'instance de placement (identique au jeux de critère fournit
	 * mais avec un distance et blason associé)
	 */
	public CriteriaSet getPlacementCriteriaSet(CriteriaSet criteriaSet) {
		return listPlacementCriteriaSet.get(listPlacementCriteriaSet.indexOf(criteriaSet));
	}
	
	/**
	 * @return listDistancesEtBlason
	 */
	public List<DistancesEtBlason> getListDistancesEtBlason() {
		return listDistancesEtBlason;
	}

	/**
	 * @param listDistancesEtBlason listDistancesEtBlason à définir
	 */
	public void setListDistancesEtBlason(
			List<DistancesEtBlason> listDistancesEtBlason) {
		this.listDistancesEtBlason = listDistancesEtBlason;
	}

	/**
	 * Renvoi la politique de placement.
	 * 
	 * @return Renvoi le filtre de critère en place
	 *         pour le placement des archers
	 */
	public Map<Criterion, Boolean> getPlacementFilter() {
		Hashtable<Criterion, Boolean> filterCriteria = new Hashtable<Criterion, Boolean>();
		for (Criterion criterion : listCriteria) {
			filterCriteria.put(criterion, false);
		}

		return filterCriteria;
	}

	/**
	 * Renvoi la politique de classement
	 * 
	 * @return Renvoi le filtre de critère en place
	 *         pour le classement des archers
	 */
	public Map<Criterion, Boolean> getClassementFilter() {
		Hashtable<Criterion, Boolean> filterCriteria = new Hashtable<Criterion, Boolean>();
		for (Criterion criterion : listCriteria) {
			filterCriteria.put(criterion, true);
		}

		return filterCriteria;
	}
	
	/**
	 * Retourne la liste des critères de classement valide sur le règlement,
	 * sont donc exclue de la liste les jeux de critères surclassé ou interdit
	 * 
	 * @return liste des critères de classement valide sur le règlement
	 */
	public List<CriteriaSet> getValidClassementCriteriaSet() {
//		CriteriaSet[] lccs = CriteriaSet.listCriteriaSet(this, getClassementFilter());
		List<CriteriaSet> validCS = new ArrayList<CriteriaSet>();
		
		if(indexedSurclassement.size() != surclassements.size())
			reindexSurclassement();
		
//		for(CriteriaSet cs : lccs) {
//			if(!indexedSurclassement.containsKey(cs))
//				validCS.add(cs);
//		}
		
		return validCS;
	}
	
	/**
	 * Retourne la liste des critères de placement valide sur le règlement,
	 * sont donc exclue de la liste les jeux de critères surclassé ou interdit
	 * 
	 * @return liste des critères de placement valide sur le règlement
	 */
	public List<CriteriaSet> getValidPlacementCriteriaSet() {
		//List<CriteriaSet> validCS = new ArrayList<CriteriaSet>();
		List<CriteriaSet> placementCS = new ArrayList<CriteriaSet>();
//		CriteriaSet[] lccs = CriteriaSet.listCriteriaSet(this, getClassementFilter());
//		CriteriaSet[] lpcs = CriteriaSet.listCriteriaSet(this, getPlacementFilter());
		
		if(indexedSurclassement.size() != surclassements.size())
			reindexSurclassement();
//
//		for(CriteriaSet cs : lccs) {
//			CriteriaSet jeuxDePlacement = cs.getFilteredCriteriaSet(getPlacementFilter());
//			if(indexedSurclassement.containsKey(cs) && !validCS.contains(jeuxDePlacement))
//				validCS.add(jeuxDePlacement);
//		}
//		
//		//permet de conserver l'ordre des critères de placements
//		for(CriteriaSet cs : lpcs) {
//			if(validCS.contains(cs))
//				placementCS.add(cs);
//		}
		
		return placementCS;
	}

	/**
	 * Retourne le nombre de flèche tiré par volée imposé par le règlement
	 * <p>
	 * La valeur par défaut est fixé à 3
	 * 
	 * @return le nombre de flèches tiré par volée
	 */
	public int getNbFlecheParVolee() {
		return nbFlecheParVolee;
	}

	/**
	 * Définit le nombre de flèches tiré par volée imposé par le règlement
	 * 
	 * @param nbFlecheParVolee le nombre de flèches tiré par volée
	 */
	public void setNbFlecheParVolee(int nbFlecheParVolee) {
		Object oldValue = this.nbFlecheParVolee;
		
		this.nbFlecheParVolee = nbFlecheParVolee;
		
		pcs.firePropertyChange("nbFlecheParVolee", oldValue, nbFlecheParVolee); //$NON-NLS-1$
	}
	
	/**
	 * Donne le nombre de points maximum possible par flèche avec le réglement
	 * 
	 * @return nbPointsParFleche le nombre de points maximum possible par flèche
	 */
	public int getNbPointsParFleche() {
		return nbPointsParFleche;
	}

	/**
	 * Définit le nombre de points maximum possible par flèche avec le réglement
	 * 
	 * @param nbPointsParFleche le nombre de points maximum possible par flèche
	 */
	public void setNbPointsParFleche(int nbPointsParFleche) {
		Object oldValue = this.nbPointsParFleche;
		
		this.nbPointsParFleche = nbPointsParFleche;
		
		pcs.firePropertyChange("nbPointsParFleche", oldValue, nbPointsParFleche); //$NON-NLS-1$
	}

	/**
	 * Retourne le nombre maximum de concurrents que peut contenir une équipe
	 * sur un concours avec ce règlement
	 * <p>
	 * La valeur par défaut est fixé à 4
	 * 
	 * @return le nombre maximum de concurrents que peut contenir une équipe
	 */
	public int getNbMembresEquipe() {
		return nbMembresEquipe;
	}

	/**
	 * Définit le nombre maximum de concurrents que peut contenir une équipe
	 * sur un concours avec ce règlement
	 * 
	 * @param nbMembresEquipe le nombre maximum de concurrents que peut contenir une équipe
	 */
	public void setNbMembresEquipe(int nbMembresEquipe) {
		Object oldValue = this.nbMembresEquipe;
		
		this.nbMembresEquipe = nbMembresEquipe;
		
		pcs.firePropertyChange("nbMembresEquipe", oldValue, nbMembresEquipe); //$NON-NLS-1$
	}

	/**
	 * Retourne le nombre de concurrents, membre d'une équipe dont les points seront
	 * comptabilisés pour le classement par équipe
	 * <p>
	 * La valeur par défaut est fixé à 3
	 * 
	 * @return le nombre de concurrents d'une équipe dont les points seront comptabilisés
	 */
	public int getNbMembresRetenu() {
		return nbMembresRetenu;
	}

	/**
	 * Définit le nombre de concurrents, membre d'une équipe dont les points seront
	 * comptabilisés pour le classement par équipe
	 * 
	 * @param nbMembresRetenu le nombre de concurrents d'une équipe dont les points seront comptabilisés
	 */
	public void setNbMembresRetenu(int nbMembresRetenu) {
		Object oldValue = this.nbMembresRetenu;
		
		this.nbMembresRetenu = nbMembresRetenu;
		
		pcs.firePropertyChange("nbMembresRetenu", oldValue, nbMembresRetenu); //$NON-NLS-1$
	}

	/**
	 * Retourne le nombre de séries de volées (distances) que compte le concours
	 *   
	 * @return le nombre de séries devant être réalisé sur le concours
	 */
	public int getNbSerie() {
		return nbSerie;
	}

	/**
	 * Définit le nombre de séries de volées (distances) que compte le concours
	 * 
	 * @param nbSerie le nombre de séries devant être réalisé sur le concours
	 */
	public void setNbSerie(int nbSerie) {
		Object oldValue = this.nbSerie;
		
		this.nbSerie = nbSerie;
		
		pcs.firePropertyChange("nbSerie", oldValue, nbSerie); //$NON-NLS-1$
	}

	/**
	 * Définit le nombre de volées que devra tirer un archer dans une série
	 * 
	 * @return le nombre de volées dans une série
	 */
	public int getNbVoleeParSerie() {
		return nbVoleeParSerie;
	}

	/**
	 * Retourne le nombre de volées que devra tirer un archer dans une série
	 * 
	 * @param nbVoleeParSerie le nombre de volées dans une série
	 */
	public void setNbVoleeParSerie(int nbVoleeParSerie) {
		Object oldValue = this.nbVoleeParSerie;
		
		this.nbVoleeParSerie = nbVoleeParSerie;
		
		pcs.firePropertyChange("nbVoleeParSerie", oldValue, nbVoleeParSerie); //$NON-NLS-1$
	}

	/**
	 * Retourne la liste des champs de départage
	 * 
	 * @return la liste des départage
	 */
	public List<Tie> getTie() {
		return tie;
	}

	/**
	 * Défini la liste des champs de départage
	 * 
	 * @param tie la liste des champs de départage
	 */
	public void setTie(List<Tie> tie) {
		Object oldValue = this.tie;
		
		this.tie = tie;
		for(Tie t : tie)
			t.setReglement(this);
		
		pcs.firePropertyChange("tie", oldValue, tie); //$NON-NLS-1$
	}

	/**
	 * Permet d'identifié le règlement comme officiel ou non.<br>
	 * Un règlement officiel ne devrait pas être altéré au cours de sa vie.
	 * 
	 * @return true si le règlement est qualifié d'officiel, false dans le cas
	 *         contraire.
	 */
	public boolean isOfficialReglement() {
		return officialReglement;
	}

	/**
	 * <p>
	 * Définit si le règlement est ou non officiel
	 * </p>
	 * <p>
	 * <i>Méthode essentiellement utile à la déserialisation et aux outils de
	 * débugage. Ne devrait pas être utilisé directement.</i>
	 * </p>
	 * 
	 * @param officialReglement
	 *            true pour un règlement officiel, false sinon
	 */
	public void setOfficialReglement(boolean officialReglement) {
		Object oldValue = this.officialReglement;
		
		this.officialReglement = officialReglement;
		
		pcs.firePropertyChange("officialReglement", oldValue, officialReglement); //$NON-NLS-1$
	}

	/**
	 * Détermine si un tableau de scores donnée est ou non valide sur le règlement
	 * 
	 * @param scores le tableau de scores à valider
	 * @return <code>true</code> si le score est valide, <code>false</code> dans le cas contraire
	 */
	public boolean isValidScore(Iterable<Integer> scores) {
		boolean valid = true;
		for (int score : scores) {
			if (score > nbVoleeParSerie * nbFlecheParVolee * nbPointsParFleche) {
				valid = false;
				break;
			}
		}
		return valid;
	}

	/**
	 * Définit l'entité associé au reglement
	 * 
	 * @param entite l'entité associé au reglement
	 */
	public void setEntite(Entite entite) {
		Object oldValue = this.entite;
		
		this.entite = entite;
		
		pcs.firePropertyChange("entite", oldValue, entite); //$NON-NLS-1$
	}

	/**
	 * Retourne l'entité associé au reglement
	 * 
	 * @return l'entité associé au reglement
	 */
	public Entite getEntite() {
		return entite;
	}

	/**
	 * Définit le numéro de la catégorie du règlement<br>
	 * La correspondance entre les numéros de catégorie et leurs libellé
	 * est stocké dans la table CATEGORIE_REGLEMENT   
	 * 
	 * @param category le numéro de la catégorie du règlement
	 */
	public void setCategory(RulesCategory category) {
		Object oldValue = this.category;
		
		this.category = category;
		
		pcs.firePropertyChange("category", oldValue, category); //$NON-NLS-1$
	}

	/**
	 * Retourne le numéro de la catégorie du règlement<br>
	 * La correspondance entre les numéros de catégorie et leurs libellé
	 * sont stockés dans la table CATEGORIE_REGLEMENT
	 * 
	 * @return le numéro de la catégorie du règlement
	 */
	public RulesCategory getCategory() {
		return category;
	}

	/**
	 * Définit si le règlement peut ou non être supprimé de la base de données
	 * 
	 * @param removable <code>true</code> si le règlement peut être supprimé.
	 */
	public void setRemovable(boolean removable) {
		this.removable = removable;
	}

	/**
	 * Indique si le règlement peut être supprimé de la base ou non
	 * 
	 * @return removable <code>true</code> si le règlement peut être supprimé.
	 */
	public boolean isRemovable() {
		return removable;
	}

	/**
	 * @return rankingCriteria
	 */
	public List<RankingCriterion> getRankingCriteria() {
		return rankingCriteria;
	}

	/**
	 * @param rankingCriteria rankingCriteria à définir
	 */
	public void setRankingCriteria(List<RankingCriterion> rankingCriteria) {
		this.rankingCriteria = rankingCriteria;
	}

	/**
	 * <p>Rend l'objet persistant. Sauvegarde l'ensemble des données de l'objet
	 * dans la base de donnée de ArcCompetition.</p>
	 * 
	 * <p>Les arguments sont ignoré.</p>
	 */
	@Override
	public void save(Session session) throws ObjectPersistenceException {
		if(Session.canExecute(session, this)) {
			if(entite.getIdEntite() == null)
				entite.save(session);
	
			if(idRule == null) {
				idRule = UUID.randomUUID();
			}
			
			SqlContext context = SqlContext.getDefaultContext();
			if(session instanceof SqlSession)
				context = ((SqlSession)session).getContext();
			
			StoreHelper<Rule> helper = SqlStoreHelperCache.getHelper(Rule.class, context);
			helper.save(this);
			
			Cache.put(this);
			
			Session.addProcessedObject(session,this);
	
			saveTie(session);
			// sauvegarde les tableaux de critères et correspondance
			saveCriteria(session);
			saveDistancesAndBlasons(session);
			saveSurclassement(session);
		}
	}
	
	private void saveTie(Session session) throws ObjectPersistenceException {
		int i = 1;
		for(Tie d : tie) {
			d.setNumOrdre(i++);
		}
		
		PersitentCollection.save(tie, session, 
				Collections.<String, Object>singletonMap(T_Tie.ID_REGLEMENT.getFieldName(), idRule));
	}

	/**
	 * Sauvegarde en base les critères de distinction des archers actif pour le règlement
	 * 
	 * @throws SQLException
	 */
	private void saveCriteria(Session session) throws ObjectPersistenceException {
		
		int numordre = 1;
		for (Criterion criterion : listCriteria) {
			criterion.setNumordre(numordre++);
		}
		
		PersitentCollection.save(listCriteria, session, 
				Collections.<String, Object>singletonMap(T_Tie.ID_REGLEMENT.getFieldName(), idRule));
	}
	
	/**
	 * Sauvegarde en base le tableau de surclassement
	 * 
	 * @throws SQLException
	 */
	private void saveSurclassement(Session session) throws ObjectPersistenceException {
		PersitentCollection.save(surclassements, session, 
				Collections.<String, Object>singletonMap(T_Tie.ID_REGLEMENT.getFieldName(), idRule));
	}

	/**
	 * Sauvegarde en base le tableau des distances/blasons
	 * 
	 * @throws SQLException
	 */
	private void saveDistancesAndBlasons(Session session) throws ObjectPersistenceException {
//		PersitentCollection.save(listPlacementCriteriaSet, session,
//				Collections.<String, Object>singletonMap(T_CriteriaSet.ID_REGLEMENT.getFieldName(), idRule));
	}
	
	
	@Override
	public boolean validateBeforeDelete() {
		return !officialReglement;
	}

	/**
	 * Supprime la persistance du règlement. Cette persistance ne peut être
	 * supprimé qu'à la condition que le règlement ne soit pas officiel
	 * 
	 * @throws ObjectPersistenceException
	 */
	@Override
	public void delete(Session session) throws ObjectPersistenceException {
		if (validateBeforeDelete()) {
			if(Session.canExecute(session, this)) {
				SqlContext context = SqlContext.getDefaultContext();
				if(session instanceof SqlSession)
					context = ((SqlSession)session).getContext();
				
				StoreHelper<Rule> helper = SqlStoreHelperCache.getHelper(Rule.class, context);
				helper.delete(this);
				
				Cache.remove(this);
				
				Session.addProcessedObject(session, this);
			}
		} else
			throw new ObjectPersistenceException("delete this Rule is not authorized because there is official"); //$NON-NLS-1$
	}
	
	protected void beforeMarshal(Marshaller marshaller) {
		if(idRule == null)
			idRule = UUID.randomUUID();
		
		xmlId = idRule.toString();
	}
	
	/**
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		idRule = UUID.fromString(xmlId);
		
		xmlId = null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int PRIME = 31;
		int result = 1;
		result = PRIME * result + name.hashCode();

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
		if (getClass() != obj.getClass())
			return false;
		Rule other = (Rule) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}

	/**
	 * @return le nom du règlement
	 */
	@Override
	public String toString() {
		return entite.getNom() + " - " + name; //$NON-NLS-1$
	}
	
	@Override
	public Rule clone() throws CloneNotSupportedException {
		Rule clone = (Rule)super.clone();
		clone.setIdRule(null);
		
		//Reinitialisation des D/B
		clone.setListDistancesEtBlason(new ArrayList<DistancesEtBlason>());
		
		//clone des critères
		Map<CriterionElement, CriterionElement> correpondanceCritereElement = new HashMap<CriterionElement, CriterionElement>();
		List<Criterion> clonedCriterion = new ArrayList<Criterion>();
		for(Criterion criterion : listCriteria) {
			Criterion cloneCriterion = (Criterion)criterion.clone();
			clonedCriterion.add(cloneCriterion);
			
			for(int i = 0; i < cloneCriterion.getCriterionElements().size(); i++) {
				correpondanceCritereElement.put(criterion.getCriterionElements().get(i),  cloneCriterion.getCriterionElements().get(i));
			}
		}
		clone.setListCriteria(clonedCriterion);
		
		//clone surclassement
		List<Surclassement> clonedSurclassements = new ArrayList<Surclassement>();
		for(Surclassement surclassement : surclassements) {
			Surclassement clonedSurclassement = (Surclassement)surclassement.clone();
//			clonedSurclassement.getCriteriaSet().setNumCriteriaSet(0);
			for(CriteriaSetElement element : clonedSurclassement.getCriteriaSet().getElements()) {
				if(correpondanceCritereElement.containsKey(element.getCriterionElement()))
					element.setCriterionElement(correpondanceCritereElement.get(element.getCriterionElement()));
			}
//			clonedSurclassement.getCriteriaSetSurclasse().setNumCriteriaSet(0);
			for(CriteriaSetElement element : clonedSurclassement.getCriteriaSetSurclasse().getElements()) {
				if(correpondanceCritereElement.containsKey(element.getCriterionElement()))
					element.setCriterionElement(correpondanceCritereElement.get(element.getCriterionElement()));
			}
			clonedSurclassements.add(clonedSurclassement);
		}
		clone.setSurclassements(clonedSurclassements);
		
		//clone criteriasetplacement
		List<CriteriaSet> clonedPlacementCriteriaSet = new ArrayList<CriteriaSet>();
		for(CriteriaSet criteriaSet : listPlacementCriteriaSet) {
			CriteriaSet clonedCriteriaSet = (CriteriaSet)criteriaSet.clone();
//			clonedCriteriaSet.setNumCriteriaSet(0);
			for(CriteriaSetElement element : clonedCriteriaSet.getElements()) {
				if(correpondanceCritereElement.containsKey(element.getCriterionElement()))
					element.setCriterionElement(correpondanceCritereElement.get(element.getCriterionElement()));
			}
			clonedPlacementCriteriaSet.add(clonedCriteriaSet);
		}
		clone.setListPlacementCriteriaSet(clonedPlacementCriteriaSet);
		
		//clone departage
		List<Tie> clonedTie = new ArrayList<Tie>();
		for(Tie t : tie) {
			clonedTie.add((Tie)t.clone());
		}
		clone.setTie(clonedTie);
		
		return clone;
	}
}
