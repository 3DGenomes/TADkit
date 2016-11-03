(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config(ENV, $logProvider, $locationProvider, $mdThemingProvider, $provide) {
		$logProvider.debugEnabled(ENV === "development");
		if (ENV === "development") console.log( "TADkit Environment: " + ENV );

		// Removing # from URL with HTML5 History API and
		// add <base href="/myapp/"></base> in index.html
		// Comment to leave # in case of server rewrites.
		// $locationProvider.html5Mode(true);

		// Material Design Themes
		$mdThemingProvider.definePalette('chroma', {
			"50": "#e8f5e9",
			"100": "#c8e6c9",
			"200": "#a5d6a7",
			"300": "#81c784",
			"400": "#66bb6a",
			"500": "#4caf50",
			"600": "#43a047",
			"700": "#388e3c",
			"800": "#2e7d32",
			"900": "#1b5e20",
			"A100": "#b9f6ca",
			"A200": "#69f0ae",
			"A400": "#00e676",
			"A700": "#00c853",
			'contrastDefaultColor': "light", // whether, by default, text (contrast) on this palette should be dark or light
			'contrastDarkColors': ["50", "100", "200", "300", "400", "A100"], // hues which contrast should be 'dark' by default
			'contrastLightColors': undefined // specify this if default was 'dark'
		});
		$mdThemingProvider.theme("tadkit")
			.primaryPalette("chroma", {
				"default": "500"
			})
			.accentPalette("lime", {
				"default": "500"
			})
   			.warnPalette("red", {
				"default": "500"
			});
			// .backgroundPalette("grey");
		$mdThemingProvider.theme("darkKit")
			.dark();
		$mdThemingProvider.setDefaultTheme('tadkit');

		$provide.decorator('mdButtonDirective', ['$delegate',
			function ($delegate) {
				var getTemplate = $delegate[0].template;
				$delegate[0].template = function ($element, $attrs) {
					if ($attrs.type === 'file') {
						return '<label class="md-button" ng-transclude></label>';
					} else {
						return getTemplate($element, $attrs);
					}
				};
				return $delegate;
			}
		]);
		
	}
})();