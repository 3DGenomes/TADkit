(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneThreetest', tkComponentSceneThreetest);

	function tkComponentSceneThreetest() {
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				type: '=',
				data: '=',
				view: '=',
				overlay: '=',
				state: '='
			},
			link: function(scope, element, attrs) {
				// console.log(scope);

				// THREE.JS TEST
				var container, camera, scene, renderer, geometry, material, network;
				init();
				animate();
				function init() {
					container =  element[0];
					scene = new THREE.Scene();
					camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
					camera.position.z = 500;
					scene.add(camera);
					// var size = scope.size * 20;
					var size = 200;
					geometry = new THREE.BoxGeometry(size, size, size);

					var chromatinColor = "#" + scope.overlay;
					material = new THREE.MeshLambertMaterial({
						color: chromatinColor,
						ambient: chromatinColor,
						emissive: chromatinColor,
						//shading: THREE.FlatShading,
						opacity: 1.0,
						transparent: false,
						wireframe: false
					});
					// material = new THREE.MeshNormalMaterial();
					network = new THREE.Mesh(geometry, material);
					network.name = "testmesh";
					scene.add(network);
					if (window.WebGLRenderingContext)
 						renderer = new THREE.WebGLRenderer({alpha: true});
 					else
						renderer = new THREE.CanvasRenderer({alpha: true});
					renderer.setSize(window.innerWidth, window.innerHeight);
					container.appendChild(renderer.domElement);
					// console.log(scene);

					var chromatinObj = scene.getObjectByName( "testmesh" );
					scope.$watch('overlay', function( newValue, oldValue ) {
						if ( newValue !== oldValue ) {
							var newColor =  new THREE.Color("#" + scope.overlay);
							chromatinObj.material.color = newColor;
							chromatinObj.material.ambient = newColor;
							chromatinObj.material.emissive = newColor;
						}
					});		
				}
				function animate() {
					requestAnimationFrame(animate);
					render();
				}
				function render() {
					network.rotation.x += 0.01;
					network.rotation.y += 0.02;
				renderer.render(scene, camera);
				}
				// END THREE.JS TEST
			}
		};
	}
})();