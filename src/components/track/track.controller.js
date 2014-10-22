(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TrackCtrl', TrackCtrl);

	function TrackCtrl ($scope, $timeout, TAD, Genes, Proteins, Contacts){
		
		// Timeout as temp fix to pause rendering until DOM complete
		// *** move to parent controller???
		$timeout( function() {
			$scope.particles = TAD.getParticles();
			$scope.genes = Genes.getGenes();
			$scope.proteins = Proteins.getProteins();
			$scope.contacts = Contacts.getContacts();
		}, 0 );
		console.log('Track now active.');
	}
})();
