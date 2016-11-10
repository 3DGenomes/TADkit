define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'JBrowse/Plugin'
],
function(
    declare,
    lang,
    when,
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
            //dojo.subscribe("/jbrowse/v1/n/tracks/visibleChanged",  lang.hitch( this, '_addOverlayMenuItem' ));
            dojo.subscribe('/jbrowse/v1/n/tracks/visibleChanged'
            		, function (visibleTrackNames) {
            			if(visibleTrackNames) thisB._addOverlayMenuItem(visibleTrackNames[0]);
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
	                track.store.getFeatures( region,
	                                        function( feature ) {
	                							if(typeof feature.get('color') == 'undefined' && typeof feature.get('score') == 'undefined') {
	                								return;
	                							}
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
            dojo.forEach( visibleTrackNames, function(conf) {
            	
            	//var trackConf = this.browser.trackConfigsByName[conf];
            	var track = thisB.browser.view.tracks[thisB.browser.view.trackIndices[conf]];
            	var trackConf = track.config;
            	var color_val = false;
            	
            	if (trackConf.type == 'JBrowse/View/Track/CanvasFeatures' || trackConf.type == 'JBrowse/View/Track/Wiggle/Density' ||
            			conf in this.tracksOverlaid)
            	color_val = true;
            	
            	if(color_val) {
            		this.tracksOverlaid[trackConf.label] = false;
	                apply3dopt = [
	                   { type: 'dijit/MenuSeparator' },
	                   {
	                    "label": "Apply to 3D",
	                    "action":function(clickEvent) { applyOverlay(trackConf.label); },
	                    "iconClass": "dijitIconFunction",
	                    "title": "Apply to 3D"
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