(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($state, $scope, $timeout, Datasets) {
			// console.log($scope);

		$scope.addDataset = function($fileContent) {
			console.log("Adding dataset...");
			Datasets.add($fileContent);
			// console.log($scope.currentDataset.object.title);
			$scope.$parent.currentDataset = Datasets.getDataset(); //$scope.datasets.loaded[$scope.datasets.current.index];
			$scope.$parent.currentModel = Datasets.getModel(); //$scope.datasets.loaded[$scope.datasets.current.index];
			// console.log($scope.currentDataset.object.title);
			$state.go('dataset');
		};

		// $scope.openInput = function() {
		// 	$timeout(function() {
		// 		angular.element("file-input").trigger('click');
		// 	}, 0);
		// };

	}
})();