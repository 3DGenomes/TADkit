(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Resources', Resources);

	function Resources($q, $http, Color, uuid4) {
		var resources = {};
		var ensemblRoot = "http://rest.ensembl.org/";
		resources.assembly = {};
		resources.featureColors = {};
		return {
			setLengthBP: function(top_level_region) {
				var lengthBP = 0;
				var regionBPs = top_level_region;
				for (var regionBP in regionBPs) {
					if (regionBPs.hasOwnProperty(regionBP)) {
						for (var i = 0, j = regionBPs.length; i < j; i++) {
							lengthBP += regionBPs[i].length;
						}
					}
				}
				return lengthBP;
			},
			loadInfoAssembly: function(speciesUrl, online) {
				var deferral = $q.defer();
				var self = this;
				var source;
				if (online) {
					source = ensemblRoot + "info/assembly/" + speciesUrl + "?content-type=application/json";
				} else {
					source = "assets/json/" + speciesUrl + "-assembly.json";
				}
				$http.get(source)
				.success(function(data){
					var whence = online ? "Ensembl" : "local storage";
					console.log("Assembly Info for " + speciesUrl + " retreived from " + whence + ".");
					data.lengthBP = self.setLengthBP(data.top_level_region);
					console.log("Assembly length for " + speciesUrl + " = " + data.lengthBP);
					resources.assembly = data;
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			loadBiotypeColors: function() {
				var deferral = $q.defer();
				var online = false;//$scope.online;
				var source;
				if (online) {
				// source = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					source = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					source = "assets/json/ensembl-webcode-COLOUR.ini";

				}
				$http.get(source)
				.success(function(data){
					var iniData = Color.colorsFromIni(data);
					resources.featureColors = iniData;
					resources.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					deferral.resolve(iniData);
				});
				return deferral.promise;
			},
			loadInfoBiotypes: function(speciesUrl) {
				var deferral = $q.defer();
				var source;
				if (online) {
					source = ensemblRoot + "info/biotypes/" + speciesUrl + "?content-type=application/json";
				} else {
					source = "assets/json/" + speciesUrl + "-biotypes.json";
				}
				$http.get(source).
				success(function(data){
					console.log("Biotypes for " + speciesUrl + " retreived from Ensembl.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			get: function () {
				return resources;
			},
			getRegionBiotypes: function (genes) {
				// GET BIOTYPES AND SET BIOTYPE COLORS
				var biotypes = [];
				var featureColors = [
					// other: 16753920
					// protein_alignment: 255
					// protein_coding: 12009742
					// pseudogene: 6710886
				];
				var biotypesLookup = {};
				for (var item, i = 0; item == genes[i++];) {
					var geneBiotype = item.biotype;
					if (!(geneBiotype in biotypesLookup)) {
					biotypesLookup[geneBiotype] = 1;
					biotypes.push(geneBiotype);
					}
				}
				console.log("Biotypes");
				console.log(biotypes);
				var totalbiotypes = biotypes.length;
				console.log("Total Biotypes: %s", totalbiotypes);
			},
			getProximityMatrix: function (vertices, settings) {
				// generate a matrix of proximity between points
				// from vertices = array of point coordinates components
				// to minDistance = threshold for proximity
				// eg. [x,y,z,x,y,z,x,y,z,...]
				// becomes:
				// positions eg. []
				// distances eg.

				var defaults = {
					minDistance: 150,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				var proximityMatrix = {};

				var vertexpos = 0;
				var distancepos = 0;

				var pointsCount = vertices.length / 3; // components of vertices
				var contacts = pointsCount * pointsCount;

				var positions = new Float32Array( contacts * 3 );
				var distances = new Float32Array( contacts * 3 );
				
				for (var i = pointsCount - 1; i >= 0; i--) {

					// Check collision
					for (var j = pointsCount - 1; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {

							var distance = (1.0 - dist / this.minDistance).toFixed(2);

							positions[ vertexpos++ ] = vertices[ i * 3     ]; // from x
							positions[ vertexpos++ ] = vertices[ i * 3 + 1 ]; // from y
							positions[ vertexpos++ ] = vertices[ i * 3 + 2 ]; // from z

							positions[ vertexpos++ ] = vertices[ j * 3     ]; // to p
							positions[ vertexpos++ ] = vertices[ j * 3 + 1 ]; // to q
							positions[ vertexpos++ ] = vertices[ j * 3 + 2 ]; // to r

							// distance as value (0-1) between (x,y,z) and (p,q,r)
							// but matrix structure repeated for ease of iteration
							distances[ distancepos++ ] = distance;
							distances[ distancepos++ ] = distance;
							distances[ distancepos++ ] = distance;

							distances[ distancepos++ ] = distance;
							distances[ distancepos++ ] = distance;
							distances[ distancepos++ ] = distance;
						// }

					}
				}
				proximityMatrix.positions = positions;
				proximityMatrix.distances = distances;
				return proximityMatrix;
			}
		};
	}
})();