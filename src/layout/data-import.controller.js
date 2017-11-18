(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataImportController', DataImportController);

	function DataImportController ($state, $scope, $mdDialog, $mdToast, Settings, Datasets, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Datas Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: DataImportController,
				locals: {
					datasets: $scope.$parent.datasets,
				},
				onComplete: afterShowAnimation
			}).then(function(importedDatasCount) {
				$mdToast.show(
					$mdToast.simple()
					.content("Datas (" + importedDatasCount + ") added")
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
			$scope.fileData = Datasets.parse($fileContent).data;
			// Selected Rows in File Data
			// Controlled by checkboxes in Data-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;} // initially set all to selected
			// Selected Columns in File Data
			// Controlled by checkboxes in Data-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			console.log("File Opened...");
		};

		$scope.importData = function(parsedData) {
			$scope.importedDatas = Datasets.import(parsedData, $scope.selectedRows, $scope.selectedCols);
			$mdDialog.hide($scope.importedDatas.length); // Datas count passed for dialog hide message...
			$state.go('browser');
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.DatasAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();