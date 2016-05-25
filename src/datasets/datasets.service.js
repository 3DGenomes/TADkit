(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Datasets
	 * @description Datasets of Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 *
	 */
	angular
		.module('TADkit.datasets')
		.factory('Datasets', Datasets);

	function Datasets(VERBOSE, $log, $q, $http, uuid4, DataImport) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
			}
		};
		return {
			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#load
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Loads Datset from supplied file or default.
			 * Waits for promise.
			 *
			 * @requires $log
			 * @requires $q
			 * @requires $http
			 *
			 * @param {string} [filename] Filename for file of type JSON and extension .json.
			 * @param {boolean} [clear] Clear loaded datasets.
			 * @returns {Object} Datasets as resolved promise.
			 */
			load: function(filename, clear) {
				filename = filename || "tk-example-dataset";
				clear = clear || false;
				var self = this;
				if (clear) self.clear();

				var datapath = "examples";

				var deferred = $q.defer();
				var dataUrl = "assets/" + datapath + "/" + filename + ".json";
				$http.get(dataUrl)
				.success( function(dataset) {
					// TADkit defaults and examples are already validated
					dataset.object.filename = filename;
					self.import(dataset);
					deferred.resolve(datasets);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#import
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Imports supplied data and adds to Datasets.
			 *
			 * @requires $log
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			preview: function(data, selection) {
				var preview = {
					"data" : {},
					"selection" : {
						"rows" : [],
						"cols" : []
					},
					"details" : {

					}
				};
				preview.data = DataImport.parse(data);
				// Selected Rows in File Data
				// Controlled by checkboxes in data-import.html
				var rows = preview.data.length;
				while (--rows >= 0) {preview.selection.rows[rows] = true;} // on init select all
				// Selected Columns in File Data
				// Controlled by checkboxes in data-import.html
				var cols = preview.data[0].length;
				while (--cols >= 0) {preview.selection.cols[cols] = true;} // on init select all
				return preview;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#import
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Imports previewed data and adds to Datasets.
			 *
			 * @requires $log
			 *
			 * @param {Object} data Preview data Object.
			 * @returns {Object} Datasets Object.
			 */
			import: function(data) {
				data = data || "error"; // Handle error
				var self = this;
				var dataset = DataImport.import(data);
				dataset = self.unique(dataset);
				self.add(dataset);
				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#unique
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Check the data and ID are unique in Datasets.
			 *
			 * @requires $log
			 *
			 * @param {Object} dataset Dataset Object.
			 * @returns {Object} Datasets Object.
			 */
			unique: function(dataset) {
				var timeout = 1000;
				var unique = false;
				if (datasets.loaded.length > 0) {
					while (timeout > 1 || !unique) {
						var duplicateCount = 0;
						var testID = uuid4.generate();
						for (var i = datasets.loaded.length - 1; i >= 0; i--) {
							if (datasets.loaded[i].uuid == testID) {
								duplicateCount++;
								// check if others dataset values match
								var thesame = {};
								if (dataset == thesame){
									$log.info("Dataset already loaded.");
								} else {
									$log.warn("Not a unique ID");
								}
							}
						}
						if (duplicateCount === 0) {
							unique = true;
						}
						timeout--;
					}
					if (!unique && timeout === 0) {
						$log.warn("Timeout searching for unique UUID");
					}					
				}
				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#add
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Adds dataset to Datasets from supplied data.
			 *
			 * @requires $log
			 *
			 * @param {Object} dataset Object.
			 * @returns {Object} Datasets Object.
			 */
			add: function(dataset) {
				var self = this;
				datasets.loaded.push(dataset);
				datasets.current.index = datasets.loaded.length - 1;
				$log.info("Dataset " + dataset.object.species + " " + dataset.object.region + " loaded from file.");
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#clear
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Clears Datasets Object.
			 *
			 * @returns {Object} Datasets Object.
			 */
			clear: function() {
				while (datasets.loaded.length > 0) {
					datasets.loaded.shift();
				}
				return $log.info("Datasets Object cleared!");
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#remove
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Removes dataset at supplied index from Datasets.
			 *
			 * @requires $log
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {Object} Datasets Object.
			 */
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				var datasetTitle = dataset.title;
				datasets.loaded.splice(dataset, 1);
				$log.info("Dataset " + datasetTitle + "at index " + index + " removed!");
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#set
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Sets current dataset from those loaded in Datasets.
			 *
			 * @param {number} [index] Index of dataset.
			 * @returns {Object} Newly set current dataset.
			 */
			set: function(index) {
				var self = this;
				if (index !== undefined || index !== false) datasets.current.index = index;
				var dataset = datasets.loaded[datasets.current.index];
				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#get
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get Datasets.
			 *
			 * @returns {Object} Datasets.
			 */
			get: function() {
				return datasets;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getDataset			
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get Datasets.
			 *
			 * @returns {Object} Datasets.
			 */
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},
			/**
			 * @ngdoc function
			 * @name TADkit.service:Datasets#getModel
			 * @methodOf TADkit.service:Datasets
			 * @kind function
			 *
			 * @description
			 * Get model from ref or current id no ref supplied. eg. { ref:1 , data:1,2,3 }
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Object} Model.
			 */
			getModel: function(ref) { // from model ref
				var self = this;
				ref = ref || 1;
				var model;
				for (var i = datasets.loaded[datasets.current.index].length - 1; i >= 0; i--) {
					if (datasets.loaded[datasets.current.index].models[i].ref == ref) model = datasets.loaded[datasets.current.index].models[i];
				}
				return model;
			},

		};
	}
})();