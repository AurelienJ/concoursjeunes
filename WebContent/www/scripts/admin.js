/**
 * 
 */
function reload(page) {
	var url = "/admin/global.html?reload=" + page
	$.getJSON(url, function(data) {
		if(data.status == "OK") {
			$("#" + page.replace(".","\\.")).css("color", "green");
		} else {
			$("#" + page.replace(".","\\.")).css("color", "red");
		}
	});
	return false;
}