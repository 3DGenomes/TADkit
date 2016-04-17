(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Overlays
	 * @description Overlays of Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 * @requires TADkit.service:OverlaysImport
	 * @requires TADkit.service:Settings
	 * @requires TADkit.service:Storyboards
	 * @requires TADkit.service:FeaturesEnsembl
	 * @requires TADkit.service:ColorsEnsembl
	 * @requires TADkit.service:Segments
	 * @requires TADkit.service:Networks
	 *
	 */
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($log, $q, $http, uuid4, OverlaysImport, Settings, Storyboards, FeaturesEnsembl, ColorsEnsembl, Segments, Networks) {
		var overlays = {
			loaded : [],
			current : {
				index: 0
			}
		};

		return {
			// Overlays already parsed and filtered, stored as JSON
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-overlays.json";
				if( overlays.loaded.length > 0 ) {
					 deferred.resolve(overlays);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						overlays.loaded = data;
						// overlays.current.index = overlays.loaded.length - 1;
						$log.debug("Overlays (" + data.length + ") loaded from " + dataUrl);
						deferred.resolve(overlays);
					});
				}
				return deferred.promise;
			},
			loadFromFile: function(filename, filetype, defaults) {
				filename = filename || "tk-example-dataset";
				filetype = filetype || "tsv";
				if (typeof defaults === 'undefined') defaults = true;
				var self = this;

				var deferred = $q.defer();
				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";
				var dataUrl = "assets/" + datapath + "/" + filename + "." + filetype;
				$http.get(dataUrl)
				.success( function(fileData) {
					self.import(fileData,[],[]);
					$log.debug("Overlays (" + fileData.length + ") imported from " + dataUrl);
					deferred.resolve(fileData);
				})
				.error(function(fileData) {
					$log.error("No associated data found.");
				});
				return deferred.promise;
			},
			// Import fetched external data as TADKit Overlays
			import: function(data, selectedRows, selectedCols, defaults) {
				data = data || "none"; // Add error check
				selectedRows = selectedRows || [];
				selectedCols = selectedCols || [];
				var importedOverlays = OverlaysImport.import(data, selectedRows, selectedCols);
				var self = this;
				if (defaults) self.defaults;
				self.add(importedOverlays);
				return importedOverlays;
			},
			add: function(importedOverlays) {
				var self = this;
				// convert to function in Overlays service
				var newOverlays = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var overlayExists = false;
					// for (var i = overlays.loaded.length - 1; i >= 0; i--) {
					// 	$log.debug(overlays.loaded[i].object.uuid);
					// 	$log.debug(overlay.object.uuid);
					// 	// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
					// }
					if (!overlayExists) {
						currentOverlaysIndex++;
						overlay.object.state.index = currentOverlaysIndex;
						overlay.object.state.overlaid = false;
						newOverlays.push(overlay);
						Storyboards.addComponent(overlay);
					}
				});
				// Add newOverlays to Overlays
				overlays.loaded = overlays.loaded.concat(newOverlays);
				// Generate colors arrays for new overlays
				self.segment();

				return newOverlays;
			},
			clear: function() {
				while (overlays.loaded.length > 0) { // remove all overlays
					overlays.loaded.shift();
				}
			},
			defaults: function() {
				while (overlays.loaded.length > 4) { // remove all except defaults
					overlays.loaded.pop();
					// remove associated components
					Storyboards.defaultComponents();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded.indexOf(index);
				overlays.loaded.splice(overlay, 1);
				return overlays;
			},
			set: function(index) {
				if (index !== undefined || index !== false) overlays.current.index = index;
				var current = overlays.loaded[overlays.current.index];
				return current;
			},
			setOverlaid: function (index) {
				index = index || "";
				angular.forEach(overlays.loaded, function(overlay) {
					if (overlay.object.state.index === index) {
						overlay.object.state.overlaid = true;
					} else {
						overlay.object.state.overlaid = false;
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
				var overlaysAsync = []; // push async functions into list for subsequent processing
				var overlaysToUpdate = [];
				angular.forEach(overlays.loaded, function(overlay, key) {

					// For Overlays with Aync Features Data eg. genes
					// ADD check if changed...
					if (overlay.object.type == "ensembl") { // more generic than id == "genes"
						var address = Settings.getAddress();
						var features = FeaturesEnsembl.load(overlay, address);
						overlaysAsync.push(features);
						overlaysToUpdate.push(overlay);
					}

					// // UNUSED???
					// if (overlay.object.id == "proximities") {
					// 	overlay.data = distances;
					// }

					// // UNUSED???
					// if (overlay.object.id == "restraints") {
					// 	overlay.data = restraints;
					// }

				});
				return $q.all(overlaysAsync)
				.then(function(results) {
					for (var i = 0; i < overlaysToUpdate.length; i++) {
						var overlay = overlaysToUpdate[i];
						Storyboards.update(overlay);
					}
					self.segment();
					return results;
				});

			},
			segment: function() {
				var self = this; // SYNChronous functions...
				// Segments.load().then(function() {
					var settings = Settings.get();
					angular.forEach(overlays.loaded, function(overlay, key) {
						// check if colors already exist (for chromatin as principal set) or number of segments have changed
						var segmented = true;
						if (segmented) {
						// if (!overlay.colors.chromatin || overlay.colors.chromatin.length === 0) { // ??? || (overlay.colors.chromatin && segmentsCount != settings.segmentsCount)
							// run function based on object type
							var type = overlay.object.type;
							var format = overlay.object.format;
							if (type == "gradient" && format == "hex") {
								// palette must contain 2 hex values
								overlay.colors.particles = Segments.gradientHCL(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.gradientHCL(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "fixed") {
								// OJO! create additional option for format = "bigwig-variable"
								overlay.colors.particles = Segments.bicolor(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.bicolor(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "variable") {
								// To Do...
							} else if (type == "bedgraph") {
								overlay.colors.particles = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.particlesCount, 1);
								overlay.colors.chromatin = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "matrix") {
								// Distances are per edge so just convert to color
								overlay.colors.particlesMatrix = Segments.matrix(overlay, 1); // ie. per particle
								overlay.colors.chromatinMatrix = Segments.matrix(overlay, settings.current.particleSegments);
								overlay.colors.networkMatrix = overlay.colors.particlesMatrix; // ie. also color network edges by matrix
								self.at(1, settings.current.particlesCount, settings.current.particleSegments);
							} else if (type == "misc" && format == "variable") { // eg. restraints
								overlay.colors.particles = [];
								overlay.colors.chromatin = [];
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "ensembl" && format == "json") {
								// data must have .start and .end
								var features = ColorsEnsembl.get("gene");
								var singleSegment = 1;
								overlay.colors.particles = Segments.features(overlay, settings.current.chromStart, settings.current.particlesCount, singleSegment, features);
								overlay.colors.chromatin = Segments.features(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength, features);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							}
						} else {
							// already segmented
							$log.warn("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
						}

					});
					return overlays;
				// });
			},
			at: function(currentParticle) {
				var settings = Settings.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var type = overlay.object.type;
					if (type == "matrix") {
						var particleStart = (currentParticle - 1) * settings.current.particlesCount;
						var particleEnd = currentParticle * settings.current.particlesCount;
						var chromatinStart = particleStart * settings.current.particleSegments;
						var chromatinEnd = particleEnd * settings.current.particleSegments;

						overlay.colors.particles = overlay.colors.particlesMatrix.slice(particleStart, particleEnd);
						overlay.colors.chromatin = overlay.colors.chromatinMatrix.slice(chromatinStart, chromatinEnd);
						overlay.colors.network = overlay.colors.networkMatrix.slice(particleStart, particleEnd);
					}
				});
				return overlays;
			},
			get: function() {
				return overlays;
			},
			getOverlay: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded[index];
				return overlay;
			},
			getOverlayById: function (id) {
				var overlay, found;
				if (id !== undefined || id !== false) {
					for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						if (overlays.loaded[i].object.id === id) {
							overlay = overlays.loaded[i];
							overlay.object.state.index = i;
							found = true;
							$log.debug("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					overlay = overlays.loaded[overlays.current.index];
					overlay.object.state.index = overlays.current.index;
					$log.debug("Overlay \"" + id + "\" not found: returning current.");
				}
				$log.debug(overlay);
				return overlay;
			},
			getCurrentIndex: function() {
				return overlays.current.index;
			}
		};
	}
})();