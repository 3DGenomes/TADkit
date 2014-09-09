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
		getColors: function(genes, fragmentsCount, TADStart, fragmentLength) {
			var colors = [];
			for(var i=0; i<fragmentsCount; i++){
				var fragmentLower = TADStart + (fragmentLength * i);
				var fragmentUpper = fragmentLower + fragmentLength;
				var genesCount = this.getGenesCount();
				var color = "#666666"; // Base color - ie if none found

				for(var j=0; j<genesCount; j++){
					var start = genes[j].start;
					var end = genes[j].end;
					if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
						// Str biotype = geneBiotype[j];
						// for(int k=0; k<biotypesPresent -> size(); k++) // for every type
						// {
						//	   if ( biotypesList[k].find(biotype) == biotypesList[k].end() )
						//	   {
						//		  console.log("No " + biotype + " found at" + i ;
						//	   } else {
						//		   (*(*biotypesPresent)[k])[i] = (*(*biotypesPresent)[k])[i] + 1;
						//		   (*biotypesScales)[i] = (*biotypesScales)[i] + 1;
						//	   }
						// }
						
						color =  "#115522";
					} else {
						// console.log("No fragment overlap.");
					}
				};
				colors.push(color);
			};
			return colors;
		}
	};
}])
