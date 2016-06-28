(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name TADkit.directive:tkComponent
	 * @restrict EA
	 *
	 * @description
	 * Dummy components directive that is replaced on complie
	 * by real component directive from supplied object type.
	 * e.g. from a array of components objects
	 *
	 * @example
	 * `<div tk-component ng-repeat='component in components'></div>`
	 *
	 */
	angular
		.module('TADkit')
		.directive('tkComponent', tkComponent);

	function tkComponent(VERBOSE, $log, $compile) {
		return {
			restrict: 'EA',
			// controller: 'StoryboardController',
			link: function(scope, element, attrs) {
				if (VERBOSE) $log.debug(scope);
				
				scope.component.object.idIndex = scope.component.object.id + "-" + scope.$index;

				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.idIndex}}" ' +
					'type="component.object.type" ' +
					'title="{{component.object.title}}" ' +
					'state="component.object.state" ' + /* for scene until can check for DOM loaded */
					'settings="settings" ' +
					'view="component.view" ' +
					'currentparticle="currentParticle"' +
					'currentposition="currentPosition"' +
					'currentmodel="current.model" ' +
					'currentlayer="current.layer" ' +
					'data="component.data" ' +
					'proximities="component.proximities" ' +
					'layer="component.layer"' +
					'togglelayer="toggleLayer(index)" ' +
					'style="margin: {{component.object.state.margin}}; background-color: {{component.view.settings.background}}" ' +
					'class="component ' + scope.component.object.type + '" ' +
					'ng-cloak ' +
					'></data-tk-component-' + scope.component.object.type + '>';

				element.replaceWith($compile(strTemplate)(scope));
			}
		};
	}
})();