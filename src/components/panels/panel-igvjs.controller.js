(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelIgvjsController', PanelIgvjsController);

	function PanelIgvjsController($scope, $window, $timeout, Overlays,Storyboards, uuid4, Track_data, d3Service, Users) {

		if(angular.isUndefined($scope.settings.current.speciesUrl)) return;

		var scene_component = Storyboards.getComponentById('Chromatin');
		var scene_width = 0;
		if(typeof scene_component !== 'undefined') {
			scene_width = parseInt(scene_component.object.state.width);
		}
		$scope.width = $scope.state.width = $window.innerWidth - scene_width - 50 - 2*parseInt($scope.state.margin);
		$scope.height = $scope.state.height =  parseInt($scope.state.height)-2*parseInt($scope.state.margin); // strip PX units
		
		//$scope.width = $scope.state.width; // strip PX units
		//$scope.height = $scope.state.height; // strip PX units
		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = $window.innerWidth - newValue - 50 - 2*parseInt($scope.state.margin);
				$scope.myIgv.repaint();
//		  		$scope.myIgv.genomicStateList.forEach(function (genomicState) {
//            		$scope.myIgv.updateWithLocusIndex( genomicState );
//        		});
			}
		});

		var w = angular.element($window);
		$scope.$watch(
		  function () {
		    return $window.innerWidth;
		  },
		  function (value) {
		    $scope.width = $scope.state.width = value - scene_width - 50 - 2*parseInt($scope.state.margin);
		  	//$scope.$apply();
		  },
		  true
		);
		
		var originalOverlay = Overlays.getCurrentIndex();
		var track_data = Track_data.get();
		
		var igvjs_start = (($scope.settings.current.chromStart));
		if(igvjs_start<0) igvjs_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		
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
				id: $scope.view.settings.species_data[$scope.settings.current.speciesUrl].id,
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
		$scope.tracks = Users.getTracks();
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl].tracks) {
			$scope.tracks = $scope.tracks.concat($scope.view.settings.species_data[$scope.settings.current.speciesUrl].tracks);
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
		            showKaryo: $scope.view.settings.showCyto,
		            flanking: 100000,
		            reference: igv_reference,
					locus: chrom+':'+igvjs_start+'-'+($scope.settings.current.chromEnd),
					tracks: $scope.tracks.slice()
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
			
			$timeout(function() {$scope.$apply();});
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
			
			var igvJsOverlay =
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
									"source" : "igvJs track",
									"url" : "local",
									"description" : "igvJs track overlay", 
									"type" : "igvJs",
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
				igvJsOverlay.colors.chromatin[k] = "gray";
			}

			var featureColor = [];
			var scored_color = false;
			var motifcolor;
			var feature;
			var nbrmotif;
			var tmpfeature = [];
			angular.forEach(features, function(feature) {
				if(typeof feature.color == 'undefined') {
					if(typeof feature.score !== 'undefined') featureColor.push(feature.score);
					if(typeof feature.value !== 'undefined') featureColor.push(feature.value);
					scored_color = true;
				} else {
					featureColor.push(feature.color);
				}
			});
			if(scored_color) {
				var hexEnd = '#0000ff';
				var hexStart = '#ffffff';
				var first_start = 0;
				var n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					nbrmotif = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						nbrmotif++;
						n++;
					}
					tmpfeature.push(motifcolor);
				}
				max_val = Math.max.apply(Math, tmpfeature);
				min_val = Math.min.apply(Math, tmpfeature);
				
				n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						n++;
					}
					featureColor[l] = d3.interpolateHcl(hexStart, hexEnd)((motifcolor-min_val)/(max_val-min_val));
					j = Math.round((first_start - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
					for(k=j;k<(j+Math.round(totallength)) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				}
			} else {
				angular.forEach(features, function(feature) {
					j = Math.round((feature.start - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
					totallength = Math.round((feature.end - feature.start)/$scope.settings.current.segmentLength);
					for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				});
			}
			var newOverlay = Overlays.addDirect(igvJsOverlay);
			var overlay = overlays.loaded[newOverlay];
			
			overlay.colors.particles = [];
			//overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, $scope.settings.current.edgesCount);
			//overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, $scope.settings.current.edgesCount);
			overlay.colors.network.RGB = [];
			overlay.colors.network.alpha = [];
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
		
		// Disable search input
		//$scope.myIgv.$searchInput.off('change');
        
		// Hide search icon
		//var search_icon = angular.element(document.querySelector('.igv-fa-search'))[0];
		var search_icon = angular.element(document.querySelector('.igv-search-container'))[0];
		$(search_icon).hide();
		// Show center guide by default. The centerguide will be tadkit position in the 2D and 3D
		$scope.myIgv.centerGuide.$centerGuideToggle.click();
		
		/* 
		 Remove Karyo panel. With the igv config is not working very well with firefox
		 So we do it the hard way
		 *  */
		//$scope.myIgv.karyoPanel.$karyoPanelToggle.hide();
		var karyo = angular.element(document.querySelector('.igv-ideogram-content-div'))[0];
        karyo.remove();
        $scope.myIgv.karyoPanel = null;
        
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
    			referenceFrame = $scope.myIgv.referenceFrame;
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
        		
                
            } else {
            	//trackPane.style.backgroundColor = "";
            	d.css("width","0px");
            	d.css("display","none");
            	
            }
        };

        $scope.myIgv.zoomHandlers = {
                in: {
                    click: function (e) {
                        $scope.myIgv.zoomIn();
                    }
                },
                out:{
                    click: function (e) {
                        $scope.myIgv.zoomOut();
                    }
                }
            };
        
        $scope.$watch('settings.current.hic_position', function(newPos, oldPos) {
            if(!angular.equals(newPos, oldPos) && newPos != $scope.settings.current.position) {
            	$scope.myIgv.goto(($scope.settings.current.chrom),newPos);
            }    
        });            
        
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
        	var referenceFrame = $scope.myIgv.referenceFrame;
    		var leftpx = (markerspos[1]-referenceFrame.start)/referenceFrame.bpPerPixel; 
        	dl.css("display","block");
        	dl.css("left",Math.floor(leftpx+50) + "px");
        	dl.css("position","absolute");
        	
        	var rightpx = (markerspos[0]-referenceFrame.start)/referenceFrame.bpPerPixel; 
        	dr.css("display","block");
        	dr.css("left",Math.floor(rightpx+50) + "px");
        	dr.css("position","absolute");
        };

        $scope.getFeatures = function(track_name, track_i) {
        	$scope.myIgv.trackViews.forEach(function (tV) {
		  		if(tV.track.name == track_name) {
					var referenceFrame = tV.browser.referenceFrame;
	               	// get features and add them in Track_data
	               	tV.track.getFeatures(referenceFrame.chr, $scope.settings.current.chromStart, $scope.settings.current.chromEnd, referenceFrame.bpPerPixel).then(function (features) {
	                	if (features) {
	                       	track_data[track_i].feature = track_data[track_i].feature.concat(features);
	                    }
	               	}).catch(function (error) {
	                    if (error instanceof igv.AbortLoad) {
	                    	console.log("Aborted ---");
	                    } else {
	                        igv.presentAlert(error);
	                    }
	                });
				}
        	});
        };
        /*
        igvjs developers expose an event when the browser changes locus.
        We profit from it to update tadkit position in the 2D and 3D panels
        */
        $scope.myIgv.on('locuschange', function (refFrame, label) {
        	

        	$scope.myIgv.trackViews.forEach(function (tV) {
        		if(tV.track.id != 'ruler' && tV.track.id != 'sequence') {
        			var found = false;
        			for(var i=0;i<track_data.length;i++) {
        				if(track_data[i].track_name == tV.track.name) found=true;
        			}
        			if(!found) {
        				var tdata = {
							track_name: tV.track.name,
							pos: [],
							feature: []
						};
						track_data.push(tdata);
        				$scope.getFeatures(tV.track.name,track_data.length-1);
        			}
        		}
        	});

        	var referenceFrame = $scope.myIgv.referenceFrame;
            //var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
        	var viewportWidth = $scope.myIgv.trackViewportWidth();

            // window center (base-pair units)
            var centerBP = referenceFrame.start + referenceFrame.bpPerPixel * (viewportWidth/2);
            var ps = (centerBP-referenceFrame.start);
            /* 
            We limit the left border of the browser so the center guide cannot go further
            than the start of our chromatin model*/
            if($scope.settings.current.chromStart>centerBP) {
				if($scope.settings.current.chromStart-ps<=0) {
					//referenceFrame.start = 0;
					referenceFrame.start = $scope.settings.current.chromStart-ps;
				} else {
					referenceFrame.start = $scope.settings.current.chromStart-ps;
				}
			}
			/* 
			We limit the right border of the browser so the center guide cannot go further
            than the end of our chromatin model.
			I haven't found other way than limiting artificially the length of the whole chromosome.
            */
			var igv_chrom = $scope.myIgv.genome.getChromosome(referenceFrame.chr);
			igv_chrom.bpLength = ($scope.settings.current.chromEnd+($scope.settings.current.chromEnd-referenceFrame.start));
			
			/*
			Finally inform tadkit about the center genomic position and the position in the screen
			of the left and right border of our model, so we can synchronize the 2D panel
			*/
			var px_start = ($scope.settings.current.chromStart-referenceFrame.start)/referenceFrame.bpPerPixel;
			var px_end = ($scope.settings.current.chromEnd-referenceFrame.start)/referenceFrame.bpPerPixel;
			
			$scope.updatePosition(centerBP, px_start+50 , px_end+50);
					
			
			
		});
        
        // List to store the status of the overlayed tracks
        $scope.tracksOverlaid = {};
        
        /* 
        This is a nasty override. Currently there is no way to inject a menu item in track menus.
        Therefore we override igv.trackMenuItemList to include a new item to overlay the track.
        It should be updated if it changes in new releases of igvjs.
        The injected code is properly marked. 
        */
        igv.trackMenuItems = function (popover, trackView) {

            var menuItems = [],
                trackItems;

            menuItems.push(igv.dialogMenuItem(
                popover,
                trackView,
                "Set track name",
                function () {
                    return "Track Name";
                },
                trackView.track.name,
                function () {

                    var alphanumeric = parseAlphanumeric(igv.dialog.$dialogInput.val());

                    if (undefined !== alphanumeric) {
                        igv.setTrackLabel(trackView.track, alphanumeric);
                        trackView.update();
                    }

                    function parseAlphanumeric(value) {

                        var alphanumeric_re = /(?=.*[a-zA-Z].*)([a-zA-Z0-9 ]+)/,
                            alphanumeric = alphanumeric_re.exec(value);

                        return (null !== alphanumeric) ? alphanumeric[0] : "untitled";
                    }

                }, undefined));

            menuItems.push(igv.dialogMenuItem(
                popover,
                trackView,
                "Set track height",
                function () {
                    return "Track Height";
                },
                trackView.trackDiv.clientHeight,
                function () {

                    var number = parseFloat(igv.dialog.$dialogInput.val(), 10);

                    if (undefined !== number) {
                        // If explicitly setting the height adust min or max, if neccessary.
                        if (trackView.track.minHeight !== undefined && trackView.track.minHeight > number) {
                            trackView.track.minHeight = number;
                        }
                        if (trackView.track.maxHeight !== undefined && trackView.track.maxHeight < number) {
                            trackView.track.minHeight = number;
                        }
                        trackView.setTrackHeight(number);
                        trackView.track.autoHeight = false;   // Explicitly setting track height turns off autoHeight

                    }

                }, undefined));

            if (trackView.track.popupMenuItems) {

                trackItems = trackView.track.popupMenuItems(popover);

                if (trackItems && trackItems.length > 0) {

                    trackItems.forEach(function (trackItem, i) {

                        var str;

                        if (trackItem.name) {

                            str = (0 === i) ? '<div class=\"igv-track-menu-item igv-track-menu-border-top\">' : '<div class=\"igv-track-menu-item\">';
                            str = str + trackItem.name + '</div>';

                            menuItems.push({object: $(str), click: trackItem.click, init: trackItem.init});
                        } else {

                            if (0 === i) {
                                trackItem.object.addClass("igv-track-menu-border-top");
                                menuItems.push(trackItem);
                            }
                            else {
                                menuItems.push(trackItem);
                            }

                        }

                    });
                }
            }
            
            /*
            Start of injected code
            */
           // Init tracksOverlaid to false
           if (typeof $scope.tracksOverlaid[trackView.track.id] === "undefined") {
           	$scope.tracksOverlaid[trackView.track.id] = false;
           }
           // Creation of the DOM element of the menu item
           var apply3D, $e;

           apply3D = '<div class="igv-track-menu-item igv-track-menu-border-top">';
           if (false === $scope.tracksOverlaid[trackView.track.id]) {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim fa-check-hidden"></i>Apply to 3D</div>';
           } else {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim"></i>Apply to 3D</div>';
           }
           
           // Handler function when clicking the menu item
           var clickHandler = function(){
               if($scope.tracksOverlaid[trackView.track.id]) {
               	$scope.removeOverlay(trackView.track.id);
               	$scope.tracksOverlaid[trackView.track.id] = false;
               } else {
               	var referenceFrame = trackView.browser.referenceFrame;
               	// get features and pass them for overlay
               	trackView.track.getFeatures(referenceFrame.chr, $scope.settings.current.chromStart, $scope.settings.current.chromEnd, referenceFrame.bpPerPixel).then(function (features) {
                       if (features) {
                       	$scope.applyOverlay(trackView.track.id,features);
                       }
               	}).catch(function (error) {
                       if (error instanceof igv.AbortLoad) {
                           console.log("Aborted ---");
                       } else {
                           igv.presentAlert(error);
                       }
                   });
               	$scope.tracksOverlaid[trackView.track.id] = true;
           	}
               // Hide menu
               popover.hide();
           };

           $e = $(apply3D);
           $e.click(clickHandler);

           // Add the new menu item to the track menu
           menuItems = menuItems.concat({ object: $e, init: undefined });
           /*
            End of injected code
            */

            if (trackView.track.removable !== false) {

                menuItems.push(
                    igv.dialogMenuItem(
                        popover,
                        trackView,
                        "Remove track",
                        function () {
                            var label = "Remove " + trackView.track.name;
                            return '<div class="igv-dialog-label-centered">' + label + '</div>';
                        },
                        undefined,
                        function () {
                            popover.hide();
                            trackView.browser.removeTrack(trackView.track);
                        },
                        true)
                );

            }

            return menuItems;

        };
        

        
                
	}
})();