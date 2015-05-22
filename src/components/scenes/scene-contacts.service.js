(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Contacts', Contacts);

	// constructor for cluster models ensemble
	function Contacts() {
		return function(positions, distances, settings) {

			var defaults = {
				transparent: true,
				visible: false
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var contacts;
			// Distances stored as one per contact-position-pair
			// so the array needs an RGB (*3) for each pair (*2)
			// ie. each distance needs to be replicated 6 times.
			var colors = new Float32Array( distances.length * 6 );
			for (var i = distances.length - 1; i >= 0; i--) {
				for (var j = 0; j < 6; j++) {
					var pos = (i*6)+j;
					colors[pos] = distances[i];
				};
			};

			var geometry = new THREE.BufferGeometry();

			geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
			geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

			geometry.computeBoundingSphere();

			var material = new THREE.LineBasicMaterial( {
				vertexColors: THREE.VertexColors,
				blending: THREE.AdditiveBlending,
				transparent: this.transparent
			} );
			
			contacts = new THREE.Line(geometry, material, THREE.LinePieces); // THREE.LinePieces = separate lines

			contacts.name = "Contacts";
			return contacts;
		};
	}
})();