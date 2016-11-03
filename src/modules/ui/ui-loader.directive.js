(function() {
	'use strict';
	angular
		.module('ui')
		.directive('uiLoader', uiLoader);

	function uiLoader($log, $state, $parse) {		
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
				var fn = $parse(attrs.uiLoader);
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						$log.info("Data loaded OK!");
						scope.$apply(function() {
						// HERE: call the parsed function correctly (with scope AND params object)
							fn(scope, {$fileContent:onLoadEvent.target.result});
							// $state.go('dataset');
						});
					};
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}
})();