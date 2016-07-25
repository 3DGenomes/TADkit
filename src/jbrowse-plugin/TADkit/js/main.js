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
        }
    });
});