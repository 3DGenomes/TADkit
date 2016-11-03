(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectController', ProjectController);

	function ProjectController($scope, Datasets, Layers, Storyboards) {

		$scope.setCurrentDataset = function(index) {
			Datasets.set(index);
		};
		$scope.setCurrentLayer = function(index) {
			Layers.set(index);
		};
		$scope.setCurrentStoryboard = function(index) {
			Storyboards.set(index);
		};

	}
})();