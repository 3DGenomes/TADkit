// Chromatin Geometry
// 1. ALL GEOMETRY IN SINGLE OBJECT

'use strict';

APP.factory('ChromatinFiber', [ function () {
	// constructor for chromatin model instances
	function ChromatinFiber( data, colors, overrides) {
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
		var pathControls = getPathControls( TADGeometry.vertices );
		var bezierCoords = getBezierCoords( pathControls );
		var totalBezierCoords = bezierCoords.length;
		
		var chromatinFiber = new THREE.Object3D();
		for ( var i = 0 ; i < totalBezierCoords - 1; i++) {
			var fragColor = new THREE.Color( colors[i], 0.8, 0.66 );
		    fragmentMaterial = new THREE.LineBasicMaterial( {
				color: fragColor,
				opacity: 1.0,
				transparent: true,
				linewidth: 2
			} );
			var chromatinFragment = new THREE.Line( fragmentGeometry(bezierCoords[i], bezierCoords[i+1]), fragmentMaterial );
			chromatinFiber.add( chromatinFragment );
		}
		// chromatinFiber.computeBoundingSphere(); // ???
		this.fiber = chromatinFiber;
		// this.center = getCenter( this.fiber.geometry.vertices ); // ???
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
	
	function getPathControls( vertices ) {
		// PATH CONTROLS
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
			if (i == 0) { // insert backprojected first coord
				var preCoord = new THREE.Vector3(0,0,0);
				preCoord.copy(baseParticle).sub(midOffset);
				pathControls.push(preCoord);
			};
			//pathControls.push(baseParticle);
			pathControls.push(midCoord);
			if (i == totalParticles - 2) {
			//	pathControls.push(foreParticle);
				var endCoord = new THREE.Vector3(0,0,0);
				endCoord.copy(foreParticle).add(midOffset);
				pathControls.push(endCoord);
			};
		};
		console.log("Total Path Controls: %s", pathControls.length);
		return pathControls;
	}
	
	function fragmentGeometry ( pointX, pointY ) {
	    /* edge from X to Y */
	    var fragmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
	    var fragmentOrientation = new THREE.Matrix4();
	    /* THREE.Object3D().up (=Y) default orientation for all objects */
	    fragmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
		fragmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		chromatinOpenEnded = ( i == 0 || i == totalBezierCoords - 2 ) ? false : true ;
		var fragmentCircle = new THREE.CircleGeometry( chromatinRadius, chromatinRadiusSegments );
		// Remove center vertex
		fragmentCircle.vertices.shift();
	    fragmentCircle.applyMatrix(fragmentOrientation);
	    return fragmentCircle;
	};
	
	return ChromatinTube;
}])