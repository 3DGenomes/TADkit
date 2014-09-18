/*global angular */

// ANGULAR APP
var TADkit = angular.module('TADkit',['ngRoute', 'mm.foundation']);

	TADkit.config(function($routeProvider){
		"use strict";
		$routeProvider
		.when('/',
		{
			controller:'DashboardCtrl',
			templateUrl:'common/dashboard.html',
			resolve:{ 
		        'loadTADData':function(loadTAD){
		          return loadTAD.promise;
				}
			}
		});
	});

	TADkit.controller('TopbarCtrl', ['$rootScope', '$scope', function($rootScope, $scope){"use strict";}]);

	TADkit.controller('DashboardCtrl',['$rootScope', '$scope', 'Settings', 'TAD', 'Assembly', 'Genes', 'Proteins', 'Contacts', function($rootScope, $scope, Settings, TAD, Assembly, Genes, Proteins, Contacts){
		"use strict";
		
		$scope.assembly = Assembly.getAssembly();
		var assemblyLength = 0;
		var regions = $scope.assembly.top_level_region;
		for (var length in regions) {
			if (regions.hasOwnProperty(length)) {
				for (var i = 0, j = regions.length; i < j; i++) {
					assemblyLength += regions[i].length;
				}
			}
		}
		$scope.assemblyLength = assemblyLength;
		console.log("Assembly: " + parseInt( $scope.assemblyLength ).toLocaleString() + " BP");
		
		var particlesCount = TAD.getParticlesCount();
		$scope.particlesCount = particlesCount;
		// console.log($scope.particlesCount);

		// console.log(particles);
		var segments = TAD.getSegments();
		$scope.segments = segments;
		// console.log(segments);
		
		var genes = Genes.getGenes();
		// console.log(genes);
		
		var biotypes = Assembly.getBiotypeColors().gene;
		// console.log(biotypes);
		// console.log(JSON.stringify(biotypes));
		
		var proteins = Proteins.getProteins();
		// $scope.proteins = proteins;
		// console.log($scope.proteins);

		var contacts = Contacts.getContacts();
		// $scope.contacts = contacts;
		// console.log($scope.contacts);

		// Count fragments
		var fragmentCount = particlesCount * segments;
		$rootScope.fragments = fragmentCount;
		// console.log($rootScope.fragments);

		// Set initial position
		var position = parseInt( fragmentCount * 0.5 );
		$scope.slider = {};
		$scope.slider.position = position;
		// console.log($scope.slider.position);
		
		var TADMetadata = TAD.getMetadata();
		// console.log(TADMetadata);
		var TADStart = TADMetadata.start;
		// var fragmentLength = TAD.getMetadata().lengthBP / fragmentCount;
		var fragmentLength = TADMetadata.resolution / segments; // base pairs
		// console.log(fragmentLength);

		var focusStart = TADMetadata.start;
		$scope.focusStart = focusStart;

		var focusEnd = TADMetadata.end;
		$scope.focusEnd = focusEnd;
		
		$scope.colors = Genes.getColors( genes, biotypes, fragmentCount, TADStart, fragmentLength );
		$scope.colorsGenes = Genes.getColors( genes, biotypes, fragmentCount, TADStart, fragmentLength );
		$scope.colorsContacts = Contacts.getColors( contacts, $scope.slider.position, particlesCount, segments );
		$scope.colorsHP1 = Proteins.getColors( proteins, "HP1", fragmentCount, TADStart, fragmentLength );
		$scope.colorsBRM = Proteins.getColors( proteins, "BRM", fragmentCount, TADStart, fragmentLength );
		$scope.colorsMRG15 = Proteins.getColors( proteins, "MRG15", fragmentCount, TADStart, fragmentLength );
		$scope.colorsPC = Proteins.getColors( proteins, "PC", fragmentCount, TADStart, fragmentLength );
		$scope.colorsH1 = Proteins.getColors( proteins, "H1", fragmentCount, TADStart, fragmentLength );
		// $scope.colors = Genes.getRandomColors(fragmentCount);

		// setInterval(
		// 	function() {
		// 		$scope.colors = Genes.getRandomColors(fragmentCount);
		// 		console.log($scope.colors);
		// 	}, 3000);
		
		var species = TAD.getSpecies();
		$rootScope.species = { text: species };
		var slice = TAD.getSlice();
		$rootScope.slice = { text: slice };
		var identifier = TADMetadata.identifier;
		$rootScope.identifier = { text: identifier };
		var article = TADMetadata.article;
		$rootScope.article = { text: article };
		var assembly = TADMetadata.assembly;
		$rootScope.assembly = { text: assembly };
		var celltype = TADMetadata.cellType;
		$rootScope.celltype = { text: celltype };
		var experiment = TADMetadata.experimentType;
		$rootScope.experiment = { text: experiment };
		var resolution = TADMetadata.resolution;
		$rootScope.resolution = { text: resolution };
		
		// Interaction Settings
		$scope.showParticles = Settings.getParticles();
		$scope.toggleParticles = function() {
			$scope.showParticles = !$scope.showParticles;
		};
		
		$scope.showChromatin = Settings.getChromatin();
		$scope.toggleChromatin = function() {
			$scope.showChromatin = !$scope.showChromatin;
		};
		
		$scope.showGenes = Settings.getGenes();
		$scope.toggleGenes = function() {
			// CHANGE TO switchColors()...
			if ($scope.showGenes === false) {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showContacts = Settings.getContacts();
		$scope.toggleContacts = function() {
			// console.log($scope.slider.position);
			$scope.colors = Contacts.getColors( contacts, $scope.slider.position, particlesCount, segments );
			// CHANGE TO switchColors()...
			if ($scope.showContacts === false) {
	   			$scope.showGenes = false;
	   			$scope.showContacts = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showHP1 = Settings.getHP1();
		$scope.toggleHP1 = function() {
			if ($scope.showHP1 === false) {
				$scope.colors = $scope.colorsHP1;
	   			$scope.showGenes = false;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = true;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showBRM = Settings.getBRM();
		$scope.toggleBRM = function() {
			if ($scope.showBRM === false) {
				$scope.colors = $scope.colorsBRM;
	   			$scope.showGenes = false;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = true;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showMRG15 = Settings.getMRG15();
		$scope.toggleMRG15 = function() {
			if ($scope.showMRG15 === false) {
				$scope.colors = $scope.colorsMRG15;
	   			$scope.showGenes = false;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = true;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showPC = Settings.getPC();
		$scope.togglePC = function() {
			if ($scope.showPC === false) {
				$scope.colors = $scope.colorsPC;
	   			$scope.showGenes = false;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = true;
	   			$scope.showH1 = false;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showH1 = Settings.getH1();
		$scope.toggleH1 = function() {
			if ($scope.showH1 === false) {
				$scope.colors = $scope.colorsH1;
	   			$scope.showGenes = false;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = true;
			} else {
				$scope.colors = $scope.colorsGenes;
	   			$scope.showGenes = true;
	   			$scope.showContacts = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		};
		
		$scope.showSense = Settings.getSense();
		$scope.toggleSense = function() {
			$scope.showSense = !$scope.showSense;
		};
		
		$scope.$watch('slider.position', function(n,o) {
			if (n !== o && $scope.showContacts ) {
				$scope.colors = Contacts.getColors( contacts, $scope.slider.position, particlesCount, segments );
			}
		});
	}]);

	TADkit.controller('TrackCtrl',['$scope', '$timeout', 'test', 'TAD', 'Genes', 'Proteins', 'Contacts',
	function($scope, $timeout, test, TAD, Genes, Proteins, Contacts){
		"use strict";
		
		// Timeout as temp fix to pause rendering until DOM complete
		// *** move to parent controller???
		$timeout( function() {
			$scope.particles = TAD.getParticles();
			$scope.genes = Genes.getGenes();
			$scope.proteins = Proteins.getProteins();
			$scope.contacts = Contacts.getContacts();
		}, 0 );
	    $scope.filterGenes = function(element) {
			// filterGenes($scope.slider.position);
			// var positionGenes = getGenesPresent(genes,  $scope.slider.position, fragmentCount, TADStart, fragmentLength );
	    	// return element.name.match(/^Ma/) ? true : false;
	    };
		console.log('Track now active.');
	}]);

	TADkit.controller('SceneCtrl',['$scope', '$timeout', 'test', 'TAD', 'Contacts',
	function($scope, $timeout, test, TAD, Contacts){
		"use strict";
		// Timeout as temp fix to pause rendering until DOM complete
		// $timeout( function() {$scope.vertices = TAD.getVertices()}, 0 ); // WHY NOT?

		$scope.vertices = TAD.getVertices();
		
	}]);

	TADkit.service('loadTAD', function($http, TAD, Assembly, Genes, Proteins, Contacts) {
		"use strict";
		var species = "";
		var slice = "X:0-4999999"; // Ensembl max :P
		// LOAD TAD
		var initialiseData = TAD.loadTAD()
		.then(function(promise){
			// LOAD ASSEMBLY 
			species = TAD.getSpeciesUrl();
			return Assembly.loadInfoAssembly(species);
		})
		.then(function(promise){
			// LOAD GENES
			slice = TAD.getSlice();
			return Genes.loadRegionGenes(species, slice);
		})
		.then(function(promise){
			// LOAD BIOTYPE COLORS
			return Assembly.loadBiotypeColors();
		})
		.then(function(promise){
			// LOAD PROTEINS
			return Proteins.loadProteins(species, slice);
		})
		.then(function(promise){
			// LOAD CONTACTS
			return Contacts.loadContacts();
		});
	
		return {
			promise:initialiseData,
			newTAD: function () {
				return null;
			},
		};
	});

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

/*global TADkit */

TADkit.factory('Contacts', ['$q', '$http', 'ConvertColors', function($q, $http, ConvertColors) {
	"use strict";
	var contacts = "";
	return {
		loadContacts: function() {
			var deferral = $q.defer();
			$http.get('assets/json/kartes_example_X_1559-1660.json')
			.success(function(data){
				contacts = data;
				console.log("Contacts retreived from file.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getContacts: function () {
			return contacts;
		},
		// getMinMax: function (array, type) {
		//   var out = [];
		//   array.forEach(function(el) { return out.push.apply(out, el[type]); }, []);
		//   return { min: Math.min.apply(null, out), max: Math.max.apply(null, out) };
		// },
		getColors: function(contacts, position, particlesCount, segments) {
			var colors = [];
			
			// Note that contacts are per particle
			//    whereas position is per fragment.
			//    Therefore push color to array * segments
			
			// Calculate in HSL (Hue, Saturation, Luminosity)
			// Adjust Luminosity based on: normalize(contacts.dist[position])
			var distMin = Infinity, distMax = -Infinity, contact;
			for( contact in contacts) {
				var dist = contacts[contact].dist;
			    if( dist < distMin) distMin = dist;
			    if( dist > distMax) distMax = dist;
			}
			var distRange = distMax - distMin;
			var contactsCount = contacts.length;
			var particlePosition = Math.floor(position/segments);
			// console.log("particlePosition (getCol): "+JSON.stringify(particlePosition));
			
			var colorHex = "#cccccc"; // Base color - ie if none found

			var currentContacts = [];
			for(var h=0; h<contactsCount; h++){
				var current = contacts[h];
				if ( current.a == particlePosition+1 ) {
					currentContacts.push(current);
				}
			}
			var currentContactsCount = currentContacts.length;
			
			// For every fragment [i]...
			for(var i=0; i<particlesCount; i++){
				// For every contact [j]...
				for(var j=0; j<currentContactsCount; j++){
					if ( i == particlePosition) {
						colorHex = "#ff0000";
					}
					// Look for Contacts at current particle + 1
					if ( currentContacts[j].b == i+1 ) {
						// Lumiosity by distance
						var contactDist = currentContacts[j].dist;
						 // Luminosity  hsl(300, 100, 25) to hsl(300, 100, 75) = 50
						var saturationRange = 40;
						var saturation = 10 + parseInt((contactDist * saturationRange) / distRange);
						// console.log(brightness);
						var luminosityRange = 50;
						var luminosity = 90 - parseInt((contactDist * luminosityRange) / distRange);
						// console.log(luminosity);
						// Color Purple
						var contactHSL = "hsl(300," + saturation + "," + luminosity + ")";
						// console.log(contactHSL);
						colorHex = new ConvertColors.hslToHex(contactHSL).process();
					}
				}
				for(var k=0; k<segments; k++){
					colors.push(colorHex);
				}
				colorHex = "#cccccc";
			}
			// console.log("current position: " + JSON.stringify(particlePosition));
			// console.log(colors);
			return colors;
		}
	};
}]);

/*global TADkit */

TADkit.service('ConvertColors', [function () {
	"use strict";
	var rootObj = this;
	rootObj.re_ = {
	  // An X11 "rgb:ddd/ddd/ddd" value.
	  x11rgb: /^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,
	};
	
	/**
	 * Named colors according to the stock X11 rgb.txt file.
	 */
	rootObj.colorNames = {
		// ADDED FOR ENSEMBL WEBCODE COLORS
		"transparent": "rgb(0, 0, 0)", // should be rgba...
//		"rust": "rgb(183, 65, 14)", // ORIGINL ENSEMBL RUST
		"rust": "rgb(243, 137, 92)", // HALF INTENSITY OF RUST
		"stripes": "rgb(255, 54, 54)",
		"dark_blue": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
		"contigblue1": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
		"contigblue2": "rgb(173, 216, 230)", // FROM ENSEMBL DOCS = LIGHT BLUE
		"border:grey70": "rgb(179, 179, 179)", // FROM ENSEMBL ERROR? = GREY70
		// X11 COLOR NAMES
	  "aliceblue": "rgb(240, 248, 255)",
	  "antiquewhite": "rgb(250, 235, 215)",
	  "antiquewhite1": "rgb(255, 239, 219)",
	  "antiquewhite2": "rgb(238, 223, 204)",
	  "antiquewhite3": "rgb(205, 192, 176)",
	  "antiquewhite4": "rgb(139, 131, 120)",
	  "aquamarine": "rgb(127, 255, 212)",
	  "aquamarine1": "rgb(127, 255, 212)",
	  "aquamarine2": "rgb(118, 238, 198)",
	  "aquamarine3": "rgb(102, 205, 170)",
	  "aquamarine4": "rgb(69, 139, 116)",
	  "azure": "rgb(240, 255, 255)",
	  "azure1": "rgb(240, 255, 255)",
	  "azure2": "rgb(224, 238, 238)",
	  "azure3": "rgb(193, 205, 205)",
	  "azure4": "rgb(131, 139, 139)",
	  "beige": "rgb(245, 245, 220)",
	  "bisque": "rgb(255, 228, 196)",
	  "bisque1": "rgb(255, 228, 196)",
	  "bisque2": "rgb(238, 213, 183)",
	  "bisque3": "rgb(205, 183, 158)",
	  "bisque4": "rgb(139, 125, 107)",
	  "black": "rgb(0, 0, 0)",
	  "blanchedalmond": "rgb(255, 235, 205)",
	  "blue": "rgb(0, 0, 255)",
	  "blue1": "rgb(0, 0, 255)",
	  "blue2": "rgb(0, 0, 238)",
	  "blue3": "rgb(0, 0, 205)",
	  "blue4": "rgb(0, 0, 139)",
	  "blueviolet": "rgb(138, 43, 226)",
	  "brown": "rgb(165, 42, 42)",
	  "brown1": "rgb(255, 64, 64)",
	  "brown2": "rgb(238, 59, 59)",
	  "brown3": "rgb(205, 51, 51)",
	  "brown4": "rgb(139, 35, 35)",
	  "burlywood": "rgb(222, 184, 135)",
	  "burlywood1": "rgb(255, 211, 155)",
	  "burlywood2": "rgb(238, 197, 145)",
	  "burlywood3": "rgb(205, 170, 125)",
	  "burlywood4": "rgb(139, 115, 85)",
	  "cadetblue": "rgb(95, 158, 160)",
	  "cadetblue1": "rgb(152, 245, 255)",
	  "cadetblue2": "rgb(142, 229, 238)",
	  "cadetblue3": "rgb(122, 197, 205)",
	  "cadetblue4": "rgb(83, 134, 139)",
	  "chartreuse": "rgb(127, 255, 0)",
	  "chartreuse1": "rgb(127, 255, 0)",
	  "chartreuse2": "rgb(118, 238, 0)",
	  "chartreuse3": "rgb(102, 205, 0)",
	  "chartreuse4": "rgb(69, 139, 0)",
	  "chocolate": "rgb(210, 105, 30)",
	  "chocolate1": "rgb(255, 127, 36)",
	  "chocolate2": "rgb(238, 118, 33)",
	  "chocolate3": "rgb(205, 102, 29)",
	  "chocolate4": "rgb(139, 69, 19)",
	  "coral": "rgb(255, 127, 80)",
	  "coral1": "rgb(255, 114, 86)",
	  "coral2": "rgb(238, 106, 80)",
	  "coral3": "rgb(205, 91, 69)",
	  "coral4": "rgb(139, 62, 47)",
	  "cornflowerblue": "rgb(100, 149, 237)",
	  "cornsilk": "rgb(255, 248, 220)",
	  "cornsilk1": "rgb(255, 248, 220)",
	  "cornsilk2": "rgb(238, 232, 205)",
	  "cornsilk3": "rgb(205, 200, 177)",
	  "cornsilk4": "rgb(139, 136, 120)",
	  "cyan": "rgb(0, 255, 255)",
	  "cyan1": "rgb(0, 255, 255)",
	  "cyan2": "rgb(0, 238, 238)",
	  "cyan3": "rgb(0, 205, 205)",
	  "cyan4": "rgb(0, 139, 139)",
	  "darkblue": "rgb(0, 0, 139)",
	  "darkcyan": "rgb(0, 139, 139)",
	  "darkgoldenrod": "rgb(184, 134, 11)",
	  "darkgoldenrod1": "rgb(255, 185, 15)",
	  "darkgoldenrod2": "rgb(238, 173, 14)",
	  "darkgoldenrod3": "rgb(205, 149, 12)",
	  "darkgoldenrod4": "rgb(139, 101, 8)",
	  "darkgray": "rgb(169, 169, 169)",
	  "darkgreen": "rgb(0, 100, 0)",
	  "darkgrey": "rgb(169, 169, 169)",
	  "darkkhaki": "rgb(189, 183, 107)",
	  "darkmagenta": "rgb(139, 0, 139)",
	  "darkolivegreen": "rgb(85, 107, 47)",
	  "darkolivegreen1": "rgb(202, 255, 112)",
	  "darkolivegreen2": "rgb(188, 238, 104)",
	  "darkolivegreen3": "rgb(162, 205, 90)",
	  "darkolivegreen4": "rgb(110, 139, 61)",
	  "darkorange": "rgb(255, 140, 0)",
	  "darkorange1": "rgb(255, 127, 0)",
	  "darkorange2": "rgb(238, 118, 0)",
	  "darkorange3": "rgb(205, 102, 0)",
	  "darkorange4": "rgb(139, 69, 0)",
	  "darkorchid": "rgb(153, 50, 204)",
	  "darkorchid1": "rgb(191, 62, 255)",
	  "darkorchid2": "rgb(178, 58, 238)",
	  "darkorchid3": "rgb(154, 50, 205)",
	  "darkorchid4": "rgb(104, 34, 139)",
	  "darkred": "rgb(139, 0, 0)",
	  "darksalmon": "rgb(233, 150, 122)",
	  "darkseagreen": "rgb(143, 188, 143)",
	  "darkseagreen1": "rgb(193, 255, 193)",
	  "darkseagreen2": "rgb(180, 238, 180)",
	  "darkseagreen3": "rgb(155, 205, 155)",
	  "darkseagreen4": "rgb(105, 139, 105)",
	  "darkslateblue": "rgb(72, 61, 139)",
	  "darkslategray": "rgb(47, 79, 79)",
	  "darkslategray1": "rgb(151, 255, 255)",
	  "darkslategray2": "rgb(141, 238, 238)",
	  "darkslategray3": "rgb(121, 205, 205)",
	  "darkslategray4": "rgb(82, 139, 139)",
	  "darkslategrey": "rgb(47, 79, 79)",
	  "darkturquoise": "rgb(0, 206, 209)",
	  "darkviolet": "rgb(148, 0, 211)",
	  "debianred": "rgb(215, 7, 81)",
	  "deeppink": "rgb(255, 20, 147)",
	  "deeppink1": "rgb(255, 20, 147)",
	  "deeppink2": "rgb(238, 18, 137)",
	  "deeppink3": "rgb(205, 16, 118)",
	  "deeppink4": "rgb(139, 10, 80)",
	  "deepskyblue": "rgb(0, 191, 255)",
	  "deepskyblue1": "rgb(0, 191, 255)",
	  "deepskyblue2": "rgb(0, 178, 238)",
	  "deepskyblue3": "rgb(0, 154, 205)",
	  "deepskyblue4": "rgb(0, 104, 139)",
	  "dimgray": "rgb(105, 105, 105)",
	  "dimgrey": "rgb(105, 105, 105)",
	  "dodgerblue": "rgb(30, 144, 255)",
	  "dodgerblue1": "rgb(30, 144, 255)",
	  "dodgerblue2": "rgb(28, 134, 238)",
	  "dodgerblue3": "rgb(24, 116, 205)",
	  "dodgerblue4": "rgb(16, 78, 139)",
	  "firebrick": "rgb(178, 34, 34)",
	  "firebrick1": "rgb(255, 48, 48)",
	  "firebrick2": "rgb(238, 44, 44)",
	  "firebrick3": "rgb(205, 38, 38)",
	  "firebrick4": "rgb(139, 26, 26)",
	  "floralwhite": "rgb(255, 250, 240)",
	  "forestgreen": "rgb(34, 139, 34)",
	  "gainsboro": "rgb(220, 220, 220)",
	  "ghostwhite": "rgb(248, 248, 255)",
	  "gold": "rgb(255, 215, 0)",
	  "gold1": "rgb(255, 215, 0)",
	  "gold2": "rgb(238, 201, 0)",
	  "gold3": "rgb(205, 173, 0)",
	  "gold4": "rgb(139, 117, 0)",
	  "goldenrod": "rgb(218, 165, 32)",
	  "goldenrod1": "rgb(255, 193, 37)",
	  "goldenrod2": "rgb(238, 180, 34)",
	  "goldenrod3": "rgb(205, 155, 29)",
	  "goldenrod4": "rgb(139, 105, 20)",
	  "gray": "rgb(190, 190, 190)",
	  "gray0": "rgb(0, 0, 0)",
	  "gray1": "rgb(3, 3, 3)",
	  "gray10": "rgb(26, 26, 26)",
	  "gray100": "rgb(255, 255, 255)",
	  "gray11": "rgb(28, 28, 28)",
	  "gray12": "rgb(31, 31, 31)",
	  "gray13": "rgb(33, 33, 33)",
	  "gray14": "rgb(36, 36, 36)",
	  "gray15": "rgb(38, 38, 38)",
	  "gray16": "rgb(41, 41, 41)",
	  "gray17": "rgb(43, 43, 43)",
	  "gray18": "rgb(46, 46, 46)",
	  "gray19": "rgb(48, 48, 48)",
	  "gray2": "rgb(5, 5, 5)",
	  "gray20": "rgb(51, 51, 51)",
	  "gray21": "rgb(54, 54, 54)",
	  "gray22": "rgb(56, 56, 56)",
	  "gray23": "rgb(59, 59, 59)",
	  "gray24": "rgb(61, 61, 61)",
	  "gray25": "rgb(64, 64, 64)",
	  "gray26": "rgb(66, 66, 66)",
	  "gray27": "rgb(69, 69, 69)",
	  "gray28": "rgb(71, 71, 71)",
	  "gray29": "rgb(74, 74, 74)",
	  "gray3": "rgb(8, 8, 8)",
	  "gray30": "rgb(77, 77, 77)",
	  "gray31": "rgb(79, 79, 79)",
	  "gray32": "rgb(82, 82, 82)",
	  "gray33": "rgb(84, 84, 84)",
	  "gray34": "rgb(87, 87, 87)",
	  "gray35": "rgb(89, 89, 89)",
	  "gray36": "rgb(92, 92, 92)",
	  "gray37": "rgb(94, 94, 94)",
	  "gray38": "rgb(97, 97, 97)",
	  "gray39": "rgb(99, 99, 99)",
	  "gray4": "rgb(10, 10, 10)",
	  "gray40": "rgb(102, 102, 102)",
	  "gray41": "rgb(105, 105, 105)",
	  "gray42": "rgb(107, 107, 107)",
	  "gray43": "rgb(110, 110, 110)",
	  "gray44": "rgb(112, 112, 112)",
	  "gray45": "rgb(115, 115, 115)",
	  "gray46": "rgb(117, 117, 117)",
	  "gray47": "rgb(120, 120, 120)",
	  "gray48": "rgb(122, 122, 122)",
	  "gray49": "rgb(125, 125, 125)",
	  "gray5": "rgb(13, 13, 13)",
	  "gray50": "rgb(127, 127, 127)",
	  "gray51": "rgb(130, 130, 130)",
	  "gray52": "rgb(133, 133, 133)",
	  "gray53": "rgb(135, 135, 135)",
	  "gray54": "rgb(138, 138, 138)",
	  "gray55": "rgb(140, 140, 140)",
	  "gray56": "rgb(143, 143, 143)",
	  "gray57": "rgb(145, 145, 145)",
	  "gray58": "rgb(148, 148, 148)",
	  "gray59": "rgb(150, 150, 150)",
	  "gray6": "rgb(15, 15, 15)",
	  "gray60": "rgb(153, 153, 153)",
	  "gray61": "rgb(156, 156, 156)",
	  "gray62": "rgb(158, 158, 158)",
	  "gray63": "rgb(161, 161, 161)",
	  "gray64": "rgb(163, 163, 163)",
	  "gray65": "rgb(166, 166, 166)",
	  "gray66": "rgb(168, 168, 168)",
	  "gray67": "rgb(171, 171, 171)",
	  "gray68": "rgb(173, 173, 173)",
	  "gray69": "rgb(176, 176, 176)",
	  "gray7": "rgb(18, 18, 18)",
	  "gray70": "rgb(179, 179, 179)",
	  "gray71": "rgb(181, 181, 181)",
	  "gray72": "rgb(184, 184, 184)",
	  "gray73": "rgb(186, 186, 186)",
	  "gray74": "rgb(189, 189, 189)",
	  "gray75": "rgb(191, 191, 191)",
	  "gray76": "rgb(194, 194, 194)",
	  "gray77": "rgb(196, 196, 196)",
	  "gray78": "rgb(199, 199, 199)",
	  "gray79": "rgb(201, 201, 201)",
	  "gray8": "rgb(20, 20, 20)",
	  "gray80": "rgb(204, 204, 204)",
	  "gray81": "rgb(207, 207, 207)",
	  "gray82": "rgb(209, 209, 209)",
	  "gray83": "rgb(212, 212, 212)",
	  "gray84": "rgb(214, 214, 214)",
	  "gray85": "rgb(217, 217, 217)",
	  "gray86": "rgb(219, 219, 219)",
	  "gray87": "rgb(222, 222, 222)",
	  "gray88": "rgb(224, 224, 224)",
	  "gray89": "rgb(227, 227, 227)",
	  "gray9": "rgb(23, 23, 23)",
	  "gray90": "rgb(229, 229, 229)",
	  "gray91": "rgb(232, 232, 232)",
	  "gray92": "rgb(235, 235, 235)",
	  "gray93": "rgb(237, 237, 237)",
	  "gray94": "rgb(240, 240, 240)",
	  "gray95": "rgb(242, 242, 242)",
	  "gray96": "rgb(245, 245, 245)",
	  "gray97": "rgb(247, 247, 247)",
	  "gray98": "rgb(250, 250, 250)",
	  "gray99": "rgb(252, 252, 252)",
	  "green": "rgb(0, 255, 0)",
	  "green1": "rgb(0, 255, 0)",
	  "green2": "rgb(0, 238, 0)",
	  "green3": "rgb(0, 205, 0)",
	  "green4": "rgb(0, 139, 0)",
	  "greenyellow": "rgb(173, 255, 47)",
	  "grey": "rgb(190, 190, 190)",
	  "grey0": "rgb(0, 0, 0)",
	  "grey1": "rgb(3, 3, 3)",
	  "grey10": "rgb(26, 26, 26)",
	  "grey100": "rgb(255, 255, 255)",
	  "grey11": "rgb(28, 28, 28)",
	  "grey12": "rgb(31, 31, 31)",
	  "grey13": "rgb(33, 33, 33)",
	  "grey14": "rgb(36, 36, 36)",
	  "grey15": "rgb(38, 38, 38)",
	  "grey16": "rgb(41, 41, 41)",
	  "grey17": "rgb(43, 43, 43)",
	  "grey18": "rgb(46, 46, 46)",
	  "grey19": "rgb(48, 48, 48)",
	  "grey2": "rgb(5, 5, 5)",
	  "grey20": "rgb(51, 51, 51)",
	  "grey21": "rgb(54, 54, 54)",
	  "grey22": "rgb(56, 56, 56)",
	  "grey23": "rgb(59, 59, 59)",
	  "grey24": "rgb(61, 61, 61)",
	  "grey25": "rgb(64, 64, 64)",
	  "grey26": "rgb(66, 66, 66)",
	  "grey27": "rgb(69, 69, 69)",
	  "grey28": "rgb(71, 71, 71)",
	  "grey29": "rgb(74, 74, 74)",
	  "grey3": "rgb(8, 8, 8)",
	  "grey30": "rgb(77, 77, 77)",
	  "grey31": "rgb(79, 79, 79)",
	  "grey32": "rgb(82, 82, 82)",
	  "grey33": "rgb(84, 84, 84)",
	  "grey34": "rgb(87, 87, 87)",
	  "grey35": "rgb(89, 89, 89)",
	  "grey36": "rgb(92, 92, 92)",
	  "grey37": "rgb(94, 94, 94)",
	  "grey38": "rgb(97, 97, 97)",
	  "grey39": "rgb(99, 99, 99)",
	  "grey4": "rgb(10, 10, 10)",
	  "grey40": "rgb(102, 102, 102)",
	  "grey41": "rgb(105, 105, 105)",
	  "grey42": "rgb(107, 107, 107)",
	  "grey43": "rgb(110, 110, 110)",
	  "grey44": "rgb(112, 112, 112)",
	  "grey45": "rgb(115, 115, 115)",
	  "grey46": "rgb(117, 117, 117)",
	  "grey47": "rgb(120, 120, 120)",
	  "grey48": "rgb(122, 122, 122)",
	  "grey49": "rgb(125, 125, 125)",
	  "grey5": "rgb(13, 13, 13)",
	  "grey50": "rgb(127, 127, 127)",
	  "grey51": "rgb(130, 130, 130)",
	  "grey52": "rgb(133, 133, 133)",
	  "grey53": "rgb(135, 135, 135)",
	  "grey54": "rgb(138, 138, 138)",
	  "grey55": "rgb(140, 140, 140)",
	  "grey56": "rgb(143, 143, 143)",
	  "grey57": "rgb(145, 145, 145)",
	  "grey58": "rgb(148, 148, 148)",
	  "grey59": "rgb(150, 150, 150)",
	  "grey6": "rgb(15, 15, 15)",
	  "grey60": "rgb(153, 153, 153)",
	  "grey61": "rgb(156, 156, 156)",
	  "grey62": "rgb(158, 158, 158)",
	  "grey63": "rgb(161, 161, 161)",
	  "grey64": "rgb(163, 163, 163)",
	  "grey65": "rgb(166, 166, 166)",
	  "grey66": "rgb(168, 168, 168)",
	  "grey67": "rgb(171, 171, 171)",
	  "grey68": "rgb(173, 173, 173)",
	  "grey69": "rgb(176, 176, 176)",
	  "grey7": "rgb(18, 18, 18)",
	  "grey70": "rgb(179, 179, 179)",
	  "grey71": "rgb(181, 181, 181)",
	  "grey72": "rgb(184, 184, 184)",
	  "grey73": "rgb(186, 186, 186)",
	  "grey74": "rgb(189, 189, 189)",
	  "grey75": "rgb(191, 191, 191)",
	  "grey76": "rgb(194, 194, 194)",
	  "grey77": "rgb(196, 196, 196)",
	  "grey78": "rgb(199, 199, 199)",
	  "grey79": "rgb(201, 201, 201)",
	  "grey8": "rgb(20, 20, 20)",
	  "grey80": "rgb(204, 204, 204)",
	  "grey81": "rgb(207, 207, 207)",
	  "grey82": "rgb(209, 209, 209)",
	  "grey83": "rgb(212, 212, 212)",
	  "grey84": "rgb(214, 214, 214)",
	  "grey85": "rgb(217, 217, 217)",
	  "grey86": "rgb(219, 219, 219)",
	  "grey87": "rgb(222, 222, 222)",
	  "grey88": "rgb(224, 224, 224)",
	  "grey89": "rgb(227, 227, 227)",
	  "grey9": "rgb(23, 23, 23)",
	  "grey90": "rgb(229, 229, 229)",
	  "grey91": "rgb(232, 232, 232)",
	  "grey92": "rgb(235, 235, 235)",
	  "grey93": "rgb(237, 237, 237)",
	  "grey94": "rgb(240, 240, 240)",
	  "grey95": "rgb(242, 242, 242)",
	  "grey96": "rgb(245, 245, 245)",
	  "grey97": "rgb(247, 247, 247)",
	  "grey98": "rgb(250, 250, 250)",
	  "grey99": "rgb(252, 252, 252)",
	  "honeydew": "rgb(240, 255, 240)",
	  "honeydew1": "rgb(240, 255, 240)",
	  "honeydew2": "rgb(224, 238, 224)",
	  "honeydew3": "rgb(193, 205, 193)",
	  "honeydew4": "rgb(131, 139, 131)",
	  "hotpink": "rgb(255, 105, 180)",
	  "hotpink1": "rgb(255, 110, 180)",
	  "hotpink2": "rgb(238, 106, 167)",
	  "hotpink3": "rgb(205, 96, 144)",
	  "hotpink4": "rgb(139, 58, 98)",
	  "indianred": "rgb(205, 92, 92)",
	  "indianred1": "rgb(255, 106, 106)",
	  "indianred2": "rgb(238, 99, 99)",
	  "indianred3": "rgb(205, 85, 85)",
	  "indianred4": "rgb(139, 58, 58)",
	  "ivory": "rgb(255, 255, 240)",
	  "ivory1": "rgb(255, 255, 240)",
	  "ivory2": "rgb(238, 238, 224)",
	  "ivory3": "rgb(205, 205, 193)",
	  "ivory4": "rgb(139, 139, 131)",
	  "khaki": "rgb(240, 230, 140)",
	  "khaki1": "rgb(255, 246, 143)",
	  "khaki2": "rgb(238, 230, 133)",
	  "khaki3": "rgb(205, 198, 115)",
	  "khaki4": "rgb(139, 134, 78)",
	  "lavender": "rgb(230, 230, 250)",
	  "lavenderblush": "rgb(255, 240, 245)",
	  "lavenderblush1": "rgb(255, 240, 245)",
	  "lavenderblush2": "rgb(238, 224, 229)",
	  "lavenderblush3": "rgb(205, 193, 197)",
	  "lavenderblush4": "rgb(139, 131, 134)",
	  "lawngreen": "rgb(124, 252, 0)",
	  "lemonchiffon": "rgb(255, 250, 205)",
	  "lemonchiffon1": "rgb(255, 250, 205)",
	  "lemonchiffon2": "rgb(238, 233, 191)",
	  "lemonchiffon3": "rgb(205, 201, 165)",
	  "lemonchiffon4": "rgb(139, 137, 112)",
	  "lightblue": "rgb(173, 216, 230)",
	  "lightblue1": "rgb(191, 239, 255)",
	  "lightblue2": "rgb(178, 223, 238)",
	  "lightblue3": "rgb(154, 192, 205)",
	  "lightblue4": "rgb(104, 131, 139)",
	  "lightcoral": "rgb(240, 128, 128)",
	  "lightcyan": "rgb(224, 255, 255)",
	  "lightcyan1": "rgb(224, 255, 255)",
	  "lightcyan2": "rgb(209, 238, 238)",
	  "lightcyan3": "rgb(180, 205, 205)",
	  "lightcyan4": "rgb(122, 139, 139)",
	  "lightgoldenrod": "rgb(238, 221, 130)",
	  "lightgoldenrod1": "rgb(255, 236, 139)",
	  "lightgoldenrod2": "rgb(238, 220, 130)",
	  "lightgoldenrod3": "rgb(205, 190, 112)",
	  "lightgoldenrod4": "rgb(139, 129, 76)",
	  "lightgoldenrodyellow": "rgb(250, 250, 210)",
	  "lightgray": "rgb(211, 211, 211)",
	  "lightgreen": "rgb(144, 238, 144)",
	  "lightgrey": "rgb(211, 211, 211)",
	  "lightpink": "rgb(255, 182, 193)",
	  "lightpink1": "rgb(255, 174, 185)",
	  "lightpink2": "rgb(238, 162, 173)",
	  "lightpink3": "rgb(205, 140, 149)",
	  "lightpink4": "rgb(139, 95, 101)",
	  "lightsalmon": "rgb(255, 160, 122)",
	  "lightsalmon1": "rgb(255, 160, 122)",
	  "lightsalmon2": "rgb(238, 149, 114)",
	  "lightsalmon3": "rgb(205, 129, 98)",
	  "lightsalmon4": "rgb(139, 87, 66)",
	  "lightseagreen": "rgb(32, 178, 170)",
	  "lightskyblue": "rgb(135, 206, 250)",
	  "lightskyblue1": "rgb(176, 226, 255)",
	  "lightskyblue2": "rgb(164, 211, 238)",
	  "lightskyblue3": "rgb(141, 182, 205)",
	  "lightskyblue4": "rgb(96, 123, 139)",
	  "lightslateblue": "rgb(132, 112, 255)",
	  "lightslategray": "rgb(119, 136, 153)",
	  "lightslategrey": "rgb(119, 136, 153)",
	  "lightsteelblue": "rgb(176, 196, 222)",
	  "lightsteelblue1": "rgb(202, 225, 255)",
	  "lightsteelblue2": "rgb(188, 210, 238)",
	  "lightsteelblue3": "rgb(162, 181, 205)",
	  "lightsteelblue4": "rgb(110, 123, 139)",
	  "lightyellow": "rgb(255, 255, 224)",
	  "lightyellow1": "rgb(255, 255, 224)",
	  "lightyellow2": "rgb(238, 238, 209)",
	  "lightyellow3": "rgb(205, 205, 180)",
	  "lightyellow4": "rgb(139, 139, 122)",
	  "limegreen": "rgb(50, 205, 50)",
	  "linen": "rgb(250, 240, 230)",
	  "magenta": "rgb(255, 0, 255)",
	  "magenta1": "rgb(255, 0, 255)",
	  "magenta2": "rgb(238, 0, 238)",
	  "magenta3": "rgb(205, 0, 205)",
	  "magenta4": "rgb(139, 0, 139)",
	  "maroon": "rgb(176, 48, 96)",
	  "maroon1": "rgb(255, 52, 179)",
	  "maroon2": "rgb(238, 48, 167)",
	  "maroon3": "rgb(205, 41, 144)",
	  "maroon4": "rgb(139, 28, 98)",
	  "mediumaquamarine": "rgb(102, 205, 170)",
	  "mediumblue": "rgb(0, 0, 205)",
	  "mediumorchid": "rgb(186, 85, 211)",
	  "mediumorchid1": "rgb(224, 102, 255)",
	  "mediumorchid2": "rgb(209, 95, 238)",
	  "mediumorchid3": "rgb(180, 82, 205)",
	  "mediumorchid4": "rgb(122, 55, 139)",
	  "mediumpurple": "rgb(147, 112, 219)",
	  "mediumpurple1": "rgb(171, 130, 255)",
	  "mediumpurple2": "rgb(159, 121, 238)",
	  "mediumpurple3": "rgb(137, 104, 205)",
	  "mediumpurple4": "rgb(93, 71, 139)",
	  "mediumseagreen": "rgb(60, 179, 113)",
	  "mediumslateblue": "rgb(123, 104, 238)",
	  "mediumspringgreen": "rgb(0, 250, 154)",
	  "mediumturquoise": "rgb(72, 209, 204)",
	  "mediumvioletred": "rgb(199, 21, 133)",
	  "midnightblue": "rgb(25, 25, 112)",
	  "mintcream": "rgb(245, 255, 250)",
	  "mistyrose": "rgb(255, 228, 225)",
	  "mistyrose1": "rgb(255, 228, 225)",
	  "mistyrose2": "rgb(238, 213, 210)",
	  "mistyrose3": "rgb(205, 183, 181)",
	  "mistyrose4": "rgb(139, 125, 123)",
	  "moccasin": "rgb(255, 228, 181)",
	  "navajowhite": "rgb(255, 222, 173)",
	  "navajowhite1": "rgb(255, 222, 173)",
	  "navajowhite2": "rgb(238, 207, 161)",
	  "navajowhite3": "rgb(205, 179, 139)",
	  "navajowhite4": "rgb(139, 121, 94)",
	  "navy": "rgb(0, 0, 128)",
	  "navyblue": "rgb(0, 0, 128)",
	  "oldlace": "rgb(253, 245, 230)",
	  "olivedrab": "rgb(107, 142, 35)",
	  "olivedrab1": "rgb(192, 255, 62)",
	  "olivedrab2": "rgb(179, 238, 58)",
	  "olivedrab3": "rgb(154, 205, 50)",
	  "olivedrab4": "rgb(105, 139, 34)",
	  "orange": "rgb(255, 165, 0)",
	  "orange1": "rgb(255, 165, 0)",
	  "orange2": "rgb(238, 154, 0)",
	  "orange3": "rgb(205, 133, 0)",
	  "orange4": "rgb(139, 90, 0)",
	  "orangered": "rgb(255, 69, 0)",
	  "orangered1": "rgb(255, 69, 0)",
	  "orangered2": "rgb(238, 64, 0)",
	  "orangered3": "rgb(205, 55, 0)",
	  "orangered4": "rgb(139, 37, 0)",
	  "orchid": "rgb(218, 112, 214)",
	  "orchid1": "rgb(255, 131, 250)",
	  "orchid2": "rgb(238, 122, 233)",
	  "orchid3": "rgb(205, 105, 201)",
	  "orchid4": "rgb(139, 71, 137)",
	  "palegoldenrod": "rgb(238, 232, 170)",
	  "palegreen": "rgb(152, 251, 152)",
	  "palegreen1": "rgb(154, 255, 154)",
	  "palegreen2": "rgb(144, 238, 144)",
	  "palegreen3": "rgb(124, 205, 124)",
	  "palegreen4": "rgb(84, 139, 84)",
	  "paleturquoise": "rgb(175, 238, 238)",
	  "paleturquoise1": "rgb(187, 255, 255)",
	  "paleturquoise2": "rgb(174, 238, 238)",
	  "paleturquoise3": "rgb(150, 205, 205)",
	  "paleturquoise4": "rgb(102, 139, 139)",
	  "palevioletred": "rgb(219, 112, 147)",
	  "palevioletred1": "rgb(255, 130, 171)",
	  "palevioletred2": "rgb(238, 121, 159)",
	  "palevioletred3": "rgb(205, 104, 137)",
	  "palevioletred4": "rgb(139, 71, 93)",
	  "papayawhip": "rgb(255, 239, 213)",
	  "peachpuff": "rgb(255, 218, 185)",
	  "peachpuff1": "rgb(255, 218, 185)",
	  "peachpuff2": "rgb(238, 203, 173)",
	  "peachpuff3": "rgb(205, 175, 149)",
	  "peachpuff4": "rgb(139, 119, 101)",
	  "peru": "rgb(205, 133, 63)",
	  "pink": "rgb(255, 192, 203)",
	  "pink1": "rgb(255, 181, 197)",
	  "pink2": "rgb(238, 169, 184)",
	  "pink3": "rgb(205, 145, 158)",
	  "pink4": "rgb(139, 99, 108)",
	  "plum": "rgb(221, 160, 221)",
	  "plum1": "rgb(255, 187, 255)",
	  "plum2": "rgb(238, 174, 238)",
	  "plum3": "rgb(205, 150, 205)",
	  "plum4": "rgb(139, 102, 139)",
	  "powderblue": "rgb(176, 224, 230)",
	  "purple": "rgb(160, 32, 240)",
	  "purple1": "rgb(155, 48, 255)",
	  "purple2": "rgb(145, 44, 238)",
	  "purple3": "rgb(125, 38, 205)",
	  "purple4": "rgb(85, 26, 139)",
	  "red": "rgb(255, 0, 0)",
	  "red1": "rgb(255, 0, 0)",
	  "red2": "rgb(238, 0, 0)",
	  "red3": "rgb(205, 0, 0)",
	  "red4": "rgb(139, 0, 0)",
	  "rosybrown": "rgb(188, 143, 143)",
	  "rosybrown1": "rgb(255, 193, 193)",
	  "rosybrown2": "rgb(238, 180, 180)",
	  "rosybrown3": "rgb(205, 155, 155)",
	  "rosybrown4": "rgb(139, 105, 105)",
	  "royalblue": "rgb(65, 105, 225)",
	  "royalblue1": "rgb(72, 118, 255)",
	  "royalblue2": "rgb(67, 110, 238)",
	  "royalblue3": "rgb(58, 95, 205)",
	  "royalblue4": "rgb(39, 64, 139)",
	  "saddlebrown": "rgb(139, 69, 19)",
	  "salmon": "rgb(250, 128, 114)",
	  "salmon1": "rgb(255, 140, 105)",
	  "salmon2": "rgb(238, 130, 98)",
	  "salmon3": "rgb(205, 112, 84)",
	  "salmon4": "rgb(139, 76, 57)",
	  "sandybrown": "rgb(244, 164, 96)",
	  "seagreen": "rgb(46, 139, 87)",
	  "seagreen1": "rgb(84, 255, 159)",
	  "seagreen2": "rgb(78, 238, 148)",
	  "seagreen3": "rgb(67, 205, 128)",
	  "seagreen4": "rgb(46, 139, 87)",
	  "seashell": "rgb(255, 245, 238)",
	  "seashell1": "rgb(255, 245, 238)",
	  "seashell2": "rgb(238, 229, 222)",
	  "seashell3": "rgb(205, 197, 191)",
	  "seashell4": "rgb(139, 134, 130)",
	  "sienna": "rgb(160, 82, 45)",
	  "sienna1": "rgb(255, 130, 71)",
	  "sienna2": "rgb(238, 121, 66)",
	  "sienna3": "rgb(205, 104, 57)",
	  "sienna4": "rgb(139, 71, 38)",
	  "skyblue": "rgb(135, 206, 235)",
	  "skyblue1": "rgb(135, 206, 255)",
	  "skyblue2": "rgb(126, 192, 238)",
	  "skyblue3": "rgb(108, 166, 205)",
	  "skyblue4": "rgb(74, 112, 139)",
	  "slateblue": "rgb(106, 90, 205)",
	  "slateblue1": "rgb(131, 111, 255)",
	  "slateblue2": "rgb(122, 103, 238)",
	  "slateblue3": "rgb(105, 89, 205)",
	  "slateblue4": "rgb(71, 60, 139)",
	  "slategray": "rgb(112, 128, 144)",
	  "slategray1": "rgb(198, 226, 255)",
	  "slategray2": "rgb(185, 211, 238)",
	  "slategray3": "rgb(159, 182, 205)",
	  "slategray4": "rgb(108, 123, 139)",
	  "slategrey": "rgb(112, 128, 144)",
	  "snow": "rgb(255, 250, 250)",
	  "snow1": "rgb(255, 250, 250)",
	  "snow2": "rgb(238, 233, 233)",
	  "snow3": "rgb(205, 201, 201)",
	  "snow4": "rgb(139, 137, 137)",
	  "springgreen": "rgb(0, 255, 127)",
	  "springgreen1": "rgb(0, 255, 127)",
	  "springgreen2": "rgb(0, 238, 118)",
	  "springgreen3": "rgb(0, 205, 102)",
	  "springgreen4": "rgb(0, 139, 69)",
	  "steelblue": "rgb(70, 130, 180)",
	  "steelblue1": "rgb(99, 184, 255)",
	  "steelblue2": "rgb(92, 172, 238)",
	  "steelblue3": "rgb(79, 148, 205)",
	  "steelblue4": "rgb(54, 100, 139)",
	  "tan": "rgb(210, 180, 140)",
	  "tan1": "rgb(255, 165, 79)",
	  "tan2": "rgb(238, 154, 73)",
	  "tan3": "rgb(205, 133, 63)",
	  "tan4": "rgb(139, 90, 43)",
	  "thistle": "rgb(216, 191, 216)",
	  "thistle1": "rgb(255, 225, 255)",
	  "thistle2": "rgb(238, 210, 238)",
	  "thistle3": "rgb(205, 181, 205)",
	  "thistle4": "rgb(139, 123, 139)",
	  "tomato": "rgb(255, 99, 71)",
	  "tomato1": "rgb(255, 99, 71)",
	  "tomato2": "rgb(238, 92, 66)",
	  "tomato3": "rgb(205, 79, 57)",
	  "tomato4": "rgb(139, 54, 38)",
	  "turquoise": "rgb(64, 224, 208)",
	  "turquoise1": "rgb(0, 245, 255)",
	  "turquoise2": "rgb(0, 229, 238)",
	  "turquoise3": "rgb(0, 197, 205)",
	  "turquoise4": "rgb(0, 134, 139)",
	  "violet": "rgb(238, 130, 238)",
	  "violetred": "rgb(208, 32, 144)",
	  "violetred1": "rgb(255, 62, 150)",
	  "violetred2": "rgb(238, 58, 140)",
	  "violetred3": "rgb(205, 50, 120)",
	  "violetred4": "rgb(139, 34, 82)",
	  "wheat": "rgb(245, 222, 179)",
	  "wheat1": "rgb(255, 231, 186)",
	  "wheat2": "rgb(238, 216, 174)",
	  "wheat3": "rgb(205, 186, 150)",
	  "wheat4": "rgb(139, 126, 102)",
	  "white": "rgb(255, 255, 255)",
	  "whitesmoke": "rgb(245, 245, 245)",
	  "yellow": "rgb(255, 255, 0)",
	  "yellow1": "rgb(255, 255, 0)",
	  "yellow2": "rgb(238, 238, 0)",
	  "yellow3": "rgb(205, 205, 0)",
	  "yellow4": "rgb(139, 139, 0)",
	  "yellowgreen": "rgb(154, 205, 50)"
	};
	
	return {

		/**
		 * Convert an X11 color name into a CSS rgb(...) value.
		 *
		 * Names are stripped of spaces and converted to lowercase.	 If the name is
		 * unknown, null is returned.
		 *
		 * This list of color name to RGB mapping is derived from the stock X11
		 * rgb.txt file.
		 *
		 * @param {string} name The color name to convert.
		 * @return {string} The corresponding CSS rgb(...) value.
		 */
		nameToRGB: function(name) {
			if (name in rootObj.colorNames)
			return rootObj.colorNames[name];

			name = name.toLowerCase();
			if (name in rootObj.colorNames)
			return rootObj.colorNames[name];

			name = name.replace(/\s+/g, '');
			if (name in rootObj.colorNames)
				return rootObj.colorNames[name];

			return null;
		},
		
		testIfHex: function(v) {
			var isHex  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(v);
			return isHex;
		},
		
		rgbToHex: function(color) {
				var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

				var r = parseInt(digits[2]);
				var g = parseInt(digits[3]);
				var b = parseInt(digits[4]);

			    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		},

		hslToHex: function(data) {
			//https://github.com/jakubpawlowicz/clean-css/blob/master/lib/colors/hsl-to-hex.js
			  // HSL to RGB converter. Both methods adapted from:
			  // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
			  var hslToRgb = function(h, s, l) {
			    var r, g, b;

			    // normalize hue orientation b/w 0 and 360 degrees
			    h = h % 360;
			    if (h < 0)
			      h += 360;
			    h = ~~h / 360;

			    if (s < 0)
			      s = 0;
			    else if (s > 100)
			      s = 100;
			    s = ~~s / 100;

			    if (l < 0)
			      l = 0;
			    else if (l > 100)
			      l = 100;
			    l = ~~l / 100;

			    if (s === 0) {
			      r = g = b = l; // achromatic
			    } else {
			      var q = l < 0.5 ?
			        l * (1 + s) :
			        l + s - l * s;
			      var p = 2 * l - q;
			      r = hueToRgb(p, q, h + 1/3);
			      g = hueToRgb(p, q, h);
			      b = hueToRgb(p, q, h - 1/3);
			    }

			    return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
			  };

			  var hueToRgb = function(p, q, t) {
			    if (t < 0) t += 1;
			    if (t > 1) t -= 1;
			    if (t < 1/6) return p + (q - p) * 6 * t;
			    if (t < 1/2) return q;
			    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			    return p;
			  };

			  return {
			    process: function() {
			      return data.replace(/hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/g, function(match, hue, saturation, lightness) {
			        var asRgb = hslToRgb(hue, saturation, lightness);
			        var redAsHex = asRgb[0].toString(16);
			        var greenAsHex = asRgb[1].toString(16);
			        var blueAsHex = asRgb[2].toString(16);

			        return '#' +
			          ((redAsHex.length == 1 ? '0' : '') + redAsHex) +
			          ((greenAsHex.length == 1 ? '0' : '') + greenAsHex) +
			          ((blueAsHex.length == 1 ? '0' : '') + blueAsHex);
			      });
			    }
			  };
		},

		nameToHex: function(name) {
			name = name.replace('/#','/');
			var hexColor;
			var isHex = this.testIfHex(name);
			if (isHex) {
				return "#" + name;
			}
			if (name in rootObj.colorNames) {
				hexColor = this.rgbToHex(rootObj.colorNames[name]);
				return hexColor;
			}
			name = name.toLowerCase();
			if (name in rootObj.colorNames) {
				hexColor = this.rgbToHex(rootObj.colorNames[name]);
				return hexColor;
			}
			name = name.replace(/\s+/g, '');
			if (name in rootObj.colorNames) {
				hexColor = this.rgbToHex(rootObj.colorNames[name]);
				return hexColor;
			}
			return null;
		},

		/**
		 * Convert an X11 color value into an CSS rgb(...) color value.
		 *
		 * The X11 value may be an X11 color name, or an RGB value of the form
		 * rgb:hhhh/hhhh/hhhh.	If a component value is less than 4 digits it is
		 * padded out to 4, then scaled down to fit in a single byte.
		 *
		 * @param {string} value The X11 color value to convert.
		 * @return {string} The CSS color value or null if the value could not be
		 *	   converted.
		 */
		x11ToCSS: function(v) {
			function scale(v) {
				// Pad out values with less than four digits.  This padding (probably)
				// matches xterm.  It's difficult to say for sure since xterm seems to
				// arrive at a padded value and then perform some combination of
				// gamma correction, color space tranformation, and quantization.

				if (v.length == 1) {
					// Single digits pad out to four by repeating the character.	"f" becomes
					// "ffff".  Scaling down a hex value of this pattern by 257 is the same
					// as cutting off one byte.  We skip the middle step and just double
					// the character.
					return parseInt(v + v, 16);
				}

				if (v.length == 2) {
					// Similar deal here.	 X11 pads two digit values by repeating the
					// byte (or scale up by 257).	 Since we're going to scale it back
					// down anyway, we can just return the original value.
					return parseInt(v, 16);
				}

				if (v.length == 3) {
					// Three digit values seem to be padded by repeating the final digit.
					// e.g. 10f becomes 10ff.
					v = v + v.substr(2);
				}

				// Scale down the 2 byte value.
				return Math.round(parseInt(v, 16) / 257);
			}
		
			var ary = v.match(rootObj.re_.x11rgb);
			// console.log(ary);
			if (!ary)
			return this.nameToRGB(v);

			ary.splice(0, 1);
			return rootObj.arrayToRGBA(ary.map(scale));
		}	
	};
}]);
/*global TADkit */

TADkit.factory('Genes', ['$q', '$http', function($q, $http) {
	"use strict";
	var ensemblRoot = "http://rest.ensembl.org/";
	var genes = "";
	return {
		loadRegionGenes: function(species, requestSlice) {
			var deferral = $q.defer();
			// $http.get('assets/json/drosophila_melanogaster-genes.json')
			$http.get(ensemblRoot + "overlap/region/" + species + "/" + requestSlice + "?feature=gene;content-type=application/json")
			.success(function(data){
				genes = data;
				console.log( data.length + " genes for region " + requestSlice + " of " + species + " retreived from Ensembl.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getGenes: function () {
			return genes;
		},
		getGenesCount: function () {
			return genes.length;
		},
		getGenesPresent: function (genes, currentFragment, fragmentsCount, TADStart, fragmentLength) {
			var genesPresent = [];
			var fragmentLower = TADStart + (fragmentLength * currentFragment);
			var fragmentUpper = fragmentLower + fragmentLength;
			// For every gene [j]...
			for(var j=0; j<genes.length; j++){
				var start = genes[j].start;
				var end = genes[j].end;
				if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
					genesPresent.push(genes[j]);
				}
			}
			return genesPresent;
		},
		getColors: function(genes, biotypes, fragmentsCount, TADStart, fragmentLength) {
			var colors = [];
			var totalLength = fragmentsCount * fragmentLength;
			// console.log(fragmentsCount);
			
			// For every fragment [i]...
			for(var i=0; i<fragmentsCount; i++){
				var biotypesPresent = [];
				var fragmentLower = TADStart + (fragmentLength * i);
				var fragmentUpper = fragmentLower + fragmentLength;
				var genesCount = this.getGenesCount();
				var color = "#cccccc"; // Base color - ie if none found

				// For every gene [j]...
				for(var j=0; j<genesCount; j++){
					var start = genes[j].start;
					var end = genes[j].end;
					var inFragments = [];
					 // check if overlaps current fragment [i]
					if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
						// console.log("Yes gene " + genes[j].external_name + "("+j+") in fragment " + i );
						inFragments.push(i);
						
						if (biotypesPresent.length > 0) {
							
							// Simple weight - give preference to smaller fragments
							if ( biotypesPresent[0] == "protein_coding" ) {
								biotypesPresent[0] = genes[j].biotype;
							} else {
								biotypesPresent.push(biotype);
							}
						} else {
							biotypesPresent.push(genes[j].biotype);							
						}
						
					} else {
						// if (i==3) console.log("No genes in fragment " + i );
						// if (j == 0) console.log( JSON.stringify(fragmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(fragmentUpper)+", "+JSON.stringify(end) );
					}
					// console.log(inFragments);
					genes[j].inFragments = inFragments;
				}
				// console.log(i);
				// console.log(biotypesPresent);
				for(var k=0; k<biotypesPresent.length; k++){
					var biotype = biotypesPresent[0].toLowerCase();
					if (biotype in biotypes) {
						color = biotypes[biotype];
					} else {
						color = "#110100";
					}
				}
				colors.push(color);
				// console.log(biotypesPresent);
			}
			// console.log(colors);
			// console.log(genes);
			return colors;
		},
		getRandomColors: function( fragmentsCount ) {
			var colors = [];
			console.log(fragmentsCount);
			for(var i=0; i<fragmentsCount; i++){
				var color = "#" + Math.floor(Math.random()*16777215).toString(16);
				colors.push(color);
			}
			return colors;
		}
	};
}]);

/*global TADkit */

TADkit.factory('Proteins', ['$q', '$http', function($q, $http) {
	"use strict";
	var proteins = "";
	return {
		loadProteins: function(species, requestSlice) {
			var deferral = $q.defer();
			$http.get('assets/json/GSE22069_norm_aggregated_discretized_tiling_arrays.json')
			.success(function(data){
				proteins = data;
				console.log("Proteins for region " + requestSlice + " of " + species + " retreived from file.");
				deferral.resolve(data);
			});
			return deferral.promise;
		},
		getProteins: function () {
			return proteins;
		},
		getSampleCount: function () {
			return proteins.length;
		},
		getProteinsList: function () {
   		 // first four entries are fragmentID, chromosome, start and end... the rest are proteins.
			var proteinsList = [];
			for (var i = 4; i < proteins[0].length; i++) {
				for(var protein in proteins[0]){
				  proteinsList.push(protein); // first sample as an example.
				}				
			}
			return proteinsList;
		},
		getProteinCount: function () {
		 // first four entries are fragmentID, chromosome, start and end... the rest are proteins.
			var proteinsCount = proteins[0].length - 4; // first sample as an example.
			return proteinsCount;
		},
		getProteinArray: function (data, id) {
			var dataset = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i][id]==1) {
					dataset.push( {"fragmentID":data[i].fragmentID, "chromosome":data[i].chromosome, "start":data[i].start, "end":data[i].end} );
				} else {
					// console.log("None found in sample.");
				}
			}
			// console.log(dataset);
			return dataset;
		},
		getColors: function(proteins, proteinType, fragmentsCount, TADStart, fragmentLength) {
			var colors = [];
			var totalLength = fragmentsCount * fragmentLength;
			var data = this.getProteinArray(proteins, proteinType);
			var proteinColor = "#999999";
			
		// PULL IN COLORS FROM OTHER SOURCE...
				if (proteinType == "HP1") proteinColor = "#227c4f"; //238554
				if (proteinType == "BRM") proteinColor = "#8ece0d"; //aaff00
				if (proteinType == "MRG15") proteinColor = "#e71818";
				if (proteinType == "PC") proteinColor = "#6666ff";
				if (proteinType == "H1") proteinColor = "#424242";
				
			// console.log(data);
			// For every fragment [i]...
			for(var i=0; i<fragmentsCount; i++){
				var biotypesPresent = [];
				var fragmentLower = TADStart + (fragmentLength * i);
				var fragmentUpper = fragmentLower + fragmentLength;
				var proteinsCount = data.length;
				var proteinPresent = "#cccccc"; // Base color - ie if none found

				// For every gene [j]...
				for(var j=0; j<proteinsCount; j++){
					var start = data[j].start;
					var end = data[j].end;
					 // check if overlaps current fragment [i]
					if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
							proteinPresent = proteinColor;
					}
				}
				colors.push(proteinPresent);
			}
			// console.log(colors);
			return colors;
		}
		
	};
}]);

/*global TADkit */

TADkit.factory('Settings', function() {
	"use strict";
	var particles = false;
	var chromatin = true;
	var genes = true;
	var contacts = false;
	var hp1 = false;
	var brm = false;
	var mrg15 = false;
	var pc = false;
	var h1 = false;
	var sense = true;
	return {
		toggle: function (bool) {
			bool = !bool;
			return bool;
		},
		toggleParticles: function () {
			particles = this.toggle(particles);
			return particles;
		},
		getParticles: function () {
			return particles;
		},
		toggleChromatin: function () {
			chromatin = this.toggle(chromatin);
			return chromatin;
		},
		getChromatin: function () {
			return chromatin;
		},
		toggleGenes: function () {
			genes = this.toggle(genes);
			return genes;
		},
		getGenes: function () {
			return genes;
		},
		toggleContacts: function () {
			contacts = this.toggle(contacts);
			return contacts;
		},
		getContacts: function () {
			return contacts;
		},
		toggleHP1: function () {
			hp1 = this.toggle(hp1);
			return hp1;
		},
		getHP1: function () {
			return hp1;
		},
		toggleBRM: function () {
			brm = this.toggle(brm);
			return brm;
		},
		getBRM: function () {
			return brm;
		},
		toggleMRG15: function () {
			mrg15 = this.toggle(mrg15);
			return mrg15;
		},
		getMRG15: function () {
			return mrg15;
		},
		togglePC: function () {
			pc = this.toggle(pc);
			return pc;
		},
		getPC: function () {
			return pc;
		},
		toggleH1: function () {
			h1 = this.toggle(h1);
			return h1;
		},
		getH1: function () {
			return h1;
		},
		switchColors: function () {
			
		},
		toggleSense: function () {
			sense = this.toggle(sense);
			console.log(sense);
			return sense;
		},
		getSense: function () {
			return sense;
		}
	};
});


TADkit.factory('test', function() {
	"use strict";
	return "Here it is!";
});

/*global TADkit */

TADkit.factory('TAD', ['$q', '$http', function($q, $http) {
	"use strict";
	var TAD = null;
	var detailFactor = 20;
	return {
		loadTAD: function() {
			var deferral = $q.defer();
			$http.get('assets/json/tad.json').
				success(function(data){
					TAD = data;
					TAD.metadata.lengthBP = TAD.metadata.end - TAD.metadata.start;
					TAD.metadata.segments = detailFactor;//parseInt( TAD.metadata.lengthBP / TAD.metadata.resolution ) / detailFactor;
					console.log("TAD data retreived from file.");
					deferral.resolve(data);
				});
				return deferral.promise;
		},
		setTAD: function (data) {
			TAD = data;
		},
		getTAD: function () {
			return TAD;
		},
		getMetadata: function () {
			return TAD.metadata;
		},
		getLengthBP: function () {
			return TAD.metadata.lengthBP;
		},
		getSpecies: function () {
			var species = TAD.metadata.species;
			return species;
		},
		getSpeciesUrl: function () {
			var species = TAD.metadata.species;
			species = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
			return species;
		},
		getVertices: function () {
			return TAD.vertices;
		},
		getParticles: function () {
			var vertices = this.getVertices();
			var particles = [];
			var offset = 0, particle;
			var totalVertices = vertices.length;
			while ( offset < totalVertices ) {
				particle = {};
				particle.x = vertices[ offset ++ ];
				particle.y = vertices[ offset ++ ];
				particle.z = vertices[ offset ++ ];
				particles.push( particle );
			}
			return particles;
		},
		getParticlesCount: function () {
			var particlesCount = TAD.vertices.length / 3;
			return particlesCount;
		},
		getSegments: function () {
			var segments = TAD.metadata.segments; // eg. ANOTHER WAY OF CHOOSING IT...
			return segments;
		},
		getSlice: function () {
			var metadata = TAD.metadata;
			var slice = metadata.chromosome + ":" + metadata.start + "-" + metadata.end;
			return slice;
		}
	};
}]);

/*global TADkit, d3 */

TADkit.directive('tkContacts', function(){
	"use strict";
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			position:'=',
			positions:'=',
			segments:'=',
			focusstart:'=',
			focusend:'='
		},
		link:function(scope,elem,attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){
				if (newValue !== oldValue) {

					var data = scope.data;

					var position = newValue;
					var positions = scope.positions;
					var segments = scope.segments;
					var particles = positions / segments;

					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 40, bottom: 0, left: 40},
						width = divWidth - margin.left - margin.right,
						height = 20 - margin.top - margin.bottom,
						nodeHeight = 10;

					var x = d3.scale.linear()
						.range([0, width])
						.clamp(true);
					var y = d3.scale.linear()
						.range([0, 1])
						.clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;

					var particleWidth = width / particles;
					var particlePosition = Math.floor((position * particles)/ positions);
					// console.log("particlePosition: "+JSON.stringify(particlePosition));
					// var test = Math.floor(position/segments);
					// console.log(test);
					
					var mindist = d3.min(data, function(d) { return d.dist; });
					var maxdist = d3.max(data, function(d) { return d.dist; });
						x.domain([1, particles]);
						y.domain([mindist, maxdist]);

					// d3.select("#highlight").style("visibility", "visible");

					// d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 0.5)) }); // DOES OFFSET CORRECTLY
					d3.selectAll("#highlight").attr("x", function() { return Math.floor(particlePosition - (particleWidth * 0.5)); });

					d3.select("#contacts").selectAll(".clipped").remove();
					// console.log(data);

				var clipped = d3.select("#contacts").selectAll(".chart").append("g")
				.attr('clip-path', 'url(#clip)')
				.attr("class", "clipped");
				
				var interactGraph = clipped.selectAll("rect")
					.data( data.filter(function(d){ return (d.a	 == particlePosition+1); }))
					.enter().append("rect")
					.attr("x", function(d) { return x(d.b+1); } )
					.attr("y", 0 )
					.attr("width", function(d) { return particleWidth; } )
					.attr("height", nodeHeight )
					.style("opacity", function(d) { return y(d.dist) ; } )
					.attr("class", "particle" );

				}
			});

			scope.$watch('data',function(newValue, oldValue){
				if (newValue !== oldValue) {

					var data = newValue;
					
					var divWidth = elem[0].parentNode.clientWidth;
					var target = scope.id;
					var position = scope.position;
					var positions = scope.positions;
					var segments = scope.segments;
					var particles = positions / segments;
					
					var margin = {top: 0, right: 40, bottom: 0, left: 40},
						width = divWidth - margin.left - margin.right,
						height = 20 - margin.top - margin.bottom,
						nodeHeight = 10;

					var particleWidth = width / particles;
					var particlePosition = Math.floor((position * particles)/ positions);

					var x = d3.scale.linear()
						.range([0, width])
						.clamp(true);
					var y = d3.scale.linear()
						.range([0, 1])
						.clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / particles	;

					var uAxis = d3.svg.axis().scale(x).orient("top");
					var xAxis = d3.svg.axis().scale(x).orient("bottom");

					var svg = d3.select('#' + target).append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);

					svg.append("defs").append("clipPath")
						.attr("id", "clip")
						.append("rect")
						.attr("width", width)
						.attr("height", height);

					var chart = svg.append("g")
						.attr("class", "chart");

					var clipped = chart.append("g")
						.attr('clip-path', 'url(#clip)')
						.attr("class", "clipped");

					var mindist = d3.min(data, function(d) { return d.dist; });
					var maxdist = d3.max(data, function(d) { return d.dist; });
						x.domain([1, particles]);
						y.domain([mindist, maxdist]);
	
					// svg.select(".chart").append("g")
					// 	.attr("class", "x axis")
					// 	.attr("transform", "translate(0," + nodeHeight + ")")
					// 	.call(xAxis);
					svg.select(".chart").append("g")
						.attr("class", "u axis")
						.attr("transform", "translate(0,0)")
						.call(uAxis);

					var titletext = "Contact";
					var title = svg.append("text")
						.attr("x", -4)             
						.attr("y", 8)
						.attr("text-anchor", "end")  
						.style("font-size", "10px") 
						.text(titletext);
						
					var interactGraph = clipped.selectAll("rect")
						.data(data.filter(function(d){ return (d.a == particlePosition+1); }))
						.enter().append("rect")
						.attr("x", function(d) { return x(d.b+1); } )
						.attr("y", 0 )
						.attr("width", function(d) { return particleWidth; } )
						.attr("height", nodeHeight )
						.style("opacity", function(d) { return y(d.dist) ; } )
						.attr("class", "particle" );

					var highlight = svg.append("rect")
							.attr("id", "highlight")
							.attr("x", function(d) { return particlePosition - (positionWidth * 0.5); } )
							.attr("y", 0)
							.attr("width", particleWidth )
							.attr("height", height)
							.attr("class", "highlight");

				}	
			});
		}
	};
});
			

/*global TADkit, d3 */

TADkit.directive('tkGenes', function(){
	"use strict";
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			position:'=',
			positions:'=',
			assemblylength:'=',
			focusstart:'=',
			focusend:'=',
			sense:'='
		},
		link:function(scope, elem, attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){

				if (newValue !== oldValue) {
					// console.log(newValue);
					var positions = scope.positions;
					
					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 40, bottom: 40, left: 40};
					var width = divWidth - margin.left - margin.right;
					var x = d3.scale.linear().range([0, width]).clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;
					var highlightWidth = positionWidth * width / focusLength;

				if (highlightWidth < 4) highlightWidth = 4; 
					var highlightPosition = focusStart + (positionWidth * newValue);
					// console.log( highlightPosition );
					
					x.domain([focusStart, focusEnd]);
					
					d3.select("#highlight").style("visibility", "visible");

					// d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 0.5)) }); // DOES OFFSET CORRECTLY
					d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 4)); });
				}
			});
			
			scope.$watch('data',function(newValue, oldValue){
				
			function draw() {
				svg.select("g.x.axis").call(xAxis);
				barsGroup.selectAll("rect")
				.attr("x", function(d) { return Math.floor(x(d.start)); } )
				.attr("y", function(d) { if (scope.sense) { if (d.strand < 1) {return (nodeHeight);} } else {return 0;} } )
				.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
				// console.log(zoom.translate());
				// console.log(zoom.scale());
				svg.select("#highlight").style("visibility", "hidden");
				// .attr("x", function(d) { return x( highlightPosition - (positionWidth * 4)); } )
				// .attr("width", highlightWidth );
				
			}
		
			if (newValue !== oldValue) {
				// *** START D3 ****
				// d3.select(window).on('resize', resize);
				console.log("D3 initiated");
		
				var data = scope.data;
				var assemblyLength = scope.assemblylength;
				var target = scope.id;
				var position = scope.position;
				var positions = scope.positions;
				
				var divWidth = elem[0].parentNode.clientWidth;

				var margin = {top: 0, right: 40, bottom: 40, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 60 - margin.top - margin.bottom,
					nodeHeight = 10;

				var chrStart = 0;
				var chrEnd = scope.assemblylength;
				// console.log(chrEnd);
				
				var x = d3.scale.linear().range([0, width]).clamp(true);
				
				var focusStart = scope.focusstart;
				var focusEnd = scope.focusend;
				var focusLength = focusEnd - focusStart;
				var positionWidth = focusLength / positions;
				var highlightWidth = positionWidth * width / focusLength;
				if (highlightWidth < 4) highlightWidth = 4; 

				var focusScale = assemblyLength / focusLength;
				// console.log(focusScale);
				var focusMargin = focusScale * 0.05;
				focusScale = focusScale - (focusMargin * 2.0);
	
				var focusCenter = focusLength * 0.5;
				var assemblyCenter = assemblyLength * 0.5;
				var focusOffset = x(assemblyCenter) - x(focusCenter) ;
				// console.log(focusOffset);

				var focusTranslate = x(focusOffset) * focusScale;
				// console.log("focusTranslate");
				// console.log(focusTranslate);
				focusTranslate = -12615;

				var xAxis = d3.svg.axis().scale(x).orient("bottom"),
					prime3Axis = d3.svg.axis().orient("left"),
					prime5Axis = d3.svg.axis().orient("right");

				var zoom = d3.behavior.zoom()
					    .on("zoom", draw);

				var svg = d3.select('#' + target).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				    .call(zoom);


				svg.append("defs").append("clipPath")
					.attr("id", "clip")
					.append("rect")
					.attr("width", width)
					.attr("height", height);

				var focus = svg.append("g")
					.attr("class", "focus");

				var barsGroup = focus.append("g")
					.attr('clip-path', 'url(#clip)');

					x.domain([focusStart, focusEnd]);
			
				    zoom.x(x);
			
				svg.select(".focus").append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

					var prime3 = svg.append("text")
						.attr("x", -12)             
						.attr("y", -3)
						.attr("text-anchor", "right")  
						.style("font-size", "10px") 
						.text("3'");
		
					var prime5 = svg.append("text")
						.attr("x", width + 8)             
						.attr("y", -3)
						.attr("text-anchor", "left")  
						.style("font-size", "10px") 
						.text("5'");
		
					var sense = svg.append("text")
						.attr("x", -18)             
						.attr("y", 8)
						.attr("text-anchor", "right")  
						.style("font-size", "10px") 
						.text("<<");
		
					var antisense = svg.append("text")
						.attr("x", -18)             
						.attr("y", 18)
						.attr("text-anchor", "right")  
						.style("font-size", "10px") 
						.text(">>");
		
				var focusGraph = barsGroup.selectAll("rect")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return Math.floor(x(d.start)); } )
					.attr("y", function(d) { if (scope.sense) { if (d.strand < 1) {return (nodeHeight);} } else {return 0;} } )
					.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
					.attr("height", (nodeHeight) )
					.attr("class", function(d) { return d.biotype.toLowerCase(); } );
			
					var highlightPosition = focusStart + (positionWidth * position);
					// console.log(highlightPosition);

				var highlight = svg.append("rect")
						.attr("id", "highlight")
						.attr("x", function(d) { return x( highlightPosition - (positionWidth * 4)); } )
						.attr("y", 0)
						.attr("width", highlightWidth )
						.attr("height", height)
						.attr("class", "highlight");
					 
					// focusGraph.call(zoom.translate([focusTranslate,0]).scale(focusScale));
			
				    draw();

				// function resize(target) {
				// 	var divWidth = elem.parentNode.clientWidth;
				// 	var margin = {top: 0, right: 40, bottom: 40, left: 40};
				// 	width = divWidth - margin.left - margin.right;
				//
				// 	x = d3.scale.linear().range([0, width]).clamp(true);
				//
				// 	console.log(width);
				//
				// 	svg.attr("width", width + margin.left + margin.right);
				//
				// 	d3.select("#clip").selectAll("rect").attr("width", width);
				//
				// 	svg.select("g.x.axis").call(xAxis);
				//
				// 	d3.select("#prime5").attr("x", width + 8);
				//
				// }
			}

			});
		}
	};
});
			

