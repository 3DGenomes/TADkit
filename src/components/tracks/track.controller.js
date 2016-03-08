(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TrackController', TrackController);

	function TrackController($log, $scope) {
		// if ($scope.overlay) {
		// 	$log.debug($scope.overlay.object.id);
		// 	$log.debug($scope.overlay.object.state.overlaid);
		// 	$scope.overlaid = $scope.overlay.object.state.overlaid;
		// 	$scope.overlayOrig = Overlays.getOverlay(); // current overlay
		// 	$scope.toggleOverlay = function(index) {
		// 		$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
		// 		if (!$scope.overlaid) {
		// 			Overlays.setOverlaid(index);
		// 			Overlays.set(index);
		// 		} else {
		// 			Overlays.setOverlaid($scope.overlayOrig.object.state.index);
		// 			Overlays.set($scope.overlayOrig.object.state.index);
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