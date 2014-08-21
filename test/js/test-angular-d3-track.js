// ANGULAR APP
var APP = angular.module('APP',['ngRoute']);

	APP.config(function($routeProvider){
		$routeProvider
		.when('/',
		{
			controller:'sequenceController',
			templateUrl:'template-track-sequence.html',
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
			// LOCAL TEST SAMPLE
			// $http.get('json/drosophila_melanogaster-genes.json').
			$http.get("http://beta.rest.ensembl.org/feature/region/" + metadata.species + "/" + TADSlice + "?feature=gene;content-type=application/json").
			success(function(data){
		$scope.data = data
		});
	}])

	APP.directive('track',function(){
		return {
			restrict:'E',
			scope:{data:'=',id:'@'},
			link:function(scope,elm,attrs){
				scope.$watch('data',function(newValue,oldValue){
				    if(newValue != oldValue) {
						React.renderComponent(sequencetrack({data:scope.data,target:scope.id}),elm[0]);
					}
				})
			}
		}
	})
	
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

	