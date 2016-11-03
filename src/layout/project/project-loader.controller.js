(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

<<<<<<< HEAD:src/layout/project-loader.controller.js
	function ProjectLoaderController($q, $state, $stateParams, $scope, Datasets, Overlays, Storyboards, Hic_data) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Datasets.getModel();
			var overlays = Overlays.get();
			while (overlays.loaded.length > 1) { // remove all overlays
				overlays.loaded.pop();
			}
			Overlays.set(0);
			$scope.current.overlay = Overlays.getOverlay();
			$scope.current.storyboard = Storyboards.getStoryboard();
			console.log("Current dataset, model, overlay and storyboard updated.");			
=======
	function ProjectLoaderController($log, $q, $state, $stateParams, $scope, Datasets, Clusters, Layers, Storyboards) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Clusters.getModel();
			$scope.current.layer = Layers.getLayer();
			$log.info("Current dataset, model, layer and storyboard updated.");			
>>>>>>> upstream/develop:src/layout/project/project-loader.controller.js
		};

		// On click load dataset from URL Params
		// Loads local JSON and then associated TSV tracks from /examples folder
		$scope.loadDatasetFromParam = function() {
			var loading = Datasets.load($stateParams.loadDataset);
			return $q.all([ loading ])
			.then(function(results){
				$scope.updateCurrent();
				$log.info("Dataset loaded: " + $stateParams.loadDataset);			
				$state.go('browser');
			});
		};
		if ($stateParams.loadDataset) $scope.loadDatasetFromParam();

		// On dropzone (load external file)
		// Adds JSON to current project - load TSV when in browser
		$scope.addDataset = function($fileContent) {
			var adding = Datasets.import($fileContent);
			return $q.all([ adding ])
			.then(function(results){
				$scope.updateCurrent(); // NEEDED? Move to function in Settings Service???
				// ADD FILENAME (SEE data-import)
				$log.info("Dataset added."); //: " + $stateParams.loadDataset);			
				$state.go('dataset');
			});
		};
		$scope.cleanDataset = function(event) {
			Datasets.clear();
			Hic_data.clear();
			var loadexample = Datasets.load();
			return $q.all([ loadexample ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset example loaded.");			
				$state.go('browser');
			});
		};
		
		
		
		
		
	}
})();