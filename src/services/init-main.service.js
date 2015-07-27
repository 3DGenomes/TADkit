(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Users, Projects, Datasets, Overlays, Components, Storyboards, Resources) {

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