(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayImportController', OverlayImportController);

	function OverlayImportController ($state, $scope, $mdDialog, $mdToast, Settings, Overlays, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";

		$scope.$on('$viewContentLoaded', function() {

			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			
			// Import Overlays Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: OverlayImportController,
				locals: {
					overlays: $scope.$parent.overlays,
				},
				onComplete: afterShowAnimation
			}).then(function(importedOverlays) {

				// convert to function in Overlays service
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
						newComponent.view.viewpoint.chromStart = settings.current.chromStart;
						newComponent.view.viewpoint.chromEnd = settings.current.chromEnd;
						newComponent.view.viewpoint.scale = settings.views.scale;
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
				Overlays.segment();

				// Add new overlays as Components to Storyboard
				for (var i = 0; i < newComponents.length; i++) {
					Storyboards.addComponent("default", newComponents[i]);
				}

				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + newOverlays.length + "/" + importedOverlays.length + ") added")
				);
	 			// $state.go('overlay-import-filter');	
	 			// $state.go('browser');


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

		$scope.parseFile = function($fileContent) {
			// Parse File for Data
			// var delimiter = Settings.get().import.delimiter;
			Papa.DefaultDelimiter = " ";
			$scope.dataParsed = Papa.parse($fileContent,{
				// delimiter: delimiter,
				dynamicTyping: true,
				fastMode: true
			});
			$scope.fileData = $scope.dataParsed.data;

			// Selected Rows in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;}

			// Selected Columns in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;}

			console.log("File Opened...");
		};

		$scope.importData = function(parsedData) {
			// remove unwanted rows and cols
			// var filteredData = parsedData;
			var filteredData = Overlays.filter(parsedData, $scope.selectedRows, $scope.selectedCols);
			$scope.overlaysAcquired = Overlays.aquire(filteredData);
			console.log("Data Imported");
			$mdDialog.hide($scope.overlaysAcquired);
			$state.go('browser');
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.overlaysAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();