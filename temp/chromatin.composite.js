// Chromatin Geometry
// 2. FOR EVERY PARTICLE ADD GEOMETRY TO COMPOSITE CHROMATIN GEOMETRY ARRAY

chromatin = chromatin || { };
chromatin.composite = function( particleControls, chromatin, chromatinMaterial ) {
	console.log("- COMPOSITE TUBE");
	var chromatinGeometry = new THREE.Geometry();
	var totalParticleControls = particleControls.length;
	console.log("Total Particle Controls: %s", totalParticleControls);
	for ( i = 0 ; i < totalParticleControls - 1; i++)
	{
		var chromatinPathPart = new THREE.LineCurve3(particleControls[i], particleControls[i+1]);
	    // THREE.TubeGeometry: path, curveSegments, radius, radiusSegments, closedEnds
		var chromatinGeometryPart = new THREE.TubeGeometry(chromatinPathPart, chromatin.curveSegments, chromatin.radius, chromatin.radiusSegments, chromatin.closed);
		chromatinGeometry.merge(chromatinGeometryPart);
	}
	console.log(chromatinGeometry);
	console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
	return chromatinFiber;
}
