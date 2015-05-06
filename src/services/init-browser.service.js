(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initBrowser', initBrowser);

	function initBrowser($q, Datasets, Resources) {
		return function() {

			var currentDataset = Datasets.getDataset();
			console.log(currentDataset);
			// var proximityMatrix = Resources.getProximityMatrix();

			// return $q.all([proximityMatrix]);
			// .then(function(results){
			// 	console.log(results);
			// })
			// .then(function(results){
			// 	return {
			// 		proximityMatrix: results[0]
			// 	};
			// });
		};
	}
})();