/**
 * 
 */

$.getScript = function(url, callback, cache){
	$.ajax({
		crossDomain: true,
		type: "GET",
		url: url,
		success: callback,
		dataType: "script",
		cache: cache
	});
};

var pageContext = {};

/**
 * Charge le contenu du fragment de page définit en parametre
 */
function loadContent(page, container, context, updateTitle) {
	if(updateTitle == undefined)
		updateTitle = true;
	
	if(context == undefined)
		context = {};
	
	if(container == "#main") {
		window.history.pushState(context,'',"#"+page);
		localStorage.lastAccessPoint = JSON.stringify({
				context: context,
				page: page
		})
	}

	pageContext[page] = context;
	
	$.getJSON("descripteurs/" + page + ".json", function(data) {
		if(data.mainContent != undefined) {
			if(updateTitle)
				$("#pagetitle").html(data.title);
			
			if(container == "#main" && data.shortTitle != undefined) {
				$("#filArianne").empty();
				
				if(context.navHistory != undefined && context.navHistory!= null) {
					for(var i in context.navHistory) {
						$("#filArianne").append(" &gt; ");
						var link = $("<a href\"#parameters\">" + context.navHistory[i].shortTitle + "</a>");
						link.click(function(e) {
							loadContent(context.navHistory[i].name, container, context.navHistory[i].context);
							
							return false;
						});
						$("#filArianne").append(link);
					}
				}
				
				$("#filArianne").append(" &gt; " + data.shortTitle);
			}

			$.get("fragment.html?page=" + data.mainContent, function( content ) {
				$(container).empty();
				$(container).html(content);
				
				for(var i in data.scripts) {
					$.getScript(data.scripts[i], function(e) {}, true);
				}
			});
		}
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
}

$(document).ready(function() {
	//
	// Ecran tactile: déroulement du menu
	//
	$("nav").bind("touchstart", function(e) {
		var touches = e.changedTouches;
		
		startPoint = { X:touches[0].pageX, Y:touches[0].pageY };
	});
	
	$("nav").bind("touchend", function(e) {
		if(startPoint != null && startPoint.X > -1) {
			var touches = e.changedTouches;
			if(startPoint.X + 100 < touches[0].pageX) {
		   		$("#home > nav").css("width", '220px');
		    	$("#home > nav:hover .masquable").show();
		    } else if(startPoint.X - 100 > touches[0].pageX) {
		    	$("#home > nav").css("width", '40px');
		    	$("#home > nav:hover .masquable").hide();
		    }
	    }
	});
	
	$(window).bind('popstate', function(e) {
		var page = window.location.hash.substring(1);
		if(page != "")
			loadContent(page, "#main");
	});
	
	if(localStorage.lastAccessPoint != undefined) {
		var lastAccessPoint = JSON.parse(localStorage.lastAccessPoint);
		loadContent(lastAccessPoint.page, "#main", lastAccessPoint.context);
	}
	else
		loadContent("parameters", "#main");
	
	$("#homeNav").click(function(e) {
		loadContent("parameters", "#main");
		
		return false;
	});
	
	$("#entitiesNav").click(function(e) {
		loadContent("listEntities", "#main");

		return false;
	});
});