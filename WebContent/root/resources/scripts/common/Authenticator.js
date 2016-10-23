var adminUser = {
		getId: function() {
			return 1;
		},
		getLogin: function() {
			return "admin";
		},
		getPassword: function() {
			var digest = java.security.MessageDigest.getInstance("SHA-256");
			var passwordHash = org.ajdeveloppement.commons.Converters.byteArrayToHexString(
					digest.digest(new java.lang.String("admin").getBytes("UTF-8")));
			
			return passwordHash;
		}
	};

function Authenticator(httpSession) {
	this.appSession = new Sessions(httpSession);
	
	var sessionData = this.appSession.getSessionData();
	if(sessionData == null || !sessionData.logged) {
		var login = httpSession.getPostParameters().get("login");
		var password = httpSession.getPostParameters().get("password");

		if(login != null && password != null) {
			var digest = java.security.MessageDigest.getInstance("SHA-256");
			var passwordHash = org.ajdeveloppement.commons.Converters.byteArrayToHexString(digest.digest(password.getBytes("UTF-8")));
			
			var user = this.getUserForCredential(login, passwordHash);
			if(user != null) {
				this.appSession.putSessionData({
					logged: true,
					userId: user.getId()
				});
				
				this.loggedUser = user;
			}
		}
	} else {
		var user = this.getSessionUser(sessionData);
		if(user != null) {
			this.loggedUser = user;
		}
	}
}

Authenticator.prototype.getUser = function(login) {
	if(login == "admin") {
		return adminUser;
	}
	return null;
};

Authenticator.prototype.getSessionUser = function(sessionData) {
	if(sessionData.userId == 1) {
		return adminUser;
	}
	return null;
};

Authenticator.prototype.getUserForCredential = function(login, passwordHash) {
	var user = this.getUser(login);
	if(user != null && user.getPassword() == passwordHash) {
		return user;
	}
	
	return null;
};

Authenticator.prototype.getLoggedUser = function() {
	return this.loggedUser;
};


Authenticator.prototype.getAppSession = function() {
	return this.appSession;
};