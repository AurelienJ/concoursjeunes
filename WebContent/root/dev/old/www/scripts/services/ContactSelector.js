Services.service('ContactSelector', function() {
	var selectedContact = null;
	
	return {
		getSelectedContact: function() { return selectedContact; },
		setSelectedContact: function(contact) { selectedContact = contact; }
	}
});