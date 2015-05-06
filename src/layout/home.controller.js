(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('HomeController', HomeController);

	function HomeController ($scope, Settings, Users){

		// if (!$scope.settings) {
		// 	$scope.settings = Settings.get();
		// 	console.log($scope.settings);
		// }
		// if (!$scope.users) {
		// 	$scope.users = Users.get();
		// 	console.log($scope.users);
		// }

	}
})();