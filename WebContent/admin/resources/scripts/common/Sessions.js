

function Sessions(session) {
	this.sessionId = null;
	this.creation = false;
	
	if(session.getCookiesParameters().containsKey("sessionid")) {
		var sessionId = java.util.UUID.fromString(session.getCookiesParameters().get("sessionid"));
		if(sessionId != null) {
			this.sessionId = sessionId;
		}
	} else if(session.getUrlParameters().containsKey("sessionid")) {
		var sessionId = java.util.UUID.fromString(session.getUrlParameters().get("sessionid"));
		if(sessionId != null) {
			this.sessionId = sessionId;
		}
	}
	
	if(this.sessionId == null)
		this.createSessionId();
}

Sessions.prototype.getSessionId = function() {
	return this.sessionId;
};

Sessions.prototype.createSessionId = function() {
	this.sessionId = java.util.UUID.randomUUID();
	this.creation = true;
};

Sessions.prototype.getSessionData =function(){
	return org.ajdeveloppement.webserver.services.js.SessionManager.getSession(this.sessionId);
};

Sessions.prototype.putSessionData = function(data){
	return org.ajdeveloppement.webserver.services.js.SessionManager.putSession(this.sessionId, data);
};

Sessions.prototype.addCookieHeader = function(response) {
	if(this.creation)
		response.addHeader("Set-Cookie", "SESSIONID="+ this.sessionId.toString());
};