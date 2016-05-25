 (function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name visualization.service:Paths
	 * @description
	 * Generate 3D paths from set of control vertices.
	 *
	 */
	angular
		.module('visualization')
		.factory('Paths', Paths);

	function Paths() {
		return {
			
			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#splineNearFit
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a spline path from supplied control vertices.
			 * This is a near fit ie. it does NOT pass through the controls.
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			splineNearFit: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var splinePath;
				if (closed) {
					splinePath = new THREE.ClosedSplineCurve3(controls);
				} else {
					splinePath = new THREE.SplineCurve3(controls);			
				}
				// var splineDivisions = splinePath.getSpacedPoints(segments);
				return splinePath;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#spline
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a spline path from supplied control vertices.
			 * Constructed from curve segments passing through particle centers
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			spline: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var curvePath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (closed) {
					// REVISE THIS
					curvePath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var splineCurve = new THREE.SplineCurve3([p1,p23,p4]);
						curvePath.add(splineCurve);
					}
				}
				return curvePath;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#quadraticBezier
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a Bezier curve path from supplied control vertices.
			 * Constructed from curve segments passing through particle centers
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			quadraticBezier: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var quadPath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (closed) {
					// REVISE THIS
					quadPath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var quadCurve = new THREE.QuadraticBezierCurve3(p1,p23,p4);
						quadPath.add(quadCurve);
					}
				}
				return quadPath;
			},			

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#cubicBezier
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a cubic Bezier path from supplied control vertices
			 *  passing through control centers.
			 *
			 * ```controls[0] == start point
			 * controls[1] == start point fore control
			 * controls[2] == first particle back control
			 * controls[3] == first particle
			 * ...
			 * n == totalControls - 1
			 * controls[n-3] == last particle
			 * controls[n-2] == last particle fore control
			 * controls[n-1] == end point back control
			 * controls[n] == end point (if closed, end point == start point)```
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			cubicBezier: function(controls, segments, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var cubicPath = new THREE.CurvePath();
				var totalControls = controls.length;
				var cubicCurveStart, cubicCurveEnd;

					for (var i = 0 ; i < totalControls - 1 ; i = i + 3) {

						var c1 = controls[i];
						var c2 = controls[i+1];
						var c3 = controls[i+2];
						var c4 = controls[i+3];

						var cubicCurve = new THREE.CubicBezierCurve3(c1,c2,c3,c4);
						 cubicPath.add(cubicCurve);
					}
				return cubicPath;
			}
		};
	}

})();