(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Resources', Resources);

	function Resources($q, $http, Color, uuid4) {
		var resources = {};
		var ensemblRoot = "http://rest.ensemblgenomes.org/";
		resources.assembly = {};
		resources.featureColors = {};
		return {
			setLengthBP: function(top_level_region) {
				var lengthBP = 0;
				var regionBPs = top_level_region;
				for (var regionBP in regionBPs) {
					if (regionBPs.hasOwnProperty(regionBP)) {
						for (var i = 0, j = regionBPs.length; i < j; i++) {
							lengthBP += regionBPs[i].length;
						}
					}
				}
				return lengthBP;
			},
			// loadInfoAssembly: function(speciesUrl, online) { // *** UNUSED ***
			// 	var deferral = $q.defer();
			// 	var self = this;
			// 	var source;
			// 	if (online) {
			// 		source = ensemblRoot + "info/assembly/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		source = "assets/json/" + speciesUrl + "-assembly.json";
			// 	}
			// 	$http.get(source)
			// 	.success(function(data){
			// 		var whence = online ? "Ensembl" : "local storage";
			// 		console.log("Assembly Info for " + speciesUrl + " retreived from " + whence + ".");
			// 		data.lengthBP = self.setLengthBP(data.top_level_region);
			// 		console.log("Assembly length for " + speciesUrl + " = " + data.lengthBP);
			// 		resources.assembly = data;
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			loadBiotypeColors: function() {
				var deferral = $q.defer();
				var online = false;//$scope.online;
				var source;
				if (online) {
				// source = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					source = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					source = "assets/json/ensembl-webcode-COLOUR.ini";

				}
				$http.get(source)
				.success(function(data){
					var iniData = Color.colorsFromIni(data);
					resources.featureColors = iniData;
					resources.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					deferral.resolve(iniData);
				});
				return deferral.promise;
			},
			// loadInfoBiotypes: function(speciesUrl) { // *** UNUSED ***
			// 	var deferral = $q.defer();
			// 	var source;
			// 	if (online) {
			// 		source = ensemblRoot + "info/biotypes/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		source = "assets/json/" + speciesUrl + "-biotypes.json";
			// 	}
			// 	$http.get(source).
			// 	success(function(data){
			// 		console.log("Biotypes for " + speciesUrl + " retreived from Ensembl.");
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			get: function () {
				return resources;
			},
			getRegionBiotypes: function (genes) {
				// GET BIOTYPES AND SET BIOTYPE COLORS
				var biotypes = [];
				var featureColors = [
					// other: 16753920
					// protein_alignment: 255
					// protein_coding: 12009742
					// pseudogene: 6710886
				];
				var biotypesLookup = {};
				for (var item, i = 0; item == genes[i++];) {
					var geneBiotype = item.biotype;
					if (!(geneBiotype in biotypesLookup)) {
					biotypesLookup[geneBiotype] = 1;
					biotypes.push(geneBiotype);
					}
				}
				console.log("Biotypes");
				console.log(biotypes);
				var totalbiotypes = biotypes.length;
				console.log("Total Biotypes: %s", totalbiotypes);
			}
		};
	}
})();