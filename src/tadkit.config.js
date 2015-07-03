(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// $locationProvider.html5Mode(true);

		// Material Design Themes

		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('lime', {
				'default': '500' // use shade 200 for default, and keep all other shades the same
			})
   			.warnPalette('red')
			.backgroundPalette('grey');

		$mdThemingProvider.theme('darkKit')
			// .primaryPalette('green')
			// .accentPalette('lime')
			// .warnPalette('red')
			// .backgroundPalette('grey')
			.dark();

	}
})();