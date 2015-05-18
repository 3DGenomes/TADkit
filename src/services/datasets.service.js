(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets($q, $http, uuid4) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		return {
			load: function() {
				var deferral = $q.defer();
				// var source = "assets/json/tk-defaults-datasets.json";
				var source = "assets/json/mycoplasma_pneumoniae-tadbit.json";

				var self = this;
				if( datasets.loaded.length > 0 ) {
					deferral.resolve(datasets);
				} else {
					$http.get(source)
					.success( function(data) {
						var dataset = data;
						datasets.loaded.push(dataset);
						// console.log(data[0].models);
						// angular.forEach(data[0].models, function(model, key) {
						// 	model = JSON.stringify(model).replace("####",key+1);
						// 	data[0].models[key] = JSON.parse(model);
						// });
						// console.log(JSON.stringify(data[0].models));
						var current = datasets.current.index;
						datasets.loaded[current].object.speciesUrl = self.setSpeciesUrl(current);
						console.log("Datasets (" + data.length + ") loaded from " + source);
						deferral.resolve(datasets);
					});
				}
				return deferral.promise;
			},
			add: function(data) { // rename import?
				/* CHECK DATASET IS VALID */
				var dataset = JSON.parse(data);
				// console.log(dataset); // NOT AN ARRAY - A SINGLE DATASET
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					console.log("Dataset \"" + datasets.loaded[datasets.current.index].object.title + "\" loaded from file.");
				// }
				// console.log(datasets.loaded);
				return datasets;
			},
			// add: function(title) {
			// 	projects.loaded.push(newProject);
			// 	projects.current = projects.loaded.length - 1;
			// 	return projects.loaded[projects.current];
			// },
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				datasets.loaded.splice(dataset, 1);
				return datasets;
			},
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var speciesUrl = datasets.loaded[index].object.species;
				speciesUrl = speciesUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				return speciesUrl;
			},
			set: function(index) {
				if (index !== undefined || index !== false) datasets.current.index = index;
				this.setCluster(datasets.current.cluster);
				var dataset = datasets.loaded[datasets.current.index];
				return dataset;
			},
			setCluster: function(ref) { // from cluster ref
				ref = ref || 1; // from ref or just set as the first cluster
				datasets.current.cluster = ref;
				var clusterCentroid = this.getCentroid(datasets.current.cluster);
				this.setCentroid(clusterCentroid);
				var cluster = this.getCluster();
				return cluster; // array of model indices
			},
			setCentroid: function(ref) { // from model ref
				ref = ref || this.getCentroid(); // from ref or from current cluster
				datasets.current.centroid = ref;
				var centroid = this.setModel(datasets.current.centroid);
				return centroid; // array of vertices
			},
			setModel: function(ref) { // from model ref
				ref = ref || this.getCentroid();
				var model = this.getModel(ref - 1);
				// Store as current model for dataset in datasets.loaded[datasets.current.index].data
				datasets.loaded[datasets.current.index].data = model;
				return model; // array of vertices
			},
			get: function() {
				return datasets;
			},
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},
			getCluster: function(ref) { // from cluster ref
				ref = ref || datasets.current.cluster;
				var cluster = datasets.loaded[datasets.current.index].clusters[ref - 1];
				return cluster; // array of model refs
			},
			getCentroid: function(ref) { // from cluster ref (NOT model ref)
				ref = ref || datasets.current.cluster;
				var centroid = datasets.loaded[datasets.current.index].centroids[ref - 1];
				return centroid; // single model ref
			},
			getModel: function(ref) { // from model ref
				ref = ref || this.getCentroid();
				var model, models = datasets.loaded[datasets.current.index].models;
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) model = models[i];
				}
				return model; // array of model vertices
			},
			getSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var speciesUrl = datasets.loaded[index].object.speciesUrl;
				return speciesUrl;
			},
			getRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var region = datasets.loaded[index].object.chromosome + ":" + datasets.loaded[index].object.chromStart + "-" + datasets.loaded[index].object.chromEnd;
				return region;
			},
			getComponents: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var components = datasets[index].components;
				return components;
			},
		};
	}
})();