(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInfoboxController', PanelInfoboxController);

	function PanelInfoboxController( $state, $scope, Datasets ){
		if ($state.includes('browser')){
			$scope.infobox = Datasets.getDataset();
			$scope.infobox.object.region = Datasets.getRegion();
		// console.log($scope.infobox);
		}
	}
})();