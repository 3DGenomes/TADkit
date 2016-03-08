(function() {
	'use strict';
	angular
		.module('TADkit')
		.run(run);

	function run($log, $rootScope) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			$log.error( 'Resolve Error: ', error);
		});
	}
})();