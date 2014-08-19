var APP = angular.module('TADkit', []);
APP.factory('Data', function() {
	return {message:"Im data."}
})
APP.factory('Data2', function() {
	return {message: "Im more data."}
})

function TrackController($http,$scope){
    $http.get('json/drosophila_melanogaster-genes.json').
    success(function(d){
    	console.log(d);
		})
}

function ThreeController($scope, Data2) {
	$scope.data = Data2;
}
