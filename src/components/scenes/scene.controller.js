(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneController', SceneController);

	function SceneController($log, $state, $scope, Datasets) {

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			$log.debug(bool);
		};

		// On click set selected cluster
		$scope.selectCluster = function(index) {
			Datasets.setCluster(index + 1);
			var centroidRef = Datasets.getCentroidRef();
			$log.info("Current Cluster: " + (index + 1) + " (Centroid Model: " + centroidRef + ")");
			$state.go('browser');
		};

		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();