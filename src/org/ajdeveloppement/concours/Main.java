/*
 * Copyright 2002-2008 - Aurélien JEOFFRAY
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

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.SplashScreen;
import java.awt.Toolkit;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.Authenticator;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.SocketAddress;
import java.net.URI;
import java.net.URL;
import java.net.UnknownHostException;
import java.security.InvalidAlgorithmParameterException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;

import javafx.application.Application;
import javafx.concurrent.Worker;
import javafx.geometry.Pos;
import javafx.scene.Cursor;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.web.WebView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import javax.swing.JOptionPane;
import javax.swing.RepaintManager;
import javax.swing.SwingUtilities;
import javax.xml.bind.JAXBException;

import org.ajdeveloppement.apps.AppUtilities;
import org.ajdeveloppement.apps.ApplicationContext;
import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.commons.io.FileUtils;
import org.ajdeveloppement.commons.io.XMLSerializer;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.security.SSLUtils;
import org.ajdeveloppement.commons.security.SecureSiteAuthenticationStore;
import org.ajdeveloppement.commons.ui.SwingURLAuthenticator;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Profile;
import org.ajdeveloppement.concours.db.UpgradeDatabaseEventListener;
import org.ajdeveloppement.concours.exceptions.ExceptionHandlingEventQueue;
import org.ajdeveloppement.concours.plugins.Plugin.Type;
import org.ajdeveloppement.concours.plugins.PluginEntry;
import org.ajdeveloppement.concours.plugins.PluginLoader;
import org.ajdeveloppement.concours.plugins.PluginMetadata;
import org.ajdeveloppement.swingxext.error.WebErrorReporter;
import org.ajdeveloppement.swingxext.error.ui.DisplayableErrorHelper;
import org.ajdeveloppement.webserver.FileSelector;
import org.ajdeveloppement.webserver.HttpServer;
import org.ajdeveloppement.webserver.services.ExtensibleHttpRequestProcessor;
import org.ajdeveloppement.webserver.services.files.FilesService;
import org.h2.tools.DeleteDbFiles;
import org.jdesktop.swingx.error.ErrorInfo;

/**
 * Class initial de l'application.
 * 
 * @author Aurélien JEOFFRAY
 * @version 2.3
 * 
 */
public class Main extends Application {
	public static class Bridge {
		public Bridge(Stage stage) {
			//this.stage = stage;
		}
		
		public String SelectFile() {
			
			//Date.from(LocalDateTime.now().minusDays(30).toInstant(ZoneOffset.UTC));
			FileChooser chooser = new FileChooser();
			File file = chooser.showOpenDialog(null);
			if(file != null) {
				File uploadPath = new File(httpServer.getFileSelector().getBasePath(), "www/images/upload"); //$NON-NLS-1$
				if(!uploadPath.exists())
					uploadPath.mkdirs();
				try {
					FileUtils.copyFile(file, new File(uploadPath, file.getName()));
				} catch (IOException e) {
					e.printStackTrace();
				}
				return "images/upload/" + file.getName(); //$NON-NLS-1$
			}
			
			return null;
		}
	}
	
	private static SplashScreen splash = null;
	private static AjResourcesReader localisation = new AjResourcesReader("libelle");  //$NON-NLS-1$
	
	private static ApplicationCore core;
	
	private static final String WEBSERVER_CONFIG = "webserver"; //$NON-NLS-1$

	private static final String WEBSERVER_LISTEN_PORT = "webserver.listen.port"; //$NON-NLS-1$
	private static final String WEBSERVER_SSLLISTEN_PORT = "webserver.ssllisten.port"; //$NON-NLS-1$
	private static final String WEBSERVER_FILESELECTOR_FILE = "webserver.fileselector.file"; //$NON-NLS-1$$
	private static final String WEBSERVER_STATIC_ALLOWEDGZIPEXT = "webserver.static.allowedgzipext"; //$NON-NLS-1$
	private static final String WEBSERVER_SERVICE_ORDER = "webserver.service.order"; //$NON-NLS-1$
	
