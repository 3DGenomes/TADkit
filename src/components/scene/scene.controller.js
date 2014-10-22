(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneCtrl', SceneCtrl);

	function SceneCtrl ($scope, TAD){

		$scope.vertices = TAD.getVertices();
		
	}
})();