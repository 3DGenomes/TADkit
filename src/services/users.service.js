(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Users', Users);

	function Users($q, $http, uuid4) {
		var users = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-users.json";
				if( users.loaded.length > 0 ) {
					 deferred.resolve(users);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						users.loaded = data;
						console.log("Users (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(users);
					});
				}
				return deferred.promise;
			},
			add: function(details) {
				details = details || ["id", "Name Surname", "email@company.com", "Group", "edit", ["default"]];
				var user = {
					metadata : {
						version : 1.0,
						type : "user",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					projects : details[5]
				};
				users.loaded.push(user);
				users.current = users.loaded.length - 1;
				return users;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded.indexOf(index);
				users.loaded.splice(user, 1);
				return users;
			},
			set: function(index) {
				if (index !== undefined || index !== false) users.current.index = index;
				var current = users.loaded[users.current.index];
				return current;
			},
			get: function() {
				return users;
			},
			getUser: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded[index];
				return user;
			},
			getPermissions: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var permissions = users.loaded[index].permissions;
				return permissions;
			}
		};
	}
})();