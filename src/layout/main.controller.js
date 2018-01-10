(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $scope, $mdSidenav, Settings, Overlays, Storyboards, Users, Datasets) {

		if (!$scope.settings) {
			$scope.settings = Settings.get();
		}
		$scope.settings.app.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.app.isProject = $state.is('project');
		});
		
		$scope.toggleLeft = function() {
			$mdSidenav('left').open();
		};
		$scope.current = {};
		$scope.current.user = Users.getUser();
//		$scope.current.project = Projects.getProject();
//		$scope.current.dataset = Datasets.getDataset();
//		$scope.current.model = Datasets.getModel();
		$scope.current.overlay = Overlays.getOverlay();
		$scope.current.storyboard = Storyboards.getStoryboard();

	}
})();