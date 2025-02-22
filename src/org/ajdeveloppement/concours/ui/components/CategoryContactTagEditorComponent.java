/*
 * Créé le 20 juin 2010 à 16:26:09 pour ConcoursJeunes
 *
 * Copyright 2002-2010 - Aurélien JEOFFRAY
 *
 * http://www.concoursjeunes.org
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
package org.ajdeveloppement.concours.ui.components;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JComboBox;

import org.ajdeveloppement.apps.localisation.Localizable;
import org.ajdeveloppement.commons.ui.DefaultTagsModel;
import org.ajdeveloppement.commons.ui.TagComponent;
import org.ajdeveloppement.concours.CategoryContact;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class CategoryContactTagEditorComponent extends TagComponent<CategoryContact> implements
		MouseListener, ActionListener {
	
	@Localizable("defaulttageditorcomponent.add")
	private JButton jbAddTag = new JButton("+"); //$NON-NLS-1$
	@Localizable("defaulttageditorcomponent.valid")
	private JButton jbValider = new JButton("v"); //$NON-NLS-1$
	@Localizable("defaulttageditorcomponent.cancel")
	private JButton jbAnnuler = new JButton("c"); //$NON-NLS-1$
	private JComboBox<String> jcbNewTag = new JComboBox<>();
	
	public CategoryContactTagEditorComponent() {
		init();
	}
	
	private void init() {
		setOpaque(false);
		
		jbAddTag.setBorderPainted(false);
		jbAddTag.setFocusPainted(false);
		jbAddTag.setMargin(new Insets(0, 0, 0, 0));
		jbAddTag.setContentAreaFilled(false);
		jbAddTag.addActionListener(this);
		
		jbValider.setBorderPainted(false);
		jbValider.setFocusPainted(false);
		jbValider.setMargin(new Insets(0, 0, 0, 0));
		jbValider.setContentAreaFilled(false);
		jbValider.addActionListener(this);
		
		jbAnnuler.setBorderPainted(false);
		jbAnnuler.setFocusPainted(false);
		jbAnnuler.setMargin(new Insets(0, 0, 0, 0));
		jbAnnuler.setContentAreaFilled(false);
		jbAnnuler.addActionListener(this);
		
		jcbNewTag.setOpaque(false);
		jcbNewTag.setVisible(false);
		jbValider.setVisible(false);
		jbAnnuler.setVisible(false);
		
		add(Box.createRigidArea(new Dimension(5, 10)));
		add(jcbNewTag);
		add(jbValider);
		add(jbAnnuler);
		add(jbAddTag);
	}
	
	@Override
	protected void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		Graphics2D graphics2d = (Graphics2D)g;
		
		graphics2d.setColor(new Color(254,224,100));
		graphics2d.fillRoundRect(0, 0, getWidth(), getHeight(), getHeight(), getHeight());
	}

	/* (non-Javadoc)
	 * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
	 */
	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getSource() == jbAddTag) {
			jcbNewTag.setVisible(true);
			jbValider.setVisible(true);
			jbAnnuler.setVisible(true);
			jbAddTag.setVisible(false);
			revalidate();
		} else if(e.getSource() == jbAnnuler || e.getSource() == jbValider) {
			if(e.getSource() == jbValider) {
				if(parentTagsPanel != null)
					((DefaultTagsModel<CategoryContact>)parentTagsPanel.getModel()).add((CategoryContact)jcbNewTag.getSelectedItem());
			}
			
			jcbNewTag.setVisible(false);
			jbValider.setVisible(false);
			jbAnnuler.setVisible(false);
			jbAddTag.setVisible(true);
			revalidate();
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}
}
