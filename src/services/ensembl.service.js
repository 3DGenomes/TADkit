(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http, Settings) {
		var ensembl = {
			ping : 0
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferral = $q.defer();
				var dataUrl = "http://rest.ensemblgenomes.org/info/ping?content-type=application/json";
				$http.get(dataUrl)
				.success(function(data){
					ensembl.ping = data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferral.promise;
			},
			load: function(overlay) {
				// TODO: clear odd colors while loading...
				var deferral = $q.defer();
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
					deferral.resolve(overlay);
				});
				return deferral.promise;
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
			}
		};
	}
})();