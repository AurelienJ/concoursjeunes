/*
 * Créer le 11 mai 2009 à 15:36:53 pour ConcoursJeunes
 *
 * Copyright 2002-2009 - Aurélien JEOFFRAY
 *
 * http://www.concoursjeunes.org
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
package org.concoursjeunes.ui.dialog;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.TitledBorder;

import org.ajdeveloppement.apps.AppUtilities;
import org.ajdeveloppement.apps.Localisable;
import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.commons.ui.GridbagComposer;
import org.ajdeveloppement.commons.ui.NumberDocument;
import org.concoursjeunes.Blason;
import org.concoursjeunes.DistancesEtBlason;
import org.concoursjeunes.Profile;
import org.concoursjeunes.localisable.CriteriaSetLibelle;
import org.jdesktop.swingx.JXErrorPane;
import org.jdesktop.swingx.JXHeader;
import org.jdesktop.swingx.error.ErrorInfo;
import org.jdesktop.swingx.painter.GlossPainter;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@Localisable(textMethod="setTitle",value="distancesblasons.title")
public class DistancesBlasonsDialog extends JDialog implements ActionListener {
	
	//private Profile profile;
	private AjResourcesReader localisation;
	
	private List<DistancesEtBlason> distancesblasons = new ArrayList<DistancesEtBlason>();
	private List<Blason> availableBlason = new ArrayList<Blason>();
	
	private JXHeader jlCriteriaSet = new JXHeader();
	@Localisable(textMethod="setTitle",value="distancesblasons.distances")
	private TitledBorder tbDistances = new TitledBorder(""); //$NON-NLS-1$
	private JPanel jpDistances = new JPanel();
	private List<JTextField> ljtfDistances = new ArrayList<JTextField>();
	@Localisable(textMethod="setTitle",value="distancesblasons.blasons")
	private TitledBorder tbBlasons = new TitledBorder(""); //$NON-NLS-1$
	@Localisable("distancesblasons.defaultblason")
	private JLabel jlBlason = new JLabel();
	private JComboBox jcbBlason = new JComboBox();
	@Localisable(textMethod="setTitle",value="distancesblasons.blasonsalt")
	private TitledBorder tbBlasonsAlt = new TitledBorder(""); //$NON-NLS-1$
	@Localisable("distancesblasons.addblasonsalt")
	private JLabel jlBlasonsAlt = new JLabel();
	private JPanel jpBlasonsAlt = new JPanel();
	private List<JComboBox> lcbBlasonsAlt = new ArrayList<JComboBox>();
	@Localisable("distancesblasons.add")
	private JButton jbAddBlasonAlt = new JButton();
	
	private GridbagComposer gbcBlasonsAlt = new GridbagComposer();
	private GridBagConstraints cBlasonsAlt = new GridBagConstraints();
	
	@Localisable("bouton.valider")
	private JButton jbValider = new JButton();
	@Localisable("bouton.annuler")
	private JButton jbAnnuler = new JButton();
	
	public DistancesBlasonsDialog(JFrame parentframe, Profile profile) {
		super(parentframe, true);
		
		//this.profile = profile;
		this.localisation = profile.getLocalisation();
		
		try {
			availableBlason = Blason.listAvailableTargetFace();
		} catch (SQLException e) {
			JXErrorPane.showDialog(this, new ErrorInfo(localisation.getResourceString("erreur"), e.toString(), //$NON-NLS-1$
					null, null, e, Level.SEVERE, null));
			e.printStackTrace();
		}
		
		init();
		affectLibelle();
	}
	
	private void init() {
		JPanel jpGeneral = new JPanel();
		JPanel jpActions = new JPanel();
		
		JPanel jpBlasons = new JPanel();
		JPanel jpBlasonsAltGen = new JPanel();
		
		GridbagComposer gbc = new GridbagComposer();
		GridBagConstraints c = new GridBagConstraints();
		
		GlossPainter gloss = new GlossPainter();
		jlCriteriaSet.setBackground(new Color(200,200,255));
		jlCriteriaSet.setBackgroundPainter(gloss);
		jlCriteriaSet.setTitleFont(jlCriteriaSet.getTitleFont().deriveFont(18.0f));
		
		jpDistances.setBorder(tbDistances);
		jpBlasons.setBorder(tbBlasons);
		jpBlasonsAltGen.setBorder(tbBlasonsAlt);
		
		for(Blason b : availableBlason)
			jcbBlason.addItem(b);
				
		jbAddBlasonAlt.addActionListener(this);
		jbValider.addActionListener(this);
		jbAnnuler.addActionListener(this);
		
		jpBlasonsAlt.add(jbAddBlasonAlt);
		
		gbc.setParentPanel(jpBlasonsAltGen);
		c.gridy = 0;
		c.ipady = 5;
		c.ipadx = 10;
		gbc.addComponentIntoGrid(jlBlasonsAlt, c);
		gbc.addComponentIntoGrid(jbAddBlasonAlt, c);
		c.weightx = 1.0;
		gbc.addComponentIntoGrid(Box.createHorizontalGlue(), c);
		c.gridy++;
		c.gridwidth = 3;
		gbc.addComponentIntoGrid(jpBlasonsAlt, c);
		
		gbc.setParentPanel(jpBlasons);
		c.gridy = 0;
		c.ipady = 5;
		c.ipadx = 10;
		c.weightx = 0.0;
		c.gridwidth = 1;
		c.anchor = GridBagConstraints.WEST;
		gbc.addComponentIntoGrid(jlBlason, c);
		gbc.addComponentIntoGrid(jcbBlason, c);
		c.weightx = 1.0;
		gbc.addComponentIntoGrid(Box.createHorizontalGlue(), c);
		c.gridy++;
		c.gridwidth = 3;
		c.fill = GridBagConstraints.HORIZONTAL;
		gbc.addComponentIntoGrid(jpBlasonsAltGen, c);
		
		gbc.setParentPanel(jpGeneral);
		
		c.gridy = 0;
		c.ipady = 5;
		c.anchor = GridBagConstraints.WEST;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.weightx = 1.0;
		gbc.addComponentIntoGrid(jpDistances, c);
		c.gridy++;
		gbc.addComponentIntoGrid(jpBlasons, c);
		c.gridy++;
		c.weighty = 1.0;
		c.fill = GridBagConstraints.VERTICAL;
		gbc.addComponentIntoGrid(Box.createVerticalGlue(), c);
		
		jpActions.setLayout(new FlowLayout(FlowLayout.RIGHT));
		jpActions.add(jbValider);
		jpActions.add(jbAnnuler);
		
		getContentPane().setLayout(new BorderLayout());
		getContentPane().add(jlCriteriaSet, BorderLayout.NORTH);
		getContentPane().add(jpGeneral, BorderLayout.CENTER);
		getContentPane().add(jpActions, BorderLayout.SOUTH);
	}
	
	private void affectLibelle() {
		AppUtilities.localize(this, localisation);
	}
	
	private void completePanel() {
		jlCriteriaSet.setTitle(new CriteriaSetLibelle(distancesblasons.get(0).getCriteriaSet(), localisation).toString());
		
		GridbagComposer gbc = new GridbagComposer();
		GridBagConstraints c = new GridBagConstraints();
		jpDistances.removeAll();
		ljtfDistances.clear();
		gbc.setParentPanel(jpDistances);
		c.gridy = -1;
		c.ipady = 5;
		c.ipadx = 10;
		//
		int i = 1;
		for(int d : distancesblasons.get(0).getDistance()) {
			c.gridy++;
			c.fill = GridBagConstraints.HORIZONTAL;
			gbc.addComponentIntoGrid(new JLabel(localisation.getResourceString("distancesblasons.distance") + " " + (i++) + ":"), c); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
			JTextField jtfDistance = new JTextField(new NumberDocument(false, false), Integer.toString(d), 4);
			ljtfDistances.add(jtfDistance);
			c.fill = GridBagConstraints.NONE;
			gbc.addComponentIntoGrid(jtfDistance, c);
		}
		c.fill = GridBagConstraints.HORIZONTAL;
		c.weightx = 1.0;
		gbc.addComponentIntoGrid(Box.createHorizontalGlue(), c);
		
		jcbBlason.setSelectedItem(distancesblasons.get(0).getTargetFace());
		
		jpBlasonsAlt.removeAll();
		lcbBlasonsAlt.clear();
		gbcBlasonsAlt.setParentPanel(jpBlasonsAlt);
		cBlasonsAlt.gridy=-1;
		cBlasonsAlt.ipadx = 10;
		boolean first = true;
		for(DistancesEtBlason db : distancesblasons) {
			if(first) {
				first = false;
				continue;
			}
			cBlasonsAlt.gridy++;
			JComboBox jcbBlasons = new JComboBox();

			for(Blason b : availableBlason) {
				jcbBlasons.addItem(b);
			}

			jcbBlasons.setSelectedItem(db.getTargetFace());
			lcbBlasonsAlt.add(jcbBlasons);
			gbcBlasonsAlt.addComponentIntoGrid(new JLabel(localisation.getResourceString("distancesblasons.alt") + " " + lcbBlasonsAlt.size() + ":"), cBlasonsAlt);  //$NON-NLS-1$//$NON-NLS-2$ //$NON-NLS-3$
			gbcBlasonsAlt.addComponentIntoGrid(jcbBlasons, cBlasonsAlt);
		}
	}
	
	public List<DistancesEtBlason> showDistancesBlasonsDialog(List<DistancesEtBlason> distancesblasons) {
		if(distancesblasons != null)
			this.distancesblasons = distancesblasons;
		completePanel();
		
		pack();
		setLocationRelativeTo(null);
		setVisible(true);
		
		return this.distancesblasons;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getSource() == jbValider) {
			
			int[] distances = new int[distancesblasons.get(0).getDistance().length];
			for(int i = 0; i < distances.length; i++) {
				try {
					distances[i] = Integer.parseInt(ljtfDistances.get(i).getText());
				} catch (NumberFormatException e1) {
					distances[i] = 0;
				}
			}
			distancesblasons.get(0).setDistance(distances);
			distancesblasons.get(0).setTargetFace((Blason)jcbBlason.getSelectedItem());
			
			for(int i = 0; i < lcbBlasonsAlt.size(); i++) {
				if(i+1 > distancesblasons.size()-1)
					distancesblasons.add(new DistancesEtBlason());
				distancesblasons.get(i+1).setDistance(distances);
				distancesblasons.get(i+1).setTargetFace((Blason)lcbBlasonsAlt.get(i).getSelectedItem());
				distancesblasons.get(i+1).setCriteriaSet(distancesblasons.get(0).getCriteriaSet());
				distancesblasons.get(i+1).setDefaultTargetFace(false);
			}
			
			setVisible(false);
		} else if(e.getSource() == jbAnnuler) {
			setVisible(false);
		} else if(e.getSource() == jbAddBlasonAlt) {
			jpBlasonsAlt.remove(jbAddBlasonAlt);
			cBlasonsAlt.gridy++;
			JComboBox jcbBlasons = new JComboBox();
			for(Blason b : availableBlason) {
				jcbBlasons.addItem(b);
			}
			lcbBlasonsAlt.add(jcbBlasons);
			gbcBlasonsAlt.addComponentIntoGrid(new JLabel(localisation.getResourceString("distancesblasons.alt") + " " + lcbBlasonsAlt.size() + ":"), cBlasonsAlt);  //$NON-NLS-1$//$NON-NLS-2$ //$NON-NLS-3$
			gbcBlasonsAlt.addComponentIntoGrid(jcbBlasons, cBlasonsAlt);
			
			pack();
		}
	}
}