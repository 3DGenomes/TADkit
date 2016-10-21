define([
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function(
    declare,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function(args) {
            var browser = args.browser;

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

               
        }
    });
});