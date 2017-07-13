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
		
		var VreMap = $mdThemingProvider.extendPalette('cyan', {
		    '500': '#006080'
		  });
		// VRE second #0099cc
		$mdThemingProvider.definePalette('VreMap', VreMap);
		// Material Design Themes
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('lime', {
				'default': '500'
			})	
			//.primaryPalette('VreMap')
			//.accentPalette('blue')
   			.warnPalette('red')
			.backgroundPalette('grey');
		$mdThemingProvider.theme('darkKit')
			.dark();

	}
})();