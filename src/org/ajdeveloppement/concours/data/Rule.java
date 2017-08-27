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
import java.sql.Types;
import java.util.Collection;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.LazyPersistentCollection;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
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
@SqlTable(name = "REGLEMENT")
@SqlPrimaryKey(fields = "ID_REGLEMENT", generatedidField = @SqlGeneratedIdField(name = "ID_REGLEMENT", type = Types.JAVA_OBJECT))
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

	@SqlField(name = "ID_REGLEMENT")
	private UUID idRule = UUID.randomUUID();

	@SqlForeignKey(mappedTo = "ID_COMPETITION")
	private Competition competition;

	@SqlField(name = "NOM")
	private String name = "default"; //$NON-NLS-1$

	@SqlField(name = "DESCRIPTION")
	private String description = ""; //$NON-NLS-1$

	@SqlField(name = "NBSERIE")
	private int nbSerie = 2;
	@SqlField(name = "NBVOLEEPARSERIE")
	private int nbVoleeParSerie = 6;
	@SqlField(name = "NBFLECHEPARVOLEE")
	private int nbFlecheParVolee = 3;
	@SqlField(name = "NBPOINTSPARFLECHE")
	private int nbPointsParFleche = 10;
	@SqlField(name = "NBMEMBRESEQUIPE")
	private int nbMembresEquipe = 4;
	@SqlField(name = "NBMEMBRESRETENU")
	private int nbMembresRetenu = 3;
	@SqlField(name = "ISOFFICIAL")
	private boolean officialReglement = false;
	
	@SqlForeignKey(mappedTo = "ID_ENTITE")
	private Entite entite = new Entite();
	@SqlForeignKey(mappedTo = "NUMCATEGORIE_REGLEMENT")
	private RulesCategory category;
	@SqlField(name = "TYPEREGLEMENT")
	private TypeReglement reglementType = TypeReglement.TARGET;
	@SqlField(name = "REMOVABLE")
	private boolean removable = true;

	@SqlChildCollection(foreignFields = "ID_REGLEMENT", type = DistanceAndFacesSet.class)
	private LazyPersistentCollection<DistanceAndFacesSet, Void> distancesAndFaces = new LazyPersistentCollection<>(
			() -> T_DistanceAndFacesSet.all().where(T_DistanceAndFacesSet.ID_REGLEMENT.equalTo(idRule)));

	@SqlChildCollection(foreignFields = "ID_REGLEMENT", type = Tie.class)
	private LazyPersistentCollection<Tie, Void> ties = new LazyPersistentCollection<>(
			() -> T_Tie.all().where(T_Tie.ID_REGLEMENT.equalTo(idRule)).orderBy(T_Tie.NUMORDRE));

	@SqlChildCollection(foreignFields = "ID_REGLEMENT", type = RankingCriterion.class)
	private LazyPersistentCollection<RankingCriterion, Void> rankingCriteria = new LazyPersistentCollection<>(
			() -> T_RankingCriterion.all().where(T_RankingCriterion.ID_REGLEMENT.equalTo(idRule)).orderBy(T_RankingCriterion.ORDRE));

	

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
	 * @param name
	 *            le nom du règlement à créer
	 */
	public Rule(String name) {
		this.name = name;
	}

	/**
	 * Permet d'ajouter un auditeur PropertyChangeListener
	 * 
	 * @param l
	 *            l'auditeur
	 */
	public void addPropertyChangeListener(PropertyChangeListener l) {
		pcs.addPropertyChangeListener(l);
	}

	/**
	 * Permet de supprimer un auditeur PropertyChangeListener
	 * 
	 * @param l
	 *            l'auditeur à supprimer
	 */
	public void removePropertyChangeListener(PropertyChangeListener l) {
		pcs.removePropertyChangeListener(l);
	}

	/**
	 * Retourne l'identifiant du réglement en base ou 0 si non lié à la base.
	 * Information non sérialisé en XML
	 * 
	 * @return Identifiant du réglement en base
	 */
	public UUID getIdRule() {
		if (idRule == null)
			idRule = UUID.randomUUID();
		return idRule;
	}

	/**
	 * Définit l'identifiant du réglement en base
	 * 
	 * @param idRule
	 *            Identifiant du réglement en base
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
	 * @param name
	 *            le nom à donner au règlement
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
	 * @param description
	 *            la description du règlement
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
	 * @param reglementType
	 *            le type de règlement
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
	 * @param competition
	 *            competition à définir
	 */
	public void setCompetition(Competition competition) {
		this.competition = competition;
	}

	/**
	 * @return listDistancesEtBlason
	 */
	public Collection<DistanceAndFacesSet> getDistancesAndFaces() {
		return distancesAndFaces;
	}
	
	public void addDistancesAndFaces(DistanceAndFacesSet distanceAndFacesSet) {
		distanceAndFacesSet.setRule(this);
		
		distancesAndFaces.add(distanceAndFacesSet);
	}
	
	public void removeDistancesAndFaces(DistanceAndFacesSet distanceAndFacesSet) {
		distancesAndFaces.remove(distanceAndFacesSet);
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
	 * @param nbFlecheParVolee
	 *            le nombre de flèches tiré par volée
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
	 * @param nbPointsParFleche
	 *            le nombre de points maximum possible par flèche
	 */
	public void setNbPointsParFleche(int nbPointsParFleche) {
		Object oldValue = this.nbPointsParFleche;

		this.nbPointsParFleche = nbPointsParFleche;

		pcs.firePropertyChange("nbPointsParFleche", oldValue, nbPointsParFleche); //$NON-NLS-1$
	}

	/**
	 * Retourne le nombre maximum de concurrents que peut contenir une équipe sur un
	 * concours avec ce règlement
	 * <p>
	 * La valeur par défaut est fixé à 4
	 * 
	 * @return le nombre maximum de concurrents que peut contenir une équipe
	 */
	public int getNbMembresEquipe() {
		return nbMembresEquipe;
	}

	/**
	 * Définit le nombre maximum de concurrents que peut contenir une équipe sur un
	 * concours avec ce règlement
	 * 
	 * @param nbMembresEquipe
	 *            le nombre maximum de concurrents que peut contenir une équipe
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
	 * @return le nombre de concurrents d'une équipe dont les points seront
	 *         comptabilisés
	 */
	public int getNbMembresRetenu() {
		return nbMembresRetenu;
	}

	/**
	 * Définit le nombre de concurrents, membre d'une équipe dont les points seront
	 * comptabilisés pour le classement par équipe
	 * 
	 * @param nbMembresRetenu
	 *            le nombre de concurrents d'une équipe dont les points seront
	 *            comptabilisés
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
	 * @param nbSerie
	 *            le nombre de séries devant être réalisé sur le concours
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
	 * @param nbVoleeParSerie
	 *            le nombre de volées dans une série
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
	public Collection<Tie> getTies() {
		return ties;
	}

	/**
	 * Ajoute un item de départage
	 * 
	 * @param tie
	 */
	public void addTie(Tie tie) {
		tie.setReglement(this);

		ties.add(tie);
	}

	/**
	 * Supprime u iteme de départage
	 * 
	 * @param tie
	 */
	public void removeTie(Tie tie) {
		ties.remove(tie);
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
	 * @param scores
	 *            le tableau de scores à valider
	 * @return <code>true</code> si le score est valide, <code>false</code> dans le
	 *         cas contraire
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
	 * @param entite
	 *            l'entité associé au reglement
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
	 * La correspondance entre les numéros de catégorie et leurs libellé est stocké
	 * dans la table CATEGORIE_REGLEMENT
	 * 
	 * @param category
	 *            le numéro de la catégorie du règlement
	 */
	public void setCategory(RulesCategory category) {
		Object oldValue = this.category;

		this.category = category;

		pcs.firePropertyChange("category", oldValue, category); //$NON-NLS-1$
	}

	/**
	 * Retourne le numéro de la catégorie du règlement<br>
	 * La correspondance entre les numéros de catégorie et leurs libellé sont
	 * stockés dans la table CATEGORIE_REGLEMENT
	 * 
	 * @return le numéro de la catégorie du règlement
	 */
	public RulesCategory getCategory() {
		return category;
	}

	/**
	 * Définit si le règlement peut ou non être supprimé de la base de données
	 * 
	 * @param removable
	 *            <code>true</code> si le règlement peut être supprimé.
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
	public Collection<RankingCriterion> getRankingCriteria() {
		return rankingCriteria;
	}

	/**
	 * @param rankingCriteria
	 *            rankingCriteria à définir
	 */
	public void addRankingCriteria(RankingCriterion rankingCriterion) {
		rankingCriterion.setRule(this);

		this.rankingCriteria.add(rankingCriterion);
	}

	public void removeRankingCriteria(RankingCriterion rankingCriterion) {
		this.rankingCriteria.remove(rankingCriterion);
	}

	@Override
	public boolean validateBeforeSave() throws ObjectPersistenceException {
//		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
//		Validator validator = factory.getValidator();
//		Set<ConstraintViolation<Rule>> constraintViolations = validator.validate(this);
//		if (constraintViolations.size() > 0) {
//			System.out.println("Impossible de valider les donnees du bean : ");
//			for (ConstraintViolation<Rule> contraintes : constraintViolations) {
//				System.out.println(contraintes.getRootBeanClass().getSimpleName() + "." + contraintes.getPropertyPath()
//						+ " " + contraintes.getMessage());
//			}
//			return false;
//		}
		
		orderTie();
		
		return true;
	}

	private void orderTie() {
		int i = 1;
		for (Tie d : ties) {
			d.setNumOrdre(i++);
		}
	}

	@Override
	public boolean validateBeforeDelete() {
		return !officialReglement;
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

	/*
	 * (non-Javadoc)
	 * 
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
}
