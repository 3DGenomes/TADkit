(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneFloatingtad', tkComponentSceneFloatingtad);

	function tkComponentSceneFloatingtad($rootScope, THREEService, THREEPlugins) {
		return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				THREEService.load().then(function(THREE) {
					THREEPlugins.load(["TrackballControls"]).then(function(THREE) {

						var container, viewsize, camera, scene;
						var geometry, material, network, controls;
						var renderer = THREEService.getRenderer();
						var animation;

						scope.init = function() {
							container =  element[0];
							viewsize = container.clientWidth;

							renderer.setSize( viewsize, viewsize );
							container.appendChild( renderer.domElement );

							scene = new THREE.Scene();

							camera = new THREE.PerspectiveCamera( 50, 1, 150, 650 );
							camera.position.z = 500;
							scene.add(camera);

							geometry = new THREE.TorusKnotGeometry( 100, 30, 100, 16 );

							material = new THREE.MeshDepthMaterial({
								color: 0x666666,
								wireframe: true,
								wireframeLinewidth: 1
							});

							network = new THREE.Mesh( geometry, material );
							network.name = "Floating TAD";
							scene.add(network);
								
							controls = new THREE.TrackballControls( camera, renderer.domElement );
							controls.minDistance = 450;
							controls.maxDistance = 550;

						};

						// -----------------------------------
						// Event listeners
						// -----------------------------------
						$rootScope.$on('$stateChangeStart', function() {
							cancelAnimationFrame( animation );
						});

						// -----------------------------------
						// Draw and Animate
						// -----------------------------------
						scope.animate = function() {
							animation = requestAnimationFrame( scope.animate );
							controls.update();
							scope.render();
						};

						scope.render = function() {
							network.rotation.x += 0.006;
							network.rotation.y += 0.006;
							renderer.render( scene, camera, null, true ); // forceClear == true
						};

						scope.init();
						scope.animate();

					});
				});
			}
		};
	}
})();