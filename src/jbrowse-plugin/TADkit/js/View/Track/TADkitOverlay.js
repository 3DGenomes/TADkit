define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/Track/CanvasFeatures',
    'JBrowse/View/Track/Alignments2',
    'dojo/promise/all',
    'JBrowse/Util',
    'dojo/query', 
    'dojo/dom', 
    'dojo/dom-style', 
    'dijit/registry'
],
function(
    declare,
    array,
    lang,
    CanvasFeatureTrack,
    Alignments2,
    all,
    Util,
    query, 
    dom, 
    domStyle, 
    registry
) {
    return declare(Alignments2, {
        constructor: function( args ) {
            this._createTadkitNavigation();
        },
        _defaultConfig: function() {
            return Util.deepUpdate(lang.clone(this.inherited(arguments)), {
                apply3D: false
            });
            
        },
        _trackMenuOptions: function(query) {
            var track=this;
            var displayOptions=[];

            displayOptions.push({
                label: 'Apply to 3D',
                type: 'dijit/CheckedMenuItem',
                checked: this.config.apply3D,
                onClick: function(event) {
                    track.config.apply3D = this.get('checked');
                    if(parent.angular==undefined) return false;
                    var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
                    if(track.config.apply3D) {
                        var region = { ref: track.refSeq.name,
                           start: $scope.settings.current.chromStart,
                           end: $scope.settings.current.chromEnd
                         };
                        var feat = [];
                        track.store.getFeatures( region,
                                                function( feature ) {
                                                    feat.push(feature);
                                                },
                                                // callback when all features sent
                                                function () {
                                                    $scope.applyOverlay(track.key,feat);
                                                });
                    } else {
                        $scope.removeOverlay(track.key);
                    }
                    track.browser.publish('/jbrowse/v1/v/tracks/replace', [track.config]);
                }
            });

            return all([ this.inherited(arguments), displayOptions ])
                .then( function( options ) {
                           var o = options.shift();
                           o.splice(9,o.length);
                           return o.concat.apply( o, options );
                       });
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
                var dr = dojo.create("div", {id: "trackbar-tadkit-right-mark"}, "static_track");
                dr.style.display = "none";
                dr.style.left = "0px";
                dr.style.top = toppos + "px";
                
                var dl = dojo.create("div", {id: "trackbar-tadkit-left-mark"}, "static_track");
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