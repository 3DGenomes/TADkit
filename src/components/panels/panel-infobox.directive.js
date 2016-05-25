(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInfobox', tkComponentPanelInfobox);

	function tkComponentPanelInfobox() {
		return {
			restrict:'C',
			templateUrl: 'assets/templates/panel-infobox.html',
			link:function(scope, element, attrs){
			}
		};
	}
})();