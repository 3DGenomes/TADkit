(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('TAD', TAD);

	function TAD ($q, $http){
		var TAD = null;
		var detailFactor = 20;
		return {
			loadTAD: function() {
				var deferral = $q.defer();
				$http.get('assets/json/tad-homo_sapiens.json').
				// $http.get('assets/json/tad-drosophila_melanogaster.json').

					success(function(data){
						TAD = data;
						TAD.metadata.lengthBP = TAD.metadata.end - TAD.metadata.start;
						TAD.metadata.segments = detailFactor;//parseInt( TAD.metadata.lengthBP / TAD.metadata.resolution ) / detailFactor;
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
				return species;
			},
			getSpeciesUrl: function () {
				var species = TAD.metadata.species;
				species = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				return species;
			},
			getVertices: function () {
				return TAD.vertices;
			},
			getParticles: function () {
				var vertices = this.getVertices();
				var particles = [];
				var offset = 0, particle;
				var totalVertices = vertices.length;
				while ( offset < totalVertices ) {
					particle = {};
					particle.x = vertices[ offset ++ ];
					particle.y = vertices[ offset ++ ];
					particle.z = vertices[ offset ++ ];
					particles.push( particle );
				}
				return particles;
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
			},
			getColors: function() {
				var colors = [];
				var particles = this.getParticlesCount();
				var segments = this.getSegments();
				for(var i=0; i<particles; i++){
					for(var j=0; j<segments; j++){
						if(TAD.colors[i]) {
							colors.push(TAD.colors[i]);
						} else {
							colors.push("#cccccc");
						}
					}
				}
				return colors;
			}
		};
	}
})();
