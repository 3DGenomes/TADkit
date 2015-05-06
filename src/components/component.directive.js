(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponent', tkComponent);

	function tkComponent($compile) {
		return {
			restrict: 'EA',
			// controller: 'StoryboardController',
			link: function(scope, element, attrs) {
				
				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.id}}-' + scope.$index + '" ' +
					'type="component.object.type" ' +
					'state="component.object.state" ' +
					'object="component.object" ' +
					'view="component.view" ' +
					'metadata="component.metadata" ' +
					'data="component.data" ' +
					'overlay="component.overlay" ' +
					'overlayindex="currentOverlays.current.index" ' +
					'contacts="component.contacts" ' +
					'settings="settings" ' +
					'style="margin: {{component.object.state.margin}}" ' +
					'class="component ' + scope.component.object.type + '">' +
					'</data-tk-component-' + scope.component.object.type + '>';

				element.replaceWith($compile(strTemplate)(scope));

			}
		};
	}
})();