(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkDataMining', tkDataMining);

	function tkDataMining($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkDataMining : "&"
			},
			link: function(scope, element, attrs) {
				
			}
		};
	}
})();