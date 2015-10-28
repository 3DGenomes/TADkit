(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneClusters', tkComponentSceneClusters);

	function tkComponentSceneClusters(THREEService, THREEPlugins, Particles, Cluster) {
		return {
			restrict: 'EA',
			scope: { 
				state: '=', /* for scene until can check for DOM loaded */
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				id: '@', /*???*/
				clusters: '=',
				overlay:'=',
				mousemove: '&'
			},
			templateUrl: 'assets/templates/scene-cluster-icon.html',
			link: function postLink( scope, element, attrs ) {
				THREEPlugins.load(["TrackballControls","OrbitControls"]).then(function(THREE) {
					// DOM variables
					var container;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					// THREE variables
					var renderer = THREEService.getRenderer();

					var scenes = [];
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var controls, playback;
					var mouseX = 0, mouseY = 0;

					scope.init = function () {

						// CONTAINER
						/* component-controller == children[0]
						 * - component-header == children[0]
						 * - component-body == children[0]
						 */
						container = element[0].children[0].children[0];

						// width = container.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = 800; //parseInt(scope.state.width);
						// height = container.clientHeight;
						height = 400; //parseInt(scope.state.height);
						// OJO! DOM NOT READY

						// var background = scope.view.settings.background;
						// var clearColor = "0x" + background.substring(1);
						// renderer.setClearColor( clearColor );
						renderer.setSize( width, height );
						container.appendChild( renderer.domElement );

						// CAMERA
						camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( height / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
						camera.position.fromArray(scope.view.viewpoint.camera);
						camera.name = "Scene Camera";
						
						controls = new THREE.TrackballControls(camera, renderer.domElement);

						// dummy scene for clusters.boundingSphere.radius
						var clustersBoundingBox = new THREE.Box3(); // to calculate merged bounds
						var clustersBounds = new THREE.Sphere(); // to calculate merged bounds

						angular.forEach( scope.clusters, function(cluster, index) {

							// SCENE
							scenes[index] = new THREE.Scene();

							// TADkit variables
							var particles, bundle;

							// GEOMETRY: PARTICLES
							particles = new Particles( cluster.data[cluster.centroidIndex], scope.view.settings.particles );
							particles.visible = scope.view.settings.particles.visible;
							scenes[index].add(particles);

							//GEOMETRY: CLUSTER
							bundle = new Cluster( cluster.data, cluster.centroidIndex, scope.overlay, scope.view.settings.cluster );
							bundle.visible = scope.view.settings.cluster.visible;
							bundle.name = bundle.name + " " + index;
							scenes[index].add(bundle);

							// Add to clusters.boundingSphere.radius
							clustersBoundingBox.union(bundle.boundingBox);
							clustersBoundingBox.getBoundingSphere(clustersBounds);
							// console.log(JSON.stringify(clustersBounds));
						});

						// SET CAMERA ORIENTATION
						cameraPosition = clustersBounds.center;
						cameraTarget = clustersBounds.center;
						cameraTranslate = clustersBounds.radius * scope.view.viewpoint.scale;
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
							controls.update();
					};

					// EVENT WHICH TRIGGERS RENDER
					// element.on('mousemove', function(event) {
					// 	mouseX = ( event.clientX - width / 2 );
					// 	// mouseY = ( event.clientX - width / 2 );
					// 	scope.render();
					// });

					// scope.updateCamera = function( camera, scene, mouseX, mouseY ) {

					// 	// *** CHANGE TO CIRCLE CURRENT cameraTarget ****

					// 	camera.position.x += mouseX * 0.5;
					// 	camera.position.x = Math.max( Math.min( camera.position.x, 4000 ), -4000 );
					// 	// camera.position.y += mouseY * 0.5;
					// 	// camera.position.y = Math.max( Math.min( camera.position.y, 4000 ), -4000 );

					// 	camera.lookAt( scene.position );
					// };


					// *** TEMPORARY FIX FOR SPRITE LOADING
					// *** Change to THREE.ImageLoader with THREE.LoadingManager
					var timer = 0;
					var animframe;
					scope.animate = function () {
						if (timer >= 0 && timer < 1) {
							animframe = requestAnimationFrame( scope.animate );
							controls.update();
							scope.render();
							timer++;
							// console.log("AnimationFrame requested");
						} else {
							cancelAnimationFrame( animframe );
							// console.log("AnimationFrame canceled");
						}
					};

					scope.render = function () {

						var views = [
							{
								left: 0,
								bottom: 0,
								width: 0.5,
								height: 1.0,
								background: new THREE.Color().setRGB( 1.0, 1.0, 1.0 )
							},
							{
								left: 0.5,
								bottom: 0,
								width: 0.5,
								height: 1.0,
								background: new THREE.Color().setRGB( 1.0, 1.0, 1.0 )
							}
						];
						var viewportMargin = 60;

						angular.forEach( scope.clusters, function(cluster, index) {

							if ( index === 0 ) {
								renderer.clear();
							}
							// renderer.setViewport(cluster.viewportX, cluster.viewportY, viewportWidth, viewportHeight););

							var view = views[index];
							var scene = scenes[index];
							
							// scope.updateCamera( camera, scene, mouseX, mouseY );
							controls.update();

							var viewportLeft   = Math.floor( (width  * view.left) + viewportMargin);
							var viewportBottom = Math.floor( (height * view.bottom) + viewportMargin);
							var viewportWidth  = Math.floor( (width  * view.width) - (viewportMargin * 2) );
							var viewportHeight = Math.floor( (height * view.height) - (viewportMargin * 2) );

							renderer.setViewport( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.setScissor( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.enableScissorTest ( true );
							renderer.setClearColor( view.background ); // COMMENT IF NOT IN TEST MODE
							renderer.render( scene, camera, null, true ); // forceClear == true
						});
					};

					// Begin
					scope.init();
					// scope.render();
					// *** TEMP FIX for sprite load - see above lines 137-152
					// *** ie. should render clusters directly without animation
					scope.animate();
				});
			}
		};
	}
})();
