/*
 * Copyright 2002-2007 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.ui.dialog;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

import javax.swing.DefaultListCellRenderer;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.border.TitledBorder;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import org.ajdeveloppement.apps.localisation.Localizable;
import org.ajdeveloppement.apps.localisation.LocalizationHandler;
import org.ajdeveloppement.apps.localisation.Localizator;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.ui.AJList;
import org.ajdeveloppement.commons.ui.GridbagComposer;
import org.ajdeveloppement.concours.CategoryContact;
import org.ajdeveloppement.concours.Contact;
import org.ajdeveloppement.concours.managers.CategoryContactManager;
import org.ajdeveloppement.concours.ui.components.CityAutoCompleteDocument;
import org.ajdeveloppement.concours.ui.components.ContactPanel;
import org.ajdeveloppement.concours.ui.components.ContactPanel.ContactPanelListener;
import org.ajdeveloppement.concours.ui.components.CountryComboBox;
import org.ajdeveloppement.concours.ui.components.CountryComboBox.Country;
import org.ajdeveloppement.swingxext.error.ui.DisplayableErrorHelper;
import org.ajdeveloppement.swingxext.localisation.JXHeaderLocalisationHandler;
import org.concoursjeunes.ApplicationCore;
import org.concoursjeunes.Entite;
import org.concoursjeunes.Federation;
import org.concoursjeunes.Profile;
import org.concoursjeunes.manager.FederationManager;
import org.jdesktop.beansbinding.AutoBinding.UpdateStrategy;
import org.jdesktop.beansbinding.BeanProperty;
import org.jdesktop.beansbinding.Binding;
import org.jdesktop.beansbinding.BindingGroup;
import org.jdesktop.beansbinding.Bindings;
import org.jdesktop.swingx.JXHeader;
import org.jdesktop.swingx.JXTitledSeparator;
import org.jdesktop.swingx.painter.GlossPainter;

/**
 * @author Aurélien JEOFFRAY
 */
@Localizable(value="entite.title",textMethod="setTitle")
public class EntiteDialog extends JDialog implements ActionListener, ListSelectionListener, ContactPanelListener, ItemListener {
	private Profile profile;
	private Entite entite;
	
	private List<Contact> contacts;
	
	private boolean fullEditable = false;
	
	private BindingGroup entiteBinding = null;
	
	@Localizable("entite.header")
	private JXHeader jxhEntite = new JXHeader();

	@Localizable(value="entite.identite",textMethod="setTitle")
	private TitledBorder tbIdentite = new TitledBorder(""); //$NON-NLS-1$
	@Localizable(value="entite.adresse",textMethod="setTitle")
	private TitledBorder tbAdresse = new TitledBorder(""); //$NON-NLS-1$
	@Localizable(value="entite.divers",textMethod="setTitle")
	private TitledBorder tbDivers = new TitledBorder(""); //$NON-NLS-1$
	@Localizable(value="entite.contacts",textMethod="setTitle")
	private TitledBorder tbContacts = new TitledBorder(""); //$NON-NLS-1$
	
	@Localizable("entite.federation")
	private JLabel jlFederation = new JLabel();
	private JComboBox<Federation> jcbFederation = new JComboBox<>();
	@Localizable("entite.nom")
	private JLabel jlNom = new JLabel();
	private JTextField jtfNom = new JTextField("", 30); //$NON-NLS-1$
	@Localizable("entite.agrement")
	private JLabel jlAgrement = new JLabel();
	private JTextField jftfAgrement = new JTextField("", 6); //$NON-NLS-1$
	
	@Localizable("entite.adresse")
	private JLabel jlAdresse = new JLabel();
	private JTextArea jtaAdresse = new JTextArea(4, 30);
	private JScrollPane jspAdresse = new JScrollPane(jtaAdresse);
	
	@Localizable("entite.codepostal")
	private JLabel jlCodePostal = new JLabel();
	private JTextField jftfCodePostal;
	@Localizable("entite.ville")
	private JLabel jlVille = new JLabel();
	private JTextField jtfVille = new JTextField("", 10); //$NON-NLS-1$
	@Localizable("entite.pays")
	private JLabel jlCountry = new JLabel();
	private CountryComboBox jcbCountry = new CountryComboBox();
	@Localizable("entite.type")
	private JLabel jlType = new JLabel();
	private JComboBox<String> jcbType;
	@Localizable("entite.note")
	private JLabel jlNote = new JLabel();
	private JTextArea jtaNote = new JTextArea(5, 30);

