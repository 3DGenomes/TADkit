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
    return declare(CanvasFeatureTrack, {
        constructor: function( args ) {
            var track=this;
            this._createTadkitNavigation();
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            $scope.$watch('settings.current.particle', function(newPosition, oldPosition) {
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
                //track.cleanupBlock(block);
                
                args = {
                    block: block, 
                    leftBase: block.startBase,
                    rightBase: block.endBase, 
                    scale: block.scale,
                    finishCallback: track._finish_callback
                }
                var ctx = block.featureCanvas.getContext('2d');
                ctx.clearRect(0, 0, block.featureCanvas.width, block.featureCanvas.height);
                //track._hideBlock(i);
                //track._hideBlock(i);
                var context = track.getRenderingContext( args );
                     
                var idx = block.fRectIndex.byID;
                for( var id in idx ) {
                     var fRect = idx[id];
                     var feature = track.layout.getByID(fRect.f.id());
                     
                     if(fRect.f.data.particle_from == newPosition || fRect.f.data.particle_to == newPosition) {
                         fRect.f.data.active = true;
                         feature.data.active = true;
                         fRect.rect.h = fRect.h = 10;
                         fRect.glyph.renderFeature(context, fRect);  	 
                     } else {
                         fRect.f.data.active = false;
                         feature.data.active = false;
                         fRect.rect.h = fRect.h = 0;
                         //fRect.glyph.renderFeature(context, fRect);
                     }
                }
                //track.renderClickMap( args, block.fRectIndex.getAll() );
                //track._attachMouseOverEvents();
                //track._connectEventHandlers( block );
                
            });
            if( track._mouseoverEvent ) {
                track._mouseoverEvent.remove();
                delete track._mouseoverEvent;
            }

            if( track._mouseoutEvent ) {
                track._mouseoutEvent.remove();
                delete track._mouseoutEvent;
            }
            array.forEach(track.blocks, function(block,i) {
                if( !block || !block.fRectIndex || !block.featureCanvas)
                    return;

                track.cleanupBlock(block);
                track._attachMouseOverEvents();
                track._connectEventHandlers( block );
                track.updateStaticElements( { x: track.browser.view.getX() } );
                
            });
            
        },
        _attachMouseOverEvents: function( ) {
            var gv = this.browser.view;
            var thisB = this;

            if( this.displayMode == 'collapsed' ) {
                if( this._mouseoverEvent ) {
                    this._mouseoverEvent.remove();
                    delete this._mouseoverEvent;
                }

                if( this._mouseoutEvent ) {
                    this._mouseoutEvent.remove();
                    delete this._mouseoutEvent;
                }
            } else {
                if( !this._mouseoverEvent ) {
                    this._mouseoverEvent = this.own( on( this.staticCanvas, 'mousemove', function( evt ) {
                        evt = domEvent.fix( evt );
                        var bpX = gv.absXtoBp( evt.clientX );
                        var feature = thisB.layout.getByCoord( bpX, ( evt.offsetY === undefined ? evt.layerY : evt.offsetY ) );
                        //if(feature && feature.data.active) thisB.mouseoverFeature( feature, evt );
                        thisB.mouseoverFeature( feature, evt );
                    }))[0];
                }

                if( !this._mouseoutEvent ) {
                    this._mouseoutEvent = this.own( on( this.staticCanvas, 'mouseout', function( evt) {
                        thisB.mouseoverFeature( undefined );
                    }))[0];
                }
            }
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