loadScript("scripts/common/ResponseFormatter.js");
loadScript("scripts/common/Sessions.js");
/**
 * 
 */
var AJTemplate = Java.type("org.ajdeveloppement.commons.AJTemplate");
var QResults = Java.type("org.ajdeveloppement.commons.persistence.sql.QResults");
var QField = Java.type("org.ajdeveloppement.commons.persistence.sql.QField");
var HttpSession = Java.type("org.ajdeveloppement.webserver.HttpSession");
var T_Request = Java.type("org.ajdeveloppement.webserver.data.T_Request");
var FilesService = Java.type("org.ajdeveloppement.webserver.services.files.FilesService");
var JavaString = Java.type("java.lang.String");
var JavaStringArray = Java.type("java.lang.String[]");
var Pattern = Java.type("java.util.regex.Pattern");
var Date = Java.type("java.util.Date");
var LocalDateTime = Java.type("java.time.LocalDateTime");
var ZoneOffset = Java.type("java.time.ZoneOffset");

var mainTemplate = null;

function loadNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/common/navigation.thtml");
	
	template.parse("selectedCompetition", "");
	template.parse("selectedLogiciel", "");
	template.parse("selectedDocumentation", "");
	template.parse("selectedAdmin", "class=\"selected\"");
}

function loadAdminNavigationContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/admin/navigation.thtml");
	template.parse("selectedInfos", "");
	template.parse("selectedLogs", "");
	template.parse("selectedStats", "");
	template.parse("selectedBrowser", "class=\"selected\"");
}

function loadMainContent(basePath, template) {
	template.loadTemplate(basePath + "/templates/admin/browser.thtml");
	
	loadAdminNavigationContent(basePath, template.getBlocs().get("navigation"));
}

function parcourirArborescence(dataNode, path) {
	var subpath = new java.io.File(path).listFiles();
	for each (var file in subpath) {
		var treeNode = {
				'id': file.getPath().replaceAll("/","-"),
				'text': file.getName(),
				'icon': !file.isDirectory() ? "images/filestype/" + file.getName().substring(file.getName().lastIndexOf(".")+1) + ".png" : null,
				'type': file.isDirectory() ? "directory" : "file",
				'filePath': file.getPath()
			};
		if(file.isDirectory()) {
			treeNode.children = [];
			parcourirArborescence(treeNode, file);
		}
		
		dataNode.children.push(treeNode);
	}
}

