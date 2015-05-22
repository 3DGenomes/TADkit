(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayController', OverlayController);

	function OverlayController ($state, $scope, $mdDialog, $mdToast, Settings, Overlays, Components, Storyboards, uuid4) {

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			
			// Import Overlays Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: OverlayController,
				locals: {
					overlays: $scope.$parent.overlays,
				},
				onComplete: afterShowAnimation
			}).then(function(importedOverlays) {
				var overlays = Overlays.get();
				var newOverlays = [];
				var newComponents = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var componentTemplate = Components.getComponentByType(overlay.object.type);
					var overlayExists = false;
					var newComponent = angular.copy(componentTemplate);
					for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						// console.log(overlays.loaded[i].object.uuid);
						// console.log(overlay.object.uuid);
						// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
					}
					if (!overlayExists) {
						currentOverlaysIndex++;
						overlay.object.state.index = currentOverlaysIndex;
						overlay.object.state.overlaid = false;
						newOverlays.push(overlay);

						var settings = Settings.get();
						// New component for overlay
						newComponent.object.uuid = uuid4.generate();
						newComponent.object.id = overlay.object.id;
						newComponent.object.title = overlay.object.id;
						newComponent.object.dataset = overlay.object.id;
						newComponent.view.settings.step = overlay.object.step;
						newComponent.view.settings.color = overlay.object.color;
						newComponent.view.settings.segmentsCount = settings.segmentsCount;
						newComponent.view.viewpoint.chromStart = settings.currentChromStart;
						newComponent.view.viewpoint.chromEnd = settings.currentChromEnd;
						newComponent.view.viewpoint.scale = settings.currentScale;
						newComponent.view.viewtype = overlay.object.type + "-" + overlay.object.stepType;
						newComponent.data = overlay.data;
						newComponent.overlay = overlay;

						// console.log(newComponent);
						newComponents.push(newComponent);
					}
				});

				// Add newOverlays to Overlays
				overlays.loaded = overlays.loaded.concat(newOverlays);
				// Generate overlay colors
				var chromStart = Settings.get().chromStart;
				var segmentsCount = Settings.get().segmentsCount;
				var segmentLength = Settings.get().segmentLength;
				var featureTypes = Settings.get().featureTypes;
				Overlays.segmentOverlays(chromStart, segmentsCount, segmentLength, featureTypes);

				// Add new overlays as Components to Storyboard
				for (var i = newComponents.length - 1; i >= 0; i--) {
					Storyboards.addComponent("default", newComponents[i]);
				}

				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + newOverlays.length + "/" + importedOverlays.length + ") added")
				);
	 			// $state.go('overlay-filter');	
	 			$state.go('browser');	
			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('cancelled')
				);
	 			$state.go('browser');	
			});

			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				// console.log(scope);
				console.log("showing dialog");
			}
		});

		$scope.importOverlay = function($fileContent) {
			$scope.dataParsed = Papa.parse($fileContent,{
				delimiter: " ",
				dynamicTyping: true,
				fastMode: true
			});
			$scope.overlaysAcquired = Overlays.aquire($scope.dataParsed.data);
			console.log("Overlays acquired!");
			// $state.go('overlay-filter');	
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.overlaysAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();