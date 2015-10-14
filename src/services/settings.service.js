(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http) {
		var settings = {};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					 deferred.resolve(settings);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + dataUrl);
						 deferred.resolve(settings);
					});
				}
				return deferred.promise;
			},
			set: function(dataset) {
				var self = this;
				var chromosomeIndex = 0;
				if (dataset.object.chromosomeIndex) { chromosomeIndex = dataset.object.chromosomeIndex;	}
				settings.current.chrom = dataset.object.chrom[chromosomeIndex];
				settings.current.chromStart = dataset.object.chromStart[chromosomeIndex];
				settings.current.chromEnd = dataset.object.chromEnd[chromosomeIndex];
				settings.current.species = dataset.object.species;
				settings.current.speciesUrl = dataset.object.speciesUrl;
				// NOTE: particle segements as lowest resolution of model
				// instead of particleSegments as variable in TADkit
				// i.e settings.current.particleSegments = storyboard.components[0].view.settings.chromatin.particleSegments;
				settings.current.particleSegments = 20;// ((dataset.object.chromEnd - dataset.object.chromStart) / dataset.object.resolution);
				settings.current.particlesCount = dataset.models[0].data.length / dataset.object.components;
				settings.current.edgesCount = ((settings.current.particlesCount*settings.current.particlesCount)-settings.current.particlesCount)*0.5;
				settings.current.segmentsCount = settings.current.particlesCount * settings.current.particleSegments;
				// NOTE: segmentLength can be calculated in 2 ways:
				// 1. particleResolution (TADbit data) / particleSegments (TADkit setting)
				// 2. modelResolution (TADbit chromEnd - TADbit chromStart) / segmentsCount
				// Method 1. is used as it is simpler to calculate and the data is already loaded.
				// Also focus on particles and does not address rounding off of sequence length.
				settings.current.segmentLength = dataset.object.resolution / settings.current.particleSegments; // base pairs
				// SET INITIAL position at midpoint
				settings.current.position = settings.current.chromStart + parseInt((settings.current.chromEnd - settings.current.chromStart) * 0.5);
				settings.current.particle = self.getParticle();
				// AND SEGMENT IT LIES WITHIN
				settings.current.segment = self.getSegment(settings.current.position);
				settings.current.segmentLower = settings.current.position - (settings.current.segment * 0.5);
				settings.current.segmentUpper = settings.current.position + (settings.current.segment * 0.5);
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
			getOnline: function() {
				var online = false;
				if (settings.app) online = settings.app.online;
				return online;
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