(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles(THREETextures) {
		return function(data, colors, settings) {
			var defaults = {
				particles: 0,
				visible: true,
<<<<<<< HEAD
				color: "#ff0000",
				size: 100,
=======
				color: "#fff000",
				size: 200,
>>>>>>> upstream/develop
				opacity: 0.8,
				map: "particle",
				depthtest: true,
				alphatest: 0.5,
				transparent: true
			};
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var particlesGeometry = getGeometry(data);
			//particlesGeometry.center();
			particlesGeometry.computeBoundingSphere();

			var vertexColors = [];
			for( var i = 0; i < particlesGeometry.vertices.length; i++ ) {
				// BASE COLOR
				vertexColors[i] = new THREE.Color("rgb(255,255,255)");
			}
			particlesGeometry.colors = vertexColors;

<<<<<<< HEAD
			var particleMap = null; // render only point
			if (this.map) {
				var loader = new THREE.TextureLoader();
				particleMap = loader.load(this.map);
			}
=======
			// OJO! ¿¿¿IS THREE module CHECKING IF TEXTURE ALREADY LOADED???
			var particleTexture = THREETextures.get(this.map);
>>>>>>> upstream/develop

			var particlesMaterial = new THREE.PointsMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: particleTexture,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

<<<<<<< HEAD
			var particlesCloud = new THREE.Points( particlesGeometry, particlesMaterial );
			// particlesCloud.sortParticles = true;
			particlesCloud.name = "Particles Cloud";
=======
			var particles = new THREE.Points( particlesGeometry, particlesMaterial );
			// particles.sortParticles = true;
			particles.name = "Particles Cloud";
>>>>>>> upstream/develop
			
			return particles;
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