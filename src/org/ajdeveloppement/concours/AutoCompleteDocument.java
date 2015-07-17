/*
 * Copyright 2002-2007 - Aurélien JEOFFRAY
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
package org.ajdeveloppement.concours;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.event.EventListenerList;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.PlainDocument;

import org.ajdeveloppement.commons.persistence.sql.QField;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.concours.data.Archer;
import org.ajdeveloppement.concours.data.Concurrent;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Entite;
import org.ajdeveloppement.concours.data.T_Archer;
import org.ajdeveloppement.concours.data.T_Contact;
import org.ajdeveloppement.concours.data.T_Entite;
import org.ajdeveloppement.concours.event.AutoCompleteDocumentEvent;
import org.ajdeveloppement.concours.event.AutoCompleteDocumentListener;
import org.ajdeveloppement.concours.managers.ConcurrentManager;

/**
 * Réalise la saisi semi automatique d'un concurrent en fonction de
 * la chaîne saisi manuellement et des informations présente en base
 * de données
 * 
 * @author  Aurélien JEOFFRAY
 * @version 1.0
 */
public class AutoCompleteDocument extends PlainDocument {
	
	/**
	 * Enumeration des différents type de recherche géré par le document
	 * d'autocomplement
	 * 
	 * @author Aurélien JEOFFRAY
	 * @version 1.0
	 */
	public enum SearchType {
		/**
		 * Type de recherche : recherche par le nom
		 */
		NAME_SEARCH,
		/**
		 * Type de recherche : recherche par le numéro de licence
		 */
		NUMLICENCE_SEARCH,
		/**
		 * Type de recherche : recherche par le prénom
		 */
		FIRSTNAME_SEARCH,
		/**
		 * Type de recherche : recherche par le nom du club
		 */
		CLUB_SEARCH,
		/**
		 * Type de recherche : recherche par le numéro d'agrement du club
		 */
		AGREMENT_SEARCH
	}
	
	private AutoCompleteDocumentContext context;
	
	private final JTextField textField;
	private final EventListenerList listeners = new EventListenerList();

	//critère de recherche par défaut
	private SearchType typeSearch = SearchType.NAME_SEARCH;
	
	/**
	 * Crée un document de saisi semi automatique de concurrent
	 * 
	 * @param textField - le champs de reference pour la saisi
	 * semi automatique
	 * @param typeSearch - le type de recherche à effectuer (représente
	 * la nature de la saisi)
	 * @param context Définit le contexte d'autocomplement du document. Le contexte ne doit pas être null
	 */
	public AutoCompleteDocument(JTextField textField, SearchType typeSearch, AutoCompleteDocumentContext context) {
		this.textField = textField;
		this.typeSearch = typeSearch;
		this.context = context;
	}
	
	/**
	 * Ajoute un auditeur aux évènements d'autocomplement
	 * 
	 * @param autoCompleteDocumentListener - l'objet auditeur
	 */
	public void addAutoCompleteDocumentListener(AutoCompleteDocumentListener autoCompleteDocumentListener) {
		listeners.add(AutoCompleteDocumentListener.class, autoCompleteDocumentListener);
	}
	
	/**
	 * supprime un auditeur aux évènements d'autocomplement
	 * 
	 * @param autoCompleteDocumentListener - l'objet auditeur
	 */
	public void removeAutoCompleteDocumentListener(AutoCompleteDocumentListener autoCompleteDocumentListener) {
		listeners.remove(AutoCompleteDocumentListener.class, autoCompleteDocumentListener);
	}
	
	private Thread searchThread = null;
	
