(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, d3Service, Settings, Storyboards, Ensembl, Segments, Networks, Resources) {
		var overlays = {
			loaded : [],
			current : {index:0}
		};

		return {
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
						console.log("Overlays (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(overlays);
					});
				}
				return deferred.promise;
			},
			loadTSV: function(filename, filetype, defaults) {
				filename = filename || "tk-example-dataset";
				filetype = filetype || "tsv";
				if (typeof defaults === 'undefined') defaults = true;

				var self = this;
				if (defaults) {
					self.defaults();	
					Storyboards.defaultComponents();
				}

				var deferred = $q.defer();
				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";
				var dataUrl = "assets/" + datapath + "/" + filename + "." + filetype;
				$http.get(dataUrl)
				.success( function(fileData) {
					var importedOverlays = self.import(fileData,[],[]);
					console.log("Overlays (" + importedOverlays.length + ") imported from " + dataUrl);
					deferred.resolve(overlays);
				})
				.error(function(fileData) {
					console.log("No associated data tracks found.");
				});
				return deferred.promise;
			},
			import: function(fileData, selectedRows, selectedCols, style) {
				var self = this;
				// TODO: if not valid fileData return...
				selectedRows = selectedRows || [];
				selectedCols = selectedCols || [];
				style = style || {"width" : "chromatinNM", "color" : "categorical"};

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var validatedData = self.validate(parsedData);

				var filteredData;
				if (selectedRows.length > 0 && selectedCols.length > 0) {
					filteredData = self.filter(validatedData, selectedRows, selectedCols);
				} else {
					filteredData = validatedData; // no filtering required
				}

				var aquiredOverlays = self.aquire(filteredData, style);
				self.add(aquiredOverlays);

				return aquiredOverlays;
			},
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true
				});
				return parsedData;
			},
			validate: function(data) {
				var valid = true;
				var rows = data.length;
				var cols = data[0].length;
				var validatedData;
				// make array of col types
				// if isNumber also check if integer or float
				// 	if col2 integer check that is higher than col1
				// 		if yes use as coordinates... but check with User feedback
				// 		if not classify as value... but check with User feedback

				// check with User feedback... first row pulldown

				// for (var i = 0; i < rows; i++) {
				// 	var newRow = [];
				// 	if (selectedRows[i]) {
				// 		for (var j = 0; j < cols; j++) {
				// 			if (selectedCols[j]) newRow.push(dataTable[i][j]); // else column not added
				// 		}
				// 		filteredData.push(newRow);
				// 	} // else row not added
				// 	valid = true;
				// }
				validatedData = data;
				if (valid) {
					return validatedData;
				} else {
					// give error message
					// return to Project Loader page
				}
			},
			filter: function(dataTable, selectedRows, selectedCols) {
				// dataTable [[row1col1,row1col2...],[row2col1,row2col2...]...]
				// Remove rows/cols marked false in selectedRows/Cols arrays
				var filteredData = [];
				var rows = selectedRows.length;
				var cols = selectedCols.length;
				for (var i = 0; i < rows; i++) {
					var newRow = [];
					if (selectedRows[i]) {
						for (var j = 0; j < cols; j++) {
							if (selectedCols[j]) newRow.push(dataTable[i][j]); // else column not added
						}
						filteredData.push(newRow);
					} // else row not added
				}
				return filteredData;
			},
			aquire: function(data, style) {
				// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
				var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
				// D3 Categorical Color Ranges
				var colorRange = [];

				if (style.color == "gradient") {
					// ???
				} else { // categorical
					// d3.scale.category20()
					  colorRange.push("#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5");
					// d3.scale.category20b()
					  colorRange.push("#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6");
					// d3.scale.category20c()
					  colorRange.push("#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9");
				}

				// columns to overlays
				// skip row 1 = headers ie. length - 2
				// skip colums 1 and 2 = coords ie. length - 3
				var acquiredOverlays = [];
				// check for bigwig data the step and start
				// var step = 1; // override below if fixed
				// if none find which is start and end eg. Marie's and Filion's data
				// cycle through first lineto determine columns
				// create as BedGraph
				var headerRow = 0;
				var firstDataRow = 1;
				var startColumn = 0;
				var endColumn = 1;
				var rowsCount = data.length;
				var colsCount = data[headerRow].length;

				// Check if fixed steps
				var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
				var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
				var stepped = false;
				if (step == step2) stepped = true;

				// Check for data spacing
				var space = data[firstDataRow+1][startColumn] - data[firstDataRow][startColumn];
				var space2 = data[firstDataRow+2][startColumn] - data[firstDataRow+1][startColumn];
				var spaced = false;
				if (space == space2) spaced = true;

				var type, format, stepType;
				var colorSpectrum = [];

				if (stepped && spaced) {
					type = "wiggle_0";
					format = "fixed"; // and if variable...?
					stepType = "fixed";

				} else {
					type = "bedgraph";
					format = "bicolor";
					stepType = "variable";

					// Test values if Boolean or range of values
					for (var f = data.length - 1; f >= 1; f--) {
						var checkValue = data[f][2];
						if (checkValue > 0) {
							if (checkValue >= 1) {
								colorSpectrum.push(colorRange[checkValue]);
								if (checkValue > 1) {
									format = "spectrum";
								}
							}
						}
					}

				}

				/* For bedgraph data, where no value given in col3
				 * assume all indicate peaks/true reads
				 * insert a Boolean value of 1 for each read row
				 */ 
				if (colsCount == 2) {
					// skip first header row
					data[0].push("Peaks");
					for (var g = firstDataRow; g < rowsCount; g++) {
						// add
						data[g].push(1);
					}
					// console.log("No read values - col3 added, all 1 (true).");
					// console.log(data);
				} else {
					// console.log("Read values already included in col3.");
				}

				// Check if Filion proteins ie. chromatin colors
				var filion = false;
				if (colsCount == 7) filion = true; // TEMP validation pending improvement
				if (filion){
					var filionProteins = 0;
					for (var h = 2; h < colsCount; h++) { // h=2 to skip start and end cols
						var header = data[headerRow][h].toLowerCase();
						if (header=="hp1" || header=="brm" || header=="mrg15" || header=="pc" || header=="h1") filionProteins++;
					}
					if (filionProteins == 5) filion = true;
				}

				for (var i = colsCount - 1; i >= 2; i--) { // i >= 2 to skip, start and end columns
					var colored, palette;
					if (filion) {
						colored = colorFilion[i-2];
						palette = [colored,"#cccccc"];
					} else if (format == "spectrum") {
						colored = colorSpectrum;
						palette = colorSpectrum;
					} else {
						colored = colorRange[i];
						palette = [colored,"#cccccc"];
					}				
					acquiredOverlays.unshift(
						{
							"metadata": {
								"version" : 1.0,
								"type" : "overlay",
								"generator" : "TADkit"
							},
							"object" : {
								"uuid" : uuid4.generate(),
								"id" : data[headerRow][i],
								"title" : data[headerRow][i],
								"source" : "Research output",
								"url" : "local",
								"description" : "center_label", //also BigWig description (track title): "User Supplied Track"
								"type" : type, //also BigWig type
								"format" : format, // used to specify track directive (see component.directive.js)
								"components" : 2,
								"name" : data[headerRow][i], //BigWig: "User Track"
								"visibility" : "full", //BigWig: "full", "dense" or "hide"
								"color" : colored, // random from D3.js function. NOTE: convert to RGB for BigWig: eg. 255,255,255
								"altColor" : "#cccccc", // light grey gives best 3D render vis. NOTE: convert to RGB for BigWig: eg. 128,128,128
								"priority" : "100", //BigWig: 100
								"stepType" : stepType, //BigWig: "variable" or "fixed"
								"chrom" : "", //BigWig: derive from dataset...???
								"start" : data[firstDataRow][startColumn], //BigWig
								"step" : step, //BigWig
								"state" : {
									"index" : 0, // make real index???
									"overlaid" : false
								}
							},
							"palette" : palette,
							"data" : [],
							"colors" : {
								"particles" : [],
								"chromatin" : [],
								"network" : {
									"RGB" : [],
									"alpha" : []
								}
							}
						}
					);
					// convert column data to array
					for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first header row
						if (format == "variable" || format == "bicolor" || format == "spectrum") {
							acquiredOverlays[0].data.unshift({
								"start" : data[j][startColumn],
								"end" : data[j][endColumn],
								"read" : data[j][i]
							});
						} else {
							acquiredOverlays[0].data.unshift(data[j][i]);
						}				
					}
				}
				return acquiredOverlays;
			},
			add: function(importedOverlays) {
				var self = this;
				// convert to function in Overlays service
				var newOverlays = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var overlayExists = false;
					// for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						// console.log(overlays.loaded[i].object.uuid);
						// console.log(overlay.object.uuid);
						// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
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
				// - ext.data eg. Ensembl
				// - proximities (derived from datsets)
				// - segments (derived from datsets)
				var self = this;
				var overlaysAsync = []; // push async functions into list for subsequent processing
				var overlaysToUpdate = [];
				angular.forEach(overlays.loaded, function(overlay, key) {

					// For Overlays with Aync Ensembl Data eg. genes
					// check if changed...
					if (overlay.object.type == "ensembl") { // more generic than id == "genes"
						var ensembl = Ensembl.load(overlay);
						overlaysAsync.push(ensembl);
						overlaysToUpdate.push(overlay);
					}

					if (overlay.object.id == "proximities") {
						overlay.data = distances;
					}

					if (overlay.object.id == "restraints") {
						overlay.data = restraints;
					}

				});
				return $q.all(overlaysAsync)
				.then(function(results) {
					for (var i = 0; i < overlaysToUpdate.length; i++) {
						Storyboards.update(overlaysToUpdate[i]);
					}
					self.segment();
					return results;
				});

			},
			segment: function() {
				var self = this; // SYNChronous functions...
				Segments.load().then(function() {
					var settings = Settings.get();
					angular.forEach(overlays.loaded, function(overlay, key) {
						// check if colors already exist (for chromatin as principal set) or number of segments have changed
						var test = true;
						if (test) {
						// if (!overlay.colors.chromatin || overlay.colors.chromatin.length === 0) { // ??? || (overlay.colors.chromatin && segmentsCount != settings.segmentsCount)
							// run function based on object type
							var type = overlay.object.type;
							var format = overlay.object.format;
							if (type == "gradient" && format == "hex") {
								// palette must contain 2 hex values
								overlay.colors.particles = Segments.gradientHCL(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.gradientHCL(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "fixed") {
								// OJO! create additional option for format = "bigwig-variable"
								overlay.colors.particles = Segments.bicolor(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.bicolor(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "variable") {
								// To Do...
							} else if (type == "bedgraph" && format == "bicolor") {
								// data must have .start and .end
								overlay.colors.particles = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.particlesCount, 1);
								overlay.colors.chromatin = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							} else if (type == "bedgraph" && format == "spectrum") {
								// data must have .start and .end
								overlay.colors.particles = Segments.spectrumVariable(overlay, settings.current.chromStart, settings.current.particlesCount, 1);
								overlay.colors.chromatin = Segments.spectrumVariable(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							} else if (type == "matrix") {
								// Distances are per edge so just convert to color
								overlay.colors.particlesMatrix = Segments.matrix(overlay, 1); // ie. per particle
								overlay.colors.chromatinMatrix = Segments.matrix(overlay, settings.current.particleSegments);
								overlay.colors.networkMatrix = overlay.colors.particlesMatrix; // ie. also color network edges by matrix
								self.at(1, settings.current.particlesCount, settings.current.particleSegments);
							} else if (type == "misc" && format == "variable") { // eg. restraints
								overlay.colors.particles = [];
								overlay.colors.chromatin = [];
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							} else if (type == "ensembl" && format == "json") {
								// data must have .start and .end
								var features = Resources.get().biotypes;
								var singleSegment = 1;
								overlay.colors.particles = Segments.features(overlay, settings.current.chromStart, settings.current.particlesCount, singleSegment, features);
								overlay.colors.chromatin = Segments.features(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength, features);
								overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
							}

						} else {
							// already segmented
							console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
						}

					});
					return overlays;
				});
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
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					overlay = overlays.loaded[overlays.current.index];
					overlay.object.state.index = overlays.current.index;
					console.log("Overlay \"" + id + "\" not found: returning current.");
				}
				// console.log(overlay);
				return overlay;
			},
			getCurrentIndex: function() {
				return overlays.current.index;
			}
		};
	}
})();