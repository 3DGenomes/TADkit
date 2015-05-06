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
			// var positions = new Float32Array( positions.length * 3 );
			// var colors = new Float32Array( positions.length * 3 );
			var geometry = new THREE.BufferGeometry();

			geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
			geometry.addAttribute( 'color', new THREE.BufferAttribute( distances, 3 ) );

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