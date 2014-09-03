// Chromatin Geometry
// 8. ALL GEOMETRY AS LOD HIERARCHY

chromatin = chromatin || { };
chromatin.lod = function( TADbitGeometry, chromatinPath, chromatin, chromatinMaterial, cameraTranslate ) {
	console.log("- LOD HIERARCHY");
	var totalParticles = TADbitGeometry.vertices.length; // redundant but same as C++ version
	console.log("Total Particles: %2", totalParticles);
	
	var particleSegments = 10; // == 1000BP/segment || 
	// 2 m DNA length == 2,000 mm == 2,000,000 µm == 2,000,000,000 nm @ 2,300,000,000 BP
	// 2 m / 6 Chromatin length == 333,333 µm = 333,333,333 nm
	// sample = 1,000,000 = 0.000435 of total BP => 144,928 nm length
	// (note: measured in model as: Chromatin Length: 9363 units/nm )
	// total fragments = 1020 => fragment length = 142 nm => 980 BP
	// Linear groupings/blocks in chromatin???
	// 	ie what is min limit for fragment length?
	
	 // FRAGMENTS (ie total segements) nb. UNUSED
	var totalTADFragments = totalParticles * particleSegments;
	console.log("Total Fragments: %s", totalTADFragments);
	
	var chromatinCurveSegments1 = totalTADFragments;
	var chromatinRadiusSegments1 = chromatin.radiusSegments;
	var chromatinGeometry1 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments1, chromatin.radius, chromatinRadiusSegments, chromatin.closed);
	var chromatinCurveSegments2 = totalTADFragments/2;
	var chromatinRadiusSegments2 = chromatin.radiusSegments/2;
	var chromatinGeometry2 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments2, chromatin.radius, chromatinRadiusSegments2, chromatin.closed);
	var chromatinCurveSegments3 = totalTADFragments/4;
	var chromatinRadiusSegments3 = chromatin.radiusSegments/4;
	var chromatinGeometry3 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments3, chromatin.radius, chromatinRadiusSegments3, chromatin.closed);
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
	return chromatinFiber;
}