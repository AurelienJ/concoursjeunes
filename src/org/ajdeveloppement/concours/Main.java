/*
 * Copyright 2002-2008 - Aurélien JEOFFRAY
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
import java.nio.file.Paths;
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

import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;
import javax.swing.JOptionPane;
import javax.xml.bind.JAXBException;

import org.ajdeveloppement.apps.AppUtilities;
import org.ajdeveloppement.apps.ApplicationContext;
import org.ajdeveloppement.commons.AjResourcesReader;
import org.ajdeveloppement.commons.UncheckedException;
import org.ajdeveloppement.commons.io.XMLSerializer;
import org.ajdeveloppement.commons.persistence.ObjectPersistenceException;
import org.ajdeveloppement.commons.persistence.sql.QResults;
import org.ajdeveloppement.commons.security.SSLUtils;
import org.ajdeveloppement.commons.security.SecureSiteAuthenticationStore;
import org.ajdeveloppement.commons.ui.SwingURLAuthenticator;
import org.ajdeveloppement.concours.data.Contact;
import org.ajdeveloppement.concours.data.Profile;
import org.ajdeveloppement.concours.exceptions.ExceptionHandlingEventQueue;
import org.ajdeveloppement.concours.plugins.Plugin.Type;
import org.ajdeveloppement.concours.plugins.PluginEntry;
import org.ajdeveloppement.concours.plugins.PluginLoader;
import org.ajdeveloppement.concours.plugins.PluginMetadata;
import org.ajdeveloppement.swingxext.error.WebErrorReporter;
import org.ajdeveloppement.swingxext.error.ui.DisplayableErrorHelper;
import org.ajdeveloppement.webserver.DefaultDeploymentService;
import org.ajdeveloppement.webserver.DefaultResourcesSelector;
import org.ajdeveloppement.webserver.DeploymentService;
import org.ajdeveloppement.webserver.HttpServer;
import org.ajdeveloppement.webserver.ResourcesSelector;
import org.ajdeveloppement.webserver.services.ExtensibleHttpRequestProcessor;
import org.ajdeveloppement.webserver.services.files.FilesService;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.browser.VisibilityWindowListener;
import org.eclipse.swt.browser.WindowEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Monitor;
import org.eclipse.swt.widgets.Shell;
import org.h2.tools.DeleteDbFiles;
import org.jdesktop.swingx.error.ErrorInfo;

/**
 * Class initial de l'application.
 * 
 * @author Aurélien JEOFFRAY
 * @version 2.3
 * 
 */
public class Main {
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

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.setProperty("nashorn.option.scripting", "true"); //$NON-NLS-1$ //$NON-NLS-2$
		
		FilesService.setAllowedGzipExt(Arrays.asList(staticParameters.getResourceString(WEBSERVER_STATIC_ALLOWEDGZIPEXT).split(","))); //$NON-NLS-1$
		
		String[] servicesOrder = staticParameters.getResourceString(WEBSERVER_SERVICE_ORDER).split(","); //$NON-NLS-1$
		ExtensibleHttpRequestProcessor extensibleHttpRequestProcessor = new ExtensibleHttpRequestProcessor(servicesOrder);
		
		ResourcesSelector fileSelector = getFileSelector();
		DeploymentService deployment = new DefaultDeploymentService();
		deployment.setBasePath(fileSelector.getBasePath());
		try {
			deployment.deployAll();
		} catch (IOException e1) {
			throw new UncheckedException(e1);
		}
		fileSelector.setDeploymentService(deployment);

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
		
//		String baseContainer = ""; //$NON-NLS-1$
//		if(fileSelector != null)
//			baseContainer = fileSelector.getBasePath().toString();
		
//		WebConfig.init(httpServer, baseContainer);
		
		System.out.println("Http listen on port: " + webServerListenPort); //$NON-NLS-1$
				
		Display display = Display.getDefault();
		Display.setAppName("ArcCompetition 0.0.1");
        final Shell shell = new Shell(display, SWT.SHELL_TRIM);
        shell.setSize(1280, 768);
        shell.setLayout(new FillLayout());
       
        Browser browser = new Browser(shell, SWT.NONE);
        /*browser.addTitleListener(new TitleListener() {
            public void changed(TitleEvent event) {
                shell.setText(event.title);
             }
          });*/
        initialize(display, browser);
        browser.setBounds(0,0,1024,768);
        browser.setUrl("http://localhost:" + webServerListenPort + "/index.html"); //$NON-NLS-1$ //$NON-NLS-2$
        
        
        
        
        
        Monitor primary = display.getPrimaryMonitor();
        Rectangle bounds = primary.getBounds();
        Rectangle rect = shell.getBounds();
        
        int x = bounds.x + (bounds.width - rect.width) / 2;
        int y = bounds.y + (bounds.height - rect.height) / 2;
        
        System.out.println(Paths.get("").toAbsolutePath().toString()); //$NON-NLS-1$
        
        shell.setLocation(x, y);
        shell.setText("ArcCompetition 0.0.1");
        shell.setImage(new Image(display, "ressources/graphics/iconCJ.jpg")); //$NON-NLS-1$
        shell.open();
        
        
         
        while (!shell.isDisposed()) {
        	if (!display.readAndDispatch())
        		display.sleep();
        }
        
        display.dispose();
	}
	
	private static void initialize(final Display display, Browser browser) {
		browser.addOpenWindowListener(event -> {
			if (!event.required) return;	/* only do it if necessary */
			Shell shell = new Shell(display);
			shell.setText("New Window");
			shell.setLayout(new FillLayout());
			Browser browser1 = new Browser(shell, SWT.NONE);
			initialize(display, browser1);
			event.browser = browser1;
		});
		browser.addVisibilityWindowListener(new VisibilityWindowListener() {
			@Override
			public void hide(WindowEvent event) {
				Browser browser = (Browser)event.widget;
				Shell shell = browser.getShell();
				shell.setVisible(false);
			}
			@Override
			public void show(WindowEvent event) {
				Browser browser = (Browser)event.widget;
				final Shell shell = browser.getShell();
				if (event.location != null) shell.setLocation(event.location);
				if (event.size != null) {
					Point size = event.size;
					shell.setSize(shell.computeSize(size.x, size.y));
				}
				shell.open();
			}
		});
		browser.addCloseWindowListener(event -> {
			Browser browser1 = (Browser)event.widget;
			Shell shell = browser1.getShell();
			shell.close();
		});
	}
	
	/**
	 * Return the file selector
	 * 
	 * @return the file selector
	 */
	private static ResourcesSelector getFileSelector() {
		ResourcesSelector fileSelector = null;
		String fileSelectorFilePath = staticParameters.getResourceString(WEBSERVER_FILESELECTOR_FILE);
		if(fileSelectorFilePath != null && !fileSelectorFilePath.isEmpty()) {
			URL fileSelectorURL = staticParameters.getClass().getResource(fileSelectorFilePath);
			if(fileSelectorURL != null) {
				File fileSelectorFile = new File(fileSelectorURL.getPath());
				if(fileSelectorFile.exists()) {
					try {
						fileSelector = XMLSerializer.loadMarshallStructure(fileSelectorFile, DefaultResourcesSelector.class);
					} catch (JAXBException | IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		if(fileSelector == null)
			fileSelector = new DefaultResourcesSelector();
		return fileSelector;
	}
	
	boolean onDrag = false;
	
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
			Contact defaultUser = new Contact("default", "", null); //$NON-NLS-1$ //$NON-NLS-2$
			
			Profile profile = new Profile();
			profile.setEntite(null);
			profile.setIntitule("default"); //$NON-NLS-1$
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