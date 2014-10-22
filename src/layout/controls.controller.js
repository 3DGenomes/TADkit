(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ControlsCtrl', ControlsCtrl);

	function ControlsCtrl ($scope, $timeout, Genes){

		$timeout( function() {
			$scope.genes = Genes.getGenes();
		}, 0 );
	    $scope.filterGenes = function(gene) {
			var currentLower = $scope.focusStart + parseInt($scope.fragmentLength * $scope.slider.position);
			// console.log(currentUpper);
			var currentUpper = currentLower + ($scope.fragmentLength - 1);
			// console.log(currentLower);
			var genePresent = false;
			// console.log( JSON.stringify(currentLower) + ", " + JSON.stringify(currentUpper) );
			// console.log( JSON.stringify(gene.start) + ", " +  JSON.stringify(gene.end) );
			// console.log(JSON.stringify(parseInt($scope.slider.position)) + ": " + JSON.stringify(Math.max(currentLower, gene.start)) + " <= " + JSON.stringify(Math.min(currentUpper, gene.end)));
			if ( Math.max(currentLower, gene.start) <= Math.min(currentUpper, gene.end) ) {
			// if ( gene.start <= currentLower && currentUpper <= gene.end) {
				genePresent = true;
				// console.log(genePresent);
			}
			return genePresent;
		};
		console.log('Controls now active.');
	}
})();