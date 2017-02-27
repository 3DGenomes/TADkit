(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $http, $state, $stateParams, $scope, Datasets, Overlays, Storyboards, Users, Hic_data) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Datasets.getModel();
			var overlays = Overlays.get();
			while (overlays.loaded.length > 1) { // remove all overlays
				overlays.loaded.pop();
			}
			Overlays.set(0);
			$scope.current.overlay = Overlays.getOverlay();
			$scope.current.storyboard = Storyboards.getStoryboard();
			console.log("Current dataset, model, overlay and storyboard updated.");			
		};

		$scope.loadConfigFromParam = function() {
			var config_file;
			var deferral = $q.defer();
			
			$http.get($stateParams.conf)
			.success( function(conf) {
				var dataset;
				var url_conf = $stateParams.conf;
				if(typeof conf.dataset !== 'undefined') {
					if(conf.tracks) {
						Users.setTracks(conf.tracks);
					}
					dataset = conf.dataset;
				} else if(typeof conf.models !== 'undefined') {
					dataset = conf;
				}
				var loading = Datasets.load(dataset);
				return $q.all([ loading ])
				.then(function(results){
					$scope.updateCurrent();
					console.log("Dataset loaded: " + conf.dataset);			
					$state.go('browser',{ conf: url_conf });
				});
				
			});
			return deferral.promise;
			
		};
		if ($stateParams.conf) $scope.loadConfigFromParam();

		// On dropzone (load external file)
		// Adds JSON to current project - load TSV when in browser
		$scope.addDataset = function($fileContent) {
			var adding = Datasets.add($fileContent);
			return $q.all([ adding ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset added."); //: " + $stateParams.loadDataset);			
				$state.go('dataset');
			});			
		};
		$scope.cleanDataset = function(event) {
			Datasets.clear();
			Hic_data.clear();
			var loadexample = Datasets.load('assets/defaults/tk-example-dataset.json');
			return $q.all([ loadexample ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset example loaded.");			
				$state.go('browser');
			});
		};
		
		
		
		
		
	}
})();