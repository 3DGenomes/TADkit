(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Users, Projects, Datasets, Overlays, Components, Storyboards, Resources, Ensembl, Proximities) {
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
				var online = results[0].app.online; //false; // detect/set elsewhere?

				// Set (calculate) initial Proximities
				var initialModel = Datasets.getModel();
				var initialProximities = Proximities.set(initialModel.data);

				var processList = []; // push async functions into list for subsequent processing

				// var speciesUrl = Datasets.getSpeciesUrl();
				// var infoAssembly = Resources.loadInfoAssembly(speciesUrl, online);
				// processList.push(infoAssembly);

				var overlays = Overlays.get();
				var initialDataset = Datasets.getDataset();
				angular.forEach(overlays.loaded, function(overlay, key) {
					if (overlay.object.type == "matrix") {
						overlay.data = initialProximities.distances;
					}
					// For Overlays with Aync Ensembl Data eg. genes
					if (overlay.object.type == "ensembl" && overlay.object.format == "json") {
						var ensembl = Ensembl.load(initialDataset.object, overlay, online);
						processList.push(ensembl);
					}
				});

				return $q.all(processList)
				.then(function(data) {
					var overlays = Overlays.get();
					// var settings = results[0];
					// settings.infoAssembly = data;
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
					// INITIAL SETTINGS --> check if not better in Storyboard
					var chromosomeIndex = 0;
					if (currentDataset.object.chromosomeIndex) {
						chromosomeIndex = datasetObject.chromosomeIndex;	
					}
					var chromStart = currentDataset.object.chromStart[chromosomeIndex];
					var featureColors = results[7];
					settings.featureTypes = featureColors;
					settings.chromStart = chromStart;
					settings.particlesCount = particlesCount;
					settings.particleSegments = particleSegments;
					settings.segmentsCount = segmentsCount;
					settings.segmentLength = segmentLength;
					Overlays.segment();
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