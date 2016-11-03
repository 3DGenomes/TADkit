(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name bioinformatics.service:EnsemblColors
	 * @description
	 * Import and manage Genomic feature colors (eg. genes) from Ensembl etc.
	 *
	 * @requires ONLINE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('bioinformatics')
		.factory('EnsemblColors', EnsemblColors);

	function EnsemblColors(ONLINE, $log, $q, $http) {
		var colors = {};

		return {
			
			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#load
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Load feature colors as used in Emsembl.
			 * Derived from remote INI or local JSON
			 *
			 * @return {Object} colorData List of colors categorized by feature object type.
			 */
			load: function() {
				var self = this;
				var deferred = $q.defer();
				var dataUrl;
				if (ONLINE) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-colors.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var colorData;
					if (ONLINE) {
						colorData = self.colorsFromIni(data);
					} else {
						colorData = data;
					}
					colors = colorData;
					$log.debug("Ensembl webcode biotype colors retrieved Ensembl.");
					deferred.resolve(colorData);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#get
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Get colors ().
			 *
			 * @param {number} ref Reference to EnsemblColors object property.
			 * @return {colors} All colors or speccific from ref.
			 */
			get: function(ref) {
				if (!ref) {
					return colors;
				} else {
					return colors[ref];
				}
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#colorsFromIni
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Extract colors from (Ensembl) INI files
			 * For example:
			 * @link https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			 * @link https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			 * or in TADkit:
			 * @link assets/defaults/ensembl-webcode-COLOUR.ini
			 *
			 * @param {number} text data.
			 * @return {Object} Generate 'colors list' Object from INI data.
			 */
			colorsFromIni: function(data) {
				var self = this;
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
							var hexColor = self.nameToHex( match[2] );
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
			}

		};
	}
})();