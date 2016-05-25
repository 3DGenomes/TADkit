(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($log, $state, $scope, Clusters, Layers, Components, Segments){
		$log.debug($scope);

		// Get dataset clusters scene component
		$scope.clusterComponent = Components.getComponentById("dataset-clusters");

		// Set cluster color to gradient
		// Recalculate specifically for single segment per particle in cluster scene
		var gradientLayer = Layers.getLayerById("gradient");
		var clusterLength = $scope.current.model.data.length / $scope.current.dataset.object.components;
		var gradientColors = Segments.gradientHCL(gradientLayer, clusterLength);
		$scope.clusterComponent.layer = gradientColors;

		// Calculate consistent camera position (translation) from combined dataset models
		var datasetModels = new THREE.BufferGeometry();
		for (var h = $scope.current.dataset.models.length - 1; h >= 0; h--) {
			datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.current.dataset.models[h].data, 3 ) );
		}
		datasetModels.computeBoundingSphere();
		$log.debug(datasetModels.boundingSphere.center);
		$log.debug(datasetModels.boundingSphere.radius);
		$scope.clusterComponent.view.viewpoint.camera = datasetModels.boundingSphere.center;
		$scope.clusterComponent.view.viewpoint.target = datasetModels.boundingSphere.center;
		$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius * datasetModels.boundingSphere.scale;

		// Create collection of cluster models
		$scope.clusters = Clusters.get();
		$log.debug($scope.clusters);

	}
})();