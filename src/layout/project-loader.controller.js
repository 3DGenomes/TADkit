(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $scope, $timeout, Settings, Datasets, Overlays, Ensembl) {
			// console.log($scope);

		$scope.addDataset = function($fileContent) {

			Datasets.add($fileContent);
			var overlay = Overlays.getOverlayById("genes");
			var loadEnsembl = Ensembl.load(overlay, Settings.get().app.online);
			return $q.all([overlay, loadEnsembl])
			.then(function(results) {
				Overlays.segment();
				return results;
			})
			.then(function(results) {
				$scope.$parent.currentDataset = Datasets.getDataset();
				$scope.$parent.currentModel = Datasets.getModel();
				$scope.$parent.currentOverlay = Overlays.getOverlay();
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