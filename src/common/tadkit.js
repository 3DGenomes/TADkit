'use strict';

// ANGULAR APP
var TADkit = angular.module('TADkit',['ngRoute', 'mm.foundation']);

	TADkit.config(function($routeProvider){
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
		})
	})

	TADkit.controller('TopbarCtrl', ['$rootScope', '$scope', function($rootScope, $scope){}])

	TADkit.controller('DashboardCtrl',['$rootScope', '$scope', 'Settings', 'TAD', 'Assembly', 'Genes', 'Proteins', function($rootScope, $scope, Settings, TAD, Assembly, Genes, Proteins){

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
		
		var particles = TAD.getParticlesCount();
		// console.log(particles);
		var segments = TAD.getSegments();
		$scope.segments = segments;
		// console.log(segments);
		
		var genes = Genes.getGenes();
		var biotypes = Assembly.getBiotypeColors().gene;
		// console.log(biotypes);
		// console.log(JSON.stringify(biotypes));
		
		var proteins = Proteins.getProteins();
		$scope.proteins = proteins;
		// console.log(proteins);

		// Count fragments
		var fragmentCount = particles * segments;
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
		// var fragmentLength = Math.round(TAD.getMetadata().lengthBP / TAD.getParticlesCount()) / segments;
		var fragmentLength = TADMetadata.resolution / segments;

		var focusStart = TADMetadata.start;
		$scope.focusStart = focusStart;

		var focusEnd = TADMetadata.end;
		$scope.focusEnd = focusEnd;
		
		$scope.colors = Genes.getColors( genes, biotypes, fragmentCount, TADStart, fragmentLength);
		$scope.colorsGenes = Genes.getColors( genes, biotypes, fragmentCount, TADStart, fragmentLength);
		$scope.colorsHP1 = Proteins.getColors( proteins, "HP1", fragmentCount, TADStart, fragmentLength);
		$scope.colorsBRM = Proteins.getColors( proteins, "BRM", fragmentCount, TADStart, fragmentLength);
		$scope.colorsMRG15 = Proteins.getColors( proteins, "MRG15", fragmentCount, TADStart, fragmentLength);
		$scope.colorsPC = Proteins.getColors( proteins, "PC", fragmentCount, TADStart, fragmentLength);
		$scope.colorsH1 = Proteins.getColors( proteins, "H1", fragmentCount, TADStart, fragmentLength);
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
		}
		$scope.showChromatin = Settings.getChromatin();
		$scope.toggleChromatin = function() {
			$scope.showChromatin = !$scope.showChromatin;
		}
		$scope.showGenes = Settings.getGenes();
		$scope.toggleGenes = function() {
			$scope.colors = $scope.colorsGenes;
			// CHANGE TO switchColors()...
			if ($scope.showGenes == false) {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showHP1 = Settings.getHP1();
		$scope.toggleHP1 = function() {
			$scope.colors = $scope.colorsHP1;
			if ($scope.showHP1 == false) {
	   			$scope.showGenes = false;
	   			$scope.showHP1 = true;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showBRM = Settings.getBRM();
		$scope.toggleBRM = function() {
			$scope.colors = $scope.colorsBRM;
			if ($scope.showBRM == false) {
	   			$scope.showGenes = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = true;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showMRG15 = Settings.getMRG15();
		$scope.toggleMRG15 = function() {
			$scope.colors = $scope.colorsMRG15;
			if ($scope.showMRG15 == false) {
	   			$scope.showGenes = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = true;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showPC = Settings.getPC();
		$scope.togglePC = function() {
			$scope.colors = $scope.colorsPC;
			if ($scope.showPC == false) {
	   			$scope.showGenes = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = true;
	   			$scope.showH1 = false;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showH1 = Settings.getH1();
		$scope.toggleH1 = function() {
			$scope.colors = $scope.colorsH1;
			if ($scope.showH1 == false) {
	   			$scope.showGenes = false;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = true;
			} else {
	   			$scope.showGenes = true;
	   			$scope.showHP1 = false;
	   			$scope.showBRM = false;
	   			$scope.showMRG15 = false;
	   			$scope.showPC = false;
	   			$scope.showH1 = false;
			}
		}
		$scope.showSense = Settings.getSense();
		$scope.toggleSense = function() {
			$scope.showSense = !$scope.showSense;
		}
		
	}])	

	TADkit.controller('TrackCtrl',['$scope', '$timeout', 'test', 'TAD', 'Genes', 'Proteins', 'Contacts',
	function($scope, $timeout, test, TAD, Genes, Proteins, Contacts){
		// Timeout as temp fix to pause rendering until DOM complete
		$timeout( function() {
			$scope.particles = TAD.getParticles();
			$scope.genes = Genes.getGenes();
			$scope.proteins = Proteins.getProteins();
			$scope.contacts = Contacts.getContacts();
		}, 0 );
		console.log('Track now active.');
	}])

	TADkit.controller('SceneCtrl',['$scope', '$timeout', 'test', 'TAD',
	function($scope, $timeout, test, TAD){
		// Timeout as temp fix to pause rendering until DOM complete
		// $timeout( function() {$scope.vertices = TAD.getVertices()}, 0 ); // WHY NOT?

		$scope.vertices = TAD.getVertices();
	}])

	TADkit.service('loadTAD', function($http, TAD, Assembly, Genes, Proteins) {
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
		});
	
		return {
			promise:initialiseData,
			newTAD: function () {
				return null;
			},
		};
	});