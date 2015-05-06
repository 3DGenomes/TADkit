(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackContacts', tkComponentTrackContacts);

	function tkComponentTrackContacts(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				object: '=',
				view: '=',
				data: '=',
				overlay:'=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

					var data = scope.data;


					scope.update = function() {
					};
				});
			}
		};
	}
})();