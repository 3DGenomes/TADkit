(function() {
	'use strict';
	angular
		.module('TADkit')
		.run(run);

	function run(NAME, VERSION, ENV, VERBOSE, ONLINE, $log, $rootScope) {
		$log.info( NAME + " " + VERSION );
		$log.debug( "Environment: " + ENV + ", "  + VERBOSE + ", " + ONLINE + " " );

		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			$log.error( 'Resolve Error: ', error);
		});
	}
})();