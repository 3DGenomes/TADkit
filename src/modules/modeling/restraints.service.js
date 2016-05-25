(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Restraints
	 * @description
	 * Restraints for Modeling.
	 *
	 */
	angular
		.module('modeling')
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

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#set
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Sort the current model's restaints by type into a collection.
			 *
			 * @param {Object} datasetRestraints Dataset restraints.
			 * @param {number} [datasetDimension] Dataset dimension (i.e. position).
			 * @param {Object} [restraintTypes] Restraint types to override the default types.
			 * @returns {Object} A collection of model restraints.
			 */
			set: function (datasetRestraints, datasetDimension, restraintTypes) {
				if (!datasetRestraints) {
					$log.warn("No restaints supplied");
					return;
				}
				datasetDimension = datasetDimension || 0;
				restraints.dimension = datasetDimension;
				var defaultTypes = {
					harmonics: "H",
					lowerBounds: "L",
					upperBounds: "U",
					neighbours: "C"
				};
				restraintTypes = restraintTypes || {};
				angular.extend(this, angular.copy(defaultTypes), restraintTypes);

				for (var i = 0; i < datasetRestraints.length; i++) {
					if (datasetRestraints[i][2] == this.harmonics) restraints.harmonics.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.lowerBounds) restraints.lowerBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.upperBounds) restraints.upperBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.neighbours) restraints.neighbours.push(datasetRestraints[i]);
				}
				return restraints;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#get
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Get the model's restraints (for a given particle/position if supplied).
			 *
			 * @param {number} [particle] A particle/position number (NOT index ie. >0).
			 * @returns {Object} A collection of model restraints.
			 */
			get: function(particle) {
				particle = particle || 0; // 0 == return all
				if (particle > 0) {
					current.dimension = particle;
					current.harmonics = [];
					current.lowerBounds = [];
					current.upperBounds = [];
					current.neighbours = [];
					angular.forEach(restraints, function(restraint, name) {
						if (name != "dimension") {
							for (var j = restraint.length - 1; j >= 0; j--) {
								// Test first restraint node as FROM
								if (restraint[j][0] == particle) {
									current[name].push(restraint[j]);
								}
								// Test second restraint node as TO
								// If TRUE reorder as FROM
								if (restraint[j][1] == particle) {
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
				} else {
					return restraints;
				}
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#getCurrent
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Get the model's restraints at current particle/position.
			 *
			 * @return {Object} A collection of model restraints.
			 */
			getCurrent: function() {
				return current;
			}
		};
	}
})();