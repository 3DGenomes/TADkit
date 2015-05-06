(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// $locationProvider.html5Mode(true);
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('grey')
			.warnPalette('red')
			.backgroundPalette('grey');
	}
})();