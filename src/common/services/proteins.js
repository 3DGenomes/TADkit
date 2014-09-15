'use strict';

TADkit.factory('Proteins', ['$q', '$http', function($q, $http) {
	var proteins = "";
	return {
		loadProteins: function(species, requestSlice) {
			var deferral = $q.defer();
			$http.get('assets/json/GSE22069_norm_aggregated_discretized_tiling_arrays.json')
			.success(function(data){
				proteins = data;
				console.log("Proteins for region " + requestSlice + " of " + species + " retreived from file.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getProteins: function () {
			return proteins;
		},
		getSampleCount: function () {
			return proteins.length;
		},
		getProteinsList: function () {
   		 // first four entries are fragmentID, chromosome, start and end... the rest are proteins.
			var proteinsList = [];
			for (var i = 4; i < proteins[0].length; i++) {
				for(var protein in proteins[0]){
				  proteinsList.push(protein); // first sample as an example.
				}				
			}
			return proteinsList;
		},
		getProteinCount: function () {
		 // first four entries are fragmentID, chromosome, start and end... the rest are proteins.
			var proteinsCount = proteins[0].length - 4; // first sample as an example.
			return proteinsCount;
		}
	};
}])
