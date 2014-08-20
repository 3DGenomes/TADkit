var APP = angular.module('TADkit', []);
APP.factory('Data', function() {
	return {message:"Im data."}
})
APP.factory('Data2', function() {
	return {message: "Im more data."}
})

function TrackController($scope, Data) {
	$scope.data = Data;
}

function ThreeController($scope, Data2) {
	$scope.data = Data2;
}
