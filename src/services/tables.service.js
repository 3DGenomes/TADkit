(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Tables', Tables);

	function Tables ($q, $http) {
		var tables = "";
		return {

// Identify data type - if table filter to produce overlay and store overlay (table not stored?)
// once created overlay can be displayed as a track (in whichever form eg bar, object, level) or as table or graph

			loadTables: function(species, requestSlice) {
				var deferral = $q.defer();
				$http.get('assets/json/GSE22069_norm_aggregated_discretized_tiling_arrays.json')
				.success(function(data){
					tables = data;
					console.log("Tables for region " + requestSlice + " of " + species + " retreived from file.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getTables: function () {
				return tables;
			},
			getSampleCount: function () {
				return tables.length;
			},
			getTablesList: function () {
	   		 // first four entries are fragmentID, chromosome, start and end... the rest are tables.
				var tablesList = [];
				for (var i = 4; i < tables[0].length; i++) {
					for(var table in tables[0]){
					  tablesList.push(table); // first sample as an example.
					}				
				}
				return tablesList;
			},
			getTableCount: function () {
			 // first four entries are fragmentID, chromosome, start and end... the rest are tables.
				var tablesCount = tables[0].length - 4; // first sample as an example.
				return tablesCount;
			},
			getTableArray: function (data, id) {
				var dataset = [];
				for (var i = 0; i < data.length; i++) {
					if (data[i][id]==1) {
						dataset.push( {"fragmentID":data[i].fragmentID, "chromosome":data[i].chromosome, "start":data[i].start, "end":data[i].end} );
					} else {
						// console.log("None found in sample.");
					}
				}
				// console.log(dataset);
				return dataset;
			},
			getColors: function(tables, tableType, fragmentsCount, TADStart, fragmentLength) {
				var colors = [];
				var totalLength = fragmentsCount * fragmentLength;
				var data = this.getTableArray(tables, tableType);
				var tableColor = "#999999";
				
			// PULL IN COLORS FROM OTHER SOURCE...
					if (tableType == "HP1") tableColor = "#227c4f"; //238554
					if (tableType == "BRM") tableColor = "#8ece0d"; //aaff00
					if (tableType == "MRG15") tableColor = "#e71818";
					if (tableType == "PC") tableColor = "#6666ff";
					if (tableType == "H1") tableColor = "#424242";
					
				// console.log(data);
				// For every fragment [i]...
				for(var i=0; i<fragmentsCount; i++){
					var biotypesPresent = [];
					var fragmentLower = TADStart + (fragmentLength * i);
					var fragmentUpper = fragmentLower + fragmentLength;
					var tablesCount = data.length;
					var tablePresent = "#cccccc"; // Base color - ie if none found

					// For every row [j]...
					for(var j=0; j<tablesCount; j++){
						var start = data[j].start;
						var end = data[j].end;
						 // check if overlaps current fragment [i]
						if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
								tablePresent = tableColor;
						}
					}
					colors.push(tablePresent);
				}
				// console.log(colors);
				return colors;
			}
			
		};
	}
})();