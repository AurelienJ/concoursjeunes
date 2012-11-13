/*
 * Créé le 5 nov. 2012 à 21:43:57 pour ConcoursJeunes / ArcCompétition
 *
 * Copyright 2002-2012 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.plugins.scriptext;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringWriter;
import java.lang.reflect.UndeclaredThrowableException;
import java.net.MalformedURLException;
import java.util.List;

import javax.script.ScriptException;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.JTree;
import javax.swing.border.TitledBorder;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeCellRenderer;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;
import javax.xml.bind.JAXBException;

import jsyntaxpane.DefaultSyntaxKit;

import org.ajdeveloppement.apps.localisation.Localizable;
import org.ajdeveloppement.apps.localisation.Localizator;
import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.commons.io.FileUtils;
import org.ajdeveloppement.commons.io.XMLSerializer;
import org.ajdeveloppement.commons.ui.AJTabbedPane;
import org.ajdeveloppement.commons.ui.AJTabbedPaneListener;
import org.ajdeveloppement.commons.ui.AJTree;
import org.ajdeveloppement.commons.ui.GridbagComposer;
import org.ajdeveloppement.concours.ui.ConcoursJeunesFrame;
import org.concoursjeunes.ApplicationCore;
import org.concoursjeunes.plugins.Plugin;

/**
 * @author Aurélien JEOFFRAY
 *
 */
public class ScriptManagerDialog extends JFrame implements ActionListener,MouseListener,AJTabbedPaneListener,TreeSelectionListener {
	
	public static final String UTF8_BOM = "\uFEFF"; //$NON-NLS-1$

	private JFrame parentframe;
	private AjResourcesReader localisation;
	
	private JButton jbNewScript = new JButton();
	private JButton jbImportScript = new JButton();
	private JButton jbExportScript = new JButton();
	
	private DefaultMutableTreeNode treeRoot = new DefaultMutableTreeNode("scripts"); //$NON-NLS-1$
	private DefaultMutableTreeNode nodeStartup = new DefaultMutableTreeNode();
	private DefaultMutableTreeNode nodeUiStartup = new DefaultMutableTreeNode();
	private DefaultMutableTreeNode nodeOnDemand = new DefaultMutableTreeNode();
	private DefaultTreeModel treeModel = new DefaultTreeModel(treeRoot);
	private AJTree jtScripts = new AJTree(treeModel);
	
	
	@Localizable(value="scriptmanager.properties",textMethod="setTitle")
	private TitledBorder tbScriptProperties = new TitledBorder(""); //$NON-NLS-1$
	
	private JPanel jpProperties = new JPanel();
	@Localizable("scriptmanager.label")
	private JLabel jlScriptLibelle = new JLabel();
	private JTextField jtfScriptLibelle = new JTextField();
	@Localizable("scriptmanager.name")
	private JLabel jlScriptName = new JLabel();
	private JTextField jtfScriptName = new JTextField();
	@Localizable("scriptmanager.version")
	private JLabel jlScriptVersion = new JLabel();
	private JTextField jtfScriptVersion = new JTextField();
	@Localizable("scriptmanager.type")
	private JLabel jlScriptType = new JLabel();
	private JComboBox jcbScriptType = new JComboBox();
	@Localizable("scriptmanager.asynchrone")
	private JLabel jlScriptAsynchrone = new JLabel();
	@Localizable("scriptmanager.asynchrone.yes")
	private JRadioButton jrbScriptAsynchroneYes = new JRadioButton();
	@Localizable("scriptmanager.asynchrone.no")
	private JRadioButton jrbScriptAsynchroneNo = new JRadioButton();
	@Localizable("scriptmanager.properties.save")
	private JButton jbSaveScriptProperties = new JButton();
	
	private AJTabbedPane jtpScriptEditorTabs = new AJTabbedPane();
	
	public ScriptManagerDialog(JFrame parentframe, AjResourcesReader localisation) {
		super();
		this.localisation = localisation;
		this.parentframe = parentframe;
		
		init();
		affectLabels();
	}
	
	private void affectLabels() {
		Localizator.localize(this, localisation);
		
		nodeStartup.setUserObject(localisation.getResourceString("scriptmanager.category.startup")); //$NON-NLS-1$
		nodeUiStartup.setUserObject(localisation.getResourceString("scriptmanager.category.uiStartup")); //$NON-NLS-1$
		nodeOnDemand.setUserObject(localisation.getResourceString("scriptmanager.category.onDemand")); //$NON-NLS-1$
	}

