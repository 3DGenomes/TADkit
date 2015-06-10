(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $scope, initialData, Users, Projects, Datasets, Overlays, Storyboards) {
		// SETTINGS FROM INITIAL-DATA
		if (!$scope.settings) {
			$scope.settings = initialData.settings;
			$scope.settings.featureColors = initialData.featureColors;
			$scope.settings.components = initialData.components;
		}
		$scope.settings.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.isProject = $state.is('project');
		});

		// BUILD DEFAULT DATA HIERARCHY
		// USERS >> PROJECTS >> DATASETS | OVERLAYS | STORYBOARDS
		if (!$scope.users) {
			$scope.users = Users.get();
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
		
		// SET SHARED CURRENT PROJECT LEVEL DATA
		$scope.currentUser = Users.getUser();
		$scope.currentProject = Projects.getProject();
		$scope.currentDataset = Datasets.getDataset();
		$scope.currentModel = Datasets.getModel();
		$scope.currentOverlay = Overlays.getOverlay();
		$scope.currentOverlayIndex = Overlays.getCurrentIndex();
		$scope.currentStoryboard = Storyboards.getStoryboard();

	}
})();