	private static final String WEBSERVER_CERTIFICATE_ALIAS = "webserver.certificateAlias"; //$NON-NLS-1$
	private static final String WEBSERVER_PKCS12PASSWORD = "webserver.pkcs12password"; //$NON-NLS-1$
	private static final String WEBSERVER_PKCS12_KEY_STORE_FILE = "webserver.pkcs12KeyStore.file"; //$NON-NLS-1$

	private static AjResourcesReader staticParameters = new AjResourcesReader(WEBSERVER_CONFIG);
	
	private static int webServerListenPort = 0;
	private static HttpServer httpServer;
	
	private double startX = -1;
	private double startY = -1;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.setProperty("nashorn.option.scripting", "true"); //$NON-NLS-1$ //$NON-NLS-2$
		
		//JSONConverters.JSONToBean("{ nom: \"hello world!\", entiteParent:{ nom: \"parent\" } }", new Entite());
		
		FilesService.setAllowedGzipExt(Arrays.asList(staticParameters.getResourceString(WEBSERVER_STATIC_ALLOWEDGZIPEXT).split(","))); //$NON-NLS-1$
		
		String[] servicesOrder = staticParameters.getResourceString(WEBSERVER_SERVICE_ORDER).split(","); //$NON-NLS-1$
		ExtensibleHttpRequestProcessor extensibleHttpRequestProcessor = new ExtensibleHttpRequestProcessor(servicesOrder);
		
		FileSelector fileSelector = null;
		String fileSelectorFilePath = staticParameters.getResourceString(WEBSERVER_FILESELECTOR_FILE);
		if(fileSelectorFilePath != null && !fileSelectorFilePath.isEmpty()) {
			URL fileSelectorURL = staticParameters.getClass().getResource(fileSelectorFilePath);
			if(fileSelectorURL != null) {
				File fileSelectorFile = new File(fileSelectorURL.getPath());
				if(fileSelectorFile.exists()) {
					try {
						fileSelector = XMLSerializer.loadMarshallStructure(fileSelectorFile, FileSelector.class);
					} catch (JAXBException | IOException e) {
						e.printStackTrace();
					}
				}
			}
		}

		showSplashScreen();
		//initErrorManaging();
		initNetworkManaging();
		initCore();
		try {
			initDefaultProfile();
		} catch (ObjectPersistenceException e1) {
			e1.printStackTrace();
		}
		initSecureContext();
//		if(System.getProperty("noplugin") == null)//$NON-NLS-1$
//			loadStartupPlugin();
//
		initShutdownHook();
		
