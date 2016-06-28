(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneClusters', tkComponentSceneClusters);

	function tkComponentSceneClusters(VERBOSE, $log, THREEService, THREEPlugins, Particles, Cluster) {
		return {
			restrict: 'EA',
			scope: { 
				title: '@',
				view: '=',
				clusters: '=',
				layer:'=',
				mousemove: '&'
			},
			templateUrl: 'assets/templates/scene-clusters.html',
			link: function postLink( scope, element, attrs ) {
				if (VERBOSE) $log.debug(scope);

				/*
				 * NOTE: this directive generates all clusters
				 *       (rather than a single scene for each)
				 *       for efficient use of THREEjs renderer 
				 */
				THREEPlugins.load(["TrackballControls","OrbitControls"]).then(function(THREE) {
					// DOM variables
					var container, elementParent;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					// THREE variables
					var renderer = THREEService.getRenderer();

					var scenes = [];
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var controls, playback;
					var mouseX = 0, mouseY = 0;
					var colCount, tileGutter;
					var viewportUnit, viewportLeft, viewportBottom, viewportWidth, viewportHeight;

					scope.init = function () {

						// CONTAINER
						/* component-controller == element[0].children[0]
						 * - component-header == element[0].children[0].children[0]
						 * - component-body == element[0].children[0].children[3]
						 * - component-body-list == element[0].children[0].children[3].children[0]
						 */
						container = element[0].children[0].children[3].children[0];
						// PARENT #main-content from main.html
						elementParent = element.parent().parent()[0];
						var elementPadding = parseInt(window.getComputedStyle(elementParent, null).getPropertyValue('padding'));

 						// clientWidth and clientHeight ie. no margins nor padding
						width = elementParent.clientWidth - (elementPadding * 2);
						height = elementParent.clientHeight - (elementPadding * 2);

						// var background = scope.view.settings.background;
						// var clearColor = "0x" + background.substring(1);
						// renderer.setClearColor( clearColor );
						renderer.setSize( width, height );
						container.appendChild( renderer.domElement );

						// Values from JSON
						var rowHeight = scope.view.settings.rowHeight;
						var rowSplit = rowHeight.split(':');
						var rowRatio = parseInt(rowSplit[0], 10) / parseInt(rowSplit[1], 10);
						tileGutter = parseInt(scope.view.settings.gutter); // to remove px
						colCount = scope.view.settings.cols;

						// *** Derived from Angular Material grid-list.js lines 221-267 ***
						// Fraction of the gutter size that each column takes up.
						var hGutterShare = (colCount - 1) / colCount;
						// Percent of the available horizontal space that one column takes up.
						var hShare = 1 / colCount;
						var sharedGutter = tileGutter * hGutterShare;
						viewportUnit = (width * hShare) - sharedGutter; // ie. previous column's right edge
						viewportWidth = viewportUnit;
						viewportHeight = viewportWidth * rowRatio;

						// CAMERA
						camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, rowRatio, scope.view.viewpoint.near, scope.view.viewpoint.far );
						camera.position.fromArray(scope.view.viewpoint.camera);
						camera.name = "Scene Camera";
						
						controls = new THREE.TrackballControls(camera, renderer.domElement);

						angular.forEach( scope.clusters, function(cluster, index) {

							// SCENE
							scenes[index] = new THREE.Scene();

							// TADkit variables
							var particles, bundle;

							// GEOMETRY: PARTICLES
							particles = new Particles( cluster.data[cluster.centroidIndex], scope.layer, scope.view.settings.particles );
							particles.visible = scope.view.settings.particles.visible;
							scenes[index].add(particles);

							//GEOMETRY: CLUSTER
							bundle = new Cluster( cluster.data, cluster.centroidIndex, scope.layer, scope.view.settings.cluster );
							bundle.visible = scope.view.settings.cluster.visible;
							bundle.name = bundle.name + " " + index;
							scenes[index].add(bundle);

						});

						// SET CAMERA ORIENTATION
						cameraPosition = scope.view.viewpoint.camera;
						cameraTarget = scope.view.viewpoint.target;
						cameraTranslate = scope.view.viewpoint.translate;

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
							$log.debug("AnimationFrame requested");
						} else {
							cancelAnimationFrame( animframe );
							$log.debug("AnimationFrame canceled");
						}
					};

					scope.render = function () {					
						var colIndex = 1;
						var rowIndex = 1;
						var span = 1;
						angular.forEach( scope.clusters, function(cluster, index) {

							if ( index === 0 ) renderer.clear();

							var scene = scenes[index];
							// scope.updateCamera( camera, scene, mouseX, mouseY );
							controls.update();

							var viewportLeft = (viewportUnit + tileGutter) * (colIndex - 1);
							var viewportBottom = height - (viewportUnit * rowIndex);

							renderer.setViewport( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.setScissor( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.setScissorTest ( true );
							renderer.setClearColor( "#ffffff" );
							renderer.render( scene, camera, null, true ); // forceClear == true

							if ( colIndex === colCount ) {
								colIndex = 1;
								rowIndex++;
							} else {
								colIndex++;
							}
						});
						$log.debug(camera);
					};

					// Begin
       				 angular.element(document).ready(function() {
						scope.init();
						// scope.render();
						// *** TEMP FIX for sprite load - see above lines 137-152
						// *** ie. should render clusters directly without animation
						scope.animate();
		      		});

				});
			}
		};
	}
})();
