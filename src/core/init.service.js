(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Init
	 * @description Initialize default Objects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires TADkit.service:Users
	 * @requires TADkit.service:Projects
	 * @requires TADkit.service:Datasets
	 * @requires TADkit.service:Overlays
	 * @requires TADkit.service:Storyboards
	 * @requires TADkit.service:Proximities
	 * @requires TADkit.service:Restraints
	 * @requires TADkit.service:ColorsEnsembl
	 *
	 */
	angular
		.module('TADkit')
		.factory('Init', Init);

	function Init($log, $q, Users, Projects, Datasets, Overlays, OverlaysImport, Storyboards, Settings, Proximities, Restraints, ColorsEnsembl) {

		/**
		 * @ngdoc function
		 * @name TADkit.service:Init#buildUserHierarchy
		 * @methodOf TADkit.service:Init
		 * @kind function
		 *
		 * @description
		 * Build app Object hierarchy ie. User > Projects > [Datasets | Overlays | Storyboards]
		 *
		 * @requires $log
		 * @requires TADkit.service:Users
		 * @requires TADkit.service:Projects
		 * @requires TADkit.service:Datasets
		 * @requires TADkit.service:Overlays
		 * @requires TADkit.service:Storyboards
		 *
		 */
		function buildUserHierarchy() {
			$log.debug("Default user initializing...");

			// BUILD DEFAULT DATA HIERARCHY
			// USER >> PROJECTS >> DATASETS | OVERLAYS | STORYBOARDS
			var user = Users.getUser();
			if (typeof user.projects !== "undefined" && user.projects.length === 0) {
				user.projects = Projects.get();
				if (typeof user.projects.loaded[0].datasets !== "undefined" &&  user.projects.loaded[0].datasets.length === 0)
					user.projects.loaded[0].datasets = Datasets.get();
				if (typeof user.projects.loaded[0].overlays !== "undefined" &&  user.projects.loaded[0].overlays.length === 0)
					user.projects.loaded[0].overlays = Overlays.get();
				if (typeof user.projects.loaded[0].storyboards !== "undefined" &&  user.projects.loaded[0].storyboards.length === 0)
					user.projects.loaded[0].storyboards = Storyboards.get();
			}
			$log.debug("Default user initialized.");
		}

		/**
		 * @ngdoc function
		 * @name TADkit.service:Init#setDefaultDataset
		 * @methodOf TADkit.service:Init
		 * @kind function
		 *
		 * @description
		 * Set default dataset.
		 *
		 * @requires $log
		 * @requires TADkit.service:Datasets
		 * @requires TADkit.service:Proximities
		 * @requires TADkit.service:Restraints
		 * @requires TADkit.service:ColorsEnsembl
		 *
		 */
		function setDefaultDataset() {
			$log.debug("Default dataset initializing...");

			var currentDataset = Datasets.getDataset();
			var currentModelData = Datasets.getModelData();
			Settings.set(currentDataset);
			var distances = Proximities.set(currentModelData).distances;
			var datasetDimension = currentModelData.length / 3; // 3 == xyz components of vertices
			var restraints = Restraints.set(currentDataset.restraints, datasetDimension);

			// Update Overlays for initialized Dataset.
			var overlaysUpdate = Overlays.update(distances, restraints);
			// Load and import example TSV for initial/current Dataset.
			var overlaysFile = Overlays.loadFromFile(currentDataset.object.filename);

			return $q.all([overlaysUpdate, overlaysFile])
			.then(function() {
				$log.debug("Default dataset initialized.");
			});
		}

		return {

			/**
			 * @ngdoc function
			 * @name TADkit.service:Init#defaults
			 * @methodOf TADkit.service:Init
			 * @kind function
			 *
			 * @description
			 * Initalizes appw.
			 *
			 * @requires $log
			 * @requires TADkit.service:Users
			 * @requires TADkit.service:Projects
			 * @requires TADkit.service:Datasets
			 * @requires TADkit.service:Datasets
			 * @requires TADkit.service:ColorsEnsembl
			 *
			 * @returns {Object} All loaded defaults.
			 */
			defaults: function() {
				$log.debug("Defaults initializing...");

				// Load TADKit defaults from JSON files
				var users = Users.load();
				var projects = Projects.load();
				var datasets = Datasets.load();
				var overlays = Overlays.load();
				var storyboards = Storyboards.load();
				var features = ColorsEnsembl.load();

				return $q.all([users, projects, datasets, overlays, storyboards, features])
				.then(buildUserHierarchy)
				.then(setDefaultDataset)
				.then(function() {
				$log.debug("Defaults initialized.");
				});
			}
		};
	}
})();