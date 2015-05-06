(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles() {
		return function(data, settings) {
			var defaults = {
				particles: 0,
				visible: true,
				color: "#ff0000",
				size: 200,
				opacity: 0.8,
				map: "assets/img/sphere-glossy.png",
				depthtest: true,
				alphatest: 0.5,
				transparent: true
			};
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var particlesGeometry = getGeometry(data);
			particlesGeometry.computeBoundingSphere();

			var vertexColors = [];
			for( var i = 0; i < particlesGeometry.vertices.length; i++ ) {
				// BASE COLOR
				vertexColors[i] = new THREE.Color("rgb(255,255,255)");
			}
			particlesGeometry.colors = vertexColors;

			var particleMap = null; // render only point
			if (this.map) particleMap = THREE.ImageUtils.loadTexture(this.map);

			var particlesMaterial = new THREE.PointCloudMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: particleMap,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			var particlesCloud = new THREE.PointCloud( particlesGeometry, particlesMaterial );
			// particlesCloud.sortParticles = true;
			particlesCloud.name = "Particles Cloud";
			
			return particlesCloud;
		};
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Particles Geometry";
		return vertexGeometry;
	}
		
})();