'use strict';

TADkit.factory('Interactions', ['$q', '$http', function($q, $http) {
	var interactions = "";
	return {
		loadInteractions: function() {
			var deferral = $q.defer();
			$http.get('assets/json/kartes_example_X_1559-1660.json')
			.success(function(data){
				interactions = data;
				console.log("Interactions retreived from file.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getInteractions: function () {
			return interactions;
		}
	};
}])
