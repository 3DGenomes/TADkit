(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataImportController', DataImportController);

	function DataImportController ($log, $state, $scope, $mdDialog, $mdToast, DataImport, Datasets, Layers) {
		$scope.fileTitle = "No file loaded";

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Layers Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: DataImportController,
				locals: {
					layers: $scope.$parent.layers,
				},
				onComplete: afterShowAnimation
			}).then(function(importedLayersCount) {
				$log.info("Layers (" + importedLayersCount + ") added.");
			}, function() {
				$log.log("Layers import cancelled. No tracks added.");
	 			$state.go('browser');	
			});
			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				$log.debug(scope);
				$log.debug("Showing dialog");
			}
		});

		// Parse $fileContent user preview in modal window
		$scope.previewData = function($fileContent) {
			$log.info("Previewing...");

			$scope.preview = Datasets.preview($fileContent);
			$log.info("Data fetched - pending selection...");
		};

		// TODO message on sucess/fail in Layers.import
		$scope.importData = function() {
			$log.info("Import selected data...");
			var importedData = Datasets.import($scope.preview);
			$log.info("Import complete.");

			// Pass layers count for dialog hide message...
			$mdDialog.hide(importedData.length);
			$state.go('browser');
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.layersAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();