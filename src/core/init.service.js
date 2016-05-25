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
	 * @requires TADkit.service:Layers
	 * @requires TADkit.service:Storyboards
	 * @requires TADkit.service:Proximities
	 * @requires TADkit.service:Restraints
	 * @requires TADkit.service:EnsemblColors
	 *
	 */
	angular
		.module('TADkit')
		.factory('Init', Init);

	function Init($log, $q, Users, Projects, Datasets, Clusters, Layers, DataImport, Storyboards, Settings, Proximities, Restraints, EnsemblColors) {

		/**
		 * @ngdoc function
		 * @name TADkit.service:Init#buildUserHierarchy
		 * @methodOf TADkit.service:Init
		 * @kind function
		 *
		 * @description
		 * Build app Object hierarchy ie. User > Projects > [Datasets | Layers | Storyboards]
		 *
		 * @requires $log
		 * @requires TADkit.service:Users
		 * @requires TADkit.service:Projects
		 * @requires TADkit.service:Datasets
		 * @requires TADkit.service:Layers
		 * @requires TADkit.service:Storyboards
		 *
		 */
		function buildUX() {
			$log.debug("Default user initializing...");

			// BUILD DEFAULT DATA HIERARCHY
			// User >> Projects >> Datasets | Layers | Storyboards
			var user = Users.getUser();
			if (typeof user.projects !== "undefined" && user.projects.length === 0) {
				user.projects = Projects.get();
				if (typeof user.projects.loaded[0].datasets !== "undefined" &&  user.projects.loaded[0].datasets.length === 0)
					user.projects.loaded[0].datasets = Datasets.get();
				if (typeof user.projects.loaded[0].layers !== "undefined" &&  user.projects.loaded[0].layers.length === 0)
					user.projects.loaded[0].layers = Layers.get();
				if (typeof user.projects.loaded[0].storyboards !== "undefined" &&  user.projects.loaded[0].storyboards.length === 0)
					user.projects.loaded[0].storyboards = Storyboards.get();
			}
			Storyboards.setComponents();
			$log.debug("User interface initialized.");
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
		 * @requires TADkit.service:EnsemblColors
		 *
		 */
		function setDefaultDataset() {
			$log.debug("Default dataset initializing...");

			var currentDataset = Datasets.getDataset();
			
			Clusters.load(currentDataset);
			var currentModelData = Clusters.getModelData();
			Settings.set(currentDataset);
			var distances = Proximities.set(currentModelData).distances;
			var datasetDimension = currentModelData.length / 3; // 3 == xyz components of vertices
			var restraints = Restraints.set(currentDataset.restraints, datasetDimension);

			// Update Layers for initialized Dataset.
			var layersUpdate = Layers.update(distances, restraints);

			return $q.all([layersUpdate])
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
			 * @requires TADkit.service:EnsemblColors
			 *
			 * @returns {Object} All loaded defaults.
			 */
			defaults: function() {
				$log.debug("Defaults initializing...");

				// Load TADKit defaults from JSON files
				var users = Users.load();
				var projects = Projects.load();
				var datasets = Datasets.load();
				var layers = Layers.load();
				var storyboards = Storyboards.load();
				var features = EnsemblColors.load();

				return $q.all([users, projects, datasets, layers, storyboards, features])
				.then(buildUX)
				.then(setDefaultDataset)
				.then(function() {
				$log.debug("Defaults initialized.");
				});
			}
		};
	}
})();