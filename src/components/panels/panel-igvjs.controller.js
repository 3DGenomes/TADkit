(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelIgvjsController', PanelIgvjsController);

	function PanelIgvjsController($scope, $mdDialog, Overlays, uuid4, Networks, d3Service, Users) {

		$scope.width = $scope.state.width; // strip PX units
		$scope.height = $scope.state.height; // strip PX units

		var originalOverlay = Overlays.getCurrentIndex();
		
		var igvjs_start = (($scope.settings.current.chromStart));
		if(igvjs_start<0) igvjs_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		//$scope.jbrowsedataurl = 'http://172.16.54.4/JBrowse/data';
		//$scope.jbrowsedataurl = $scope.view.settings.jbrowse_data+'_'+$scope.settings.current.speciesUrl;
		
		/*
		Configuration of igvjs object

		$scope.view.settings.species_data: configuration array containing the location of the reference genome. 
			It can be a file or url where the browser will fetch the data.
		$scope.view.settings.showNav: true/false whether to show the navigation panel in igvjs 
		$scope.view.settings.showCyto: true/false wheter to show cytoband panel in igvjs
		*/
		var igv_reference;
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].fastaURL) {
			igv_reference = {
				id: $scope.settings.current.speciesUrl,
				fastaURL:$scope.view.settings.species_data[$scope.settings.current.speciesUrl].fastaURL,
				cytobandURL:null
			};
			$scope.view.settings.showNav = true;
			if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].cytobandURL) {
				igv_reference.cytobandURL = $scope.view.settings.species_data[$scope.settings.current.speciesUrl].cytobandURL;
				$scope.view.settings.showCyto = false;
			} else {
				$scope.view.settings.showCyto = false;
			}
		} else {
			igv_reference = {
				id: $scope.settings.current.speciesUrl
			};
			$scope.view.settings.showNav = true;
		}
		var tracks = Users.getTracks();
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].genes) {
			tracks = tracks.concat($scope.view.settings.species_data[$scope.settings.current.speciesUrl].genes);
		}
		
		
		/* 
		div dom element where to include igvjs browser
		*/
		$scope.igvDiv = angular.element(document.querySelector('#igvDiv'))[0];
		/* 
		igvjs options. See igvjs docs for details
		*/
		$scope.igvOptions = {
		            showNavigation: $scope.view.settings.showNav,
		            showRuler: true,
		            showIdeogram: $scope.view.settings.showCyto,
		            flanking: 0,
		            reference: igv_reference,
					locus: chrom+':'+igvjs_start+'-'+($scope.settings.current.chromEnd),
					tracks: tracks
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
			$scope.hideTadkitMarkers();
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
		/* 
		Creation of igvjs javascript object
		*/
		$scope.myIgv = igv.createBrowser($scope.igvDiv, $scope.igvOptions);
		// Show center guide by default. The centerguide will be tadkit position in the 2D and 3D
		$scope.myIgv.centerGuide.$centerGuideToggle.click();
		
		/*
		Create div indicating selected tad in the browser.
		#tad-highlight-tadkit should be styled in the main css
		*/
		var d = angular.element("<div id=\"tad-highlight-tadkit\" style=\"width='0px;';display=none;\"></div>");
		var trackContainer = angular.element($scope.myIgv.trackContainerDiv);
		trackContainer.append(d);
		
		var dl = angular.element("<div id=\"trackbar-tadkit-left-mark\" style=\"display=none\"></div>");
		trackContainer.append(dl);
		var dr = angular.element("<div id=\"trackbar-tadkit-right-mark\" style=\"display=none\"></div>");
		trackContainer.append(dr);
		
		/*
		Main function moving and resizing the #tad-highlight-tadkit depending on the current tad
		*/
		$scope.updateTadkitTAD = function() {
        	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
        		var referenceFrame;
        		/* Look for the referenceFrame of the reference sequence.
        		referenceFrame contains:
        			start: the genomic position corresponding to the left border of the browser
        			bpPerPixel: corresponding base pairs per 1 pixel
        		*/
        		$scope.myIgv.genomicStateList.forEach(function (genomicState) {
            		var referenceFrame = genomicState.referenceFrame;
	        		// Compute left position and width of the #tad-highlight-tadkit
	        		if(typeof(referenceFrame) != 'undefined') {
		            	//trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
		            	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
		            	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
		            	
		            	var leftpos = Math.round((start_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
		                d.css("left",Math.floor(leftpos+50) + "px");
		                var rightpos = Math.round((end_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
		                d.css("width",Math.floor(rightpos-leftpos) + "px");
		                d.css("display","block");
	        		}
        		});
                
            } else {
            	//trackPane.style.backgroundColor = "";
            	d.css("width","0px");
            	d.css("display","none");
            	
            }
        };
        /*
        We override the zoom handlers of igvjs to update tadkit on zoom, otherwise
        2D panel does not get updated
        */
        $scope.updatePos = function() {
        	$scope.myIgv.genomicStateList.forEach(function (genomicState) {
        		$scope.myIgv.fireEvent('locuschange',[genomicState.referenceFrame,$scope.myIgv.config.locus]);
		    });

        };
        $scope.myIgv.zoomHandlers = {
                in: {
                    click: function (e) {
                    	$scope.updatePos();
                        $scope.myIgv.zoomIn();
                    }
                },
                out:{
                    click: function (e) {
                    	$scope.updatePos();
                        $scope.myIgv.zoomOut();
                    }
                }
            };
        /*
         markers_position gets updated when we click on the 2D panel with the genomic positions that are interacting in the
         clicked position.
         Listen for left and right markers positions and then move them to the genomic position in the browser.
         */
        $scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
			if ( newValue !== oldValue) {
				if ( newValue[0] === -1 || newValue[1] === -1) {
					$scope.hideTadkitMarkers();
	        	} else {
	        		$scope.updateTadkitMarkers(newValue);
	        	}
			}
		});
        $scope.hideTadkitMarkers = function() {
        	dr.css("display","none");
        	dl.css("display","none");
        };
        $scope.updateTadkitMarkers = function(markerspos) {
        	$scope.myIgv.genomicStateList.forEach(function (genomicState) {
        		var referenceFrame = genomicState.referenceFrame;
        		var leftpx = (markerspos[1]-referenceFrame.start)/referenceFrame.bpPerPixel; 
	        	dl.css("display","block");
	        	dl.css("left",Math.floor(leftpx+50) + "px");
	        	dl.css("position","absolute");
	        	
	        	var rightpx = (markerspos[0]-referenceFrame.start)/referenceFrame.bpPerPixel; 
	        	dr.css("display","block");
	        	dr.css("left",Math.floor(rightpx+50) + "px");
	        	dr.css("position","absolute");
        	});
        };
        /*
        igvjs developers expose an event when the browser changes locus.
        We profit from it to update tadkit position in the 2D and 3D panels
        */
        $scope.myIgv.on('locuschange', function (referenceFrame, label) {
				
			$scope.myIgv.genomicStateList.forEach(function (genomicState) {
	        	var referenceFrame = genomicState.referenceFrame;
	            var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);

	            // window center (base-pair units)
	            var centerBP = referenceFrame.start + referenceFrame.bpPerPixel * (viewportWidth/2);
	            var ps = (centerBP-referenceFrame.start);
	            /* 
	            We limit the left border of the browser so the center guide cannot go further
	            than the start of our chromatin model*/
	            if($scope.settings.current.chromStart>centerBP) {
					if($scope.settings.current.chromStart-ps<=0) {
						referenceFrame.start = 0;
					} else {
						referenceFrame.start = $scope.settings.current.chromStart-ps;
					}
				}
				/* 
				We limit the right border of the browser so the center guide cannot go further
	            than the end of our chromatin model.
				I haven't found other way than limiting artificially the length of the whole chromosome.
	            */
				var igv_chrom = $scope.myIgv.genome.getChromosome(referenceFrame.chrName);
				igv_chrom.bpLength = ($scope.settings.current.chromEnd+($scope.settings.current.chromEnd-referenceFrame.start));
				
				/*
				Finally inform tadkit about the center genomic position and the position in the screen
				of the left and right border of our model, so we can synchronize the 2D panel
				*/
				var px_start = ($scope.settings.current.chromStart-referenceFrame.start)/referenceFrame.bpPerPixel;
				var px_end = ($scope.settings.current.chromEnd-referenceFrame.start)/referenceFrame.bpPerPixel;
		
				$scope.updatePosition(centerBP, px_start+50 , px_end+50);
					
			});
			
		});
	}
})();