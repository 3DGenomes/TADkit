(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TrackController', TrackController);

	function TrackController($log, $scope) {
		// if ($scope.layer) {
		// 	$log.debug($scope.layer.object.id);
		// 	$log.debug($scope.layer.object.state.overlaid);
		// 	$scope.overlaid = $scope.layer.object.state.overlaid;
		// 	$scope.layerOrig = Layers.getLayer(); // current layer
		// 	$scope.toggleLayer = function(index) {
		// 		$scope.overlaid = Layers.getLayer(index).object.state.overlaid;
		// 		if (!$scope.overlaid) {
		// 			Layers.setOverlaid(index);
		// 			Layers.set(index);
		// 		} else {
		// 			Layers.setOverlaid($scope.layerOrig.object.state.index);
		// 			Layers.set($scope.layerOrig.object.state.index);
		// 		}
		// 		$scope.overlaid = !$scope.overlaid;
		// 	};
		// }

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

	}
})();