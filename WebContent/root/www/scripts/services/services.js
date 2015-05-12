/** 
 * Services
 */

var Services = angular.module('ArcCompetitionServices', ['ngResource']);

Services.factory('Authenticate',['$resource', function($resource) {
	return $resource("/api/authenticate", {}, {
	});
}]);

Services.factory('Country',['$resource', function($resource) {
	return $resource("/api/countries/:id", {}, {
	});
}]);

Services.factory('Civility',['$resource', function($resource) {
	return $resource("/api/civilities/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.factory('Profile', ['$resource', function($resource) {
	return $resource("/api/profiles/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.factory('Entity', ['$resource', function($resource) {
	return $resource("/api/entities/:id", {}, {
		query: {method: 'GET', isArray: true},
		update: {method: 'PUT'}
	});
}]);

Services.service('EntitySelector', function() {
	var selectedEntity = null;
	
	return {
		getSelectedEntity: function() { return selectedEntity; },
		setSelectedEntity: function(entity) { selectedEntity = entity; }
	}
});

Services.factory("Contact", ['$resource', function($resource) {
	return $resource("/api/contacts/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.service('ContactSelector', function() {
	var selectedContact = null;
	
	return {
		getSelectedContact: function() { return selectedContact; },
		setSelectedContact: function(contact) { selectedContact = contact; }
	}
});

Services.factory("Rules", ['$resource', function($resource) {
	return $resource("/api/rules/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.factory("RulesCategories", ['$resource', function($resource) {
	return $resource("/api/rulesCategories/:id", {}, {
		update: {method: 'PUT'}
	});
}]);

Services.factory("AvailableEntitiesForRulesCreation", ['$resource', function($resource) {
	return $resource("/api/availableEntitiesForRulesCreation", {}, {
	});
}]);