(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http) {
		var ensembl = {
			ping : 0
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferral = $q.defer();
				var source = "http://rest.ensemblgenomes.org/info/ping?content-type=application/json";
				$http.get(source)
				.success(function(data){
					ensembl.ping = data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferral.promise;
			},
			load: function(datasetObject, overlay, online) {

				online = online || false;
				var deferral = $q.defer();
				var source;
				var species = datasetObject.species;
				var speciesUrl = datasetObject.speciesUrl;
				var chromosomeIndex = 0;
				if (datasetObject.chromosomeIndex) {
					chromosomeIndex = datasetObject.chromosomeIndex;	
				}
				var chromosome = datasetObject.chromosome[chromosomeIndex];
				var start = datasetObject.chromStart[chromosomeIndex];
				var end = datasetObject.chromEnd[chromosomeIndex];
				var self = this;
				if (online) {
					source = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chromosome + overlay.object.url[4] + start + overlay.object.url[6] + end + overlay.object.url[8];
				} else {
					source = "assets/json/" + speciesUrl + "-genes.json";
					// source = "assets/json/tk-sample-genes.json";
					// var source = "assets/json/tk-defaults-datasets2-genes.json";
				}
				$http.get(source)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					overlay.data = genes;
					var slice = "(" + chromosome + ":" + start + "-" + end + ")";
					var whence = online ? "Ensembl" : "local storage";
					console.log("Genes for " + species + " "+ slice + " retreived from " + whence + ".");
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