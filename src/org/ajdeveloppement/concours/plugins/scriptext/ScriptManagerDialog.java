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
import java.awt.GridBagConstraints;
import java.awt.Insets;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedInputStream;
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
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javax.script.ScriptException;
import javax.swing.ButtonGroup;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTabbedPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.JToolBar;
import javax.swing.JTree;
import javax.swing.RowSorter.SortKey;
import javax.swing.SortOrder;
import javax.swing.border.TitledBorder;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.table.AbstractTableModel;
import javax.swing.table.TableRowSorter;
import javax.swing.text.BadLocationException;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeCellRenderer;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreePath;
import javax.xml.bind.JAXBException;

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
import org.ajdeveloppement.swingxext.error.ui.DisplayableErrorHelper;
import org.concoursjeunes.ApplicationCore;
import org.concoursjeunes.plugins.Plugin;
import org.fife.rsta.ac.LanguageSupportFactory;
import org.fife.rsta.ac.java.buildpath.JarLibraryInfo;
import org.fife.rsta.ac.js.JavaScriptLanguageSupport;
import org.fife.ui.rsyntaxtextarea.ErrorStrip;
import org.fife.ui.rsyntaxtextarea.RSyntaxTextArea;
import org.fife.ui.rsyntaxtextarea.SyntaxConstants;
import org.fife.ui.rsyntaxtextarea.parser.ParserNotice;
import org.fife.ui.rtextarea.Gutter;
import org.fife.ui.rtextarea.RTextScrollPane;

import sun.org.mozilla.javascript.Context;

/**
 * @author Aurélien JEOFFRAY
 *
 */
@Localizable(textMethod="setTitle",value="scriptmanager.title")
public class ScriptManagerDialog extends JFrame implements ActionListener,MouseListener,AJTabbedPaneListener,TreeSelectionListener {
	
	public static final String UTF8_BOM = "\uFEFF"; //$NON-NLS-1$
	
	private static Map<String, ImageIcon> iconsCache = new HashMap<String, ImageIcon>();
	private AjResourcesReader iconsResources = new AjResourcesReader("org.ajdeveloppement.concours.plugins.scriptext.icons.icons", ScriptManagerDialog.class.getClassLoader()); //$NON-NLS-1$

	private JFrame parentframe;
	private AjResourcesReader localisation;
	
	@Localizable(tooltip="scriptmanager.newscript",value="")
	private JButton jbNewScript = new JButton();
	@Localizable(tooltip="scriptmanager.importscript",value="")
	private JButton jbImportScript = new JButton();
	@Localizable(tooltip="scriptmanager.exportscript",value="")
	private JButton jbExportScript = new JButton();
	
	private DefaultMutableTreeNode treeRoot = new DefaultMutableTreeNode("scripts"); //$NON-NLS-1$
	private DefaultMutableTreeNode nodeStartup = new DefaultMutableTreeNode();
	private DefaultMutableTreeNode nodeUiStartup = new DefaultMutableTreeNode();
	private DefaultMutableTreeNode nodeOnDemand = new DefaultMutableTreeNode();
	private DefaultTreeModel treeModel = new DefaultTreeModel(treeRoot);
	private AJTree jtScripts = new AJTree(treeModel);
	
	private JPopupMenu jpmTreeAction;
	@Localizable("scriptmanager.newscript")
	private JMenuItem jmiNewScript = new JMenuItem();
	@Localizable("scriptmanager.editscript")
	private JMenuItem jmiEditScript = new JMenuItem();
	@Localizable("scriptmanager.executescript")
	private JMenuItem jmiExecuteScript = new JMenuItem();
	@Localizable("scriptmanager.exportscript")
	private JMenuItem jmiExportScript = new JMenuItem();
	@Localizable("scriptmanager.importscript")
	private JMenuItem jmiImportScript = new JMenuItem();
	@Localizable("scriptmanager.deletescript")
	private JMenuItem jmiDeleteScript = new JMenuItem();
	@Localizable("scriptmanager.addfile")
	private JMenuItem jmiAddFile = new JMenuItem();
	@Localizable("scriptmanager.newfile")
	private JMenuItem jmiNewFile = new JMenuItem();
	@Localizable("scriptmanager.createdirectory")
	private JMenuItem jmiCreateDirectory = new JMenuItem();
	
	
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
	@SuppressWarnings("rawtypes")
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

