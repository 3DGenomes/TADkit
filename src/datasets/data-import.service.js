(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:DataImport
	 * @description Import datasets to Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('TADkit.datasets')
		.factory('DataImport', DataImport);

	function DataImport(VERSION, NAME, $log, Clusters, Layers) {
		// Import additional 2D/track data imported by users for use as Layers

		return {
			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#import
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description Process for importing data
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			import: function(data) {
				data = data || {}; // validate data???
				var self = this;
				var dataset = {};

				// data is JSON string to be serialized
				if (!angular.isObject(data)) data = angular.fromJson(data);

				if (data.metadata && data.metadata.type == "dataset" && data.metadata.generator == "TADbit") {
						dataset = data; // already a TADkit Object
						dataset.object = self.detail(data);
				} else {
					// Deal with errors from PapaParse
					// Check parsedData is TABULAR data
					var validatedData = self.validate(data.data);
					var filteredData = self.filter(validatedData, data.selection);
					var dataDetails = self.detail(data);
					dataset = self.create(filteredData, dataDetails);
				}

				if (dataset.clusters) {
					console.log("Clusters found :)");
					Clusters.load(dataset);
				} else {
					console.log("No clusters :(");
					// HACK: assuming tabular data import...
					Layers.import(dataset);
				}

				return dataset;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#parse
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description Parse file data into JSON object
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true
				});
				return parsedData.data;
			},
			
			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#validate
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description
			 * check with User feedback... first row pulldown
			 * is it a set of xyz, scores, imaging data, ...
			 * is it a point cloud, an array....
			 * note a matrix is a ???
			 * if isNumber also check if integer or float
			 * if col2 integer check that is higher than col1
			 * if yes use as coordinates...
			 * 1D(e.g numerals, strings etc)
			 * 2D(e.g. pixel color info of an image)
			 * 3D(e.g data table)
			 * or any n Dimensions.
			 * if not classify as value... but check with User feedback
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			validate: function(data) {
				var valid = true;
				// var rows = data.length;
				// var cols = data[0].length;
				var validatedData;


				// for (var i = 0; i < rows; i++) {
				// 	var newRow = [];
				// 	if (selectedRows[i]) {
				// 		for (var j = 0; j < cols; j++) {
				// 			if (selectedCols[j]) newRow.push(dataTable[i][j]); // else column not added
				// 		}
				// 		filteredData.push(newRow);
				// 	} // else row not added
				// 	valid = true;
				// }
				validatedData = data;
				if (valid) {
					return validatedData;
				} else {
					// give error message
					// return to Project Loader page
				}
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#filter
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description
			 * data [[row1col1,row1col2...],[row2col1,row2col2...]...]
			 * Remove rows/cols marked false in selection.rows/.cols arrays
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			filter: function(data, selection) {
				var filteredData = [];
				if (selection.rows.length === 0 && selection.cols.length === 0) {
					filteredData = data;
				} else {
					var rows = selection.rows.length;
					var cols = selection.cols.length;
					for (var i = 0; i < rows; i++) {
						var newRow = [];
						if (selection.rows[i]) {
							for (var j = 0; j < cols; j++) {
								if (selection.cols[j]) newRow.push(data[i][j]);
								// else column ignored
							}
							filteredData.push(newRow);
						} // else row not added
					}
				}
				return filteredData;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#describe
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description
			 * Formats data for dataset.
			 *
			 * @param {Object} details Data Object.
			 * @returns {Object} Formatted data.
			 */
			detail: function(preview) {
				var details = {};
				if (preview.object) {
					// already a dataset with details in data.object
					details = preview.object;
				} else {
					var defaults = {
						"uuid" : "00000000-0000-0000-0000-000000000000",
						"id" : "default",
						"title" : "Default",
						"description" : "Default description",

						"source" : "Default",
						"assembly" : "Default",
						"experimentType" : "Default",
						"project" : "Default",

						"domain" : "Default",
						"organism" : "Default",
						"species" : "Default",
						"cellType" : "Default",

						// "locus" : {
							"chrom" : ["X"], // scaffold/landmarks
							"chromStart" : [0], // start
							"chromEnd" : [1000], // end								
						// }
						// "datatype" : {
							"resolution" : 1000,
							"datatype" : "default",
							"components" : 2, // for data parsing										
						// }
						"dependencies" : {}
					};
					details = defaults;
					// angular.extend(this, angular.copy(defaults), details);
				}
				var species = details.species;
				var speciesUrl = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				details.speciesUrl = speciesUrl;
				for (var i = details.chrom.length - 1; i >= 0; i--) {
					details.chrom[i].toLowerCase();
				}
				details.region = details.chrom + ":" + details.chromStart + "-" + details.chromEnd;
				return details;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:DataImport#create
			 * @methodOf TADkit.service:DataImport
			 * @kind function
			 *
			 * @description Create new dataset object
			 *
			 * @param {Object} data Data Object.
			 * @returns {Object} Datasets Object.
			 */
			create: function(data, details) {
				var dataset = {
						"metadata": {
							"version" : VERSION,
							"type" : "dataset",
							"generator" : NAME
						},
						"object" : details,
						"data" : data
					};
				return dataset;
			}
		};
	}
})();