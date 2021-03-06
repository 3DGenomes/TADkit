(function() {
	'use strict';
	angular
		.module('TADkit')
		.filter('startFrom', function() {
		    return function(input, start) {
		    	if(typeof input === 'undefined') return;
		        start = +start; //parse to int
		        return input.slice(start);
		    };})
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($state, $scope, $stateParams, Datasets, Overlays, Components, Segments){
		// console.log($scope);
		var el = angular.element(document.querySelector('#spinnerdiv'))[0];
    	if(!angular.isUndefined(el))
    		el.style.display = "block";
    	
		$scope.datasets = Datasets.get();
		$scope.selDataset = $scope.datasets.current.index; 
			
		$scope.renderClusters = function() {
			
			$scope.current.dataset = Datasets.getDataset();
			
			if($scope.current.dataset.models.length == 0) return;
			
			$scope.current.model = Datasets.getModel(Datasets.getCentroid(),$scope.current.dataset.object.chrom);
			
			// Get dataset scene icon component
			$scope.clusterComponent = Components.getComponentById("datasets-scene-icon");
	
			// Set cluster color to gradient
			// Recalculate specifically for single segment per particle in cluster scene
			var gradientOverlay = Overlays.getOverlayById("gradient");
			var clusterLength = $scope.current.model.data.length / $scope.current.dataset.object.components;
			var gradientColors = Segments.gradientHCL(gradientOverlay, clusterLength);
			$scope.clusterComponent.overlay = gradientColors;
	
			// Calculate consistent camera position (translation) from combined dataset models
			var datasetModels = new THREE.BufferGeometry();
			for (var h = $scope.current.dataset.models.length - 1; h >= 0; h--) {
				datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.current.dataset.models[h], 3 ) );
			}
			datasetModels.computeBoundingSphere();
			$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius;
	
			// Create collection of cluster models
			$scope.clusters = [];
			var clusterLists = $scope.current.dataset.clusters;
			var models = $scope.current.dataset.models;
			for (var i = clusterLists.length - 1; i >= 0; i--) {
				var cluster = {};
				cluster.number = i + 1;
				cluster.list = clusterLists[i];
				cluster.centroidIndex = cluster.list.indexOf(Datasets.getCentroid(cluster.number));
				cluster.data = [];
				for (var j = cluster.list.length - 1; j >= 0; j--) {
					var modelData;
					for (var k = models.length - 1; k >= 0; k--) {
						//var model = models[k];
						var model = Datasets.getModel(models[k].ref,$scope.current.dataset.object.chrom);
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
			$scope.currentPage = 0;
		    $scope.pageSize = 10;
		    $scope.numberOfPages=function(){
		        return Math.ceil($scope.clusters.length/$scope.pageSize);                
		    };
		};
		// On click set selected cluster
		$scope.selectCluster = function(index) {
			$scope.clusterArray = Datasets.setCluster(index + 1);
			$scope.centroidRef = Datasets.getCentroid();
			$scope.current.model = Datasets.getModel($scope.centroidRef,$scope.settings.current.chromosomeIndexes);
			console.log("Current Cluster: " + (index + 1) + "(Centroid Model: " + $scope.centroidRef + ")");
			$state.go('browser');
		};
		
		$scope.addDataset = function($fileContent) {
			$state.go('dataset-import', { func: 'dataset' });
		};
		$scope.setDataset = function() {
			Datasets.set($scope.selDataset);
			$scope.renderClusters();
		};
		
		$scope.$watch("settings.current.chromosomeIndexes", function(newValue, oldValue){
		    if(newValue != oldValue){
		    	$scope.selDataset = $scope.datasets.current.index; 
				$scope.renderClusters();
		    }
		});
		
		$scope.renderClusters();
		if(!angular.isUndefined(el))
    		el.style.display = "none";

	}
})();