(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Proximities', Proximities);

	function Proximities() {
		// Matrix - n x m dimensions == particleCount */
		var proximities = {
			dimension: 0,
			positions: [],
			distances: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			positions: [],
			distances: []
		};
		return {
			set: function (vertices, settings) {
				// Generate a matrix of proximity between points
				// from vertices = array of point coordinates components
				// up to minDistance = threshold for proximity
				// eg. [u1,v1,z1,w1,y1,z1,x1,u2,v2,w2,x2,y2,z2 ... un,vn,wn,xn,yn,zn]
				
				// To be used by THREE.Line( geometry, material, THREE.LinePieces )
				// where LinePieces is the equivalent to GL_LINES in OpenGL terms.
				// THREE.LinePieces will draw a series of pairs of segments
				// ie. (u1,v1,w1) to (x1,y1,z1), (u2,v2,w2) to (x2,y2,z2), etc.

				// Stored in proximities object {positions:[],distances[]}
				// as vertex components (rather than THREE.Vertex)
				// for processing as THREE.BufferGeometry attributes:
				// 'position' as positions; 'color' derived from distances.

				var defaults = {
					minDistance: 150,
					maxDistance: 400,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				this.maxDistance = this.getMaxDistance(vertices);

				var vertexpos = 0;
				var distancepos = 0;

				proximities.dimension = vertices.length / 3; // 3 == xyz components of vertices
				var lines = proximities.dimension * proximities.dimension; // matrix of all against all points
				var linePieces = lines * 2; // pairs of points to make THREE.LinePieces
				
				// Matrix of positions of point pairs (*3 as xyz components)
				var positions = new Float32Array( linePieces * 3 );
				// Matrix of distances between point pairs
				var distances = new Float32Array( lines );

				var dimensionIndex = proximities.dimension - 1;
				for (var i = dimensionIndex; i >= 0; i--) {

					// Check collision
					for (var j = dimensionIndex; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {
							// if (i == "0" && j=="0") console.log("i:"+i+" ("+vertices[i*3]+","+vertices[i*3+1]+","+vertices[i*3+2]+") j:"+j+" ("+vertices[j*3]+","+vertices[j*3+1]+","+vertices[j*3+2]+")");
							// FROM PARTICLE
							positions[ vertexpos++ ] = vertices[ i * 3     ]; // from u
							positions[ vertexpos++ ] = vertices[ i * 3 + 1 ]; // from v
							positions[ vertexpos++ ] = vertices[ i * 3 + 2 ]; // from w
							// TO PARTICLE
							positions[ vertexpos++ ] = vertices[ j * 3     ]; // to x
							positions[ vertexpos++ ] = vertices[ j * 3 + 1 ]; // to y
							positions[ vertexpos++ ] = vertices[ j * 3 + 2 ]; // to z

							// Distance as value (0.00-1.00) between (u,v,w) and (x,y,z)
							// is stored as RGB 0.00-1.00 (equal RGB ie greyscale)
							// for each position, start == end ie. not a gradient.

							// Can be added as 'color' to THREE.BufferGeometry
							// using THREE.BufferAttribute to store the array
							// but would need *6 to give RGB for each position.
							var distance = (1.0 - (dist / this.maxDistance)); // .toFixed(2)
							distances[ distancepos++ ] = distance;

						// }

					}
				}
				proximities.positions = positions;
				proximities.distances = distances;
				return proximities;
			},
			getMaxDistance: function(vertices) {
				// Where maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var typedArr = new Float32Array(vertices);
				var maxDistCalc = 0;
				var clusterGeometry = new THREE.BufferGeometry();
				clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( typedArr, 3 ) );
				clusterGeometry.computeBoundingSphere();
				var clusterDiameter = Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				return clusterDiameter;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				var dataStart = (currentParticle - 1) * proximities.dimension;
				var dataEnd = currentParticle * proximities.dimension;
				current.positions = proximities.positions.subarray((dataStart * 2 * 3), (dataEnd * 2 * 3));
				current.distances = proximities.distances.subarray(dataStart, dataEnd);
				return current;
			},
			get: function() {
				return proximities;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();