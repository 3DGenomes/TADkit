'use strict';

TADkit.directive('scene', [ 'Particles', 'Chromatin', function(Particles, Chromatin){
	return {
		restrict: 'E',
		scope: { 
			data: "=",
			position:"=",
			particles: "=",
			chromatin: "=",
			proteins: "=",
			colors: "=",
			segments: "="
		},
		link: function postLink(scope, element, attrs) {
			// console.log(scope);
		var scene, viewport, stats, cube;
		var camera, cameraPosition, cameraTarget, cameraTranslate;
		var ambientLight, pointLight, loader, mesh,
			shadowMesh, icosahedron, light,
			mouseX = 0, mouseY = 0,
			materials = {};
		var controls, gui, renderer;
		var contW, contH, windowHalfX, windowHalfY;
		var positionOriginalColor = new THREE.Color();

		scope.materialType = 'lambert';
		scope.init = function () {

			// VIEWPORT
			viewport =  element[0];
			contW = viewport.parentNode.clientWidth * 0.8;
			contH = contW * 0.66;
			windowHalfX = contW / 2,
			windowHalfY = contH / 2,
	
			// RENDERER
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setClearColor( 0xffffff );
			renderer.setSize( contW, contH );
			viewport.appendChild( renderer.domElement );
			// console.log(viewport);

			// SCENE
			scene = new THREE.Scene();
			var sceneFogNear = 3000;
			var sceneFogFar = 500;

			// CAMERAS
			// console.log("CAMERA (initial)");
		    camera = new THREE.PerspectiveCamera(28,  contW / contH , 1, 1000000);
			cameraPosition = new THREE.Vector3( 50000, 50000, 50000 );
			cameraTarget = new THREE.Vector3(0,0,0);
			camera.position.x = cameraPosition.x;
			camera.position.y = cameraPosition.y;
			camera.position.z = cameraPosition.z;
			camera.lookAt(cameraTarget);
			// camera.updateProjectionMatrix();
			camera.name = "Scene Camera";
			scene.add(camera);
			// console.log(camera);
			var rotation = 0;
			
			// CONTROLS
			controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.rotateSpeed = 1.5;
			controls.zoomSpeed = 2.0;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;

			controls.keys = [ 65, 83, 68 ];

			controls.addEventListener( 'change', scope.render );
			
			var position = position || new THREE.Vector3(0,0,0);
			controls.target.copy(position);
			// console.log(controls);

			// STATS
			// stats = new Stats();
			// stats.setMode(0); // 0: fps, 1: ms
			// stats.domElement.style.position = 'absolute';
			// stats.domElement.style.left = '10px';
			// stats.domElement.style.bottom = '10px';
			// viewport.appendChild( stats.domElement );

			// HELPERS
			var axisHelper = new THREE.AxisHelper( 100000 );
			// scene.add( axisHelper );

			// LIGHTS
			// Ambient
			var ambientColor = "#111111";
			ambientLight = new THREE.AmbientLight( ambientColor );
			ambientLight.name = "Scene Ambient Light";
			scene.add(ambientLight);
			// Point
			var pointColor = "#ffffff";
			var pointIntensity = 0.1;
			//var pointDistance = 0.0; DEFAULT = infinite
			pointLight = new THREE.PointLight( pointColor, pointIntensity );
			pointLight.position.set( 20000, 20000, 20000 );
			pointLight.name = "Scene Light";
			scene.add(pointLight);
			// console.log(pointLight);
			// Point Light Helper
			var sphereSize = 500;
			var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
			// scene.add( pointLightHelper );
			
			var chromatinColor = "#37375f";
			var chromatinMaterial = new THREE.MeshLambertMaterial({
				color: chromatinColor,
				ambient: chromatinColor,
				emissive: chromatinColor,
				//shading: THREE.FlatShading,
				opacity: 1.0,
				transparent: false,
				wireframe: false
			});
			
			var particlesSettings = {
					particlesVisibility: scope.particles,
					particleColor: "#ffffff",
					particleSize: 350,
					particleOpacity: 0.8
			};
			var particles = new Particles( scope.data, particlesSettings );
			scene.add(particles.cloud);

			var chromatinSettings = {
					chromatinVisibility: scope.chromatin,
					particleSegments: scope.segments
			};

			var chromatin = new Chromatin( scope.data, scope.colors, chromatinSettings );
			scene.add(chromatin.fiber);
			scope.lookAtTAD(chromatin.center, cameraTarget, chromatin.bounds * 3.0);
			
			// FOG SCENE
			var fogColor = 0xFFFFFF,
				fogNear = chromatin.bounds * 1.0,
				fogFar = chromatin.bounds * 6.0;
			scene.fog = new THREE.Fog( fogColor, fogNear, fogFar );
			
			window.addEventListener( 'resize', scope.onWindowResize, false );

			var particlesObj = scene.getObjectByName( "Particles Cloud" );
			scope.$watch('particles', function(n,o) {
				if (n !== o) {
					particlesObj.visible = scope.particles;
				}
			});
			var chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
			scope.$watch('chromatin', function(n,o) {
				if (n !== o) {
					chromatinObj.visible = scope.chromatin;
				}
			});
			scope.$watch('proteins', function(n,o) {
				if (n !== o) {
					var color = Math.floor(n);
					var meshes = chromatinObj.children.length;
					console.log(meshes);
					for (var i = 0; i < meshes; i++) {
						chromatinObj.children[i].material.color = new THREE.Color("rgb(0,255,0)");
						chromatinObj.children[i].material.ambient = new THREE.Color("rgb(0,255,0)");
						chromatinObj.children[i].material.emissive = new THREE.Color("rgb(0,255,0)");						
					}
				}
			});
			scope.$watch('position', function(n,o) {
				if (n !== o) {
					var positionPrevious =  Math.floor(o);
					var positionCurrent = Math.floor(n);
					var fragmentPrevious = chromatinObj.getObjectByName( "fragment-"+positionPrevious );
					fragmentPrevious.material.color = positionOriginalColor;
					fragmentPrevious.material.ambient = positionOriginalColor;
					fragmentPrevious.material.emissive = positionOriginalColor;
					var fragmentCurrent = chromatinObj.getObjectByName( "fragment-"+positionCurrent );
					positionOriginalColor = fragmentCurrent.material.color;
					fragmentCurrent.material.color = new THREE.Color("rgb(0,0,255)");
					fragmentCurrent.material.ambient = new THREE.Color("rgb(0,0,255)");
					fragmentCurrent.material.emissive = new THREE.Color("rgb(0,0,255)");
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
			windowHalfX = contW / 2,
			windowHalfY = contH / 2,

			camera.aspect = contW / contH;
			camera.updateProjectionMatrix();

			renderer.setSize( contW, contH );
		};

		scope.lookAtTAD = function ( position, target, translate) {
				//console.log("Camera position: %s", JSON.stringify(camera.position) );
				position = position || new THREE.Vector3(0,0,0);
				target = target || new THREE.Vector3(0,0,0);
				translate = translate || 0;
				// TARGET CAMERA ON TAD
				camera.position.set(position.x, position.y, position.z);
				camera.lookAt(target);
				camera.translateZ(translate);
				//console.log("Camera reset: %s", JSON.stringify(camera.position) );
				camera.updateMatrixWorld();
				// console.log("Camera position: %s", JSON.stringify(camera.position));
								
				// TARGET CONTROLS ON TAD
				// console.log("Controls target: %s", JSON.stringify(controls.target));
				controls.target.copy(position);
		}

		// -----------------------------------
		// Draw and Animate
		// -----------------------------------
		scope.animate = function () {
			requestAnimationFrame( scope.animate );
			controls.update();
			scope.render();
		};

		scope.render = function () {
			renderer.render( scene, camera );
			// stats.update();
		};

		// Begin
		scope.init();
		scope.animate();

		}
	};
	}]);
