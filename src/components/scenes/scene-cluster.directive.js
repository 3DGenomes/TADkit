(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneCluster', tkComponentSceneCluster);

	function tkComponentSceneCluster($window, THREEService, THREEPlugins, Particles, Cluster) {
		return {
			restrict: 'EA',
			scope: { 
				state: '=', /* for scene until can check for DOM loaded */
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				id: '@', /*???*/
				cluster: '=',
				overlay:'='
			},
			templateUrl: 'assets/templates/scene-cluster-icon.html',
			link: function postLink( scope, element, attrs ) {
				THREEPlugins.load(["TrackballControls","OrbitControls"]).then(function(THREE) {
					// DOM variables
					var container;
					var width, height;

					// THREE variables
					var renderer = THREEService.getRenderer();
					// var scene; // Use $window["scene" + scope.cluster.number]
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var controls, playback;

					// TADkit variables
					var particles, cluster;

					scope.init = function () {

						// CONTAINER
						/* component-controller == children[0]
						 * - component-header == children[0]
						 * - component-body == children[0]
						 */
						container = element[0].children[0].children[0];
						// element.id prefix length = "datasets-scene-icon-" = 20 characters
						var elementNumber = element[0].id.substring(20,element[0].id.length);
						console.log(elementNumber);
						console.log(scope.cluster.number);
						// width = container.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width);
						// height = container.clientHeight;
						height = parseInt(scope.state.height);
						// OJO! DOM NOT READY
						// console.log(element[0].firstChild.children[2].clientWidth);

						// var background = scope.view.settings.background;
						// var clearColor = "0x" + background.substring(1);
						// renderer.setClearColor( clearColor );
						renderer.setSize( width, height );
						if (scope.cluster.number == 1) {
							container.appendChild( renderer.domElement );
						}

						// SCENE
						$window["scene" + scope.cluster.number] = new THREE.Scene();

						// CAMERA
						camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( width / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
						camera.position.fromArray(scope.view.viewpoint.camera);
						camera.name = "Scene Camera";
						
						// CONTROLS
						// Use TrackballControls for interaction
						controls = new THREE.TrackballControls(camera, renderer.domElement);
						controls.enableZoom = false;
						controls.enableRotate = false;
						controls.enablePan = false;
						// Use OrbitControls for autoRotate
						playback = new THREE.OrbitControls(camera, renderer.domElement);
						playback.autoRotate = scope.view.controls.autoRotate;
						playback.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
						// interaction FALSE so as not to conflict with controls
						playback.enableZoom = false;
						playback.enableRotate = false;
						playback.enablePan = false;
						playback.enableKeys = false;
						
						// GEOMETRY: PARTICLES
						particles = new Particles( scope.cluster.data[scope.cluster.centroidIndex], scope.view.settings.particles );
						particles.visible = scope.view.settings.particles.visible;
						$window["scene" + scope.cluster.number].add(particles);

						//GEOMETRY: CLUSTER
						cluster = new Cluster( scope.cluster.data, scope.cluster.centroidIndex, scope.overlay, scope.view.settings.cluster );
						cluster.visible = scope.view.settings.cluster.visible;
						cluster.name = cluster.name + " " + scope.id.match(/\d+/)[0];
						$window["scene" + scope.cluster.number].add(cluster);

						// SET CAMERA ORIENTATION
						cameraPosition = new THREE.Vector3(); //cluster.boundingSphere.center;
						cameraTarget = new THREE.Vector3( 0,0,0 ); //cluster.boundingSphere.center;
						cameraTranslate = cluster.boundingSphere.radius * scope.view.viewpoint.scale;
						scope.lookAtTarget(cameraPosition, cameraTarget, cameraTranslate);

					};

					scope.lookAtTarget = function (position, target, translate) {
							position = position || new THREE.Vector3( 50000, 50000, 50000 );
							var origin = new THREE.Vector3(0,0,0);
							target = target || origin;
							translate = translate || 500;
							// Target on Origin and Translate back
							// (creates consistent view orientation)
							camera.position.set(position.x, position.y, position.z);
							camera.lookAt(origin);
							camera.translateZ(translate);
							// Retarget on target
							camera.lookAt(target);
							camera.updateMatrixWorld();
							// Controls target
							controls.target.copy(position);
					};

					// -----------------------------------
					// Draw and Animate
					// -----------------------------------
					scope.animate = function () {
						requestAnimationFrame( scope.animate );
						playback.update();
						controls.update();
						scope.render();
					};

					scope.render = function () {
						if (scope.cluster.number == 1) {
							renderer.clear();
						}
						renderer.render( $window["scene" + scope.cluster.number], camera );
					};

					// Begin
					scope.init();
					scope.animate();
				});
			}
		};
	}
})();
