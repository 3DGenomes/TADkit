(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TopbarController', TopbarController);

	function TopbarController($state, $scope, $mdSidenav) {

		$scope.$state = $state;
		// if ($state.includes('main.project')){
		// 	$scope.projectTitle = $scope.users[0].projects[0].object.title;
		// }

		$scope.toggleLeft = function() {
			$mdSidenav('left').toggle();
		};

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};
	}
})();