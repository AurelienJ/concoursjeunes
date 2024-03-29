/*
 * Copyright 2002-2008 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours.ui;

import java.util.ArrayList;
import java.util.List;

import javax.swing.event.EventListenerList;
import javax.swing.event.TreeModelEvent;
import javax.swing.event.TreeModelListener;
import javax.swing.tree.TreeModel;
import javax.swing.tree.TreePath;

import org.concoursjeunes.Concurrent;
import org.concoursjeunes.Target;
import org.concoursjeunes.TargetPosition;
import org.concoursjeunes.event.TargetEvent;
import org.concoursjeunes.event.TargetListener;

/**
 * @author Aurélien JEOFFRAY
 * 
 */
public class TargetTreeModel implements TreeModel, TargetListener {

	private final EventListenerList listeners = new EventListenerList();

	private String rootLabel = ""; //$NON-NLS-1$
	private List<Target> targetChilds = new ArrayList<Target>();

	public TargetTreeModel() {

	}

	public TargetTreeModel(String rootLabel, List<Target> targetChilds) {
		this.rootLabel = rootLabel;
		this.targetChilds = targetChilds;
	}

	/**
	 * @return rootLabel
	 */
	public String getRootLabel() {
		return rootLabel;
	}

	/**
	 * @param rootLabel
	 *            rootLabel à définir
	 */
	public void setRootLabel(String rootLabel) {
		this.rootLabel = rootLabel;

		fireTreeNodesChanged(new TreePath(rootLabel));
	}

	/**
	 * @return targetChild
	 */
	public List<Target> getTargetChilds() {
		return targetChilds;
	}

	/**
	 * @param targetChilds
	 *            targetChild à définir
	 */
	public void setTargetChilds(List<Target> targetChilds) {
		if (this.targetChilds != null)
			for (Target cible : this.targetChilds) {
				cible.removeTargetListener(this);
			}

		this.targetChilds = targetChilds;

		for (Target cible : targetChilds) {
			cible.addTargetListener(this);
		}

		fireTreeStructureChanged(new TreePath(new Object[] { rootLabel }));
	}

	public void addTargetChild(Target cible) {
		targetChilds.add(cible);

		cible.addTargetListener(this);

		fireTreeNodesInserted(cible);
	}

