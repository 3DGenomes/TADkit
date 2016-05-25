(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name bioinformatics.service:FeaturesEnsembl
	 * @description
	 * Import and manage Genomic features (eg. genes) from Ensembl etc.
	 *
	 * @requires ONLINE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('bioinformatics')
		.factory('FeaturesEnsembl', FeaturesEnsembl);

	function FeaturesEnsembl(ONLINE, $log, $q, $http) {
		var features = {
			root: "http://rest.ensemblgenomes.org/",
			online : true,
			assembly: {},
			colors: {},
		};
		
		return {

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#ping
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Ping the Ensebl server to check if it is online
			 * Use before requesting data.
			 * @link https://github.com/Ensembl/ensembl-rest/wiki/Writing-Your-First-Client
			 *
			 * @return {boolean} Online status.
			 */
			ping: function() {
				$log.debug("Pinging Ensembl RESTful genomic data server...");
				var deferred = $q.defer();
				var dataUrl =  features.root + "info/ping?content-type=application/json";
				$http.get(dataUrl)
				.success(function(data){
					$log.debug(data);
					if (data.ping === 1) {
						features.online = true;
						$log.debug("Ensembl RESTful is contactable.");
					} else {
						features.online = false;
						// fail - see https://github.com/Ensembl/ensembl-rest/wiki/Writing-Your-First-Client
					}
					deferred.resolve(features.online);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#load
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Load genomic features from Emsembl.
			 * Use supplied address within layer format.
			 *
			 * @param {Array} layer Array of URL path separators.
			 * @param {Object} address Object containing URL path.
			 *
			 * @return {boolean} Online status.
			 */
			load: function(layer, address) {
				layer = layer || ["http://rest.ensemblgenomes.org/overlap/region/","species","/","chrom",":","chromStart","-","chromEnd","?feature=gene;content-type=application/json"];
				address = address || {species: "Drosophila melanogaster", speciesUrl: "drosophila_melanogaster", chrom: "chrX", chromStart: 15590000, chromEnd: 16600000};
				// TODO: clear odd colors while loading...
				var deferred = $q.defer();
				var dataUrl;

				var self = this;
				if (ONLINE) {
					dataUrl = layer.object.url[0] + address.speciesUrl + layer.object.url[2] + address.chrom + layer.object.url[4] + address.chromStart + layer.object.url[6] + address.chromEnd + layer.object.url[8];
				} else {
					dataUrl = "assets/offline/" + address.speciesUrl + "-genes.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					layer.data = genes;
					var region = address.chrom + ":" + address.chromStart + "-" + address.chromEnd;
					var source = ONLINE ? "Ensembl" : "local storage";
					$log.info("Genes for " + address.species + " "+ region + " retreived from " + source + ".");
					 deferred.resolve(layer);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#setBiotypeStyle
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Add property biotypeStyle as biotype in lowercase.
			 * Used to idenify and color for CSS.
			 *
			 * @param {Object} genes Genes list (see FeaturesEnsembl.load).
			 * @return {Object} genes Genes list with added biotypeStyle property.
			 */
			setBiotypeStyle: function(genes) {
				// This generates a index in lowercase to be used in CSS styling
				// now running directly in segmentFeaturesEnsembl
				angular.forEach(genes, function(gene, key) {
					// var biotypeStyle = gene.biotype.replace(/_/g, '-').toLowerCase(); // SWAP underscores for dashes
					var biotypeStyle = gene.biotype.toLowerCase();
					gene.biotypeStyle = biotypeStyle;
				});
				return genes;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#setLengthBP
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Sum base pair lengths from top level regions.
			 *
			 * @param {Object} top_level_region Genes list (see FeaturesEnsembl.load).
			 * @return {number} lengthBP Length.
			 */
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

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#get
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Get FeaturesEnsembl.
			 *
			 * @return {Object} features FeaturesEnsembl.
			 */
			get: function() {
					return features;
			}

		};
	}
})();