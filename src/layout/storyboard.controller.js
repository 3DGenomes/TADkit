(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($window, $scope, Settings, Storyboards, Components, Overlays, Proximities) {

		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		$scope.currentStoryboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.current.segmentLength;

		// TODO: PLACE FOLLOWING INSIDE SETTINGS SERVICE... and refine $scope setup
		// TODO: CHECK FOR DYNAMIC SETTINGS WHICH SHOULD BE IN SCOPE...
		// Set coords to default Storyboard views from dataset
		var chromosomeIndex = 0;
		if ($scope.currentDataset.object.chromosomeIndex) {
			chromosomeIndex = $scope.currentDataset.object.chromosomeIndex;	
		}
		$scope.settings.current.chromStart = $scope.currentDataset.object.chromStart[chromosomeIndex];
		$scope.settings.current.chromEnd = $scope.currentDataset.object.chromEnd[chromosomeIndex];
		$scope.settings.views.scale = 1; //$scope.currentDataset.object.scale;
		Storyboards.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);
		Components.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);
		$scope.settings.current.particlesCount = Settings.get().current.particlesCount;

		// SET INITIAL position at midpoint
		var position = $scope.settings.current.chromStart + parseInt(($scope.settings.current.chromEnd - $scope.settings.current.chromStart) * 0.5);
		$scope.settings.current.position = position;
		var currentParticle = Settings.getParticle();
		$scope.settings.current.particle = currentParticle; 

		// AND SEGMENT IT LIES WITHIN
		$scope.settings.current.segment = Settings.getSegment($scope.settings.current.position);
		$scope.settings.current.segmentLower = $scope.settings.current.position - ($scope.settings.current.segment * 0.5);
		$scope.settings.current.segmentUpper = $scope.settings.current.position + ($scope.settings.current.segment * 0.5);

		// Calculating Initial Proximities
		//NOTE in future if more than 1 currentModel need same number of currentProximities
		$scope.currentProximities = Proximities.at($scope.settings.current.particle); // for D3 tracks
		Overlays.at($scope.settings.current.particle);

		// Assign data and overlays for each component by type
		angular.forEach( $scope.currentStoryboard.components, function(component, index) {
			// if (component.object.dataset == "default") {
				var overlay, overlayProximities;
				if (component.object.type == "scene") {
					component.data = $scope.currentModel.data;
					component.proximities = $scope.currentProximities; // for Scenes: overlay.colors Saturation
					component.overlay = $scope.currentOverlay;
					component.overlay.state = {};
					component.overlay.object.state.index = Overlays.getCurrentIndex();
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
		$scope.$watch('settings.current.particle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
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