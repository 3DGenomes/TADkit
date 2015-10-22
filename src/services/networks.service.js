(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Networks', Networks);

	function Networks(Color) {
		return {
			lineSegmentsRGB: function(overlay, edgeCount) {
				// from an array of features colors eg. restraints
				// from an array of color RGB Pairs to match Vertex Pairs
				// eg. [R1,G1,B1,R2,G2,B2,R1,G1,B1,R3,G3,B3,...Rn,Gn,Bn,Rm,Gm,Bm]
				// such that all color pairs are represented uniquely
				// ie. one half of matrix where array length = (n^2-n)/2
				// eg.  1 2 3 4
				//     1  x x x  ==  1-2 1-3 1-4    3
				//     2    x x  ==  2-3 2-4      + 2
				//     3      x  ==  3-4          + 1
				//     4         ==  ((4*4)-4)*0.5  = 6 pairs of colors
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
			getMatrixIndex: function(row, col, size) {
				// Matrix size == array.length
				var index = 0;
				var sigma = row - 1;
				for (var i = 0; i <= sigma; i++){
					index += (size - (size - i));
				}
				index += (col - row) - 1;
				return index;
			},
			getFeatureRGB: function(code, colors) {
				colors = colors || {"0":"#000000"};
				var RGB;
				angular.forEach(colors, function(color, key) {
					if (code == key) {
						RGB = Color.RGBObjectFromHex(color);
					}
				});
				return RGB;
			}
		};
	}
})();