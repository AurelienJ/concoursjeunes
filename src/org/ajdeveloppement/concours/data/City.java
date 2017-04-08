/*
 * Créé le 24 déc. 2013 à 11:47:30 pour ArcCompetition
 *
 * Copyright 2002-2013 - Aurélien JEOFFRAY
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

import java.sql.Types;
import java.util.Collection;
import java.util.UUID;

import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlTransient;

import org.ajdeveloppement.commons.persistence.sql.LazyPersistentCollection;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.persistence.sql.SqlObjectPersistence;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlChildCollection;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlGeneratedIdField;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlPrimaryKey;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlTable;
import org.ajdeveloppement.commons.persistence.sql.annotations.SqlUnmappedFields;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@SqlTable(name="VILLE")
@SqlPrimaryKey(fields={"CODE_VILLE"},generatedidField=@SqlGeneratedIdField(name="CODE_VILLE",type=Types.JAVA_OBJECT))
@SqlUnmappedFields(fields={"UPPER_NAME"})
public class City implements SqlObjectPersistence {
	
	@XmlID
	@XmlAttribute(name="id", required=true)
	private String xmlId;

	@XmlTransient
	@SqlField(name="CODE_VILLE",nullable=false)
	private UUID cityCode;
	
	@SqlField(name="INSEE")
	private String inseeCode;
	
	@SqlField(name="NOM")
	private String name;
	
	@SqlField(name="ALTITUDE")
	private String altitude;
	
	@SqlField(name="LONGITUDE_RADIAN")
	private String longitude;
	
	@SqlField(name="LATITUDE_RADIAN")
	private String latitude;
	
	@SqlField(name="POP99")
	private String population;
	
	@SqlField(name="SURFACE")
	private String surface;
	
	@SqlField(name="PAYS")
	private String country;
	
	@SqlChildCollection(type=ZipCode.class,foreignFields="CODE_VILLE")
	private LazyPersistentCollection<ZipCode, Void> zipCodes = new LazyPersistentCollection<>(
			() -> QResults.from(ZipCode.class).where(T_ZipCode.CODE_VILLE.equalTo(cityCode)));

	/**
	 * @return cityCode
	 */
	public UUID getCityCode() {
		return cityCode;
	}

	/**
	 * @param cityCode cityCode à définir
	 */
	public void setCityCode(UUID cityCode) {
		this.cityCode = cityCode;
	}

	/**
	 * @return inseeCode
	 */
	public String getInseeCode() {
		return inseeCode;
	}

	/**
	 * @param inseeCode inseeCode à définir
	 */
	public void setInseeCode(String inseeCode) {
		this.inseeCode = inseeCode;
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
	 * @return altitude
	 */
	public String getAltitude() {
		return altitude;
	}

	/**
	 * @param altitude altitude à définir
	 */
	public void setAltitude(String altitude) {
		this.altitude = altitude;
	}

	/**
	 * @return longitude
	 */
	public String getLongitude() {
		return longitude;
	}

	/**
	 * @param longitude longitude à définir
	 */
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	/**
	 * @return latitude
	 */
	public String getLatitude() {
		return latitude;
	}

	/**
	 * @param latitude latitude à définir
	 */
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	/**
	 * @return population
	 */
	public String getPopulation() {
		return population;
	}

	/**
	 * @param population population à définir
	 */
	public void setPopulation(String population) {
		this.population = population;
	}

	/**
	 * @return surface
	 */
	public String getSurface() {
		return surface;
	}

	/**
	 * @param surface surface à définir
	 */
	public void setSurface(String surface) {
		this.surface = surface;
	}

	/**
	 * @return country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * @param country country à définir
	 */
	public void setCountry(String country) {
		this.country = country;
	}
	
	/**
	 * @return zipCodes
	 */
	public Collection<ZipCode> getZipCodes() {
		return zipCodes;
	}
	
	/**
	 * Use only by JAXB. Do not use.
	 * 
	 * @param marshaller
	 */
	protected void beforeMarshal(Marshaller marshaller) {
		if(cityCode == null)
			cityCode = UUID.randomUUID();
		
		xmlId = cityCode.toString();
	}
	
	/**
	 * Use only by JAXB. Do not use.
	 * 
	 * @param unmarshaller
	 * @param parent
	 */
	protected void afterUnmarshal(Unmarshaller unmarshaller, Object parent) {
		if(xmlId != null)
			cityCode = UUID.fromString(xmlId);
		
		xmlId = null;
	}
}
