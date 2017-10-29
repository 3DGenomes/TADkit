(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http) {
		var settings = {};

		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					deferral.resolve(settings);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + dataUrl);
						deferral.resolve(settings);
					});
				}
				return deferral.promise;
			},
			set: function(dataset, chromosomeIndex, currentChrom) {
				var self = this;
				if (currentChrom === undefined || currentChrom === false) currentChrom = dataset.object.chrom[0];
				if (chromosomeIndex === undefined || chromosomeIndex === false) chromosomeIndex = [currentChrom];
				//settings.current.chrom = dataset.object.chrom[chromosomeIndex];
				//settings.current.chromStart = dataset.object.chromStart[chromosomeIndex];
				//settings.current.chromEnd = dataset.object.chromEnd[chromosomeIndex];
				settings.current.chrom = currentChrom;
				settings.current.chromIdx = chromosomeIndex.indexOf(settings.current.chrom);
				settings.current.chromStart = [];
				settings.current.chromEnd = [];
				var chromIdx;
				//var offset = 0;
				var resolution = dataset.object.resolution;
				settings.current.particlesCount = 0;
				for (var l = 0 ; l < dataset.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf(dataset.object.chrom[l]);
					if(chromIdx > -1) {
						settings.current.chromStart.push(Math.round(dataset.object.chromStart[l]));
						settings.current.chromEnd.push(Math.round(dataset.object.chromEnd[l]));
						settings.current.particlesCount += Math.round(dataset.object.chromEnd[l]/resolution) - Math.round(dataset.object.chromStart[l]/resolution) + 1;
					}
					//offset += Math.round(dataset.object.chromEnd[l])-Math.round(dataset.object.chromStart[l])+1*resolution;
				}
				//settings.current.chromosomeIndexes = [settings.current.chrom];
				settings.current.chromosomeIndexes = chromosomeIndex;
				
				settings.current.species = dataset.object.species;
				settings.current.speciesUrl = dataset.object.speciesUrl;
				if(typeof dataset.object.assembly !== 'undefined') 
					settings.current.assemblyUrl = dataset.object.assembly;
				
				// NOTE: particle segements as lowest resolution of model
				// instead of particleSegments as variable in TADkit
				// i.e settings.current.particleSegments = storyboard.components[0].view.settings.chromatin.particleSegments;
				//settings.current.particleSegments = 20; // ((dataset.object.chromEnd - dataset.object.chromStart) / dataset.object.resolution);
				//settings.current.particleSegments = Math.round((dataset.object.chromEnd - dataset.object.chromStart) / (5*dataset.object.resolution));
				// Max rings in 3d aprox 2000
				//settings.current.particlesCount = dataset.models[0].data.length / dataset.object.components;
				
				//settings.current.particlesCount = Math.round((settings.current.chromEnd-settings.current.chromStart)/dataset.object.resolution);
				settings.current.particleSegments = Math.ceil(2500/settings.current.particlesCount);
				settings.current.edgesCount = ((settings.current.particlesCount*settings.current.particlesCount)-settings.current.particlesCount)*0.5;
				settings.current.segmentsCount = settings.current.particlesCount * settings.current.particleSegments;
				// NOTE: segmentLength can be calculated in 2 ways:
				// 1. particleResolution (TADbit data) / particleSegments (TADkit setting)
				// 2. modelResolution (TADbit chromEnd - TADbit chromStart) / segmentsCount
				// Method 1. is used as it is simpler to calculate and the data is already loaded.
				// Also focus on particles and does not address rounding off of sequence length.
				settings.current.segmentLength = dataset.object.resolution / settings.current.particleSegments; // base pairs
				// SET INITIAL position at midpoint
				
				//settings.current.position = settings.current.chromStart + parseInt((settings.current.chromEnd - settings.current.chromStart) * 0.5);
				settings.current.position = settings.current.chromStart[settings.current.chromIdx] + parseInt((settings.current.chromEnd[settings.current.chromIdx] - settings.current.chromStart[settings.current.chromIdx]) * 0.5);
				settings.current.particle = self.getParticle();
				settings.current.particleSize = Math.ceil(dataset.object.resolution/20);
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
				//var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				//var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var chromOffset = chromPosition-settings.current.chromStart[settings.current.chromIdx];
				//var chromRange = settings.current.chromEnd[settings.current.chromIdx]-settings.current.chromStart[settings.current.chromIdx];
				var chromRange=0;
				var resolution = settings.current.segmentLength*settings.current.particleSegments; // base pairs
				for(var l=0;l<settings.current.chromosomeIndexes.length;l++) chromRange += Math.round(settings.current.chromEnd[l])-Math.round(settings.current.chromStart[l])+resolution; 
				
				//var resolution = settings.current.segmentLength*settings.current.particleSegments; // base pairs
				//var particlesCount = Math.round(settings.current.chromEnd[settings.current.chromIdx]/resolution) - Math.round(settings.current.chromStart[settings.current.chromIdx]/resolution) + 1;
				var particlesCount = settings.current.particlesCount;
				var segmentsCount = particlesCount * settings.current.particleSegments;				
				var segment = Math.ceil((chromOffset * (segmentsCount)) / chromRange);
				return segment;
			},
			getParticle: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				//var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				//var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var chromOffset = chromPosition-settings.current.chromStart[settings.current.chromIdx];
				//var chromRange = settings.current.chromEnd[settings.current.chromIdx]-settings.current.chromStart[settings.current.chromIdx];
				var chromRange=0;
				var resolution = settings.current.segmentLength*settings.current.particleSegments; // base pairs
				for(var l=0;l<settings.current.chromosomeIndexes.length;l++) chromRange += Math.round(settings.current.chromEnd[l])-Math.round(settings.current.chromStart[l])+resolution; 
				
				//var particlesCount = Math.round(settings.current.chromEnd[settings.current.chromIdx]/resolution) - Math.round(settings.current.chromStart[settings.current.chromIdx]/resolution) + 1;
				var particlesCount = settings.current.particlesCount;
				var particle = Math.ceil((chromOffset * (particlesCount-1)) / chromRange);
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