(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $scope, initialData, Users, Projects, Datasets, Overlays, Storyboards, Components) {
		// Set static settings from initalData
		if (!$scope.settings) {
			$scope.settings = initialData.settings;
			$scope.settings.featureColors = initialData.featureColors;
			$scope.settings.components = initialData.components;
		}

		$scope.settings.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.isProject = $state.is('project');
		});

		// Bind dynamic data to service objects
		if (!$scope.users) {
			$scope.users = Users.get();
			// LOAD DEFAULT PROJECTS AND DATA
			if (typeof $scope.users.loaded[0].projects !== "undefined" && $scope.users.loaded[0].projects.length === 0) {
				$scope.users.loaded[0].projects = Projects.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].datasets !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].datasets.length === 0)
					$scope.users.loaded[0].projects.loaded[0].datasets = Datasets.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].overlays !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].overlays.length === 0)
					$scope.users.loaded[0].projects.loaded[0].overlays = Overlays.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].storyboards !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].storyboards.length === 0)
					$scope.users.loaded[0].projects.loaded[0].storyboards = Storyboards.get();
			}
		}
		
		// Get current data to share between child views
		$scope.projects = $scope.users.loaded[$scope.users.current.index].projects;
		$scope.datasets = $scope.projects.loaded[$scope.projects.current.index].datasets;
		$scope.overlays = $scope.projects.loaded[$scope.projects.current.index].overlays;
		$scope.storyboards = $scope.projects.loaded[$scope.projects.current.index].storyboards;

		$scope.currentUser = $scope.users.loaded[$scope.users.current.index];
		$scope.currentProject = $scope.projects.loaded[$scope.projects.current.index];
		$scope.currentDataset = $scope.datasets.loaded[$scope.datasets.current.index];
		$scope.currentCluster = $scope.currentDataset.clusters[$scope.datasets.current.cluster - 1];
		$scope.currentCentroid = $scope.currentDataset.centroids[$scope.datasets.current.cluster - 1];
		$scope.currentModel = $scope.currentDataset.models[$scope.currentDataset.centroids[$scope.datasets.current.cluster - 1] - 1];

		$scope.currentOverlay = $scope.overlays.loaded[$scope.overlays.current.index];
		$scope.currentStoryboard = $scope.storyboards.loaded[$scope.storyboards.current.index];

		// Set coords to default Storyboard views from dataset
		$scope.settings.currentStartCoord = $scope.currentDataset.object.startCoord;
		$scope.settings.currentEndCoord = $scope.currentDataset.object.endCoord;
		$scope.settings.currentScale = 1; //$scope.currentDataset.object.scale;
		Storyboards.setViewpoint($scope.settings.currentStartCoord,$scope.settings.currentEndCoord,$scope.settings.currentScale);
		Components.setViewpoint($scope.settings.currentStartCoord,$scope.settings.currentEndCoord,$scope.settings.currentScale);
		// $scope.storyboards = $scope.projects.loaded[$scope.projects.current.index].storyboards;


		$scope.addDataset = function($fileContent) {
			console.log("adding...");
			Datasets.addDataset($fileContent);
			$scope.currentDataset = $scope.datasets.loaded[$scope.datasets.current.index];
			$state.go('dataset');
		};


	}
})();