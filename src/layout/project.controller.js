(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectController', ProjectController);

	function ProjectController ($scope, Datasets){

		$scope.addDataset = function($fileContent) {
			Datasets.add($fileContent);
		};

	}
})();