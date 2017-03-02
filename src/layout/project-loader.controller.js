(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $http, $state, $scope, Datasets, Overlays, Storyboards, Users, Hic_data) {

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
		};

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
			var loadexample = Datasets.load('assets/defaults/tk-example-dataset.json');
			return $q.all([ loadexample ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset example loaded.");			
				$state.go('browser', { conf: null });
			});
		};
		
		
		
		
		
	}
})();