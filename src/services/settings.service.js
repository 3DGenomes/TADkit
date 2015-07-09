(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http, uuid4, Storyboards, Datasets) {
		var settings = {};

		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					deferral.resolve(settings);
				} else {
					$http.get(source)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + source);
						deferral.resolve(settings);
					});
				}
				return deferral.promise;
			},
			init: function() {
				// INITIAL STATE
				var storyboard = Storyboards.getStoryboard();
				var dataset = Datasets.getDataset();
				// TODO: component/model = 0  - change to default/current
				settings.current.particleSegments = storyboard.components[0].view.settings.chromatin.particleSegments;
				settings.current.particlesCount = dataset.models[0].data.length / dataset.object.components;
				settings.current.segmentsCount = settings.current.particlesCount * settings.current.particleSegments;
				// NOTE: segmentLength can be calculated in 2 ways:
				// 1. particleResolution (TADbit data) / particleSegments (TADkit setting)
				// 2. modelResolution (TADbit chromEnd - TADbit chromStart) / segmentsCount (see above)
				// Method 1. is used as it is simpler to calculate and the data is already loaded.
				// Also focus on particles and does not address rounding off of sequence length.
				settings.current.segmentLength = dataset.object.resolution / settings.current.particleSegments; // base pairs
 			},
			add: function(setting) {
				// // rewrite for Object
				// settings.push(settingID);
				return settings;
			},
			remove: function(setting) {
				// // rewrite for Object
				// var index = settings.indexOf(settingID);
				// settings.splice(index, 1);
				return settings;
			},
			getState: function(setting) {
				var settingState = settings[settingID].state;
				return settingState;
			},
			get: function() {
				return settings;
			},
			getSegment: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var segment = Math.ceil((chromOffset * settings.current.segmentsCount) / chromRange);
				return segment;
			},
			getParticle: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var particle = Math.ceil((chromOffset * settings.current.particlesCount) / chromRange);
				return particle;
			},
			getRange: function (start, end) {
				var range = 0;
				for (var i = start; i <= end; i++) {
					range++;
				}
				return range;
			},
			toggle: function(selected) {
				// settings = $filter('filter')(settings, {name: '!settingID'}) // USE THIS???
				angular.forEach(settings, function(name, setting) {
					if (selected == name.id) {
						name.state = !name.state;
					}
				});
				return settings;
			}
		};
	}
})();