(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Proximities
	 * @description
	 * A matrix of proximities for a set of vertices.
	 *
	 */
	angular
		.module('modeling')
		.factory('Proximities', Proximities);

	function Proximities(VERBOSE, $log) {
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

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#set
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Generate a matrix of proximity between points
			 * from vertices = array of point coordinates components
			 * up to minDistance = threshold for proximity
			 * eg. [u1,v1,z1,w1,y1,z1,x1,u2,v2,w2,x2,y2,z2 ... un,vn,wn,xn,yn,zn]
			 * 
			 * To be used by THREE.LineSegments( geometry, material )
			 * where LineSegments is the equivalent to GL_LINES in OpenGL terms.
			 * THREE.LineSegments will draw a series of pairs of segments
			 * ie. (u1,v1,w1) to (x1,y1,z1), (u2,v2,w2) to (x2,y2,z2), etc.
			 * 
			 * Stored in proximities object {positions:[],distances[]}
			 * as vertex components (rather than THREE.Vertex)
			 * for processing as THREE.BufferGeometry attributes:
			 * 'position' as positions; 'color' derived from distances.
			 *
			 * @param {Object} vertices A colleciton of vertices.
			 * @param {Object} [settings] Settings to override defaults.
			 * @returns {string} A collection of proximities.
			 */
			set: function (vertices, settings) {
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
				var lineSegments = lines * 2; // pairs of points to make THREE.LineSegments
				
				// Matrix of positions of point pairs (*3 as xyz components)
				var positions = new Float32Array( lineSegments * 3 );
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
							if (VERBOSE && i === 0 && j === 0) $log.debug("i:"+i+" ("+vertices[i*3]+","+vertices[i*3+1]+","+vertices[i*3+2]+") j:"+j+" ("+vertices[j*3]+","+vertices[j*3+1]+","+vertices[j*3+2]+")");
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

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#getMaxDistance
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Itterate over a collection of vertices to find the maximum distance between any two.
			 *
			 * @param {Object} vertices A collection of verices.
			 * @returns {number} A distance in the model's scale.
			 */
			getMaxDistance: function(vertices) {
				// Where maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var maxDistCalc = 0;
				// var clusterGeometry = new THREE.BufferGeometry();
				// clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				// clusterGeometry.computeBoundingSphere();
				var clusterDiameter = 500; //Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				return clusterDiameter;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#get
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Get the proximities (for a given particle/position if supplied).
			 *
			 * @param {number} [particle] Particle.
			 * @returns {Object} A collection of model proximities.
			 */
			get: function(particle) {
				particle = particle || 0; // 0 == return all
				if (particle > 0) {
					current.dimension = particle;
					var dataStart = (particle - 1) * proximities.dimension;
					var dataEnd = particle * proximities.dimension;
					current.positions = proximities.positions.subarray((dataStart * 2 * 3), (dataEnd * 2 * 3));
					current.distances = proximities.distances.subarray(dataStart, dataEnd);
					return current;
				} else {
					return proximities;
				}
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#getCurrent
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Get the model proximities for the current particle/position.
			 *
			 * @return {Object} The collection of model proximities.
			 */
			getCurrent: function() {
				return current;
			}
		};
	}
})();