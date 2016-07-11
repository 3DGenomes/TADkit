 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin(Paths, PathControls) {
		return function(data, colors, settings) {
			// console.log(colors);

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
				var geometryColor = new THREE.Color(colors[g*20]);
				geometry.colors.unshift(geometryColor);
			}

			// Derive path controls from geometry vectors
			// var pathControls = getPathControls( geometry.vertices );
			var pathControls = PathControls.cubic(geometry.vertices, this.pathClosed);

//			var controlsGeom = new THREE.Geometry();
//			for ( var h = 0; h < pathControls.vertices.length; h ++ ) {
//				controlsGeom.vertices.push( new THREE.Vector3( pathControls.vertices[h].x, pathControls.vertices[h].y, pathControls.vertices[h].z || 0) );
//				var vertexColor = pathControls.colors[h];
//				controlsGeom.colors.push(vertexColor);
//			}
//			controlsGeom.name = "controlsGeom";

			// Set number of Particles
			if (this.particles === 0) this.particles = geometry.vertices.length; //pathControls.vertices.length - 1;
			// Derive chromatin geometry path segments
			var pathSegments = this.particles * this.particleSegments; // same as segmentsCount...
			this.pathSegments = pathSegments;

			/*** TODO: Calculate PathSegments based on number of base pairs in the model ***/
			var cubicPath = Paths.cubicBezier(pathControls.vertices, pathSegments, this.pathClosed);
			var cubicGeom = cubicPath.createPointsGeometry(pathSegments);
			for (var j = cubicGeom.vertices.length - 1; j >= 0; j--) {
				var cubicGeomColor = new THREE.Color(colors[j]);
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
			var chromatinFiber = new THREE.Object3D(); // unmerged network
			var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds

			for ( var i = 0 ; i < pathSegments; i++) {
				// cap if end segment
				this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
				// color linked to scene scope
				
				var segmentColor = colors[i];
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

			// Visualize Controls
			// var controlsMaterial = new THREE.LineBasicMaterial({color: "#ff0000",opacity: 0.5});
			// var controlsOutline = new THREE.Line(controlsGeom, controlsMaterial);
			// chromatinFiber.add(controlsOutline);

			var cubicMaterial = new THREE.LineBasicMaterial({color: "#0000ff"});
			var chromatinCubic = new THREE.Line(cubicGeom, cubicMaterial);
			// chromatinFiber.add(chromatinCubic);

			// Visualize Controls Nodes
			// var particleMap = null; // render only point
			// particleMap = THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png");
			// var particlesMaterial = new THREE.PointCloudMaterial({
			// 	// color: "#0000ff",
   //  			vertexColors: THREE.VertexColors,
			// 	size: 10,
			// 	opacity: 1.0,
			// 	// map: particleMap,
			// 	// depthTest: true,
			// 	// alphaTest: true,
			// 	// transparent: true
			// });
			// var chromatinCloud = new THREE.PointCloud(controlsGeom, particlesMaterial);
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