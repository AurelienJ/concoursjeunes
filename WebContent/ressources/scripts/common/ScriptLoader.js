/**
 * 
 */
var loadedScripts = {};

/**
 * Chargement d'un script javascript
 *  
 * @param script le chemin du script
 * @param execContext le context d'execution, si null ou vide, utilise le context global
 */
function loadScript(script, execContext) {
	if(execContext== undefined || execContext == null)
		execContext = context;
	
	if(loadedScripts[execContext] == undefined)
		loadedScripts[execContext] = new java.util.ArrayList();
	
	if(!loadedScripts[execContext].contains(script)) {
		var reader = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(new java.io.File(basePath, script)), java.nio.charset.Charset.forName("UTF-8")));
		try {
			print("Chargement du script: " + script);
			var compiledScript = engine.compile(reader);
			compiledScript.eval(execContext);
			
			loadedScripts[execContext].add(script);
		} finally {
			reader.close();
		}
	}
}
