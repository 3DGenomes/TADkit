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
		$mdThemingProvider.theme("default")
			.primaryPalette("green")
			.accentPalette("lime", {
				"default": "500"
			})
   			.warnPalette("red")
			.backgroundPalette("grey");
		$mdThemingProvider.theme("darkKit")
			.dark();

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