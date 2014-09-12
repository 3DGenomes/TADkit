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

	TADkit.controller('DashboardCtrl',['$rootScope', '$scope', 'Settings', 'TAD', 'Assembly', 'Genes', function($rootScope, $scope, Settings, TAD, Assembly, Genes){
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
		var fragmentCount = particles * segments;
		var TADStart = TAD.getMetadata().start;
		// var fragmentLength = Math.round(TAD.getMetadata().lengthBP / TAD.getParticlesCount()) / segments;
		var fragmentLength = TAD.getMetadata().resolution / segments;
		$scope.colors = Genes.getColors( genes, biotypes, fragmentCount, TADStart, fragmentLength);
		// $scope.colors = Genes.getRandomColors(fragmentCount);

		// setInterval(
		// 	function() {
		// 		$scope.colors = Genes.getRandomColors(fragmentCount);
		// 		console.log($scope.colors);
		// 	}, 3000);
		
		var species = TAD.getSpecies();
		var slice = TAD.getSlice();
		$rootScope.species = { text: species };
		$rootScope.slice = { text: slice };
		
		$scope.particles = Settings.getParticles();
		$scope.toggleParticles = function() {
			$scope.particles = !$scope.particles;
		}
		$scope.chromatin = Settings.getChromatin();
		$scope.toggleChromatin = function() {
			$scope.chromatin = !$scope.chromatin;
		}
	}])	

	TADkit.controller('TrackCtrl',['$scope', '$timeout', 'test', 'Genes', 'Interactions',
	function($scope, $timeout, test, Genes, Interactions){
		// Timeout as temp fix to pause rendering until DOM complete
		$timeout( function() {
			$scope.genes = Genes.getGenes();
			$scope.interactions = Interactions.getInteractions();
		}, 0 );
		console.log('Track now active.');
	}])

	TADkit.controller('SceneCtrl',['$scope', '$timeout', 'test', 'TAD',
	function($scope, $timeout, test, TAD){
		// Timeout as temp fix to pause rendering until DOM complete
		// $timeout( function() {$scope.vertices = TAD.getVertices()}, 0 ); // WHY NOT?

		$scope.vertices = TAD.getVertices();
	}])

	TADkit.service('loadTAD', function($http, TAD, Assembly, Genes) {
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
			var slice = TAD.getSlice();
			return Genes.loadRegionGenes(species, slice);
		})
		.then(function(promise){
			// LOAD BIOTYPE COLORS
			return Assembly.loadBiotypeColors();
		});
	
		return {
			promise:initialiseData,
			newTAD: function () {
				return null;
			},
		};
	});