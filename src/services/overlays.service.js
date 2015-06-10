(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, d3Service, Settings, Datasets, Storyboards, Segments) {
		var overlays = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-overlays.json";
				if( overlays.loaded.length > 0 ) {
					deferral.resolve(overlays);
				} else {
					$http.get(source)
					.success( function(data) {
						overlays.loaded = data;
						// overlays.current.index = overlays.loaded.length - 1;
						console.log("Overlays (" + data.length + ") loaded from " + source);
						deferral.resolve(overlays);
					});
				}
				return deferral.promise;
			},
			import: function(data) {
				/* CHECK IMPORT IS VALID */
				var rawdata = JSON.parse(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.overlays[uuid]) {
					// determine format eg table rows of items, columns of properties
					// user select colmns to use - which rows: title, (meta,) start, end, data
					// test all
					var newOverlay = rawdata;
					this.add(newOverlay);
					console.log("New overlay \"" + overlays.loaded[datasets.current.index].object.title + "\" created from imported data.");
				// }
				console.log(overlays.loaded[overlays.current.index]);
				return overlays;
			},
			aquire: function(data) {
				// d3Service.d3().then(function(d3) {
					// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
					var filion = true;
					var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
					var colorRange = d3.scale.category20();

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
					var firstDataRow = 1; // marie's data = 1
					var startColumn = 2; // marie's data = 0
					var endColumn = 3; // marie's data = 1
					var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
					var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
					var type, format, stepType;
					if (step == step2) {
						type = "wiggle_0";
						format = "fixed";
						stepType = "fixed";
					} else {
						type = "bedgraph";
						format = "variable";
						stepType = "variable";
					}
					for (var i = data[headerRow].length - 1; i >= 4; i--) { // i >= to skip, first columns
						var colored;
						if (filion) {
							colored = colorFilion[i-4];
						} else {
							colored = colorRange(i);
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
									"format" : format,
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
								"palette" : [colored,"#cccccc"],
								"data" : [],
								"colors" : {}
							}
						);
						// convert column data to array
						for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first row
							if (filion) {
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
				// }); // End d3 Service
			},
			// aquireOld: function(data) {
			// 	// d3Service.d3().then(function(d3) {
			// 		// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
			// 		var colorRange = d3.scale.category20();
			// 		// columns to overlays
			// 		// skip row 1 = headers ie. length - 2
			// 		// skip colums 1 and 2 = coords ie. length - 3
			// 		var acquiredOverlays = [];
			// 		var step = data[1][1] - data[1][0] + 1; // get step from chromEnd to chromStart
			// 		for (var i = data[0].length - 1; i >= 2; i--) { // i >= 2 to skip 2 first columns
			// 			acquiredOverlays.unshift(
			// 				{
			// 					"metadata": {
			// 						"version" : 1.0,
			// 						"type" : "overlay",
			// 						"generator" : "TADkit"
			// 					},
			// 					"object" : {
			// 						"uuid" : uuid4.generate(),
			// 						"id" : data[0][i],
			// 						"title" : data[0][i],
			// 						"source" : "Research output",
			// 						"url" : "local",
			// 						"description" : "center_label", //also BigWig description (track title): "User Supplied Track"
			// 						"type" : "wiggle_0", //also BigWig type
			// 						"format" : "bigwig-fixed",
			// 						"components" : 2,
			// 						"name" : data[0][i], //BigWig: "User Track"
			// 						"visibility" : "full", //BigWig: "full", "dense" or "hide"
			// 						"color" : colorRange(i), // random from D3.js function. NOTE: convert to RGB for BigWig: eg. 255,255,255
			// 						"altColor" : "#cccccc", // light grey gives best 3D render vis. NOTE: convert to RGB for BigWig: eg. 128,128,128
			// 						"priority" : "100", //BigWig: 100
			// 						"stepType" : "fixed", //BigWig: "variable" or "fixed"
			// 						"chrom" : "", //BigWig: derive from dataset...???
			// 						"start" : data[1][0], //BigWig
			// 						"step" : step, //BigWig
			// 						"state" : {
			// 							"index" : 0, // make real index???
			// 							"overlaid" : false
			// 						}
			// 					},
			// 					"palette" : [colorRange(i),"#cccccc"],
			// 					"data" : [],
			// 					"colors" : {}
			// 				}
			// 			);
			// 			// convert column data to array
			// 			for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first row
			// 				acquiredOverlays[0].data.unshift(data[j][i]);
			// 			}
			// 		}
			// 		return acquiredOverlays;
			// 	// }); // End d3 Service
			// },
			add: function(details) {
				details = details || ["default","overlay","name","www","describe","json","0",[1]];
				var overlay = {
					metadata : {
						version : 1.0,
						type : "overlay",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						source : details[2],
						url : details[3],
						description : details[4],
						format : details[5],
						components : details[6]
					},
					data : details[7]
				};
				overlays.loaded.push(overlay);
				overlays.current.index = overlays.loaded.length - 1;
				console.log("Overlay \"" + overlays.loaded[datasets.current.index].object.title + "\" loaded from file.");
				return overlays;
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
			segment: function() {
				var settings = Settings.get();
				var currentDataset = Datasets.getDataset();
					var chromosomeIndex = 0;
					if (currentDataset.object.chromosomeIndex) {
						chromosomeIndex = datasetObject.chromosomeIndex;	
					}
				var chromStart = currentDataset.object.chromStart[chromosomeIndex];
				var currentStoryboards = Storyboards.getStoryboard();
				var particlesCount = currentDataset.models[0].data.length / currentDataset.object.components;
				var particleSegments = currentStoryboards.components[0].view.settings.chromatin.particleSegments;
				var segmentsCount = particlesCount * particleSegments;
				var segmentLength = currentDataset.object.resolution / particleSegments; // base pairs


				var self = this; // SYNChronous functions...
				angular.forEach(overlays.loaded, function(overlay, key) {

					// check if colors already exist (for chromatin as principal set)
					if (!overlay.colors.chromatin || (overlay.colors.chromatin && segmentsCount != settings.segmentsCount) ) {

						// run function based on object type
						var type = overlay.object.type;
						var format = overlay.object.format;
						var meshEdgesCount = particlesCount * particlesCount;
						if (type == "gradient" && format == "hex") {
							// palette must contain 2 hex values
							overlay.colors.particles = Segments.gradientHCL(overlay, particlesCount);
							overlay.colors.chromatin = Segments.gradientHCL(overlay, segmentsCount);
							overlay.colors.mesh = []; // relevance???
						} else if (type == "wiggle_0" && format == "fixed") {
							// OJO! create additional option for format = "bigwig-variable"
							overlay.colors.particles = Segments.bicolor(overlay, particlesCount);
							overlay.colors.chromatin = Segments.bicolor(overlay, segmentsCount);
							overlay.colors.mesh = []; // relevance???
						} else if (type == "wiggle_0" && format == "variable") {
							// To Do...
						} else if (type == "bedgraph") {
							console.log(overlay);
							overlay.colors.particles = Segments.bicolorVariable(overlay, chromStart, particlesCount, 1);
							overlay.colors.chromatin = Segments.bicolorVariable(overlay, chromStart, segmentsCount, segmentLength);
							overlay.colors.mesh = []; // relevance???
						} else if (type == "matrix") {
							// Distances are per edge so just convert to color
							overlay.colors.particlesMatrix = Segments.matrix(overlay, 1); // ie. per particle
							overlay.colors.chromatinMatrix = Segments.matrix(overlay, particleSegments);
							overlay.colors.meshMatrix = overlay.colors.particlesMatrix; // ie. also color mesh edges by matrix
							self.at(1, particlesCount, particleSegments);
						} else if (type == "ensembl" && format == "json") {
							// data must have .start and .end
							overlay.colors.particles = Segments.features(overlay, chromStart, particlesCount, 1, settings.featureTypes.gene);
							overlay.colors.chromatin = Segments.features(overlay, chromStart, segmentsCount, segmentLength, settings.featureTypes.gene);
							overlay.colors.mesh = []; // relevance???
						}

					} else {
						// already segmented
						console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
					}


				});
				return overlays;
			},
			at: function(currentParticle) {
				var settings = Settings.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var type = overlay.object.type;
					if (type == "matrix") {
						var particleStart = (currentParticle - 1) * settings.particlesCount;
						var particleEnd = currentParticle * settings.particlesCount;
						var chromatinStart = particleStart * settings.particleSegments;
						var chromatinEnd = particleEnd * settings.particleSegments;
						// console.log(overlay);
						overlay.colors.particles = overlay.colors.particlesMatrix.slice(particleStart, particleEnd);
						overlay.colors.chromatin = overlay.colors.chromatinMatrix.slice(chromatinStart, chromatinEnd);
						overlay.colors.mesh = overlay.colors.meshMatrix.slice(particleStart, particleEnd);
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
			},
			getComponents: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var components = overlays.loaded[index].object.components;
				return components;
			}
		};
	}
})();