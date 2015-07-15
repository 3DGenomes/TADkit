(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($window, $scope, Settings, Storyboards, Components, Overlays, Proximities, Restraints) {

		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		$scope.current.storyboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.current.segmentLength;

		// TODO: PLACE FOLLOWING INSIDE SETTINGS SERVICE... and refine $scope setup
		// TODO: CHECK FOR DYNAMIC SETTINGS WHICH SHOULD BE IN SCOPE...
		// Set coords to default Storyboard views from dataset
		var chromosomeIndex = 0;
		if ($scope.current.dataset.object.chromosomeIndex) {
			chromosomeIndex = $scope.current.dataset.object.chromosomeIndex;	
		}
		$scope.settings.current.chromStart = $scope.current.dataset.object.chromStart[chromosomeIndex];
		$scope.settings.current.chromEnd = $scope.current.dataset.object.chromEnd[chromosomeIndex];
		$scope.settings.views.scale = 1; //$scope.current.dataset.object.scale;
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
		$scope.allProximities = Proximities.get(); // for Scene
		$scope.currentProximities = Proximities.at($scope.settings.current.particle); // for D3 tracks

		// Calculating Initial Restraints
		//NOTE in future if more than 1 currentModel need same number of currentRestraints
		$scope.currentRestraints = Restraints.at($scope.settings.current.particle); // for D3 tracks

		// Slice Matrix Overlays
		Overlays.at($scope.settings.current.particle);

		// Assign data and overlays for each component by type
		angular.forEach( $scope.current.storyboard.components, function(component, index) {

			// if (component.object.dataset == "default") {
				var overlay, overlayProximities;
				if (component.object.type == "scene") {
					component.data = $scope.current.model.data;
					 // component.proximities required for Scenes: overlay.colors Saturation
					component.proximities = $scope.allProximities;
					component.overlay = $scope.current.overlay;
					component.overlay.state = {};
					component.overlay.object.state.index = Overlays.getCurrentIndex();
				} else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
					overlay = Overlays.getOverlayById("genes");
					component.data = overlay.data;
					// component.overlay required for toggle
					component.overlay = overlay;
				} else if (component.object.type == "track-proximities") {
					// ie only one... see note above for Calculating Proximities
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentProximities;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("proximities");
					component.overlay = overlay;
				} else if (component.object.type == "track-restraints") {
					// ie only one... see note above for Calculating Restraints
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentRestraints;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("restraints");
					component.overlay = overlay;
				}
				// } else if (component.object.type == "track-wiggle") {
				// 	overlay = Overlays.getOverlayById(component.object.dataset);
				// 	component.data = overlay.data;
				// 	component.overlay = overlay; // required for toggle
				// } else {
				// 	// slider and other types of component...
				// }
			// }
		});

		// Watch for Slider Position updates
		$scope.$watch('settings.current.particle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
			if ( newParticle !== oldParticle ) {
				console.log(newParticle);
				$scope.currentProximities = Proximities.at(newParticle); // for D3 tracks
				$scope.currentRestraints = Restraints.at(newParticle); // for D3 tracks
				if ($scope.current.overlay.object.type == "matrix") {
					Overlays.at(newParticle);
					$scope.current.overlay = Overlays.getOverlay();
				} 
				// console.log($scope.currentProximities);
			}
		});

		// save original overlaid
		$scope.overlayOrig = $scope.current.overlay;
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.current.overlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid($scope.overlayOrig.object.state.index);
				Overlays.set($scope.overlayOrig.object.state.index);
				$scope.current.overlay = Overlays.getOverlay();
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