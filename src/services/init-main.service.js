(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, THREEService, d3Service, Settings, Components, Ensembl, Users, Projects, Datasets, Overlays, Storyboards, THREETextures ) {
		/* Note: The APP will not start until init-Main is resolved
		 *       See tadkit.states.js
		 */
		return function() {
			console.log("Loading TADkit...");

			var loadApp = function(results) {
				// Ensure JS API dependencies are loaded
				var three = THREEService.load();
				var d3 = d3Service.load();

				var settings = Settings.load(); // results[0]
				var components = Components.load(); // results[1]
				var features = Ensembl.loadBiotypeColors(); // results[2]
					// ¿speedup features by loading from array rather than fetch ini?

				return $q.all([three, d3, settings, components, features])
				.then(function(results) {
					return results;
				});
			};

			var loadDefaults = function(results) {
				var users = Users.load();
				var projects = Projects.load();
				var datasets = Datasets.load();
				var overlays = Overlays.load();
				var storyboards = Storyboards.load();
				var textures = THREETextures.load(results[2].textures);

				return $q.all([users, projects, datasets, overlays, storyboards])
				.then(function(results) {
					return results;
				});
			};

			return loadApp()
				.then(loadDefaults);
		};
	}
})();