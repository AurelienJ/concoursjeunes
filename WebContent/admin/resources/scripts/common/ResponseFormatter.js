/**
 * 
 */

function ResponseFormatter(binaryOutput, session) {
	this.binaryOutput = binaryOutput;
	this.session = session;
}

ResponseFormatter.prototype.acceptGzipEncoding = function() {
	return this.session.getHeaderValues().containsKey("accept-encoding") && this.session.getHeaderValues().get("accept-encoding").contains("gzip");
};

ResponseFormatter.prototype.encodeToGzip = function() {
	var baos = new java.io.ByteArrayOutputStream();
	var out = new java.util.zip.GZIPOutputStream(baos);
	out.write(this.binaryOutput);
	out.finish();
	
	this.binaryOutput = baos.toByteArray();
	
	return this.binaryOutput;
};

ResponseFormatter.getGzipedResponseForOutputTemplate = function(session, content) {
	var binaryOutput = content.getBytes("UTF-8");
	var gzip = false;

	var gz = new ResponseFormatter(binaryOutput, session);
	if(gz.acceptGzipEncoding()) {
		binaryOutput = gz.encodeToGzip();
		gzip = true;
	}
	var stream = new java.io.ByteArrayInputStream(binaryOutput);
	
	var response = new org.ajdeveloppement.webserver.HttpResponse(org.ajdeveloppement.webserver.HttpReturnCode.Success.OK, "text/html; charset=utf-8", stream);
	response.setGzip(gzip);
	
	return response;
};