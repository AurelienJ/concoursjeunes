function activeTab() {
	var currentSelectedNode = this.parentNode.getAttribute("data-current");
	if(currentSelectedNode != null) {
		document.getElementById(currentSelectedNode).style.backgroundImage = null;
		document.getElementById(currentSelectedNode).style.color = null;
	}
	
	this.parentNode.setAttribute("data-current",this.id);
	this.style.backgroundImage="url('images/whitebackground.png')";
	this.style.color="black";
	
	app.showPage(this.id);
}
	
window.onload = function() {
	var tabs = document.getElementsByClassName("tabs");
	
	for (var i = 0; i < tabs.length; i++) {
      tabs[i].onclick = activeTab;
    }
}