/**
 * 
 */
function verifyAccess(session, request) {
	var authorization = request.getHeaderValues().get("authorization");
	var credential = "";
	if(authorization != null) {
		var authValues = authorization.split(" ");
		if(authValues.length > 1 && authValues[0].toLowerCase() == "basic") {
			credential = new java.lang.String(org.ajdeveloppement.commons.Base64.decodeFast(authValues[1]));
		}
		
	}
	
	//print((new Date()) + "\t" + session.getHost() + "\t" + session.getProtocol()+ "\t" + session.getRequestMethod() + "\t" + session.getRequestUri());
	
	if(request.getRequestUri().startsWith("/index.html")
			|| request.getRequestUri().equals("/")
			|| request.getRequestUri().startsWith("/api")) {
		var authToken = request.getCookiesParameters().get("authToken");
		
		if(!authToken) {
			//redirect sur login
			var response = new org.ajdeveloppement.webserver.HttpResponse(
					org.ajdeveloppement.webserver.HttpReturnCode.Redirection.MovedTemporarily, 
					"text/plain",
					"Authentification nécessaire");
			response.addHeader("Location", "http"
					+ (session.isTlsSession() ? "s" : "")
					+ "://" + request.getHost() + "/login.html");
			return response;
		}
	}
	
	if(request.getRequestUri().startsWith("/admin") 
			&& ((!session.getRemoteAddress().isAnyLocalAddress()
					&& !session.getRemoteAddress().isLoopbackAddress() 
					) && (credential != "admin:admin") )) {
		var response = new org.ajdeveloppement.webserver.HttpResponse(
				org.ajdeveloppement.webserver.HttpReturnCode.ClientError.Unauthorized, 
				"text/plain",
				"Accessible uniquement sur le réseau local");
		
		response.addHeader("WWW-Authenticate", "Basic realm=\"Authentification require\"");
		
		return response;
	}
	
	return null;
}