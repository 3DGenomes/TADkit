(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http, Datasets) {
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
			load: function(overlay, online) {

				online = online || false;
				var deferral = $q.defer();
				var dataUrl;
				var datasetObject = Datasets.getDataset().object;
				var species = datasetObject.species;
				var speciesUrl = datasetObject.speciesUrl;
				var chromosomeIndex = 0;
				if (datasetObject.chromosomeIndex) {
					chromosomeIndex = datasetObject.chromosomeIndex;	
				}
				var chrom = datasetObject.chrom[chromosomeIndex];
				var chromStart = datasetObject.chromStart[chromosomeIndex];
				var chromEnd = datasetObject.chromEnd[chromosomeIndex];
				var self = this;
				if (online) {
					dataUrl = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chrom + overlay.object.url[4] + chromStart + overlay.object.url[6] + chromEnd + overlay.object.url[8];
				} else {
					dataUrl = "assets/json/" + speciesUrl + "-genes.json";
					// dataUrl = "assets/json/tk-sample-genes.json";
					// var dataUrl = "assets/json/tk-defaults-datasets2-genes.json";
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