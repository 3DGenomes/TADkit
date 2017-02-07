(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelIgvjsController', PanelIgvjsController);

	function PanelIgvjsController($scope, $mdDialog, Overlays, uuid4, Networks, d3Service) {

		$scope.width = $scope.state.width; // strip PX units
		$scope.height = $scope.state.height; // strip PX units

		var originalOverlay = Overlays.getCurrentIndex();
		
		var igvjs_start = (($scope.settings.current.chromStart));
		if(igvjs_start<0) igvjs_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		//$scope.jbrowsedataurl = 'http://172.16.54.4/JBrowse/data';
		//$scope.jbrowsedataurl = $scope.view.settings.jbrowse_data+'_'+$scope.settings.current.speciesUrl;
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].fastaURL) {
			$scope.view.settings.fastaurl = $scope.view.settings.species_data[$scope.settings.current.speciesUrl].fastaURL;
			$scope.view.settings.showNav = true;
		} else {
			$scope.view.settings.showNav = false;
		}
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].cytobandURL) {
			$scope.view.settings.cytourl = $scope.view.settings.species_data[$scope.settings.current.speciesUrl].cytobandURL;
			$scope.view.settings.showCyto = false;
		} else {
			$scope.view.settings.showCyto = false;
		}
		
		$scope.igvDiv = angular.element(document.querySelector('#igvDiv'))[0];
		$scope.igvOptions = {
		            showNavigation: $scope.view.settings.showNav,
		            showRuler: true,
		            showIdeogram: $scope.view.settings.showCyto,
		            flanking: 0,
		            reference: {
						id: $scope.settings.current.speciesUrl,
						fastaURL: $scope.view.settings.fastaurl,
						cytobandURL: $scope.view.settings.cytourl
					    },
					locus: chrom+':'+igvjs_start+'-'+($scope.settings.current.chromEnd),
		            tracks: [
		      {
		                    name: "Fillion Colors",
		                    type: "annotation",
		                    format: "bed",
		                    sourceType: "file",
		                    url: "../data/fillion_colors.bed",
		                    indexed: false,
		                    order: Number.MAX_VALUE,
		                    visibilityWindow: 300000000,
		                    displayMode: "EXPANDED"
		                }
		            ]
		        };
		
		
			
		$scope.updatePosition =  function(position, leftborder, rightborder) {
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
			if($scope.settings.current.leftborder != leftborder || $scope.settings.current.rightborder != rightborder) {
				$scope.settings.current.leftborder = leftborder;
				$scope.settings.current.rightborder = rightborder;
			}
			//$scope.hideTadkitMarkers();
			$scope.updateTadkitTAD();
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
			var k, max_val, min_val;
			var j = 0;
			var l = 0;
			
			for(k=0;k<$scope.settings.current.segmentsCount;k++) {
				jbrowseOverlay.colors.chromatin[k] = "gray";
			}

			var featureColor = [];
			var scored_color = false;
			angular.forEach(features, function(feature) {
				if(typeof feature.get('color') == 'undefined') {
					featureColor.push(feature.get('score'));
					scored_color = true;
				} else {
					featureColor.push(feature.get('color'));
				}
			});
			if(scored_color) {
				var hexEnd = '#0000ff';
				var hexStart = '#ffffff';
				max_val = Math.max.apply(Math, featureColor);
				min_val = Math.min.apply(Math, featureColor);
				for(k=0;k<featureColor.length;k++) {
					featureColor[k] = d3.interpolateHcl(hexStart, hexEnd)((featureColor[k]-min_val)/(max_val-min_val));
				}
			}
			angular.forEach(features, function(feature) {
				j = Math.round((feature.get('start') - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
				totallength = Math.round((feature.get('end') - feature.get('start'))/$scope.settings.current.segmentLength);
				for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
					jbrowseOverlay.colors.chromatin[k] = featureColor[l];
				}
				l++;
				//j += totallength;
			});
//			j += totallength;
//			for(i=j;i<$scope.settings.current.segmentsCount;i++) {
//				jbrowseOverlay.colors.chromatin[i] = "gray";
//			}
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
		$scope.myIgv = igv.createBrowser($scope.igvDiv, $scope.igvOptions);
		
		$scope.myIgv.centerGuide.$centerGuideToggle.click();
		
		var d = angular.element("<div id=\"tad-highlight-tadkit\" style=\"width='0px;'\"></div>");
		var trackContainer = angular.element($scope.myIgv.trackContainerDiv);
		trackContainer.append(d);
		
		$scope.updateTadkitTAD = function() {
        	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
        		var referenceFrame;
        		$scope.myIgv.trackViews.forEach(function (trackView) {
        			if(trackView.track.id == 'sequence') {
        				referenceFrame = trackView.viewports[0].genomicState.referenceFrame;
        			}
        		});
        		if(typeof(referenceFrame) != 'undefined') {
	            	//trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
	            	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
	            	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
	            	
	            	var leftpos = Math.round((start_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("left",Math.floor(leftpos+50) + "px");
	                var rightpos = Math.round((end_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("width",Math.floor(rightpos-leftpos) + "px");
        		}
                
            } else {
            	//trackPane.style.backgroundColor = "";
            	d.css("width","0px");
            	
            }
        };
        
		$scope.myIgv.on('locuschange', function (referenceFrame, label) {
//			var locus = label;
//			var chr_locus = locus.split(':');
//			var start_end = chr_locus[1].split('-');
//			var start = parseInt(start_end[0].replace(/,/g , ""));
//			var end = parseInt(start_end[1].replace(/,/g , ""));
//			var pos_span = ((end - start)/2);
//			var px_center = pos_span/referenceFrame.bpPerPixel + 50;
//			var px_start = px_center - (pos_span+start-$scope.settings.current.chromStart)/referenceFrame.bpPerPixel;
//			var px_end = px_center + ($scope.settings.current.chromEnd-(pos_span+start))/referenceFrame.bpPerPixel;
			
			var px_start = ($scope.settings.current.chromStart-referenceFrame.start)/referenceFrame.bpPerPixel;
			var px_end = ($scope.settings.current.chromEnd-referenceFrame.start)/referenceFrame.bpPerPixel;
			var center_bp = ((px_end-px_start)/2)*referenceFrame.bpPerPixel;
			
			
			var igv_chrom = $scope.myIgv.genome.getChromosome(referenceFrame.chrName);
			igv_chrom.bpLength = ($scope.settings.current.chromEnd+px_end*referenceFrame.bpPerPixel);
			
			if((center_bp+referenceFrame.start)<$scope.settings.current.chromStart) {
				$scope.myIgv.trackViews.forEach(function (trackView) {
					var ps = px_end*referenceFrame.bpPerPixel;
					trackView.viewports.forEach(function(viewPort){
						if(viewPort.genomicState.referenceFrame) {
							if($scope.settings.current.chromStart-ps<=0) {
								viewPort.genomicState.referenceFrame.start = 0;
							} else {
								viewPort.genomicState.referenceFrame.start = $scope.settings.current.chromStart-ps;
							}
							
							//viewPort.genomicState.referenceFrame.end = $scope.settings.current.chromEnd+2*ps;
						}
					});
				});
				$scope.myIgv.update();
				
				
			}	
			
			$scope.updatePosition(referenceFrame.start+center_bp, px_start+50 , px_end+50);
		});
		//$scope.updateTadkitTAD();
	}
})();