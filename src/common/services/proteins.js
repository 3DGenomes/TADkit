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
		},
		getProteinArray: function (data, id) {
			var dataset = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i][id]==1) {
					dataset.push( {"fragmentID":data[i]["fragmentID"], "chromosome":data[i]["chromosome"], "start":data[i]["start"], "end":data[i]["end"]} );
				} else {
					// console.log("None found in sample.");
				}
			}
			// console.log(dataset);
			return dataset;
		},
		getColors: function(proteins, proteinType, fragmentsCount, TADStart, fragmentLength) {
			var colors = [];
			var totalLength = fragmentsCount * fragmentLength;
			var data = this.getProteinArray(proteins, proteinType);
			var proteinColor = "#999999";
			
		// PULL IN COLORS FROM OTHER SOURCE...
				if (proteinType == "HP1") proteinColor = "#227c4f"; //238554
				if (proteinType == "BRM") proteinColor = "#8ece0d"; //aaff00
				if (proteinType == "MRG15") proteinColor = "#e71818";
				if (proteinType == "PC") proteinColor = "#6666ff";
				if (proteinType == "H1") proteinColor = "#424242";
				
			// console.log(data);
			// For every fragment [i]...
			for(var i=0; i<fragmentsCount; i++){
				var biotypesPresent = [];
				var fragmentLower = TADStart + (fragmentLength * i);
				var fragmentUpper = fragmentLower + fragmentLength;
				var proteinsCount = data.length;
				var proteinPresent = "#cccccc"; // Base color - ie if none found

				// For every gene [j]...
				for(var j=0; j<proteinsCount; j++){
					var start = data[j].start;
					var end = data[j].end;
					 // check if overlaps current fragment [i]
					if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
							proteinPresent = proteinColor;
					}
				};
				colors.push(proteinPresent);
			};
			// console.log(colors);
			return colors;
		}
		
	};
}])
