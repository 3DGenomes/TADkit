define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dijit/registry',
    'dojo/when',
    'dojo/on',
    'JBrowse/Plugin'
],
function(
    declare,
    lang,
    query,
    registry,
    when,
    on,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function(args) {
            var browser = args.browser;
            this.tracksOverlaid = {};
            this.init = false;
            if( typeof(parent.angular) == 'undefined') {
            	console.log('TADkit plugin failed. No TADkit scope found');
            	return;
            }
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            if(!$scope) {
            	console.log('TADkit plugin failed. No TADkit scope found');
            	return;
            }
            console.log('TADkit Overlay plugin starting');
            browser.registerTrackType({
                label: 'TADkitRestraints',
                type: 'TADkit/View/Track/TADkitRestraints'
            });
            browser.registerTrackType({
                label: 'TADkitOverlay',
                type: 'TADkit/View/Track/TADkitOverlay'
            });
            var thisB = this;
            this.browser.afterMilestone('completely initialized', function() {
                this._createRestraintsTrack();
                this._createTadkitNavigation();    
                this._pullDownMenu();
                
                on(window, 'resize', function() {
                    thisB._pullDownMenu();
                    
                }); 
                
            }, this );

            //dojo.subscribe("/jbrowse/v1/n/tracks/visibleChanged",  lang.hitch( this, '_addOverlayMenuItem' ));
            dojo.subscribe('/jbrowse/v1/n/tracks/visibleChanged'
            		, function (visibleTrackNames) {
            			if(visibleTrackNames) {
                            thisB._addOverlayMenuItem(visibleTrackNames[0]);
                            if(!thisB.init) {
                            	thisB._initPosition();
                            	thisB._createTADHighlight();
                            	thisB.init = true;
                            }
                        }
            		});
            
            
        },
        _createRestraintsTrack: function() {

            var thisB = this;
            var storeConf = {
                browser: thisB.browser,
                type: 'TADkit/Store/SeqFeature/Restraints'
            };
            var storeName = thisB.browser.addStoreConfig( undefined, storeConf );
            storeConf.name = storeName;
            var restraintsTrackConfig = {
                type: 'TADkit/View/Track/TADkitRestraints',
                label: 'Restraints',
                key: "restraints",
                style: {
                	color : "blue",
                    showLabels : false
                },
                onClick : {
                    content : function(track,feature,div) { return '<p><b>Value:'+feature.get('score')+'</b></p>';},
                    action : "contentDialog"
                 },
                store: storeName
            };

            // send out a message about how the user wants to create the new track
            thisB.browser.publish( '/jbrowse/v1/v/tracks/new', [restraintsTrackConfig] );
               
        },
        _initPosition: function() {
        	
        	var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
        	var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
        	var chrom = ($scope.settings.current.chrom);
    		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
        	widget.setLocation(chrom,$scope.settings.current.chromStart,$scope.settings.current.chromEnd)
        	$scope.updateTadkitBar($scope.settings.current.position);
        	c = widget.bpToPx($scope.settings.current.chromStart);
        	leftborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
        	c = widget.bpToPx($scope.settings.current.chromEnd);
        	rightborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
        	$scope.updatePosition($scope.settings.current.position,leftborder, rightborder);
        },
        _createTadkitNavigation: function() {
            if(parent.angular==undefined) return false;
            var thisB = this;
            var tadkittrackbar = query("#trackbar-tadkit", "static_track");
            var trackbar = query(".trackVerticalPositionIndicatorMain", "static_track");
            if (tadkittrackbar.length == 0) {
                var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                
                /*widget.clickscaleTrackTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var c = track.clientX + 2;
                        tadkittrackbar.style.display = "block";
                        tadkittrackbar.style.left = Math.floor(c) + "px";
                        var Bp = Math.floor(widget.absXtoBp(c));
                        $scope.updatePosition(Bp);
                    });
                };*/
                updatePosition = function(event){
                    var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                    var tadkittrackbar = dojo.byId("trackbar-tadkit");
                    var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                    var left_right = $scope.settings.current.rightborder-$scope.settings.current.leftborder;
                    if($scope.settings.current.chromStart>Bp) {
                        if(widget.dragging) widget.dragEnd(event);
                        widget.centerAtBase($scope.settings.current.chromStart,true);
                        thisB._addOverlayMenuItem();
                        $scope.updateTadkitBar($scope.settings.current.chromStart);
                        leftborder = parseInt(tadkittrackbar.style.left);
                        rightborder = leftborder+left_right;
                        $scope.updatePosition($scope.settings.current.chromStart, leftborder, rightborder);
                        $scope.updateTadkitTAD();

                    } else if($scope.settings.current.chromEnd<Bp) {
                        if(widget.dragging) widget.dragEnd(event);
                        widget.centerAtBase($scope.settings.current.chromEnd,true);
                        thisB._addOverlayMenuItem();
                        $scope.updateTadkitBar($scope.settings.current.chromEnd);
                        rightborder = parseInt(tadkittrackbar.style.left);
                        leftborder = rightborder-left_right;
                        $scope.updatePosition(Bp, leftborder, rightborder);    
                        $scope.updateTadkitTAD();
                        
                    } else {
                        c = widget.bpToPx($scope.settings.current.chromStart);
                        leftborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                        c = widget.bpToPx($scope.settings.current.chromEnd);
                        rightborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                        $scope.updatePosition(Bp, leftborder, rightborder);
                        $scope.updateTadkitTAD();
                    }
                    
                        
                };
                widget.updatePositioninTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                    	
                    	if(widget.dragging) {
	                        updatePosition(event);
                    	}
                        
                    });
                };
                
                widget.clickmoveLeftTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var timer = setInterval(function () {
                           if(!widget.animation) {
                                
                                updatePosition(event);
                                clearInterval(timer);
                           }
                        }, 1000);
                    });
                };
                widget.clickmoveRightTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                    	var timer = setInterval(function () {
                           if(!widget.animation) {
                                
                                updatePosition(event);
                                clearInterval(timer);
                           }
                        }, 1000);
                    });
                };
                widget.updateTadkitonZoom = function(event){
                	require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                		var timer = setInterval(function () {
                           if(!widget.animation) {
                                
                                updatePosition(event);
                                thisB._addOverlayMenuItem();
                                clearInterval(timer);
                           }
                        }, 1000);

                        //});
                		
                	});
                };
                //dojo.connect(widget.scaleTrackDiv,"onclick",widget,'clickscaleTrackTadkit');
                dojo.disconnect(widget.behaviorManager.behaviors.always.handles[6]);
                dojo.connect(widget.outerTrackContainer,"mousemove",widget,'updatePositioninTadkit');
                dojo.connect(dojo.byId("moveLeft"),"onclick",widget,'clickmoveLeftTadkit');
                dojo.connect(dojo.byId("moveRight"),"onclick",widget,'clickmoveRightTadkit');
                dojo.connect(dojo.byId("bigZoomIn"),"onclick",widget,'updateTadkitonZoom');
                dojo.connect(dojo.byId("zoomIn"),"onclick",widget,'updateTadkitonZoom');
                dojo.connect(dojo.byId("bigZoomOut"),"onclick",widget,'updateTadkitonZoom');
                dojo.connect(dojo.byId("zoomOut"),"onclick",widget,'updateTadkitonZoom');
                dojo.connect( widget.outerTrackContainer, "dblclick",       widget, 'updateTadkitonZoom'    );
                var toppos = '0';
                var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                //widget.centerAtBase($scope.settings.current.position,true);
                var c = widget.bpToPx($scope.settings.current.position);
                var leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                if (Math.floor(leftpos) < 0) {
                    leftpos = widget.getWidth()/2;
                };
                
                var dr = dojo.create("div", {id: "trackbar-tadkit-right-mark"}, "zoomContainer");
                dr.style.display = "none";
                dr.style.left = "0px";
                dr.style.top = toppos + "px";
                
                var dl = dojo.create("div", {id: "trackbar-tadkit-left-mark"}, "zoomContainer");
                dl.style.display = "none";
                dl.style.left = "0px";
                dl.style.top = toppos + "px";
                
                $scope.hideTadkitMarkers = function() {
                	dl.style.display = "none";
                	dr.style.display = "none";
                };
                $scope.updateTadkitMarkers = function(x,y) {
                	c = widget.bpToPx(y);
                    leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                	dl.style.left = Math.floor(leftpos) + "px";
                	
                	c = widget.bpToPx(x);
                    leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                	dr.style.left = Math.floor(leftpos) + "px";
                	
                	dl.style.display = "block";
                	dr.style.display = "block";
                };
                
                //var d = dojo.create("div", {id: "trackbar-tadkit"}, "static_track");
                var d = dojo.create("div", {id: "trackbar-tadkit"}, "zoomContainer");            
                d.style.display = "block";
                d.style.left = Math.floor(leftpos) + "px";
                d.style.top = toppos + "px";
                var Bp = Math.floor(widget.absXtoBp(leftpos));

                $scope.updateTadkitBar = function(x) {
                    c = widget.bpToPx(x);
                    leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                    d.style.left = Math.floor(leftpos) + "px";
                };
            };
        },
        _createTADHighlight: function() {
        	var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            var trackPane = dojo.byId("dijit_layout_ContentPane_1");
            var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
            var d = dojo.create("div", {id: "tad-highlight-tadkit"}, "gridtrack");            
            //d.style.display = "block";
            //d.style.height = "100%";
            //d.style.position = "fixed";
            //d.style.backgroundColor = "white";
            d.style.width = "0px";
            $scope.updateTadkitTAD = function() {
            	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
            		
                	trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
                	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
                	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
                	
                	var c = widget.bpToPx(start_tad);
                    var leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                    d.style.left = Math.floor(leftpos) + "px";
                    c = widget.bpToPx(end_tad);
                    var rightpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                    d.style.width = Math.floor(rightpos-leftpos) + "px";
                    
                } else {
                	trackPane.style.backgroundColor = "";
                	d.style.width = "0px";
                	
                }
            };
            $scope.updateTadkitTAD();
            
        },
        _updateTADHighlight: function() {
        	var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            var trackPane = dojo.byId("dijit_layout_ContentPane_1");
            var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
            
        	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
        		
            	trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
            	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
            	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
            	
            	var c = widget.bpToPx(start_tad);
                var leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                d.style.left = Math.floor(leftpos) + "px";
                c = widget.bpToPx(end_tad);
                var rightpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                d.style.width = Math.floor(rightpos-leftpos) + "px";
                
            } else {
            	trackPane.style.backgroundColor = "";
            	
            	
            }
        },
        _pullDownMenu: function() {
            var topPane = dojo.byId("dijit_layout_ContentPane_0");
            var trackPane = dojo.byId("dijit_layout_ContentPane_1");
            topPane.children[0].style.height = "0px";
            topPane.children[0].style.display = "None";
            //topPane.style.top = (parseInt(this.browser.container.clientHeight)-parseInt(topPane.clientHeight))+"px";
            trackPane.style.top = "33px";
        },
        _addOverlayMenuItem: function( visibleTrackNames ) {
        	
        	var thisB = this;
        	
        	var applyOverlay = function(track_label) {
                var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                var track = thisB.browser.view.tracks[thisB.browser.view.trackIndices[track_label]];
                
                if(!thisB.tracksOverlaid[track_label]) {
                	var region = { ref: track.refSeq.name,
	                   start: $scope.settings.current.chromStart,
	                   end: $scope.settings.current.chromEnd
	                 };
	                var feat = [];
	                // This has to be further developed to overlay histograms, but I don't have time now
	                //for(var key in track.blocks) break;
	                //var showFeatures = track.blocks[key].scale >= (track.config.style.featureScale || 0 / track.config.maxFeatureScreenDensity );
	                
	                var showFeatures = true;
	                if(showFeatures) {
	                	for(var key in thisB.tracksOverlaid) {
	                		if(thisB.tracksOverlaid[key] && key != track_label) {
	                			var other_track = thisB.browser.view.tracks[thisB.browser.view.trackIndices[key]];
	                			var menuIt = other_track.trackMenu.getChildren();
	                			for(var key_menu in menuIt) {
	                				if(menuIt[key_menu].title == 'Apply to 3D') {
	                					menuIt[key_menu].set('checked',false);
	                					other_track.config.applied3D = false;
	                					thisB.tracksOverlaid[key]=false;
	                				}
	                			}
	                			break;
	                		}
	                		
	                	}
		                track.store.getFeatures( region,
		                                        function( feature ) {
		                							if(typeof feature.get('color') == 'undefined' && typeof feature.get('score') == 'undefined') {
		                								return;
		                							}
		                                            feat.push(feature);
		                                        },
		                                        // callback when all features sent
		                                        function () {
		                                            $scope.applyOverlay(track_label,feat);
		                                        });
		                thisB.tracksOverlaid[track_label] = true;
		                track.config.applied3D = true;
	                }
                } else {
                	$scope.removeOverlay(track_label);
                	thisB.tracksOverlaid[track_label] = false;
                	track.config.applied3D = false;
                }
                
            };
            
            
            if(!visibleTrackNames) {
            	var visibleTrackNames = [];
            	for(var key in thisB.browser.view.trackIndices) visibleTrackNames.push(key);
            	
            } else {
            	for(var key in thisB.tracksOverlaid) {
            		if(visibleTrackNames.indexOf(key)<0) {
            			var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        $scope.removeOverlay(key);
            			delete thisB.tracksOverlaid[key];
            		}
                }
            }
            	
            dojo.forEach( visibleTrackNames, function(conf) {
            	
            	//var trackConf = this.browser.trackConfigsByName[conf];
            	var track = thisB.browser.view.tracks[thisB.browser.view.trackIndices[conf]];
            	var trackConf = track.config;
            	var color_val = false;
            	
            	if (trackConf.type == 'JBrowse/View/Track/CanvasFeatures' || trackConf.type == 'JBrowse/View/Track/Wiggle/Density' ||
            			conf in this.tracksOverlaid)
            	color_val = true;
            	
            	if(color_val) {
            		
            		if(!(trackConf.label in this.tracksOverlaid)) {
            			this.tracksOverlaid[trackConf.label] = false;
            			track.config.applied3D = false;
            		}
            		
	                apply3dopt = [
	                   { type: 'dijit/MenuSeparator' },
	                   {
	                    "label": "Apply to 3D",
	                    "action":function(clickEvent) { applyOverlay(trackConf.label); },
	                    "type": 'dijit/CheckedMenuItem',
	                    "title": "Apply to 3D",
	                    "checked": !! track.config.applied3D
	                   }];
            		
            		when( track._trackMenuOptions() )
                    .then( function( options ) {
                    	options.push.apply(options,apply3dopt);
                        if( options && options.length && track.label && track.labelMenuButton ) {

                            // remove our old track menu if we have one
                            if( track.trackMenu )
                            	track.trackMenu.destroyRecursive();

                            // render and bind our track menu
                            var menu = track._renderContextMenu( options, { menuButton: track.labelMenuButton, track: track, browser: track.browser, refSeq: track.refSeq } );
                            menu.startup();
                            menu.set('leftClickToOpen', true );
                            menu.bindDomNode( track.labelMenuButton );
                            menu.set('leftClickToOpen',  false);
                            menu.bindDomNode( track.label );
                            track.trackMenu = menu;
                            track.own( track.trackMenu );
                        }
                      });
	                
            	}
            },this);

        },
    });
});