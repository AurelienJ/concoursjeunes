/*
 * Créé le 9 avr. 2015 à 16:48:12 pour ArcCompetition
 *
 * Copyright 2002-2015 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.webapi.models;

import java.util.UUID;

import org.ajdeveloppement.concours.data.Rule.TypeReglement;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class RuleModelView {

	private UUID idRule;
	
	private UUID IdCompetition;
	
	private String name = "default"; //$NON-NLS-1$

	private String description = ""; //$NON-NLS-1$

	private int nbSerie = 2;

	private int nbVoleeParSerie = 6;

	private int nbFlecheParVolee = 3;

	private int nbPointsParFleche = 10;

	private int nbMembresEquipe = 4;

	private int nbMembresRetenu = 3;

	private boolean officialReglement = false;

	private UUID idEntite;

	private int idCategory;

	private String reglementType = TypeReglement.TARGET.toString();

	private boolean removable = true;
	
	private String libelleEntite;
	private String libelleCategorie;

	/**
	 * @return idRule
	 */
	public UUID getIdRule() {
		return idRule;
	}

	/**
	 * @param idRule idRule à définir
	 */
	public void setIdRule(UUID idReglement) {
		this.idRule = idReglement;
	}

	/**
	 * @return idCompetition
	 */
	public UUID getIdCompetition() {
		return IdCompetition;
	}

	/**
	 * @param idCompetition idCompetition à définir
	 */
	public void setIdCompetition(UUID idCompetition) {
		IdCompetition = idCompetition;
	}

	/**
	 * @return name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name name à définir
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description description à définir
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return nbSerie
	 */
	public int getNbSerie() {
		return nbSerie;
	}

	/**
	 * @param nbSerie nbSerie à définir
	 */
	public void setNbSerie(int nbSerie) {
		this.nbSerie = nbSerie;
	}

	/**
	 * @return nbVoleeParSerie
	 */
	public int getNbVoleeParSerie() {
		return nbVoleeParSerie;
	}

	/**
	 * @param nbVoleeParSerie nbVoleeParSerie à définir
	 */
	public void setNbVoleeParSerie(int nbVoleeParSerie) {
		this.nbVoleeParSerie = nbVoleeParSerie;
	}

	/**
	 * @return nbFlecheParVolee
	 */
	public int getNbFlecheParVolee() {
		return nbFlecheParVolee;
	}

	/**
	 * @param nbFlecheParVolee nbFlecheParVolee à définir
	 */
	public void setNbFlecheParVolee(int nbFlecheParVolee) {
		this.nbFlecheParVolee = nbFlecheParVolee;
	}

	/**
	 * @return nbPointsParFleche
	 */
	public int getNbPointsParFleche() {
		return nbPointsParFleche;
	}

	/**
	 * @param nbPointsParFleche nbPointsParFleche à définir
	 */
	public void setNbPointsParFleche(int nbPointsParFleche) {
		this.nbPointsParFleche = nbPointsParFleche;
	}

	/**
	 * @return nbMembresEquipe
	 */
	public int getNbMembresEquipe() {
		return nbMembresEquipe;
	}

	/**
	 * @param nbMembresEquipe nbMembresEquipe à définir
	 */
	public void setNbMembresEquipe(int nbMembresEquipe) {
		this.nbMembresEquipe = nbMembresEquipe;
	}

	/**
	 * @return nbMembresRetenu
	 */
	public int getNbMembresRetenu() {
		return nbMembresRetenu;
	}

	/**
	 * @param nbMembresRetenu nbMembresRetenu à définir
	 */
	public void setNbMembresRetenu(int nbMembresRetenu) {
		this.nbMembresRetenu = nbMembresRetenu;
	}

	/**
	 * @return officialReglement
	 */
	public boolean isOfficialReglement() {
		return officialReglement;
	}

	/**
	 * @param officialReglement officialReglement à définir
	 */
	public void setOfficialReglement(boolean officialReglement) {
		this.officialReglement = officialReglement;
	}

	/**
	 * @return idEntite
	 */
	public UUID getIdEntite() {
		return idEntite;
	}

	/**
	 * @param idEntite idEntite à définir
	 */
	public void setIdEntite(UUID idEntite) {
		this.idEntite = idEntite;
	}

	/**
	 * @return idCategory
	 */
	public int getIdCategory() {
		return idCategory;
	}

	/**
	 * @param idCategory idCategory à définir
	 */
	public void setIdCategory(int idCategory) {
		this.idCategory = idCategory;
	}

	/**
	 * @return reglementType
	 */
	public String getReglementType() {
		return reglementType;
	}

	/**
	 * @param reglementType reglementType à définir
	 */
	public void setReglementType(String reglementType) {
		this.reglementType = reglementType;
	}

	/**
	 * @return removable
	 */
	public boolean isRemovable() {
		return removable;
	}

	/**
	 * @param removable removable à définir
	 */
	public void setRemovable(boolean removable) {
		this.removable = removable;
	}

	/**
	 * @return libelleEntite
	 */
	public String getLibelleEntite() {
		return libelleEntite;
	}

	/**
	 * @param libelleEntite libelleEntite à définir
	 */
	public void setLibelleEntite(String libelleEntite) {
		this.libelleEntite = libelleEntite;
	}

	/**
	 * @return libelleCategorie
	 */
	public String getLibelleCategorie() {
		return libelleCategorie;
	}

	/**
	 * @param libelleCategorie libelleCategorie à définir
	 */
	public void setLibelleCategorie(String libelleCategorie) {
		this.libelleCategorie = libelleCategorie;
	}

}
