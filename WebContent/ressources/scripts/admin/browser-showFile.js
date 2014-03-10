/**
 * 
 */
var JavaString = Java.type("java.lang.String");
var JavaStringArray = Java.type("java.lang.String[]");
var JavaCharArray = Java.type("char[]");

var mainTemplate = null;

function init(basePath) {
	
}

function getPage(session) {
	
	if(session.getUrlParameters().containsKey("file")) {
		var file = session.getUrlParameters().get("file");
		if(!file.isEmpty()) {
			var f = new java.io.File(file);
			if(f.exists() && !f.isDirectory()) {
				if(session.getRequestMethod() == org.ajdeveloppement.webserver.HttpMethod.GET) {
					var stream = new java.io.FileInputStream(file);
					
					var response = new org.ajdeveloppement.webserver.HttpResponse(org.ajdeveloppement.webserver.HttpReturnCode.Success.OK, "application/octet-stream", stream);
					
					return response;
				} else if(session.getRequestMethod() == org.ajdeveloppement.webserver.HttpMethod.PUT) {
					org.ajdeveloppement.commons.io.FileUtils.dumpStreamToFile(session.getInputStream(), f, false, java.lang.Long.parseLong(session.getHeaderValues().get("content-length")));
					/*var inReader = session.getBufferedReader();
					var buffer = new JavaCharArray(4096);
					var putContent = ""; //$NON-NLS-1$
					var nbRead = 0;
					while((nbRead = inReader.read(buffer)) > -1) {
						putContent += new JavaString(java.util.Arrays.copyOfRange(buffer, 0, nbRead));
						print(putContent);
						if(nbRead >= java.lang.Long.parseLong(session.getHeaderValues().get("content-length")))
							break;
					}*/
					
					print("OK");
					
					return ResponseFormatter.getGzipedResponseForOutputTemplate(session, "OK");
				}  else if(session.getRequestMethod() == org.ajdeveloppement.webserver.HttpMethod.DELETE) {
					f.delete();
					
					return ResponseFormatter.getGzipedResponseForOutputTemplate(session, "OK");
				}
			}
		}
	}
	
	return null;
}