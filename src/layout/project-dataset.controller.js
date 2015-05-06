(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($state, $scope, Datasets, Overlays, Components){

		// Get dataset scene icon component
		$scope.clusterComponent = Components.getComponentById("datasets-scene-icon");

		// Set cluster color to gradient
		// Recalculate specifically for single segment per particle in cluster scene
		var gradientOverlay = Overlays.getOverlayById("gradient");
		var clusterLength = $scope.currentModel.data.length / $scope.currentDataset.object.components;
		var gradientColors = Overlays.segmentGradientHCL(gradientOverlay.data, clusterLength);
		$scope.clusterComponent.overlay = gradientColors;

		// Calculate consistent camera position (translation) from combined dataset models
		var datasetModels = new THREE.BufferGeometry();
		for (var h = $scope.currentDataset.models.length - 1; h >= 0; h--) {
			datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.currentDataset.models[i], 3 ) );
		}
		datasetModels.computeBoundingSphere();
		$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius;

		// Create collection of cluster models
		$scope.clusters = [];
		var clusterLists = $scope.currentDataset.clusters;
		var models = $scope.currentDataset.models;
		for (var i = clusterLists.length - 1; i >= 0; i--) {
			var cluster = {};
			cluster.number = i + 1;
			cluster.list = clusterLists[i];
			cluster.centroidIndex = cluster.list.indexOf(Datasets.getCentroid(cluster.number));
			cluster.data = [];
			for (var j = cluster.list.length - 1; j >= 0; j--) {
				var modelData;
				for (var k = models.length - 1; k >= 0; k--) {
					var model = models[k];
					if (parseInt(model.ref) == cluster.list[j]) {
						modelData = model.data;
						// console.log("Model " + model.ref + " in Cluster " + cluster.number);
					}
				}
				if (modelData) {cluster.data.unshift(modelData);}
					else {console.log("Listed model not found!");}
			}
			// Add cluster to cluster collection
			$scope.clusters.unshift(cluster);
		}
		// console.log($scope.clusters);


		// On click set selected cluster
		$scope.selectCluster = function(index) {
			$scope.clusterArray = Datasets.setCluster(index + 1);
			$scope.centroidRef = Datasets.getCentroid();
			console.log("Current Cluster: " + (index+1) + "(Centroid Model: " + $scope.centroidRef + ")");
			$state.go('browser');
		};

	}
})();