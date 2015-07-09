(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkStoryboardComponents', tkStoryboardComponents);

	function tkStoryboardComponents() {
		return {
			restrict:'EA',
			templateUrl: 'assets/templates/storyboard-components.html',
			link:function(scope, element, attrs){
				// console.log(scope);
			}
		};
	}
})();