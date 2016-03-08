(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentScene', tkComponentScene);

	function tkComponentScene($log, $rootScope, THREEService, THREEPlugins, Particles, Chromatin, Network) {
		return {
			restrict: 'EA',
			scope: { 
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=',
				state: '=',
				currentmodel: '=',
				proximities: '=',
				currentoverlay: '='
			},
			templateUrl: 'assets/templates/scene.html',
			link: function postLink(scope, element, attrs) {
				THREEPlugins.load(["TrackballControls","OrbitControls"]).then(function(THREE) {
					// DOM variables
					var component, viewport;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					// THREE variables
					var renderer = THREEService.getRenderer();
					var animation;

					var scene;
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var autoplay, controls;

					// TADkit variables
					var particles, chromatin, network;
					var particleOriginalColor = new THREE.Color();
					var positionOriginalColor = new THREE.Color();
					var highlightColor = new THREE.Color("rgb(0,0,0)"); // add to scene component

					scope.init = function () {

						// VIEWPORT
						/* component = element[0].parentNode
						 * component-controller == element[0].children[0]
						 * - component-header == element[0].children[0].children[0]
						 * - component-body == element[0].children[0].children[3]
						 */
						
						viewport = element[0].children[0].children[3];

						// width = component.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width); // USE UNTIL DOM CHECK AVAILBLE
						// height = component.clientHeight;
						height = parseInt(scope.state.height); // USE UNTIL DOM CHECK AVAILBLE
				
						var background = scope.view.settings.background;
						// var clearColor = "0x" + background.substring(1);
						// renderer.setClearColor( clearColor );
						renderer.setSize( width, height );
						viewport.appendChild( renderer.domElement );

						// SCENE
						scene = new THREE.Scene();

						// CAMERA
						camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( width / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
						camera.position.fromArray(scope.view.viewpoint.camera);
						camera.name = "Scene Camera";
						scene.add(camera);

						// CONTROLS
						// Use TrackballControls for interaction
						controls = new THREE.TrackballControls(camera, renderer.domElement);
						// Use OrbitControls for autoRotate
						autoplay = new THREE.OrbitControls(camera, renderer.domElement);
						autoplay.autoRotate = scope.view.controls.autoRotate;
						autoplay.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
						// interaction FALSE so as not to conflict with controls
						autoplay.enableZoom = false;
						autoplay.enableRotate = false;
						autoplay.enablePan = false;
						autoplay.enableKeys = false;

						// AXIS
						// TODO: Make local axisHelper
						var axisHelper = new THREE.AxisHelper( scope.view.settings.axis.size );
						axisHelper.visible = scope.view.settings.axis.visible;
						axisHelper.name = "Axis";
						scene.add( axisHelper );

						// LIGHTS
						// Ambient
						var ambientColor = scope.view.settings.lighting.ambient;
						ambientLight = new THREE.AmbientLight(ambientColor);
						ambientLight.name = "Scene Ambient Light";
						// scene.add(ambientLight);
						
						// GEOMETRY: PARTICLES
						particles = new Particles(scope.currentmodel.data, scope.currentoverlay.colors.particles, scope.view.settings.particles);
						// particles = new Particles(scope.model.data, scope.overlay.colors.particles, scope.view.settings.particles);
						particles.visible = scope.view.settings.particles.visible;
						scene.add(particles);

						//GEOMETRY: CHROMATIN
						chromatin = new Chromatin(scope.currentmodel.data, scope.currentoverlay.colors.chromatin, scope.view.settings.chromatin);
						// chromatin = new Chromatin(scope.model.data, scope.overlay.colors.chromatin, scope.view.settings.chromatin);
						chromatin.visible = scope.view.settings.chromatin.visible;
						scene.add(chromatin);
						scope.view.settings.chromatin.radius = chromatin.boundingSphere.radius;

						// GEOMETRY: MESH
						// network = new Network(scope.proximities.positions, scope.proximities.distances, scope.view.settings.network);
						network = new Network(scope.data, scope.overlay.colors.network, scope.view.settings.network);
						network.visible = scope.view.settings.network.visible;
						scene.add(network);

						// UPDATE CAMERA TARGET
						cameraPosition = chromatin.boundingSphere.center;
						cameraTarget = chromatin.boundingSphere.center;
						cameraTranslate = chromatin.boundingSphere.radius * scope.view.viewpoint.scale;
						scope.lookAtTAD(cameraPosition, cameraTarget, cameraTranslate);

						// Point
						var pointColor = scope.view.settings.lighting.color;
						var pointIntensity = scope.view.settings.lighting.intensity;
						pointLight = new THREE.PointLight(pointColor, pointIntensity);
						pointLight.name = "Scene Light";
						camera.add(pointLight);
						var lightOffset = cameraTranslate * 0.5; // Up and to the left
						pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
						// Point Light Helper
						var sphereSize = 100;
						var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
						// scene.add(pointLightHelper);
						
						// FOG SCENE
						var fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
							fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
						if (scope.view.viewpoint.fog) scene.fog = new THREE.Fog(background,fogNear,fogFar);

						// EVENT LISTENERS / SCOPE WATCHERS
						// window.addEventListener( 'resize', scope.onWindowResize, false );

						/* Watch for changes */

						// var componentOptions = [
						// 	 'view.settings.particles.visible',
						// 	 'view.settings.chromatin.visible',
						// 	 'view.controls.autoRotate',
						// 	 'view.settings.axis.visible'
						// 	 ];
						// scope.$watchGroup( componentOptions, function( newValues, oldValues ) {
						// 	angular.forEach( newValues, function(value, index) {
						// 		if ( newValues[index] !== oldValues[index] ) {
						// 			$log.debug( value );
						// 		}
						// 	});
						// });

					// FIX: NOT REDRAWING SCENE IF THE ONLY VISBLE OBJECT IS TOGGLED OFF
						scope.$watch('view.controls.autoRotate', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								// autoplay.autoRotate = !autoplay.autoRotate;
								autoplay.autoRotate = scope.view.controls.autoRotate;
							}
						});
						scope.$watch('view.settings.axis.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								axisHelper.visible = !axisHelper.visible;
							}
						});
						scope.$watch('view.settings.particles.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								particles.visible = !particles.visible;
							}
						});
						scope.$watch('view.settings.chromatin.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								chromatin.visible = !chromatin.visible;
							}
						});
						scope.$watch('view.settings.network.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								network.visible = !network.visible;
							}
						});

						var particlesObj = scene.getObjectByName( "Particles Cloud" );
						var chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
						var networkObj = scene.getObjectByName( "Network Graph" );

						// /* Watch for Particles colors */
						// scope.$watch('currentoverlay.colors.particles', function( newColors, oldColors ) { // cant deep watch as change through set on service
						// 	if ( newColors !== oldColors ) {
						// 		// var particleCount = particlesObj.children.length;
						// 		// for (var i = 0; i < particleCount; i++) {
						// 		// 	var newParticleColor =  new THREE.Color(newOverlay.colors.particles[i]);
						// 		// 	particlesObj.children[i].material.color = newParticleColor;
						// 		// }
						// 	}
						// });

						// /* Watch for Chromatin colors */
						scope.$watch('currentoverlay.colors.chromatin', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( newColors !== oldColors ) {
								var chromatinCount = chromatinObj.children.length;
								for (var i = 0; i < chromatinCount; i++) {
									var newChromatinColor =  new THREE.Color(newColors[i]);
									chromatinObj.children[i].material.color = newChromatinColor;
									chromatinObj.children[i].material.ambient = newChromatinColor;
									chromatinObj.children[i].material.emissive = newChromatinColor;
								}
							}
						});

						// /* Watch for Network colors */
						scope.$watch('currentoverlay.colors.network', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( newColors !== oldColors ) {
								networkObj.geometry.addAttribute( 'color', new THREE.BufferAttribute( newColors.RGB, 3 ) );
								networkObj.geometry.addAttribute( 'alpha', new THREE.BufferAttribute( newColors.alpha, 1 ) );
							}
						});

						/* Watch for Browser-wide Position updates */
						scope.$watch('settings.current.particle', function( newParticle, oldParticle ) {
							if ( newParticle !== oldParticle ) {

								// SET PARTICLE CURSOR COLOR
								if (particleOriginalColor) particlesObj.geometry.colors[(oldParticle - 1)] = particleOriginalColor;
								particleOriginalColor = particlesObj.geometry.colors[(newParticle - 1)];
								particlesObj.geometry.colors[(newParticle - 1)] = highlightColor;
								particlesObj.geometry.colorsNeedUpdate = true;
							}
						});

						/* Watch for Browser-wide Position updates */
						scope.$watch('settings.current.segment', function( newSegment, oldSegment ) {
							if ( newSegment !== oldSegment ) {

								// SET CHROMATIN CURSOR COLOR								
								var segmentPrevious = chromatinObj.getObjectByName( "segment-" + oldSegment );
								if (positionOriginalColor) {
									segmentPrevious.material.color = positionOriginalColor;
									segmentPrevious.material.ambient = positionOriginalColor;
									segmentPrevious.material.emissive = positionOriginalColor;
								}

								var segmentCurrent = chromatinObj.getObjectByName( "segment-" + newSegment );
								positionOriginalColor = segmentCurrent.material.color;

								segmentCurrent.material.color = highlightColor;
								segmentCurrent.material.ambient = highlightColor;
								segmentCurrent.material.emissive = highlightColor;
							}
						});

					};

					// -----------------------------------
					// Event listeners
					// -----------------------------------
					scope.onWindowResize = function () {
						scope.resizeCanvas();
					};

					$rootScope.$on('$stateChangeStart', function() {
						cancelAnimationFrame( animation );
					});

					// element.on('mousemove', function(event) {
					// 	// mouseX = ( event.clientX - width / 2 );
					// 	// mouseY = ( event.clientX - width / 2 );
					// 	scope.animate();
					// });

					// -----------------------------------
					// Updates
					// -----------------------------------
					scope.resizeCanvas = function () {

						contW = viewport.parentNode.clientWidth * 0.66;
						contH = contW * 0.66;
						windowHalfX = contW / 2;
						windowHalfY = contH / 2;

						camera.aspect = contW / contH;
						camera.updateProjectionMatrix();

						renderer.setSize( contW, contH );
					};

					scope.lookAtTAD = function (position, target, translate) {
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
						animation = requestAnimationFrame( scope.animate );
						// autoplay.update();
						controls.update();
						scope.render();
					};

					scope.render = function () {
						renderer.render( scene, camera, null, true ); // forceClear == true
					};

					// Begin
					scope.init();
					scope.animate();
				});
			}
		};
	}
})();
