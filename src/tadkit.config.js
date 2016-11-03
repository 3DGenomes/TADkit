(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// Removing # from URL with HTML5 History API and
		// add <base href="/myapp/"></base> in index.html
		// Comment to leave # in case of server rewrites.
		// $locationProvider.html5Mode(true);

		// Material Design Themes
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('lime', {
				'default': '500'
			})
   			.warnPalette('red')
			.backgroundPalette('grey');
		$mdThemingProvider.theme('darkKit')
			.dark();

	}
})();