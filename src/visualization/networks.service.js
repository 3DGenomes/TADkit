(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name visualization.service:Networks
	 * @description
	 * Load app and initialize.
	 *
	 */
	angular
		.module('visualization')
		.factory('Networks', Networks);

	function Networks() {
		return {
			
			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#lineSegmentsRGB
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates an Array of RGB pairs to match Vertex pairs.
			 * eg. [R1,G1,B1,R2,G2,B2,R1,G1,B1,R3,G3,B3,...Rn,Gn,Bn,Rm,Gm,Bm]
			 * such that all color pairs are represented uniquely
			 * ie. one half of matrix where array length = (n^2-n)/2
			 * eg.  1 2 3 4
			 *      1  x x x  ==  1-2 1-3 1-4    3
			 *      2    x x  ==  2-3 2-4      + 2
			 *      3      x  ==  3-4          + 1
			 *      4         ==  ((4*4)-4)*0.5  = 6 pairs of colors
			 * Explanation: Networks can be visualized with THREE.LineSegments
			 * from THREE.BufferGeometry which stores Arrays of Vertex pairs.
			 *
			 * @param {Array} overlay An array of features colors eg. restraints
			 * @param {Array} edgeCount An array of color RGB Pairs to match Vertex Pairs
			 *
			 */
			lineSegmentsRGB: function(overlay, edgeCount) {
				var self = this;
				var featuresCount = overlay.data.length;
				var colorPairs = new Float32Array(edgeCount * 6); // ie. * 2 (vertices) * 3 (RGB)
				for (var i = 0; i < featuresCount; i++) {
					var particle1 = overlay.data[i][0];
					var particle2 = overlay.data[i][1];
					var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount) * 6;
					var RGB = {"r":0.5,"g":0.5,"b":0.5};
					if (overlay.object.id == "restraints"){
						var restraintsColors = {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
						RGB = self.getFeatureRGB(overlay.data[i][2], restraintsColors);
					}
					// vertex 1
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b; pairIndex++;
					// vertex 2
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b;
				}
				colorPairs.name = "Network lineSegments RGB";
				return colorPairs;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#getFeatureRGB
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates a RGB color for a given code.
			 *
			 * @param {sting} code A code eg. [H | L | U | C]
			 * @param {Object} colors An Object relating keys to CSS/hex colors
			 * eg. {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
			 *
			 */
			getFeatureRGB: function(code, colors) {
				colors = colors || {"0":"#000000"};
				var RGB;
				angular.forEach(colors, function(color, key) {
					if (code == key) {
						RGB = new THREE.Color(color);
					}
				});
				return RGB;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#lineSegmentsAlpha
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates an Array of pairs of values (0.0-1.0) to match Vertex pairs.
			 *
			 * @param {Array} overlay An array of features colors eg. restraints
			 * @param {Array} edgeCount An array of color RGB Pairs to match Vertex Pairs
			 * @returns {Array} A Float32 Array of alpha pairs.
			 *
			 */
			lineSegmentsAlpha: function(overlay, edgeCount) {
				var self = this;
				var alphaPairs = new Float32Array(edgeCount * 2); // ie. * 2 (vertices)
				var defaultAlpha = 0.0;
				for (var h = alphaPairs.length - 1; h >= 0; h--) {
					alphaPairs[h] = defaultAlpha;
				}
				if (overlay.data) {
					var featuresCount = overlay.data.length;
					for (var i = 0; i < featuresCount; i++) {
						var particle1 = overlay.data[i][0];
						var particle2 = overlay.data[i][1];
						var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount);
						var alpha = (overlay.data[i][3] * overlay.data[i][3]) / 5;
						// if (overlay.data[i][2] == ("U"||"C")) alpha = 0.0;
						alphaPairs[pairIndex] = alpha; pairIndex++;
						alphaPairs[pairIndex] = alpha;
					}
				}
				alphaPairs.name = "Network lineSegments Alphas";
				return alphaPairs;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#getMatrixIndex
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Derives the Array index for a given position in a Matrix.
			 *
			 * @param {number} row Row number in Matrix
			 * @param {number} col Column number in Matrix
			 * @param {number} size Matrix size == array.length
			 * @returns {number} Index.
			 *
			 */
			getMatrixIndex: function(row, col, size) {
				var index = 0;
				var sigma = row - 1;
				for (var i = 0; i <= sigma; i++){
					index += (size - (size - i));
				}
				index += (col - row) - 1;
				return index;
			}
		};
	}
})();