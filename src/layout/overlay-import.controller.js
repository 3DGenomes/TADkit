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
				var newOverlays = Overlays.add(importedOverlays);

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