	@Localizable("entite.searchcategory")
	private JLabel jlSearchCategoryContact = new JLabel();
	private JComboBox<Object> jcbSearchCategoryContact = new JComboBox<>();
	@Localizable("entite.search")
	private JLabel jlSearch = new JLabel();
	private JTextField jtfSearch = new JTextField();
	private JButton jbSearch = new JButton();
	private AJList<Contact> jlResultList = new AJList<Contact>();
	@Localizable(value="",tooltip="entite.addcontact")
	private JButton jbAddContact = new JButton();
	@Localizable(value="",tooltip="entite.removecontact")
	private JButton jbRemoveContact = new JButton();
	@Localizable(value="entite.detailscontact",textMethod="setTitle")
	private JXTitledSeparator jxtsDetailsContacts = new JXTitledSeparator();
	ContactPanel contactPanel = null;

	@Localizable("bouton.valider")
	private JButton jbValider = new JButton();
	@Localizable("bouton.annuler")
	private JButton jbAnnuler = new JButton();

	public EntiteDialog(JFrame parent, Profile profile) {
		super(parent, "", true); //$NON-NLS-1$

		this.profile = profile;

		init();
		affectLabels();
		completePanel();
	}

	public EntiteDialog(JDialog parent, Profile profile) {
		super(parent, "", true); //$NON-NLS-1$
		
		this.profile = profile;

		init();
		affectLabels();
	}

