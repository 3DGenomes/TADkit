(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope){

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
		};

		$scope.width = parseInt($scope.state.width);
		$scope.height = parseInt($scope.state.height);

		$scope.atPosition = function(gene) {
			if ($scope.$parent.settings.segmentUpper >= gene.start && $scope.$parent.settings.segmentLower <= gene.end) return true;
			return false;
		};
	}

})();