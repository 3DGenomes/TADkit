(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataMiningController', DataMiningController);

	function DataMiningController ($stateParams, $state, $scope, $mdDialog, $mdToast, Storyboards, Datasets, Hic_data, Track_data) {

		var track_data = Track_data.get();
		var settings = $scope.$parent.settings.current;
		$scope.TrackList = [];
		var i;
		for(i=0;i<track_data.length;i++) {
        	$scope.TrackList.push(track_data[i].track_name);
        }
        $scope.func = $stateParams.func; 
		$scope.gridOptions = {
			enableGridMenu: false,
		    exporterCsvFilename: 'tadkit_export.csv',
			onRegisterApi: function (gridApi) {
		      $scope.gridApi = gridApi;
		    }
		};
		
		$scope.intThreshold = 10;
		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Datas Dialog
			$mdDialog.show({
				parent: parentElement,
				clickOutsideToClose: false,
				scope: $scope,  
      			preserveScope: true,  
				templateUrl: stateTemplate,
				controller: DataMiningController,
				onComplete: afterShowAnimation
			}).then(function() {
				$mdToast.show(
					$mdToast.simple()
					.content('closed')
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
		$scope.refresh = function(func) {
			var i,j,k,f;
			var resolution = settings.segmentLength*settings.particleSegments;
			$scope.gridOptions.data = [];
			if(func=='Features by bin') {
				for(i=0;i<track_data.length;i++) {
					if(track_data[i].track_name == $scope.selTrack) {
						for(j=0;j<settings.chromosomeIndexes.length;j++) {
							for(k=settings.chromStart[j];k<settings.chromEnd[j];k+=resolution) {
								for(f=0;f<track_data[i].feature.length;f++) {
									if (k+resolution >= track_data[i].feature[f].start && k<= track_data[i].feature[f].end && 
										track_data[i].feature[f].chr.replace('chr','') == settings.chromosomeIndexes[j].replace('chr','') 
									) {
										$scope.gridOptions.data.push({
									        "Chromosome": settings.chromosomeIndexes[j],
									        "Locus": k,
									        "Feature id": track_data[i].feature[f].id,
									        "Feature name": track_data[i].feature[f].name,
									        "Feature start": track_data[i].feature[f].start,
									        "Feature end": track_data[i].feature[f].end,
									        "Feature strand": track_data[i].feature[f].strand,
									        "Feature value": track_data[i].feature[f].value
									    });
									}
								}
							}

						}
					}

		        }
		    }
		};
		$scope.export = function(){
			$scope.gridApi.exporter.csvExport( 'all', 'all');
		};
		$scope.cancel = function() {
			$mdDialog.hide();
		};
	}
})();