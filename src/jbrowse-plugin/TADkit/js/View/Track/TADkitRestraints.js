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
                    	
                    	if(widget.dragging) {
	                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
	                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
	                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
	                        if($scope.settings.current.chromStart>Bp) {
	                        	widget.dragEnd(event);
	                        	$scope.updateTadkitBar($scope.settings.current.chromStart);
	                        } else if($scope.settings.current.chromEnd<Bp) {
	                        	widget.dragEnd(event);
	                        	$scope.updateTadkitBar($scope.settings.current.chromEnd);
	                        } else {
	                        	c = widget.bpToPx($scope.settings.current.chromStart);
	                            leftborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
	                            c = widget.bpToPx($scope.settings.current.chromEnd);
	                            rightborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
	                        	$scope.updatePosition(Bp, leftborder, rightborder);
	                        }
                    	}
                        
                    });
                };
                widget.clickmoveLeftTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        //var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var dist = 0.9 * widget.getWidth();
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)-dist));
                        var left_right = $scope.settings.current.rightborder-$scope.settings.current.leftborder;
                        
                        if($scope.settings.current.chromStart>Bp) {
                        	widget.centerAtBase($scope.settings.current.chromStart);
                        	leftborder = parseInt(tadkittrackbar.style.left);
                        	rightborder = leftborder+left_right;
                        } else if($scope.settings.current.chromEnd<Bp) {
                        	widget.centerAtBase($scope.settings.current.chromEnd);
                        	rightborder = parseInt(tadkittrackbar.style.left);
                        	leftborder = rightborder-left_right;
                        } else {
                        	leftborder = $scope.settings.current.leftborder+dist;
                        	rightborder = $scope.settings.current.rightborder+dist;
                        	
                        }
                        $scope.updatePosition(Bp,leftborder, rightborder);
                        
                    });
                };
                widget.clickmoveRightTadkit = function(event){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                    	var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        //var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var dist = 0.9 * widget.getWidth();
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)+dist));
                        var left_right = $scope.settings.current.rightborder-$scope.settings.current.leftborder;
                        
                        if($scope.settings.current.chromStart>Bp) {
                        	widget.centerAtBase($scope.settings.current.chromStart);
                        	leftborder = parseInt(tadkittrackbar.style.left);
                        	rightborder = leftborder+left_right;
                        } else if($scope.settings.current.chromEnd<Bp) {
                        	widget.centerAtBase($scope.settings.current.chromEnd);
                        	rightborder = parseInt(tadkittrackbar.style.left);
                        	leftborder = rightborder-left_right;
                        } else {
                        	leftborder = $scope.settings.current.leftborder-dist;
                        	rightborder = $scope.settings.current.rightborder-dist;
                        	
                        }
                        $scope.updatePosition(Bp,leftborder, rightborder);
                    });
                };
                widget.updateTadkitonZoom = function(event){
                	require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                		var oldZoom = -1; 
                		if(event.currentTarget.id=='zoomIn') oldZoom = widget.curZoom - 1;
                		if(event.currentTarget.id=='bigZoomIn') oldZoom = widget.curZoom - 2;
                		if(event.currentTarget.id=='zoomOut') oldZoom = widget.curZoom + 1;
                		if(event.currentTarget.id=='bigZoomOut') oldZoom = widget.curZoom + 2;
                		if(event.type == 'dblclick') oldZoom = widget.curZoom - 2;
                		if(oldZoom < 0) return;
                		if( oldZoom < widget.zoomLevels.length && oldZoom >= 0) {
                			var tadkittrackbar = dojo.byId("trackbar-tadkit");
                            
                			var new_scale = widget.zoomLevels[widget.curZoom]/widget.zoomLevels[oldZoom];
                			leftborder = parseInt(tadkittrackbar.style.left)-(parseInt(tadkittrackbar.style.left) - $scope.settings.current.leftborder)*new_scale;
                        	rightborder = parseInt(tadkittrackbar.style.left)+($scope.settings.current.rightborder-parseInt(tadkittrackbar.style.left))*new_scale;
                			$scope.updatePosition($scope.settings.current.position, leftborder, rightborder);
                        	
                		}
                		
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
                
                c = widget.bpToPx($scope.settings.current.chromStart);
                leftborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                c = widget.bpToPx($scope.settings.current.chromEnd);
                rightborder = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                
                $scope.updatePosition(Bp,leftborder, rightborder);

                $scope.updateTadkitBar = function(x) {
                    c = widget.bpToPx(x);
                    leftpos = c-widget.getPosition().x-widget.offset+dojo.position(widget.elem, !0).x;
                    d.style.left = Math.floor(leftpos) + "px";
                };
            };
        }
    });
});