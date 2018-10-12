 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Paths', Paths);

	// constructor for chromatin model instances
	function Paths() {
		return {
			splineNearFit: function(controls, segments) {
				var division = "EnsemblBacteria";
				var splinePath;
				if (division == "EnsemblBacteria") {
					splinePath = new THREE.ClosedSplineCurve3(controls);
				} else {
					splinePath = new THREE.SplineCurve3(controls);			
				}
				// var splineDivisions = splinePath.getSpacedPoints(segments);
				return splinePath;
			},
			// Following paths constructed from curve segments passing through particle centers
			spline: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var curvePath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
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

						var splineCurve = new THREE.CatmullRomCurve3([p1,p23,p4]);
						curvePath.add(splineCurve);
					}
				}
				return curvePath;
			},			
			quadraticBezier: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var quadPath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
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
			cubicBezier: function(controls, segments, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var cubicPath = new THREE.CurvePath();
				var totalControls = controls.length;
				var cubicCurveStart, cubicCurveEnd;

					// controls[0] == start point
					// controls[1] == start point fore control
					// controls[2] == first particle back control
					// controls[3] == first particle
					// ...
					// n == totalControls - 1
					// controls[n-3] == last particle
					// controls[n-2] == last particle fore control
					// controls[n-1] == end point back control
					// controls[n] == end point (if closed, end point == start point)

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