(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Hic_data', Hic_data);

	function Hic_data() {
		var hic_data = {
			n: 0,
			max: 0,
			min: 99999999999,
			pos: [],
			value: []
		};
		return {
			set: function (datasetHic_data) {
				var self = this;
				self.clear();
				hic_data.n = parseInt(datasetHic_data.n);

				var i = 0;
				for (var pos in datasetHic_data.data) {
					//hic_data.x.push(Math.floor(parseInt(pos)%hic_data.n));
					//hic_data.y.push(Math.floor(parseInt(pos)/hic_data.n));
					hic_data.pos.push(parseInt(pos));
					hic_data.value.push(datasetHic_data.data[pos]);
					if(datasetHic_data.data[pos]<hic_data.min) hic_data.min = datasetHic_data.data[pos];
					if(datasetHic_data.data[pos]>hic_data.max) hic_data.max = datasetHic_data.data[pos];
					i++;	
				}
				return hic_data;
			},
			get: function() {
				return hic_data;
			},
			clear: function() {
				hic_data = {
						n: 0,
						max: 0,
						min: 99999999999,
						pos: [],
						value: []
				};
			},
		};
	}
})();