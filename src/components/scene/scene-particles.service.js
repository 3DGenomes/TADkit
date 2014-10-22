(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles() {
		return function( data, overrides ) {		
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
		};
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
		
})();