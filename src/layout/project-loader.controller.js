(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $stateParams, $scope, Settings, Datasets, Overlays, Ensembl) {
		// console.log($scope);
		// On click load Dataset from URL Params
		$scope.loadDatasetFromParam = function() {
			var datasets = Datasets.load($stateParams.loadDataset);
			return $q.all([ datasets ])
			.then(function(results){
				$scope.$parent.current.dataset = Datasets.getDataset();
				$scope.$parent.current.model = Datasets.getModel();
				$scope.$parent.current.overlay = Overlays.getOverlay();
				// $scope.$parent.currentOverlay = Overlays.getOverlay(); //??? REMOVE
				console.log("Dataset to load: " + $stateParams.loadDataset);			
				$state.go('browser');
			});
		};
		if ($stateParams.loadDataset) $scope.loadDatasetFromParam();

		$scope.addDataset = function($fileContent) {
			var validDataset = Datasets.validate($fileContent);
			Datasets.add(validDataset);
			$scope.$parent.current.dataset = Datasets.getDataset();
			$scope.$parent.current.model = Datasets.getModel();
			$scope.$parent.current.overlay = Overlays.getOverlay();
			// $scope.$parent.currentOverlay = Overlays.getOverlay(); //??? REMOVE
			$state.go('dataset');
		};		
	}
})();