	private void init() {
		JPanel jpLeftPane = new JPanel();
		JPanel jpCenterPane = new JPanel();
		
		JScrollPane jsListeScript = new JScrollPane(jtScripts);
		
		jbNewScript.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.addcriteria")); //$NON-NLS-1$
		jbNewScript.setMargin(new Insets(0, 0, 0, 0));
		jbNewScript.addActionListener(this);
		jbImportScript.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.downelement")); //$NON-NLS-1$
		jbImportScript.setMargin(new Insets(0, 0, 0, 0));
		jbImportScript.addActionListener(this);
		jbExportScript.setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.upelement")); //$NON-NLS-1$
		jbExportScript.setMargin(new Insets(0, 0, 0, 0));
		jbExportScript.addActionListener(this);

		jsListeScript.setMinimumSize(new Dimension(300, 500));
		
		treeRoot.add(nodeStartup);
		treeRoot.add(nodeUiStartup);
		treeRoot.add(nodeOnDemand);
		
		treeModel.reload();
		
		jtScripts.setMinimumSize(new Dimension(300, 500));
		jtScripts.addMouseListener(this);
		jtScripts.addTreeSelectionListener(this);
		jtScripts.setToggleClickCount(3);
		jtScripts.setKeepExpansionState(true);
		jtScripts.setCellRenderer(new DefaultTreeCellRenderer() {
			/* (non-Javadoc)
			 * @see javax.swing.tree.DefaultTreeCellRenderer#getTreeCellRendererComponent(javax.swing.JTree, java.lang.Object, boolean, boolean, boolean, int, boolean)
			 */
			@Override
			public Component getTreeCellRendererComponent(JTree tree,
					Object value, boolean sel, boolean expanded, boolean leaf,
					int row, boolean hasFocus) {
				super.getTreeCellRendererComponent(tree, value, sel, expanded, leaf,
						row, hasFocus);
				
				if(value instanceof DefaultMutableTreeNode) {
					Object o = ((DefaultMutableTreeNode)value).getUserObject();
					if(o instanceof ScriptExtention) {
						value = ((ScriptExtention)o).getScriptName();
						if(value == null || ((String)value).isEmpty())
							value = new File(((ScriptExtention)o).getMainPath()).getName();
						
						setText(value.toString());
						setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.script.js")); //$NON-NLS-1$
					} else if (o instanceof File) {
						setText(((File)o).getName());
					} else if (o instanceof String && row != 0) {
						setIcon(ApplicationCore.userRessources.getImageIcon("file.icon.script.type")); //$NON-NLS-1$
					}
				}
					
				return this;
			}
		});
		
		jpProperties.setMinimumSize(new Dimension(300, 500));
		jpProperties.setVisible(false);
		
		jcbScriptType.addItem(Plugin.Type.STARTUP);
		jcbScriptType.addItem(Plugin.Type.UI_STARTUP);
		jcbScriptType.addItem(Plugin.Type.ON_DEMAND);
		
		jbSaveScriptProperties.addActionListener(this);
		
		jtpScriptEditorTabs.addAJTabbedPaneListener(this);
		
		ButtonGroup bg = new ButtonGroup();
		bg.add(jrbScriptAsynchroneYes);
		bg.add(jrbScriptAsynchroneNo);
		
		jpProperties.setBorder(tbScriptProperties);
		
		GridbagComposer gridbagComposer = new GridbagComposer();
		
		GridBagConstraints c = new GridBagConstraints();
		gridbagComposer.setParentPanel(jpProperties);
		c.anchor = GridBagConstraints.NORTHWEST;
		c.gridy = 0;
		gridbagComposer.addComponentIntoGrid(jlScriptLibelle, c);
		c.weightx = 1.0;
		c.gridwidth = 2;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jtfScriptLibelle, c);
		c.gridy++;
		c.gridwidth = 1;
		c.weightx = 0;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlScriptName, c);
		c.weightx = 1.0;
		c.gridwidth = 2;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jtfScriptName, c);
		c.gridy++;
		c.gridwidth = 1;
		c.weightx = 0;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlScriptVersion, c);
		c.weightx = 1.0;
		c.gridwidth = 2;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jtfScriptVersion, c);
		c.gridy++;
		c.gridwidth = 1;
		c.weightx = 0;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlScriptType, c);
		c.weightx = 1.0;
		c.gridwidth = 2;
		c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jcbScriptType, c);
		c.gridy++;
		c.gridwidth = 1;
		c.weightx = 0;
		c.fill = GridBagConstraints.NONE;
		gridbagComposer.addComponentIntoGrid(jlScriptAsynchrone, c);
		c.weightx = 1.0;
		//c.fill = GridBagConstraints.HORIZONTAL;
		gridbagComposer.addComponentIntoGrid(jrbScriptAsynchroneYes, c);
		gridbagComposer.addComponentIntoGrid(jrbScriptAsynchroneNo, c);
		c.gridwidth = 3;
		c.gridy++;
		c.anchor = GridBagConstraints.CENTER;
		gridbagComposer.addComponentIntoGrid(jbSaveScriptProperties, c);
		
		jpCenterPane.setLayout(new BorderLayout());
		jpCenterPane.add(jtpScriptEditorTabs, BorderLayout.CENTER);
		
		
		c = new GridBagConstraints();
		gridbagComposer.setParentPanel(jpLeftPane);
		c.anchor = GridBagConstraints.NORTHWEST;
		c.gridy = 0; 
		gridbagComposer.addComponentIntoGrid(jbNewScript, c);
		gridbagComposer.addComponentIntoGrid(jbImportScript, c);
		gridbagComposer.addComponentIntoGrid(jbExportScript, c);
		c.gridy++;
		c.gridwidth = 3;
		c.weightx = 1.0;
		c.weighty = 0.7;
		c.fill = GridBagConstraints.BOTH;
		gridbagComposer.addComponentIntoGrid(jsListeScript, c);
		c.gridy++;
		c.fill = GridBagConstraints.HORIZONTAL;
		c.weighty = 0.3;
		gridbagComposer.addComponentIntoGrid(jpProperties, c);
		
		JSplitPane jpGlobalPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, true, jpLeftPane, jpCenterPane);
		jpGlobalPane.setOneTouchExpandable(true);
		jpGlobalPane.setResizeWeight(0.10);
		
		setLayout(new BorderLayout());
		add(jpGlobalPane, BorderLayout.CENTER);
	}
	
	private void completePanel() {
		File scriptsPath = getUserScriptsPath();
		
		List<File> scriptsFolders = FileUtils.listAllFiles(scriptsPath, ".*", true); //$NON-NLS-1$
		
		for(File scriptFolder : scriptsFolders) {
			if(scriptFolder.isDirectory()) {
				File scriptFile = new File(scriptFolder, "scriptext.xml"); //$NON-NLS-1$
				if(scriptFile.exists()) {
					try {
						ScriptExtention extention = XMLSerializer.loadMarshallStructure(scriptFile, ScriptExtention.class);
						extention.setMainPath(scriptFolder.getPath());
						
						DefaultMutableTreeNode nodeScript = new DefaultMutableTreeNode(extention);
						if(extention.getType() == Plugin.Type.STARTUP)
							nodeStartup.add(nodeScript);
						else if(extention.getType() == Plugin.Type.UI_STARTUP)
							nodeUiStartup.add(nodeScript);
						else if(extention.getType() == Plugin.Type.ON_DEMAND)
							nodeOnDemand.add(nodeScript);
						
						for(File annexe : scriptFolder.listFiles()) {
							if(!annexe.getName().equals(extention.getScriptFile()) && !annexe.getName().equals("scriptext.xml")) { //$NON-NLS-1$
								DefaultMutableTreeNode nodeAnnexe = new DefaultMutableTreeNode(annexe);
								nodeScript.add(nodeAnnexe);
							}
						}
						
						treeModel.reload();
					} catch (JAXBException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			} else if(scriptFolder.getName().endsWith(".zip")) { //$NON-NLS-1$
				
			}
		}
	}
	
	private void saveScript(File scriptFile, String content) {
		BufferedWriter writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(scriptFile)));
			
			writer.write(content);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(writer != null)
				try {
					writer.close();
				} catch (IOException e) { }
		}
	}
	
	private Component getScriptPane(File scriptFile) {
		return getScriptPane(null, scriptFile);
	}
	
	private Component getScriptPane(ScriptExtention extension) {
		return getScriptPane(extension, null);
	}
	
	private Component getScriptPane(final ScriptExtention extension, File scriptFile) {
		if(scriptFile == null)
			scriptFile = new File(extension.getMainPath(), extension.getScriptFile());
		
		final String scriptPath = scriptFile.getPath();
		
		JPanel jpMainEditor = new JPanel();
		
		DefaultSyntaxKit.initKit();
		
		final JEditorPane jepScript = new JEditorPane();
		JScrollPane jspScript = new JScrollPane(jepScript);
		
		final JTextPane jtpOutput = new JTextPane();
		JScrollPane jspOutput = new JScrollPane(jtpOutput); 
		jtpOutput.setMinimumSize(new Dimension(500, 150));
		jtpOutput.setPreferredSize(new Dimension(500, 150));
		jtpOutput.setForeground(Color.gray);
		jtpOutput.setText("Console de debugage..."); //$NON-NLS-1$

		BufferedReader bufferedReader = null;
		try {
			bufferedReader = new BufferedReader(
				new InputStreamReader(
					new FileInputStream(scriptPath), "UTF-8")); //$NON-NLS-1$
			StringBuilder stringBuilder = new StringBuilder();
			String line;
			boolean firstLine = true;
			while((line = bufferedReader.readLine()) != null) {
				if (firstLine && line.startsWith(UTF8_BOM)) {
					line = line.substring(1);
		        }
				stringBuilder.append(line + "\n"); //$NON-NLS-1$
				
				firstLine = false;
			}
			
			jepScript.setContentType("text/javascript"); //$NON-NLS-1$
			jepScript.setText(stringBuilder.toString());
			jepScript.setCaretPosition(0);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			jepScript.setText(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			jepScript.setText(e.getMessage());
		} finally {
			if(bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) { }
			}
		}
		
		JPanel jpAction = new JPanel(new FlowLayout(FlowLayout.LEFT));
		
		final JButton jbSauvegarder = new JButton("Sauvegarder");
		jbSauvegarder.setEnabled(false);
		jbSauvegarder.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				saveScript(new File(scriptPath), jepScript.getText());
				jbSauvegarder.setEnabled(false);
			}
		});
		jpAction.add(jbSauvegarder);
		
		if(extension != null) {
			JButton jbExecuter =new JButton("Executer");
			jbExecuter.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent arg0) {
					saveScript(new File(scriptPath), jepScript.getText());
					
					try {
						ConcoursJeunesFrame concoursJeunesFrame = (ConcoursJeunesFrame)parentframe;
						
						StringWriter writer = new StringWriter();
						extension.setWriter(writer);
						extension.compileScript();
						extension.getScriptInterface().load(concoursJeunesFrame, concoursJeunesFrame.profile);
						jtpOutput.setForeground(Color.black);
						jtpOutput.setText(writer.toString());
					} catch (MalformedURLException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					} catch (ScriptException e) {
						jtpOutput.setForeground(Color.RED);
						jtpOutput.setText(e.toString());
					} catch (UndeclaredThrowableException e) {
						jtpOutput.setForeground(Color.RED);
						jtpOutput.setText(e.getUndeclaredThrowable().toString());
					} catch (Exception e) {
						jtpOutput.setForeground(Color.RED);
						jtpOutput.setText(e.toString());
					}
					
					jbSauvegarder.setEnabled(false);
				}
			});
			jpAction.add(jbExecuter);
		}
		
		jepScript.getDocument().addDocumentListener(new DocumentListener() {
			
			@Override
			public void removeUpdate(DocumentEvent arg0) {
				jbSauvegarder.setEnabled(true);
			}
			
			@Override
			public void insertUpdate(DocumentEvent arg0) {
				jbSauvegarder.setEnabled(true);
			}
			
			@Override
			public void changedUpdate(DocumentEvent arg0) {
				jbSauvegarder.setEnabled(true);
			}
		});
		
		jpMainEditor.setLayout(new BorderLayout());
		jpMainEditor.add(jpAction, BorderLayout.NORTH);
		jpMainEditor.add(jspScript, BorderLayout.CENTER);
		jpMainEditor.add(jspOutput, BorderLayout.SOUTH);
		
		return jpMainEditor;
	}
	
	private static File getUserScriptsPath() {
		return new File(ApplicationCore.userRessources.getUserPath(), "scripts"); //$NON-NLS-1$
	}
	
	
	public void showScriptManagerDialog() {
		completePanel();
		
		setSize(1024, 768);
		setVisible(true);
	}

	/* (non-Javadoc)
	 * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
	 */
	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getSource() == jbSaveScriptProperties) {
			DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
			if(selectedNode.getUserObject() instanceof ScriptExtention) {
				ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
				
				if(jcbScriptType.getSelectedItem() != ext.getType()) {
					//jtScripts.removeSelectionPath(jtScripts.getSelectionPath());
					treeModel.removeNodeFromParent(selectedNode);
					switch ((Plugin.Type)jcbScriptType.getSelectedItem()) {
						case STARTUP:
							nodeStartup.add(selectedNode);
							break;
						case UI_STARTUP:
							nodeUiStartup.add(selectedNode);
							break;
						case ON_DEMAND:
							nodeOnDemand.add(selectedNode);
							break;
						default:
							break;
					}
					treeModel.reload();	
				}
				
				ext.setScriptName(jtfScriptLibelle.getText());
				ext.setScriptVersion(jtfScriptVersion.getText());
				ext.setType((Plugin.Type)jcbScriptType.getSelectedItem());
				ext.setAsynchrone(jrbScriptAsynchroneYes.isSelected());
				
				File scriptFolder = new File(ext.getMainPath());
				File scriptsFolder = scriptFolder.getParentFile();
				File newScriptFolder = new File(scriptsFolder, jtfScriptName.getText());
				
				if(!scriptFolder.getName().equals(newScriptFolder.getName())) {
					ext.setMainPath(newScriptFolder.getPath());
					
					scriptFolder.renameTo(newScriptFolder);
				}
				
				try {
					XMLSerializer.saveMarshallStructure(new File(newScriptFolder, "scriptext.xml"), ext); //$NON-NLS-1$
				} catch (JAXBException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		} else if(e.getSource() == jbNewScript) {
			
			try {
				ScriptExtention scriptExtention = new ScriptExtention();
				scriptExtention.setScriptName("Nouveau script");
				
				File scriptPath = new File(ScriptExtLauncher.getUserScriptsPath(), "nouveauScript"); //$NON-NLS-1$
				scriptPath.mkdirs();
				scriptExtention.setMainPath(scriptPath.getPath());
				scriptExtention.setType(Plugin.Type.ON_DEMAND);
				
				
				File scriptTemplateFile = new File(ApplicationCore.staticParameters.getResourceString("path.ressources"), "templates" + File.separator + "scriptext" + File.separator +"exemple.js");    //$NON-NLS-1$//$NON-NLS-2$//$NON-NLS-3$//$NON-NLS-4$
				File scriptFile = new File(scriptPath, scriptExtention.getScriptFile());
				
				FileUtils.copyFile(scriptTemplateFile, scriptFile);
				
				DefaultMutableTreeNode scriptNode = new DefaultMutableTreeNode(scriptExtention);
				nodeOnDemand.add(scriptNode);
				
				treeModel.reload();
				
				jtScripts.setSelectionPath(new TreePath(scriptNode.getPath()));
			} catch (FileNotFoundException e1) {
				// TODO Bloc catch auto-généré
				e1.printStackTrace();
			} catch (IOException e1) {
				// TODO Bloc catch auto-généré
				e1.printStackTrace();
			}
		} else if(e.getSource() == jbExportScript) {
			
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		if(e.getSource() == jtScripts) {
			if(e.getClickCount() == 2) {
				DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					
					String scriptName = ext.getScriptName();
					if(scriptName == null || scriptName.isEmpty())
						scriptName = new File(ext.getMainPath()).getName();
					
					jtpScriptEditorTabs.addTab(scriptName, getScriptPane(ext));
					jtpScriptEditorTabs.setSelectedIndex(jtpScriptEditorTabs.getTabCount()-1);
				} else if(selectedNode.getUserObject() instanceof File) {
					String scriptName = ((File)selectedNode.getUserObject()).getName();
					//jtpScriptEditorTabs.addTab(scriptName, getScriptPane(ext));
					jtpScriptEditorTabs.setSelectedIndex(jtpScriptEditorTabs.getTabCount()-1);
					
					jtpScriptEditorTabs.addTab(scriptName, getScriptPane((File)selectedNode.getUserObject()));
					jtpScriptEditorTabs.setSelectedIndex(jtpScriptEditorTabs.getTabCount()-1);
				}
			} else if(e.getModifiers() == MouseEvent.BUTTON3) {
				
			}
		}
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

	@Override
	public void tabAdded(Component arg0) {
	}

	@Override
	public void tabClosed(Component arg0) {
		for(int i = 0; i < jtpScriptEditorTabs.getTabCount(); i++) {
			if(jtpScriptEditorTabs.getComponentAt(i) == arg0) {
				jtpScriptEditorTabs.removeTabAt(i);
				break;
			}
		}
	}

	@Override
	public void valueChanged(TreeSelectionEvent e) {
		if(e.getSource() == jtScripts && jtScripts.getSelectionPath() != null) {
			DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
			if(selectedNode.getUserObject() instanceof ScriptExtention) {
				ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
				
				jtfScriptLibelle.setText(ext.getScriptName());
				jtfScriptName.setText(ext.getScriptId());
				jtfScriptVersion.setText(ext.getScriptVersion());
				jcbScriptType.setSelectedItem(ext.getType());
				if(ext.isAsynchrone())
					jrbScriptAsynchroneYes.setSelected(true);
				else
					jrbScriptAsynchroneNo.setSelected(true);
				
				jpProperties.setVisible(true);
			} else {
				jpProperties.setVisible(false);
			}
		}
	}

}
