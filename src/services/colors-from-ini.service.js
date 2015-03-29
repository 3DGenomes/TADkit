(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('colorsFromINI', colorsFromINI);

	function colorsFromINI(colorConvert) {

		return {
			parse: function(data) {
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var value = {};
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
							var hexColor = colorConvert.nameToHex( match[2] );
							value[section][match[1]] = hexColor;
						}else{
							value[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						value[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return value;
			}
		};
	}
})();
