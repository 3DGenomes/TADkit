(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Track_data', Track_data);

	function Track_data() {
		var track_data = [];
		return {
			setDirect: function (datasetTrack_data) {
				var self = this;
				self.clear();
				track_data = datasetTrack_data;
							
				return track_data;
			},
			get: function() {
				return track_data;
			},
			clear: function() {
				track_data.length = 0;
			},
		};
	}
})();