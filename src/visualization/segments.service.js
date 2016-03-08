(function() {
	'use strict';
	angular
		.module('visualization')
		.factory('Segments', Segments);

	/**
	 * @ngdoc service
	 * @name visualization.service:Segments
	 * @description
	 * Methods for generating Arrays of colors.
	 *
	 * @requires VERBOSE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires generic.Color
	 *
	 */
	function Segments(VERBOSE, $log, Color) {
		return {

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#gradientHCL
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors ranging between 2 colors.
			 * Using D3 HCL for correct perceptual model
			 * Data is an array of 2 hex colors eg. ff0000
			 * Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
			 * Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			gradientHCL: function(overlay, count) {
				var gradient = [];
				var hexStart = overlay.palette[0];
				var hexEnd = overlay.palette[1];

				for (var i = count - 1; i >= 0; i--) {
					var step = i / count; // This should be between 0 and 1
					var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
					gradient.push(hex);
				}
				return gradient;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#gradientComponentRGB
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description UNUSED - 
			 * where overlay.palette is an array of 2 hex colors eg. ["#ff0000","#0000ff"]
			 * output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			gradientComponentRGB: function(overlay, count) {
				var gradient = [];
				// convert "#" to "0x" for following manipulation
				var hexStart = "0x" + overlay.palette[0].substring(1);
				var hexEnd = "0x" + overlay.palette[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;
					// convert hexStart to RGB components (0.0-255.0)
					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;
					// convert hexEnd to RGB components (0.0-255.0)
					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;
				// generate gradient as array of RGB component triplets
				for (var i = count - 1; i >= 0; i--) {
					step = i / count; // This should be between 0 and 1
					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);
					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#bicolor
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors ranging between 2 colors.
			 * if palette is not an array of hex colors then:
			 * colors derived from BigWig color and altColor
			 * featureTypes == single hex for use as color 
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			bicolor: function(overlay, count) {
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for(var i = 0; i < count; i++){
						var color;
						if (overlay.data[i] === 1) {
							color = featureColor;
						} else {
							color = defaultColor;
						}
					colors.push(color);
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#matrix
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors from a matrix of values.
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			matrix: function(overlay, count) {
				// where palette is array of hex colors
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for (var i = overlay.data.length - 1; i >= 0; i--) {
					var read = overlay.data[i];
					var intensity = 1 - (read * read);
					var hex = d3.interpolateHsl(featureColor, defaultColor)(intensity);
					for(var j = 0; j < count; j++){
						colors.push(hex);
					}
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#bicolorVariable
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} segmentStart Start of segment.
			 * @param {number} segmentsCount Number of segments.
			 * @param {number} segmentLength Length of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			bicolorVariable: function(overlay, segmentStart, segmentsCount, segmentLength) {
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];

				var features = overlay.data;
				var colors = [];
				for(var i=0; i < segmentsCount; i++){
					var segmentColor = defaultColor;
					var segmentLower = segmentStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;

						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (features[j].read === 1) {
								segmentColor = featureColor;
							} else {
								segmentColor = defaultColor;
							}
						}
					}
					colors.push(segmentColor);
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#featureGraph
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			featureGraph: function(overlay, count) {
				// where palette is array of hex colors
				var featureColor = "#ff0000";
				var defaultColor = "#000000";
				var segmentedColors = this.gradientHCL(overlay, count);
				var overlayColors = Color.THREEColorsFromHex(segmentedColors);
				var vertexColors = Color.vertexColorsFromTHREEColors(overlayColors);
				return vertexColors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#features
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} overlay A collection of data.
			 * @param {number} segmentStart Start of segment.
			 * @param {number} segmentsCount Number of segments.
			 * @param {number} segmentLength Length of segments.
			 * @param {Object} featureTypes Types of features.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			features: function(overlay, segmentStart, segmentsCount, segmentLength, featureTypes) {
				var features = overlay.data;
				var colors = [];

				for(var i=0; i < segmentsCount; i++){

					var featuresPresent = []; 
					var segmentLower = segmentStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;
					var hex = "cccccc"; // Base color - ie if none found
					var color = "#" + hex; //parseInt(hex,16);

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;
						var inSegments = [];
						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (VERBOSE) $log.debug("Feature " + features[j].external_name + "("+j+") in fragment " + i );
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
							if (VERBOSE && i === 3) $log.debug("No features in fragment " + i );
							if (VERBOSE && j === 0) $log.debug( JSON.stringify(segmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(segmentUpper)+", "+JSON.stringify(end) );
						}
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
				return colors;
			}
		};
	}
})();