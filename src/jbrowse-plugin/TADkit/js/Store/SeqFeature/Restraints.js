define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'JBrowse/Store/SeqFeature',
    'JBrowse/Model/SimpleFeature'
],
function(
    declare,
    array,
    lang,
    SeqFeatureStore,
    SimpleFeature
) {
    return declare(SeqFeatureStore, {
        getFeatures: function(query, featureCallback, finishCallback, errorCallback) {
            var $scope = parent.angular.element( parent.document.querySelector( '#jbrowse-iframe' ) ).scope();
            if($scope.settings.current.chromStart > query.end || $scope.settings.current.chromEnd < query.start) {
            	return;
            }
            var harmonicsColor = $scope.overlay.palette[0];
            var lowerBoundsColor = $scope.overlay.palette[1];
            var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
            array.forEach($scope.data.harmonics, function(f) {
            	var start = $scope.settings.current.chromStart+resolution*(f[1]);
                var end = $scope.settings.current.chromStart+resolution*(f[1]+0.9);
                if(start>=query.start && end<=query.end) {
                    var restraint = new SimpleFeature({
                        id: 'h-'+f[0]+'-'+f[1],
                        data: {
                            start: start,
                            end: end,
                            particle_from: f[0],
                            particle_to: f[1],
                            color: harmonicsColor,
                            score: f[3],
                            opacity: Math.round((f[3]/2)*(f[3]/2)*100)/100,
                            name: 'Harmonic '+f[0]+'<-->'+f[1]
                        }
                    });
                    featureCallback(restraint);
                }
            });
            
            array.forEach($scope.data.lowerBounds, function(f) {
                var start = $scope.settings.current.chromStart+resolution*(f[1]);
                var end = $scope.settings.current.chromStart+resolution*(f[1]+0.9);
                if(start>=query.start && end<=query.end) {
                    var restraint = new SimpleFeature({
                        id: 'l-'+f[0]+'-'+f[1],
                        data: {
                            start: start,
                            end: end,
                            particle_from: f[0],
                            particle_to: f[1],
                            color: lowerBoundsColor,
                            score: f[3],
                            opacity: Math.round((f[3]/2)*(f[3]/2)*100)/100,
                            name: 'LowerBound '+f[0]+'<-->'+f[1]
                        }
                    });
                    featureCallback(restraint);
                }
            });
            finishCallback();

        }
    });
});