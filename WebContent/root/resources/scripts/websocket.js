loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");

var mainTemplate = null;
var basePath = null;

function init(basePath) {
	this.basePath = basePath;
	
}

function getPage(session) {
	if(session.getHeaderValues().containsKey("upgrade") && session.getHeaderValues().get("upgrade").equals("websocket")) {
		//C'est une connection websocket
		//
		var secureWebSocketKey = session.getHeaderValues().get("Sec-WebSocket-Key");
		var origin = session.getHeaderValues().get("origin");
		var secureWebSocketProtocol = session.getHeaderValues().get("Sec-WebSocket-Protocol");
		
		var acceptHandshake = secureWebSocketKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		
		var crypt = java.security.MessageDigest.getInstance("SHA-1");
        crypt.reset();
        crypt.update(acceptHandshake.getBytes("UTF-8"));
        var sha1 = java.util.Base64.getEncoder().encodeToString(crypt.digest());
		
		var responseCode = org.ajdeveloppement.webserver.HttpReturnCode.Success.SwitchingProtocols;
		
		var response = new org.ajdeveloppement.webserver.HttpResponse(
				responseCode, null, null);
		response.addHeader("Upgrade","websocket");
		response.addHeader("Connection","upgrade");
		response.addHeader("Sec-WebSocket-Accept", sha1);
		response.addHeader("Sec-WebSocket-Protocol", "chat");
		
		return response;
	}
	
	return null;
}