(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($log, $q, $state, $stateParams, $scope, Datasets, Clusters, Layers, Storyboards) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Clusters.getModel();
			$scope.current.layer = Layers.getLayer();
			$log.info("Current dataset, model, layer and storyboard updated.");			
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
	}
})();