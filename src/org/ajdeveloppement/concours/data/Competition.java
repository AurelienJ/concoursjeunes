/*
 * Créé le 2 nov. 2012 à 14:53:08 pour ArcCompetition
 *
 * Copyright 2002-2012 - Aurélien JEOFFRAY
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

import java.util.Collection;
import java.util.Date;
import java.util.UUID;

import org.ajdeveloppement.commons.persistence.sql.LazyPersistentCollection;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlForeignKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@SqlTable(name="COMPETITION")
@SqlPrimaryKey(fields="ID_COMPETITION")
public class Competition implements SqlObjectPersistence {
	

	@SqlField(name="ID_COMPETITION")
	private UUID idCompetition = UUID.randomUUID();
	
	@SqlForeignKey(mappedTo="ID_ORGANISATEUR")
	private Entite organisateur;
	
	@SqlField(name="LIEU")
	private String lieuCompetition;
	
	@SqlForeignKey(mappedTo={"ID_NIVEAU_COMPETITION"})
	private CompetitionLevel competitionLevel;
	
	@SqlField(name="DATE_DEBUT")
	private Date dateDebutConcours;
	
	@SqlField(name="DATE_FIN")
	private Date dateFinConcours;
	

	@SqlField(name="DUEL")
	private boolean gestionDuel = true;
	
	@SqlForeignKey(mappedTo = "ID_REGLEMENT")
	private Rule reglement;
	
	@SqlChildCollection(foreignFields = "ID_COMPETITION")
	private LazyPersistentCollection<CompetitionJudge, Void> judges = new LazyPersistentCollection<>(
			() -> T_CompetitionJudge.all().where(T_CompetitionJudge.ID_COMPETITION.equalTo(idCompetition)));

	/**
	 * 
	 */
	public Competition() {
		
	}
	
	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getIdCompetition()
	 */
	public UUID getIdCompetition() {
		return idCompetition;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setIdCompetition(java.util.UUID)
	 */
	public void setIdCompetition(UUID idCompetition) {
		this.idCompetition = idCompetition;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getOrganisateur()
	 */
	public Entite getOrganisateur() {
		return organisateur;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setOrganisateur(org.ajdeveloppement.concours.data.Entite)
	 */
	public void setOrganisateur(Entite organisateur) {
		this.organisateur = organisateur;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getLieuCompetition()
	 */
	public String getLieuCompetition() {
		return lieuCompetition;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setLieuCompetition(java.lang.String)
	 */
	public void setLieuCompetition(String lieuCompetition) {
		this.lieuCompetition = lieuCompetition;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getCompetitionLevel()
	 */
	public CompetitionLevel getCompetitionLevel() {
		return competitionLevel;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setCompetitionLevel(org.ajdeveloppement.concours.data.CompetitionLevel)
	 */
	public void setCompetitionLevel(CompetitionLevel competitionLevel) {
		this.competitionLevel = competitionLevel;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getDateDebutConcours()
	 */
	public Date getDateDebutConcours() {
		return dateDebutConcours;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setDateDebutConcours(java.util.Date)
	 */
	public void setDateDebutConcours(Date dateDebutConcours) {
		this.dateDebutConcours = dateDebutConcours;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getDateFinConcours()
	 */
	public Date getDateFinConcours() {
		return dateFinConcours;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setDateFinConcours(java.util.Date)
	 */
	public void setDateFinConcours(Date dateFinConcours) {
		this.dateFinConcours = dateFinConcours;
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#isGestionDuel()
	 */
	public boolean isGestionDuel() {
		return gestionDuel;
	}

	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setGestionDuel(boolean)
	 */
	public void setGestionDuel(boolean gestionDuel) {
		this.gestionDuel = gestionDuel;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getReglement()
	 */
	public Rule getReglement() {
		return reglement;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#setReglement(org.ajdeveloppement.concours.data.Rule)
	 */
	public void setReglement(Rule reglement) {
		this.reglement = reglement;
	}


	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#getJudges()
	 */
	public Collection<CompetitionJudge> getJudges() {
		return judges;
	}
	
	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#addJudge(org.ajdeveloppement.concours.data.CompetitionJudge)
	 */
	public void addJudge(CompetitionJudge competitionJudge) {
		competitionJudge.setCompetition(this);
		judges.add(competitionJudge);
	}
	
	/* (non-Javadoc)
	 * @see org.ajdeveloppement.concours.data.CompetitionView#removeJudge(org.ajdeveloppement.concours.data.CompetitionJudge)
	 */
	public void removeJudge(CompetitionJudge competitionJudge) {
		judges.remove(competitionJudge);
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((idCompetition == null) ? 0 : idCompetition.hashCode());
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
		Competition other = (Competition) obj;
		if (idCompetition == null) {
			if (other.idCompetition != null)
				return false;
		} else if (!idCompetition.equals(other.idCompetition))
			return false;
		return true;
	}
}
