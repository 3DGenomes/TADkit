(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $stateParams, $scope, Settings, Users, Projects, Datasets, Overlays, Storyboards) {

		if (!$scope.settings) {
			$scope.settings = Settings.get();
		}
		$scope.settings.app.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.app.isProject = $state.is('project');
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
		$scope.current = {};
		$scope.current.user = Users.getUser();
		$scope.current.project = Projects.getProject();
		$scope.current.dataset = Datasets.getDataset();
		$scope.current.model = Datasets.getModel();
		$scope.current.overlay = Overlays.getOverlay();
		$scope.current.storyboard = Storyboards.getStoryboard();

		console.log($stateParams);
		$stateParams.test = "42";
		console.log($stateParams);
	}
})();