	@SuppressWarnings("unchecked")
	private void init() {
		JPanel jpLeftPane = new JPanel();
		JPanel jpCenterPane = new JPanel();
		
		JScrollPane jsListeScript = new JScrollPane(jtScripts);
		
		jbNewScript.setIcon(getIcon("file.icon.script.new")); //$NON-NLS-1$
		jbNewScript.setMargin(new Insets(0, 2, 0, 2));
		jbNewScript.addActionListener(this);
		jbImportScript.setIcon(getIcon("file.icon.import")); //$NON-NLS-1$
		jbImportScript.setMargin(new Insets(0, 2, 0, 2));
		jbImportScript.addActionListener(this);
		jbExportScript.setIcon(getIcon("file.icon.export")); //$NON-NLS-1$
		jbExportScript.setMargin(new Insets(0, 2, 0, 2));
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
						setIcon(ScriptManagerDialog.this.getIcon("file.icon.script.js")); //$NON-NLS-1$
					} else if (o instanceof File) {
						setText(((File)o).getName());
						if(((File)o).isDirectory())
							setIcon(ScriptManagerDialog.this.getIcon("file.icon.script.folder")); //$NON-NLS-1$
						else
							setIcon(ScriptManagerDialog.this.getIcon("file.icon.script.document")); //$NON-NLS-1$
					} else if (o instanceof String && row != 0) {
						setIcon(ScriptManagerDialog.this.getIcon("file.icon.script.type")); //$NON-NLS-1$
					} else if(row == 0) {
						setIcon(ScriptManagerDialog.this.getIcon("file.icon.script.root")); //$NON-NLS-1$
					}
				}
					
				return this;
			}
		});
		
		jpmTreeAction = new JPopupMenu("Edit"); //$NON-NLS-1$
		jpmTreeAction.add(jmiNewScript);
		jpmTreeAction.add(jmiEditScript);
		jpmTreeAction.add(jmiExecuteScript);
		jpmTreeAction.add(jmiImportScript);
		jpmTreeAction.add(jmiExportScript);
		jpmTreeAction.addSeparator();
		jpmTreeAction.add(jmiCreateDirectory);
		jpmTreeAction.add(jmiNewFile);
		jpmTreeAction.add(jmiAddFile);
		jpmTreeAction.add(jmiDeleteScript);
		
		jmiNewScript.addActionListener(this);
		jmiEditScript.addActionListener(this);
		jmiExecuteScript.addActionListener(this);
		jmiImportScript.addActionListener(this);
		jmiExportScript.addActionListener(this);
		jmiDeleteScript.addActionListener(this);
		jmiAddFile.addActionListener(this);
		jmiNewFile.addActionListener(this);
		jmiCreateDirectory.addActionListener(this);
		
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
						
						jtScripts.expandPath(new TreePath(nodeScript.getParent()));
						
						for(File annexe : scriptFolder.listFiles()) {
							if(!annexe.getName().equals(extention.getScriptFile()) && !annexe.getName().equals("scriptext.xml")) { //$NON-NLS-1$
								DefaultMutableTreeNode nodeAnnexe = new DefaultMutableTreeNode(annexe);
								nodeScript.add(nodeAnnexe);
								
								if(annexe.isDirectory()) {
									addFileNode(annexe, nodeAnnexe);
								}
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
	
	private void executeScript(ScriptExtention extension, JTextPane jtpOutput, boolean evalOnly) {
		try {
			ConcoursJeunesFrame concoursJeunesFrame = (ConcoursJeunesFrame)parentframe;
			
			StringWriter writer = new StringWriter();
			extension.setWriter(writer);
			
			if(!evalOnly && extension.getScriptInterface() != null)
				extension.getScriptInterface().unload();
			extension.compileScript();
			if(!evalOnly)
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
		
		final NoticeTableModel noticeTableModel = new NoticeTableModel();
		TableRowSorter<NoticeTableModel> sorter = new TableRowSorter<NoticeTableModel>(noticeTableModel);
		List<SortKey> dSortKeys = new ArrayList<SortKey>();
		dSortKeys.add(new SortKey(1, SortOrder.ASCENDING));
		dSortKeys.add(new SortKey(0, SortOrder.ASCENDING));
		sorter.setSortKeys(dSortKeys);
		
		JPanel jpMainEditor = new JPanel();
		
		JToolBar jtbAction = new JToolBar();
		
		String fileSyntax = SyntaxConstants.SYNTAX_STYLE_NONE;
		if(scriptFile.getName().endsWith(".xml")) { //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_XML;
		} else if(scriptFile.getName().endsWith(".html")) { //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_HTML;
		} else if(scriptFile.getName().endsWith(".css")) { //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_CSS;
		} else if(scriptFile.getName().endsWith(".properties")) { //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_PROPERTIES_FILE;
		} else if(scriptFile.getName().endsWith(".sql")) { //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_SQL;
		} else if(scriptFile.getName().endsWith(".js")) {  //$NON-NLS-1$
			fileSyntax = SyntaxConstants.SYNTAX_STYLE_JAVASCRIPT;
		}

		final RSyntaxTextArea jepScript = new RSyntaxTextArea(20, 60);
		LanguageSupportFactory lsf = LanguageSupportFactory.get();
		
		if(fileSyntax.equals(SyntaxConstants.SYNTAX_STYLE_JAVASCRIPT)) {
			JavaScriptLanguageSupport support = (JavaScriptLanguageSupport)lsf.getSupportFor(SyntaxConstants.SYNTAX_STYLE_JAVASCRIPT);
			support.setStrictMode(true);
			support.setLanguageVersion(Context.VERSION_1_6);
			try {
				support.getJarManager().addCurrentJreClassFileSource();
				for(String lib : System.getProperty("java.class.path").split(System.getProperty("path.separator"))) { //$NON-NLS-1$ //$NON-NLS-2$
					if(lib.endsWith(".jar")) { //$NON-NLS-1$
						JarLibraryInfo jarlib = new JarLibraryInfo(lib);
						/*if(lib.endsWith("ajcommons.jar")) {
							SourceLocation sourceLocation = new DirSourceLocation("/data/developpement/projets_maintenance/ajcommons/src");
							jarlib.setSourceLocation(sourceLocation);
						}*/
						support.getJarManager().addClassFileSource(jarlib);
					}
				}
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		lsf.register(jepScript);
		jepScript.setSyntaxEditingStyle(fileSyntax);
		jepScript.setCodeFoldingEnabled(true);
		jepScript.setAntiAliasingEnabled(true);
		jepScript.setAutoIndentEnabled(true);
		jepScript.setBracketMatchingEnabled(true);
		jepScript.setClearWhitespaceLinesEnabled(true);
		jepScript.setCloseCurlyBraces(true);
		jepScript.setMarkOccurrences(true);
		jepScript.setMarginLineEnabled(true);
		jepScript.addPropertyChangeListener(new PropertyChangeListener() {
			
			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				String name = evt.getPropertyName();

				// A text area has been re-parsed
				if (RSyntaxTextArea.PARSER_NOTICES_PROPERTY.equals(name)) {
					RSyntaxTextArea textArea = (RSyntaxTextArea)evt.getSource();
					RTextScrollPane sp = (RTextScrollPane)textArea.getParent().
																getParent();
					Gutter g = sp.getGutter();
					// TODO: Note this isn't entirely correct; if some other
					// component has added tracking icons to the gutter, this will
					// remove those as well!
					g.removeAllTrackingIcons();
					noticeTableModel.clear();
					@SuppressWarnings({ "cast", "unchecked" })
					List<ParserNotice> notices = (List<ParserNotice>)textArea.getParserNotices();
					for (ParserNotice notice : notices) {
						int line = notice.getLine();
						Icon icon = null;
						if(notice.getLevel() == 0)
							icon = getIcon("file.icon.script.error"); //$NON-NLS-1$
						else
							icon = getIcon("file.icon.script.warning"); //$NON-NLS-1$
						try {
							g.addLineTrackingIcon(line, icon, notice.getMessage());
							noticeTableModel.addNotice(notice);
						} catch (BadLocationException ble) { // Never happens
							ble.printStackTrace();
						}
					}
					
				}
			}
		});
		
		RTextScrollPane jspScript = new RTextScrollPane(jepScript);
		jspScript.setFoldIndicatorEnabled(true);
		jspScript.setIconRowHeaderEnabled(true);
		
		ErrorStrip es = new ErrorStrip(jepScript);
		es.setLevelThreshold(org.fife.ui.rsyntaxtextarea.parser.ParserNotice.WARNING);
		JPanel temp = new JPanel(new BorderLayout());
		temp.add(jspScript);
		temp.add(es, BorderLayout.LINE_END);
		
		final JTabbedPane jtbConsole= new JTabbedPane();
		
		final JTextPane jtpOutput = new JTextPane();
		JScrollPane jspOutput = new JScrollPane(jtpOutput); 
		jtpOutput.setMinimumSize(new Dimension(500, 150));
		jtpOutput.setPreferredSize(new Dimension(500, 150));
		jtpOutput.setForeground(Color.gray);
		jtpOutput.setText("Console de debugage..."); //$NON-NLS-1$
		
		final JTable jtNotice = new JTable();
		JScrollPane jspNotice = new JScrollPane(jtNotice); 
		jtNotice.setModel(noticeTableModel);
		jtNotice.setPreferredSize(new Dimension(500, 150));
		jtNotice.setRowSorter(sorter);
		jtNotice.getColumnModel().getColumn(0).setMaxWidth(60);
		jtNotice.getColumnModel().getColumn(1).setMaxWidth(60);
		jtNotice.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if(e.getClickCount() == 2) {
//					jtNotice.getSelectedRow().
//					jepScript.getDocument()  
//                    	.getDefaultRootElement().getElement(index-2)  
//                    	.getStartOffset()
				}
			}
		});
		
		jspNotice.setPreferredSize(new Dimension(500, 150));
		
		jtbConsole.addTab(localisation.getResourceString("scriptmanager.debug.tabbedpane.console"), jspOutput); //$NON-NLS-1$
		jtbConsole.addTab(localisation.getResourceString("scriptmanager.debug.tabbedpane.notice"), jspNotice); //$NON-NLS-1$

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
			
			//jepScript.setContentType("text/javascript"); //$NON-NLS-1$
			jepScript.setText(stringBuilder.toString());
			//jepScript.setCaretPosition(0);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			//jepScript.setText(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			//jepScript.setText(e.getMessage());
		} finally {
			if(bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException e) { }
			}
		}
		
		final JButton jbSauvegarder = new JButton(localisation.getResourceString("scriptmanager.script.save"), //$NON-NLS-1$
				getIcon("file.icon.save")); //$NON-NLS-1$
		jbSauvegarder.setEnabled(false);
		jbSauvegarder.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent arg0) {
				saveScript(new File(scriptPath), jepScript.getText());
				jbSauvegarder.setEnabled(false);
			}
		});
		jtbAction.add(jbSauvegarder);
		
		jepScript.addKeyListener(new KeyAdapter() {
			@Override
			public void keyPressed(KeyEvent e) {
				if(e.isControlDown() && e.getKeyCode() == KeyEvent.VK_S) {
					saveScript(new File(scriptPath), jepScript.getText());
					jbSauvegarder.setEnabled(false);
				}
			}
		});
		
		if(extension != null) {
			JButton jbEvaluer = new JButton(localisation.getResourceString("scriptmanager.evalscript"), //$NON-NLS-1$
					getIcon("file.icon.script.eval")); //$NON-NLS-1$
			jbEvaluer.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent arg0) {
					saveScript(new File(scriptPath), jepScript.getText());
					
					executeScript(extension, jtpOutput, true);
					
					jbSauvegarder.setEnabled(false);
					
					jtbConsole.setSelectedIndex(0);
				}
			});
			jtbAction.add(jbEvaluer);
			
			JButton jbExecuter = new JButton(localisation.getResourceString("scriptmanager.executescript"), //$NON-NLS-1$
					getIcon("file.icon.script.run")); //$NON-NLS-1$
			jbExecuter.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent arg0) {
					saveScript(new File(scriptPath), jepScript.getText());
					
					executeScript(extension, jtpOutput, false);
					
					jbSauvegarder.setEnabled(false);
					
					jtbConsole.setSelectedIndex(0);
				}
			});
			jtbAction.add(jbExecuter);
		}
		
		//jtbAction.ad
		
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
		jpMainEditor.add(jtbAction, BorderLayout.NORTH);
		jpMainEditor.add(temp, BorderLayout.CENTER);
		jpMainEditor.add(jtbConsole, BorderLayout.SOUTH);
		
		return jpMainEditor;
	}
	
	private static File getUserScriptsPath() {
		return new File(ApplicationCore.userRessources.getUserPath(), "scripts"); //$NON-NLS-1$
	}
	
	private void addEntryToZip(File fileEntry, String newEntryName, ZipOutputStream zos)
			throws IOException {
		ZipEntry ze = new ZipEntry(newEntryName);
		BufferedInputStream bis = new BufferedInputStream(new FileInputStream(fileEntry));
		zos.putNextEntry(ze);
		
		byte[] buffer = new byte[512 * 1024];
		int nbLecture;
		while ((nbLecture = bis.read(buffer)) != -1) {
			zos.write(buffer, 0, nbLecture);
		}
		bis.close();
		
		//jos.finish();
		zos.closeEntry();
	}
	
	private void addToTypeNode(DefaultMutableTreeNode node, Plugin.Type type) {
		switch (type) {
			case STARTUP:
				nodeStartup.add(node);
				break;
			case UI_STARTUP:
				nodeUiStartup.add(node);
				break;
			case ON_DEMAND:
				nodeOnDemand.add(node);
				break;
			default:
				break;
		}
	}
	
	private void addFileNode(File path, DefaultMutableTreeNode parentNode) {
		for(File child : path.listFiles()) {
			DefaultMutableTreeNode nodeChild = new DefaultMutableTreeNode(child);
			parentNode.add(nodeChild);
			
			if(child.isDirectory()) {
				addFileNode(child, nodeChild);
			}
		}
	}
	
	private void openScriptTabForSelectedTreePath() {
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
			if(scriptName.endsWith(".js") //$NON-NLS-1$
					|| scriptName.endsWith(".xml") //$NON-NLS-1$
					|| scriptName.endsWith(".html") //$NON-NLS-1$
					|| scriptName.endsWith(".css") //$NON-NLS-1$
					|| scriptName.endsWith(".properties") //$NON-NLS-1$
					|| scriptName.endsWith(".sql") //$NON-NLS-1$
					|| scriptName.endsWith(".txt")) { //$NON-NLS-1$
				//jtpScriptEditorTabs.addTab(scriptName, getScriptPane(ext));
				jtpScriptEditorTabs.setSelectedIndex(jtpScriptEditorTabs.getTabCount()-1);
				
				jtpScriptEditorTabs.addTab(scriptName, getScriptPane((File)selectedNode.getUserObject()));
				jtpScriptEditorTabs.setSelectedIndex(jtpScriptEditorTabs.getTabCount()-1);
			}
		}
	}
	
	private ImageIcon getIcon(String propertyKey) {
		ImageIcon icon = iconsCache.get(propertyKey);
		if(icon == null) {
			URL urlIcon = ScriptManagerDialog.class.getResource(iconsResources.getResourceString(propertyKey));
			if(urlIcon != null) {
				icon = new ImageIcon(urlIcon);
				iconsCache.put(propertyKey, icon);
			}
		}
		
		return icon;
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
			if(jtScripts.getSelectionPath() != null) {
				DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					
					if(jcbScriptType.getSelectedItem() != ext.getType()) {
						//jtScripts.removeSelectionPath(jtScripts.getSelectionPath());
						treeModel.removeNodeFromParent(selectedNode);
						addToTypeNode(selectedNode, (Plugin.Type)jcbScriptType.getSelectedItem());
						
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
			}
		} else if(e.getSource() == jbNewScript || e.getSource() == jmiNewScript) {
			
			try {
				ScriptExtention scriptExtention = new ScriptExtention();
				scriptExtention.setScriptName(localisation.getResourceString("scriptmanager.newscript")); //$NON-NLS-1$
				
				File scriptPath = new File(ScriptExtLauncher.getUserScriptsPath(), "nouveauScript"); //$NON-NLS-1$
				scriptPath.mkdirs();
				scriptExtention.setMainPath(scriptPath.getPath());
				
				if(jtScripts.getSelectionPath() != null) {
					if(((DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent()) == nodeStartup)
						scriptExtention.setType(Plugin.Type.ON_DEMAND);
					else if(((DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent()) == nodeUiStartup)
						scriptExtention.setType(Plugin.Type.UI_STARTUP);
					else if(((DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent()) == nodeOnDemand)
						scriptExtention.setType(Plugin.Type.ON_DEMAND);
				}				
				else
					scriptExtention.setType(Plugin.Type.ON_DEMAND);
				
				try {
					XMLSerializer.saveMarshallStructure(new File(scriptPath, "scriptext.xml"), scriptExtention); //$NON-NLS-1$
				} catch (JAXBException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
				
				
				File scriptTemplateFile = new File(ApplicationCore.staticParameters.getResourceString("path.ressources"), "templates" + File.separator + "scriptext" + File.separator +"exemple.js");    //$NON-NLS-1$//$NON-NLS-2$//$NON-NLS-3$//$NON-NLS-4$
				File scriptFile = new File(scriptPath, scriptExtention.getScriptFile());
				
				FileUtils.copyFile(scriptTemplateFile, scriptFile);
				
				DefaultMutableTreeNode scriptNode = new DefaultMutableTreeNode(scriptExtention);
				addToTypeNode(scriptNode, scriptExtention.getType());
				
				treeModel.reload();
				
				jtScripts.setSelectionPath(new TreePath(scriptNode.getPath()));
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			
			openScriptTabForSelectedTreePath();
		} else if(e.getSource() == jbExportScript || e.getSource() == jmiExportScript) {
			if(jtScripts.getSelectionPath() != null) {
				DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					
					JFileChooser chooser = new JFileChooser();
				    FileNameExtensionFilter filter = new FileNameExtensionFilter(
				    		localisation.getResourceString("description.type.file.zip"), "zip"); //$NON-NLS-1$ //$NON-NLS-2$
				    chooser.setFileFilter(filter);
				    chooser.setSelectedFile(new File(ext.getScriptId() + ".zip")); //$NON-NLS-1$
				    
				    int returnVal = chooser.showSaveDialog(parentframe);
				    if(returnVal == JFileChooser.APPROVE_OPTION && chooser.getSelectedFile() != null) {
				    	ZipOutputStream zous = null;
				    	try {
				    		zous = new ZipOutputStream(new FileOutputStream(chooser.getSelectedFile()));
				    		
				    		List<File> files = FileUtils.listAllFiles(new File(ext.getMainPath()), null);
				    		for(File f : files) {
				    			String relativePath = ext.getScriptId() + f.getPath().replace(ext.getMainPath(), ""); //$NON-NLS-1$
				    			addEntryToZip(f, relativePath, zous);
				    		}
				    	} catch(IOException e1) {
				    		e1.printStackTrace();
				    	} finally {
				    		try {
				    			if(zous != null)
				    				zous.close();
							} catch (IOException e1) {
							}
				    	}
				    }
					
					//File scriptPath = new File(ScriptExtLauncher.getUserScriptsPath(), "nouveauScript"); //$NON-NLS-1$
					//FileUtils.
				}
			}
			
		} else if(e.getSource() == jbImportScript || e.getSource() == jmiImportScript) {

			JFileChooser chooser = new JFileChooser();
		    FileNameExtensionFilter filter = new FileNameExtensionFilter(
		    		localisation.getResourceString("description.type.file.zip"), "zip"); //$NON-NLS-1$ //$NON-NLS-2$
		    chooser.setFileFilter(filter);
		    
		    int returnVal = chooser.showOpenDialog(parentframe);
		    if(returnVal == JFileChooser.APPROVE_OPTION && chooser.getSelectedFile() != null) {
		    	File scriptFolder = null; 
		    	
		    	ZipInputStream zis = null;
		    	try {
		    		zis = new ZipInputStream(new FileInputStream(chooser.getSelectedFile()));
		    		ZipEntry entry = null;
		    		while((entry = zis.getNextEntry()) != null) {
		    			File outputFile = new File(getUserScriptsPath(), entry.getName());
		    			if(!outputFile.isDirectory() && !entry.getName().endsWith("/")) //$NON-NLS-1$
		    				outputFile.getParentFile().mkdirs();
		    			else
		    				outputFile.mkdirs();
		    			
		    			if(!outputFile.isDirectory()) {
			    			if(outputFile.getName().equals("scriptext.xml")) //$NON-NLS-1$
			    				scriptFolder = outputFile.getParentFile();
			    			
			    			FileUtils.dumpStreamToFile(zis, outputFile, false);
		    			}
		    		}
		    	} catch(IOException e1) {
		    		e1.printStackTrace();
		    	} finally {
		    		try {
		    			if(zis != null)
		    				zis.close();
					} catch (IOException e1) {
					}
		    	}
		    	
		    	if(scriptFolder != null) {
		    		ScriptExtention scriptExtention = ScriptExtLauncher.loadScript(scriptFolder);
		    		
		    		DefaultMutableTreeNode scriptNode = new DefaultMutableTreeNode(scriptExtention);
		    		addToTypeNode(scriptNode, scriptExtention.getType());
					
					for(File annexe : scriptFolder.listFiles()) {
						if(!annexe.getName().equals(scriptExtention.getScriptFile()) && !annexe.getName().equals("scriptext.xml")) { //$NON-NLS-1$
							DefaultMutableTreeNode nodeAnnexe = new DefaultMutableTreeNode(annexe);
							scriptNode.add(nodeAnnexe);
							
							if(annexe.isDirectory()) {
								addFileNode(annexe, nodeAnnexe);
							}
						}
					}
					
					treeModel.reload();
					
					jtScripts.setSelectionPath(new TreePath(scriptNode.getPath()));
					
					openScriptTabForSelectedTreePath();
		    	}
		    }
		} else if(e.getSource() == jmiEditScript) {
			openScriptTabForSelectedTreePath();
		} else if(e.getSource() == jmiDeleteScript) {
			//
			if(jtScripts.getSelectionPath() != null) {
				DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					if (JOptionPane.showConfirmDialog(this, 
							localisation.getResourceString("scriptmanager.confirm.delete", ext.getScriptName()), //$NON-NLS-1$
							localisation.getResourceString("scriptmanager.confirm.delete.title"), //$NON-NLS-1$
							JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE) == JOptionPane.YES_OPTION) {
					
						selectedNode.removeFromParent();
						
						ScriptExtLauncher.removeScript(ext);
						
						treeModel.reload();
						
						try {
							FileUtils.deleteFilesPath(new File(ext.getMainPath()));
						} catch (IOException e1) {
							DisplayableErrorHelper.displayException(e1);
							e1.printStackTrace();
						}
					}
				} else if(selectedNode.getUserObject() instanceof File) {
					File deleteFile = (File)selectedNode.getUserObject();
					if (JOptionPane.showConfirmDialog(this, 
							localisation.getResourceString("scriptmanager.confirm.file.delete", deleteFile.getName()), //$NON-NLS-1$
							localisation.getResourceString("scriptmanager.confirm.delete.title"), //$NON-NLS-1$
							JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE) == JOptionPane.YES_OPTION) {
						if(deleteFile.isDirectory()) {
							try {
								FileUtils.deleteFilesPath(deleteFile);
							} catch (IOException e1) {
								DisplayableErrorHelper.displayException(e1);
								e1.printStackTrace();
							}
						} else {
							deleteFile.delete();
						}
						
						selectedNode.removeFromParent();
						treeModel.reload();
					}
				}
			}
		} else if(e.getSource() == jmiExecuteScript) {
			if(jtScripts.getSelectionPath() != null) {
				DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					
					try {
						if(ext.getScriptInterface() != null)
							ext.getScriptInterface().unload();
						ext.compileScript();
						ext.getScriptInterface().load((ConcoursJeunesFrame)parentframe, ((ConcoursJeunesFrame)parentframe).profile);
					} catch (MalformedURLException ex) {
						DisplayableErrorHelper.displayException(ex);
						ex.printStackTrace();
					} catch (IOException ex) {
						ex.printStackTrace();
					} catch (ScriptException ex) {
						DisplayableErrorHelper.displayException(ex);
					} catch (UndeclaredThrowableException ex) {
						DisplayableErrorHelper.displayException(ex.getUndeclaredThrowable());
					} catch (Exception ex) {
						DisplayableErrorHelper.displayException(ex);
					}
				}
			}
		} else if(e.getSource() == jmiAddFile) {
			DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
			
			JFileChooser chooser = new JFileChooser();		    
		    int returnVal = chooser.showOpenDialog(parentframe);
		    if(returnVal == JFileChooser.APPROVE_OPTION && chooser.getSelectedFile() != null) {
		    	File parentDirectory = null;
				
				if(selectedNode.getUserObject() instanceof ScriptExtention) {
					ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
					
					parentDirectory = new File(ext.getMainPath());
				} else {
					parentDirectory = (File)selectedNode.getUserObject();
				}
				
				if(parentDirectory != null) {
					try {
						File importedFile = new File(parentDirectory, chooser.getSelectedFile().getName());
						FileUtils.copyFile(chooser.getSelectedFile(), importedFile);
						
						DefaultMutableTreeNode fileNode = new DefaultMutableTreeNode(importedFile);
			    		selectedNode.add(fileNode);
			    		
			    		treeModel.reload();
					} catch (FileNotFoundException e1) {
						DisplayableErrorHelper.displayException(e1);
						e1.printStackTrace();
					} catch (IOException e1) {
						DisplayableErrorHelper.displayException(e1);
						e1.printStackTrace();
					}
				}
		    }
		}  else if(e.getSource() == jmiCreateDirectory) {
			DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
			File parentDirectory = null;
			
			if(selectedNode.getUserObject() instanceof ScriptExtention) {
				ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
				
				parentDirectory = new File(ext.getMainPath());
			} else {
				parentDirectory = (File)selectedNode.getUserObject();
			}
			
			if(parentDirectory != null) {
				String directoryName = null;
				
				Object[] message = new Object[2];
		        message[0] = localisation.getResourceString("scriptmanager.newdirectory.name.query"); //Message apparaissant dans le corps du dialog //$NON-NLS-1$
		        message[1] = new JTextField();
		 
		        //Options (nom des boutons)
		        String option[] = {
		        		localisation.getResourceString("scriptmanager.newdirectory.validate"), //$NON-NLS-1$
		        		localisation.getResourceString("scriptmanager.newdirectory.cancel") //$NON-NLS-1$
		        	};
		 
		        int result = JOptionPane.showOptionDialog(
		                null, // fenêtre parente
		                message, // corps du dialogue
		                localisation.getResourceString("scriptmanager.newdirectory.title"),// Titre du dialogue //$NON-NLS-1$
		                JOptionPane.DEFAULT_OPTION, // type de dialogue
		                JOptionPane.QUESTION_MESSAGE, // type icône
		                null, // icône optionnelle
		                option, // boutons
		                message[1] // objet ayant le focus par défaut
		        );
		 
		        if(result == 0){
		        	directoryName = new String(((JTextField)message[1]).getText());
		        }
		        
		        if(directoryName != null) {
		        	File newDirectory = new File(parentDirectory,directoryName);
		        	
		        	newDirectory.mkdirs();
		        	
		        	DefaultMutableTreeNode fileNode = new DefaultMutableTreeNode(newDirectory);
		    		selectedNode.add(fileNode);
		    		
		    		treeModel.reload();
		        }
			}
		} else if(e.getSource() == jmiNewFile) {
			DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)jtScripts.getSelectionPath().getLastPathComponent();
			File parentDirectory = null;
			
			if(selectedNode.getUserObject() instanceof ScriptExtention) {
				ScriptExtention ext = (ScriptExtention)selectedNode.getUserObject();
				
				parentDirectory = new File(ext.getMainPath());
			} else {
				parentDirectory = (File)selectedNode.getUserObject();
			}
			
			if(parentDirectory != null) {
				String fileName = null;
				
				Object[] message = new Object[2];
		        message[0] = localisation.getResourceString("scriptmanager.newfile.name.query"); //Message apparaissant dans le corps du dialog //$NON-NLS-1$
		        message[1] = new JTextField();
		 
		        //Options (nom des boutons)
		        String option[] = {
		        		localisation.getResourceString("scriptmanager.newfile.validate"), //$NON-NLS-1$
		        		localisation.getResourceString("scriptmanager.newfile.cancel") //$NON-NLS-1$
		        	};
		 
		        int result = JOptionPane.showOptionDialog(
		                null, // fenêtre parente
		                message, // corps du dialogue
		                localisation.getResourceString("scriptmanager.newfile.title"),// Titre du dialogue //$NON-NLS-1$
		                JOptionPane.DEFAULT_OPTION, // type de dialogue
		                JOptionPane.QUESTION_MESSAGE, // type icône
		                null, // icône optionnelle
		                option, // boutons
		                message[1] // objet ayant le focus par défaut
		        );
		 
		        if(result == 0){
		        	fileName = ((JTextField)message[1]).getText();
		        }
		        
		        if(fileName != null) {
		        	File newFile = new File(parentDirectory,fileName);
		        	
		        	try {
						if(newFile.createNewFile()) {
							DefaultMutableTreeNode fileNode = new DefaultMutableTreeNode(newFile);
				    		selectedNode.add(fileNode);
				    		
				    		treeModel.reload();
						}
					} catch (IOException e1) {
						DisplayableErrorHelper.displayException(e1);
						e1.printStackTrace();
					}
		        }
			}
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		if(e.getSource() == jtScripts) {
			if(e.getClickCount() == 2 && jtScripts.getSelectionPath() != null) {
				openScriptTabForSelectedTreePath();
			} else if(e.getButton() == MouseEvent.BUTTON3) {
				Point coord = e.getPoint();

				TreePath destinationPath = jtScripts.getPathForLocation(coord.x, coord.y);

				if(destinationPath != null) {
					jtScripts.setSelectionPath(destinationPath);
				
					DefaultMutableTreeNode selectedNode = (DefaultMutableTreeNode)destinationPath.getLastPathComponent();
					if(selectedNode.getUserObject() instanceof ScriptExtention) {
						jmiNewScript.setVisible(false);
						jmiEditScript.setVisible(true);
						jmiExecuteScript.setVisible(true);
						jmiImportScript.setVisible(false);
						jmiExportScript.setVisible(true);
						jmiNewFile.setVisible(true);
						jmiDeleteScript.setVisible(true);
						jmiAddFile.setVisible(true);
						jmiCreateDirectory.setVisible(true);
					} else if(selectedNode.getUserObject() instanceof File){
						jmiNewScript.setVisible(false);
						jmiEditScript.setVisible(false);
						jmiExecuteScript.setVisible(false);
						jmiImportScript.setVisible(false);
						jmiExportScript.setVisible(false);
						jmiDeleteScript.setVisible(true);
						jmiNewFile.setVisible(((File)selectedNode.getUserObject()).isDirectory());
						jmiAddFile.setVisible(((File)selectedNode.getUserObject()).isDirectory());
						jmiCreateDirectory.setVisible(((File)selectedNode.getUserObject()).isDirectory());
					} else {
						jmiNewScript.setVisible(true);
						jmiEditScript.setVisible(false);
						jmiExecuteScript.setVisible(false);
						jmiImportScript.setVisible(true);
						jmiExportScript.setVisible(false);
						jmiDeleteScript.setVisible(false);
						jmiAddFile.setVisible(false);
						jmiNewFile.setVisible(false);
						jmiCreateDirectory.setVisible(false);
					}
					jpmTreeAction.show(e.getComponent(), e.getX(), e.getY());
				}
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
	
	class NoticeTableModel extends AbstractTableModel {
		
		List<ParserNotice> notices = new ArrayList<ParserNotice>();
		
		public void addNotice(ParserNotice notice) {
			notices.add(notice);
			
			fireTableRowsInserted(notices.size()-1,notices.size()-1);
		}
		
		public void clear() {
			if(notices.size() > 0) {
				int nbDeletedElement = notices.size();
				
				notices.clear();
				
				fireTableRowsDeleted(0, nbDeletedElement-1);
			}
		}
		
		@SuppressWarnings("nls")
		@Override
		public String getColumnName(int column) {
			switch (column) {
				case 0:
					return localisation.getResourceString("scriptmanager.noticetab.line");
				case 1:
					return localisation.getResourceString("scriptmanager.noticetab.level");
				case 2:
					return localisation.getResourceString("scriptmanager.noticetab.message");
			}
			return "";
		}
		
		@Override
		public Object getValueAt(int rowIndex, int columnIndex) {
			if(rowIndex < notices.size()) {
				ParserNotice notice = notices.get(rowIndex);
				
				switch (columnIndex) {
					case 0:
						return (notice.getLine()+1);
					case 1:
						//String color = notice.getLevel() == 0 ? "red" : "orange";
						//return "<html><span style=\"color:" + color +";\">" + notice.getLevel() + "</span></html>";
						return notice.getLevel();
					case 2:
						return notice.getMessage();
					default:
						break;
				}
			}
			return null;
		}
		
		@Override
		public int getRowCount() {
			return notices.size();
		}
		
		@Override
		public int getColumnCount() {
			return 3;
		}
	}
}
