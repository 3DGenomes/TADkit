(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataImportController', DataImportController);

	function DataImportController ($state, $scope, $stateParams, $mdDialog, $mdToast, Settings, Datasets, Hic_data, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";
		$scope.func =  $stateParams.func;
		$scope.settings = Settings.get();
		$scope.resolution =  $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
		
		
		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Datas Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: DataImportController,
				onComplete: afterShowAnimation
			}).then(function(importedDatasCount) {
				$mdToast.show(
					$mdToast.simple()
					.content("Coordinates (" + importedDatasCount + ") added")
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
			// Selected Columns in File Data
			// Controlled by checkboxes in Data-import.html
			$scope.skipRows = 0;
			$scope.bp_per_nm = 0.01;
			$scope.first_bin = 0;
			
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			console.log("File Opened...");
		};
	
		$scope.importData = function(parsedData) {
			
			$scope.importedCoords = Datasets.import(parsedData, $scope.skipRows, $scope.bp_per_nm, $scope.selectedCols);
			$mdDialog.hide($scope.importedCoords); 
			//var settings = Settings.get();
			var dataset = Datasets.getDataset();
		    //var hic_data = Hic_data.set(dataset.hic_data,settings.current.chromStart,settings.current.chromEnd);
		    var currentModel = Datasets.setModel(Datasets.getCentroid(),settings.current.chromosomeIndexes);
		    //Settings.set(dataset,settings.current.chrom,settings.current.chrom);
			
			var chromosomeIndex = settings.current.chromosomeIndexes.slice();
			//var chromosomeIndex = [dataset.object.chrom[0]];
			$scope.settings.current.chromosomeIndexes = chromosomeIndex;
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