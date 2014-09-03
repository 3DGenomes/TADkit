// CHROMATIN GEOMETRY
console.log("CHROMATIN GEOMETRY");

	// 1. ALL GEOMETRY IN SINGLE OBJECT
	console.log("- SINGLE TUBE");
	chromatinCurveSegments = totalTADFragments;
	// TubeGeometry paramters: path, segments, radius, radialSegments, closed
	var chromatinGeometry = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	console.log(chromatinGeometry);
	chromatinGeometry.name = "Chromatin Tube";
	chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);


	// 2. FOR EVERY PARTICLE ADD GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	console.log("- COMPOSITE TUBE");
	var chromatinGeometry = new THREE.Geometry();
	for ( i = 0 ; i < totalParticleControls - 1; i++)
	{
		var chromatinPathPart = new THREE.LineCurve3(particleControls[i], particleControls[i+1]);
	    // THREE.TubeGeometry: path, curveSegments, radius, radiusSegments, closedEnds
		var chromatinGeometryPart = new THREE.TubeGeometry(chromatinPathPart, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
		chromatinGeometry.merge(chromatinGeometryPart);
	}
	console.log(chromatinGeometry);
	console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);


	// 3. FOR EVERY BEZIER ADD TUBE GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	console.log("- BEZIER TUBE GEOMETRY");
	var chromatinGeometry = new THREE.Geometry();
	for ( i = 0 ; i < totalBezierCoords - 1; i++)
	{
		var chromatinPathPart = new THREE.LineCurve3(bezierCoords[i], bezierCoords[i+1]);
	    // THREE.TubeGeometry: path, curveSegments, radius, radiusSegments, closedEnds
		var chromatinGeometryPart = new THREE.TubeGeometry(chromatinPathPart, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
		chromatinGeometry.merge(chromatinGeometryPart);
	}
	console.log(chromatinGeometry);
	console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);


	// 4. FOR EVERY BEZIER ADD CYLINDER GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	console.log("- BEZIER CYLINDER");
	var chromatinGeometry = new THREE.Geometry();
	for ( i = 0 ; i < totalBezierCoords - 1; i++)
	{
		var chromatinGeometryPart = function( pointX, pointY )
		    {
			    /* edge from X to Y */
			    var direction = new THREE.Vector3().subVectors( pointY, pointX );
			    var orientation = new THREE.Matrix4();
			    /* THREE.Object3D().up (=Y) default orientation for all objects */
			    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
			    /* rotation around axis X by -90 degrees
			     * matches the default orientation Y
			     * with the orientation of looking Z */
			    orientation.multiply(new THREE.Matrix4( 1, 0, 0, 0,
			                                            0, 0, 1, 0,
			                                            0,-1, 0, 0,
			                                            0, 0, 0, 1 ));
				orientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
			    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
			    var edgeGeometry = new THREE.CylinderGeometry( chromatinRadius, chromatinRadius, direction.length(), chromatinRadiusSegments, chromatinCurveSegments, chromatinOpenEnded);
			    edgeGeometry.applyMatrix(orientation);
			    // ¿¿¿ edgeGeometry.position = new THREE.Vector3().addVectors( pointX, direction.multiplyScalar(0.5) );
			    return edgeGeometry;
		    };
		chromatinGeometry.merge(chromatinGeometryPart(bezierCoords[i], bezierCoords[i+1]));
	}
	console.log(chromatinGeometry);
	console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);


	// 5. FOR EVERY BEZIER ADD CYLINDER GEOMETRY MESH TO CHROMATIN FIBER OBJECT
	console.log("- BEZIER MESH");
	var chromatinGeometry = new THREE.Geometry();
	var randomRadius = getYValues(randomWalk(totalBezierCoords));
	var chromatinFiber = new THREE.Object3D();
	for ( i = 0 ; i < totalBezierCoords - 1; i++)
	{
		var fragColor = new THREE.Color().setHSL( TADBiotypeValues[i], 0.5, 0.25  ) ;
	    fragmentMaterial = new THREE.LineBasicMaterial( {
			color: fragColor,
			opacity: 1.0,
			transparent: true,
			linewidth: 2
		} );
		chromatinMaterial = new THREE.MeshLambertMaterial({
			color: fragColor,
			ambient: fragColor,
			emissive: fragColor,
			//shading: THREE.FlatShading,
			opacity: 1.0,
			transparent: false,
			wireframe: false
		});
		var fragmentGeometry = function( pointX, pointY )
		    {
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
			    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
				chromatinOpenEnded = ( i == 0 || i == totalBezierCoords - 2 ) ? false : true ;
			    var fragmentCylinder = new THREE.CylinderGeometry( chromatinRadius, chromatinRadius, fragmentDirection.length(), chromatinRadiusSegments,chromatinCurveSegments, chromatinOpenEnded);
			    fragmentCylinder.applyMatrix(fragmentOrientation);
			    return fragmentCylinder;
		    };
		var chromatinFragment = new THREE.Mesh( fragmentGeometry(bezierCoords[i], bezierCoords[i+1]), chromatinMaterial)
		chromatinFiber.add( chromatinFragment );
	}


	// 6. FOR EVERY BEZIER ADD CIRCLE GEOMETRY LINE TO CHROMATIN FIBER OBJECT
	console.log("- BEZIER LINE");
	var chromatinGeometry = new THREE.Geometry();
	var chromatinFiber = new THREE.Object3D();
	for ( i = 0 ; i < totalBezierCoords - 1; i++)
	{
		var fragColor = new THREE.Color( TADBiotypeValues[i], 0.8, 0.66 );
	    fragmentMaterial = new THREE.LineBasicMaterial( {
			color: fragColor,
			opacity: 1.0,
			transparent: true,
			linewidth: 2
		} );
		var fragmentGeometry = function( pointX, pointY )
		    {
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
		var chromatinFragment = new THREE.Line( fragmentGeometry(bezierCoords[i], bezierCoords[i+1]), fragmentMaterial );
		chromatinFiber.add( chromatinFragment );
	}


	// 7. ALL GEOMETRY AS POINT CLOUD
	console.log("- POINT CLOUD");
	chromatinCurveSegments = 1000; // adjustable
	chromatinRadiusSegments = 147; // == aprox. number of base pairs on nucleosome ie each ring
	// TubeGeometry paramters: path, segments, radius, radialSegments, closed
	// see above SCALE definition: chromatinRadius = 3;
	var chromatinGeometry = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	console.log(chromatinGeometry);
	chromatinGeometry.name = "Chromatin Tube";
	chromatinFiber = new THREE.Object3D();
	chromatinPointCloud = new THREE.PointCloud(chromatinGeometry, chromatinPointCloudMaterial);
	chromatinFiber.add( chromatinPointCloud );


	// 8. ALL GEOMETRY AS LOD HIERARCHY
	console.log("- LOD HIERARCHY");
	var chromatinCurveSegments1 = totalTADFragments;
	var chromatinRadiusSegments1 = chromatinRadiusSegments;
	var chromatinGeometry1 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments1, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	var chromatinCurveSegments2 = totalTADFragments/2;
	var chromatinRadiusSegments2 = chromatinRadiusSegments/2;
	var chromatinGeometry2 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments2, chromatinRadius, chromatinRadiusSegments2, chromatinClosed);
	var chromatinCurveSegments3 = totalTADFragments/4;
	var chromatinRadiusSegments3 = chromatinRadiusSegments/4;
	var chromatinGeometry3 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments3, chromatinRadius, chromatinRadiusSegments3, chromatinClosed);
	chromatinFiber = new THREE.LOD();
	// var mat1 = new THREE.MeshLambertMaterial({ color: "#00ff00" });
	lod1 =  new THREE.Mesh(chromatinGeometry1, chromatinMaterial );
	// var mat2 = new THREE.MeshLambertMaterial({ color: "#ff0000" });
	lod2 =  new THREE.Mesh(chromatinGeometry2, chromatinMaterial );
	// var mat3 = new THREE.MeshLambertMaterial({ color: "#0000ff" });
	lod3 =  new THREE.Mesh(chromatinGeometry3, chromatinMaterial );
	chromatinFiber.addLevel( lod1,  9 * cameraTranslate ); // distance = 15824 nm
	chromatinFiber.addLevel( lod2, 11 * cameraTranslate ); // distance = 18988 nm
	chromatinFiber.addLevel( lod3, 13 * cameraTranslate ); // distance = 22153 nm
	chromatinFiber.name = "Chromatin Fiber";
	chromatinFiber.updateMatrix();
	chromatinFiber.matrixAutoUpdate = false;

