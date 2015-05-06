(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, d3Service) {
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
					var colorRange = d3.scale.category20();
					// columns to overlays
					// skip row 1 = headers ie. length - 2
					// skip colums 1 and 2 = coords ie. length - 3
					var aquiredOverlays = [];
					var step = data[1][1] - data[1][0] + 1;
					for (var i = data[0].length - 1; i >= 2; i--) { // i >= 2 to skip 2 first columns
						aquiredOverlays.unshift(
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : data[0][i],
									"title": data[0][i],
									"source" : "Research output",
									"url" : "local",
									"description": "center_label", //also BigWig description (track title): "User Supplied Track"
									"type": "wiggle_0", //also BigWig type
									"format" : "bigwig",
									"components" : 2,
									"name": data[0][i], //BigWig: "User Track"
									"visibility": "full", //BigWig: "full", "dense" or "hide"
									"color": colorRange(i), // red NOTE: convert to RGB for BigWig: eg. 255,255,255
									"altColor": "#0000ff", // blue NOTE: convert to RGB for BigWig: eg. 128,128,128
									"priority": "100", //BigWig: 100
									"stepType": "fixed", //BigWig: "variable" or "fixed"
									"chrom": "", //BigWig: derive from dataset...???
									"start": data[1][0], //BigWig
									"step": step, //BigWig
									"state": {
										"index": 0, // make real index???
										"overlaid": false
									}
								},
								"data": []
							}
						);
						// convert column data to array
						for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first row
							aquiredOverlays[0].data.unshift(data[j][i]);
						}
					}
					return aquiredOverlays;
				// }); // End d3 Service
			},
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
			// setOverlay: function(data, segments, particleSegments) {
			// 	var colors = [];
			// 	for (var i=0; i<segments; i++) {
			// 		var particle = Math.floor(i/particleSegments);
			// 		var color = data[particle];
			// 		colors.push(color);
			// 	}
			// 	overlays.loaded.push({"id":"newoverlay","data":data,"colors":colors});
			// 	overlays.current = overlays.loaded.length - 1;
			// 	return overlays.loaded[overlays.current];
			// },
			segmentOverlays: function(startCoord, segmentsCount, segmentLength, featureTypes) {
				featureTypes = featureTypes || [];
				var self = this; // SYNChronous functions...
				angular.forEach(overlays.loaded, function(overlay, key) {
					if (!overlay.colors || overlay.colors.length === 0) {
						// run function based on object type
						var type = overlay.object.type;
						var format = overlay.object.format;
						// convert string directly to function???
						// var typeFunction = "segment" + type[0].toUpperCase() + type.substring(1);
						var colors = [];
						if (type == "gradient" && format == "hex") {
							// data must contain 2 hex values
							colors = self.segmentGradientHCL(overlay.data, segmentsCount);
						} else if (type == "wiggle_0" && format == "bigwig") {
							// colors derived from BigWig color and altColor
							// featureTypes == single hex for use as color
							var featureColor = overlay.object.color;
							colors = self.segmentLinear(overlay.data, startCoord, segmentsCount, segmentLength, featureColor);
						} else if (type == "linear" && format == "seq") {
							// data must contain array of indexs
							colors = self.segmentLinear(overlay.data, startCoord, segmentsCount, segmentLength);
						} else if (type == "ensembl" && format == "json") {
							// data must have .start and .end
							featureTypes = featureTypes.gene; // TO DO: MAKE FUNCTION MORE GENERIC... ie. not just "gene"
							colors = self.segmentFeatures(overlay.data, startCoord, segmentsCount, segmentLength, featureTypes);
						}
						overlay.colors = colors;
					} else {					// already segmented --> ADD REsegement option...
						console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
					}
				});
				return overlays;
			},
			segmentGradientHCL: function(data, segmentsCount) {
				// d3Service.d3().then(function(d3) {
					// Using D3 HCL for correct perceptual model
					// Data is an array of 2 hex colors eg. ff0000
					// Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
					// Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
					var gradient = [];
					var hexStart = data[0];
					var hexEnd = data[1];

					for (var i = segmentsCount - 1; i >= 0; i--) {
						var step = i / segmentsCount; // This should be between 0 and 1
						var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
						gradient.push(hex);
					}
					return gradient;
				// });
			},
			segmentGradientLinear: function(rangeColors, segmentsCount) {
				// data is an array of 2 hex colors eg. ff0000
				// output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
				var gradient = [];
				var hexStart = "0x" + rangeColors[0].substring(1);
				var hexEnd = "0x" + rangeColors[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;

					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;

					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;

				for (var i = segmentsCount - 1; i >= 0; i--) {

					step = i / segmentsCount; // This should be between 0 and 1

					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);

					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},
			segmentLinear: function(overlayData, startCoord, segmentsCount, segmentLength, featureColor) {
				var defaultColor = "#cccccc";
				var colors = [];
				for(var i=0; i<segmentsCount; i++){
						var segmentColor;
						if (overlayData[i] === 1) {
							segmentColor = featureColor;
						} else {
							segmentColor = defaultColor;
						}
					colors.push(segmentColor);
				}
				return colors;
			},
			segmentFeatures: function(features, startCoord, segmentsCount, segmentLength, featureTypes) {
				var colors = [];

				for(var i=0; i<segmentsCount; i++){

					var featuresPresent = [];
					var segmentLower = startCoord + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var genesCount = features.length;
					var hex = "cccccc"; // Base color - ie if none found
					var color = "#" + hex; //parseInt(hex,16);

					// For every gene [j]...
					for(var j=0; j<genesCount; j++){
						var start = features[j].start;
						var end = features[j].end;
						var inSegments = [];
						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							// console.log("Yes gene " + features[j].external_name + "("+j+") in fragment " + i );
							inSegments.push(i);
							var featureTypeKey = "biotype";
							var dominantFeatureType = "protein_coding";
							if (featuresPresent.length > 0) {
								// Simple weight - give preference to smaller segments
								if ( featuresPresent[0] == dominantFeatureType ) {
									// if already contains protein_coding, replace with...
									featuresPresent[0] = features[j][featureTypeKey].toLowerCase();
								} else {
									featuresPresent.push(features[j][featureTypeKey].toLowerCase());
								}
							} else {
								featuresPresent.push(features[j][featureTypeKey].toLowerCase());							
							}
						} else {
							// if (i==3) console.log("No features in fragment " + i );
							// if (j == 0) console.log( JSON.stringify(segmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(segmentUpper)+", "+JSON.stringify(end) );
						}
						// console.log(insegments);
						features[j].inSegments = inSegments;
					}
					for(var k=0; k<featuresPresent.length; k++){
						var feature = featuresPresent[0];
						if (feature in featureTypes) {
							hex = featureTypes[feature].match(/[a-f0-9]{6}/gi);
							color = "#" + hex; //parseInt(hex,16);
						} else {
							hex = "110100";
							color = "#" + hex; //parseInt(hex,16);
						}
					}
					colors.push(color);
				}
				// console.log(colors);
				return colors;
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