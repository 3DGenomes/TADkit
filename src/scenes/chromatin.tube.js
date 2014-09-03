// Chromatin Geometry
// 1. ALL GEOMETRY IN SINGLE OBJECT

'use strict';

APP.factory('ChromatinTube', [ function () {
	// constructor for chromatin model instances
	function ChromatinTube( data, chromatinMaterial, overrides) {
        var defaults = {
        	particleSegments: 10,
			curveSegments: 100,
			radius: 15,
			radiusSegments: 16,
			closed: false
        };		
		overrides = overrides || { };
        angular.extend(this, angular.copy(defaults), overrides);
		var TADGeometry = getTADGeometry( data );
		this.curveSegments = TADGeometry.vertices.length * 3;
		var chromatinPath = getPath( TADGeometry.vertices );
		var chromatinGeometry = new THREE.TubeGeometry(chromatinPath, this.curveSegments, this.radius, this.radiusSegments, this.closed);
		chromatinGeometry.computeBoundingSphere();
		this.fiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
		this.center = getCenter( this.fiber.geometry.vertices );
	}
	
	function getCenter( vertices ) {
		var centroid = new THREE.Vector3();
		var count = vertices.length;
		for ( var i=0; i < count; i++ )
		{
			centroid.x += vertices[i].x;
			centroid.y += vertices[i].y;
			centroid.z += vertices[i].z;
		}
			centroid.x /= count;
			centroid.y /= count;
			centroid.z /= count;
		// console.log("Centroid: %s", JSON.stringify(centroid));
		return centroid;
	}
	
	function getTADGeometry( data ) {
		var offset = 0, vertex,
			 TADGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			TADGeometry.vertices.push( vertex );
		}
		return TADGeometry;
	}
	
	function getPath( vertices ) {
		// PARTICLE CONTROLS
		// (totalParticles - 1) because (fore = [i+1])
		var totalParticles = vertices.length;
		var particleControls = [];
		for (var i = 0 ; i < totalParticles - 1 ; i++) {
			var baseParticle = vertices[i];
			var foreParticle = vertices[i + 1];
			var midCoord = new THREE.Vector3(0,0,0);
			midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
			var midOffset = new THREE.Vector3(0,0,0);
			midOffset.copy(midCoord).sub(baseParticle);
			if (i == 0) { // insert backprojected first coord
				var preCoord = new THREE.Vector3(0,0,0);
				preCoord.copy(baseParticle).sub(midOffset);
				particleControls.push(preCoord);
			};
			//particleControls.push(baseParticle);
			particleControls.push(midCoord);
			if (i == totalParticles - 2) {
			//	particleControls.push(foreParticle);
				var endCoord = new THREE.Vector3(0,0,0);
				endCoord.copy(foreParticle).add(midOffset);
				particleControls.push(endCoord);
			};
		};
		var totalParticleControls = particleControls.length;
		console.log("Total Particle Controls: %s", totalParticleControls);
		var chromatinPath = new THREE.SplineCurve3( particleControls ); // BASIC CURVE
		return chromatinPath;
	}
	
	return ChromatinTube;
}])