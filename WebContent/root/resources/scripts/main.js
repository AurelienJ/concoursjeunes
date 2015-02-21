/**
 * Js Service Entry point
 */

//Declare initial JsService Webserver environment
//Expose methods:
// - init(server) - Invoke on webserver start
// - canServer(session) - return if request can be served by service
// - serve(session) - serve response for a request
// - serveErrorResponse(session, errorCode, errorContent) - serve an error response for a request and an error code
// - 
// - register(serviceUris, webPage) - register Uris response service
// - unload() - Invoke when server stop or service restart
load("intern:init.js");

//Declare sessions helpers
//Expose Sessions js class
//usage: var userSession = new Sessions(httpSession);
//methods:
// - userSession.getSessionData() - return session data
// - userSession.putSessionData(data, persistent) - put data in session context. If persistent is true save data on a persitent environment
// - userSession.addCookieHeader(response, maxAge) - add on a response the SESSIONID Cookie
load("intern:Sessions.js");

//Declare Node.js modules environment (require(path))
load("intern:jvm-npm.js");

//Begin service operation

/*
 * Exemple:
register(["/", "/index.htm", "/index.html"], (function(global) {
	return {
		init: function(server) {},
		getPage: function(session) {
			return ResponseFormatter.getGzipedResponseForOutputTemplate(session, "Hello World!", "text/plain");
		}
	}
})(this));*/
load(basePath + "/scripts/index.js");

//end service

//If unload methods
function unload() {
	
}