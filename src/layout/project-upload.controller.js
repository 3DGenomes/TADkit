(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectUploadController', ProjectUploadController);

	function ProjectUploadController($scope, FileUploader) {
		$scope.uploader = new FileUploader();
		
		// console.log($scope.uploader);
	}
})();