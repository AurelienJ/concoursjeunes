Services.service('EntitySelector', function() {
	var selectedEntity = null;
	
	return {
		getSelectedEntity: function() { return selectedEntity; },
		setSelectedEntity: function(entity) { selectedEntity = entity; }
	}
});