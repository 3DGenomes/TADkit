'use strict';

// ANGULAR APP
var APP = angular.module('APP',['ngRoute', 'mm.foundation']);

	APP.config(function($routeProvider){
		$routeProvider
		.when('/',
		{
			controller:'sequenceController',
			templateUrl:'testd3three-template-track.html',
			resolve:{ 
				'TADInputData':function(TADInput){
				// TADinput will also be injectable in your controller, 
				// if you don't want this you could create a new promise with the $q service
				return TADInput.promise;
				}
			}
		})
	})
				
	APP.controller('sequenceController',['$http','$scope','TADInput',
	function($http,$scope,TADInput){
		$scope.metadata = TADInput.getTADMetadata();
		var metadata = $scope.metadata;
		var EmsemblRequestLimit = 5000000;
		var species = metadata.species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
		var TADSlice = metadata.chromosome + ":" + (metadata.end + 1 - EmsemblRequestLimit) + "-" + metadata.end;

		// GET ASSEMBLY DATA FROM ENSEMBL
		$http.get('json/drosophila_melanogaster.json').
		// $http.get("http://rest.ensembl.org/info/assembly/" + species + "?content-type=application/json").
		success(function(data){
			$scope.assembly = data
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
		});

		// GET GENE DATA FROM ENSEMBL
		$http.get('json/drosophila_melanogaster-genes.json').
		// $http.get("http://rest.ensembl.org/overlap/region/" + species + "/" + TADSlice + "?feature=gene;content-type=application/json").
		success(function(data){
			$scope.data = data
			// console.log($scope);
		});
		
	}])

	APP.directive('track',function(){
		return {
			restrict:'E',
			scope:{data:'=',id:'@',length:'='},
			link:function(scope,elm,attrs){
				var thisElement = elm;
				scope.$watch('data',function(newValue,oldValue){
				    if(newValue != oldValue) {
						React.renderComponent(sequenceTrack({data:scope.data,target:scope.id,length:scope.length,elem:thisElement}),elm[0]);
					}
				})
			}
		}
	})
	
	// APP.controller('tadmodelController',['$http','$scope','TADInput',
	// function($http,$scope,TADInput){
	// 	var data = $scope.data;
	//
	//
	// }])

	APP.directive('scene',function(){
		return {
			restrict:'E',
			scope:{
				data:'=',
				id:'@'
			},
			link:function(scope,elm,attrs){
				scope.$watch('data',function(newValue,oldValue){
				    if(newValue != oldValue) {
						React.renderComponent(tadmodelController({data:scope.data,target:scope.id}),elm[0]);
					}
				})
			}
		}
	})

	var TopBarDemoCtrl = function ($scope) {

	};
	
	APP.service('TADInput', function($http) {
		var TAD = null;
		var promise = $http.get('json/tad.json').
					success(function(data){
					TAD = data;
					});
		return {
			promise: promise,
			setTAD: function (data) {
				TAD = data;
			},
			getTAD: function () {
				return TAD;
			},
			getTADMetadata: function () {
				return TAD.metadata;
			}
		};
	})

	