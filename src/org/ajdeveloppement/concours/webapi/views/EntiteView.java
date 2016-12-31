package org.ajdeveloppement.concours.webapi.views;

import java.util.UUID;

import org.ajdeveloppement.webserver.viewbinder.annotations.Implementation;
import org.ajdeveloppement.webserver.viewbinder.annotations.View;

@View
public interface EntiteView {
	
	@Implementation(methodModelToView="getIdEntite")
	public UUID getId();
	
	public String getNom();
	
	@Implementation(methodModelToView="getSigleFederation")
	public String getSigle();
	
	public String getReference();
	
	public String getAdresse();
	
	public String getCodePostal();
	
	public String getVille();
	
	public String getPays();
	
	public String getNote();
	
	public String getLogo();
	
	public int getType();
	
	public boolean isRemovable();
	
	public UUID getIdEntiteParent();
}
