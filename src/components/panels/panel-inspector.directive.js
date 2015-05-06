(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInspector', tkComponentPanelInspector);

	function tkComponentPanelInspector() {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'='
			},
			templateUrl: 'assets/templates/panel-inspector.html',
			link:function(scope, element, attrs){
			}
		};
	}
})();