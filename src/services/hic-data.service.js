(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Hic_data', Hic_data);

	function Hic_data($q, $http, Storyboards) {
		var hic_data = {
			n: 0,
			max: 0,
			min: 99999999999,
			pos: [],
			value: [],
			tads: []
		};
		var interaction_freq = 0;
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
				if(!angular.isUndefined(datasetHic_data.tads))	self.setTADS(datasetHic_data.tads);
				
				return hic_data;
			},
			setDirect: function (datasetHic_data) {
				var self = this;
				self.clear();
				hic_data = datasetHic_data;
							
				return hic_data;
			},
			setInteractionFreq: function (freq) {
				interaction_freq = freq;
							
				return;
			},
			setTADS: function (datasetTADS) {
				hic_data.tads = datasetTADS;
			},
			get: function() {
				return hic_data;
			},
			loadExternal: function(dataset) {
				
				var self = this;
				self.clear();
				var hic_panel = Storyboards.getComponentById('Hic Data');
				if(angular.isUndefined(hic_panel.view.settings.species_data[dataset.object.speciesUrl])) return false;
				var dataUrl = hic_panel.view.settings.species_data[dataset.object.speciesUrl].url;
				//dataUrl += '&res=10000';
				dataUrl += '&res='+dataset.object.resolution;
				var chrom = dataset.object.chrom[0].replace('chr','');
				dataUrl += '&chr='+chrom+'&limit_chr='+chrom;
				//dataUrl += '&chr=1&limit_chr=1';
				dataUrl += '&start='+dataset.object.chromStart+'&end='+dataset.object.chromEnd+'&limit_start='+dataset.object.chromStart+'&limit_end='+dataset.object.chromEnd;
				
				var deferred = $q.defer();
			    
				$http.get(dataUrl)
				.then( function(datasetHic) {
					var datasetHic_data = datasetHic.data;
					var hic_data = {
							n: 0,
							max: 0,
							min: 99999999999,
							pos: [],
							value: [],
							tads: []
					};
					var start_pos = parseInt(datasetHic_data.start);
					var end_pos = parseInt(datasetHic_data.end);
					hic_data.n = Math.round((end_pos-start_pos)/datasetHic_data.resolution);
					for (var val_id in datasetHic_data.values) {
						var val = datasetHic_data.values[val_id];
						var col,row;
						if(val.chrA == val.chrB && val.startA < end_pos && val.startA >= start_pos && val.startB < end_pos && val.startB >= start_pos) {
							col = (val.startB-start_pos)/datasetHic_data.resolution;
							row = (val.startA-start_pos)/datasetHic_data.resolution;
							hic_data.pos.push(Math.round(row*hic_data.n+col));
							hic_data.value.push(val.value);
							if(val.value<hic_data.min) hic_data.min = val.value;
							if(val.value>hic_data.max) hic_data.max = val.value;
						}	
					}
					self.setDirect(hic_data);
					deferred.resolve(hic_data);
				});
				return deferred.promise;
				
			},
			clear: function() {
				hic_data = {
						n: 0,
						max: 0,
						min: 99999999999,
						pos: [],
						value: [],
						tads: []
				};
			},
		};
	}
})();