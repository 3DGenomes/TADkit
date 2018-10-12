(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelIgvjs', tkComponentPanelIgvjs);

	function tkComponentPanelIgvjs(Settings) {
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
			templateUrl: 'assets/templates/panel-igvjs.html',
			link:function(scope, element, attrs){	
				scope.$watch('settings.current.position', function(newPosition, oldPosition) {
					if ( newPosition !== oldPosition ) {
						scope.update();
					}
				});
				
				/*scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
					if ( newValue === -1 || oldValue === -1) {
						scope.updateTadkitTAD();
		        	}
				});	*/		
				scope.update = function(data) {
					scope.settings.current.particle = Settings.getParticle();
					scope.settings.current.segment = Settings.getSegment();
					var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					//scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentLower = (scope.settings.current.particle)*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
					//scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentUpper = (scope.settings.current.particle+1)*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
					
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