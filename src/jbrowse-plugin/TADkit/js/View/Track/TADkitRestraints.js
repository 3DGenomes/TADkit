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
                        track._refreshTrack(track, newPosition);
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
        _refreshTrack: function(track, newPosition) {
        	var context;
            array.forEach(this.blocks, function(block,i) {
            				if( !block || !block.fRectIndex || !block.featureCanvas)
                                return;
                            args = {
                                block: block, 
                                leftBase: block.startBase,
                                rightBase: block.endBase, 
                                scale: block.scale,
                                finishCallback: track._finish_callback
                            }
                            var ctx = block.featureCanvas.getContext('2d');
                            ctx.clearRect(0, 0, block.featureCanvas.width, block.featureCanvas.height);
                            var context = track.getRenderingContext( args );
                            var idx = block.fRectIndex.byID;
                            for( var id in idx ) {
                                 var fRect = idx[id];
                                 if(fRect.f.data.particle_from == newPosition || fRect.f.data.particle_to == newPosition) {
                                	 fRect.f.data.active = true;
                                	 fRect.glyph.renderFeature(context, fRect);  	 
                                 } else {
                                	 fRect.f.data.active = false;
                                 }
                            }
                            
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
        mouseoverFeature: function( feature, evt ) {

            if( this.lastMouseover == feature )
                return;

            if( evt )
                var bpX = this.browser.view.absXtoBp( evt.clientX );

            if( this.labelTooltip)
                this.labelTooltip.style.display = 'none';

            array.forEach( this.blocks, function( block, i ) {
                if( ! block )
                    return;
                var context = this.getRenderingContext({ block: block, leftBase: block.startBase, scale: block.scale });
                if( ! context )
                    return;

                if( this.lastMouseover && block.fRectIndex ) {
                    var r = block.fRectIndex.getByID( this.lastMouseover.id() );
                    //if( r )
                    //    this.renderFeature( context, r );
                }

                if( block.tooltipTimeout )
                    window.clearTimeout( block.tooltipTimeout );

                if( feature ) {
                    var fRect = block.fRectIndex && block.fRectIndex.getByID( feature.id() );
                    if( ! fRect )
                        return;

                    if( block.containsBp( bpX ) ) {
                        var renderTooltip = dojo.hitch( this, function() {
                            if( !this.labelTooltip )
                                return;
                            var label = fRect.label || fRect.glyph.makeFeatureLabel( feature );
                            var description = fRect.description || fRect.glyph.makeFeatureDescriptionLabel( feature );

                            if( ( !label && !description ) )
                                return;

                            if( !this.ignoreTooltipTimeout ) {
                                this.labelTooltip.style.left = evt.clientX + "px";
                                this.labelTooltip.style.top = (evt.clientY + 15) + "px";
                            }
                            this.ignoreTooltipTimeout = true;
                            this.labelTooltip.style.display = 'block';
                            var labelSpan = this.labelTooltip.childNodes[0],
                                descriptionSpan = this.labelTooltip.childNodes[1];

                            if( this.config.onClick&&this.config.onClick.label ) {
                                var context = lang.mixin( { track: this, feature: feature, callbackArgs: [ this, feature ] } );
                                labelSpan.style.display = 'block';
                                labelSpan.style.font = label.font;
                                labelSpan.style.color = label.fill;
                                labelSpan.innerHTML = this.template( feature, this._evalConf( context, this.config.onClick.label, "label" ) );
                                return;
                            }
                            if( label ) {
                                labelSpan.style.display = 'block';
                                labelSpan.style.font = label.font;
                                labelSpan.style.color = label.fill;
                                labelSpan.innerHTML = label.text;
                            } else {
                                labelSpan.style.display = 'none';
                                labelSpan.innerHTML = '(no label)';
                            }
                            if( description ) {
                                descriptionSpan.style.display = 'block';
                                descriptionSpan.style.font = description.font;
                                descriptionSpan.style.color = description.fill;
                                descriptionSpan.innerHTML = description.text;
                            }
                            else {
                                descriptionSpan.style.display = 'none';
                                descriptionSpan.innerHTML = '(no description)';
                            }
                        });
                        if( this.ignoreTooltipTimeout )
                            renderTooltip();
                        else
                            block.tooltipTimeout = window.setTimeout( renderTooltip, 600);
                    }

                    //fRect.glyph.mouseoverFeature( context, fRect );
                    this._refreshContextMenu( fRect );
                } else {
                    block.tooltipTimeout = window.setTimeout( dojo.hitch(this, function() { this.ignoreTooltipTimeout = false; }), 200);
                }
            }, this );

            this.lastMouseover = feature;
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