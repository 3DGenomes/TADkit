'use strict';

TADkit.service('Assembly', ['$q', '$http', function($q, $http) {
	var ensemblRoot = "http://rest.ensembl.org/";
	var assembly = "";
	return {
		loadInfoAssembly: function(species) {
			var deferral = $q.defer();
			$http.get('assets/json/drosophila_melanogaster-assembly.json'). // OFFLINE
			// $http.get(ensemblRoot + "info/assembly/" + species + "?content-type=application/json").
			success(function(data){
				assembly = data;
				console.log("Assembly Info for " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getAssembly: function () {
			return assembly;
		},
		getInfoBiotypes: function() {
			var deferral = $q.defer();
			var species = TAD.getSpecies();
			$http.get('assets/json/drosophila_melanogaster-biotypes.json'). // OFFLINE
			// $http.get(ensemblRoot + "info/biotypes/" + species + "?content-type=application/json").
			success(function(data){
				console.log("Biotypes for " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getBiotypeColors: function() {
			var deferral = $q.defer();
			$http.get('assets/json/ensembl-webcode-COLOUR.ini'). // OFFLINE
			// $http.get("https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini").
			success(function(data){
				var iniData = ini.parse(data);
				console.log("Ensembl webcode biotype colors retrieved Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getRegionGenes: function(requestSlice) {
			var deferral = $q.defer();
			var species = TAD.getSpecies();
			$http.get('assets/json/drosophila_melanogaster-genes.json'). // OFFLINE
			// $http.get(ensemblRoot + "overlap/region/" + species + "/" + requestSlice + "?feature=gene;content-type=application/json").
			success(function(data){
				console.log("Genes for Region " + requestSlice + " of " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getRegionBiotypes: function (genes) {
			// GET BIOTYPES AND SET BIOTYPE COLORS
			var TADBiotypes = [];
			var biotypeColors = [
				// other: 16753920
				// protein_alignment: 255
				// protein_coding: 12009742
				// pseudogene: 6710886
			];
			var TADBiotypesLookup = {};
			for (var item, i = 0; item = genes[i++];) {
			  var TADGeneBiotype = item.biotype;
			  if (!(TADGeneBiotype in TADBiotypesLookup)) {
				TADBiotypesLookup[TADGeneBiotype] = 1;
				TADBiotypes.push(TADGeneBiotype);
			  }
			}
			console.log("TAD Biotypes");
			console.log(TADBiotypes);
			var totalTADBiotypes = TADBiotypes.length;
			console.log("Total TAD Biotypes: %s", totalTADBiotypes);
		}
	};
}])
