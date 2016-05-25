(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Restraints', Restraints);

	function Restraints() {
		// Matrix - n x m dimensions == particleCount */
		var restraints = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		return {
			set: function (vertices, datasetRestraints, settings) {
				// Generate a matrix of proximity between points

				var defaults = {
					setting: true
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				restraints.dimension = vertices.length / 3; // 3 == xyz components of vertices

				for (var i = 0; i < datasetRestraints.length; i++) {
					if (datasetRestraints[i][2] == "H") restraints.harmonics.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "L") restraints.lowerBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "U") restraints.upperBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "C") restraints.neighbours.push(datasetRestraints[i]);
				}
				return restraints;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				current.harmonics = [];
				current.lowerBounds = [];
				current.upperBounds = [];
				current.neighbours = [];
				angular.forEach(restraints, function(restraint, name) {
					if (name != "dimension") {
						for (var j = restraint.length - 1; j >= 0; j--) {
							if (restraint[j][0] == currentParticle) {
								current[name].push(restraint[j]);
							}
							if (restraint[j][1] == currentParticle) {
								var reorderedRestraint = [];
								reorderedRestraint.push(restraint[j][1]);
								reorderedRestraint.push(restraint[j][0]);
								reorderedRestraint.push(restraint[j][2]);
								reorderedRestraint.push(restraint[j][3]);
								current[name].push(reorderedRestraint);
							}
						}
					}
				});
				return current;
			},
			get: function() {
				return restraints;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();