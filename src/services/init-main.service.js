(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Users, Projects, Datasets, Overlays, Components, Storyboards, Resources, Ensembl) {
		return function() {
			var settings = Settings.load();
			var users = Users.load();
			var projects = Projects.load();
			var datasets = Datasets.load();
			var overlays = Overlays.load();
			var components = Components.load();
			var storyboards = Storyboards.load();
			var featureColors = Resources.loadBiotypeColors();

			return $q.all([settings, users, projects, datasets, overlays, components, storyboards, featureColors])
			.then(function(results){

				// var promise = Resources.loadInfoAssembly(Datasets.getSpeciesUrl());
				// promise.then(function(data) {
				// 	var settings = results[0];
				// 	settings.infoAssembly = data;
				// }, function(reason) {
				// 	console.log('Failed: ' + reason);
				// });
				// return results;

				var processList = [];

				var infoAssembly = Resources.loadInfoAssembly(Datasets.getSpeciesUrl());
				processList.push(infoAssembly);

				var currentDataset = Datasets.getDataset();
				var overlays = Overlays.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var ensembl;
					if (overlay.object.type == "ensembl" && overlay.object.format == "json") {
						ensembl = Ensembl.load(currentDataset.object, overlay);
						 // ojo returning Overlays... cHANGE 
						processList.push(ensembl);
					}
				});

				return $q.all(processList)
				.then(function(data) {
					var settings = results[0];
					settings.infoAssembly = data;
					return results;
				});
			})
			.then(function(results){
				var settings = Settings.get();
				var currentDataset = Datasets.getDataset();
				var currentStoryboards = Storyboards.getStoryboard();
				var particlesCount = currentDataset.models[0].data.length / currentDataset.object.components;
				var particleSegments = currentStoryboards.components[0].view.settings.chromatin.particleSegments;
				var segmentsCount = particlesCount * particleSegments;
				var segmentLength = currentDataset.object.resolution / particleSegments; // base pairs
				return $q.all([settings, currentDataset, currentStoryboards, particleSegments, particlesCount, segmentsCount, segmentLength])
				.then(function() {
					var chromStart = currentDataset.object.chromStart;
					var featureColors = results[7];
					var featureTypes = featureColors;
					settings.chromStart = chromStart;
					settings.particlesCount = particlesCount;
					settings.particleSegments = particleSegments;
					settings.segmentsCount = segmentsCount;
					settings.segmentLength = segmentLength;
					Overlays.segmentOverlays(chromStart, segmentsCount, segmentLength, featureTypes);
					return results;
				});
			})
			.then(function(results){
				return {
					settings: results[0],
					users: results[1],
					projects: results[2],
					datasets: results[3],
					overlays: results[4],
					components: results[5],
					storyboards: results[6],
					featureColors: results[7],
				};
			});
		};
	}
})();