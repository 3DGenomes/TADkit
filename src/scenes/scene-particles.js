// Particles Geometry
// FOR EVERY BEZIER ADD CIRCLE GEOMETRY LINE TO CHROMATIN FIBER OBJECT

'use strict';

TADkit.factory('Particles', [ function () {
	// constructor for chromatin model instances
	function Particles( data, overrides ) {
		
		var defaults = {
			particles: 0,
			particlesVisibility: false,
			particleColor: "#ffffff",
			particleSize: 350,
			particleOpacity: 0.8
		};		
		overrides = overrides || { };
		angular.extend(this, angular.copy(defaults), overrides);

		var particlesMaterial = new THREE.PointCloudMaterial({
			color: this.particleColor,
			size: this.particleSize,
			opacity: this.particleOpacity,
			map: THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png"),
			transparent: true
		});
		// console.log(this.particleSize);
		var particlesGeometry = getGeometry( data );
		
		var particlesCloud = new THREE.PointCloud( particlesGeometry, particlesMaterial );
		particlesCloud.sortParticles = true;
		particlesCloud.name = "Particles Cloud";
		particlesCloud.visible = this.particlesVisibility;
		
		this.cloud = particlesCloud;
		this.center = particlesCloud.center;
		this.bounds = particlesCloud.bounds;
		// console.log("Particles Cloud");
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
	
	function getGeometry( data ) {
		var offset = 0, vertex,
			 particleGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			particleGeometry.vertices.push( vertex );
		}
		return particleGeometry;
	}
		
	return Particles;
}])