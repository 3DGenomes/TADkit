// Chromatin Geometry
// 6. FOR EVERY BEZIER ADD CIRCLE GEOMETRY LINE TO CHROMATIN FIBER OBJECT

'use strict';

APP.factory('ChromatinTubes', [ function () {
	// constructor for chromatin model instances
	function ChromatinTubes( data, tubeMaterial, overrides) {
		var defaults = {
			particleSegments: 10,
			curveSegments: 1,
			radius: 15,
			radiusSegments: 16,
			pathClosed: false
		};		
		overrides = overrides || { };
		angular.extend(this, angular.copy(defaults), overrides);
		
		var TADGeometry = getTADGeometry( data );
		var pathControls = getPathControls( TADGeometry.vertices );
		var bezierCoords = getBezierCoords( pathControls, this.particleSegments );
		var totalBezierCoords = bezierCoords.length;
		
		var chromatinFiber = new THREE.Object3D(); // unmerged mesh
		var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
		for ( var i = 0 ; i < totalBezierCoords - 1; i++) {
			
			// var fragColor = new THREE.Color( 230, 0.8, 0.66 );
			// var fragmentMaterial = new THREE.LineBasicMaterial( {
			// 	color: fragColor,
			// 	opacity: 1.0,
			// 	transparent: true,
			// 	linewidth: 2
			// } );
			var fragment = fragmentGeometry(bezierCoords[i], bezierCoords[i+1], this );
			chromatinGeometry.merge(fragment);

			var chromatinFragment = new THREE.Mesh( fragment, tubeMaterial);
			chromatinFiber.add(chromatinFragment);
		}
		chromatinGeometry.computeBoundingSphere();
		chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
		chromatinFiber.name = "chromatinFiber";
		
		this.fiber = chromatinFiber;
		console.log(chromatinFiber);
		this.center = chromatinGeometry.boundingSphere.center;
		this.bounds = chromatinGeometry.boundingSphere.radius;
		console.log(this);
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
		console.log("Centroid: %s", JSON.stringify(centroid));
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
	
	function getBezierCoords( controls, segments) {
		// CALCULATE BEZIER COORDS => CONVERT TO FUNCTION OR USE INBUILT THREE FUNCTION
		// Segments per Base Pair, multiple of BP, or arbitary division.
		// i=+2 because (pre) base=i, (mid=i+1), fore=i+2, (end)
		// range == eg. 1 MBP (ie. 1,000,000 BP) / TADbitGeometry (eg. 100) = BP per particle (eg. 10000) === RESOLUTION (see sample metadata)
		// particleSegments > 1 then check resolution of any 2D/additional data overlayed
		// USED ON OWN BEZIER - redundant when using user imput
		console.log("BEZIER COORDS");
		
		var totalControls = controls.length;
		var bezierCoords = [];
		for ( var i = 0 ; i < totalControls - 1; i+=2)
		{
			var bezierCurve = new THREE.QuadraticBezierCurve3(controls[i], controls[i+1], controls[i+2]);
			for ( var j = 0 ; j < segments; j++)
			{
				var t = j / segments;
				var bezierPoint = bezierCurve.getPoint(t);
				bezierCoords.push(bezierPoint);
			}
		}
		bezierCoords.push(controls[totalControls - 1]);
		console.log(bezierCoords);
		var totalBezierCoords = bezierCoords.length;
		console.log("Total Bezier Coords: %s", totalBezierCoords);

		return bezierCoords;
	}

	function fragmentGeometry ( pointX, pointY, props ) {
		var path = new THREE.LineCurve3(pointX, pointY);
		var pathClosed = false;
		var fragmentGeometry = new THREE.TubeGeometry( path, props.curveSegments, props.radius, props.radiusSegments, pathClosed );
		
		return fragmentGeometry;
	};
	
	return ChromatinTubes;
}])