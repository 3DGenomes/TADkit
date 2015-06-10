(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http, uuid4) {
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
			getPosition: function (chromPosition, chromStart, chromEnd, segmentsCount) {
				var self = this;
				var chromOffset = self.getRange(chromStart, chromPosition);
				var chromRange = self.getRange(chromStart, chromEnd);
				var position = Math.ceil((chromOffset * segmentsCount) / chromRange);
				return position;
			},
			getParticle: function (chromPosition, chromStart, chromEnd, particlesCount) {
				var self = this;
				var chromOffset = self.getRange(chromStart, chromPosition);
				var chromRange = self.getRange(chromStart, chromEnd);
				var particle = Math.ceil((chromOffset * particlesCount) / chromRange);
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