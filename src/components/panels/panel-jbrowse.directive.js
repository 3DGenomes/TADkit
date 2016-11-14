(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelJbrowse', tkComponentPanelJbrowse);

	function tkComponentPanelJbrowse(Settings) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'=',
				overlay: '=',
				currentoverlay:'='
			},
			templateUrl: 'assets/templates/panel-jbrowse.html',
			link:function(scope, element, attrs){
				// console.log(scope.data);
//				angular.element(document.querySelector('#jbrowse-iframe'))[0].onload= function() {
//					var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
//					jbrowse_scope.updateTadkitBar(scope.settings.current.position);
//				};				
				scope.$watch('settings.current.position', function(newPosition, oldPosition) {
					if ( newPosition !== oldPosition ) {
						scope.update();
					}
				});
				scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
					if ( newValue === -1 || oldValue === -1) {
						var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
						if(!angular.isUndefined(jbrowse_scope) && jbrowse_scope.updateTadkitBar) {
							jbrowse_scope.updateTadkitTAD();
						}
		        	}
				});
				scope.update = function(data) {
					scope.settings.current.particle = Settings.getParticle();
					scope.settings.current.segment = Settings.getSegment();
					scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???
					
					//var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
					//if(!angular.isUndefined(jbrowse_scope) && jbrowse_scope.updateTadkitBar) {
					//	jbrowse_scope.updateTadkitBar(scope.settings.current.position);
					//}
				};

				scope.toggleColor = function(overlay) {
					scope.currentoverlay = overlay;
					//scope.currentoverlay.colors.chromatin = chromatin_colors;
					scope.$apply(scope.currentoverlay.colors.chromatin);
				};
				//http://rest.ensemblgenomes.org/overlap/region/drosophila_melanogaster/chrX:15590000-16600000?feature=gene;content-type=application/json"
			}
		};
	}
})();