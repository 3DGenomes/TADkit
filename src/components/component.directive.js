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
				// console.log(scope);

				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.id}}-' + scope.$index + '" ' +
					'type="component.object.type" ' +
					'title="component.object.title" ' +
					'state="component.object.state" ' + /* for scene until can check for DOM loaded */
					'settings="settings" ' +
					'view="component.view" ' +
					'currentparticle="currentParticle"' +
					'currentposition="currentPosition"' +
					'currentmodel="currentModel" ' +
					'currentoverlay="currentOverlay" ' +
					'data="component.data" ' +
					'overlay="component.overlay"' +
					'toggleoverlay="toggleOverlay(index)" ' +
					'style="margin: {{component.object.state.margin}}" ' +
					'class="component ' + scope.component.object.type + '">' +
					'</data-tk-component-' + scope.component.object.type + '>';

				element.replaceWith($compile(strTemplate)(scope));

			}
		};
	}
})();