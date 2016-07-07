(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $stateParams, $scope, Datasets, Overlays, Storyboards, Hic_data) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Datasets.getModel();
			$scope.current.overlay = Overlays.getOverlay();
			$scope.current.storyboard = Storyboards.getStoryboard();
			console.log("Current dataset, model, overlay and storyboard updated.");			
		};

		// On click load dataset from URL Params
		// Loads local JSON and then associated TSV tracks from /examples folder
		$scope.loadDatasetFromParam = function() {
			var loading = Datasets.load($stateParams.loadDataset);
			return $q.all([ loading ])
			.then(function(results){
				$scope.updateCurrent();
				console.log("Dataset loaded: " + $stateParams.loadDataset);			
				$state.go('browser');
			});
		};
		if ($stateParams.loadDataset) $scope.loadDatasetFromParam();

		// On dropzone (load external file)
		// Adds JSON to current project - load TSV when in browser
		$scope.addDataset = function($fileContent) {
			var adding = Datasets.add($fileContent);
			return $q.all([ adding ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset added."); //: " + $stateParams.loadDataset);			
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