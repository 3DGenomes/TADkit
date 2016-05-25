(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($log, $window, $scope, Settings, Storyboards, Components, Layers, Proximities, Restraints) {

		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		// ¿¿¿ SET segmentLength??? $scope.current.storyboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.current.segmentLength;

		$scope.settings.views.scale = 1; //$scope.current.dataset.object.scale;
		Storyboards.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);
		Components.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);

		// Calculating Initial Proximities
		//NOTE in future if more than 1 currentModel need same number of currentProximities
		$scope.allProximities = Proximities.get(); // for Scene
		$scope.currentProximities = Proximities.get($scope.settings.current.particle); // for D3 tracks

		// Calculating Initial Restraints
		//NOTE in future if more than 1 currentModel need same number of currentRestraints
		$scope.currentRestraints = Restraints.get($scope.settings.current.particle); // for D3 tracks
		// console.log($scope.currentRestraints);
		// Assign data and layers for each component by type
		$scope.components = Storyboards.getComponents();
		angular.forEach( $scope.components, function(component, index) {

			// if (component.object.dataset == "default") {
				var layer, layerProximities;
				if (component.object.type == "scene") {
					component.data = $scope.current.model.data;
					 // component.proximities required for Scenes: layer.colors Saturation
					component.proximities = $scope.allProximities;
					component.layer = $scope.current.layer;
					component.layer.state = {};
					component.layer.object.state.index = Layers.getCurrentIndex();
				} else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
					layer = Layers.getLayerById("genes");
					component.data = layer.data;
					// component.layer required for toggle
					component.layer = layer;
				} else if (component.object.type == "track-proximities") {
					// ie only one... see note above for Calculating Proximities
					// component.data for Scenes: layer.colors Saturation
					component.data = $scope.currentProximities;
					// component.layer required for toggle
					//   and for Scenes: layer.colors Hue
					layer = Layers.getLayerById("proximities");
					component.layer = layer;
				} else if (component.object.type == "track-restraints") {
					// ie only one... see note above for Calculating Restraints
					// component.data for Scenes: layer.colors Saturation
					component.data = $scope.currentRestraints;
					// component.layer required for toggle
					//   and for Scenes: layer.colors Hue
					layer = Layers.getLayerById("restraints");
					component.layer = layer;
				}
				// } else if (component.object.type == "track-wiggle") {
				// 	layer = Layers.getLayerById(component.object.dataset);
				// 	component.data = layer.data;
				// 	component.layer = layer; // required for toggle
				// } else {
				// 	// slider and other types of component...
				// }
			// }
		});

		// Watch for Slider Position updates
		$scope.$watch('settings.current.particle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
			if ( newParticle !== oldParticle ) {
				$scope.currentProximities = Proximities.get(newParticle); // for D3 tracks
				$scope.currentRestraints = Restraints.get(newParticle); // for D3 tracks
				if ($scope.current.layer.object.type == "matrix") {
					Layers.at(newParticle);
					$scope.current.layer = Layers.getLayer();
				} 
				$log.debug($scope.currentProximities);
			}
		});

		// save original overlaid
		$scope.layerOrig = $scope.current.layer;
		$scope.toggleLayer = function(index) {
			$scope.overlaid = Layers.getLayer(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Layers.setOverlaid(index);
				Layers.set(index);
				$scope.current.layer = Layers.getLayer();
				$log.debug($scope.current.layer);
			} else {
				Layers.setOverlaid($scope.layerOrig.object.state.index);
				Layers.set($scope.layerOrig.object.state.index);
				$scope.current.layer = Layers.getLayer();
			}
			// $scope.layer.object.state.overlaid = !$scope.layer.object.state.overlaid;
		};

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			$log.debug(bool);
		};

		$scope.testfn = function() {
			$log.debug("test worked");
		};

		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();