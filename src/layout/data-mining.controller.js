(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataMiningController', DataMiningController);

	function DataMiningController ($stateParams, $state, $scope, $mdDialog, $mdToast, Storyboards, Datasets, Hic_data, Track_data) {

		var track_data = Track_data.get();
		var hic_data = Hic_data.get();
		var settings = $scope.$parent.settings.current;
		var resolution = settings.segmentLength*settings.particleSegments;
		$scope.resolution = resolution;
		$scope.TrackList = [];
		var i;
		for(i=0;i<track_data.length;i++) {
        	$scope.TrackList.push(track_data[i].track_name);
        }
        $scope.func = $stateParams.func; 
		$scope.gridOptions = {
			enableGridMenu: false,
			enableFiltering: true,
			enableColumnResizing: true,
		    exporterCsvFilename: 'tadkit_export.csv',
			onRegisterApi: function (gridApi) {
		      $scope.gridApi = gridApi;
		    }
		};
		
		$scope.intThreshold = 10;
		$scope.minDistance = resolution;
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
									        "id": track_data[i].feature[f].id,
									        "Name": track_data[i].feature[f].name,
									        "Start": track_data[i].feature[f].start,
									        "End": track_data[i].feature[f].end,
									        "Strand": track_data[i].feature[f].strand,
									        "Value": track_data[i].feature[f].value
									    });
									}
								}
							}

						}
					}

		        }
		    } else if(func=='Interacting loci') {
		    	var x_mark, y_mark;
            	var x , y = 0;
            	var chr1, chr2, chr_bins = 0;
		    	var l = 0;
		    	var feats1, feats2, obj;
		    	var range = (hic_data.max - hic_data.min)/100;
		    	var feature_in_bin = function (el) { 
		    		return ((this.locus_pos+resolution >= el.start && this.locus_pos<= el.end && el.chr.replace('chr','') == this.locus_chr.replace('chr','')));
		    	};
		    	for(j=0;j<track_data.length;j++) {
					if(track_data[j].track_name == $scope.selTrack) {
		                for(i=0;i<hic_data.value.length;i++) {
		                	if($scope.intThreshold*range > hic_data.value[i]) continue;
		                	x = Math.floor(hic_data.pos[i]%hic_data.n);
							y = Math.floor(hic_data.pos[i]/hic_data.n);
							if(y>x) continue;
							
			            	chr_bins = 0;
			            	l = 0;
			            	while(chr_bins<=x) {
			            		x_mark = (x-chr_bins)*resolution+(settings.chromStart[l]);
			            		chr_bins += Math.round(settings.chromEnd[l]/resolution)-Math.round(settings.chromStart[l]/resolution); 
			            		l++;
			            	}
			            	chr1 = settings.chromosomeIndexes[l-1];
			            	chr_bins = 0;
			    			l = 0;
			    			while(chr_bins<=y) {
			            		y_mark = (y-chr_bins)*resolution+(settings.chromStart[l]);
			            		chr_bins += Math.round(settings.chromEnd[l]/resolution)-Math.round(settings.chromStart[l]/resolution); 
			            		l++;
			            	}
			            	chr2 = settings.chromosomeIndexes[l-1];
			            	
			            	if(chr1 == chr2 && Math.abs(x_mark-y_mark) <= $scope.minDistance) continue;
			            	
			            	obj = { locus_pos: x_mark, locus_chr: chr1 };
			            	feats1 = track_data[j].feature.filter(feature_in_bin, obj);
			            	obj = { locus_pos: y_mark, locus_chr: chr2 };
			            	feats2 = track_data[j].feature.filter(feature_in_bin, obj);
			            	
			            	if(feats1.length == 0 || feats2.length == 0) continue;
			            	
			            	$scope.gridOptions.data.push({
						        "Chromosome 1": chr1,
						        "Locus 1": x_mark,
						        "Chromosome 2": chr2,
						        "Locus 2": y_mark,
						        "Interaction freq,": hic_data.value[i],
						        "Features 1": feats1.map(function(elem){return elem.name;}).join(","),
						        "Features 2": feats2.map(function(elem){return elem.name;}).join(",")
						    });
		                	
		                	
		                }
					}
		    	}
		    }
		};
		$scope.export = function(func){
			//$scope.gridApi.exporter.csvExport( 'all', 'all');
			/* generate a worksheet */
			var filteredRows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid);
			var result = [];

			filteredRows.forEach(function(key) {
			    result.push(key.entity);
			});
			var ws = XLSX.utils.json_to_sheet(result);
			
			var wbout = XLSX.utils.sheet_to_csv(ws, {FS:"\t"});
			/* generate a download */

			saveAs(new Blob([wbout],{type:"attachment/csv;charset=utf-8;"}), func+".tsv");
		};
		$scope.cancel = function() {
			$mdDialog.hide();
		};
	}
})();