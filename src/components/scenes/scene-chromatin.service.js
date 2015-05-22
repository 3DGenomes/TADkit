 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin() {
		return function(data, overlay, settings) {
			// console.log(overlay);

			var defaults = {
				visible: true,
				genomeLength: 816394, // bactieria mycoplasma_pneumoniae_m129
				particles: 0,
				particleSegments: 5,
				curveSegments: 1,
				radius: 15,
				radiusSegments: 16,
				endcap: false,
				pathClosed: false
			};		
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Convert Data to Vector triplets
			var geometry = getGeometry(data);
			for (var g = geometry.vertices.length - 1; g >= 0; g--) {
				var geometryColor = new THREE.Color(overlay[g*20]);
				geometry.colors.unshift(geometryColor);
			}

			// Derive path controls from geometry vectors
			// var pathControls = getPathControls( geometry.vertices );
			var pathControls = getCubicControls(geometry.vertices, this.pathClosed);

			var controlsGeom = new THREE.Geometry();
			for ( var h = 0; h < pathControls.vertices.length; h ++ ) {
				controlsGeom.vertices.push( new THREE.Vector3( pathControls.vertices[h].x, pathControls.vertices[h].y, pathControls.vertices[h].z || 0) );
				var vertexColor = pathControls.colors[h];
				controlsGeom.colors.push(vertexColor);
			}
			controlsGeom.name = "controlsGeom";

			// Set number of Particles
			if (this.particles === 0) this.particles = geometry.vertices.length; //pathControls.vertices.length - 1;
			// Derive chromatin geometry path segments
			var pathSegments = this.particles * this.particleSegments;
			this.pathSegments = pathSegments;

			/*** TO DO: Calculate PathSegments based on number of base pairs in the model ***/
			// // Spline
			// var splinePath2 = getNearFitSplinePath(pathControls.vertices, pathSegments);
			// // console.log(splinePath2.getLength());
			// var splineGeom2 = new THREE.Geometry();
			// 	splineGeom2.vertices = splinePath2.getPoints( pathSegments );
			// // Spline Curves
			// var splinePath = getSplinePath(pathControls.vertices, pathSegments);
			// // console.log(splinePath.getLength());
			// var splineGeom = splinePath.createPointsGeometry(pathSegments);
			// // Quadratic Bezier (3 controls)
			// var quadPath = getQuadPath(pathControls.vertices, pathSegments);
			// // console.log(quadPath.getLength());
			// var quadGeom = quadPath.createPointsGeometry(pathSegments);
			// // Cubic Bezer (4 controls)
			var cubicPath = getCubicPath(pathControls.vertices, pathSegments, this.pathClosed);
			var cubicGeom = cubicPath.createPointsGeometry(pathSegments);
			for (var j = cubicGeom.vertices.length - 1; j >= 0; j--) {
				var cubicGeomColor = new THREE.Color(overlay[j]);
				cubicGeom.colors.unshift(cubicGeomColor);
			}
			cubicGeom.name = "cubicGeom";


			// ********************************************
			// * MODEL SCALE = 1unit : 1nanometer         *
			// * 1 micrometer (µm) = 1000 nanometers (nm) *
			// ********************************************
			// Eukaryotic animal cells diamter == 20 µm (10 - 30 µm) = 10000 units radius
			// var cellRadius = 10000;
			// Nucleus diameter == 6 µm (3 - 10 micrometers) = 3000 units radius
			// var nucelusRadius = 20;
			// Chromatin diameter == 30nm
			var pathLength = cubicPath.getLength();
			var chromatinRadius = 15; // 30nm * 0.5
			// Chromatin density == 1080 BP : 11nm
			var chromatinLength = this.genomeLength * 11 / 1080;
			this.radius = (pathLength * chromatinRadius) / chromatinLength;
			// console.log(this.radius);


			// Generate Chromatin model
			var chromatinFiber = new THREE.Object3D(); // unmerged mesh
			var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
			for ( var i = 0 ; i < pathSegments; i++) {
				// cap if end segment
				this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
				// color linked to scene scope
				
				var segmentColor = overlay[i];

				var segmentMaterial = new THREE.MeshLambertMaterial({
					color: segmentColor,
					ambient: segmentColor,
					emissive: segmentColor,
					vertexColors: THREE.VertexColors,
					opacity: 1.0, 
					transparent: false,
					wireframe: false
				});
				var segment = segmentGeometry(cubicGeom.vertices[i], cubicGeom.vertices[i+1], this );
				chromatinGeometry.merge(segment);

				var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
				chromatinSegment.name = "segment-" + (i + 1);
				chromatinFiber.add(chromatinSegment);
			}

			var controlsMaterial = new THREE.LineBasicMaterial({color: "#ff0000",opacity: 0.5});
			var controlsOutline = new THREE.Line(controlsGeom, controlsMaterial);
			// chromatinFiber.add(controlsOutline);

			// var splineMaterial = new THREE.LineBasicMaterial({color: "#0f0f00"});
			// var chromatinSpline2 = new THREE.Line(splineGeom2, splineMaterial);
			// // chromatinFiber.add(chromatinSpline2);

			// var splineMaterial = new THREE.LineBasicMaterial({color: "#0f0f00"});
			// var chromatinSpline = new THREE.Line(splineGeom, splineMaterial);
			// // chromatinFiber.add(chromatinSpline);

			// var quadMaterial = new THREE.LineBasicMaterial({color: "#00ff00"});
			// var chromatinQuad = new THREE.Line(quadGeom, quadMaterial);
			// // chromatinFiber.add(chromatinQuad);

			var cubicMaterial = new THREE.LineBasicMaterial({color: "#0000ff"});
			var chromatinCubic = new THREE.Line(cubicGeom, cubicMaterial);
			// chromatinFiber.add(chromatinCubic);

			// var particleMap = null; // render only point
			// particleMap = THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png");

			var particlesMaterial = new THREE.PointCloudMaterial({
				// color: "#0000ff",
    			vertexColors: THREE.VertexColors,
				size: 10,
				opacity: 1.0,
				// map: particleMap,
				// depthTest: true,
				// alphaTest: true,
				// transparent: true
			});

			var chromatinCloud = new THREE.PointCloud(controlsGeom, particlesMaterial);
			// chromatinFiber.add(chromatinCloud);
			chromatinGeometry.computeBoundingSphere();
			chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
			chromatinFiber.name = "Chromatin Fiber";
			
			return chromatinFiber;
		};
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Chromatin Geometry";
		return vertexGeometry;
	}
	
	function getPathControls( vertices ) {
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
	}

	function getCubicControls(vertices, closed) {
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

	function getNearFitSplinePath (controls, segments) {
		var division = "EnsemblBacteria";
		var splinePath;
		if (division == "EnsemblBacteria") {
			splinePath = new THREE.ClosedSplineCurve3(controls);
		} else {
			splinePath = new THREE.SplineCurve3(controls);			
		}
		// var splineDivisions = splinePath.getSpacedPoints(segments);
		return splinePath;
	}

	// Following paths constructed from curve segments passing through particle centers
	function getSplinePath (controls, segments) {
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

				var splineCurve = new THREE.SplineCurve3([p1,p23,p4]);
				curvePath.add(splineCurve);
			}
		}
		return curvePath;
	}
	
	function getQuadPath (controls, segments) {
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
	}
	
	function getCubicPath (controls, segments, closed) {
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

	function segmentGeometry (pointX, pointY, props) {
		var newGeometry;
		/* edge from X to Y */
		var segmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
		var segmentOrientation = new THREE.Matrix4();
		/* THREE.Object3D().up (=Y) default orientation for all objects */
		segmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
		/* rotation around axis X by -90 degrees
		 * matches the default orientation Y
		 * with the orientation of looking Z */
		var segmentRotation = new THREE.Matrix4();
		segmentRotation.set(	1, 0, 0, 0,
								0, 0, 1, 0,
								0,-1, 0, 0,
								0, 0, 0, 1 );
		segmentOrientation.multiply(segmentRotation);
		segmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		newGeometry = new THREE.CylinderGeometry( props.radius, props.radius, segmentDirection.length(), props.radiusSegments, props.curveSegments, props.endcap);
		newGeometry.applyMatrix(segmentOrientation);
		
		return newGeometry;
	}
		
})();