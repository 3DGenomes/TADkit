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
            var harmonicsColor = $scope.overlay.palette[0];
            var lowerBoundsColor = $scope.overlay.palette[1];
            var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
            //var f;
            // for(var i=0;i<$scope.settings.current.particlesCount;i++) {
            //     var start = $scope.settings.current.chromStart+resolution*(i);
            //         var end = $scope.settings.current.chromStart+resolution*(i+1);

            //         var restraint = new SimpleFeature({
            //             id: i+1,
            //             data: {
            //                 start: start,
            //                 end: end,
            //                 color: 'rgba(0,0,0,0)',
            //                 score: 0,
            //                 opacity: 0,
            //                 name: ''
            //             }
            //         });
            //         featureCallback(restraint);
            // }
            array.forEach($scope.data.harmonics, function(f) {
                    var start = $scope.settings.current.chromStart+resolution*(f[1]-1);
                    var end = $scope.settings.current.chromStart+resolution*(f[1]);

                    var restraint = new SimpleFeature({
                        id: f[1],
                        data: {
                            start: start,
                            end: end,
                            particle: f[0],
                            color: harmonicsColor,
                            score: f[3],
                            opacity: Math.round((f[3]/2)*(f[3]/2)*100)/100,
                            name: 'Harmonic '+f[0]+'<-->'+f[1]
                        }
                    });
                    featureCallback(restraint);
            });
            
            finishCallback();
        }
    });
});