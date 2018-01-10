(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Resources', Resources);

	function Resources($q, $http, uuid4, Color, Settings) {
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
			// 	var dataUrl;
			// 	if (online) {
			// 		dataUrl = ensemblRoot + "info/assembly/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		dataUrl = "assets/defaults/" + speciesUrl + "-assembly.json";
			// 	}
			// 	$http.get(dataUrl)
			// 	.success(function(data){
			// 		var source = online ? "Ensembl" : "local storage";
			// 		console.log("Assembly Info for " + speciesUrl + " retreived from " + source + ".");
			// 		data.lengthBP = self.setLengthBP(data.top_level_region);
			// 		console.log("Assembly length for " + speciesUrl + " = " + data.lengthBP);
			// 		resources.assembly = data;
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			loadBiotypeColors: function() {
				var deferral = $q.defer();
				var dataUrl;
				var online = false; // Settings.getOnline(); // Most up-to-date version not strictly necessary
				if (online) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-COLOUR.ini";

				}
				$http.get(dataUrl)
				.then(function(data){
					var iniData = Color.colorsFromIni(data.data);
					resources.featureColors = iniData;
					resources.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					deferral.resolve(iniData);
				});
				return deferral.promise;
			},
			// loadInfoBiotypes: function(speciesUrl) { // *** UNUSED ***
			// 	var deferral = $q.defer();
			// 	var dataUrl;
			// 	if (online) {
			// 		dataUrl = ensemblRoot + "info/biotypes/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		dataUrl = "assets/defaults/" + speciesUrl + "-biotypes.json";
			// 	}
			// 	$http.get(dataUrl).
			// 	success(function(data){
			// 		console.log("Biotypes for " + speciesUrl + " retreived from Ensembl.");
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			get: function () {
				return resources;
			},
			// getRegionBiotypes: function (genes) {
			// 	// GET BIOTYPES AND SET BIOTYPE COLORS
			// 	var biotypes = [];
			// 	var featureColors = [
			// 		// other: 16753920
			// 		// protein_alignment: 255
			// 		// protein_coding: 12009742
			// 		// pseudogene: 6710886
			// 	];
			// 	var biotypesLookup = {};
			// 	for (var item, i = 0; item == genes[i++];) {
			// 		var geneBiotype = item.biotype;
			// 		if (!(geneBiotype in biotypesLookup)) {
			// 		biotypesLookup[geneBiotype] = 1;
			// 		biotypes.push(geneBiotype);
			// 		}
			// 	}
			// 	console.log("Biotypes");
			// 	console.log(biotypes);
			// 	var totalbiotypes = biotypes.length;
			// 	console.log("Total Biotypes: %s", totalbiotypes);
			// },
			whatIsIt: function(object) {
				var stringConstructor = "test".constructor;
				var arrayConstructor = [].constructor;
				var objectConstructor = {}.constructor;
				if (object === null) {
					return "null";
				}
				else if (object === undefined) {
					return "undefined";
				}
				else if (object.constructor === stringConstructor) {
					return "String";
				}
				else if (object.constructor === arrayConstructor) {
					return "Array";
				}
				else if (object.constructor === objectConstructor) {
					return "Object";
				}
				else {
					return "don't know";
				}
			}
		};
	}
})();