/*global TADkit, d3 */

TADkit.directive('tkProteins', function(){
	"use strict";
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			// toggleHP1: '&',
			color:'@',
			position:'=',
			positions:'=',
			focusstart:'=',
			focusend:'='
		},
		// template:'<span id="chart{{id}}"></span>' +
		// 		'<a ng-click="toggleHP1()" class="toggle">{{id}}' +
		// 		'	<span data-ng-hide="showHP1"><i class="fa fa-toggle-off"></i></span>' +
		// 		'	<span data-ng-show="showHP1"><i class="fa fa-toggle-on"></i></span>' +
		// 		'</a>' +
		// 		'</span>',
		link:function(scope, elem, attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){
				if (newValue !== oldValue) {
					var positions = scope.positions;

					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 40, bottom: 0, left: 40};
					var width = divWidth - margin.left - margin.right;
					var x = d3.scale.linear().range([0, width]).clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;
					var highlightWidth = positionWidth * width / focusLength;

				if (highlightWidth < 4) highlightWidth = 4;
					var highlightPosition = focusStart + (positionWidth * newValue);
					// console.log( positionWidth );

					x.domain([focusStart, focusEnd]);

					// d3.select("#highlight").style("visibility", "visible");

					// d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 0.5)); }); // DOES OFFSET CORRECTLY
					d3.selectAll("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 4)); });
				}
			});
			
			function getProteinArray (data, id) {
				var dataset = [];
				for (var i = 0; i < data.length; i++) {
					if (data[i][id]==1) {
						var sample = [];
						dataset.push( {"fragmentID":data[i].fragmentID, "chromosome":data[i].chromosome, "start":data[i].start, "end":data[i].end} );
					} else {
						// console.log("None found in sample.");
					}
				}
				// console.log(dataset);
				return dataset;
			}
			
			scope.$watch('data',function(newValue, oldValue){
				// console.log(scope.id);
				
			if ( newValue ) {
				// *** START D3 ****
				// d3.select(window).on('resize', resize);
				console.log("Protein tracks initiated");
				var dataset = getProteinArray(scope.data, scope.id);
				var data = dataset;
				var assemblyLength = scope.assemblylength;
				var target = scope.id;
				var position = scope.position;
				var positions = scope.positions;

				var divWidth = elem[0].parentNode.clientWidth;

				var margin = {top: 0, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 20 - margin.top - margin.bottom,
					nodeHeight = 10;

				var x = d3.scale.linear().range([0, width]).clamp(true);

				var focusStart = scope.focusstart;
				var focusEnd = scope.focusend;
				var focusLength = focusEnd - focusStart;
				var positionWidth = focusLength / positions;
				var highlightWidth = positionWidth * width / focusLength;
				// var highlightWidth = 1 / positions * width; //???
				
				if (highlightWidth < 4) highlightWidth = 4;

				var xAxis = d3.svg.axis().scale(x).orient("top"),
					prime3Axis = d3.svg.axis().orient("left"),
					prime5Axis = d3.svg.axis().orient("right");

				var svg = d3.select('#' + target).append("svg")
				// var svg = d3.select('#chart').append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom);

				svg.append("defs").append("clipPath")
					.attr("id", "clip")
					.append("rect")
					.attr("width", width)
					.attr("height", height);

				var chart = svg.append("g")
					.attr("class", "chart");

				var clipped = chart.append("g")
					.attr('clip-path', 'url(#clip)');

					x.domain([focusStart, focusEnd]);

				svg.select(".chart").append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0,0)")
					.call(xAxis);

				var titletext = scope.id;
				var title = svg.append("text")
					.attr("x", -6)             
					.attr("y", 8)
					.attr("text-anchor", "end")  
					.style("font-size", "10px") 
					.text(titletext);

				var focusGraph = clipped.selectAll("rect")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return Math.floor(x(d.start)); } )
					.attr("y", 0 )
					.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
					.attr("height", (nodeHeight) )
					.attr("class", function(d) { return scope.id; } );

				var highlightPosition = focusStart + (positionWidth * position);
				// console.log(highlightPosition);

				var highlight = svg.append("rect")
						.attr("id", "highlight")
						.attr("x", function(d) { return x( highlightPosition - (positionWidth * 4)); } )
						.attr("y", 0)
						.attr("width", highlightWidth )
						.attr("height", height)
						.attr("class", "highlight");

				// function resize(target) {
				// 	var divWidth = elem.parentNode.clientWidth;
				// 	var margin = {top: 0, right: 40, bottom: 40, left: 40};
				// 	width = divWidth - margin.left - margin.right;
				//
				// 	x = d3.scale.linear().range([0, width]).clamp(true);
				//
				// 	console.log(width);
				//
				// 	svg.attr("width", width + margin.left + margin.right);
				//
				// 	d3.select("#clip").selectAll("rect").attr("width", width);
				//
				// 	svg.select("g.x.axis").call(xAxis);
				//
				// 	d3.select("#prime5").attr("x", width + 8);
				//
				// }
			}

			});
		}
	};
});
			

