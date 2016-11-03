(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $stateParams, $scope, Settings, Users, Projects, Datasets, Clusters, Layers, Storyboards) {
		// Check if first load
		if (!$scope.settings) {
			$scope.settings = Settings.get();
		}
		// Review utility of isProject
		$scope.settings.app.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.app.isProject = $state.is('project');
		});

		// SET SHARED CURRENT PROJECT LEVEL DATA
		$scope.current = {};
		$scope.current.dataset = Datasets.getDataset();
		$scope.current.model = Clusters.getModel();
		$scope.current.layer = Layers.getLayer();

	}
})();