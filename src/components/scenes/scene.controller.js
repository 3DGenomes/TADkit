(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneController', SceneController);

	function SceneController($scope) {

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};
		
		$scope.$on("angular-resizable.resizeEnd", function (event, args) {
			if(args.width)
				$scope.state.width = $scope.settings.views.scene_width = args.width;

			if(args.height)
				$scope.state.height = $scope.settings.views.scene_height = args.height;
			$scope.resizeCanvas();
        });
		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();