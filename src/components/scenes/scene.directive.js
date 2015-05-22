(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentScene', tkComponentScene);

	function tkComponentScene(Particles, Chromatin, Overlays, Contacts, Resources) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				overlay: '=',
				overlayindex: '=',
				contacts: '=',
				settings: '='
			},
			templateUrl: 'assets/templates/scene.html',
			link: function postLink(scope, element, attrs) {
				// threeService.three().then(function(THREE) {
					// console.log(scope.overlayindex);

					var scene, viewport, stats;
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var playback, controls, renderer;
					var particles, chromatin, contacts;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					var particleOriginalColor = new THREE.Color();
					var positionOriginalColor = new THREE.Color();
					var highlightColor = new THREE.Color("rgb(0,0,0)");

					scope.init = function () {

						// VIEWPORT
						/* component-controller == children[0]
						 * - component-header == children[0]
						 * - component-body == children[3]
						 */
						viewport = element[0].children[0].children[3];
						// width = viewport.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width);
						// height = viewport.clientHeight;
						height = parseInt(scope.state.height);
						// OJO! DOM NOT READY
						// console.log(element[0].firstChild.children[2].clientWidth);

						if (window.WebGLRenderingContext)
							renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
						else
							renderer = new THREE.CanvasRenderer({alpha: true});					
						renderer.setClearColor( 0xffffff );
						renderer.setSize( width, height );
						renderer.autoClear = false; // To allow render overlay on top of sprited sphere
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
						controls = new THREE.TrackballControls( camera, renderer.domElement );
						// Use OrbitControls for autoRotate
						playback = new THREE.OrbitControls( camera, renderer.domElement );
						playback.autoRotate = scope.view.controls.autoRotate;
						playback.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
						// interaction FALSE so as not to conflict with controls
						playback.noZoom = true;
						playback.noRotate = true;
						playback.noPan = true;
						playback.noKeys = true;

						// AXIS
						// TO DO: Make local axisHelper
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
						particles = new Particles( scope.data, scope.view.settings.particles );
						particles.visible = scope.view.settings.particles.visible;
						scene.add(particles);

						// Add particle count for later color changes
						scope.view.settings.particles.count = particles.geometry.vertices.length;
						scope.view.settings.chromatin.segments = scope.view.settings.particles.count * scope.view.settings.chromatin.particleSegments;
						// change radius to be proportional to chromosome length
						scope.view.settings.genomeLength = scope.settings.currentChromEnd; // eg. 816394 nucelotides

						//GEOMETRY: CHROMATIN
						chromatin = new Chromatin( scope.data, scope.overlay.colors, scope.view.settings.chromatin );
						chromatin.visible = scope.view.settings.chromatin.visible;
						scene.add(chromatin);
						scope.view.settings.chromatin.radius = chromatin.boundingSphere.radius;
						// scope.view.settings.chromatin.count = 1; // UNUSED

						// GEOMETRY: CONTACTS
						contacts = new Contacts(scope.contacts.positions, scope.contacts.distances, scope.view.settings.contacts);
						contacts.visible = scope.view.settings.contacts.visible;
						scene.add(contacts);

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
						var fogColor = scope.view.viewpoint.fogColor,
							fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
							fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
						if (scope.view.viewpoint.fog) scene.fog = new THREE.Fog(fogColor,fogNear,fogFar);

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
						// 			console.log( value );
						// 		}
						// 	});
						// });

					// FIX: NOT REDRAWING SCENE IF THE ONLY VISBLE OBJECT IS TOGGLED OFF
						scope.$watch('view.controls.autoRotate', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								// playback.autoRotate = !playback.autoRotate;
								playback.autoRotate = scope.view.controls.autoRotate;
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
						scope.$watch('view.settings.contacts.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								contacts.visible = !contacts.visible;
							}
						});

						var particlesObj = scene.getObjectByName( "Particles Cloud" );
						var chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
						
						// /* Watch for Chromatin colors */
						scope.$watch('overlayindex', function( newValue, oldValue ) { // cant deep watch as change through set on service
							if ( newValue !== oldValue ) {
								var meshes = chromatinObj.children.length;
								var newOverlay = Overlays.getOverlay(newValue);
								// console.log(newValue);
								for (var i = 0; i < meshes; i++) {
									var newColor =  new THREE.Color(newOverlay.colors[i]);
									chromatinObj.children[i].material.color = newColor;
									chromatinObj.children[i].material.ambient = newColor;
									chromatinObj.children[i].material.emissive = newColor;
								}
							}
						});

						/* Watch for Browser-wide Position updates */
						scope.$watch('settings.position', function( newPosition, oldPosition ) { // deep watch as change direct and changes all?
							if ( newPosition !== oldPosition ) {

								// FIND CURRENT PARTICLE
								var particlePrevious = Resources.getParticle(oldPosition, scope.view.viewpoint.chromStart, scope.view.viewpoint.chromEnd, scope.view.settings.particles.count); // Math.floor(oldInRange * (scope.view.settings.particles.count-1) / rangeLength);
								var particleCurrent = Resources.getParticle(newPosition, scope.view.viewpoint.chromStart, scope.view.viewpoint.chromEnd, scope.view.settings.particles.count); // Math.floor(newInRange * (scope.view.settings.particles.count-1) / rangeLength);

								// SET PARTICLE CURSOR COLOR
								if (particleOriginalColor) particlesObj.geometry.colors[(particlePrevious - 1)] = particleOriginalColor;
								particleOriginalColor = particlesObj.geometry.colors[(particleCurrent - 1)];
								particlesObj.geometry.colors[(particleCurrent - 1)] = highlightColor;
								particlesObj.geometry.colorsNeedUpdate = true;

								// SET CHROMATIN CURSOR COLOR
								var positionPrevious = Resources.getPosition(oldPosition, scope.view.viewpoint.chromStart, scope.view.viewpoint.chromEnd, scope.view.settings.chromatin.segments); // Math.floor(oldInRange * (scope.view.settings.chromatin.segments-1) / rangeLength);
								var positionCurrent = Resources.getPosition(newPosition, scope.view.viewpoint.chromStart, scope.view.viewpoint.chromEnd, scope.view.settings.chromatin.segments); // Math.floor(newInRange * (scope.view.settings.chromatin.segments-1) / rangeLength);

								var segmentPrevious = chromatinObj.getObjectByName( "segment-" + positionPrevious );
								if (positionOriginalColor) {
									segmentPrevious.material.color = positionOriginalColor;
									segmentPrevious.material.ambient = positionOriginalColor;
									segmentPrevious.material.emissive = positionOriginalColor;
								}

								var segmentCurrent = chromatinObj.getObjectByName( "segment-" + positionCurrent );
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
						requestAnimationFrame( scope.animate );
						playback.update();
						controls.update();
						scope.render();
					};

					scope.render = function () {
						renderer.render( scene, camera );
					};

					// Begin
					scope.init();
					scope.animate();
				// });
			}
		};
	}
})();
