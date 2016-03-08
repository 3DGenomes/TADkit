(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Cluster', Cluster);

	// constructor for cluster models ensemble
	function Cluster($log, Color) {
		return function(VERBOSE, data, centroidIndex, overlay, settings) {
			if (VERBOSE) $log.debug(overlay);

			var defaults = {
				visible: true,
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Convert Data (single Model / set of Particles) to Vector triplets
			var clusterBufferGeometry = new THREE.BufferGeometry(); // to calculate merged bounds
			var overlayColors = Color.THREEColorsFromHex(overlay);

			// Generate Cluster model
			var clusterEnsemble = new THREE.Object3D(); // unmerged network
			for ( var i = 0 ; i < data.length; i++) {
				var modelComponents = data[i];
				clusterBufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( modelComponents, 3 ) );
				var modelGeometry = getModelGeometry(modelComponents);
					modelGeometry.colors = overlayColors;

				var modelColor = overlay[i];
				var modelMaterial = new THREE.LineBasicMaterial({
					color: new THREE.Color(this.color),
					opacity: this.modelOpacity,
					transparent: this.transparent,
					linewidth: this.linewidth,
					fog: this.fog
				});
				var centroidMaterial = new THREE.LineBasicMaterial({
					opacity: this.centroidOpacity, 
					transparent: this.transparent,
					linewidth: this.linewidth,
					vertexColors: THREE.VertexColors,
					fog: this.fog
				});
				if (i == centroidIndex) {
					modelMaterial = centroidMaterial;
				}
				var model = new THREE.Line(modelGeometry, modelMaterial);
				model.name = "model-"+ i;
				clusterEnsemble.add(model);
			}
			clusterBufferGeometry.computeBoundingBox();
			// clusterBufferGeometry.computeBoundingSphere();
			clusterEnsemble.boundingBox = clusterBufferGeometry.boundingBox;
			// clusterEnsemble.boundingSphere = clusterBufferGeometry.boundingSphere;
			clusterEnsemble.BufferGeometry = clusterBufferGeometry;
			clusterEnsemble.name = "Cluster Ensemble";
			return clusterEnsemble;
		};
	}
	
	function getModelGeometry(components) {
		var offset = 0, vertex,
			 modelGeometry = new THREE.Geometry();

		var totalVertices = components.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = components[ offset ++ ];
			vertex.y = components[ offset ++ ];
			vertex.z = components[ offset ++ ];
			modelGeometry.vertices.push( vertex );
		}
		return modelGeometry;
	}

})();