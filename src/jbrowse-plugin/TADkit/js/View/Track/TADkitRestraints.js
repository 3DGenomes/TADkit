define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/dom-construct',
    'JBrowse/Util',
    'dojo/query',
    'dojo/on',
    'dijit/registry',
    'JBrowse/View/Track/CanvasFeatures',    
],
function(
    declare,
    array,
    lang,
    domEvent,
    domConstruct,
    Util,
    query,
    on,
    registry,
    CanvasFeatureTrack
) {
    return declare(CanvasFeatureTrack, {
        constructor: function( args ) {
        	var track=this;
            this._createTadkitNavigation();
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            $scope.$watch('data.dimension', function(newPosition, oldPosition) {
                if ( newPosition !== oldPosition ) {
                    track._refreshTrack(track, newPosition, oldPosition);
                }
            });
        },
        _defaultConfig: function() {
            return Util.deepUpdate(
				lang.clone(this.inherited(arguments)),
				                {
				                    glyph: 'TADkit/View/FeatureGlyph/ArrowRestraint'
				                });
        },
        _refreshTrack: function(track, newPosition, oldPosition) {
            
        	if(track._mouseoverEvent) track._mouseoverEvent.remove();
            track._mouseoverEvent = null;
            if(track._mouseoutEvent) track._mouseoutEvent.remove();
            track._mouseoutEvent = null;
            //track.eventHandlers = null;
        	array.forEach(track.blocks, function(block,i) {
				if( !block || !block.fRectIndex || !block.featureCanvas) 
                    return;
				
                track.cleanupBlock(block);
                var ctx = block.featureCanvas.getContext('2d');
                ctx.clearRect(0, 0, block.featureCanvas.width, block.featureCanvas.height);
        	});
            track._clearLayout();
            array.forEach(track.blocks, function(block,i) {
				if( !block || !block.fRectIndex || !block.featureCanvas)
                    return;
                
                
                args = {
                    block: block, 
                    leftBase: block.startBase,
                    rightBase: block.endBase, 
                    scale: block.scale,
                    finishCallback: track._finish_callback
                }
                //l = track._getLayout(block.scale);
                domConstruct.destroy(block.featureCanvas);
                track.fillFeatures( args );
                
            });
            
        },
        _finish_callback: function() {
            // to do
        },
        _createTadkitNavigation: function() {
            if(parent.angular==undefined) return false;
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
                widget.updatePositioninTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        if(widget.dragging) {
                            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                            var tadkittrackbar = dojo.byId("trackbar-tadkit");
                            var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                            if($scope.settings.current.chromStart>Bp) {
                            	widget.dragEnd(event);
                            	$scope.updateTadkitBar($scope.settings.current.chromStart)
                            } else if($scope.settings.current.chromEnd<Bp) {
                            	widget.dragEnd(event);
                            	$scope.updateTadkitBar($scope.settings.current.chromEnd)
                            } else {
                            	$scope.updatePosition(Bp);
                            }
                        }
                    });
                };
                widget.clickmoveLeftTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                        $scope.updatePosition(Bp-(parseInt(widget.maxVisible())-parseInt(widget.minVisible())));
                    });
                };
                widget.clickmoveRightTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                        $scope.updatePosition(Bp+(parseInt(widget.maxVisible())-parseInt(widget.minVisible())));
                    });
                };
                //dojo.connect(widget.scaleTrackDiv,"onclick",widget,'clickscaleTrackTadkit');
                dojo.disconnect(widget.behaviorManager.behaviors.always.handles[6]);
                dojo.connect(widget.outerTrackContainer,"mousemove",widget,'updatePositioninTadkit');
                dojo.connect(dojo.byId("moveLeft"),"onclick",widget,'clickmoveLeftTadkit');
                dojo.connect(dojo.byId("moveRight"),"onclick",widget,'clickmoveRightTadkit');
                var toppos = '55';
                var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
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
                $scope.updatePosition(Bp);

                $scope.updateTadkitBar = function(x) {
                    c = widget.bpToPx(x);
                    leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                    d.style.left = Math.floor(leftpos) + "px";
                };
            };
        }
    });
});