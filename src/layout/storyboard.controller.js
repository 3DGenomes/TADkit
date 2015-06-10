(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($window, $scope, Settings, Storyboards, Components, Overlays, Proximities) {
		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		$scope.currentStoryboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.segmentLength;

		// Set coords to default Storyboard views from dataset
		var chromosomeIndex = 0;
		if ($scope.currentDataset.object.chromosomeIndex) {
			chromosomeIndex = $scope.currentDataset.object.chromosomeIndex;	
		}
		$scope.settings.currentChromStart = $scope.currentDataset.object.chromStart[chromosomeIndex];
		$scope.settings.currentChromEnd = $scope.currentDataset.object.chromEnd[chromosomeIndex];
		$scope.settings.currentScale = 1; //$scope.currentDataset.object.scale;
		Storyboards.setViewpoint($scope.settings.currentChromStart,$scope.settings.currentChromEnd,$scope.settings.currentScale);
		Components.setViewpoint($scope.settings.currentChromStart,$scope.settings.currentChromEnd,$scope.settings.currentScale);

		// SET INITIAL position
		var position = $scope.settings.currentChromStart + parseInt(($scope.settings.currentChromEnd - $scope.settings.currentChromStart) * 0.5);
		$scope.settings.position = position;
		var currentParticle = Settings.getParticle(position, $scope.settings.currentChromStart, $scope.settings.currentChromEnd, $scope.settings.particlesCount);
		$scope.settings.currentParticle = currentParticle; 

		// AND SEGMENT IT LIES WITHIN
		$scope.settings.segment = Math.floor( ($scope.settings.position - $scope.settings.currentChromStart) / $scope.settings.segmentLength);
		$scope.settings.segmentLower = $scope.settings.position - ($scope.settings.segment * 0.5);
		$scope.settings.segmentUpper = $scope.settings.position + ($scope.settings.segment * 0.5);

		// Calculating Initial Proximities
		//NOTE in future if more than 1 currentModel need same number of currentProximities
		$scope.currentProximities = Proximities.at($scope.settings.currentParticle); // for D3 tracks
		Overlays.at($scope.settings.currentParticle);

		// Assign data and overlays for each component by type
		angular.forEach( $scope.currentStoryboard.components, function(component, index) {
			// if (component.object.dataset == "default") {
				var overlay, overlayProximities;
				if (component.object.type == "scene") {
					component.data = $scope.currentModel.data;
					component.overlay = $scope.currentOverlay;
					component.overlayIndex = $scope.currentOverlayIndex;
					component.overlay.state = {};
					component.overlay.object.state.index = $scope.currentOverlayIndex;
				} else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
					overlay = Overlays.getOverlayById("genes");
					component.data = overlay.data;
					component.overlay = overlay; // required for toggle
				} else if (component.object.type == "track-proximities") {
					// ie only one... see note above for Calculating Proximities
					overlay = Overlays.getOverlayById("proximities");
					component.data = $scope.currentProximities; // for Scenes: overlay.colors Saturation
					component.overlay = overlay; // required for toggle and for Scenes: overlay.colors Hue
				// } else if (component.object.type == "track-wiggle") {
				// 	overlay = Overlays.getOverlayById(component.object.dataset);
				// 	component.data = overlay.data;
				// 	component.overlay = overlay; // required for toggle
				} else {
					// slider and other types of component...
				}
			// }
		});

		// Watch for Slider Position updates
		$scope.$watch('settings.currentParticle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
			if ( newParticle !== oldParticle ) {
				$scope.currentProximities = Proximities.at(newParticle); // for D3 tracks
				if ($scope.currentOverlay.object.type == "matrix") {
					// console.log(JSON.stringify($scope.currentOverlay.colors.chromatin));
					Overlays.at(newParticle);
					$scope.currentOverlay = Overlays.getOverlay();
					// console.log(JSON.stringify($scope.currentOverlay.colors.chromatin));
				} 
				// console.log($scope.currentProximities);
			}
		});

		// save original overlaid
		$scope.overlayOrig = $scope.currentOverlay;
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.currentOverlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid($scope.overlayOrig.object.state.index);
				Overlays.set($scope.overlayOrig.object.state.index);
				$scope.currentOverlay = Overlays.getOverlay();
			}
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};

		$scope.testfn = function() {
			console.log("test worked");
		};

		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();