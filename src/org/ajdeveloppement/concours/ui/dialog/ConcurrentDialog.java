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
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.Box;
import javax.swing.DefaultListCellRenderer;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.border.TitledBorder;
import javax.swing.text.PlainDocument;

import org.ajdeveloppement.apps.localisation.Localizable;
import org.ajdeveloppement.apps.localisation.Localizator;
import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.ui.GridbagComposer;
import org.ajdeveloppement.commons.ui.NumberDocument;
import org.ajdeveloppement.concours.PhasesFinales;
import org.ajdeveloppement.concours.ui.ConcoursJeunesFrame;
import org.concoursjeunes.ApplicationCore;
import org.concoursjeunes.Archer;
import org.concoursjeunes.AutoCompleteDocument;
import org.concoursjeunes.AutoCompleteDocumentContext;
import org.concoursjeunes.Blason;
import org.concoursjeunes.Concurrent;
import org.concoursjeunes.CriteriaSet;
import org.concoursjeunes.Criterion;
import org.concoursjeunes.CriterionElement;
import org.concoursjeunes.DistancesEtBlason;
import org.concoursjeunes.Entite;
import org.concoursjeunes.FicheConcours;
import org.concoursjeunes.Profile;
import org.concoursjeunes.Reglement;
import org.concoursjeunes.TargetPosition;
import org.concoursjeunes.TargetsOccupation;
import org.concoursjeunes.event.AutoCompleteDocumentEvent;
import org.concoursjeunes.event.AutoCompleteDocumentListener;
import org.concoursjeunes.localisable.CriteriaSetLibelle;
import org.jdesktop.swingx.JXHyperlink;
import org.jdesktop.swingx.JXTitledSeparator;

/**
 * Boite de dialogue de gestion d'un concurrent
 * 
 * @author Aurélien Jeoffray
 * @version 6.0
 */
@Localizable(textMethod="setTitle",value="concurrent.titre.edition")
public class ConcurrentDialog extends JDialog implements ActionListener, FocusListener, AutoCompleteDocumentListener, ItemListener {

	/**
	 * Valeur pour validation de la fiche et fermeture de la fenêtre
	 */
	public static final int CONFIRM_AND_CLOSE = 1;
	
	/**
	 * Valeur pour validation de la fiche et affichage de la fiche
	 * du concurrent suivant en fonction de l'ordre de tri courant
	 */
	public static final int CONFIRM_AND_NEXT = 2;
	
	/**
	 * Valeur pour validation de la fiche et affichage de la fiche
	 * du concurrent précédent en fonction de l'ordre de tri courant
	 */
	public static final int CONFIRM_AND_PREVIOUS = 3;
	
	/**
	 * Valeur pour fermeture de la fenêtre du concurrent sans validation
	 */
	public static final int CANCEL = 4;

	private AjResourcesReader localisation;
	private Profile profile;
	private FicheConcours ficheConcours;
	private PhasesFinales phaseFinal;
	private Concurrent concurrent;
	private Entite entiteConcurrent;
	private Archer filter = null;
	
	private boolean disableSyncCriteriaSet = false;
	
	private static Reglement lastActiveReglement;
	private static ConcurrentListDialog concurrentListDialog;

	@Localizable("concurrent.description")
	private JLabel jlDescription = new JLabel(); // Description

	// Tireur
	@Localizable(value="concurrent.panel.tireur",textMethod="setTitle")
	private TitledBorder tbConcurrent = new TitledBorder(""); //$NON-NLS-1$
	private JPanel jpConcurrent = new JPanel();
	@Localizable("concurrent.identite")
	private JLabel jlNom = new JLabel(); // Nom et prénom du Tireur
	private JTextField jtfNom = new JTextField(8); // Nom du tireur
	private JTextField jtfPrenom = new JTextField(8); // Prénom du tireur
	@Localizable(value="",tooltip="bouton.selectionarcher")
	private JButton jbSelectionArcher = new JButton();
	@Localizable(value="",tooltip="bouton.editer")
	private JButton jbEditerArcher = new JButton();
	@Localizable("concurrent.numlicence")
	private JLabel jlLicence = new JLabel(); // N° de Licence
	private JTextField jtfLicence = new JTextField(16);// Numéro de licence
	@Localizable("concurrent.seecontactdialog")
	private JXHyperlink jxhSeeContactDialog = new JXHyperlink();
	@Localizable("concurrent.handicap")
	private JCheckBox jcbHandicape = new JCheckBox();
	@Localizable("concurrent.surclassement")
	private JCheckBox jcbSurclassement = new JCheckBox();
	private Map<Criterion, JLabel> jlCategrieTable = new HashMap<Criterion, JLabel>();
	private Map<Criterion, JComboBox<CriterionElement>> jcbCategorieTable = new HashMap<>();
	@Localizable("concurrent.blason")
	private JLabel jlBlason = new JLabel();
	private JComboBox<Blason> jcbBlason = new JComboBox<>();

	// Club du tireur
	@Localizable(value="concurrent.panel.club",textMethod="setTitle")
	private TitledBorder tbClub = new TitledBorder(""); //$NON-NLS-1$
	private JPanel jpClub = new JPanel();
	@Localizable("concurrent.nomclub")
	private JLabel jlClub = new JLabel(); // nom du club
	private JTextField jtfClub = new JTextField(16);// Intitulé du club
	@Localizable("concurrent.agrementclub")
	private JLabel jlAgrement = new JLabel(); // n°agrément du club
	private JTextField jtfAgrement = new JTextField(16);// Numéro d'Agrément
	@Localizable("concurrent.detailclub")
	private JXHyperlink jxhDetailClub = new JXHyperlink();
	private JButton jbListeClub = new JButton();
	
	@Localizable(value="concurrent.panel.cible",textMethod="setTitle")
	private TitledBorder tbCible = new TitledBorder(""); //$NON-NLS-1$
	private JPanel jpCible = new JPanel();

	// Point du tireur
	@Localizable("concurrent.cible")
	private JLabel jlCible = new JLabel(); // cible attribué
	private JLabel jlValCible = new JLabel();
	@Localizable("concurrent.depart")
	private JLabel jlDepart = new JLabel();
	private JLabel jlValDepart = new JLabel();
	@Localizable(value="concurrent.points.phasequalificative",textMethod="setTitle")
	private JXTitledSeparator jxtsPhaseQualificative = new JXTitledSeparator();
	@Localizable("concurrent.points")
	private JLabel jlPoints = new JLabel();
	private JTextField[] tfpd;
	@Localizable("concurrent.departages")
	private JLabel jlDepartages = new JLabel();
	private JLabel jlValDepartages = new JLabel(); // Départage (ex: 10/9/M)
	private JTextField[] tfDepartages;
	@Localizable(value="concurrent.points.phasesfinale",textMethod="setTitle")
	private JXTitledSeparator jxtsPhasesFinale = new JXTitledSeparator();
	@Localizable("concurrent.thirtysecondfinal")
	private JLabel jlThirtySecondFinal = new JLabel();
	private JTextField jtfThirtySecondFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
	@Localizable("concurrent.sixteenthfinal")
	private JLabel jlSixteenthFinal = new JLabel();
	private JTextField jtfSixteenthFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
	@Localizable("concurrent.eighthfinal")
	private JLabel jlEighthFinal = new JLabel();
	private JTextField jtfEighthFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
	@Localizable("concurrent.quarterfinal")
	private JLabel jlQuarterFinal = new JLabel();
	private JTextField jtfQuarterFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
	@Localizable("concurrent.semifinal")
	private JLabel jlSemiFinal = new JLabel();
	private JTextField jtfSemiFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
	@Localizable("concurrent.final")
	private JLabel jlFinal = new JLabel();
	private JTextField jtfFinal = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$

