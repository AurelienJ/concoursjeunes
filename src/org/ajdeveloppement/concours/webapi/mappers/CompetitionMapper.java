/*
 * Créé le 2 avr. 2017 à 17:03:34 pour ArcCompetition
 *
 * Copyright 2002-2017 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.webapi.mappers;

import java.util.UUID;

import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.Competition;
import org.ajdeveloppement.concours.data.CompetitionJudge;
import org.ajdeveloppement.concours.data.T_Archer;
import org.ajdeveloppement.concours.data.T_Competition;
import org.ajdeveloppement.concours.data.T_CompetitionJudge;
import org.ajdeveloppement.concours.webapi.views.CompetitionJudgeView;
import org.ajdeveloppement.concours.webapi.views.CompetitionView;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeforeMapping;
import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ObjectFactory;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@Mapper(uses = { RulesMapper.class, EntiteMapper.class, PersonMapper.class }, 
	componentModel="jsr330",collectionMappingStrategy=CollectionMappingStrategy.ADDER_PREFERRED)
public abstract class CompetitionMapper {
	
	@ObjectFactory
	public Competition getCompetition(CompetitionView view) {
		Competition competition = null;
		
		if(view.getId() != null)
			competition = T_Competition.getInstanceWithPrimaryKey(view.getId());
		
		if(competition == null)
			competition = new Competition();
		
		return competition;
	}
	
	@ObjectFactory
	public CompetitionJudge getCompetition(CompetitionJudgeView view, Competition competition) {
		CompetitionJudge competitionJudge = null;
		
		if(view.getIdJudge() != null && competition.getIdCompetition() != null)
			competitionJudge = T_CompetitionJudge.getInstanceWithPrimaryKey(view.getIdJudge(), competition.getIdCompetition());
		
		if(competitionJudge == null)
			competitionJudge = new CompetitionJudge();
		
		return competitionJudge;
	}
	
	@BeforeMapping
	public void clearCompetitionCollections(@MappingTarget Competition competition) {
		
	}
	
	@AfterMapping
	public void setJudges(CompetitionView view, @MappingTarget Competition competition) {
		competition.getJudges().clear();
		if ( view.getJudges() != null ) {
            for ( CompetitionJudgeView judge : view.getJudges() ) {
                competition.addJudge( toCompetitionJudge( judge, competition ) );
            }
        }
	}
	
	@Mapping(target = "idCompetition", ignore = true)
	@Mapping(target = "judges", ignore = true)
	public abstract Competition toCompetition(CompetitionView view);
	
	@Mapping(target = "judge", source = "competitionJudgeView.idJudge")
	@Mapping(target = "competition", source = "competition")
	public abstract CompetitionJudge toCompetitionJudge(CompetitionJudgeView competitionJudgeView, Competition competition);
	
	public Archer asArcher(UUID idArcher) {
		return T_Archer.getInstanceWithPrimaryKey(idArcher);
	}
	
	public Competition asCompetition(UUID idCompetition) {
		return T_Competition.getInstanceWithPrimaryKey(idCompetition);
	}
}