	/**
	 * Invoqué a l'insertion du chaîne dans le champs de saisi
	 * 
	 * @param offs - position du début de l'insertion
	 * @param str - la chaîne à insérer
	 * @param a - les attributs d'insertions
	 * 
	 * @throws BadLocationException
	 */
	@Override
	public void insertString(int offs, String str, AttributeSet a) throws BadLocationException {
		if(str == null)
			return;
		super.insertString(offs, str, a);
		//this.

		if(searchThread != null)
			searchThread.interrupt();
		
		//searchThread.is
		
		final int insertOffset = offs;
		final String insertValue = str;
		
		searchThread = new Thread() {
			@Override
			public void run() {
				try {
					switch(typeSearch) {
						case NAME_SEARCH:
							insertConcurrentWithName(insertOffset + insertValue.length(), false);
							break;
						case NUMLICENCE_SEARCH:
							insertConcurrentWithNumLicence(insertOffset + insertValue.length(), false);
							break;
						case FIRSTNAME_SEARCH:
							insertConcurrentWithFirstName(insertOffset + insertValue.length(), false);
							break;
						case CLUB_SEARCH:
							insertEntiteWithClubName(insertOffset + insertValue.length(), false);
							break;
						case AGREMENT_SEARCH:
							insertEntiteWithAgrement(insertOffset + insertValue.length(), false);
							break;
					}
				} catch (BadLocationException e) {
					e.printStackTrace();
				}
			}
		};
		
		searchThread.start();
	}
	
	/**
	 * Invoqué à la suppression d'une chaîne dans le champs de saisi
	 * 
	 * @param offs - la position du début de la zone à supprimer
	 * @param len - la taille de la chaîne à supprimer
	 * 
	 * @throws BadLocationException
	 */
	@Override
	public void remove(int offs, int len) throws BadLocationException {
		super.remove(offs, len);
		
		int caretpos = offs - 1;
		if(caretpos < 0) caretpos = 0;
		
		switch(typeSearch) {
			case NAME_SEARCH:
				insertConcurrentWithName(offs, true);
				break;
			case NUMLICENCE_SEARCH:
				insertConcurrentWithNumLicence(caretpos, false);
				break;
			case FIRSTNAME_SEARCH:
				insertConcurrentWithFirstName(offs, true);
				break;
			case CLUB_SEARCH:
				insertEntiteWithClubName(offs, true);
				break;
			case AGREMENT_SEARCH:
				insertEntiteWithAgrement(caretpos, false);
				break;
		}
	}
	
	/**
	 * Invoqué au remplacement d'une portion de la chaîne du champs de saisi
	 * 
	 * @param offset - la position du début de la chaîne à remplacer
	 * @param length - la taille de la chaîne à remplacer
	 * @param text - la chaîne de remplacement
	 * @param attrs - les attributs de remplacement
	 * 
	 * @throws BadLocationException
	 */
	@Override
	public void replace(int offset, int length, String text, AttributeSet attrs) throws BadLocationException {
		if(getText(offset, length).equals(text))
			return;
		
		super.remove(offset, length);
		insertString(offset, text, attrs);
	}
	
