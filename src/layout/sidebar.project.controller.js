(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarProjectController', SidebarProjectController);

	function SidebarProjectController ($scope, Datasets, Overlays, Storyboards){

		$scope.setCurrentDataset = function(index) {
			Datasets.set(index);
		};
		$scope.setCurrentOverlay = function(index) {
			Overlays.set(index);
		};
		$scope.setCurrentStoryboard = function(index) {
			Storyboards.set(index);
		};

	}
})();