(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Color', Color);

	function Color(ColorConvert) {
		// NOTE Optionally these could all be deprecated
		//      in favor of native JS, THREE or D3 functions.
		//          (OR Use this as a single source for all color manipulation
		//           whatever the external api, to ensure single load access.)
		//      Those already UNUSED are marked as such.

		return {
			// Extract colors from (Ensembl) INI files
			// eg. https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR in TADkit: assets/defaults/ensembl-webcode-COLOUR.ini
			RGBObjectFromHex: function(hex) {
				var r = ColorConvert.hexToR(hex);
				var g = ColorConvert.hexToG(hex);
				var b = ColorConvert.hexToB(hex);
				var RGBObject = {"r":r,"g":g,"b":b};
				return RGBObject;
			},
			// Generate 'colors list' Object from INI data
			colorsFromIni: function(data) {
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var colors = {};
				var lines = data.split(/\r\n|\r|\n/);
				var section = null;
				lines.forEach(function(line){
					if(regex.comment.test(line) || line === ""){
						return;
					}
					var match;
					if(regex.param.test(line)){
						match = line.match(regex.param);
						if(section){
							var hexColor = ColorConvert.nameToHex( match[2] );
							colors[section][match[1]] = hexColor;
						}else{
							colors[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						colors[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return colors;
			},

			// UNUSED: Generate THREE colors from array of arrayed RGB decimal colorss (0.0-1.0)
			//   eg. [[r,g,b],[r,g,b],[r,g,b],...]
			colorsFromTriplets: function(data) {
				var offset = 0, rgb, color,
					 colors = [];
				var totalcolorss = data.length;
				while ( offset < totalcolorss ) {
					rgb = data[offset];
					color =  new THREE.Color(rgb[0], rgb[1], rgb[2]);
					colors.push(color);
					offset ++;
				}
				return colors;
			},
			// Generate THREE colors from array of RGB decimal colorss (0.0-1.0)
			//  eg. [r,g,b,r,g,b,r,g,b,...]
			colorsFromArray: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i=i-1) {
					var b = data[i]/255.0;
					i = i-1;
					var g = data[i]/255.0;
					i = i-1;
					var r = data[i]/255.0;
					var color =  new THREE.Color(r,g,b);
					colors.unshift(color);
				}
				return colors;
			},
			// Generate THREE colors from array of RGB hex values (#000000-#ffffff)
			//  eg. [#rrggbb,#rrggbb,#rrggbb,...]
			colorsFromHex: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i--) {
					var color =  new THREE.Color(data[i]);
					colors.unshift(color);
				}
				return colors;
			},
			// Generate THREE Vertex Colors from array of THREE colors
			vertexColorsFromColors: function(colors) {
				// Buffer Geomptry to be used as LinePieces so
				// colors stored as one per data-position-pair
				// so the array needs an RGB (*3) for each pair (*2)
				// ie. each distance needs to be replicated 6 times
				var vertexColors = new Float32Array( colors.length * 6 );
				for (var i = colors.length - 1; i >= 0; i--) {
					var pos = i * 6;
					var RGB = colors[i];
					vertexColors[pos  ] = RGB.r;
					vertexColors[pos+1] = RGB.g;
					vertexColors[pos+2] = RGB.b;
					vertexColors[pos+3] = RGB.r;
					vertexColors[pos+4] = RGB.g;
					vertexColors[pos+5] = RGB.b;
				}
				return vertexColors;
			},
			// Generate an Array of a specific number of random colors
			getRandomColors: function(count) {
				var randomColors = [];
				for(var i=0; i<count; i++){
					var color = "#" + Math.floor(Math.random()*16777215).toString(16);
					randomColors.push(color);
				}
				return randomColors;
			},
			// Generate an Array of a specific number of random colors
			getRandomRGB: function(count) {
				var randomRGB = [];
				for(var i=0; i<count; i++){
					var color = "#" + Math.floor(Math.random()*16777215).toString(16);
					var RGB = new THREE.Color(color);
					randomRGB.push(RGB);
				}
				return randomRGB;
			},
			// UNUSED: Generate a math linear gradient between to hex colors values
			//     Note this is NOT a L*a*b or HCL correct gradient
			//     See Mike Bostock's D3 comments: http://bl.ocks.org/mbostock/3014589
			getGradientColor: function(start_color, end_color, percent) {
				// strip the leading # if it's there
				start_color = start_color.replace(/^\s*#|\s*$/g, '');
				end_color = end_color.replace(/^\s*#|\s*$/g, '');

				// convert 3 char codes --> 6, eg. `E0F` --> `EE00FF`
				if(start_color.length == 3){
					start_color = start_color.replace(/(.)/g, '$1$1');
				}

				if(end_color.length == 3){
					end_color = end_color.replace(/(.)/g, '$1$1');
				}

				// get colors
				var start_red = parseInt(start_color.substr(0, 2), 16),
					start_green = parseInt(start_color.substr(2, 2), 16),
					start_blue = parseInt(start_color.substr(4, 2), 16);

				var end_red = parseInt(end_color.substr(0, 2), 16),
					end_green = parseInt(end_color.substr(2, 2), 16),
					end_blue = parseInt(end_color.substr(4, 2), 16);

				// calculate new color
				var diff_red = end_red - start_red;
				var diff_green = end_green - start_green;
				var diff_blue = end_blue - start_blue;

				diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
				diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
				diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

				// ensure 2 digits by color
				if( diff_red.length == 1 )
					diff_red = '0' + diff_red;

				if( diff_green.length == 1 )
					diff_green = '0' + diff_green;

				if( diff_blue.length == 1 )
					diff_blue = '0' + diff_blue;

				return '#' + diff_red + diff_green + diff_blue;
			}

		};
	}
})();