	/**
	 * Remplace le texte du document sans passer par le système
	 * d'autocomplement
	 * 
	 * @param text - le texte de remplacement du document
	 */
	public void setText(final String text) {
		try {
			if((text == null && getLength() == 0) || getText(0, getLength()).equals(text))
				return;

			Runnable replaceString = new Runnable() {
				@Override
				public void run() {
					try {
						AutoCompleteDocument.super.remove(0, getLength());
						AutoCompleteDocument.super.insertString(0, text, null);
					} catch (BadLocationException e) {
						e.printStackTrace();
					}
				}
			};
			
			if(SwingUtilities.isEventDispatchThread())
				replaceString.run();
			else {
				SwingUtilities.invokeAndWait(replaceString);
			}
			
		} catch (BadLocationException | InvocationTargetException | InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Recherche le concurrent à afficher en fonction de la chaîne actuellement
	 * dans le modèle et des informations en base. La chaîne du modèle doit
	 * représenter le nom du concurrent
	 * 
	 * @param caretpos - la position du curseur d'insertion
	 * @param strict - si true ne renvoyé que les résultats correspondant
	 * exactement au contenue du document, si false, renvoyé la première
	 * réponse approchante (usage de % dans le filtre de recherche)
	 * 
	 * @throws BadLocationException
	 */
	private void insertConcurrentWithName(int caretpos, boolean strict) throws BadLocationException {
		if(!context.isAutocompleteNom())
			return;
		
		String searchString = getText(0, getLength());
		Archer searchArcher = new Archer();
		searchArcher.setName(searchString.toUpperCase() + "%"); //$NON-NLS-1$
		
		if(getLength() > 0) {
			//List<Concurrent> concurrents = ConcurrentManager.getArchersInDatabase(searchArcher, context.getReglement(), new QField<?>[] { T_Contact.NAME, T_Contact.FIRSTNAME }, 1);
			Concurrent concurrent = QResults.from(Concurrent.class, context.getReglement())
				.innerJoin(Contact.class, T_Archer.ID_CONTACT.equalTo(T_Contact.ID_CONTACT))
				.where(T_Contact.NAME.like(searchArcher.getName()))
				.orderBy(T_Contact.NAME, T_Contact.FIRSTNAME)
				.first();
			if(!Thread.currentThread().isInterrupted()) {
				if(concurrent != null) {
					context.setConcurrent(concurrent);
					context.setAutocompleteLicence(false);
				} else {
					context.setConcurrent(null);
					context.setAutocompleteLicence(true);
				}
			}
			
		} else {
			context.setConcurrent(null);
			context.setAutocompleteLicence(true);
		}
		
		if(!Thread.currentThread().isInterrupted()) {
			//aucun concurrent trouvé ou concurrent trouvé ne correspondant pas à la recherche
			if(context.getConcurrent() == null || (strict && !context.getConcurrent().getName().equals(searchString))) {
				if(strict && context.getConcurrent() != null)
					context.setConcurrent(null);
	
				fireConcurrentNotFound();
			} else {
				
				final int caretPosition = caretpos;
				Runnable runnable = new Runnable() {
					
					@Override
					public void run() {
						try {
							AutoCompleteDocument.super.remove(0, getLength());
							AutoCompleteDocument.super.insertString(0, context.getConcurrent().getName(), null);
							textField.setCaretPosition(context.getConcurrent().getName().length());
							textField.moveCaretPosition(caretPosition);
						} catch (BadLocationException e) {
							e.printStackTrace();
						}
					}
				};
				if(SwingUtilities.isEventDispatchThread())
					runnable.run();
				else
					try {
						SwingUtilities.invokeAndWait(runnable);
					} catch (InvocationTargetException | InterruptedException e) {
						e.printStackTrace();
					}
			
				fireConcurrendFinded(context.getConcurrent(), searchArcher);
			}
		}
	}
	
	/**
	 * Recherche le concurrent à afficher en fonction de la chaîne actuellement
	 * dans le modèle et des informations en base. La chaîne du modèle doit
	 * représenter le prénom du concurrent
	 * 
	 * @param caretpos - la position du curseur d'insertion
	 * @param strict - si true ne renvoyé que les résultats correspondant
	 * exactement au contenue du document, si false, renvoyé la première
	 * réponse approchante (usage de % dans le filtre de recherche)
	 * 
	 * @throws BadLocationException
	 */
	private void insertConcurrentWithFirstName(int caretpos, boolean strict) throws BadLocationException {
		if(!context.isAutocompleteNom())
			return;
		
		String searchString = getText(0, getLength());
		Archer searchArcher = new Archer();
		Concurrent tempConcurrent = null;
		if(getLength() > 0 && context.getConcurrent() != null) {
			searchArcher.setName(context.getConcurrent().getName());
			searchArcher.setFirstName(searchString + "%"); //$NON-NLS-1$
			
			
			List<Concurrent> concurrents = ConcurrentManager.getArchersInDatabase(searchArcher, context.getReglement(),  new QField<?>[] { T_Contact.FIRSTNAME });
			if(!Thread.currentThread().isInterrupted()) {
				if(concurrents.size() > 0) {
					tempConcurrent = concurrents.get(0);
					context.setAutocompleteLicence(false);
				} else {
					context.setConcurrent(null);
					context.setAutocompleteLicence(true);
				}
			}
		} else {
			context.setAutocompleteLicence(context.getConcurrent() != null);
		}

		if(!Thread.currentThread().isInterrupted()) {
			if(tempConcurrent == null || (strict && !tempConcurrent.getFirstName().equals(getText(0, getLength())))) {
				if(context.getConcurrent() != null)
					context.getConcurrent().setFirstName(getText(0, getLength()));
				fireConcurrentNotFound();
	
			} else {
				context.setConcurrent(tempConcurrent);
				
				final int caretPosition = caretpos;
				Runnable runnable = new Runnable() {
					
					@Override
					public void run() {
						try {
							AutoCompleteDocument.super.remove(0, getLength());
							AutoCompleteDocument.super.insertString(0, context.getConcurrent().getFirstName(), null);
							textField.setCaretPosition(context.getConcurrent().getFirstName().length());
							textField.moveCaretPosition(caretPosition);
						} catch (BadLocationException e) {
							e.printStackTrace();
						}
					}
				};
				if(SwingUtilities.isEventDispatchThread())
					runnable.run();
				else {
					try {
						SwingUtilities.invokeAndWait(runnable);
					} catch (InvocationTargetException | InterruptedException e) {
					}
				}
				
				fireConcurrendFinded(context.getConcurrent(), searchArcher);
			}
		}
	}
	
	/**
	 * Recherche le concurrent à afficher en fonction de la chaîne actuellement
	 * dans le modèle et des informations en base. La chaîne du modèle doit
	 * représenter le numéro de licence du concurrent
	 * 
	 * @param caretpos - la position du curseur d'insertion
	 * @param strict - si true ne renvoyé que les résultats correspondant
	 * exactement au contenue du document, si false, renvoyé la première
	 * réponse approchante (usage de % dans le filtre de recherche)
	 * 
	 * @throws BadLocationException
	 */
	private void insertConcurrentWithNumLicence(int caretpos, boolean strict) throws BadLocationException {
		if(!strict)
			strict = !context.isAutocompleteLicence();
		
		String searchString = getText(0, getLength());
		Archer searchArcher = new Archer();
		searchArcher.setNumLicenceArcher(searchString + "%"); //$NON-NLS-1$
		if(getLength() > 0) {
			List<Concurrent> concurrents = ConcurrentManager.getArchersInDatabase(searchArcher, context.getReglement(),  new QField<?>[] { T_Archer.NUMLICENCEARCHER }, 1);
			if(!Thread.currentThread().isInterrupted()) {
				if(concurrents.size() > 0)
					context.setConcurrent(concurrents.get(0));
				else
					context.setConcurrent(null);
			}
		} else {
			context.setConcurrent(null);
		}
		
		if(!Thread.currentThread().isInterrupted()) {
			if(context.getConcurrent() == null || (strict && !context.getConcurrent().getNumLicenceArcher().equals(getText(0, getLength())))) {
				if(strict && context.getConcurrent() != null)
					context.setConcurrent(null);
				
				context.setAutocompleteNom(getLength() == 0);			
				
				fireConcurrentNotFound();
	
			} else {
				context.setAutocompleteNom(true);
				context.setAutocompleteLicence(true);
				
				final int caretPosition = caretpos;
				try {
					Runnable runnable = new Runnable() {
						@Override
						public void run() {
							try {
								AutoCompleteDocument.super.remove(0, getLength());
								AutoCompleteDocument.super.insertString(0, context.getConcurrent().getNumLicenceArcher(), null);
								textField.setCaretPosition(context.getConcurrent().getNumLicenceArcher().length());
								textField.moveCaretPosition(caretPosition);
							} catch (BadLocationException e) {
								e.printStackTrace();
							}
						}
					};
					if(SwingUtilities.isEventDispatchThread())
						runnable.run();
					else
						SwingUtilities.invokeAndWait(runnable);
				} catch (InvocationTargetException | InterruptedException e) {
				}
				
				fireConcurrendFinded(context.getConcurrent(), searchArcher);
			}
		}
	}
	
	/**
	 * Recherche le club (Entite) à afficher en fonction de la chaîne actuellement
	 * dans le modèle et des informations en base. La chaîne du modèle doit
	 * représenter le nom de l'Entite recherché
	 * 
	 * @param caretpos - la position du curseur d'insertion
	 * @param strict - si true ne renvoyé que les résultats correspondant
	 * exactement au contenue du document, si false, renvoyé la première
	 * réponse approchante (usage de % dans le filtre de recherche)
	 * 
	 * @throws BadLocationException
	 */
	private void insertEntiteWithClubName(int caretpos, boolean strict) throws BadLocationException {
		if(!context.isAutocompleteClub())
			return;
		
		String searchString = getText(0, getLength());
		Entite searchEntite = new Entite();
		searchEntite.setVille(searchString.toUpperCase().replaceAll("[- \\']", "_") + "%"); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
		if(getLength() > 0) {
			//List<Entite> entites = EntiteManager.getEntitesInDatabase(searchEntite, T_Entite.VILLEENTITE);
			Entite entite = QResults.from(Entite.class)
					.where(T_Entite.VILLE.upper().like(searchEntite.getVille()))
					.orderBy(T_Entite.VILLE)
					.first();
			if(!Thread.currentThread().isInterrupted()) {
				if(entite != null)
					context.setEntite(entite);
				else
					context.setEntite(null);
			}
			context.setAutocompleteAgrement(false);
		} else {
			context.setEntite(null);
			context.setAutocompleteAgrement(true);
		}

		if(!Thread.currentThread().isInterrupted()) {
			//aucun concurrent trouvé ou concurrent trouvé ne correspondant pas à la recherche
			if(context.getEntite() == null || (strict && !context.getEntite().getVille().equals(searchString))) {
				if(strict && context.getEntite() != null)
					context.setEntite(null);
	
				fireEntiteNotFound();
	
			} else {
				final int caretPosition = caretpos;
				try {
					Runnable runnable = new Runnable() {
						
						@Override
						public void run() {
							try {
								AutoCompleteDocument.super.remove(0, getLength());
								AutoCompleteDocument.super.insertString(0, context.getEntite().getVille(), null);
								textField.setCaretPosition(context.getEntite().getVille().length());
								textField.moveCaretPosition(caretPosition);
							} catch (BadLocationException e) {
								e.printStackTrace();
							}
						}
					};
					if(SwingUtilities.isEventDispatchThread())
						runnable.run();
					else
						SwingUtilities.invokeAndWait(runnable);
				} catch (InvocationTargetException | InterruptedException e) {
				}
				
				fireEntiteFinded(context.getEntite(), searchEntite);
			}
		}
	}
	
	/**
	 * Recherche le club (Entite) à afficher en fonction de la chaîne actuellement
	 * dans le modèle et des informations en base. La chaîne du modèle doit
	 * représenter le numéro d'agrément de l'Entite recherché
	 * 
	 * @param caretpos - la position du curseur d'insertion
	 * @param strict - si true ne renvoyé que les résultats correspondant
	 * exactement au contenue du document, si false, renvoyé la première
	 * réponse approchante (usage de % dans le filtre de recherche)
	 * 
	 * @throws BadLocationException
	 */
	private void insertEntiteWithAgrement(int caretpos, boolean strict) throws BadLocationException {
		if(!strict)
			strict = !context.isAutocompleteAgrement();
		
		String searchString = getText(0, getLength());
		Entite searchEntite = new Entite();
		searchEntite.setReference(searchString.toUpperCase() + "%"); //$NON-NLS-1$
		if(getLength() > 0) {
			Entite entite = QResults.from(Entite.class)
					.where(T_Entite.REFERENCE.like(searchEntite.getReference()))
					.orderBy(T_Entite.REFERENCE)
					.first();
			//List<Entite> entites = EntiteManager.getEntitesInDatabase(searchEntite, T_Entite.AGREMENTENTITE);
			if(!Thread.currentThread().isInterrupted()) {
				if(entite != null)
					context.setEntite(entite);
				else
					context.setEntite(null);
			}
		} else {
			context.setEntite(null);
		}
		
		if(!Thread.currentThread().isInterrupted()) {
			if(context.getEntite() == null || (strict && !context.getEntite().getReference().equals(getText(0, getLength())))) {
				if(strict && context.getEntite() != null)
					context.setEntite(null);
				
				context.setAutocompleteClub(getLength() == 0);			
				
				fireEntiteNotFound();
	
			} else {
				context.setAutocompleteClub(true);
				context.setAutocompleteAgrement(true);
				
				final int caretPosition = caretpos;
				try {
					Runnable runnable = new Runnable() {
						@Override
						public void run() {
							try {
								AutoCompleteDocument.super.remove(0, getLength());
								AutoCompleteDocument.super.insertString(0, context.getEntite().getReference(), null);
								textField.setCaretPosition(context.getEntite().getReference().length());
								textField.moveCaretPosition(caretPosition);
							} catch (BadLocationException e) {
								e.printStackTrace();
							}
						}
					};
					if(SwingUtilities.isEventDispatchThread())
						runnable.run();
					else
						SwingUtilities.invokeAndWait(runnable);
				} catch (InvocationTargetException | InterruptedException e) {
				}
	
				fireEntiteFinded(context.getEntite(), searchEntite);
			}
		}
	}

	/**
	 * Envoi aux auditeurs l'information comme quoi un concurrent a été trouvé
	 * 
	 * @param concurrent - le concurrent trouvé
	 * @param searchArcher - l'objet générique correspondant à la requête de recherche produite
	 */
	private void fireConcurrendFinded(Concurrent concurrent, Archer searchArcher) {
		for(AutoCompleteDocumentListener acdl : listeners.getListeners(AutoCompleteDocumentListener.class)) {
			AutoCompleteDocumentEvent autoCompleteDocumentEvent = new AutoCompleteDocumentEvent(textField, concurrent);
			autoCompleteDocumentEvent.setGenericArcher(searchArcher);
			acdl.concurrentFinded(autoCompleteDocumentEvent);
		}
	}
	
	/**
	 * Envoi aux auditeurs l'information comme quoi aucun concurrent n'a été trouvé
	 *
	 */
	private void fireConcurrentNotFound() {
		for(AutoCompleteDocumentListener acdl : listeners.getListeners(AutoCompleteDocumentListener.class)) {
			acdl.concurrentNotFound(new AutoCompleteDocumentEvent(textField, (Concurrent)null));
		}
	}
	
	/**
	 * Envoi aux auditeurs l'information comme quoi une entité a été trouvé
	 * 
	 * @param entite - l'entite trouvé
	 * @param searchEntite - l'objet générique correspondant à la requête de recherche produite
	 */
	private void fireEntiteFinded(Entite entite, Entite searchEntite) {
		for(AutoCompleteDocumentListener acdl : listeners.getListeners(AutoCompleteDocumentListener.class)) {
			AutoCompleteDocumentEvent autoCompleteDocumentEvent = new AutoCompleteDocumentEvent(textField, entite);
			autoCompleteDocumentEvent.setGenericEntite(searchEntite);
			acdl.entiteFinded(autoCompleteDocumentEvent);
		}
	}
	
	/**
	 * Envoi aux auditeurs l'information comme quoi aucune entité n'a été trouvé
	 *
	 */
	private void fireEntiteNotFound() {
		for(AutoCompleteDocumentListener acdl : listeners.getListeners(AutoCompleteDocumentListener.class)) {
			acdl.entiteNotFound(new AutoCompleteDocumentEvent(textField, (Entite)null));
		}
	}
}