		httpServer = new HttpServer(staticParameters.getResourceInteger(WEBSERVER_LISTEN_PORT));
		httpServer.setPkcs12KeyStorePath(staticParameters.getResourceString(WEBSERVER_PKCS12_KEY_STORE_FILE));
		httpServer.setPkcs12KeyStorePassword(staticParameters.getResourceString(WEBSERVER_PKCS12PASSWORD));
		httpServer.setCertificateAlias(staticParameters.getResourceString(WEBSERVER_CERTIFICATE_ALIAS));
		httpServer.setListenSslPort(staticParameters.getResourceInteger(WEBSERVER_SSLLISTEN_PORT));
		httpServer.setFileSelector(fileSelector);
		httpServer.setRequestProcessor(extensibleHttpRequestProcessor);
		httpServer.start(true);
		try {
			int timeout = 30;
			while((webServerListenPort = httpServer.getListenPort()) == 0) {
				Thread.sleep(1000);
				timeout--;
				if(timeout == 0)
					break;
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		System.out.println("Http listen on port: " + webServerListenPort); //$NON-NLS-1$
		
		launch(args);
		
		hideSplashScreen();
		
//		
//		System.out.println("core loaded");  //$NON-NLS-1$
//		
//		showUserInterface();
	}
	
	boolean onDrag = false;
	
	@Override
	public void start(Stage primaryStage) throws Exception {
		primaryStage.setTitle("ArcCompetition 0.0.1");
		//primaryStage.initStyle(StageStyle.TRANSPARENT);
		
		Label title = new Label();
		title.setId("title");
		title.setText("ArcCompetition 0.0.1");
		
		Region spacer = new Region();
		HBox.setHgrow(spacer, Priority.ALWAYS);
		
		Button minButton = new Button();
		minButton.setId("window-min"); //$NON-NLS-1$
		minButton.setOnAction(e -> {
			primaryStage.setIconified(true);
		});
		
		Button maxButton = new Button();
		maxButton.setId("window-max"); //$NON-NLS-1$
		maxButton.setOnAction(e -> {
			primaryStage.setMaximized(!primaryStage.isMaximized());
		});
		
		Button closeButton = new Button();
		closeButton.setId("window-close"); //$NON-NLS-1$
		closeButton.setOnAction(e -> {
			System.exit(0);
		});
		
		HBox header = new HBox(4);
		header.setMinHeight(30);
		header.setId("header"); //$NON-NLS-1$
		header.setAlignment(Pos.CENTER_RIGHT);
		header.getChildren().addAll(title, spacer,minButton,maxButton,closeButton);
		header.setOnMouseClicked(e -> {
			if(e.getClickCount() == 2) {
				primaryStage.setMaximized(!primaryStage.isMaximized());
			}
		});
		
		WebView webView = new WebView();

		BorderPane root = new BorderPane();
		//root.setTop(header);
		root.setCenter(webView);
		
		Scene scene = new Scene(root, 1024, 768);
		URL appStyleUrl = Main.class.getResource("ui/fx/styles.css"); //$NON-NLS-1$
		if(appStyleUrl != null)
			scene.getStylesheets().add(appStyleUrl.toExternalForm()); 
		
		primaryStage.setScene(scene);
		primaryStage.setOnCloseRequest(e -> System.exit(0));
		primaryStage.show();
		
		header.setOnMouseDragged(e -> {
			if(e.getSceneY() < 40) {
				if(!onDrag) {
					startX = primaryStage.getX() - e.getScreenX();
					startY = primaryStage.getY() - e.getScreenY();
					
					onDrag = true;
				} else {
					webView.setCursor(Cursor.MOVE);
					primaryStage.setX(e.getScreenX() + startX);
					primaryStage.setY(e.getScreenY() + startY);
				}
			}
		});
		header.setOnMouseReleased(e -> { onDrag = false; });

		Worker<Void> worker = webView.getEngine().getLoadWorker();
		worker.exceptionProperty().addListener((observableValue, oldThrowable, newThrowable) -> newThrowable.printStackTrace());
		webView.getEngine().setOnError(event ->	event.getException().getStackTrace());
		webView.getEngine().setOnAlert(event -> System.out.println(event.getData()));
		System.out.println(webView.getEngine().getUserDataDirectory());
		
		webView.getEngine().load("http://localhost:" + webServerListenPort + "/index.html"); //$NON-NLS-1$ //$NON-NLS-2$
		//webView.getEngine().load("http://red-team-design.developpez.com/tutoriels/css/donner-style-listes-deroulantes/fichiers/");
		netscape.javascript.JSObject win = 
                (netscape.javascript.JSObject) webView.getEngine().executeScript("window"); //$NON-NLS-1$
        win.setMember("app", new Bridge(primaryStage)); //$NON-NLS-1$
	}

	/**
	 * Affiche le splash screen durant le chargement
	 */
	private static void showSplashScreen() {
		splash = SplashScreen.getSplashScreen();
		if(splash != null) {
			try {
				splash.setImageURL(new URL("file:" + ApplicationCore.staticParameters.getResourceString("path.ressources")  //$NON-NLS-1$//$NON-NLS-2$
					+ File.separator
					+ ApplicationCore.staticParameters.getResourceString("file.image.splashscreen"))); //$NON-NLS-1$
				
				UpgradeDatabaseEventListener.setSplashScreen(splash);
			} catch (NullPointerException e1) {
				e1.printStackTrace();
			} catch (IllegalStateException e1) {
				e1.printStackTrace();
			} catch (MalformedURLException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * Ferme le splash screen
	 */
	private static void hideSplashScreen() {	
		if(splash != null) {
			try {
				splash.close();
				UpgradeDatabaseEventListener.setSplashScreen(null);
			} catch (IllegalStateException e) {
			}
		}
	}
	
	/**
	 * Initialise la gestion des erreurs
	 */
	private static void initErrorManaging() {
		updateStartProgressStatus(0, localisation.getResourceString("main.initerrormanager")); //$NON-NLS-1$
		//initialisation du rapport d'erreur
		try {
			ApplicationContext contexte = ApplicationContext.getContext();
			contexte.setApplicationName(AppInfos.NOM);
			contexte.setApplicationVersion(AppInfos.VERSION + " - " + AppInfos.VERSION_DATE); //$NON-NLS-1$
			
			DisplayableErrorHelper.setErrorReporter(new WebErrorReporter(
					new URL(ApplicationCore.staticParameters.getResourceString("url.errorreport")), //$NON-NLS-1$
					ApplicationContext.getContext()));
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		// Capture des exceptions non controlé en amont
		Thread.UncaughtExceptionHandler handlerException = new Thread.UncaughtExceptionHandler() {

			@Override
			public void uncaughtException(Thread t, final Throwable e) {
				EventQueue.invokeLater(new Runnable() {
					@Override
					public void run() {
						DisplayableErrorHelper.displayErrorInfo(new ErrorInfo(
								"Application uncaught Exception!", //$NON-NLS-1$
								e.toString(), null, null, e, Level.SEVERE, null));
						e.printStackTrace();
					}
				});
			}
		};
		
		Thread.setDefaultUncaughtExceptionHandler(handlerException);
		Toolkit.getDefaultToolkit().getSystemEventQueue().push(new ExceptionHandlingEventQueue());
	}
	
	/**
	 * Initialise la gestion du réseau
	 */
	private static void initNetworkManaging() {
		updateStartProgressStatus(10, localisation.getResourceString("main.initnetworkmanager")); //$NON-NLS-1$
		
		System.setProperty("java.net.useSystemProxies","true"); //$NON-NLS-1$ //$NON-NLS-2$ 
		System.setProperty("java.net.preferIPv6Addresses", "true"); //$NON-NLS-1$ //$NON-NLS-2$
		
		final ProxySelector systemProxySelector = ProxySelector.getDefault();
		ProxySelector.setDefault(new ProxySelector() {

			@Override
			public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
				systemProxySelector.connectFailed(uri, sa, ioe);
			}

			@Override
			public List<Proxy> select(URI uri) {
				try {
					InetAddress address = InetAddress.getByName(uri.getHost());
					if(address.isLoopbackAddress() || address.isSiteLocalAddress())
						return Collections.singletonList(Proxy.NO_PROXY);
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				return systemProxySelector.select(uri);
			}
			
		});
	}
	
	/**
	 * Initialise le coeur de l'application
	 * 
	 * @param localisation
	 */
	private static void initCore() {
		updateStartProgressStatus(40, localisation.getResourceString("main.initcore")); //$NON-NLS-1$
		boolean retry = false;
		do {
			try {
				ApplicationCore.initializeApplication();
			} catch (SQLException e1) {
				DisplayableErrorHelper.displayErrorInfo(new ErrorInfo( "SQL Error", e1.getLocalizedMessage(), //$NON-NLS-1$
						null, null, e1, Level.SEVERE, null));
				
				if(JOptionPane.showConfirmDialog(null, localisation.getResourceString("erreur.breakdb")) == JOptionPane.YES_OPTION) {  //$NON-NLS-1$
					retry = true;
					try {
						if(ApplicationCore.dbConnection != null) ApplicationCore.dbConnection.close();
						DeleteDbFiles.execute(ApplicationCore.userRessources.getBasePath().getPath(), null, true);
					} catch (SQLException e2) {	e2.printStackTrace(); }
				} else {
					System.exit(1);
				}
			}
		} while(retry);
		
		core = ApplicationCore.getInstance();
	}
	
	private static void initDefaultProfile() throws ObjectPersistenceException {
		List<Profile> profiles = QResults.from(Profile.class).asList();
		if(profiles == null || profiles.size() == 0) {
			Contact defaultUser = new Contact("default", "", null);
			
			Profile profile = new Profile();
			profile.setEntite(null);
			profile.setIntitule("default");
			profile.addManager(defaultUser);
			
			profile.save();
		}
	}
	
	/**
	 * Charge le contexte de sécurité de l'application
	 */
	private static void initSecureContext() {
		updateStartProgressStatus(50, localisation.getResourceString("main.initsecurecontext")); //$NON-NLS-1$
		String urlAuthStoreAlias = "urlauthstore"; //$NON-NLS-1$
		char[] defaultUrlAuthStorePassword = AppUtilities.getAppUID(ApplicationCore.userRessources).toCharArray();
		
		try {
			SecretKey urlAuthStoreKey = (SecretKey)ApplicationCore.userRessources.getAppKeyStore().getKey(
					urlAuthStoreAlias, defaultUrlAuthStorePassword); 
			
			SecureSiteAuthenticationStore urlAuthStore = new SecureSiteAuthenticationStore(urlAuthStoreKey);
			if(urlAuthStoreKey == null) {
				 KeyStore.SecretKeyEntry skEntry = new KeyStore.SecretKeyEntry(urlAuthStore.getSecretKey());
				 ApplicationCore.userRessources.getAppKeyStore().setEntry(
						 urlAuthStoreAlias,
						 skEntry, new KeyStore.PasswordProtection(defaultUrlAuthStorePassword)); 
			}
			
			try {
				urlAuthStore.setStoreFile(new File(ApplicationCore.userRessources.getAllusersDataPath(), ApplicationCore.staticParameters.getResourceString("file.urlauthstore"))); //$NON-NLS-1$
				urlAuthStore.load(); 
			} catch (JAXBException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
			}
			
			SwingURLAuthenticator urlauth = new SwingURLAuthenticator();
			urlauth.setSecureSiteAuthenticationStore(urlAuthStore);
			Authenticator.setDefault(urlauth);
			
			ApplicationCore.userRessources.storeAppKeyStore();
		} catch (UnrecoverableKeyException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (KeyStoreException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (InvalidAlgorithmParameterException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (CertificateException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (IOException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		}
		
		//Remplace le vérifieur de nom d'hôte par un autre moins restrictif
	    HostnameVerifier hostnameVerifier= new HostnameVerifier() {
			@Override
			public boolean verify(String hostname, SSLSession session) {
				return true;
			}
	    };
	    HttpsURLConnection.setDefaultHostnameVerifier(hostnameVerifier);
	    try {
			HttpsURLConnection.setDefaultSSLSocketFactory(SSLUtils.getSSLSocketFactory(ApplicationCore.userRessources.getAppKeyStore()));
		} catch (KeyManagementException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (KeyStoreException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (CertificateException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		} catch (IOException e) {
			DisplayableErrorHelper.displayException(e);
			e.printStackTrace();
		}
	}

	/**
	 * Charge les plugins à lancer au démarrage
	 */
	private static void loadStartupPlugin() {
		updateStartProgressStatus(60, localisation.getResourceString("main.loadplugins")); //$NON-NLS-1$
		PluginLoader pl = new PluginLoader();

		
		List<String> disablePlugin = null;
		try {
			disablePlugin = XMLSerializer.loadXMLStructure(
					new File(ApplicationCore.userRessources.getConfigPathForUser(), "disable_plugins.xml"), false);  //$NON-NLS-1$
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		List<PluginMetadata> pluginsMetaData = pl.getPlugins(Type.STARTUP);
		
		double nbPlugins = pluginsMetaData.size();
		int iCurrentPlugin = 1;

		for (PluginMetadata pm : pluginsMetaData) {
			if(disablePlugin != null && disablePlugin.contains(pm.getName()))
				continue;
			try {
				updateStartProgressStatus(60 + (int)((40.0 / nbPlugins) * iCurrentPlugin), localisation.getResourceString("main.loadplugin", pm.getName())); //$NON-NLS-1$
				
				Class<?> cla = pm.getPluginClass();
				
				assert cla != null : "le loader devrait toujours retourner une class";  //$NON-NLS-1$
				
				Object plugin = cla.newInstance();
				for (Method m : cla.getMethods()) {
					if (m.isAnnotationPresent(PluginEntry.class)) {
						m.invoke(plugin, (Object[]) null);
						break;
					}
				}
			} catch (InstantiationException | IllegalAccessException | SecurityException | InvocationTargetException e1) {
				DisplayableErrorHelper.displayException(e1);
				e1.printStackTrace();
			}
		}
	}
	
	/**
	 * Initialise le hook d'arrêt
	 */
	private static void initShutdownHook() {
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				try {
					Thread.setDefaultUncaughtExceptionHandler(null);

					// rend l'ensemble des fichier de la base accessible en lecture/écriture pour permettre
					// le multi-utilisateur
					File[] dbfiles = new File(ApplicationCore.userRessources.getAllusersDataPath(), "base").listFiles(); //$NON-NLS-1$
					for (File dbfile : dbfiles) {
						if (dbfile.isFile()) {
							dbfile.setWritable(true, false);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * Affiche l'interface utilisateur
	 * 
	 * @param core la couche métier sous jacente
	 */
	private static void showUserInterface() {
		//Pour débugage de l'EDT
		//on charge dynamiquement pour ne pas avoir de dépendance dans le byte code et pouvoir livrer
		//les versions sans le jar associé
		try {
			Class<?> swingEdtDebugClass = Class.forName("org.jdesktop.swinghelper.debug.CheckThreadViolationRepaintManager", false, Main.class.getClassLoader()); //$NON-NLS-1$
			Object swingEdtDebugImpl = swingEdtDebugClass.getConstructor().newInstance();
			RepaintManager.setCurrentManager((RepaintManager)swingEdtDebugImpl);
		} catch(ClassNotFoundException e) {
		} catch (SecurityException e) {
		} catch (NoSuchMethodException e) {
		} catch (IllegalArgumentException e) {
		} catch (InstantiationException e) {
		} catch (IllegalAccessException e) {;
		} catch (InvocationTargetException e) {
		}
		SwingUtilities.invokeLater(new Runnable() {
			@SuppressWarnings("unused")
			@Override
			public void run() {
				//Profile profile = new Profile();
				//core.addProfile(profile);

				//new ArcCompetitionFrame(profile);
			}
		});
	}
	
	private static void updateStartProgressStatus(int percent, String message) {
		if(splash != null) {
			Graphics2D g2d = splash.createGraphics();

			g2d.setColor(Color.WHITE);
			g2d.fillRect(10, 470, 480, 20);
			g2d.setColor(Color.BLACK);
			g2d.drawRect(10, 470, 480, 20);
			
			GradientPaint gp = new GradientPaint(0, 0, new Color(200,200,255, 200), (int)((480.0 / 100.0) * percent) - 11, 0, new Color(100,100,255, 200), true);
			g2d.setPaint(gp);
			g2d.fillRect(11, 471, (int)((480.0 / 100.0) * percent), 19); 
			
			g2d.setColor(Color.BLACK);
			g2d.drawString(message, 15, 485);
			
			try {
				splash.update();
			} catch (IllegalStateException e) {
			}
		}
	}
}