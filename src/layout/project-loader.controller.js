(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $scope, $timeout, Datasets, Overlays, Ensembl) {
			// console.log($scope);

		$scope.addDataset = function($fileContent) {

			Datasets.add($fileContent);
			var newDataset = Datasets.getDataset();
			var overlay = Overlays.getOverlayById("genes");
			var loadEnsembl = Ensembl.load(newDataset.object, overlay, $scope.$parent.settings.app.online);
			return $q.all([newDataset, overlay, loadEnsembl])
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