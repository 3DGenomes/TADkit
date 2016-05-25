(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Annotations
	 * @description Tempalate for Layer to within TADkit
	 * This template structure is equivalent to UCSC custom
	 * track data file format of Browser, Track and Data.
	 *
	 */
	angular
		.module('TADkit.layers')
		.factory('LayerName', LayerName);

	function LayerName() {
		var layername = {
			// browser requirements
			browser : {
				config : "default"
			},
			// visualization i.e. like UCSC 'tracks' but not just track specific
			viz : {
				defaultType : "track-bigbed",
				source : "default",
				palette : ["#ff0000","#0000ff"],
				scale : 1
			},
			// data to be used (live on the fly - store last)
			data : {
				ref : "1",
				data : [""]
			}
		};

		return {
			build: function(data) {
			}
		};
	}
})();