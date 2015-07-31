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
			}).then(function(importedOverlaysCount) {
				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + importedOverlaysCount + ") added")
				);
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
			$scope.fileData = Overlays.parse($fileContent).data;
			// Selected Rows in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;} // initially set all to selected
			// Selected Columns in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			console.log("File Opened...");
		};

		$scope.importData = function(parsedData) {
			$scope.importedOverlays = Overlays.import(parsedData, $scope.selectedRows, $scope.selectedCols);
			$mdDialog.hide($scope.importedOverlays.length); // overlays count passed for dialog hide message...
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