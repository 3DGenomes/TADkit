(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkOverlayImport', tkOverlayImport);

	function tkOverlayImport($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkOverlayImport : "&"
			},
			link: function(scope, element, attrs) {
				element.on('change', function(e) {
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function() {
							// console.log("here in apply");
							scope.tkOverlayImport({$fileContent:e.target.result});
						});
					};
					reader.readAsText((e.srcElement || e.target).files[0]);
				});
			}
		};
	}
})();