/*global TADkit, d3 */

TADkit.directive('tkSlider', function(){
	"use strict";
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			position:'=',
			fragments:'='
		},
		link:function(scope, elem, attrs){
			
			scope.safeApply = function(fn) {
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) { fn(); }
				} else {
				this.$apply(fn);
				}
			};

			function updatePosition (position) {
				scope.safeApply( function (	) {
					scope.position = position;
					// console.log(scope.position);
				});
			}
			
			scope.$watch('data',function(newValue, oldValue){

				function brushed() {
				    /*jshint validthis: true */
					var value = brush.extent()[0];

					if (d3.event.sourceEvent) {
						value = x.invert(d3.mouse(this)[0]);
						brush.extent([value, value]);
					}
					handle.attr("cx", x(value) - (handleWidth * 0.5));
					updatePosition(value);
				}

				if (newValue !== oldValue) {

				var data = scope.data;
				var target = scope.id;
				var divWidth = elem[0].parentNode.clientWidth;
				var fragments = scope.fragments;
		
				var margin = {top: 0, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 20 - margin.bottom - margin.top,
					trackHeight = 10;

				var x = d3.scale.linear().range([0, width]).clamp(true);

				var sliderStart = 0;
				var sliderEnd = fragments-1;
				// console.log(sliderEnd);

				x.domain([sliderStart, sliderEnd]);
				var handleWidth = Math.max( (width / sliderEnd), 4 );
				// console.log(handleWidth);
				var handleHeight = trackHeight * 2.0;

				var brush = d3.svg.brush()
					.x(x)
					.extent([0, 0])
					.on("brush", brushed);

				var svg = d3.select('#' + target).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g");

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height / 2 + ")")
					.call(d3.svg.axis()
					  .scale(x)
					  .orient("bottom")
					  .outerTickSize([0])
				  )
				  .select(".domain")
				  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
					.attr("class", "halo");

				var slider = svg.append("g")
					.attr("class", "slider")
					.call(brush);

				slider.selectAll(".extent,.resize")
					.remove();

				slider.select(".background")
					.attr("height", height);

				// var handle = slider.append("rect")
				// 	.attr("class", "handle")
				// 	.attr("x", -1.0 * (handleWidth * 0.5) )
				// 	.attr("y", 0)
				// 	.attr("width", handleWidth)
				// 	.attr("height", handleHeight);

				var handle = slider.append("circle")
					.attr("class", "handle")
						.attr("cy", 10)
					.attr("r", handleWidth * 1.6);

				slider
					.call(brush.extent([(scope.position), 0]))
					.call(brush.event);

			}
			});
		}
	};
});