	// inscription
	@Localizable(value="concurrent.inscription.titre",textMethod="setTitle")
	private TitledBorder tbInscription = new TitledBorder(""); //$NON-NLS-1$
	private final JPanel jpInscription = new JPanel();
	private final JComboBox<String> jcbInscription = new JComboBox<>();

	// place libre
	@Localizable(value="concurrent.placelibre.titre",textMethod="setTitle")
	private TitledBorder tbPlaceLibre = new TitledBorder(""); //$NON-NLS-1$
	private final JPanel jpPlaceLibre = new JPanel();
	private final JLabel jlPlaceLibre = new JLabel("<html></html>"); //$NON-NLS-1$

	private final JPanel jpActionPane = new JPanel();
	@Localizable("bouton.valider")
	private final JButton jbValider = new JButton();
	@Localizable("bouton.precedent")
	private final JButton jbPrecedent = new JButton();
	@Localizable("bouton.suivant")
	private final JButton jbSuivant = new JButton();
	@Localizable("bouton.annuler")
	private final JButton jbAnnuler = new JButton();

	private int selectField = 0;

	private int returnVal = CANCEL;
	
	private boolean unlock = false;

	/**
	 * Création de la boite de dialogue de gestion de concurrent
	 * 
	 * @param concoursJeunesFrame la fenêtre parentes dont dépend la boite de dialogue 
	 * @param ficheConcours la fiche concours à laquelle est/doit être rattaché le concurrent
	 */
	public ConcurrentDialog(ConcoursJeunesFrame concoursJeunesFrame, Profile profile, FicheConcours ficheConcours) {
		super(concoursJeunesFrame, "", true); //$NON-NLS-1$

		this.ficheConcours = ficheConcours;
		this.phaseFinal = new PhasesFinales(ficheConcours);
		this.localisation = profile.getLocalisation();
		this.profile = profile;
		
		init();
		affectLabels();
		
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowActivated(WindowEvent arg0) {
				if (selectField >= 0) {
					tfpd[selectField].requestFocus(true);
					tfpd[selectField].moveCaretPosition(0);
				} else if(tfDepartages != null && tfDepartages.length > 0){
					tfDepartages[0].requestFocus(true);
					tfDepartages[0].moveCaretPosition(0);
				}
			}
		});
	}

	/**
	 * initialise la boite de dialogue concurrent pour un nouveau concurrent ou en édition
	 */
	private void init() {
		// Layout Manager
		GridBagLayout gridbag = new GridBagLayout();
		GridBagConstraints c = new GridBagConstraints();

		GridbagComposer gridbagComposer = new GridbagComposer();
		
		JPanel jpPosition = new JPanel();
		JPanel jpDepart = new JPanel();
		JPanel jpPoints = new JPanel();
		JPanel jpDepartages = new JPanel();

		for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
			jlCategrieTable.put(key, new JLabel());
			JComboBox<CriterionElement> jcbCriterion = new JComboBox<>();
			jcbCriterion.setEditable(false);
			jcbCriterion.setActionCommand("criterion_change_" + key.getCode()); //$NON-NLS-1$
			//jcbCriterion.addActionListener(this);
			jcbCriterion.addItemListener(this);
			jcbCriterion.setRenderer(new DefaultListCellRenderer() {
				/* (non-Javadoc)
				 * @see javax.swing.DefaultListCellRenderer#getListCellRendererComponent(javax.swing.JList, java.lang.Object, int, boolean, boolean)
				 */
				@Override
				public Component getListCellRendererComponent(JList<?> list,
						Object value, int index, boolean isSelected,
						boolean cellHasFocus) {
					if(value instanceof CriterionElement)
						value = ((CriterionElement)value).getLibelle();
					return super.getListCellRendererComponent(list, value, index, isSelected,
							cellHasFocus);
				}
			});
			jcbCategorieTable.put(key, jcbCriterion);
		}

		jbSelectionArcher.addActionListener(this);
		jbSelectionArcher.setMargin(new Insets(0, 0, 0, 0));
		jbSelectionArcher.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.select", 16, 16)); //$NON-NLS-1$
		jbEditerArcher.addActionListener(this);
		jbEditerArcher.setMargin(new Insets(0, 0, 0, 0));
		jbValider.addActionListener(this);
		jbPrecedent.addActionListener(this);
		jbSuivant.addActionListener(this);
		jbAnnuler.addActionListener(this);
		jxhDetailClub.addActionListener(this);
		jbListeClub.addActionListener(this);
		jbListeClub.setMargin(new Insets(0, 0, 0, 0));
		jbListeClub.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.select")); //$NON-NLS-1$
		jtfNom.addFocusListener(this);
		jtfPrenom.addFocusListener(this);
		jxhSeeContactDialog.addActionListener(this);
		
		jcbBlason.setEnabled(false);

		// Panneau de champs
		jlDescription.setOpaque(true);
		jlDescription.setPreferredSize(new Dimension(250, 70));
		jpConcurrent.setBorder(tbConcurrent);
		jpClub.setBorder(tbClub);
		jpCible.setBorder(tbCible);
		jpPoints.setLayout(new FlowLayout(FlowLayout.LEFT));
		jpPoints.add(jlPoints);

		// panneau validation inscription
		jpInscription.setBorder(tbInscription);
		jpInscription.add(jcbInscription);

		jpPlaceLibre.setLayout(new BorderLayout());
		jpPlaceLibre.setPreferredSize(new Dimension(350, 200));
		jpPlaceLibre.setBorder(tbPlaceLibre);
		JScrollPane spPlaceLibre = new JScrollPane(jlPlaceLibre);
		spPlaceLibre.getVerticalScrollBar().setUnitIncrement(20);
		jpPlaceLibre.add(spPlaceLibre, BorderLayout.CENTER);

		jpActionPane.setLayout(new FlowLayout(FlowLayout.RIGHT));
		
		jpPosition.setLayout(new FlowLayout(FlowLayout.LEFT));
		jpPosition.add(jlCible);
		jpPosition.add(jlValCible);
		
		jpDepart.setLayout(new FlowLayout(FlowLayout.LEFT));
		jpDepart.add(jlDepart);
		jpDepart.add(jlValDepart);

		tfpd = new JTextField[ficheConcours.getParametre().getReglement().getNbSerie()];
		for (int i = 0; i < tfpd.length; i++) {
			tfpd[i] = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
			tfpd[i].addFocusListener(this);
			jpPoints.add(tfpd[i]);
		}

		String labelDep = ""; //$NON-NLS-1$
		for(String dep : ficheConcours.getParametre().getReglement().getTie())
			labelDep += dep + "/"; //$NON-NLS-1$
		if(!labelDep.isEmpty())
			labelDep = labelDep.substring(0, labelDep.length() - 1);
		jlValDepartages.setText(labelDep + ":"); //$NON-NLS-1$
		jpDepartages.setLayout(new FlowLayout(FlowLayout.LEFT));
		jpDepartages.add(jlDepartages);
		jpDepartages.add(jlValDepartages);
		tfDepartages = new JTextField[ficheConcours.getParametre().getReglement().getTie().size()];
		for(int i = 0; i < tfDepartages.length; i++) {
			tfDepartages[i] = new JTextField(new NumberDocument(false, false), "0", 4); //$NON-NLS-1$
			tfDepartages[i].addFocusListener(this);
			jpDepartages.add(tfDepartages[i]);
		}
		jtfThirtySecondFinal.addFocusListener(this);
		jtfSixteenthFinal.addFocusListener(this);
		jtfEighthFinal.addFocusListener(this);
		jtfQuarterFinal.addFocusListener(this);
		jtfSemiFinal.addFocusListener(this);
		jtfFinal.addFocusListener(this);

		// panneau tireur
		gridbagComposer.setParentPanel(jpConcurrent);
		c.gridy = 0;
		c.anchor = GridBagConstraints.WEST;
		gridbagComposer.addComponentIntoGrid(jlNom, c);
		c.gridwidth = 2;
		gridbagComposer.addComponentIntoGrid(jtfNom, c);
		gridbagComposer.addComponentIntoGrid(jtfPrenom, c);
		gridbagComposer.addComponentIntoGrid(jbSelectionArcher, c);
		gridbagComposer.addComponentIntoGrid(jbEditerArcher, c);
		c.gridy++;
		c.gridwidth = 1;
		gridbagComposer.addComponentIntoGrid(jlLicence, c);
		c.gridwidth = 4;
		gridbagComposer.addComponentIntoGrid(jtfLicence, c);
		c.gridy++;
		c.gridwidth = 9;
		c.anchor = GridBagConstraints.EAST;
		gridbagComposer.addComponentIntoGrid(jxhSeeContactDialog, c);
		c.gridy++;
		c.gridwidth = 5;
		c.anchor = GridBagConstraints.WEST;
		gridbagComposer.addComponentIntoGrid(jcbHandicape, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jcbSurclassement, c);
		for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
			c.gridy++;
			c.fill = GridBagConstraints.HORIZONTAL;
			c.gridwidth = 1;
			gridbagComposer.addComponentIntoGrid(jlCategrieTable.get(key), c);
			c.gridwidth = 4;
			gridbagComposer.addComponentIntoGrid(jcbCategorieTable.get(key), c);
		}
		c.gridy++;
		c.gridwidth = 1;
		gridbagComposer.addComponentIntoGrid(jlBlason, c);
		c.gridwidth = 4;
		gridbagComposer.addComponentIntoGrid(jcbBlason, c);

		// panneau club
		gridbagComposer.setParentPanel(jpClub);
		c.gridy = 0; // Défaut,Haut
		c.gridwidth = 1;
		
		gridbagComposer.addComponentIntoGrid(jlClub, c);
		gridbagComposer.addComponentIntoGrid(jtfClub, c);
		gridbagComposer.addComponentIntoGrid(jbListeClub, c);
		c.weightx = 1.0;
		gridbagComposer.addComponentIntoGrid(Box.createHorizontalGlue(), c);
		c.gridy++; // Défaut,Ligne 2
		c.weightx = 0.0;
		gridbagComposer.addComponentIntoGrid(jlAgrement, c);
		gridbagComposer.addComponentIntoGrid(jtfAgrement, c);
		c.gridy++;
		c.gridwidth = 4;
		c.fill = GridBagConstraints.NONE;
		c.anchor = GridBagConstraints.EAST;
		gridbagComposer.addComponentIntoGrid(jxhDetailClub, c);

		// panneau cible
		gridbagComposer.setParentPanel(jpCible);
		c.gridy = 0;
		c.gridwidth = 8;
		c.weightx = 1.0;
		c.anchor =GridBagConstraints.WEST;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jpPosition, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jpDepart, c);
		c.gridy++;
		c.weighty = 0.5;
		c.fill = GridBagConstraints.VERTICAL;
		gridbagComposer.addComponentIntoGrid(Box.createVerticalGlue(), c);
		c.gridy++;
		c.weighty = 0.0;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jxtsPhaseQualificative, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jpPoints, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jpDepartages, c);
		c.gridy++;
		gridbagComposer.addComponentIntoGrid(jxtsPhasesFinale, c);
		c.gridy++;
		c.gridwidth = 1;
		gridbagComposer.addComponentIntoGrid(jlThirtySecondFinal, c);
		gridbagComposer.addComponentIntoGrid(jtfThirtySecondFinal, c);
		gridbagComposer.addComponentIntoGrid(jlSixteenthFinal, c);
		gridbagComposer.addComponentIntoGrid(jtfSixteenthFinal, c);
		gridbagComposer.addComponentIntoGrid(jlEighthFinal, c);
		gridbagComposer.addComponentIntoGrid(jtfEighthFinal, c);
		gridbagComposer.addComponentIntoGrid(jlQuarterFinal, c);
		gridbagComposer.addComponentIntoGrid(jtfQuarterFinal, c);
		c.gridy++;
		c.gridwidth = 8;
		JPanel jpLastFinals = new JPanel();
		jpLastFinals.add(jlSemiFinal);
		jpLastFinals.add(jtfSemiFinal);
		jpLastFinals.add(jlFinal);
		jpLastFinals.add(jtfFinal);
		gridbagComposer.addComponentIntoGrid(jpLastFinals, c);
		

		// panneau action
		jpActionPane.add(jbValider);
		jpActionPane.add(jbPrecedent);
		jpActionPane.add(jbSuivant);
		jpActionPane.add(jbAnnuler);

		// panneau global
		c= new GridBagConstraints();
		getContentPane().setLayout(gridbag);
		c.gridy = 0; // Défaut,Haut
		c.gridwidth = 2;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbag.setConstraints(jlDescription, c);
		getContentPane().add(jlDescription);
		c.gridy++;
		c.gridwidth = 1;
		c.gridwidth = GridBagConstraints.RELATIVE;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.gridheight = 2;
		gridbag.setConstraints(jpConcurrent, c);
		getContentPane().add(jpConcurrent, c);
		c.gridy += c.gridheight;
		c.gridheight = 1;
		gridbag.setConstraints(jpClub, c);
		getContentPane().add(jpClub, c);
		c.gridy++;
		c.gridwidth = 2;
		gridbag.setConstraints(jpPlaceLibre, c);
		getContentPane().add(jpPlaceLibre);
		c.gridy++;
		gridbag.setConstraints(jpActionPane, c);
		getContentPane().add(jpActionPane, c);

		c.gridy = 1;
		c.gridwidth = 1;
		gridbag.setConstraints(jpInscription, c);
		getContentPane().add(jpInscription);
		c.gridy++;
		c.gridheight = 2;
		c.fill = GridBagConstraints.BOTH;
		c.anchor = GridBagConstraints.WEST;
		gridbag.setConstraints(jpCible, c);
		getContentPane().add(jpCible, c);
	}

	/**
	 * affecte les libellé localisé à l'interface
	 */
	private void affectLabels() {
		Localizator.localize(this, localisation);

		for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
			jlCategrieTable.get(key).setText(key.getLibelle());
			jcbCategorieTable.get(key).removeAllItems();
			jcbCategorieTable.get(key).removeItemListener(this);
			for (CriterionElement element : key.getCriterionElements()) {
				if (element.isActive())
					jcbCategorieTable.get(key).addItem(element);
			}
			jcbCategorieTable.get(key).addItemListener(this);
		}

		String[] lInscription = localisation.getResourceString("concurrent.inscription").split(","); //$NON-NLS-1$ //$NON-NLS-2$
		jcbInscription.removeAllItems();
		for (String status : lInscription) {
			jcbInscription.addItem(status);
		}
	}

	/**
	 * remplit les champs de la boite de dialogue avec le modèle sous jacent
	 */
	private void completePanel(Concurrent concurrent) {
		boolean isinit = concurrent.getInscription() != Concurrent.UNINIT && !unlock;

		jlDescription.setBackground(new Color(255, 255, 225));
		
		jbSelectionArcher.setEnabled(!isinit);
		jbEditerArcher.setEnabled(isinit);
		if (isinit)
			jbEditerArcher.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.lock", 16, 16)); //$NON-NLS-1$
		else
			jbEditerArcher.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.open", 16, 16)); //$NON-NLS-1$

		jtfNom.setEditable(!isinit);
		jtfPrenom.setEditable(!isinit);
		jtfLicence.setEditable(!isinit);
		jcbHandicape.setEnabled(!isinit);
		jcbSurclassement.setEnabled(!isinit);

		for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
			jcbCategorieTable.get(key).setEnabled(!isinit);
		}

		jtfClub.setEditable(!isinit);
		jtfAgrement.setEditable(!isinit);

		jbPrecedent.setEnabled(isinit);
		jbSuivant.setEnabled(!isinit);
		/*jbSuivant.setText(isinit ? ConcoursJeunes.ajrLibelle.getResourceString("bouton.validersuivant") //$NON-NLS-1$
				: ConcoursJeunes.ajrLibelle.getResourceString("bouton.validernouveau")); */

		jlPlaceLibre.setText(showPlacesLibre());

		if (jtfNom.getDocument() instanceof AutoCompleteDocument) {
			((AutoCompleteDocument) jtfNom.getDocument()).setText(concurrent.getName());
			((AutoCompleteDocument) jtfPrenom.getDocument()).setText(concurrent.getFirstName());
			((AutoCompleteDocument) jtfLicence.getDocument()).setText(concurrent.getNumLicenceArcher());

		} else {
			jtfNom.setText(concurrent.getName());
			jtfPrenom.setText(concurrent.getFirstName());
			jtfLicence.setText(concurrent.getNumLicenceArcher());
		}
		jcbHandicape.setSelected(concurrent.isHandicape());
		if (jtfClub.getDocument() instanceof AutoCompleteDocument) {
			((AutoCompleteDocument) jtfClub.getDocument()).setText(entiteConcurrent.getVille());
			((AutoCompleteDocument) jtfAgrement.getDocument()).setText(entiteConcurrent.getAgrement());
		} else {
			jtfClub.setText(entiteConcurrent.getVille());
			jtfAgrement.setText(entiteConcurrent.getAgrement());
		}
		
		if (concurrent.getCriteriaSet() != null) {
			disableSyncCriteriaSet = true;
			for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
				CriterionElement element = concurrent.getCriteriaSet().getCriterionElement(key);
				if(element != null) {
					jcbCategorieTable.get(key).setSelectedItem(element);
				} else {
					if(jcbCategorieTable.get(key).getModel().getSize() > 0) 
						jcbCategorieTable.get(key).setSelectedIndex(0);
				}
			}
			syncCriteriaSet();
			disableSyncCriteriaSet = false;
		}
		jcbSurclassement.setSelected(concurrent.isSurclassement());
		
		jcbBlason.removeAllItems();
		CriteriaSet cs = readCriteriaSet();
		List<DistancesEtBlason> tmpDB = ficheConcours.getParametre().getReglement().getDistancesEtBlasonFor(
				cs.getFilteredCriteriaSet(
						ficheConcours.getParametre().getReglement().getPlacementFilter()));
		for(DistancesEtBlason db : tmpDB) {
			jcbBlason.addItem(db.getTargetFace());
		}
		jcbBlason.setEnabled(!isinit && jcbBlason.getItemCount() > 1);
		if(concurrent.getCriteriaSet() != null) {
			DistancesEtBlason distancesEtBlason = DistancesEtBlason.getDistancesEtBlasonForConcurrent(ficheConcours.getParametre().getReglement(), concurrent);
			if(distancesEtBlason != null)
				jcbBlason.setSelectedItem(distancesEtBlason.getTargetFace());
		}

		jlValCible.setText("<html><span style=\"font-size: 14pt;\">"  //$NON-NLS-1$
				+ TargetPosition.toString(concurrent.getCible(), concurrent.getPosition())
				+ "</span></html>"); //$NON-NLS-1$
		jlValDepart.setText("<html><span style=\"font-size: 14pt;\">"  //$NON-NLS-1$
				+ (concurrent.getDepart()+1)
				+ "</span></html>"); //$NON-NLS-1$

		List<Integer> score = concurrent.getScore();
		if (score.size() > 0) {
			for (int i = 0; i < score.size(); i++) {
				tfpd[i].setText(score.get(i) + ""); //$NON-NLS-1$
			}
		} else {
			for (int i = 0; i < tfpd.length; i++) {
				tfpd[i].setText("0"); //$NON-NLS-1$
			}
		}

		for(int i = 0; i < tfDepartages.length; i++) {
			if(i < concurrent.getDepartages().length)
				tfDepartages[i].setText("" + concurrent.getDepartages()[i]); //$NON-NLS-1$
			else
				tfDepartages[i].setText("0"); //$NON-NLS-1$
		}
		
		checkPhasesFinalPane(concurrent.getCriteriaSet());

		if (concurrent.getInscription() == Concurrent.UNINIT)
			this.jcbInscription.setSelectedIndex(0);
		else
			this.jcbInscription.setSelectedIndex(concurrent.getInscription());
	}
	
	private void initConcurrentListDialog() {
		if(concurrentListDialog == null || !ficheConcours.getParametre().getReglement().equals(lastActiveReglement)) {
	        lastActiveReglement = ficheConcours.getParametre().getReglement();
	        
	        concurrentListDialog = new ConcurrentListDialog(ConcurrentDialog.this, profile,
	    					lastActiveReglement, null);
		}
	}

	/**
	 * Affiche la boite de dialogue de création d'un concurrent
	 * 
	 * @param depart le depart affecté au concurrent
	 */
	public int showNewConcurrentDialog(int depart) {
		
		initConcurrentListDialog();

		Concurrent concurrent = new Concurrent();
		concurrent.setDepart(depart);
		
		AutoCompleteDocumentContext context = new AutoCompleteDocumentContext(ficheConcours.getParametre().getReglement());

		AutoCompleteDocument acdNom = new AutoCompleteDocument(jtfNom, AutoCompleteDocument.SearchType.NAME_SEARCH, context);
		acdNom.addAutoCompleteDocumentListener(this);
		AutoCompleteDocument acdPrenom = new AutoCompleteDocument(jtfPrenom, AutoCompleteDocument.SearchType.FIRSTNAME_SEARCH, context);
		acdPrenom.addAutoCompleteDocumentListener(this);
		AutoCompleteDocument acdLicence = new AutoCompleteDocument(jtfLicence, AutoCompleteDocument.SearchType.NUMLICENCE_SEARCH, context);
		acdLicence.addAutoCompleteDocumentListener(this);
		AutoCompleteDocument acdClub = new AutoCompleteDocument(jtfClub, AutoCompleteDocument.SearchType.CLUB_SEARCH, context);
		acdClub.addAutoCompleteDocumentListener(this);
		AutoCompleteDocument acdAgrement = new AutoCompleteDocument(jtfAgrement, AutoCompleteDocument.SearchType.AGREMENT_SEARCH, context);
		acdAgrement.addAutoCompleteDocumentListener(this);

		jtfNom.setDocument(acdNom);
		jtfLicence.setDocument(acdLicence);
		jtfPrenom.setDocument(acdPrenom);
		jtfClub.setDocument(acdClub);
		jtfAgrement.setDocument(acdAgrement);

		setConcurrent(concurrent);
		
		jlDescription.setText(localisation.getResourceString("concurrent.description")); //$NON-NLS-1$
		jlDescription.setBackground(new Color(255, 255, 225));
		
		getRootPane().setDefaultButton(jbSuivant);
		
		returnVal = CANCEL;

		pack();
		setResizable(false);
		setLocationRelativeTo(null);
		setVisible(true);

		return returnVal;
	}

	/**
	 * Affiche la boite de dialogue de gestion du concurrent donné en paramètre
	 * 
	 * @param concurrent la concurrent à afficher
	 * @return le code de retour de la boite de dialogue
	 */
	public int showConcurrentDialog(Concurrent concurrent, boolean hasPrevious, boolean hasNext) {
		jlDescription.setText(localisation.getResourceString("concurrent.description")); //$NON-NLS-1$
		jlDescription.setBackground(new Color(255, 255, 225));

		AutoCompleteDocumentContext context = new AutoCompleteDocumentContext(ficheConcours.getParametre().getReglement());
		
		AutoCompleteDocument acdClub = new AutoCompleteDocument(jtfClub, AutoCompleteDocument.SearchType.CLUB_SEARCH, context);
		acdClub.addAutoCompleteDocumentListener(this);
		AutoCompleteDocument acdAgrement = new AutoCompleteDocument(jtfAgrement, AutoCompleteDocument.SearchType.AGREMENT_SEARCH, context);
		acdAgrement.addAutoCompleteDocumentListener(this);

		jtfNom.setDocument(new PlainDocument());
		jtfLicence.setDocument(new PlainDocument());
		jtfPrenom.setDocument(new PlainDocument());
		jtfClub.setDocument(acdClub);
		jtfAgrement.setDocument(acdAgrement);
		
		setConcurrent(concurrent);
		
		jbPrecedent.setEnabled(hasPrevious);
		jbSuivant.setEnabled(hasNext);
		
		if(hasNext)
			getRootPane().setDefaultButton(jbSuivant);
		else
			getRootPane().setDefaultButton(jbValider);
		returnVal = CANCEL;

		pack();
		setResizable(false);
		setLocationRelativeTo(null);
		setVisible(true);

		return returnVal;
	}

	/**
	 * Affichage des info d'un concurrent en mode edition
	 * 
	 * @param concurrent le concurrent à éditer
	 */
	public void setConcurrent(Concurrent concurrent) {
		this.concurrent = concurrent;
		this.entiteConcurrent = concurrent.getEntite();

		if(!SwingUtilities.isEventDispatchThread()) {
			SwingUtilities.invokeLater(new Runnable() {
				@Override
				public void run() {
					completePanel(concurrent);
				}
			});
		} else {
			completePanel(concurrent);
		}
	}

	/**
	 * Retourne le concurrent de la boite de dialogue
	 * 
	 * @return le concurrent courant
	 */
	public Concurrent getConcurrent() {
		return concurrent;
	}

	private void checkPhasesFinalPane(CriteriaSet criteriaSet) {
		if(ficheConcours.getParametre().isDuel() && criteriaSet != null) {
			
			int nbPhase = phaseFinal.getNombrePhase(
					criteriaSet.getFilteredCriteriaSet(
							ficheConcours.getParametre().getReglement().getClassementFilter()));
			if(nbPhase < 6) {
				jlThirtySecondFinal.setEnabled(false);
				jtfThirtySecondFinal.setEnabled(false);
			} else {
				jlThirtySecondFinal.setEnabled(true);
				jtfThirtySecondFinal.setEnabled(true);
				jtfThirtySecondFinal.setText(String.valueOf(concurrent.getScorePhasefinale(5)));
			}
			if(nbPhase < 5) {
				jlSixteenthFinal.setEnabled(false);
				jtfSixteenthFinal.setEnabled(false);
			} else {
				jlSixteenthFinal.setEnabled(true);
				jtfSixteenthFinal.setEnabled(true);
				jtfSixteenthFinal.setText(String.valueOf(concurrent.getScorePhasefinale(4)));
			}
			if(nbPhase < 4) {
				jlEighthFinal.setEnabled(false);
				jtfEighthFinal.setEnabled(false);
			} else {
				jlEighthFinal.setEnabled(true);
				jtfEighthFinal.setEnabled(true);
				jtfEighthFinal.setText(String.valueOf(concurrent.getScorePhasefinale(3)));
			}
			if(nbPhase < 3) {
				jlQuarterFinal.setEnabled(false);
				jtfQuarterFinal.setEnabled(false);
			} else {
				jlQuarterFinal.setEnabled(true);
				jtfQuarterFinal.setEnabled(true);
				jtfQuarterFinal.setText(String.valueOf(concurrent.getScorePhasefinale(2)));
			}
			
			if(nbPhase < 2) {
				jlSemiFinal.setEnabled(false);
				jtfSemiFinal.setEnabled(false);
			} else {
				jlSemiFinal.setEnabled(true);
				jtfSemiFinal.setEnabled(true);
				jtfSemiFinal.setText(String.valueOf(concurrent.getScorePhasefinale(1)));
			}
				
			jlFinal.setEnabled(true);
			jtfFinal.setEnabled(true);
			jtfFinal.setText(String.valueOf(concurrent.getScorePhasefinale(0)));
		} else {
			jlThirtySecondFinal.setEnabled(false);
			jlSixteenthFinal.setEnabled(false);
			jlEighthFinal.setEnabled(false);
			jlQuarterFinal.setEnabled(false);
			jlSemiFinal.setEnabled(false);
			jlFinal.setEnabled(false);
			jtfThirtySecondFinal.setEnabled(false);
			jtfSixteenthFinal.setEnabled(false);
			jtfEighthFinal.setEnabled(false);
			jtfQuarterFinal.setEnabled(false);
			jtfSemiFinal.setEnabled(false);
			jtfFinal.setEnabled(false);
		}
	}
	/**
	 * formate l'affichage des places libre en fonction des catégorie de classement
	 * 
	 * @return String l'affichage écran des places libres
	 */
	private String showPlacesLibre() {
		String strPlaceLibre = "<html>"; //$NON-NLS-1$

		// affiche le nombre de concurrent total sur le pas de tir
		strPlaceLibre += localisation.getResourceString("concurrent.placelibre.nbarcher") + //$NON-NLS-1$
				": " + ficheConcours.getConcurrentList().countArcher() + "<br><br>"; //$NON-NLS-1$ //$NON-NLS-2$

		// récupère la table d'occupation des cibles
		Map<DistancesEtBlason, TargetsOccupation> occupationCibles = ficheConcours.getPasDeTir(concurrent.getDepart()).getTargetsOccupation(ficheConcours.getParametre().getNbTireur());
		
		if(occupationCibles == null)
			return localisation.getResourceString("concurrent.placelibre.placementfail"); //$NON-NLS-1$
		List<DistancesEtBlason> tableCorresp = ficheConcours.getParametre().getReglement().getListDistancesEtBlason();

		// en extrait les jeux de critères de placement
		List<CriteriaSet> criteriaSetPlacement = new ArrayList<CriteriaSet>();
		for (int i = 0; i < tableCorresp.size(); i++) {
			if(!criteriaSetPlacement.contains(tableCorresp.get(i).getCriteriaSet()))
				criteriaSetPlacement.add(tableCorresp.get(i).getCriteriaSet());
		}

		// ordonne ces critères selon l'ordre définit dans la configuration
		CriteriaSet.sortCriteriaSet(criteriaSetPlacement, ficheConcours.getParametre().getReglement().getListCriteria());

		// boucle sur chacun des jeux de placement
		for (CriteriaSet differentiationCriteria : criteriaSetPlacement) {
			// établit la correspondance entre un jeux de placement et son d/b
			List<DistancesEtBlason> ldistAndBlas = ficheConcours.getParametre().getReglement().getDistancesEtBlasonFor(differentiationCriteria);

			for(DistancesEtBlason distAndBlas : ldistAndBlas) {
				// génère le libellé complet du jeux de critère
				CriteriaSetLibelle libelle = new CriteriaSetLibelle(differentiationCriteria,localisation);
				String strCategoriePlacement = libelle.toString();
	
				strPlaceLibre += "<i>" + //$NON-NLS-1$
						strCategoriePlacement + "(" + //$NON-NLS-1$
						(!distAndBlas.isDefaultTargetFace() ? "alt., " : "") +  //$NON-NLS-1$ //$NON-NLS-2$
						distAndBlas.getDistance()[0] + "m/" + //$NON-NLS-1$
						distAndBlas.getTargetFace().getName() + ")</i><br>\n"; //$NON-NLS-1$
				strPlaceLibre += "&nbsp;&nbsp;&nbsp;&nbsp;<font color=\"red\">" + //$NON-NLS-1$
						localisation.getResourceString("concurrent.placelibre.occupee") + //$NON-NLS-1$
						" " + occupationCibles.get(distAndBlas).getPlaceOccupe() + "</font>"; //$NON-NLS-1$ //$NON-NLS-2$
				strPlaceLibre += ", <font color=\"green\">" + //$NON-NLS-1$
						localisation.getResourceString("concurrent.placelibre.libre") + //$NON-NLS-1$
						" " + occupationCibles.get(distAndBlas).getPlaceLibre() + "</font><br>"; //$NON-NLS-1$ //$NON-NLS-2$
			}
		}

		return strPlaceLibre;
	}

	private ArrayList<Integer> readScores() throws NumberFormatException {
		ArrayList<Integer> points = new ArrayList<Integer>();
		
		for (int i = 0; i < tfpd.length; i++) {
			points.add(Integer.parseInt(tfpd[i].getText()));
		}

		return points;
	}
	
	private int[] readScoresPhasesFinales() throws NumberFormatException {
		int[] scoresPhasesFinales = new int[6];

		scoresPhasesFinales[5] = Integer.valueOf(jtfThirtySecondFinal.getText());
		scoresPhasesFinales[4] = Integer.valueOf(jtfSixteenthFinal.getText());
		scoresPhasesFinales[3] = Integer.valueOf(jtfEighthFinal.getText());
		scoresPhasesFinales[2] = Integer.valueOf(jtfQuarterFinal.getText());
		scoresPhasesFinales[1] = Integer.valueOf(jtfSemiFinal.getText());
		scoresPhasesFinales[0] = Integer.valueOf(jtfFinal.getText());
		
		return scoresPhasesFinales;
	}

	private CriteriaSet readCriteriaSet() {
		CriteriaSet differentiationCriteria = new CriteriaSet();
		differentiationCriteria.setReglement(ficheConcours.getParametre().getReglement());
		for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria()) {
			CriterionElement criterionElement = (CriterionElement)jcbCategorieTable.get(key).getSelectedItem();
			if(criterionElement != null)
				differentiationCriteria.addCriterionElement(criterionElement);
		}

		return differentiationCriteria;
	}
	
	private boolean verifyCriteriaSet() {
		Reglement reglement = ficheConcours.getParametre().getReglement();
		
		CriteriaSet currentCS = readCriteriaSet();
		CriteriaSet classementCS = currentCS.getFilteredCriteriaSet(reglement.getClassementFilter());
		List<CriteriaSet> validClassementCS = reglement.getValidClassementCriteriaSet();
		
		return validClassementCS.contains(classementCS);
	}
	
	private void syncCriteriaSet() {
		Reglement reglement = ficheConcours.getParametre().getReglement();
		
		CriteriaSet currentCS = readCriteriaSet();
		CriteriaSet classementCS = currentCS.getFilteredCriteriaSet(reglement.getClassementFilter());
		if(!verifyCriteriaSet()) {
			CriteriaSet surclassement = reglement.getSurclassement().get(classementCS);
			if(surclassement == null) {
				jlDescription.setText(localisation.getResourceString("concurrent.invalidcriteriaset")); //$NON-NLS-1$
				jlDescription.setBackground(Color.ORANGE);
			} else {
				for (Criterion key : reglement.getListCriteria()) {
					CriterionElement element = surclassement.getCriterionElement(key);
					if(element != null)
						jcbCategorieTable.get(key).setSelectedItem(element);
					else {
						if(jcbCategorieTable.get(key).getModel().getSize() > 0) 
							jcbCategorieTable.get(key).setSelectedIndex(0);
					}
				}
				jcbSurclassement.setSelected(true);
			}
		} else {
			jlDescription.setText(localisation.getResourceString("concurrent.description")); //$NON-NLS-1$
			jlDescription.setBackground(new Color(255, 255, 225));
		}
		
		jcbBlason.removeAllItems();

		List<DistancesEtBlason> tmpDB = reglement.getDistancesEtBlasonFor(
				currentCS.getFilteredCriteriaSet(reglement.getPlacementFilter()));
		for(DistancesEtBlason db : tmpDB) {
			jcbBlason.addItem(db.getTargetFace());
		}
		jcbBlason.setEnabled(jcbBlason.getItemCount() > 1);
		if(concurrent != null && concurrent.getCriteriaSet() != null) {
			DistancesEtBlason distancesEtBlason = DistancesEtBlason.getDistancesEtBlasonForConcurrent(
					reglement, concurrent);
			if(distancesEtBlason != null)
				jcbBlason.setSelectedItem(distancesEtBlason.getTargetFace());
		}
		
		checkPhasesFinalPane(classementCS);
	}

	/**
	 * @see org.concoursjeunes.event.AutoCompleteDocumentListener#concurrentFinded(org.concoursjeunes.event.AutoCompleteDocumentEvent)
	 */
	@Override
	public void concurrentFinded(AutoCompleteDocumentEvent e) {
		Concurrent findConcurrent = e.getConcurrent();
		if (!findConcurrent.equals(concurrent)) {
			findConcurrent.setDepart(ficheConcours.getCurrentDepart());
			setConcurrent(findConcurrent);
		}
		
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				if (concurrent.haveHomonyme()) {
					jlDescription.setText(localisation.getResourceString("concurrent.homonyme")); //$NON-NLS-1$
					jlDescription.setBackground(Color.ORANGE);
				} else if(concurrent.isSurclassement()) {
					jlDescription.setText(localisation.getResourceString("concurrent.mustbeoverclassified")); //$NON-NLS-1$
					jlDescription.setBackground(new Color(155, 155, 255));
				} else {
					jlDescription.setText(localisation.getResourceString("concurrent.description")); //$NON-NLS-1$
					jlDescription.setBackground(new Color(255, 255, 225));
				}
			}
		});
		
		filter = e.getGenericArcher();
	}

	/**
	 * @see org.concoursjeunes.event.AutoCompleteDocumentListener#concurrentNotFound(org.concoursjeunes.event.AutoCompleteDocumentEvent)
	 */
	@Override
	public void concurrentNotFound(AutoCompleteDocumentEvent e) {
		Concurrent newConcurrent = new Concurrent();
		newConcurrent.setCountryCode(ficheConcours.getParametre().getClub().getPays());
		newConcurrent.setDepart(ficheConcours.getCurrentDepart());
		if (e.getSource() == jtfNom) {
			newConcurrent.setName(jtfNom.getText());
		} else if (e.getSource() == jtfPrenom) {
			newConcurrent.setName(jtfNom.getText());
			newConcurrent.setFirstName(jtfPrenom.getText());
		} else if (e.getSource() == jtfLicence) {
			newConcurrent.setName(jtfNom.getText());
			newConcurrent.setFirstName(jtfPrenom.getText());
			newConcurrent.setNumLicenceArcher(jtfLicence.getText());
		}

		filter = null;

		setConcurrent(newConcurrent);

		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				jlDescription.setText(localisation.getResourceString("concurrent.noconcurrent")); //$NON-NLS-1$
				jlDescription.setBackground(Color.ORANGE);
			}
		});
		
	}

	@Override
	public void entiteFinded(AutoCompleteDocumentEvent e) {
		Entite findEntite = e.getEntite();
		if (!findEntite.equals(concurrent.getEntite())) {
			//concurrent.setClub(findEntite);
			//setConcurrent(concurrent);
			entiteConcurrent = findEntite;
			SwingUtilities.invokeLater(new Runnable() {
				@Override
				public void run() {
					completePanel(concurrent);
				}
			});
		}
	}

	@Override
	public void entiteNotFound(AutoCompleteDocumentEvent e) {
		Entite newEntite = new Entite();
		if (e.getSource() == jtfClub) {
			newEntite.setVille(jtfClub.getText());
		} else if (e.getSource() == jtfAgrement) {
			newEntite.setVille(jtfClub.getText());
			newEntite.setAgrement(jtfAgrement.getText());
		}

		//concurrent.setClub(newEntite);
		//setConcurrent(concurrent);
		entiteConcurrent = newEntite;
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				completePanel(concurrent);
			}
		});
	}

	@Override
	public void actionPerformed(ActionEvent ae) {
		if (ae.getSource() == jbSuivant || ae.getSource() == jbPrecedent || ae.getSource() == jbValider) {

			filter = null;
			
			//évite de modifier l'objet concurrent avant d'avoir
			//validé les paramètres
			Concurrent tempConcurrent = concurrent.clone(true);
			DistancesEtBlason db1 = null;
			if(tempConcurrent.getCriteriaSet() != null)
				db1 = DistancesEtBlason.getDistancesEtBlasonForConcurrent(ficheConcours.getParametre().getReglement(), tempConcurrent);
			
			// fixe le jeux de critères définissant le concurrent
			tempConcurrent.setCriteriaSet(readCriteriaSet());
			
			if(jcbBlason.getSelectedIndex() > 0)
				tempConcurrent.setAlternativeTargetFace((Blason)jcbBlason.getSelectedItem());
			else
				tempConcurrent.setAlternativeTargetFace(null);
			
			//vérifie la validité du jeux
			if(!verifyCriteriaSet()) {
				JOptionPane.showMessageDialog(this, 
						localisation.getResourceString("concurrent.invalidcriteriaset"), //$NON-NLS-1$
						localisation.getResourceString("concurrent.invalidcriteriaset.title"), //$NON-NLS-1$
						JOptionPane.WARNING_MESSAGE);
				return;
			}
			DistancesEtBlason db2 = DistancesEtBlason.getDistancesEtBlasonForConcurrent(ficheConcours.getParametre().getReglement(), tempConcurrent);
			
			tempConcurrent.setHandicape(jcbHandicape.isSelected());
			tempConcurrent.setSurclassement(jcbSurclassement.isSelected());

			if (tempConcurrent.getInscription() == Concurrent.UNINIT) {
				// si il n'y a plus de place alors retourner une erreur
				if (!ficheConcours.getPasDeTir(tempConcurrent.getDepart()).havePlaceForConcurrent(tempConcurrent)) {
					JOptionPane.showMessageDialog(this, localisation.getResourceString("erreur.maxcible"), //$NON-NLS-1$
							localisation.getResourceString("erreur.maxcible.titre"), JOptionPane.ERROR_MESSAGE); //$NON-NLS-1$
					return;
					// si le concurrent existe déjà alors retourner une
					// erreur
				} else if (ficheConcours.getConcurrentList().contains(tempConcurrent)) {
					JOptionPane.showMessageDialog(this, localisation.getResourceString("erreur.alreadyexist"), //$NON-NLS-1$
							localisation.getResourceString("erreur.alreadyexist.titre"), JOptionPane.ERROR_MESSAGE); //$NON-NLS-1$
					return;
				}
			} else {
				if (!ficheConcours.getPasDeTir(tempConcurrent.getDepart()).havePlaceForConcurrent(tempConcurrent)) {
					JOptionPane.showMessageDialog(this, localisation.getResourceString("erreur.maxcible"), //$NON-NLS-1$
							localisation.getResourceString("erreur.maxcible.titre"), JOptionPane.ERROR_MESSAGE); //$NON-NLS-1$
					return;
				}
			}
			
			try {
				// verification du score
				if (!ficheConcours.getParametre().getReglement().isValidScore(readScores())) {
					JOptionPane.showMessageDialog(new JDialog(), localisation.getResourceString("erreur.impscore"), //$NON-NLS-1$
							localisation.getResourceString("erreur"), JOptionPane.ERROR_MESSAGE); //$NON-NLS-1$
					return;
				}
			
				concurrent.setScore(readScores());
				
				concurrent.setScoresPhasesFinales(readScoresPhasesFinales());
			} catch (NumberFormatException e) {
				JOptionPane.showMessageDialog(this, 
						localisation.getResourceString("erreur.erreursaisie"), //$NON-NLS-1$
						localisation.getResourceString("erreur.erreursaisie.title"), //$NON-NLS-1$
						JOptionPane.ERROR_MESSAGE);
				return;
			}
			
			if(db1 != null && !db1.haveSameDistancesAndTargetFace(db2)) {
				ficheConcours.getPasDeTir(tempConcurrent.getDepart()).retraitConcurrent(concurrent);
			}
			
			concurrent.setCriteriaSet(tempConcurrent.getCriteriaSet());
			concurrent.setHandicape(tempConcurrent.isHandicape());
			concurrent.setSurclassement(tempConcurrent.isSurclassement());
			try {
				int[] departages = new int[tfDepartages.length];
				for(int i = 0; i < tfDepartages.length; i++) {
					departages[i] = Integer.parseInt(tfDepartages[i].getText());
				}
				concurrent.setDepartages(departages);
			} catch (NumberFormatException e) {
				JOptionPane.showMessageDialog(this, 
						localisation.getResourceString("erreur.erreursaisie"), //$NON-NLS-1$
						localisation.getResourceString("erreur.erreursaisie.title"), //$NON-NLS-1$
						JOptionPane.ERROR_MESSAGE);
				return;
			}
			concurrent.setName(jtfNom.getText());
			concurrent.setFirstName(jtfPrenom.getText());
			concurrent.setNumLicenceArcher(jtfLicence.getText());
			concurrent.setEntite(entiteConcurrent);
			concurrent.getEntite().setVille(jtfClub.getText());
			concurrent.getEntite().setAgrement(jtfAgrement.getText());
			concurrent.setInscription(jcbInscription.getSelectedIndex());
			
			if(jcbBlason.getSelectedIndex() > 0)
				concurrent.setAlternativeTargetFace((Blason)jcbBlason.getSelectedItem());
			else
				concurrent.setAlternativeTargetFace(null);

			try {
				concurrent.save();
			} catch (ObjectPersistenceException e) {
				e.printStackTrace();
			}

			if (ae.getSource() == jbValider) {
				if (!this.jtfNom.getText().equals("")) { //$NON-NLS-1$
					returnVal = CONFIRM_AND_CLOSE;
				}
			} else if (ae.getSource() == jbSuivant) {
				returnVal = CONFIRM_AND_NEXT;
			} else if (ae.getSource() == jbPrecedent) {
				returnVal = CONFIRM_AND_PREVIOUS;
			}
			unlock = false;
			setVisible(false);
		} else if (ae.getSource() == jbAnnuler) {
			returnVal = CANCEL;
			unlock = false;
			setVisible(false);
		} else if (ae.getSource() == jbSelectionArcher) {
			if(concurrentListDialog != null) {
            	concurrentListDialog.setFilter(filter);
            	concurrentListDialog.setVisible(true);
				if (concurrentListDialog.isValider()) {
					concurrent = concurrentListDialog.getSelectedConcurrent();
					concurrent.setDepart(ficheConcours.getCurrentDepart());
					setConcurrent(concurrent);
				}
			}
		} else if (ae.getSource() == jxhDetailClub) {
			if (!jtfAgrement.getText().equals("")) { //$NON-NLS-1$
				EntiteDialog ed = new EntiteDialog(this, profile);
				ed.setEntite(concurrent.getEntite());
				ed.showEntiteDialog(false);
			}
		} else if (ae.getSource() == jbListeClub) {
			EntiteListDialog entiteListDialog = new EntiteListDialog(null, profile, true);
			if (entiteListDialog.getAction() == EntiteListDialog.VALIDER) {
				entiteListDialog.setAction(EntiteListDialog.ANNULER);
				if(entiteListDialog.getSelectedEntite() != null) {
					jtfClub.setText(entiteListDialog.getSelectedEntite().getVille());
					jtfAgrement.setText(entiteListDialog.getSelectedEntite().getAgrement());
				}
			}
		} else if (ae.getSource() == jbEditerArcher) {
			unlock = true;
			
			jtfNom.setEditable(true);
			jtfPrenom.setEditable(true);
			jtfLicence.setEditable(true);
			jcbHandicape.setEnabled(true);
			jcbSurclassement.setEnabled(true);

			for (Criterion key : ficheConcours.getParametre().getReglement().getListCriteria())
				jcbCategorieTable.get(key).setEnabled(true);

			jcbBlason.setEnabled(jcbBlason.getItemCount() > 1);
			jtfClub.setEditable(true);
			jtfAgrement.setEditable(true);

			jbEditerArcher.setEnabled(false);

			jbEditerArcher.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.open")); //$NON-NLS-1$
		} else if(ae.getSource() == jxhSeeContactDialog) {
			if(concurrent != null) {
				ContactDialog contactDialog = new ContactDialog(this, profile);
				contactDialog.setEnabledCreateContact(false);
				contactDialog.showContactDialog(concurrent);
			}
		}
	}
	
	/* (non-Javadoc)
	 * @see java.awt.event.ItemListener#itemStateChanged(java.awt.event.ItemEvent)
	 */
	@Override
	public void itemStateChanged(ItemEvent e) {
		if(e.getSource() instanceof JComboBox) {
			if(e.getStateChange() == ItemEvent.SELECTED) {
				if(!disableSyncCriteriaSet)
					syncCriteriaSet();
			}
		}
	}

	/**
	 * @see java.awt.event.FocusListener#focusGained(java.awt.event.FocusEvent)
	 */
	@Override
	public void focusGained(FocusEvent fe) {
		selectField = -1;
		for (int i = 0; i < tfpd.length; i++) {
			if (fe.getSource() == tfpd[i]) {
				selectField = i;
				break;
			}
		}
		if (fe.getSource() instanceof JTextField) {
			((JTextField) fe.getSource()).setSelectionStart(0);
			((JTextField) fe.getSource()).setSelectionEnd(((JTextField) fe.getSource()).getText().length());
		}
	}

	/**
	 * @see java.awt.event.FocusListener#focusLost(java.awt.event.FocusEvent)
	 */
	@Override
	public void focusLost(FocusEvent fe) {
	}
	
	@Override
	public void dispose() {
		concurrentListDialog = null;
		lastActiveReglement = null;

		super.dispose();
	}
}