	private void init() {
		GridBagConstraints c = new GridBagConstraints();

		GridbagComposer gridbagComposer = new GridbagComposer();

		// [start] Initialisation des pannels
		JPanel entitePane = new JPanel();
		JPanel buttonPane = new JPanel();
		
		JPanel jpIdentite = new JPanel();
		JPanel jpAdresse = new JPanel();
		JPanel jpDivers = new JPanel();
		JPanel jpContact = new JPanel();
		
		contactPanel = new ContactPanel(profile);
		//contactPanel.setSize(450, 400);
		contactPanel.addContactPanelListener(this);
		// [end]
		
		// [start] paramétrage des composants
		GlossPainter gloss = new GlossPainter();
		jxhEntite.setBackground(new Color(200,200,255));
		jxhEntite.setBackgroundPainter(gloss);
		
		jpIdentite.setBorder(tbIdentite);
		jpAdresse.setBorder(tbAdresse);
		jpDivers.setBorder(tbDivers);
		jpContact.setBorder(tbContacts);
		
		for(Federation federation : FederationManager.getAvailableFederations())
			jcbFederation.addItem(federation);
		jtfNom.setEditable(false);
		jftfAgrement.setEditable(false);
		//jftfAgrement.setMinimumSize(new Dimension(75,20));
		jspAdresse.setMinimumSize(new Dimension(300, 70));
		CityAutoCompleteDocument cityAutoCompleteDocument;
		try {
			cityAutoCompleteDocument = new CityAutoCompleteDocument(jtfVille);
			jtfVille.setDocument(cityAutoCompleteDocument);
		} catch (SQLException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		}
		jtfVille.setEditable(false);
		jcbCountry.addItemListener(this);
		jcbType = new JComboBox<>(new String[] { "Fédération", "Ligue", "Comité Départemental", "Compagnie" }); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$
		
		jbValider.addActionListener(this);
		jbAnnuler.addActionListener(this);

		jftfCodePostal = new JTextField(4);
		
		jcbSearchCategoryContact.setRenderer(new DefaultListCellRenderer() {
			
			@Override
			public Component getListCellRendererComponent(JList<?> list, Object value,
					int index, boolean isSelected, boolean cellHasFocus) {
				if(value instanceof CategoryContact)
					value = ((CategoryContact)value).getLibelle(profile.getConfiguration().getLangue());
				return super.getListCellRendererComponent(list, value, index, isSelected,
						cellHasFocus);
			}
		});
		jcbSearchCategoryContact.addActionListener(this);
		jtfSearch.addActionListener(this);
		//jtfSearch.addKeyListener(this);
		jbSearch.addActionListener(this);
		jbSearch.setMargin(new Insets(0, 0, 0, 0));
		jbSearch.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.select", 16, 16)); //$NON-NLS-1$
		jbSearch.addActionListener(this);
		
		jlResultList.setVisibleRowCount(5);
		jlResultList.addListSelectionListener(this);
		JScrollPane jspResultList = new JScrollPane(jlResultList);
		jspResultList.setMinimumSize(new Dimension(300, 70));
		
		jbAddContact.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.add", 16, 16)); //$NON-NLS-1$
		jbAddContact.setPressedIcon(ApplicationCore.userRessources.getImageIcon("file.icon.add_active", 16, 16)); //$NON-NLS-1$
		jbAddContact.setDisabledIcon(ApplicationCore.userRessources.getImageIcon("file.icon.add_disable", 16, 16)); //$NON-NLS-1$
		jbAddContact.setBorderPainted(false);
		jbAddContact.setFocusPainted(false);
		jbAddContact.setMargin(new Insets(0, 0, 0, 0));
		jbAddContact.setContentAreaFilled(false);
		jbAddContact.addActionListener(this);
		jbRemoveContact.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.del", 16, 16)); //$NON-NLS-1$
		jbRemoveContact.setPressedIcon(ApplicationCore.userRessources.getImageIcon("file.icon.del_active", 16, 16)); //$NON-NLS-1$
		jbRemoveContact.setDisabledIcon(ApplicationCore.userRessources.getImageIcon("file.icon.del_disable", 16, 16)); //$NON-NLS-1$
		jbRemoveContact.setBorderPainted(false);
		jbRemoveContact.setFocusPainted(false);
		jbRemoveContact.setMargin(new Insets(0, 0, 0, 0));
		jbRemoveContact.setContentAreaFilled(false);
		jbRemoveContact.addActionListener(this);
		
		
		// [end]
		
		// [start] mise en page
		
		c.insets = new Insets(1, 1, 1, 1);
		
		// [start] Identite
		gridbagComposer.setParentPanel(jpIdentite);
		c.gridy = 0;
		c.anchor = GridBagConstraints.NORTHWEST;
		gridbagComposer.addComponentIntoGrid(jlFederation, c);
		c.fill = GridBagConstraints.HORIZONTAL;
		c.weightx = 1.0;
		c.gridwidth = 3;
		gridbagComposer.addComponentIntoGrid(jcbFederation, c);
		c.gridy++;
		c.gridwidth = 1;
		c.fill = GridBagConstraints.NONE;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jlNom, c);
		c.weightx = 1.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridwidth = 3;
		gridbagComposer.addComponentIntoGrid(jtfNom, c);
		c.gridy++;
		c.gridwidth = 1;
		c.weightx = 1.0;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlAgrement, c);
		gridbagComposer.addComponentIntoGrid(jftfAgrement, c);
		gridbagComposer.addComponentIntoGrid(jlType, c);
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jcbType, c);
		// [end]

		// [start] Adresse
		gridbagComposer.setParentPanel(jpAdresse);
		c.gridy = 0;
		c.gridwidth = 1;
		c.fill = GridBagConstraints.NONE;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jlAdresse, c);
		c.gridwidth = 3;
		c.weightx = 1.0;
		c.weighty = 1.0;
		c.fill = GridBagConstraints.BOTH;
		gridbagComposer.addComponentIntoGrid(jspAdresse, c);
		c.gridy++;
		c.gridwidth = 1;
		c.fill = GridBagConstraints.NONE;
		c.weighty = 0.0;
		c.weightx = 1.0;
		gridbagComposer.addComponentIntoGrid(jlCodePostal, c);
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jftfCodePostal, c);
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlVille, c);
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jtfVille, c);
		c.gridy++;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlCountry, c);
		c.gridwidth = 3;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jcbCountry, c);
		// [end]
		
		// [start] Divers
		gridbagComposer.setParentPanel(jpDivers);
		c.gridy = 0;
		c.gridwidth = 1;
		c.fill = GridBagConstraints.NONE;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jlNote, c);
		c.gridwidth = 3;
		c.fill = GridBagConstraints.BOTH;
		c.weightx = 1.0;
		c.weighty = 1.0;
		gridbagComposer.addComponentIntoGrid(new JScrollPane(jtaNote), c);
		// [end]
		
		// [start] Contacts
		c = new GridBagConstraints();
		c.insets = new Insets(1, 1, 1, 1);
		gridbagComposer.setParentPanel(jpContact);
		c.gridy = 0;
		c.gridwidth = 1;
		c.fill = GridBagConstraints.NONE;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jlSearchCategoryContact, c);
		c.weightx = 1.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridwidth = 3;
		gridbagComposer.addComponentIntoGrid(jcbSearchCategoryContact, c);
		c.gridy++;
		c.fill = GridBagConstraints.NONE;
		c.weightx = 0.0;
		c.gridwidth = 1;
		gridbagComposer.addComponentIntoGrid(jlSearch, c);
		c.weightx = 1.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridwidth = 2;
		gridbagComposer.addComponentIntoGrid(jtfSearch, c);
		c.gridwidth = 1;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jbSearch, c);
		c.gridy++;
		c.gridwidth = 3;
		c.gridheight = 2;
		c.weightx = 1.0;
		c.fill = GridBagConstraints.BOTH;
		gridbagComposer.addComponentIntoGrid(jspResultList, c);
		c.gridwidth = 1;
		c.gridheight = 1;
		c.fill = GridBagConstraints.NONE;
		c.anchor = GridBagConstraints.NORTHEAST;
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jbAddContact, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jbRemoveContact, c);
		c.gridy++;
		c.gridwidth = 4;
		c.weighty = 0.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jxtsDetailsContacts, c);
		c.gridy++;
		c.gridwidth = 4;
		c.fill = GridBagConstraints.BOTH;
		gridbagComposer.addComponentIntoGrid(contactPanel, c);
		// [end]
		
		// [start] General
		c = new GridBagConstraints();
		c.gridx = GridBagConstraints.RELATIVE;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.weighty = 0.0;
		gridbagComposer.setParentPanel(entitePane);
		c.gridy = 0;
		c.anchor = GridBagConstraints.WEST;
		c.gridwidth = 1;
		c.weightx = 1.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jpIdentite, c);
		c.gridheight = 3;
		c.fill = GridBagConstraints.BOTH;
		gridbagComposer.addComponentIntoGrid(jpContact, c);
		c.gridy++;
		c.gridx = 0;
		c.gridheight = 1;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jpAdresse, c);
		c.gridy++;
		c.fill = GridBagConstraints.BOTH;
		c.weighty = 1.0;
		gridbagComposer.addComponentIntoGrid(jpDivers, c);
		// [end]

		buttonPane.setLayout(new FlowLayout(FlowLayout.RIGHT));

		buttonPane.add(jbValider);
		buttonPane.add(jbAnnuler);

		getContentPane().setLayout(new BorderLayout());
		getContentPane().add(jxhEntite, BorderLayout.NORTH);
		getContentPane().add(entitePane, BorderLayout.CENTER);
		getContentPane().add(buttonPane, BorderLayout.SOUTH);
		// [end]
		
		//this.setGlassPane(contactPanel.getAddCategoryPanel());
	}
	
	private void affectLabels() {
		Localizator.localize(this, profile.getLocalisation(), Collections.<Class<?>, LocalizationHandler>singletonMap(JXHeader.class, new JXHeaderLocalisationHandler()));
	}
	
	private void completePanel() {
		if(entite != null) {
			
			if(entite.getPays() == null) {
	    		jcbCountry.setSelectedCountry(entite.getFederation().getCodeCountry());
	    		((CityAutoCompleteDocument)jtfVille.getDocument()).setCodeCountry(entite.getFederation().getCodeCountry());
	    	} else {
	    		jcbCountry.setSelectedCountry(entite.getPays());
	    		((CityAutoCompleteDocument)jtfVille.getDocument()).setCodeCountry(entite.getPays());
	    	}
			
			// [start] binding
			//On annule le précédent binding
	    	if(entiteBinding != null)
	    		entiteBinding.unbind();
	    	
	    	entiteBinding = new BindingGroup();
	    	
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("nom"), jtfNom, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("adresse"), jtaAdresse, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("ville"), jtfVille, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("note"), jtaNote, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("agrement"), jftfAgrement, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	entiteBinding.addBinding(Bindings.createAutoBinding(UpdateStrategy.READ, entite, BeanProperty.create("codePostal"), jftfCodePostal, BeanProperty.create("text"))); //$NON-NLS-1$ //$NON-NLS-2$
	    	
	    	entiteBinding.bind();
	    	// [end]
	    	
	    	jcbFederation.setSelectedItem(entite.getFederation());
			
			jtfNom.setEditable(fullEditable || entite.getAgrement() == null || entite.getAgrement().isEmpty());
			jtfVille.setEditable(fullEditable);
			jcbType.setSelectedIndex(entite.getType());
			jftfAgrement.setEditable(fullEditable);
			
			jcbSearchCategoryContact.removeAllItems();
			jcbSearchCategoryContact.addItem("<html>&nbsp;</html>"); //$NON-NLS-1$
			try {
				for(CategoryContact categoryContact : CategoryContactManager.getAllCategoryContact()) {
					jcbSearchCategoryContact.addItem(categoryContact);
				}
			} catch (ObjectPersistenceException e) {
				DisplayableErrorHelper.displayException(e);
				e.printStackTrace();
			}
			
			refreshListContact(null);
			
			contactPanel.setParentEntite(entite);
		}
	}
	
	private void refreshListContact(Contact selectedContact) {
		jlResultList.clear();
		for(Contact contact : contacts) {
			if((jcbSearchCategoryContact.getSelectedIndex() == 0 || contact.getCategories().contains(jcbSearchCategoryContact.getSelectedItem()))
					&& (jtfSearch.getText().isEmpty() || contact.getFullNameWithCivility().toUpperCase().contains(jtfSearch.getText().toUpperCase())))
				jlResultList.add(contact);
		}
		
		if(selectedContact != null)
			jlResultList.setSelectedValue(selectedContact, true);
	}
	
	/**
	 * Affiche la boite d'édition d'une entité
	 * 
	 * @param fullEditable si <code>true</code> l'entite est entièrement éditable, sinon seul les informations complémentaires sont éditable
	 */
	public void showEntiteDialog(boolean fullEditable) {
		this.fullEditable = fullEditable;
		completePanel();
		
		//setSize(910, 715);
		pack();
		setResizable(false);
		setLocationRelativeTo(null);
		
		setVisible(true);
	}

	/**
	 * @return entite
	 */
	public Entite getEntite() {
		return entite;
	}

	/**
	 * @param entite entite à définir
	 */
	public void setEntite(Entite entite) {
		this.entite = entite;
		this.contacts = entite.getContacts();
	}

	@Override
	public void actionPerformed(ActionEvent ae) {
		if (ae.getSource() == jbAnnuler) {
			setVisible(false);
		} else if(ae.getSource() == jbValider) {
			if(entiteBinding != null) {
            	for(Binding<Entite, ?, ?, ?> binding : entiteBinding.getBindings()) { 
            		binding.save();
            	}
        	}
			entite.setFederation((Federation)jcbFederation.getSelectedItem());
			entite.setType(jcbType.getSelectedIndex());
			entite.setPays(((Country)jcbCountry.getSelectedItem()).getCode().toLowerCase());

			try {
				entite.save();
			} catch (ObjectPersistenceException e) {
				DisplayableErrorHelper.displayException(e);
				e.printStackTrace();
			}

			setVisible(false);
		} else if(ae.getSource() == jcbSearchCategoryContact || ae.getSource() == jtfSearch || ae.getSource() == jbSearch) {
			refreshListContact(null);
		} else if(ae.getSource() == jbAddContact) {
			Contact contact = new Contact();
			contact.setCountryCode(entite.getPays());
			contact.setEntite(entite);
			contactPanel.setContact(contact, true);
		} else if(ae.getSource() == jbRemoveContact) {
			if(jlResultList.getSelectedValue() != null) {
				if (JOptionPane.showConfirmDialog(this, profile.getLocalisation().getResourceString("entite.confirmation.suppression.contact"), //$NON-NLS-1$
						profile.getLocalisation().getResourceString("entite.confirmation.suppression.contact.titre"), JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE) == JOptionPane.YES_OPTION) { //$NON-NLS-1$
					Contact selectedContact = jlResultList.getSelectedValue();
					try {
						selectedContact.delete();
					} catch (ObjectPersistenceException e) {
						DisplayableErrorHelper.displayException(e);
						e.printStackTrace();
					}
					jlResultList.remove(selectedContact);
				}
			}
		}
	}

	@Override
	public void valueChanged(ListSelectionEvent e) {
		if(contactPanel != null) {
			contactPanel.setContact(jlResultList.getSelectedValue());
			//this.getGlassPane().setVisible(true);
		}
	}

	@Override
	public void contactEdited(Contact contact) {
		refreshListContact(contact);
	}

	@Override
	public void contactAdded(Contact contact) {
		contact.setEntite(entite);
		contacts.add(contact);
		try {
			contact.save();
			
			refreshListContact(contact);
		} catch (ObjectPersistenceException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		}
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		if(e.getSource() == jcbCountry) {
			((CityAutoCompleteDocument)jtfVille.getDocument()).setCodeCountry(((Country)jcbCountry.getSelectedItem()).getCode().toLowerCase());
		}
	}
}