/*global angular, TADkit, THREE */

TADkit.factory('Chromatin', [ function () {
	"use strict";
	// constructor for chromatin model instances
	function Chromatin( data, colors, overrides) {
		// console.log("colors in cly");
		// console.log(colors.length);
		
		var defaults = {
			chromatinVisibility: true,
			particles: 0,
			particleSegments: 5,
			curveSegments: 1,
			radius: 15,
			radiusSegments: 16,
			endcap: false,
			pathClosed: false
		};		
		overrides = overrides || { };
		angular.extend(this, angular.copy(defaults), overrides);
		
		var TADGeometry = getTADGeometry( data );
		var pathControls = getPathControls( TADGeometry.vertices );
		if (this.particles === 0) this.particles = pathControls.length - 1;
		
		var pathSegments = this.particles * this.particleSegments;
		this.pathSegments = pathSegments;
		// Calculate PathSegments based on number of base pairs in the TAD ?
		var pathCoords = getSplinePath (pathControls, pathSegments);
		
		var chromatinFiber = new THREE.Object3D(); // unmerged mesh
		var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
		var fragmentColors = getFragmentColors(pathSegments);

		// for ( var i = 0 ; i < pathSegments - 1; i++) {
		// 	this.endcap = ( i == 0 || i == pathSegments - 2 ) ? false : true ;
		for ( var i = 0 ; i < pathSegments; i++) {
			this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
			
			var fragmentColor = colors[i];
			var fragmentMaterial = new THREE.MeshLambertMaterial({
				color: fragmentColor,
				ambient: fragmentColor,
				emissive: fragmentColor,
				vertexColors: THREE.VertexColors,
				//shading: THREE.FlatShading,
				opacity: 1.0,
				transparent: false,
				wireframe: false
			});
			var fragment = fragmentGeometry(pathCoords[i], pathCoords[i+1], this );
			chromatinGeometry.merge(fragment);

			var chromatinFragment = new THREE.Mesh( fragment, fragmentMaterial);
			chromatinFragment.name = "fragment-"+i;
			chromatinFiber.add(chromatinFragment);
		}
		chromatinGeometry.computeBoundingSphere();
		chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
		chromatinFiber.name = "Chromatin Fiber";
		chromatinFiber.visible = this.chromatinVisibility;
		
		this.fiber = chromatinFiber;
		this.center = chromatinGeometry.boundingSphere.center;
		this.bounds = chromatinGeometry.boundingSphere.radius;
		// console.log("Chomatin Object");
		// console.log(this);
	}
	
	function getCenter( vertices ) {
		var centroid = new THREE.Vector3();
		var count = vertices.length;
		for ( var i=0; i < count; i++ )
		{
			centroid.x += vertices[i].x;
			centroid.y += vertices[i].y;
			centroid.z += vertices[i].z;
		}
			centroid.x /= count;
			centroid.y /= count;
			centroid.z /= count;
		console.log("Centroid: %s", JSON.stringify(centroid));
		return centroid;
	}
	
	function getTADGeometry( data ) {
		var offset = 0, vertex,
			 TADGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			TADGeometry.vertices.push( vertex );
		}
		return TADGeometry;
	}
	
	function getPathControls( vertices ) {
		// PATH CONTROLS
		// (totalParticles - 1) because (fore = [i+1])
		var totalParticles = vertices.length;
		var pathControls = [];
		// for (var i = 0 ; i < totalParticles - 1 ; i++) {
		for (var i = 0 ; i < totalParticles - 1 ; i++) {
			var baseParticle = vertices[i];
			var foreParticle = vertices[i + 1];
			var midCoord = new THREE.Vector3(0,0,0);
			midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
			var midOffset = new THREE.Vector3(0,0,0);
			midOffset.copy(midCoord).sub(baseParticle);
			if (i === 0) { // insert backprojected first coord
				var preCoord = new THREE.Vector3(0,0,0);
				preCoord.copy(baseParticle).sub(midOffset);
				pathControls.push(preCoord);
			}
			//pathControls.push(baseParticle);
			pathControls.push(midCoord);
			// if (i == totalParticles - 2) {
			// //	pathControls.push(foreParticle);
			// 	var endCoord = new THREE.Vector3(0,0,0);
			// 	endCoord.copy(foreParticle).add(midOffset);
			// 	pathControls.push(endCoord);
			// };
			if (i == totalParticles - 2) {
			//	pathControls.push(foreParticle);
				var endCoord = new THREE.Vector3(0,0,0);
				endCoord.copy(foreParticle).add(midOffset);
				pathControls.push(endCoord);
			}
		}
		return pathControls;
	}
	
	function getSplinePath (controls,segments) {
		var splinePath = new THREE.SplineCurve3(controls);
		var splineDivisions = splinePath.getSpacedPoints(segments);
		return splineDivisions;
	}
	
	function fragmentGeometry ( pointX, pointY, props ) {
	    /* edge from X to Y */
	    var fragmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
	    var fragmentOrientation = new THREE.Matrix4();
	    /* THREE.Object3D().up (=Y) default orientation for all objects */
	    fragmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
	    /* rotation around axis X by -90 degrees
	     * matches the default orientation Y
	     * with the orientation of looking Z */
	    fragmentOrientation.multiply(new THREE.Matrix4( 1, 0, 0, 0,
	                            						0, 0, 1, 0,
	                             						0,-1, 0, 0,
                         													0, 0, 0, 1 ));
		fragmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		var openEnded;
		openEnded = props.endcap;
	    var geometry = new THREE.CylinderGeometry( props.radius, props.radius, fragmentDirection.length(), props.radiusSegments, props.curveSegments, openEnded);
	    geometry.applyMatrix(fragmentOrientation);
		
		return geometry;
	}
	
	function getFragmentColors (segments) {
		// based on length 
		// build array
		// by checking all genes at each stage
		
	}
	
	return Chromatin;
}]);
/*global angular, TADkit, THREE */

