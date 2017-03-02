(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Components, Storyboards, Overlays, Users, Datasets) {

		return function() {
			var settings = Settings.load();
			//var users = Users.load();
			//var projects = Projects.load();
			//var datasets = Datasets.get();
			var overlays = Overlays.load();
			var components = Components.load();
			var storyboards = Storyboards.load();
			//var featureColors = Resources.loadBiotypeColors();

			return $q.all([settings, components, storyboards])
			.then(function(results){
				return {
					settings: results[0],
					components: results[1],
					storyboards: results[2]
				};
			});
		};
	}
})();