function init(basePath) {
	mainTemplate = new AJTemplate();
	mainTemplate.loadTemplate(basePath + "/templates/common/skeleton.thtml");
	
	var tree = {
		'core' : {
			"check_callback" : true,
			'data' : [
				{
					'text' : 'Ressources Serveur',
					'state' : {
						'opened' : true,
						'selected' : true
					},
					'children' : []
			     },
			     {
			    	 'text' : 'Ressources Client',
			    	 'children' : []
			     }
			]
		},
		"types" : {
			"#" : {
				"valid_children" : ["directory","file"]
			},
			"default": {
				"valid_children" : ["directory","file"]
			},
			"directory": {
				"valid_children" : ["directory","file"]
			},
			"file": {
				"icon" : "images/filestype/js.png",
				"valid_children" : []
			}
		},
		"plugins" : [ "contextmenu", "dnd", "search", "state", "types" ]
	}
	
	parcourirArborescence(tree.core.data[0], new java.io.File(basePath));
	parcourirArborescence(tree.core.data[1], new java.io.File(FilesService.getBasePath().getPath()));
	
	var header = '<link rel="stylesheet" href="scripts/themes/default/style.min.css" /> \
	<link rel="stylesheet" href="scripts/codemirror/lib/codemirror.css"> \
	<link rel="stylesheet" href="scripts/codemirror/addon/hint/show-hint.css"> \
	<style> \
	#browser { \
		width: 18%; \
		display: inline-block; \
		vertical-align: top;\
	}\
	\
	#editor {\
		display: inline-block;\
		width: 80%;\
	}\
	.CodeMirror {\
		height: auto;\
	}\
	</style>';
	
	var script = <<<EOS
	<script type="text/javascript" src="scripts/jstree.min.js"></script>
	<script src="scripts/codemirror/lib/codemirror.js"></script>
	<script src="scripts/codemirror/mode/javascript/javascript.js"></script>
	<script src="scripts/codemirror/mode/xml/xml.js"></script>
	<script src="scripts/codemirror/mode/css/css.js"></script>
	<script src="scripts/codemirror/mode/htmlmixed/htmlmixed.js"></script>
	<script src="scripts/codemirror/addon/hint/show-hint.js"></script>
	<script src="scripts/codemirror/addon/hint/javascript-hint.js"></script>
	<script src="scripts/codemirror/addon/hint/html-hint.js"></script>
	<script src="scripts/codemirror/addon/hint/css-hint.js"></script>
	<script src="scripts/codemirror/addon/selection/active-line.js"></script>
	<script type="text/javascript">
	if (typeof String.prototype.endsWith !== 'function') {
	    String.prototype.endsWith = function(suffix) {
	        return this.indexOf(suffix, this.length - suffix.length) !== -1;
	    };
	}
	
	$(function () {
		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
			  mode: "text/javascript",
			  styleActiveLine: true,
			  lineNumbers: true,
			  lineWrapping: true,
			  indentWithTabs: true,
			  indentUnit: 4,
			  extraKeys: {"Ctrl-Space": "autocomplete"}
			});
		$('#browser').on('changed.jstree', function (e, data) {
			var filePath = data.instance.get_node(data.selected[0]).original.filePath;
			if(filePath == undefined)
				return;
			
			if(filePath.endsWith("html")
					|| filePath.endsWith("htm")
					|| filePath.endsWith("js")
					|| filePath.endsWith("css")
					|| filePath.endsWith("txt")) {
			    $.get( "admin/browser-showFile.ajax?file=" + filePath, function( data ) {
			    	var isEditable = false;
			    	if(filePath.endsWith("html") || filePath.endsWith("htm")) {
			    		var mixedMode = {
		    		        name: "htmlmixed",
		    		        scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
		    		                       mode: null}]
		    		      };
			    		editor.setOption("mode",mixedMode);
			    		isEditable = true;
			    	} else if(filePath.endsWith("js")) {
			    		editor.setOption("mode","text/javascript");
			    		isEditable = true;
			    	} else if(filePath.endsWith("css")) {
			    		editor.setOption("mode","text/css");
			    		isEditable = true;
			    	} else if(filePath.endsWith("txt")) {
			    		editor.setOption("mode","text/plain");
			    		isEditable = true;
			    	}
			    	
			    	if(isEditable) {
			    		$("#save").data("file", filePath);
			    		editor.getDoc().setValue(data);
			    	}
			    });
			}
		  }).jstree(
	EOS
	
	script += JSON.stringify(tree);
	
	script += <<<EOS
		  );
		
		$("#save").click(function() {
			$.ajax({
		        type: "PUT",
		        url: "admin/browser-showFile.ajax?file=" + $(this).data("file"),
		        data: editor.getDoc().getValue(),
		        success: function(data) { },
		        dataType: "text"
	        });
			
			return false;
		});
	});
	</script>
	EOS

	mainTemplate.parseBloc("head", header);
	mainTemplate.parseBloc("script", script);
	
	mainTemplate.parse("TITRE","ArcCompetition, Gestion des Compétition de Tir à l'Arc");
	mainTemplate.parse("FILARIANNE", "<a href=\"tools.html\">Outils</a> &gt; Administration");
	
	loadNavigationContent(basePath, mainTemplate.getBlocs().get("navigation"));
	
	loadMainContent(basePath, mainTemplate.getBlocs().get("main"));
}

function getPage(session) {
	var template = mainTemplate.clone();
	
	var mainBloc = template.getBlocs().get("main");
	
	
	
	return ResponseFormatter.getGzipedResponseForOutputTemplate(session, template.output());
}