'use strict';

// ANGULAR APP
var APP = angular.module('APP',['ngRoute', 'mm.foundation']);

	APP.config(function($routeProvider){
		$routeProvider
		.when('/',
		{
			controller:'dashboardController',
			templateUrl:'testd3three-dashboard.html',
			resolve:{ 
				'TADData':function(TAD){
				// TADinput will also be injectable in your controller, 
				// if you don't want this you could create a new promise with the $q service
				return TAD.promise;
				}
			}
		})
	})

	APP.controller('dashboardController', function($scope){})
	APP.controller('topbarController', function($scope){})

	APP.controller('sequenceController',['$q','$http','$scope','TAD','Ensembl', function($q,$http,$scope,TAD,Ensembl){
		var metadata = TAD.getMetadata();
		var EnsemblRequestLimit = 5000000;
		var requestSlice = metadata.chromosome + ":" + (metadata.end + 1 - EnsemblRequestLimit) + "-" + metadata.end;

		var assembly = Ensembl.getAssemblyInfo()
		.then(function(data) {
			$scope.assembly = data;
			var assemblyLength = 0;
			var regions = $scope.assembly.top_level_region;
			for (var length in regions) {
				if (regions.hasOwnProperty(length)) {
					for (var i = 0, j = regions.length; i < j; i++) {
						assemblyLength += regions[i].length;
					}
				}
			}
			$scope.assembly.length = assemblyLength;
			console.log(metadata.species + ": " + parseInt( $scope.assembly.length ).toLocaleString() + " BP");
		})

		var genes = Ensembl.getRegionGenes(requestSlice)
		.then(function(data) {
			$scope.genes = data;
		})
	}])

	APP.controller('tadmodelController',['$http','$scope','$rootScope', function($http,$scope,$rootScope){
			// $scope.data = $rootScope.TAD.vertices;
			$scope.canvasWidth = 400;
			$scope.canvasHeight = 400;
			$scope.dofillcontainer = true;
			$scope.scale = 1;
			$scope.materialType = 'lambert';
	}])

	APP.directive('track', function(){
		return {
			restrict:'E',
			scope:{ data:'=', id:'@', length:'=' },
			link:function(scope,elm,attrs){
				scope.$watch('data',function(newValue,oldValue){
				    if(!oldValue || newValue != oldValue) {
						React.renderComponent(sequenceTrack({data:scope.data,target:scope.id,length:scope.length,elem:elm[0]}),elm[0]);
						console.log("track done");
					}
				})
			}
		}
	})
			
	APP.service('loading', function() {
		return {
			getResult: function() {
				return { status: "Loading..." };
			}
		};
	})

	APP.service('TAD', ['$q', '$http', function($q, $http) {
		var TAD = null;
		return {
			loadTAD: function() {
				var deferral = $q.defer();
				$http.get('json/tad.json').
					success(function(data){
						TAD = data;
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
			getSpecies: function () {
				var species = TAD.metadata.species;
				species = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				return species;
			},
			getSlice: function () {
				var metadata = TAD.metadata;
				var slice = metadata.chromosome + ":" + metadata.start + "-" + metadata.end;
				return slice;
			}
		};
	}])

	APP.service('Ensembl', ['$q', '$http', 'TAD', function($q, $http, TAD) {
		var ensemblRoot = "http://rest.ensembl.org/";
		return {
			getAssemblyInfo: function() {
				var deferral = $q.defer();
				var species = TAD.getSpecies();
				$http.get(ensemblRoot + "info/assembly/" + species + "?content-type=application/json").
				success(function(data){
					console.log("Assembly Info for " + species + " retreived from Ensembl.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getRegionGenes: function(requestSlice) {
				var deferral = $q.defer();
				var species = TAD.getSpecies();
				$http.get(ensemblRoot + "overlap/region/" + species + "/" + requestSlice + "?feature=gene;content-type=application/json").
				success(function(data){
					console.log("Genes for Region " + requestSlice + " of " + species + " retreived from Ensembl.");
					deferral.resolve(data);
				});
				return deferral.promise;
			}
		};
	}])

	APP.run(['$rootScope', '$q', 'loading', 'TAD', function ($rootScope, $q, loading, TAD) {
		$rootScope.status = 'Ready'; 
		$q.when(loading.getResult()).then(function(result) {
			// console.log(result);
		});
		$q.when(TAD.loadTAD()).then(function(result) {
			$rootScope.TAD = result;
		});
		$rootScope.status = 'TAD Loaded'; 
	}])

