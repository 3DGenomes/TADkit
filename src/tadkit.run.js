(function() {
	'use strict';
	angular
		.module('TADkit')
		.run(run);

	function run($rootScope) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			console.log( 'Resolve Error: ', error);
		});
	}
})();