TADkit.factory('Particles', [ function () {
	"use strict";
	// constructor for chromatin model instances
	function Particles( data, overrides ) {
		
		var defaults = {
			particles: 0,
			particlesVisibility: false,
			particleColor: "#ffffff",
			particleSize: 350,
			particleOpacity: 0.8
		};		
		overrides = overrides || { };
		angular.extend(this, angular.copy(defaults), overrides);

		var particlesMaterial = new THREE.PointCloudMaterial({
			color: this.particleColor,
			size: this.particleSize,
			opacity: this.particleOpacity,
			map: THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png"),
			transparent: true
		});
		// console.log(this.particleSize);
		var particlesGeometry = getGeometry( data );
		
		var particlesCloud = new THREE.PointCloud( particlesGeometry, particlesMaterial );
		particlesCloud.sortParticles = true;
		particlesCloud.name = "Particles Cloud";
		particlesCloud.visible = this.particlesVisibility;
		
		this.cloud = particlesCloud;
		this.center = particlesCloud.center;
		this.bounds = particlesCloud.bounds;
		// console.log("Particles Cloud");
		// console.log(this);
	}
	
	function getCenter( vertices ) {
		var centroid = new THREE.Vector3();
		var count = vertices.length;
		for ( var i=0; i < count; i++ )
		{
			centroid.x += vertices[i].x;
			centroid.y += vertices[i].y;
			centroid.z += vertices[i].z;
		}
			centroid.x /= count;
			centroid.y /= count;
			centroid.z /= count;
		console.log("Centroid: %s", JSON.stringify(centroid));
		return centroid;
	}
	
	function getGeometry( data ) {
		var offset = 0, vertex,
			 particleGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			particleGeometry.vertices.push( vertex );
		}
		return particleGeometry;
	}
		
	return Particles;
}]);
/*global window, TADkit, THREE, requestAnimationFrame */

