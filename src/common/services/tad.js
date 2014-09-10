'use strict';

TADkit.factory('TAD', ['$q', '$http', function($q, $http) {
	var TAD = null;
	var detailFactor = 10;
	return {
		loadTAD: function() {
			var deferral = $q.defer();
			$http.get('assets/json/tad.json').
				success(function(data){
					TAD = data;
					TAD.metadata.lengthBP = TAD.metadata.end - TAD.metadata.start;
					TAD.metadata.segments = parseInt( TAD.metadata.lengthBP / TAD.metadata.resolution ) / detailFactor;
					console.log("TAD data retreived from file.");
					deferral.resolve(data);
				});
				return deferral.promise;
		},
		setTAD: function (data) {
			TAD = data;
		},
		getTAD: function () {
			return TAD;
		},
		getMetadata: function () {
			return TAD.metadata;
		},
		getLengthBP: function () {
			return TAD.metadata.lengthBP;
		},
		getSpecies: function () {
			var species = TAD.metadata.species;
			species = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
			return species;
		},
		getVertices: function () {
			return TAD.vertices;
		},
		getParticlesCount: function () {
			var particlesCount = TAD.vertices.length / 3;
			return particlesCount;
		},
		getSegments: function () {
			var segments = TAD.metadata.segments; // eg. ANOTHER WAY OF CHOOSING IT...
			return segments;
		},
		getSlice: function () {
			var metadata = TAD.metadata;
			var slice = metadata.chromosome + ":" + metadata.start + "-" + metadata.end;
			return slice;
		}
	};
}])
