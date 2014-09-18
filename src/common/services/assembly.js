/*global TADkit */

TADkit.service('Assembly', ['$q', '$http', 'ColorsFromINI', function($q, $http, ColorsFromINI) {
	"use strict";
	var ensemblRoot = "http://rest.ensembl.org/";
	var assembly = {};
	var biotypeColors = {};
	return {
		loadInfoAssembly: function(species) {
			var deferral = $q.defer();
			// $http.get('assets/json/drosophila_melanogaster-assembly.json'). // OFFLINE
			$http.get(ensemblRoot + "info/assembly/" + species + "?content-type=application/json").
			success(function(data){
				assembly = data;
				console.log("Assembly Info for " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getAssembly: function () {
			return assembly;
		},
		loadInfoBiotypes: function(species) {
			var deferral = $q.defer();
			// $http.get('assets/json/drosophila_melanogaster-biotypes.json'). // OFFLINE
			$http.get(ensemblRoot + "info/biotypes/" + species + "?content-type=application/json").
			success(function(data){
				console.log("Biotypes for " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		loadBiotypeColors: function() {
			var deferral = $q.defer();
			// $http.get('assets/json/ensembl-webcode-COLOUR.ini'). // OFFLINE
			// $http.get("https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini"). // NOT PERMITTED
			$http.get("https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini").
			success(function(data){
				var iniData = ColorsFromINI.parse(data);
				biotypeColors = iniData;
				console.log("Ensembl webcode biotype colors retrieved Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getBiotypeColors: function () {
			return biotypeColors;
		},
		getRegionBiotypes: function (genes) {
			// GET BIOTYPES AND SET BIOTYPE COLORS
			var TADBiotypes = [];
			var biotypeColors = [
				// other: 16753920
				// protein_alignment: 255
				// protein_coding: 12009742
				// pseudogene: 6710886
			];
			var TADBiotypesLookup = {};
			for (var item, i = 0; item == genes[i++];) {
			  var TADGeneBiotype = item.biotype;
			  if (!(TADGeneBiotype in TADBiotypesLookup)) {
				TADBiotypesLookup[TADGeneBiotype] = 1;
				TADBiotypes.push(TADGeneBiotype);
			  }
			}
			console.log("TAD Biotypes");
			console.log(TADBiotypes);
			var totalTADBiotypes = TADBiotypes.length;
			console.log("Total TAD Biotypes: %s", totalTADBiotypes);
		}
	};
}]);

TADkit.service('ColorsFromINI', ['ConvertColors', function (ConvertColors) {
	"use strict";
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
						var hexColor = ConvertColors.nameToHex( match[2] );
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
}]);
