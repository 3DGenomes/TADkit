define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/event',
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
    Util,
    query,
    on,
    registry,
    CanvasFeatureTrack
) {

	var FRectIndex = declare( null,  {
	    constructor: function( args ) {
	        var height = args.h;
	        var width  = args.w;

	        this.dims = { h: height, w: width };

	        this.byID = {};
	    },

	    getByID: function( id ) {
	        return this.byID[id];
	    },

	    addAll: function( fRects ) {
	        var byID = this.byID;
	        var cW = this.dims.w;
	        var cH = this.dims.h;
	        array.forEach( fRects, function( fRect ) {
	            if( ! fRect )
	                return;

	            // by ID
	            byID[ fRect.f.id() ] = fRect;
	        }, this );
	    },

	    getAll: function( ) {
	        var fRects = [];
	        for( var id in this.byID ) {
	            fRects.push( this.byID[id] );
	        }
	        return fRects;
	    }
	});
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
            
        	array.forEach(track.blocks, function(block,i) {
				if( !block || !block.fRectIndex || !block.featureCanvas)
                    return;
                track.cleanupBlock(block);
                var ctx = block.featureCanvas.getContext('2d');
                ctx.clearRect(0, 0, block.featureCanvas.width, block.featureCanvas.height);
        	});
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
                //var ctx = block.featureCanvas.getContext('2d');
                //ctx.clearRect(0, 0, block.featureCanvas.width, block.featureCanvas.height);
                //track._hideBlock(i);
                //track._hideBlock(i);
                //var context = track.getRenderingContext( args );
                
                /*
                var fRects = [];
                fRects.push( null );
                var rectNumber = fRects.length-1;
                var idx = block.fRectIndex.byID;
                for( var id in idx ) {
                     var fRect = idx[id];
                     var feature = track.layout.getByID(fRect.f.id());
                     
                     if(fRect.f.data.particle_from == newPosition || fRect.f.data.particle_to == newPosition) {
                         feature.data.active = true;
                     } else {
                         feature.data.active = false;
                         //fRect.rect.h = fRect.h = 0;
                         //fRect.glyph.renderFeature(context, fRect);
                     }
                     var newfRect = fRect.glyph.layoutFeature(
	                        args,
	                        track.layout,
	                        feature
                     );
                     
                     if( newfRect === null ) {
                        // could not lay out, would exceed our configured maxHeight
                        // mark the block as exceeding the max height
                        block.maxHeightExceeded = true;
                     }
                     else {
                        // laid out successfully
                       fRects[rectNumber] = newfRect;
                       rectNumber++;
                       //fRect.glyph.renderFeature(context, fRect);
                     }
                                                 
                }*/
                track.fillFeatures( args );
                //track.renderFeatures( args, fRects );
                //track.renderClickMap( args, fRects );
                
                //track._attachMouseOverEvents();
                //track._connectEventHandlers( block );
                
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
                widget.clickscaleTrackTadkit = function(track, feature, featureDiv){
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
                };
                widget.updatePositioninTadkit = function(track, feature, featureDiv){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        if(widget.dragging) {
                            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                            var tadkittrackbar = dojo.byId("trackbar-tadkit");
                            var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                            $scope.updatePosition(Bp);  
                        }
                    });
                };
                widget.clickmoveLeftTadkit = function(track, feature, featureDiv){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                        $scope.updatePosition(Bp-(parseInt(widget.maxVisible())-parseInt(widget.minVisible())));
                    });
                };
                widget.clickmoveRightTadkit = function(track, feature, featureDiv){
                    require(["dojo/query","dijit/registry", "dojo/dom-style",], function(query, registry, domStyle){
                        var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                        var widget = registry.byId("dijit_layout_ContentPane_1").containerNode.view;
                        var tadkittrackbar = dojo.byId("trackbar-tadkit");
                        var Bp = Math.floor(widget.absXtoBp(parseInt(tadkittrackbar.style.left)));
                        $scope.updatePosition(Bp+(parseInt(widget.maxVisible())-parseInt(widget.minVisible())));
                    });
                };
                dojo.connect(widget.scaleTrackDiv,"onclick",widget,'clickscaleTrackTadkit');
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
                var d = dojo.create("div", {id: "trackbar-tadkit"}, "static_track");
                d.style.display = "block";
                d.style.left = Math.floor(leftpos) + "px";
                d.style.top = toppos + "px";
                var Bp = Math.floor(widget.absXtoBp(leftpos));
                $scope.updatePosition(Bp);
            };
        }
    });
});