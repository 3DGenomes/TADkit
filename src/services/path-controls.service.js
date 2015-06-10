 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('PathControls', PathControls);

	// constructor for chromatin model instances
	function PathControls() {
		return {
			simple: function(vertices) {
				var division = "EnsemblBacteria";

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = [];
				for (var i = 0 ; i < totalParticles - 1 ; i++) {
					var baseParticle = vertices[i];
					var foreParticle = vertices[i + 1];
					var midCoord = new THREE.Vector3(0,0,0);
					midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midCoord).sub(baseParticle);
					if (i === 0 && division != "EnsemblBacteria") { // insert backprojected first coord
						var preCoord;
						// if (division == "EnsemblBacteria") {
						// 	preCoord = vertices[totalParticles - 1];
						// } else {
							preCoord = new THREE.Vector3(0,0,0);
						// }
						preCoord.copy(baseParticle).sub(midOffset);
						pathControls.push(preCoord);
					}
					//pathControls.push(baseParticle);
					pathControls.push(midCoord);
					// if (i == totalParticles - 2) {
					// //	pathControls.push(foreParticle);
					// 	var chromEnd = new THREE.Vector3(0,0,0);
					// 	chromEnd.copy(foreParticle).add(midOffset);
					// 	pathControls.push(chromEnd);
					// };
					if (i == totalParticles - 2 && division != "EnsemblBacteria") {
					//	pathControls.push(foreParticle);
						var chromEnd;
						// if (division == "EnsemblBacteria") {
						// 	chromEnd = vertices[0];
						// } else {
							chromEnd = new THREE.Vector3(0,0,0);
						// }
						chromEnd.copy(foreParticle).add(midOffset);
						pathControls.push(chromEnd);
					}
				}
				return pathControls;
			},
			cubic: function(vertices, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var controlLength = 1; // variable for possible corner tweaking

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = {};
				pathControls.vertices = [];
				pathControls.colors = [];
				var previousOffset = new THREE.Vector3(0,0,0);

				// if (closed) {
				// 	var firstParticle = vertices[0];
				// 	var nthParticle = vertices[totalParticles - 1];
				// 	var closedControl = new THREE.Vector3(0,0,0);
				// 	if (closed) closedControl.addVectors(nthParticle, firstParticle).divideScalar(2);
				// }

				for (var i = 0 ; i < totalParticles ; i++) {

					var baseParticle = vertices[i];
					var foreParticle = new THREE.Vector3(0,0,0);
					if (i == totalParticles - 1) {
						if (closed) {
							// fore particle == first particle
							foreParticle = vertices[0];
						} else {
							// fore particle == extend same dist as to previous particle
							foreParticle.copy(baseParticle).addVectors(baseParticle, vertices[i - 1]);
						}
					} else {
						foreParticle = vertices[i + 1];
					}
					
					var midControl = new THREE.Vector3(0,0,0);
					// if (i == totalParticles - 1) {
					// 	if (closed) {
					// 		// use first particle mid point as closed chromatin...
					// 		midControl.copy(closedControl);
					// 	} else {
					// 		// use previous particle mid point as no more foreward...
					// 		midControl.addVectors(baseParticle, vertices[i - 1]).divideScalar(2);
					// 	}
					// } else {
						midControl.addVectors(baseParticle, foreParticle).divideScalar(2);
					// }
					
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midControl).sub(baseParticle);

					if (i === 0) {
						if (closed) {
							// set previous for first particle
							var previousControl =  new THREE.Vector3(0,0,0);
							previousControl.addVectors(vertices[totalParticles - 1], vertices[0]).divideScalar(2);
							previousOffset.copy(previousControl).sub(vertices[totalParticles - 1]);
						} else {
							previousOffset.copy(midOffset);
						}
					}

					var backControl = new THREE.Vector3(0,0,0);
					backControl.copy(baseParticle).sub(midOffset);

					var foreControl = new THREE.Vector3(0,0,0);
					foreControl.copy(baseParticle).add(previousOffset);

					// Node tangent
					var baseTangent =  new THREE.Vector3(0,0,0);
					baseTangent.subVectors(foreControl, backControl).divideScalar(controlLength);
					backControl.copy(baseParticle).sub(baseTangent);
					foreControl.copy(baseParticle).add(baseTangent);

					// Add controls to array
					pathControls.vertices.push(backControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));
					pathControls.vertices.push(baseParticle);
						pathControls.colors.push(new THREE.Color(0x000000));
					pathControls.vertices.push(foreControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));

					previousOffset = midOffset;
				}
				// add start and end controls
				// requires calc of join midway on cubicBezier between start and end
				var startBackControl = new THREE.Vector3(0,0,0);
				var startPoint = new THREE.Vector3(0,0,0);
				var endForeControl = new THREE.Vector3(0,0,0);
				var endPoint = new THREE.Vector3(0,0,0);

				var totalControls = pathControls.vertices.length;
				var p1 = pathControls.vertices[totalControls-2]; // last particle
				var p2 = pathControls.vertices[totalControls-1]; // last fore control
				var p3 = pathControls.vertices[0]; // first back control
				var p4 = pathControls.vertices[1]; // first particle
				if (closed) {
					// curve between start and end Controls
					var joinCurve = new THREE.CubicBezierCurve3(p1,p2,p3,p4);
					// split join curve in two
					var joinMidpoint = joinCurve.getPointAt(0.5);
					var joinTangent = joinCurve.getTangent(0.5).multiplyScalar(1);

					// NEEDS ROUNDING OFF TO NEAREST 0.5??? Math.round(num*2)/2;
					startBackControl.copy(joinMidpoint).sub(joinTangent);
					startPoint.copy(joinMidpoint);
					endForeControl.copy(joinMidpoint).add(joinTangent);
					endPoint.copy(joinMidpoint);
				} else {
					startBackControl.copy(p3);
					startPoint.copy(p3);
					endForeControl.copy(p2);
					endPoint.copy(p2);
				}
				pathControls.vertices.unshift(startBackControl);
					pathControls.colors.unshift(new THREE.Color(0xffff00));
				pathControls.vertices.unshift(startPoint);
					pathControls.colors.unshift(new THREE.Color(0xff0000));
				pathControls.vertices.push(endForeControl);
					pathControls.colors.push(new THREE.Color(0x00ffff));
				pathControls.vertices.push(endPoint);
					pathControls.colors.push(new THREE.Color(0x0000ff));

				return pathControls;
			}
		};
	}

})();