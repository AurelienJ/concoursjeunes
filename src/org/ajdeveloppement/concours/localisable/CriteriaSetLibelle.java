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
package org.ajdeveloppement.concours.localisable;

import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.concours.data.CriteriaSet;

/**
 * Permet la génération du libellé représentant un jeux de critères
 * 
 * @author Aurélien JEOFFRAY
 * @version 1.0
 */
public class CriteriaSetLibelle {
    
    private final CriteriaSet criteriaSet;
    private String libelle = ""; //$NON-NLS-1$
    
    /**
     * Construit le libellé associé au jeux de critères  fournit en parametre
     * 
     * @param criteriaSet le jeux de criteres pour lequelle construire le libellé
     * @param localisation la ressource de localisation du libellé
     */
    public CriteriaSetLibelle(CriteriaSet criteriaSet, AjResourcesReader localisation) {
        this.criteriaSet = criteriaSet;
        
        String strSCNA = ""; //$NON-NLS-1$
        
        if(criteriaSet != null) {
//	        for (Criterion critere : criteriaSet.getReglement().getListCriteria()) {
//	        	if(criteriaSet.getCriterionElement(critere) != null) {
//	        		strSCNA += criteriaSet.getCriterionElement(critere).getLibelle() + " "; //$NON-NLS-1$
//	        	}
//	        }
	        
	        strSCNA = strSCNA.trim();
	        
	        //si la chaine est vide (filtre *false) afficher tous le monde
	        if(strSCNA.equals("")) //$NON-NLS-1$
	        	strSCNA = localisation.getResourceString("equipe.categorie.tous"); //$NON-NLS-1$ 
        }
        
        this.libelle = strSCNA.trim();
    }
    
    /**
     * Retourne le libellé associé au jeux de critères  fournit en parametre
     * @param criteriaSet le jeux de critère associé
     * @param localisation la resource de localisation du libellé
     * @return le libellé associé au jeux de critères  fournit en parametre
     */
    public static String getLibelle(CriteriaSet criteriaSet, AjResourcesReader localisation) {
    	return new CriteriaSetLibelle(criteriaSet, localisation).toString();
    }
     
    
    /**
     * Retourne le jeux de critere lié au libellé
     * 
	 * @return le jeux de critere associé au libelle
	 */
    public CriteriaSet getCriteriaSet() {
        return criteriaSet;
    }
    
    /**
     * Retourne le libellé construit à partir du jeux de critères
     */
    @Override
    public String toString() {
        return libelle;
    }
}