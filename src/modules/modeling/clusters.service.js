(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Clusters
	 * @description Clustering of spatial datasets
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 *
	 */
	angular
		.module('modeling')
		.factory('Clusters', Clusters);

	function Clusters(VERBOSE, $log, $q) {
		var clusters = {
			loaded : [],
			current : {
				dataset : {},
				index : 0,
				cluster : 1,
				centroid : 1
			}		
		};
		return {
			/**
			 * @ngdoc function
			 * @name modeling.service:CLusters#set
			 * @methodOf modeling.service:Clusters
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
			 * @param {string} [dataset] Dataset to load cluster from
			 * @returns {Object} Clusters as resolved promise.
			 */
			load: function(dataset) {
				dataset = dataset || "error";
				clusters.current.dataset = dataset;
				var self = this;
				var deferred = $q.defer();
				var sortClusters = self.sort(dataset);
				return $q.all([sortClusters])
				.then(function() {
					$log.debug("Defaults initialized.");
				});
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#groupClusters
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Group clusters of current dataset.
			 *
			 * @requires $log
			 *
			 * @returns {Object} Clusters.
			 */
			sort: function() {
				var self = this;
				for (var i = clusters.current.dataset.clusters.length - 1; i >= 0; i--) {
					var cluster = {};
					cluster.ref = i + 1;
					cluster.centroid = self.getCentroidRef(cluster.ref);
					cluster.list = clusters.current.dataset.clusters[i];
					cluster.centroidIndex = cluster.list.indexOf(cluster.centroid);
					cluster.data = [];
					for (var j = cluster.list.length - 1; j >= 0; j--) {
						var modelData;
						for (var k = clusters.current.dataset.models.length - 1; k >= 0; k--) {
							var model = clusters.current.dataset.models[k];
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
			 * @name modeling.service:Clusters#setCluster
			 * @methodOf modeling.service:Clusters
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
				var clusterCentroid = self.getCentroidRef(clusters.current.index);
				self.setCentroid(clusterCentroid);
				var cluster = self.getCluster();
				return cluster; // array of model indices
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#setCentroid
			 * @methodOf modeling.service:Clusters
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
				clusters.current.centroid = ref;
				var centroid = self.setModel(clusters.current.centroid);
				return centroid; // array of vertices
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#setModel
			 * @methodOf modeling.service:Clusters
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
				// Store as current model for dataset in dataset.data
				clusters.current.dataset.data = model;
				return model; // array of vertices
			},


			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getGroupedClusters
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get groups clusters.
			 *
			 * @returns {Object} Clusters.
			 */
			get: function() {
				return clusters.loaded;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getCluster
			 * @methodOf modeling.service:Clusters
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
			 * @name modeling.service:Clusters#getClusterModels
			 * @methodOf modeling.service:Clusters
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
			 * @name modeling.service:Clusters#getCentroidRef
			 * @methodOf modeling.service:Clusters
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
				var centroid = clusters.current.dataset.centroids[ref - 1];
				return centroid;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getModel
			 * @methodOf modeling.service:Clusters
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
				for (var i = clusters.current.dataset.models.length - 1; i >= 0; i--) {
					if (clusters.current.dataset.models[i].ref == ref) model = clusters.current.dataset.models[i];
				}
				return model;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getModelData
			 * @methodOf modeling.service:Clusters
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