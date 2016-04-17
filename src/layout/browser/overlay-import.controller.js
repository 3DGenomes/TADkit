(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayImportController', OverlayImportController);

	function OverlayImportController ($log, $state, $scope, $mdDialog, $mdToast, OverlaysImport, Overlays) {
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
				$log.debug(scope);
				$log.debug("Showing dialog");
			}
		});

		$scope.fetchData = function($fileContent) {
			// Parse $fileContent user visual check in modal window
			$scope.fileData = OverlaysImport.parse($fileContent);

			// Selected Rows in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;} // on init select all

			// Selected Columns in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // on init select all
			
			$log.info("Data fetched - pending selection...");
		};

		$scope.importData = function(fileData) {
			var importedData = Overlays.import(fileData, $scope.selectedRows, $scope.selectedCols);
			$log.info("Importing selected data..."); // TODO message on sucess/fail in Overlays.import
			$mdDialog.hide(importedData.length); // overlays count passed for dialog hide message...
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