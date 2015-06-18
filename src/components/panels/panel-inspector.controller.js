(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope, $mdDialog){

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
		};

		$scope.width = parseInt($scope.state.width); // strip PX units
		$scope.height = parseInt($scope.state.height); // strip PX units

		$scope.atPosition = function(gene) {
			if ($scope.$parent.settings.current.segmentUpper >= gene.start && $scope.$parent.settings.current.segmentLower <= gene.end) return true;
			return false;
		};

		$scope.formatRegionName = function(regionName) {
			if (regionName == "Chromosome") {
				return regionName;
			} else {
				return "chr" + regionName;
			}
		};
		
		$scope.featureTitle = function(feature) {
			if (!feature.external_name) {
				return feature.id;
			} else {
				return feature.external_name;
			}
		};


		$scope.getDetails = function(item, event) {
			$mdDialog.show(
				$mdDialog.alert()
					.title('Details')
					.content(item.description)
					.ariaLabel('Item details')
					.ok('Close')
					.targetEvent(event)
			);
		};
	}

})();