(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkProjectLoader', tkProjectLoader);

	function tkProjectLoader($parse) {		
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
			var fn = $parse(attrs.tkProjectLoader);

				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						console.log("Data Loaded");
						scope.$apply(function() {
							fn(scope, {$fileContent:onLoadEvent.target.result});
						});
					};

					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
					// srcElement??					
				});
			}
		};
	}
})();