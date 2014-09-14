// Chromatin Geometry
// FOR EVERY BEZIER ADD CIRCLE GEOMETRY LINE TO CHROMATIN FIBER OBJECT

'use strict';

TADkit.factory('Chromatin', [ function () {
	// constructor for chromatin model instances
	function Chromatin( data, colors, overrides) {
		// console.log("colors in cly");
		// console.log(colors.length);
		
		var defaults = {
			chromatinVisibility: true,
			particles: 0,
			particleSegments: 5,
			curveSegments: 1,
			radius: 15,
			radiusSegments: 16,
			endcap: false,
			pathClosed: false
		};		
		overrides = overrides || { };
		angular.extend(this, angular.copy(defaults), overrides);
		
		var TADGeometry = getTADGeometry( data );
		var pathControls = getPathControls( TADGeometry.vertices );
		if (this.particles == 0) this.particles = pathControls.length - 1;
		
		var pathSegments = this.particles * this.particleSegments;
		this.pathSegments = pathSegments;
		// Calculate PathSegments based on number of base pairs in the TAD ?
		var pathCoords = getSplinePath (pathControls, pathSegments);
		
		var chromatinFiber = new THREE.Object3D(); // unmerged mesh
		var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
		var fragmentColors = getFragmentColors(pathSegments);

		for ( var i = 0 ; i < pathSegments - 1; i++) {
			this.endcap = ( i == 0 || i == pathSegments - 2 ) ? false : true ;
			
			var fragmentColor = colors[i];
			var fragmentMaterial = new THREE.MeshLambertMaterial({
				color: fragmentColor,
				ambient: fragmentColor,
				emissive: fragmentColor,
				vertexColors: THREE.VertexColors,
				//shading: THREE.FlatShading,
				opacity: 1.0,
				transparent: false,
				wireframe: false
			});
			var fragment = fragmentGeometry(pathCoords[i], pathCoords[i+1], this );
			chromatinGeometry.merge(fragment);

			var chromatinFragment = new THREE.Mesh( fragment, fragmentMaterial);
			chromatinFragment.name = "fragment-"+i;
			chromatinFiber.add(chromatinFragment);
		}
		chromatinGeometry.computeBoundingSphere();
		chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
		chromatinFiber.name = "Chromatin Fiber";
		chromatinFiber.visible = this.chromatinVisibility;
		
		this.fiber = chromatinFiber;
		this.center = chromatinGeometry.boundingSphere.center;
		this.bounds = chromatinGeometry.boundingSphere.radius;
		// console.log("Chomatin Object");
		// console.log(this);
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
		return pathControls;
	}
	
	function getSplinePath (controls,segments) {
		var splinePath = new THREE.SplineCurve3(controls);
		var splineDivisions = splinePath.getSpacedPoints(segments);
		return splineDivisions;
	}
	
	function fragmentGeometry ( pointX, pointY, props ) {
	    /* edge from X to Y */
	    var fragmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
	    var fragmentOrientation = new THREE.Matrix4();
	    /* THREE.Object3D().up (=Y) default orientation for all objects */
	    fragmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
	    /* rotation around axis X by -90 degrees
	     * matches the default orientation Y
	     * with the orientation of looking Z */
	    fragmentOrientation.multiply(new THREE.Matrix4( 1, 0, 0, 0,
	                            						0, 0, 1, 0,
	                             						0,-1, 0, 0,
                         													0, 0, 0, 1 ));
		fragmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		var chromatinOpenEnded;
		var chromatinOpenEnded = props.endcap;
	    var fragmentGeometry = new THREE.CylinderGeometry( props.radius, props.radius, fragmentDirection.length(), props.radiusSegments, props.curveSegments, chromatinOpenEnded);
	    fragmentGeometry.applyMatrix(fragmentOrientation);
		
		return fragmentGeometry;
	};
	
	function getFragmentColors (segments) {
		// based on length 
		// build array
		// by checking all genes at each stage
		
		
		
		
	};
	
	return Chromatin;
}])