'use strict';

TADkit.factory('Contacts', ['$q', '$http', function($q, $http) {
	var contacts = "";
	return {
		loadContacts: function() {
			var deferral = $q.defer();
			$http.get('assets/json/kartes_example_X_1559-1660.json')
			.success(function(data){
				contacts = data;
				console.log("Interactions retreived from file.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getContacts: function () {
			return contacts;
		}
	};
}])
