define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/View/Track/HTMLFeatures',
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
    HTMLFeatureTrack,
    all,
    Util,
    query, 
    dom, 
    domStyle, 
    registry
) {
    return declare(HTMLFeatureTrack, {
        _defaultConfig: function() {
            return Util.deepUpdate(lang.clone(this.inherited(arguments)), {
                style: {
                    arrowheadClass: '',
                    showLabels: false,
                    colors: 'black,blue,yellow,red,green',
                    colorTop: 8 
                },
                apply3D: false,
                hooks: {
                    modify: function(track,f,featDiv) { 
                        var avail_colors = track.config.style.colors.split(","); 
                        var col = f.get('color'); 
                        featDiv.style.background = col; 
                        var toppos = avail_colors.indexOf(col);
                        if(toppos==-1) {
                            toppos = 0;
                            featDiv.style.background = 'transparent';
                        }  
                        featDiv.style.top = (toppos*track.config.style.colorTop)+'px';
                    }
                },
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
        }
    });
});