(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $scope, $timeout, Settings, Datasets, Overlays, Ensembl, Proximities, Restraints) {
			// console.log($scope);

		$scope.addDataset = function($fileContent) {

			Datasets.add($fileContent);
			var overlay = Overlays.getOverlayById("genes");
			var loadEnsembl = Ensembl.load(overlay, Settings.get().app.online);
			return $q.all([overlay, loadEnsembl])
			.then(function(results) {
				// Recalc all related to new Dataset...
				// Settings.init(); // dependent on Storyboards and Datasets
				// Proximities.set(); // dependent on Datasets
				// Restraints.set(); // dependent on Datasets
				// Overlays.segment();

				Overlays.update();
				return results;
			})
			.then(function(results) {
				$scope.$parent.current.dataset = Datasets.getDataset();
				$scope.$parent.current.model = Datasets.getModel();
				$scope.$parent.current.overlay = Overlays.getOverlay();
				// $scope.$parent.currentOverlay = Overlays.getOverlay(); //??? REMOVE
				$state.go('dataset');
			});
		};

		// $scope.openInput = function() {
		// 	$timeout(function() {
		// 		angular.element("file-input").trigger('click');
		// 	}, 0);
		// };

	}
})();