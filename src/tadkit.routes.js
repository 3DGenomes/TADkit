(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'layout/dashboard.html',
				controller:'DashboardCtrl',
				resolve:{ 
					'loadTADData':function(loadTAD){
						return loadTAD.promise;
					}
				}
			})
			.when('/loader',{
				templateUrl:'layout/loader.html',
				controller:'LoaderCtrl',
			});
	}
})();