'use strict';

TADkit.factory('Genes', ['$q', '$http', function($q, $http) {
	var ensemblRoot = "http://rest.ensembl.org/";
	var genes = "";
	return {
		loadRegionGenes: function(species, requestSlice) {
			var deferral = $q.defer();
			$http.get('assets/json/drosophila_melanogaster-genes.json')
			// $http.get(ensemblRoot + "overlap/region/" + species + "/" + requestSlice + "?feature=gene;content-type=application/json")
			.success(function(data){
				genes = data;
				console.log("Genes for Region " + requestSlice + " of " + species + " retreived from Ensembl.");
				//console.log(data);
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getGenes: function () {
			return genes;
		},
		getGenesCount: function () {
			return genes.length;
		},
		getColors: function(genes, biotypes, fragmentsCount, TADStart, fragmentLength) {
			var colors = [];
			var biotypesPresent = [];
			for(var i=0; i<fragmentsCount; i++){
				var fragmentLower = TADStart + (fragmentLength * i);
				var fragmentUpper = fragmentLower + fragmentLength;
				var genesCount = this.getGenesCount();
				var color = "#888888"; // Base color - ie if none found
				biotypesPresent.push([]);
				for(var j=0; j<genesCount; j++){
					var start = genes[j].start;
					var end = genes[j].end;
					var biotype = "";
					if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
						biotype = genes[j].biotype;
						console.log(biotype);
						biotypesPresent[i].push(biotype);
						
						if (biotype in biotypes) {
							// console.log("color found");
							color = biotypes[biotype];
						} else {
							console.log(biotype);
							color = "#110100";
						}
					} else {
						// console.log("No fragment overlap.");
					}
					// 1. if number over 1 then
				};
				colors.push(color);
			};
			console.log(JSON.stringify(biotypesPresent));
			console.log(colors);
			return colors;
		}
	};
}])
