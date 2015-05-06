(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkStoryboard', tkStoryboard);

	function tkStoryboard() {
		return {
			restrict:'EA',
			templateUrl: 'assets/templates/storyboard-components.html',
			link:function(scope, element, attrs){
				// console.log(scope);
			}
		};
	}
})();