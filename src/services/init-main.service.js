(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Components, Ensembl, Users, Projects, Datasets, Overlays, Storyboards ) {
		return function() {
			console.log("Loading TADkit...");

			var loadApp = function(results) {
				var settings = Settings.load();
				var components = Components.load();
				var features = Ensembl.loadBiotypeColors();

				return $q.all([settings, components, features])
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