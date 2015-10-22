(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http, Settings, Color) {
		var ensembl = {
			root: "http://rest.ensemblgenomes.org/",
			ping : 0,
			assembly: {},
			featureColors: {},
			biotypes: {}
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferred = $q.defer();
				var dataUrl =  ensembl.root + "info/ping?content-type=application/json";
				$http.get(dataUrl)
				.success(function(data){
					ensembl.ping = data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferred.promise;
			},
			load: function(overlay) {
				// TODO: clear odd colors while loading...
				var deferred = $q.defer();
				var dataUrl;
				var settings = Settings.get();
				var species = settings.current.species;
				var speciesUrl = settings.current.speciesUrl;
				// var chromosomeIndex = 0;
				// if (datasetObject.chromosomeIndex) {
				// 	chromosomeIndex = datasetObject.chromosomeIndex;	
				// }
				var chrom = settings.current.chrom;
				var chromStart = settings.current.chromStart;
				var chromEnd = settings.current.chromEnd;
				var self = this;
				var online = Settings.getOnline();
				if (online) {
					dataUrl = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chrom + overlay.object.url[4] + chromStart + overlay.object.url[6] + chromEnd + overlay.object.url[8];
				} else {
					dataUrl = "assets/offline/" + speciesUrl + "-genes.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					overlay.data = genes;
					var region = chrom + ":" + chromStart + "-" + chromEnd;
					var source = online ? "Ensembl" : "local storage";
					console.log("Genes for " + species + " "+ region + " retreived from " + source + ".");
					 deferred.resolve(overlay);
				});
				return deferred.promise;
			},
			loadBiotypeColors: function() {
				var deferred = $q.defer();
				var dataUrl;
				var online = false; // Settings.getOnline(); // Most up-to-date version not strictly necessary
				if (online) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-COLOUR.ini";

				}
				$http.get(dataUrl)
				.success(function(data){
					var iniData = Color.colorsFromIni(data);
					ensembl.featureColors = iniData;
					ensembl.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					 deferred.resolve(iniData);
				});
				return deferred.promise;
			},
			setBiotypeStyle: function(genes) {
				// This generates a index in lowercase to be used in CSS styling
				// now running directly in segmentFeatures
				angular.forEach(genes, function(gene, key) {
					// var biotypeStyle = gene.biotype.replace(/_/g, '-').toLowerCase(); // SWAP underscores for dashes
					var biotypeStyle = gene.biotype.toLowerCase();
					gene.biotypeStyle = biotypeStyle;
				});
				return genes;
			},
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
			get: function() {
				return ensembl;
			}
		};
	}
})();