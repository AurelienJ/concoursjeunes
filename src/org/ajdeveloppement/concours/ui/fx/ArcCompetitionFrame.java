package org.ajdeveloppement.concours.ui.fx;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javafx.application.ConditionalFeature;
import javafx.application.Platform;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;

import javax.xml.bind.JAXBException;

import org.ajdeveloppement.concours.Profile;
import org.ajdeveloppement.concours.ui.webui.AboutContentPageHandler;
import org.ajdeveloppement.concours.ui.webui.HomeContentPageHandler;
import org.ajdeveloppement.concours.ui.webui.MenuTab;
import org.ajdeveloppement.concours.ui.webui.WebContentManager;

/**
 * 
 * @author Aurélien JEOFFRAY
 *
 */
public class ArcCompetitionFrame {

	private Scene scene;
	private Profile profile;
	
	/**
	 * 
	 * @param primaryStage
	 * @param profile
	 */
	public ArcCompetitionFrame(Stage primaryStage, Profile profile) {
		this.profile = profile;
		
		init(primaryStage);
	}

	/**
	 * 
	 * @param primaryStage
	 */
	public void init(Stage primaryStage) {
		Pane layerPane;

		try {
			preparePages();
			
			FXMLLoader loader = new FXMLLoader(getClass().getResource("ArcComptetionFrame.fxml")); //$NON-NLS-1$
			layerPane = (Pane)loader.load();

			boolean is3dSupported = Platform.isSupported(ConditionalFeature.SCENE3D);
			scene = new Scene(layerPane, 1020, 700, is3dSupported);
			//if (is3dSupported) {
				// RT-13234
			//	scene.setCamera(new PerspectiveCamera());
			//}
			
			PagesManager.showPage("parameters", null); //$NON-NLS-1$

			primaryStage.setScene(scene);
			primaryStage.setOnCloseRequest(new EventHandler<WindowEvent>() {
				
				@Override
				public void handle(WindowEvent arg0) {
					System.exit(0);
				}
			});
			
			primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}
	
	@SuppressWarnings("nls")
	private void preparePages() throws UnsupportedEncodingException, FileNotFoundException, IOException, JAXBException {
		Page.setL10n(profile.getLocalisation());
		
		WebContentManager.addContentPageHandler("about", new AboutContentPageHandler(profile)); 
		
		PagesManager.load();
		
		HomeContentPageHandler homeContentPageHandler = new HomeContentPageHandler(profile);
		WebContentManager.addContentPageHandler("home", homeContentPageHandler);
		
		for(Page page : PagesManager.getMasterPages()) {
			homeContentPageHandler.addMenuTab(new MenuTab(page.getPageId(), 
					page.getLocalizedLibelle(), page.getNavigationIconFile()));
		}
	}
}
