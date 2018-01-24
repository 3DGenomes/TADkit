(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarBrowserController', SidebarBrowserController);

	function SidebarBrowserController ($scope, $mdDialog, $mdSidenav, Settings, Datasets, Hic_data){

		// Model Settings
		$scope.toggleSetting = function(setting) {
			$scope.settings = Settings.toggle(setting); // update $scope.settings defined in browser controller
		};
		$scope.toggleLeft = function() {
			$mdSidenav('left').close();
		};
		
		var dataset = Datasets.getDataset();
		var current_model = Datasets.getModel();
		
		$scope.datasets = Datasets.get();
		$scope.data = {
			data: [],
			object: dataset.object
		};
		if(!angular.isUndefined(current_model)) {
			$scope.data.data = current_model.data;
		}
		/*$scope.showDatasetSettings = function($event) {
			var dataset_info = '<div class="component-caption" layout="column" layout-align="left center">'+
					'<h2>'+$scope.data.object.title+'</h2><table>'+
					'<tr><td><b>Species:</b></td><td>'+$scope.data.object.species+'</td></tr>'+
					'<tr><td><b>Region:</b></td><td>'+$scope.data.object.region+'</td></tr>'+
					'<tr><td><b>UUID:</b></td><td>'+$scope.data.object.uuid+'</td></tr>'+
					'<tr><td><b>Resolution:</b></td><td>'+$scope.data.object.resolution+'</td></tr>'+
					'<tr><td><b>Bins:</b></td><td>'+($scope.data.data.length/3)+'</td></tr>'+
					'<tr><td><b>Chromatin radius:</b></td><td> 5 nm</td></tr>'+
					'<tr><td><b>Chromatin radius scale:</b></td><td>'+$scope.data.object.radius_scale+'x</td></tr>'+
				'</table>'+
			'</div>';
			$scope.showInfo($event,dataset_info);
		};*/
		$scope.showDatasetSettings = function(ev) {
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'dialog1.tmpl.html',
		      locals: {
		    	  data: $scope.data,
		    	  settings: $scope.settings,
		      },
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      hasBackdrop: true,
		      //controller: ['$scope', 'data', function($scope, data) {
		      //      $scope.data = data;
		      //    }],
		      clickOutsideToClose:true
		    });
		};
		
		$scope.showInfo = function($event,info) {
			$mdDialog.show({
			      parent: angular.element(document.body),
			      targetEvent: $event,
			      template: '<md-dialog md-theme="default" aria-label="Information">' +
			        '  <md-dialog-content class="md-default-theme">' + info +
			        '<md-dialog-actions><md-button ng-click="closeDialog();" class="md-primary md-button md-default-theme"><span class="ng-binding ng-scope">Close</span></md-button></md-dialog-actions>' +
			        '  </md-dialog-content>' +
			        '</md-dialog>',
			      locals: {
			    	  
			      },
			      hasBackdrop: false,
			      controller: DialogController
			    });
		};

		
		
		function DialogController($scope, $mdDialog, data, settings) {
			$scope.data = data;
			$scope.settings = settings;
			
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			};
			
			$scope.toggleSelection = function toggleSelection(chrom) {
				
				var chromosomeIndex = $scope.settings.current.chromosomeIndexes.slice();
				var idx = chromosomeIndex.indexOf(chrom);
			    // Is currently selected
			    if (idx > -1) {
			    	if(chromosomeIndex.length<2) return;
			    	chromosomeIndex.splice(idx, 1);
			    }

			    // Is newly selected
			    else {
			    	chromosomeIndex.push(chrom);
			    }
			    var chromStart = [];
				var chromEnd = [];
				var sortedIndex = [];
				var resolution = $scope.data.object.resolution;
				var chromIdx;
				var offset = 0;
				for (var l = 0 ; l < $scope.data.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf($scope.data.object.chrom[l]);
					if(chromIdx > -1) {
						sortedIndex.push($scope.data.object.chrom[l]);
						chromStart.push(Math.round($scope.data.object.chromStart[l]/resolution)+offset);
						chromEnd.push(Math.round($scope.data.object.chromEnd[l]/resolution)+offset);
					}
					offset += Math.round($scope.data.object.chromEnd[l]/resolution)-Math.round($scope.data.object.chromStart[l]/resolution);
				}
				var dataset = Datasets.getDataset();
			    var hic_data = Hic_data.set(dataset.hic_data,chromStart,chromEnd);
			    var currentModel = Datasets.setModel(Datasets.getCentroid(),chromosomeIndex);
			    if(chromosomeIndex.indexOf($scope.settings.current.chrom)<0) $scope.settings.current.chrom = chromosomeIndex[0];
			    Settings.set(dataset,chromosomeIndex,$scope.settings.current.chrom);
				//$scope.current.overlay = Overlays.getOverlay();
				
			    var igvDiv = angular.element(document.querySelector('#igvRootDiv'))[0];
			    var span_width = parseInt(igvDiv.clientWidth)-100;
			    $scope.settings.current.leftborder = 50;
			    if(chromosomeIndex.length==2) {
			    	var first_right_border = (50 + span_width)/chromosomeIndex.length;
			    	$scope.settings.current.rightborder = first_right_border * ($scope.settings.current.particlesCount/(chromEnd[0]-chromStart[0]));
			    } else $scope.settings.current.rightborder = (50 + span_width);
				
			    $scope.settings.current.chromosomeIndexes = sortedIndex;
			    
			    
			 };
		}
		
		
		// Scene Settings
		// $scope.toggleScene = function(scene) {
		// 	$scope.scenes = Scenes.toggle(scene); // update $scope.scenes defined in browser controller
		// };

		// Track overlays
		// $scope.toggleTrack = function(track) {
		// 	console.log(track);
		// 	$scope.tracks = Tracks.toggle(track); // update $scope.tracks defined in browser controller
			// $scope.colors = $scope.colors; // CHANGE OF COLOR USED BY SCENE DONE IN SCENE CONTROLLER ie. Here only set current color
		// };
	}
})();