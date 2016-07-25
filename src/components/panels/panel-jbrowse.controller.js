(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelJBrowseController', PanelJBrowseController);

	function PanelJBrowseController($scope, $mdDialog, Overlays, uuid4, Networks) {

		$scope.width = $scope.state.width; // strip PX units
		$scope.height = $scope.state.height; // strip PX units

		var originalOverlay = Overlays.getCurrentIndex();
		
		var jbrowse_start = (($scope.settings.current.chromStart-30000));
		if(jbrowse_start<0) jbrowse_start = 0;
		//$scope.jbrowsedataurl = 'http://172.16.54.4/JBrowse/data';
		$scope.jbrowsedataurl = 'data';
		$scope.iframe_src = '../JBrowse/index.html?data='+$scope.jbrowsedataurl+'&loc='+($scope.settings.current.chrom).replace('chr','')+':'+
		jbrowse_start+'..'+($scope.settings.current.chromEnd+30000)+'&tracklist=0&tracks=Genes,Restraints,Chromatin%20Types'+
			'&highlight='+($scope.settings.current.chrom).replace('chr','')+':'+
			$scope.settings.current.chromStart+'..'+$scope.settings.current.chromEnd;
			//'&addBookmarks=%5B%7B%22start%22%3A'+$scope.settings.current.chromStart+
			//'%2C%22end%22%3A'+$scope.settings.current.chromEnd+'%2C%22color%22%3A%20%22rgba(190%2C50%2C50%2C0.5)%22%2C%22ref%22%3A%20%22'+
			//($scope.settings.current.chrom).replace('chr','')+'%22%7D%5D';
		
		$scope.updatePosition =  function(position) {
			//alert(position);
			if(position >= $scope.settings.current.chromStart && position <= $scope.settings.current.chromEnd) {
				$scope.settings.current.position = position;
			}
			if(position < $scope.settings.current.chromStart) {
				$scope.settings.current.position = $scope.settings.current.chromStart;
			}  
			if(position > $scope.settings.current.chromEnd) {
				$scope.settings.current.position = $scope.settings.current.chromEnd;
			}
			$scope.$apply();
		};
		$scope.applyOverlay =  function(track,features) {
			var self = this;
			var overlays = Overlays.get();
			for(var i=0;i<overlays.loaded.length;i++) {
				if (overlays.loaded[i].object.title === track) {
					$scope.toggleOverlay(overlays.loaded[i].object.state.index);
					return true;
				}
			}
			
			var jbrowseOverlay =
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : overlays.loaded.length,
									"title" : track,
									"source" : "JBrowse track",
									"url" : "local",
									"description" : "JBrowse track overlay", 
									"type" : "jbrowse",
									"format" : "variable",
									"components" : 2,
									"name" : track,
									"state" : {
										"index" : 0, // make real index???
										"overlaid" : false
									}
								},
								"palette" : [],
								"data" : [],
								"colors" : {
									"particles" : [],
									"chromatin" : [],
									"network" : {
										"RGB" : [],
										"alpha" : []
									}
								}
							};
			var totallength;
			var k;
			var j = 0;
			angular.forEach(features, function(feature) {
				totallength = Math.round((feature[2] - feature[1])/$scope.settings.current.segmentLength);
				for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
					jbrowseOverlay.colors.chromatin[k] = feature[5];
				}
				j += totallength;
			});
			for(i=j;i<$scope.settings.current.segmentsCount;i++) {
				jbrowseOverlay.colors.chromatin[i] = "gray";
			}
			var newOverlay = Overlays.addDirect(jbrowseOverlay);
			var overlay = overlays.loaded[newOverlay];
			
			overlay.colors.particles = [];
			overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, $scope.settings.current.edgesCount);
			overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, $scope.settings.current.edgesCount);

			$scope.toggleOverlay(newOverlay);
			//Overlays.setOverlaid(newOverlay);
			//Overlays.set(newOverlay);
			//$scope.currentoverlay = Overlays.set(newOverlay);
		};
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.currentoverlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid(originalOverlay);
				Overlays.set(originalOverlay);
				$scope.currentoverlay = Overlays.getOverlay();
			}
			//$scope.$apply($scope.currentoverlay.colors.chromatin);
			//$scope.toggleColor($scope.currentoverlay.colors.chromatin);
			$scope.toggleColor($scope.currentoverlay);
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};
		$scope.removeOverlay =  function(track) {
			var overlays = Overlays.get();
			angular.forEach(overlays.loaded, function(overlay) {
				if (overlay.object.title === track) {
					$scope.toggleOverlay(overlay.object.state.index);
				}

			});
		};
	}
})();