define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/dom-construct',
    'JBrowse/Util',
    'dojo/on',
    'JBrowse/View/Track/CanvasFeatures',    
],
function(
    declare,
    array,
    lang,
    domEvent,
    domConstruct,
    Util,
    on,
    CanvasFeatureTrack
) {
    return declare(CanvasFeatureTrack, {
        constructor: function( args ) {
        	var track=this;
            
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            $scope.$watch('data.data.dimension', function(newPosition, oldPosition) {
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
        }
    });
});