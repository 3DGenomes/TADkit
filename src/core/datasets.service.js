(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Datasets
	 * @description Datasets of Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 * @requires generic.service:Utils
	 *
	 */
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets(VERBOSE, $log, $q, $http, uuid4, Utils) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		var clusters = {
			loaded : [],
			current : {
				ref : 0
			}			
		};
		return {

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#load
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Loads Datset from supplied file or default.
			 * Waits for promise.
			 *
			 * @requires $log
			 * @requires $q
			 * @requires $http
			 *
			 * @param {string} [filename] Filename for file of type JSON and extension .json.
			 * @param {boolean} [clear] Clear loaded datasets.
			 * @returns {Object} Datasets as resolved promise.
			 */
			load: function(filename, clear) {
				filename = filename || "tk-example-dataset";
				clear = clear || false;
				var self = this;
				if (clear) self.clear();

				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";

				var deferred = $q.defer();
				var dataUrl = "assets/" + datapath + "/" + filename + ".json";
				$http.get(dataUrl)
				.success( function(dataset) {
					// TADkit defaults and examples are already validated
					dataset.object.filename = filename;
					self.add(dataset);
					deferred.resolve(datasets);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#add
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Adds dataset to Datasets from supplied data.
			 *
			 * @requires $log
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			add: function(data) {
				var self = this;
				var dataset = self.validate(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					self.setSpeciesUrl();
					self.setRegion();
					self.groupClusters();
					$log.info("Dataset " + dataset.object.species + " " + dataset.object.region + " loaded from file.");
				// }
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#validate
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Validates supplied data for use as Dataset.
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			validate: function(data) {
				var validDataset = {};
				var objectType = Utils.whatIsIt(data);
				if (objectType === "String") {
					validDataset = JSON.parse(data);
				} else {
					// TODO: add specific options for Array, Object, null, etc.
					validDataset = data;
				}
				var validation = true;
				// ADD VALIDATION LOGIC...
				// check structure
				// check content type
				if (validation) {
					return validDataset;
				} else {
					// give error message
					// return to Project Loader page
				}
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#clear
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Clears Datasets Object.
			 *
			 * @returns {Object} Datasets Object.
			 */
			clear: function() {
				while (datasets.loaded.length > 0) {
					datasets.loaded.shift();
				}
				return $log.info("Datasets Object cleared!");
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#remove
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Removes dataset at supplied index from Datasets.
			 *
			 * @requires $log
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {Object} Datasets Object.
			 */
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				var datasetTitle = dataset.title;
				datasets.loaded.splice(dataset, 1);
				$log.info("Dataset " + datasetTitle + "at index " + index + " removed!");
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#setSpeciesUrl
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Converts species data to valid URL (lowercase alphanumeric + underscores).
			 *
			 * @requires $log
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {string} String of URL formatted species data.
			 */
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var species = datasets.loaded[index].object.species;
				var speciesUrl = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				datasets.loaded[index].object.speciesUrl = speciesUrl;
				return speciesUrl;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#setRegion
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Combines chromosome, chromStart and chromEnd into genomic region e.g "x:1-1000".
			 *
			 * @requires $log
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {string} Genomic region as string.
			 */
			setRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var chromosomeIndex = 0;
				if (datasets.loaded[index].object.chromosomeIndex) {
					chromosomeIndex = datasets.loaded[index].object.chromosomeIndex;	
				}
				var chrom = datasets.loaded[index].object.chrom[chromosomeIndex];
				var chromStart = datasets.loaded[index].object.chromStart[chromosomeIndex];
				var chromEnd = datasets.loaded[index].object.chromEnd[chromosomeIndex];
				var region = chrom + ":" + chromStart + "-" + chromEnd;
				datasets.loaded[index].object.region = region;
				return region;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#set
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Sets current dataset from those loaded in Datasets.
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {Object} Newly set current dataset.
			 */
			set: function(index) {
				var self = this;
				if (index !== undefined || index !== false) datasets.current.index = index;
				self.setCluster(datasets.current.cluster); // need to determine which cluster is current?
				var dataset = datasets.loaded[datasets.current.index];
				// *** ADD RE-INITIALIZE!!!!
				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#setCluster
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Sets the current cluster for the current dataset.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Array} Newly set current cluster.
			 */
			setCluster: function(ref) { // from cluster ref
				var self = this;
				ref = ref || 1; // from ref or just set as the first cluster
				clusters.current.index = ref - 1;
				var clusterCentroid = self.getCentroidRef(datasets.current.cluster);
				self.setCentroid(clusterCentroid);
				var cluster = self.getCluster();
				return cluster; // array of model indices
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#setCentroid
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Sets the current centroid for the current cluster.
			 *
			 * @param {number} [ref] Centroid reference.
			 * @returns {Array} Newly set current centroid.
			 */
			setCentroid: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef(); // from ref or from current cluster
				datasets.current.centroid = ref;
				var centroid = self.setModel(datasets.current.centroid);
				return centroid; // array of vertices
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#setModel
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Sets the current mdoel for the current dataset.
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Array} Newly set current model.
			 */
			setModel: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef();
				var model = self.getModel(ref - 1);
				// Store as current model for dataset in datasets.loaded[datasets.current.index].data
				datasets.loaded[datasets.current.index].data = model;
				return model; // array of vertices
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#get
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get Datasets.
			 *
			 * @returns {Object} Datasets.
			 */
			get: function() {
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#get
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get Datasets.
			 *
			 * @returns {Object} Datasets.
			 */
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getClusterGroups
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get cluster groups of current dataset.
			 *
			 * @returns {Array} Array of cluster groups.
			 */
			getClusterGroups: function() {
				var clusterGroups = datasets.loaded[datasets.current.index].clusters;
				return clusterGroups;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#groupClusters
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Group clusters of current dataset.
			 *
			 * @requires $log
			 *
			 * @returns {Object} Clusters.
			 */
			groupClusters: function() {
				var self = this;
				var clusterGroups = self.getClusterGroups();
				var models = self.getModels();
				for (var i = clusterGroups.length - 1; i >= 0; i--) {
					var cluster = {};
					cluster.ref = i + 1;
					cluster.centroid = self.getCentroidRef(cluster.ref);
					cluster.list = clusterGroups[i];
					cluster.centroidIndex = cluster.list.indexOf(cluster.centroid);
					cluster.data = [];
					for (var j = cluster.list.length - 1; j >= 0; j--) {
						var modelData;
						for (var k = models.length - 1; k >= 0; k--) {
							var model = models[k];
							if (parseInt(model.ref) == cluster.list[j]) {
								modelData = model.data;
								if (VERBOSE) $log.debug("Model " + model.ref + " in Cluster " + cluster.ref);
							}
						}
						if (modelData) cluster.data.unshift(modelData);
						else $log.error("Listed model not found!");
					}
					// Add cluster to cluster collection
					clusters.loaded.unshift(cluster);
				}
				clusters.current.ref = 1; // reset to first, which should contain most models
				return clusters;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getGroupedClusters
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get groups clusters.
			 *
			 * @returns {Object} Clusters.
			 */
			getGroupedClusters: function() {
				return clusters.loaded;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getCluster
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get clusters of ref or current.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Object} A cluster.
			 */
			getCluster: function(ref) { // from cluster ref
				ref = ref || clusters.current.ref;
				var cluster = clusters.loaded[ref - 1];
				return cluster; // array of model refs
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getClusterModels
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get model ref for cluster.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Object} Clusters.
			 */
			getClusterModels: function(ref) {
				ref = ref || clusters.current.ref;
				var cluster = clusters.loaded[ref - 1];
				return cluster;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getCentroidRef
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get centroid ref from cluster ref.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {number} Model ref.
			 */
			getCentroidRef: function(ref) {
				ref = ref || clusters.current.ref;
				var centroid = datasets.loaded[datasets.current.index].centroids[ref - 1];
				return centroid;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getModels
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get models for dataset index or current if index not supplied.
			 *
			 * @param {number} [index] Dataset index.
			 * @returns {Object} Models.
			 */
			getModels: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var models = datasets.loaded[index].models;
				return models;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getModel
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get model from ref or current id no ref supplied. eg. { ref:1 , data:1,2,3 }
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Object} Model.
			 */
			getModel: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef();
				var model;
				var models = datasets.loaded[datasets.current.index].models;
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) model = models[i];
				}
				return model;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getModelData
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get model data from model of ref.
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Array} Array of vertices.
			 */
			getModelData: function(ref) { // from model ref
				var self = this;
				var model = self.getModel(ref);
				return model.data; // array of model vertices
			}
		};
	}
})();