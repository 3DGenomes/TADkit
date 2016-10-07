(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneCluster', tkComponentSceneCluster);

	function tkComponentSceneCluster(Particles, Cluster) {
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
				// console.log(scope.cluster);
				
				var renderer;
				var screenshot;
				var scene, viewport;
				var camera, cameraPosition, cameraTarget, cameraTranslate;
				var ambientLight, pointLight;
				var orbit, controls, particles, cluster;
				var width, height, contW, contH, windowHalfX, windowHalfY;

				scope.init = function () {
					
					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[0]
					 */
					viewport = element[0].children[0].children[0];
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
						
					var background = scope.view.settings.background;
					var clearColor = "0x" + background.substring(1);
					renderer.setClearColor( parseInt(clearColor) );
					renderer.setSize( width, height );
					renderer.autoClear = false; // To allow render overlay on top of sprited sphere
					renderer.setSize( width, height );
					viewport.appendChild( renderer.domElement );
					

					// SCENE
					scene = new THREE.Scene();

					// CAMERA
					camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( width / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
					camera.position.fromArray(scope.view.viewpoint.camera);
					camera.name = "Scene Camera";
					
					// CONTROLS
					orbit = new THREE.OrbitControls(camera, renderer.domElement);
					orbit.autoRotate = scope.view.controls.autoRotate;
					orbit.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
					orbit.enableZoom = false;
					orbit.enableRotate = false;
					orbit.enablePan = false;
					orbit.enableKeys = false;
					controls = new THREE.TrackballControls(camera, renderer.domElement);
					controls.noZoom = true;
					controls.noRotate = true;
					controls.noPan = true;
					
					// GEOMETRY: PARTICLES
					particles = new Particles( scope.cluster.data[scope.cluster.centroidIndex], scope.view.settings.particles );
					particles.geometry.center();
					particles.visible = scope.view.settings.particles.visible;
					scene.add(particles);

					//GEOMETRY: CLUSTER
					cluster = new Cluster( scope.cluster.data, scope.cluster.centroidIndex, scope.overlay, scope.view.settings.cluster );
					cluster.visible = scope.view.settings.cluster.visible;
					cluster.name = cluster.name + " " + scope.id.match(/\d+/)[0];
					scene.add(cluster);

					// SET CAMERA ORIENTATION
					cameraPosition = new THREE.Vector3(); //cluster.boundingSphere.center;
					cameraTarget = new THREE.Vector3( 0,0,0 ); //cluster.boundingSphere.center;

					/*var objectCenter = cluster.boundingSphere.center;

					cluster.position.x -= objectCenter.x;
					cluster.position.y -= objectCenter.y;
					cluster.position.z -= objectCenter.z;
					*/
					var angle = scope.view.viewpoint.fov / 2;
					var margin = 0.6;
					var	scale = Math.tan(angle).toFixed(2) * margin;
					cameraTranslate = cluster.boundingSphere.radius * scale;
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
					orbit.update();
					controls.update();
					scope.render();
				};

				scope.render = function () {
					renderer.render( scene, camera );
				};

				// Begin
				scope.init();
				scope.animate();
				
				scope.destroy_scene = function () {
					scene.remove(cluster);
					scene.remove(particles);
					
			        
			        particles.geometry.dispose();
			        particles.material.dispose();
			        
			        for(var i=0;i<cluster.children.length;i++) {
			        	cluster.children[i].geometry.dispose();
			        	cluster.children[i].material.dispose();
			        	
			        }

			        particles = undefined;
			        cluster = undefined;
			        if(renderer) renderer.forceContextLoss();
			        
				};
				scope.$on('$destroy', function() {
					scope.destroy_scene();
			    });
				
			}
		};
	}
})();