	public void removeTargetChild(Target cible) {
		targetChilds.remove(cible);

		cible.removeTargetListener(this);

		fireTreeNodesRemoved(cible);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#addTreeModelListener(javax.swing.event.TreeModelListener)
	 */
	@Override
	public void addTreeModelListener(TreeModelListener l) {
		listeners.add(TreeModelListener.class, l);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#getChild(java.lang.Object, int)
	 */
	@Override
	public Object getChild(Object parent, int index) {
		if (parent == rootLabel)
			return targetChilds.get(index);
		else if (parent instanceof Target) {
			Target cibleParent = (Target) parent;
			Concurrent concurrent = cibleParent.getConcurrentAt(index);
			if (concurrent == null)
				return new TargetPosition(cibleParent.getNumCible(), index);
			return concurrent;
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#getChildCount(java.lang.Object)
	 */
	@Override
	public int getChildCount(Object parent) {
		if (parent == rootLabel)
			return targetChilds.size();
		else if (parent instanceof Target) {
			Target cibleParent = (Target) parent;
			return cibleParent.getNbMaxArchers();
		}
		return 0;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#getIndexOfChild(java.lang.Object, java.lang.Object)
	 */
	@Override
	public int getIndexOfChild(Object parent, Object child) {
		if (parent == rootLabel)
			return targetChilds.indexOf(child);
		else if (parent instanceof Target) {
			Target cibleParent = (Target) parent;
			if (child instanceof Concurrent) {
				return cibleParent.indexOf((Concurrent) child);
			}
			TargetPosition targetPosition = (TargetPosition) child;
			return targetPosition.getPosition();
		}
		return -1;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#getRoot()
	 */
	@Override
	public Object getRoot() {
		return rootLabel;
	}

	public TreePath getTreePathForNode(Object node) {
		if (node == rootLabel)
			return new TreePath(rootLabel);
		else if (node instanceof Target)
			return new TreePath(new Object[] { rootLabel, node });
		else if (node instanceof Concurrent) {
			Concurrent concurrent = (Concurrent) node;
			if (concurrent.getCible() > 0) {
				Target cible = targetChilds.get(concurrent.getCible() - 1);

				return new TreePath(new Object[] { rootLabel, cible, concurrent });
			}
		} else {
			assert node instanceof String : "A ce niveau un noeud doit toujours être une chaine"; //$NON-NLS-1$

			String posLabel = (String) node;

			Target cible = targetChilds.get(Integer.parseInt(posLabel.substring(0, posLabel.length() - 1)));

			return new TreePath(new Object[] { rootLabel, cible, posLabel });
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#isLeaf(java.lang.Object)
	 */
	@Override
	public boolean isLeaf(Object node) {
		if (node instanceof TargetPosition || node instanceof Concurrent)
			return true;
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#removeTreeModelListener(javax.swing.event.TreeModelListener)
	 */
	@Override
	public void removeTreeModelListener(TreeModelListener l) {
		listeners.remove(TreeModelListener.class, l);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.swing.tree.TreeModel#valueForPathChanged(javax.swing.tree.TreePath, java.lang.Object)
	 */
	@Override
	public void valueForPathChanged(TreePath path, Object newValue) {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.concoursjeunes.CibleListener#concurrentJoined(org.concoursjeunes.CibleEvent)
	 */
	@Override
	public void concurrentJoined(TargetEvent e) {
		fireTreeNodesChanged(getTreePathForNode(e.getCible()));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.concoursjeunes.CibleListener#concurrentQuit(org.concoursjeunes.CibleEvent)
	 */
	@Override
	public void concurrentQuit(TargetEvent e) {
		fireTreeNodesChanged(getTreePathForNode(e.getCible()));
		// fireTreeNodesChanged(getTreePathForNode(Cible.getCibleLibelle(
		// e.getConcurrent().getCible()-1, e.getConcurrent().getPosition())));
	}

	private void fireTreeNodesChanged(TreePath treePath) {
		Object[] childs = new Object[getChildCount(treePath.getLastPathComponent())];
		int[] indices = new int[childs.length];
		for (int i = 0; i < childs.length; i++) {
			childs[i] = getChild(treePath.getLastPathComponent(), i);
			indices[i] = i;
		}
		TreeModelEvent treeModelEvent;
		if (childs.length > 0) {
			treeModelEvent = new TreeModelEvent(this, treePath, indices, childs);
		} else
			treeModelEvent = new TreeModelEvent(this, treePath);

		for (TreeModelListener tml : listeners.getListeners(TreeModelListener.class)) {
			tml.treeNodesChanged(treeModelEvent);
		}
	}

	private void fireTreeNodesInserted(Target cible) {
		TreeModelEvent treeModelEvent = new TreeModelEvent(this, new Object[] { rootLabel, cible });
		for (TreeModelListener tml : listeners.getListeners(TreeModelListener.class)) {
			tml.treeNodesInserted(treeModelEvent);
		}
	}

	private void fireTreeNodesRemoved(Target cible) {
		TreeModelEvent treeModelEvent = new TreeModelEvent(this, new Object[] { rootLabel, cible });
		for (TreeModelListener tml : listeners.getListeners(TreeModelListener.class)) {
			tml.treeNodesRemoved(treeModelEvent);
		}
	}

	private void fireTreeStructureChanged(TreePath treePath) {
		TreePath parentPath = treePath.getParentPath();
		TreeModelEvent treeModelEvent;
		if (parentPath != null) {
			treeModelEvent = new TreeModelEvent(this, parentPath, new int[] { getIndexOfChild(parentPath.getLastPathComponent(), treePath.getLastPathComponent()) }, new Object[] { treePath
					.getLastPathComponent() });
		} else
			treeModelEvent = new TreeModelEvent(this, treePath);
		for (TreeModelListener tml : listeners.getListeners(TreeModelListener.class)) {
			tml.treeStructureChanged(treeModelEvent);
		}
	}
}