TADkit.directive('tkScene', [ 'Particles', 'Chromatin', function(Particles, Chromatin){
	"use strict";
	return {
		restrict: 'E',
		scope: { 
			data: "=",
			position:"=",
			particles: "=",
			chromatin: "=",
			proteins: "=",
			colors: "=",
			segments: "="
		},
		link: function postLink(scope, element, attrs) {
			// console.log(scope);
		var scene, viewport, stats, cube;
		var camera, cameraPosition, cameraTarget, cameraTranslate;
		var ambientLight, pointLight, loader, mesh,
			shadowMesh, icosahedron, light,
			mouseX = 0, mouseY = 0,
			materials = {};
		var controls, gui, renderer;
		var contW, contH, windowHalfX, windowHalfY;
		var positionOriginalColor = new THREE.Color();

		scope.materialType = 'lambert';
		scope.init = function () {

			// VIEWPORT
			viewport =  element[0];
			contW = viewport.parentNode.clientWidth * 0.8;
			contH = contW * 0.66;
			windowHalfX = contW / 2;
			windowHalfY = contH / 2;
	
			// RENDERER
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setClearColor( 0xffffff );
			renderer.setSize( contW, contH );
			viewport.appendChild( renderer.domElement );
			// console.log(viewport);

			// SCENE
			scene = new THREE.Scene();
			var sceneFogNear = 3000;
			var sceneFogFar = 500;

			// CAMERAS
			// console.log("CAMERA (initial)");
		    camera = new THREE.PerspectiveCamera(28,  contW / contH , 1, 1000000);
			cameraPosition = new THREE.Vector3( 50000, 50000, 50000 );
			cameraTarget = new THREE.Vector3(0,0,0);
			camera.position.x = cameraPosition.x;
			camera.position.y = cameraPosition.y;
			camera.position.z = cameraPosition.z;
			camera.lookAt(cameraTarget);
			// camera.updateProjectionMatrix();
			camera.name = "Scene Camera";
			scene.add(camera);
			// console.log(camera);
			var rotation = 0;
			
			// CONTROLS
			controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.rotateSpeed = 1.5;
			controls.zoomSpeed = 2.0;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;

			controls.keys = [ 65, 83, 68 ];

			controls.addEventListener( 'change', scope.render );
			
			var position = position || new THREE.Vector3(0,0,0);
			controls.target.copy(position);
			// console.log(controls);

			// STATS
			// stats = new Stats();
			// stats.setMode(0); // 0: fps, 1: ms
			// stats.domElement.style.position = 'absolute';
			// stats.domElement.style.left = '10px';
			// stats.domElement.style.bottom = '10px';
			// viewport.appendChild( stats.domElement );

			// HELPERS
			var axisHelper = new THREE.AxisHelper( 100000 );
			// scene.add( axisHelper );

			// LIGHTS
			// Ambient
			var ambientColor = "#111111";
			ambientLight = new THREE.AmbientLight( ambientColor );
			ambientLight.name = "Scene Ambient Light";
			scene.add(ambientLight);
			// Point
			var pointColor = "#ffffff";
			var pointIntensity = 0.1;
			//var pointDistance = 0.0; DEFAULT = infinite
			pointLight = new THREE.PointLight( pointColor, pointIntensity );
			pointLight.position.set( 20000, 20000, 20000 );
			pointLight.name = "Scene Light";
			scene.add(pointLight);
			// console.log(pointLight);
			// Point Light Helper
			var sphereSize = 500;
			var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
			// scene.add( pointLightHelper );
			
			var chromatinColor = "#37375f";
			var chromatinMaterial = new THREE.MeshLambertMaterial({
				color: chromatinColor,
				ambient: chromatinColor,
				emissive: chromatinColor,
				//shading: THREE.FlatShading,
				opacity: 1.0,
				transparent: false,
				wireframe: false
			});
			
			var particlesSettings = {
					particlesVisibility: scope.particles,
					particleColor: "#ffffff",
					particleSize: 350,
					particleOpacity: 0.8
			};
			var particles = new Particles( scope.data, particlesSettings );
			scene.add(particles.cloud);

			var chromatinSettings = {
					chromatinVisibility: scope.chromatin,
					particleSegments: scope.segments
			};

			var chromatin = new Chromatin( scope.data, scope.colors, chromatinSettings );
			scene.add(chromatin.fiber);
			scope.lookAtTAD(chromatin.center, cameraTarget, chromatin.bounds * 3.0);
			
			// FOG SCENE
			var fogColor = 0xFFFFFF,
				fogNear = chromatin.bounds * 1.0,
				fogFar = chromatin.bounds * 6.0;
			// scene.fog = new THREE.Fog( fogColor, fogNear, fogFar );
			
			window.addEventListener( 'resize', scope.onWindowResize, false );

			var particlesObj = scene.getObjectByName( "Particles Cloud" );
			scope.$watch('particles', function(n,o) {
				if (n !== o) {
					particlesObj.visible = scope.particles;
				}
			});
			var chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
			scope.$watch('chromatin', function(n,o) {
				if (n !== o) {
					chromatinObj.visible = scope.chromatin;
				}
			});
			scope.$watch('colors', function(n,o) {
				if (n !== o) {
					var color = Math.floor(n);
					var meshes = chromatinObj.children.length;

					for (var i = 0; i < meshes; i++) {
						var newColor =  new THREE.Color(scope.colors[i]);
						chromatinObj.children[i].material.color = newColor;
						chromatinObj.children[i].material.ambient = newColor;
						chromatinObj.children[i].material.emissive = newColor;
					}
				}
			});
			scope.$watch('position', function(n,o) {
				if (n !== o) {
					var positionPrevious =  Math.floor(o);
					var positionCurrent = Math.floor(n);
					var fragmentPrevious = chromatinObj.getObjectByName( "fragment-"+positionPrevious );
					fragmentPrevious.material.color = positionOriginalColor;
					fragmentPrevious.material.ambient = positionOriginalColor;
					fragmentPrevious.material.emissive = positionOriginalColor;
					var fragmentCurrent = chromatinObj.getObjectByName( "fragment-"+positionCurrent );
					positionOriginalColor = fragmentCurrent.material.color;
					var positionColor = new THREE.Color("rgb(255,0,0)");
					fragmentCurrent.material.color = positionColor;
					fragmentCurrent.material.ambient = positionColor;
					fragmentCurrent.material.emissive = positionColor;
				}
			});

		};

		// -----------------------------------
		// Event listeners
		// -----------------------------------
		
		scope.onWindowResize = function () {
			scope.resizeCanvas();
		};

		// -----------------------------------
		// Updates
		// -----------------------------------
		scope.resizeCanvas = function () {

			contW = viewport.parentNode.clientWidth * 0.66;
			contH = contW * 0.66;
			windowHalfX = contW / 2;
			windowHalfY = contH / 2;

			camera.aspect = contW / contH;
			camera.updateProjectionMatrix();

			renderer.setSize( contW, contH );
		};

		scope.lookAtTAD = function ( position, target, translate) {
				//console.log("Camera position: %s", JSON.stringify(camera.position) );
				position = position || new THREE.Vector3(0,0,0);
				target = target || new THREE.Vector3(0,0,0);
				translate = translate || 0;
				// TARGET CAMERA ON TAD
				camera.position.set(position.x, position.y, position.z);
				camera.lookAt(target);
				camera.translateZ(translate);
				//console.log("Camera reset: %s", JSON.stringify(camera.position) );
				camera.updateMatrixWorld();
				// console.log("Camera position: %s", JSON.stringify(camera.position));
								
				// TARGET CONTROLS ON TAD
				// console.log("Controls target: %s", JSON.stringify(controls.target));
				controls.target.copy(position);
		};

		scope.checkRotation = function (usrAngle){

			var angle = 0.1;
		    var position = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);
			var target = new THREE.Vector3( -4720.09000762387, -14279.253850598721, 6903.477032057158);
			var translate = 0;
			
		        var x = position.x;
		        var y = position.y;
    
				var x_origin = target.x;
				var y_origin = target.y;
				
				console.log(x);
				console.log(y);
				
				position.x = ((x - x_origin) * Math.cos(angle)) - ((y_origin - y) * Math.sin(angle)) + x_origin;
				position.y = ((y_origin - y) * Math.cos(angle)) - ((x - x_origin) * Math.sin(angle)) + y_origin;
				
				
			scope.lookAtTAD(position,target,translate);
    
		};

		// -----------------------------------
		// Draw and Animate
		// -----------------------------------
		scope.animate = function () {
			// var rotSpeed = .02
			// scope.checkRotation(rotSpeed);
			
			requestAnimationFrame( scope.animate );
			controls.update();
			scope.render();
		};

		scope.render = function () {
			renderer.render( scene, camera );
			// stats.update();
		};

		// Begin
		scope.init();
		scope.animate();

		}
	};
	}]);
