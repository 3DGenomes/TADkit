(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Layers
	 * @description Layers of Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 * @requires TADkit.service:Settings
	 * @requires TADkit.service:Storyboards
	 * @requires TADkit.service:FeaturesEnsembl
	 * @requires TADkit.service:EnsemblColors
	 * @requires TADkit.service:Segments
	 * @requires TADkit.service:Networks
	 *
	 */
	angular
		.module('TADkit.layers')
		.factory('Layers', Layers);

	function Layers(VERBOSE, $log, $q, $http, uuid4, Settings, Storyboards, FeaturesEnsembl, EnsemblColors, Segments, Networks) {
		var layers = {
			loaded : [],
			current : {
				index: 0
			}
		};

		return {
			// Layers already parsed and filtered, stored as JSON
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-layers.json";
				if( layers.loaded.length > 0 ) {
					 deferred.resolve(layers);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						layers.loaded = data;
						// layers.current.index = layers.loaded.length - 1;
						$log.debug("Layers (" + data.length + ") loaded from " + dataUrl);
						deferred.resolve(layers);
					});
				}
				return deferred.promise;
			},
			// ¿¿¿ IS THIS FUNCTION REQUIRED ???
			// Preload or generate TSV example?
			// loadFromFile: function(filename, filetype, defaults) {
			// 	filename = filename || "tk-example-dataset";
			// 	filetype = filetype || "tsv";
			// 	if (typeof defaults === 'undefined') defaults = true;
			// 	var self = this;

			// 	var deferred = $q.defer();
			// 	var datapath = "examples";
			// 	var dataUrl = "assets/" + datapath + "/" + filename + "." + filetype;
			// 	$http.get(dataUrl)
			// 	.success( function(fileData) {
			// 		self.import(fileData,[],[]);
			// 		$log.debug("Layers (" + fileData.length + ") imported from " + dataUrl);
			// 		deferred.resolve(fileData);
			// 	})
			// 	.error(function(fileData) {
			// 		$log.error("No associated data found.");
			// 	});
			// 	return deferred.promise;
			// },
			add: function(importedLayers) {
				var self = this;
				// convert to function in Layers service
				var newLayers = [];
				var currentLayersIndex = layers.loaded.length - 1;
				angular.forEach(importedLayers, function(layer, key) {
					var layerExists = false;
					// for (var i = layers.loaded.length - 1; i >= 0; i--) {
					// 	$log.debug(layers.loaded[i].object.uuid);
					// 	$log.debug(layer.object.uuid);
					// 	// if (layers.loaded[i].object.uuid == layer.object.uuid) layerExists = true;
					// }
					if (!layerExists) {
						currentLayersIndex++;
						layer.object.state.index = currentLayersIndex;
						layer.object.state.overlaid = false;
						newLayers.push(layer);
						Storyboards.addComponent(layer);
					}
				});
				// Add newLayers to Layers
				layers.loaded = layers.loaded.concat(newLayers);
				// Generate colors arrays for new layers
				self.segment();

				return newLayers;
			},
			clear: function() {
				while (layers.loaded.length > 0) { // remove all layers
					layers.loaded.shift();
				}
			},
			defaults: function() {
				while (layers.loaded.length > 4) { // remove all except defaults
					layers.loaded.pop();
					// remove associated components
					Storyboards.defaultComponents();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = layers.current.index;
				var layer = layers.loaded.indexOf(index);
				layers.loaded.splice(layer, 1);
				return layers;
			},
			set: function(index) {
				if (index !== undefined || index !== false) layers.current.index = index;
				var current = layers.loaded[layers.current.index];
				return current;
			},
			setOverlaid: function (index) {
				index = index || "";
				angular.forEach(layers.loaded, function(layer) {
					if (layer.object.state.index === index) {
						layer.object.state.overlaid = true;
					} else {
						layer.object.state.overlaid = false;
					}
				});
				return index;
			},
			update: function(distances, restraints) {
				// things that need updating for changes:
				// - ext.data eg. Features
				// - proximities (derived from datsets)
				// - segments (derived from datsets)
				var self = this;
				var layersAsync = []; // push async functions into list for subsequent processing
				var layersToUpdate = [];
				angular.forEach(layers.loaded, function(layer, key) {

					// For Layers with Aync Features Data eg. genes
					// ADD check if changed...
					if (layer.object.type == "ensembl") { // more generic than id == "genes"
						var address = Settings.getAddress();
						var features = FeaturesEnsembl.load(layer, address);
						layersAsync.push(features);
						layersToUpdate.push(layer);
					}

					// // UNUSED???
					// if (layer.object.id == "proximities") {
					// 	layer.data = distances;
					// }

					// // UNUSED???
					// if (layer.object.id == "restraints") {
					// 	layer.data = restraints;
					// }

				});
				return $q.all(layersAsync)
				.then(function(results) {
					for (var i = 0; i < layersToUpdate.length; i++) {
						var layer = layersToUpdate[i];
						Storyboards.update(layer);
					}
					self.segment();
					return results;
				});

			},
			segment: function() {
				var self = this; // SYNChronous functions...
				// Segments.load().then(function() {
					var settings = Settings.get();
					angular.forEach(layers.loaded, function(layer, key) {
						// check if colors already exist (for chromatin as principal set) or number of segments have changed
						var segmented = true;
						if (segmented) {
						// if (!layer.colors.chromatin || layer.colors.chromatin.length === 0) { // ??? || (layer.colors.chromatin && segmentsCount != settings.segmentsCount)
							// run function based on object type
							var type = layer.object.type;
							var format = layer.object.format;
							if (type == "gradient" && format == "hex") {
								// palette must contain 2 hex values
								layer.colors.particles = Segments.gradientHCL(layer, settings.current.particlesCount);
								layer.colors.chromatin = Segments.gradientHCL(layer, settings.current.segmentsCount);
								layer.colors.network.RGB = Networks.lineSegmentsRGB(layer, settings.current.edgesCount);
								layer.colors.network.alpha = Networks.lineSegmentsAlpha(layer, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "fixed") {
								// OJO! create additional option for format = "bigwig-variable"
								layer.colors.particles = Segments.bicolor(layer, settings.current.particlesCount);
								layer.colors.chromatin = Segments.bicolor(layer, settings.current.segmentsCount);
								layer.colors.network.RGB = Networks.lineSegmentsRGB(layer, settings.current.edgesCount);
								layer.colors.network.alpha = Networks.lineSegmentsAlpha(layer, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "variable") {
								// To Do...
							} else if (type == "bedgraph") {
								layer.colors.particles = Segments.bicolorVariable(layer, settings.current.chromStart, settings.current.particlesCount, 1);
								layer.colors.chromatin = Segments.bicolorVariable(layer, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
								layer.colors.network.RGB = Networks.lineSegmentsRGB(layer, settings.current.edgesCount);
								layer.colors.network.alpha = Networks.lineSegmentsAlpha(layer, settings.current.edgesCount);
							} else if (type == "matrix") {
								// Distances are per edge so just convert to color
								layer.colors.particlesMatrix = Segments.matrix(layer, 1); // ie. per particle
								layer.colors.chromatinMatrix = Segments.matrix(layer, settings.current.particleSegments);
								layer.colors.networkMatrix = layer.colors.particlesMatrix; // ie. also color network edges by matrix
								self.at(1, settings.current.particlesCount, settings.current.particleSegments);
							} else if (type == "misc" && format == "variable") { // eg. restraints
								layer.colors.particles = [];
								layer.colors.chromatin = [];
								layer.colors.network.RGB = Networks.lineSegmentsRGB(layer, settings.current.edgesCount);
								layer.colors.network.alpha = Networks.lineSegmentsAlpha(layer, settings.current.edgesCount);
							} else if (type == "ensembl" && format == "json") {
								// data must have .start and .end
								var features = EnsemblColors.get("gene");
								var singleSegment = 1;
								layer.colors.particles = Segments.features(layer, settings.current.chromStart, settings.current.particlesCount, singleSegment, features);
								layer.colors.chromatin = Segments.features(layer, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength, features);
								layer.colors.network.RGB = Networks.lineSegmentsRGB(layer, settings.current.edgesCount);
								layer.colors.network.alpha = Networks.lineSegmentsAlpha(layer, settings.current.edgesCount);
							}
						} else {
							// already segmented
							$log.warn("Layer '" + layer.object.title + "' already segmented as color array matching current dataset length");
						}

					});
					return layers;
				// });
			},
			at: function(currentParticle) {
				var settings = Settings.get();
				angular.forEach(layers.loaded, function(layer, key) {
					var type = layer.object.type;
					if (type == "matrix") {
						var particleStart = (currentParticle - 1) * settings.current.particlesCount;
						var particleEnd = currentParticle * settings.current.particlesCount;
						var chromatinStart = particleStart * settings.current.particleSegments;
						var chromatinEnd = particleEnd * settings.current.particleSegments;

						layer.colors.particles = layer.colors.particlesMatrix.slice(particleStart, particleEnd);
						layer.colors.chromatin = layer.colors.chromatinMatrix.slice(chromatinStart, chromatinEnd);
						layer.colors.network = layer.colors.networkMatrix.slice(particleStart, particleEnd);
					}
				});
				return layers;
			},
			get: function() {
				return layers;
			},
			getLayer: function(index) {
				if (index === undefined || index === false) index = layers.current.index;
				var layer = layers.loaded[index];
				return layer;
			},
			getLayerById: function (id) {
				var layer, found;
				if (id !== undefined || id !== false) {
					for (var i = layers.loaded.length - 1; i >= 0; i--) {
						if (layers.loaded[i].object.id === id) {
							layer = layers.loaded[i];
							layer.object.state.index = i;
							found = true;
							$log.debug("Layer \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					layer = layers.loaded[layers.current.index];
					layer.object.state.index = layers.current.index;
					$log.debug("Layer \"" + id + "\" not found: returning current.");
				}
				if (VERBOSE) $log.debug(layer);
				return layer;
			},
			getCurrentIndex: function() {
				return layers.current.index;
			}
		};
	}
})();