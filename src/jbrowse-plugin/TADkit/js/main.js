define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'JBrowse/Plugin'
],
function(
    declare,
    lang,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function(args) {
            var browser = args.browser;
            this.tracksOverlaid = {};
            // Do anything you need to initialize your plugin here
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
            this.browser.afterMilestone('initView', function() {
                this._createRestraintsTrack();
                
            }, this );
            dojo.subscribe("/jbrowse/v1/v/tracks/show",  lang.hitch( this, '_addOverlayMenuItem' ));  

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
        _addOverlayMenuItem: function( /**Array[Object]*/ trackConfigs ) {
        	
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
	                track.store.getFeatures( region,
	                                        function( feature ) {
	                                            feat.push(feature);
	                                        },
	                                        // callback when all features sent
	                                        function () {
	                                            $scope.applyOverlay(track.key,feat);
	                                        });
	                thisB.tracksOverlaid[track_label] = true;
                } else {
                	$scope.removeOverlay(track.key);
                	thisB.tracksOverlaid[track_label] = false;
                }
                
            };
            dojo.forEach( trackConfigs, function(conf) {
            	
            	var trackConf = this.browser.trackConfigsByName[conf.label];
            	//this.browser.view.tracks[conf.key]._trackMenuOptions = function(query) {
            	var color_val = false;
            	
            	if (trackConf.type == 'JBrowse/View/Track/CanvasFeatures' || trackConf.type == 'JBrowse/View/Track/Wiggle/Density')
            	color_val = true;
            	
            	if(color_val) {
            		this.tracksOverlaid[trackConf.label] = false;
	                trackConf.menuTemplate = [{
	                    "label": "Apply to 3D",
	                    "action":function(clickEvent) { applyOverlay(trackConf.label); },
	                    "iconClass": "dijitIconFunction",
	                    "title": "Apply to 3D"
	                   }];
            	}
            },this);

        },
    });
});