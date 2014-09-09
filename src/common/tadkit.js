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

	TADkit.controller('TopbarCtrl', function($scope){})

	TADkit.controller('DashboardCtrl',['$scope', 'TAD', 'Assembly', 'Genes', function($scope, TAD, Assembly, Genes){
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
		var segments = TAD.getSegments();
		$scope.segments = segments;
		
		var genes = Genes.getGenes();
		var fragmentCount = particles * segments;
		var TADStart = TAD.getMetadata().start;
		// var fragmentLength = Math.round(TAD.getMetadata().lengthBP / TAD.getParticlesCount()) / segments;
		var fragmentLength = TAD.getMetadata().resolution / segments;
		
			$scope.colors = Genes.getColors( genes, fragmentCount, TADStart, fragmentLength);
	}])	

	TADkit.controller('TrackCtrl',['$scope', '$timeout', 'Genes', 
	function($scope, $timeout, Genes){
		// Timeout as temp fix to pause rendering until DOM complete
		$timeout( function() {$scope.genes = Genes.getGenes()}, 0 );
		console.log('Track now active.');
	}])

	TADkit.controller('SceneCtrl',['$scope', '$timeout', 'TAD',
	function($scope, $timeout, TAD){
		// Timeout as temp fix to pause rendering until DOM complete
		// $timeout( function() {$scope.vertices = TAD.getVertices()}, 0 ); // WHY NOT?
		$scope.vertices = TAD.getVertices();
		console.log('Scene now active.');
	}])

	TADkit.service('loadTAD', function($http, TAD, Assembly, Genes) {
  
	// EG. FUNCTION IF LOAD NEEDS TO DO SOMMIT
	//	  var loadUser = $http.get('data.json')
	//		.success(function (data) {
	//				console.log("Loader complete");
	//		  return data;
	//		});

		var species = "";
		var slice = "X:0-4999999"; // Ensembl max :P
		// LOAD TAD
		var initialiseData = TAD.loadTAD()
		.then(function(promise){
			// LOAD ASSEMBLY 
			species = TAD.getSpecies();
			return Assembly.loadInfoAssembly(species);
		})
		.then(function(promise){
			// LOAD GENES
			var slice = TAD.getSlice();
			return Genes.loadRegionGenes(species,slice);
		})
		.then(function(promise){
			return promise;
		});
	
		return {
			promise:initialiseData,
			newTAD: function () {
				return null;
			},
		};
	});