(function() {
	'use strict';

	// ANGULAR APP
	angular.module('TADkit',['ui.router','ngMaterial','uuid4','d3js','threejs','shared']);
	     
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// Removing # from URL with HTML5 History API and
		// add <base href="/myapp/"></base> in index.html
		// Comment to leave # in case of server rewrites.
		// $locationProvider.html5Mode(true);

		// Material Design Themes
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('lime', {
				'default': '500'
			})
   			.warnPalette('red')
			.backgroundPalette('grey');
		$mdThemingProvider.theme('darkKit')
			.dark();

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.run(run);

	function run($rootScope) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			console.log( 'Resolve Error: ', error);
		});
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/project/loader/");
		
		$stateProvider
		.state('main', {
			controller: 'MainController',
			abstract: true,
			url: '',
			templateUrl: 'assets/templates/main.html',
			resolve: {
				'initialData': function(initMain) {
					return initMain();
				}
			}
		})
		.state('project', {
			parent: 'main',
			url: '/project',
			data: {
				cssClassnames: 'main'
			},
			views: {
				'topbar@main': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'sidebar-left@main': {
					templateUrl: 'assets/templates/sidebar.project.html',
					controller: 'SidebarProjectController'
				},
				'content@main': {
					templateUrl: 'assets/templates/project-content.html',
					controller: 'ProjectContentController'
				},
				'sidebar-right@main': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('loader', {
			parent: 'project',
			url: '/loader/:loadDataset',
			data: {
				cssClassnames: 'loader'
			},
			views: {
				'topbar@main': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'content@main': {
					templateUrl: 'assets/templates/project-loader.html',
					controller: 'ProjectLoaderController'
				},
				'sidebar-right@main': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('dataset', {
			parent: 'project',
			url: '/dataset',
			data: {
				cssClassnames: 'dataset'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-dataset.html',
					controller: 'ProjectDatasetController'
				}
			}
		})
		.state('overlay', {
			parent: 'project',
			url: '/overlay',
			data: {
				cssClassnames: 'overlay'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-overlay.html',
					controller: 'ProjectOverlayController'
				}
			}
		})
		.state('storyboard', {
			parent: 'project',
			url: '/storyboard',
			data: {
				cssClassnames: 'storyboard'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-storyboard.html',
					controller: 'ProjectStoryboardController'
				}
			}
		})
		.state('browser', {
			parent: 'project',
			url: '/browser',
			views: {
				'sidebar-left@main': {
					templateUrl: 'assets/templates/sidebar.browser.html',
					controller: 'SidebarBrowserController'
				},
				'content@main': {
					templateUrl: 'assets/templates/storyboard.html',
					controller: 'StoryboardController'
				}
			}
		})
		.state('overlay-import', {
			parent: 'browser',
			url: '/overlay/import',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/overlay-import.html',
					controller: 'OverlayImportController'
				}
			}
		})
		.state('404', {
			url: '/404',
			templateUrl: 'assets/templates/404.tpl.html',
			controller: 'AppController'
		});
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponent', tkComponent);

	function tkComponent($compile) {
		return {
			restrict: 'EA',
			// controller: 'StoryboardController',
			link: function(scope, element, attrs) {
				// console.log(scope);

				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.id}}-' + scope.$index + '" ' +
					'type="component.object.type" ' +
					'title="{{component.object.title}}" ' +
					'state="component.object.state" ' + /* for scene until can check for DOM loaded */
					'settings="settings" ' +
					'view="component.view" ' +
					'currentparticle="currentParticle"' +
					'currentposition="currentPosition"' +
					'currentmodel="current.model" ' +
					'currentoverlay="current.overlay" ' +
					'data="component.data" ' +
					'proximities="component.proximities" ' +
					'overlay="component.overlay"' +
					'toggleoverlay="toggleOverlay(index)" ' +
					'style="margin: {{component.object.state.margin}}; background-color: {{component.view.settings.background}}" ' +
					'class="component ' + scope.component.object.type + '">' +
					'</data-tk-component-' + scope.component.object.type + '>';

				element.replaceWith($compile(strTemplate)(scope));
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInfoboxController', PanelInfoboxController);

	function PanelInfoboxController($scope) {
		$scope.species = $scope.current.dataset.object.species;
		$scope.region = $scope.current.dataset.object.region;
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInfobox', tkComponentPanelInfobox);

	function tkComponentPanelInfobox() {
		return {
			restrict:'C',
			templateUrl: 'assets/templates/panel-infobox.html',
			link:function(scope, element, attrs){
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope, $mdDialog) {

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
		};

		$scope.width = parseInt($scope.state.width); // strip PX units
		$scope.height = parseInt($scope.state.height); // strip PX units

		$scope.atPosition = function(gene) {
			if ($scope.$parent.settings.current.segmentUpper >= gene.start && $scope.$parent.settings.current.segmentLower <= gene.end) return true;
			return false;
		};

		$scope.formatRegionName = function(regionName) {
			if (regionName == "Chromosome") {
				return regionName;
			} else {
				return "chr" + regionName;
			}
		};
		
		$scope.featureTitle = function(feature) {
			if (!feature.external_name) {
				return feature.id;
			} else {
				return feature.external_name;
			}
		};


		$scope.getDetails = function(item, event) {
			$mdDialog.show(
				$mdDialog.alert()
					.title('Details')
					.content(item.description)
					.ariaLabel('Item details')
					.ok('Close')
					.targetEvent(event)
			);
		};
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInspector', tkComponentPanelInspector);

	function tkComponentPanelInspector() {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'='
			},
			templateUrl: 'assets/templates/panel-inspector.html',
			link:function(scope, element, attrs){
				// console.log(scope.data);
			}
		};
	}
})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin(Paths, PathControls) {
		return function(data, colors, settings) {
			// console.log(colors);

			var defaults = {
				visible: true,
				genomeLength: 816394, // bactieria mycoplasma_pneumoniae_m129
				particles: 0,
				particleSegments: 5,
				curveSegments: 1,
				radius: 15,
				radiusSegments: 16,
				endcap: false,
				pathClosed: false
			};		
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Convert Data to Vector triplets
			var geometry = getGeometry(data);
			for (var g = geometry.vertices.length - 1; g >= 0; g--) {
				var geometryColor = new THREE.Color(colors[g*20]);
				geometry.colors.unshift(geometryColor);
			}

			// Derive path controls from geometry vectors
			// var pathControls = getPathControls( geometry.vertices );
			var pathControls = PathControls.cubic(geometry.vertices, this.pathClosed);

			var controlsGeom = new THREE.Geometry();
			for ( var h = 0; h < pathControls.vertices.length; h ++ ) {
				controlsGeom.vertices.push( new THREE.Vector3( pathControls.vertices[h].x, pathControls.vertices[h].y, pathControls.vertices[h].z || 0) );
				var vertexColor = pathControls.colors[h];
				controlsGeom.colors.push(vertexColor);
			}
			controlsGeom.name = "controlsGeom";

			// Set number of Particles
			if (this.particles === 0) this.particles = geometry.vertices.length; //pathControls.vertices.length - 1;
			// Derive chromatin geometry path segments
			var pathSegments = this.particles * this.particleSegments; // same as segmentsCount...
			this.pathSegments = pathSegments;

			/*** TODO: Calculate PathSegments based on number of base pairs in the model ***/
			var cubicPath = Paths.cubicBezier(pathControls.vertices, pathSegments, this.pathClosed);
			var cubicGeom = cubicPath.createPointsGeometry(pathSegments);
			for (var j = cubicGeom.vertices.length - 1; j >= 0; j--) {
				var cubicGeomColor = new THREE.Color(colors[j]);
				cubicGeom.colors.unshift(cubicGeomColor);
			}
			cubicGeom.name = "cubicGeom";

			// ********************************************
			// * MODEL SCALE = 1unit : 1nanometer         *
			// * 1 micrometer (µm) = 1000 nanometers (nm) *
			// ********************************************
			// Eukaryotic animal cells diamter == 20 µm (10 - 30 µm) = 10000 units radius
			// var cellRadius = 10000;
			// Nucleus diameter == 6 µm (3 - 10 micrometers) = 3000 units radius
			// var nucelusRadius = 20;
			// Chromatin diameter == 30nm
			var pathLength = cubicPath.getLength();
			var chromatinRadius = 15; // 30nm * 0.5
			// Chromatin density == 1080 BP : 11nm
			var chromatinLength = this.genomeLength * 11 / 1080;
			this.radius = (pathLength * chromatinRadius) / chromatinLength;

			// Generate Chromatin model
			var chromatinFiber = new THREE.Object3D(); // unmerged network
			var chromatinBounds = new THREE.Geometry(); // to calculate merged bounds

			for ( var i = 0 ; i < pathSegments; i++) {
				// cap if end segment
				this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
				// color linked to scene scope
				
				var segmentColor = colors[i];
				var segmentMaterial = new THREE.MeshLambertMaterial({
					color: segmentColor,
					emissive: segmentColor,
					vertexColors: THREE.VertexColors,
					opacity: 1.0, 
					transparent: false,
					wireframe: false
				});
				var segment = segmentGeometry(cubicGeom.vertices[i], cubicGeom.vertices[i+1], this );
				chromatinBounds.merge(segment);

				var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
				chromatinSegment.name = "segment-" + (i + 1);
				chromatinFiber.add(chromatinSegment);
			}

			chromatinBounds.computeBoundingSphere();
			chromatinFiber.boundingSphere = chromatinBounds.boundingSphere;
			chromatinFiber.name = "Chromatin Fiber";
			
			return chromatinFiber;
		};
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Chromatin Geometry";
		return vertexGeometry;
	}

	function segmentGeometry (pointX, pointY, props) {
		var newGeometry;
		/* edge from X to Y */
		var segmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
		var segmentOrientation = new THREE.Matrix4();
		/* THREE.Object3D().up (=Y) default orientation for all objects */
		segmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
		/* rotation around axis X by -90 degrees
		 * matches the default orientation Y
		 * with the orientation of looking Z */
		var segmentRotation = new THREE.Matrix4();
		segmentRotation.set(	1, 0, 0, 0,
								0, 0, 1, 0,
								0,-1, 0, 0,
								0, 0, 0, 1 );
		segmentOrientation.multiply(segmentRotation);
		segmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		newGeometry = new THREE.CylinderGeometry( props.radius, props.radius, segmentDirection.length(), props.radiusSegments, props.curveSegments, props.endcap);
		newGeometry.applyMatrix(segmentOrientation);
		
		return newGeometry;
	}
		
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Cluster', Cluster);

	// constructor for cluster models ensemble
	function Cluster(Color) {
		return function( data, centroidIndex, overlay, settings ) {
			// console.log(overlay);

			var defaults = {
				visible: true,
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Convert Data (single Model / set of Particles) to Vector triplets
			var clusterBufferGeometry = new THREE.BufferGeometry(); // to calculate merged bounds
			var overlayColors = Color.THREEColorsFromHex(overlay);

			// Generate Cluster model
			var clusterEnsemble = new THREE.Object3D(); // unmerged network
			for ( var i = 0 ; i < data.length; i++) {
				var modelComponents = data[i];
				clusterBufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( modelComponents, 3 ) );
				var modelGeometry = getModelGeometry(modelComponents);
					modelGeometry.colors = overlayColors;

				var modelColor = overlay[i];
				var modelMaterial = new THREE.LineBasicMaterial({
					color: new THREE.Color(this.color),
					opacity: this.modelOpacity,
					transparent: this.transparent,
					linewidth: this.linewidth,
					fog: this.fog
				});
				var centroidMaterial = new THREE.LineBasicMaterial({
					opacity: this.centroidOpacity, 
					transparent: this.transparent,
					linewidth: this.linewidth,
					vertexColors: THREE.VertexColors,
					fog: this.fog
				});
				if (i == centroidIndex) {
					modelMaterial = centroidMaterial;
				}
				var model = new THREE.Line(modelGeometry, modelMaterial);
				model.name = "model-"+ i;
				clusterEnsemble.add(model);
			}
			clusterBufferGeometry.computeBoundingBox();
			// clusterBufferGeometry.computeBoundingSphere();
			clusterEnsemble.boundingBox = clusterBufferGeometry.boundingBox;
			// clusterEnsemble.boundingSphere = clusterBufferGeometry.boundingSphere;
			clusterEnsemble.BufferGeometry = clusterBufferGeometry;
			clusterEnsemble.name = "Cluster Ensemble";
			return clusterEnsemble;
		};
	}
	
	function getModelGeometry(components) {
		var offset = 0, vertex,
			 modelGeometry = new THREE.Geometry();

		var totalVertices = components.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = components[ offset ++ ];
			vertex.y = components[ offset ++ ];
			vertex.z = components[ offset ++ ];
			modelGeometry.vertices.push( vertex );
		}
		return modelGeometry;
	}

})();
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
			templateUrl: 'assets/templates/scene-clusters.html',
			link: function postLink( scope, element, attrs ) {
				// console.log(scope);

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

 						// clientWidth and clientHeight ie. no margins nor padding
						width = elementParent.clientWidth;
						height = elementParent.clientHeight;

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
							particles = new Particles( cluster.data[cluster.centroidIndex], scope.overlay, scope.view.settings.particles );
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

						// Values from JSON
						var colCount = scope.view.settings.cols;
						var rowHeight = scope.view.settings.rowHeight;
						var rowSplit = rowHeight.split(':');
						var rowRatio = parseInt(rowSplit[0], 10) / parseInt(rowSplit[1], 10);
						var tileGutter = parseInt(scope.view.settings.gutter); // to remove px

						var colIndex = 1;
						var rowIndex = 1;
						var span = 1;

						// *** Derived from Angular Material grid-list.js lines 221-267 ***

						// Fraction of the gutter size that each column takes up.
						var hGutterShare = (colCount - 1) / colCount;
						// Percent of the available horizontal space that one column takes up.
						var hShare = 1 / colCount;

						var sharedGutter = tileGutter * hGutterShare;
						var viewportUnit = (width * hShare) - sharedGutter; // ie. previous column's right edge
						var viewportWidth, viewportHeight;
						viewportWidth = viewportUnit;
						viewportHeight = viewportWidth * rowRatio;

						angular.forEach( scope.clusters, function(cluster, index) {

							if ( index === 0 ) renderer.clear();

							var scene = scenes[index];
							// scope.updateCamera( camera, scene, mouseX, mouseY );
							controls.update();

							var viewportLeft = (viewportUnit + tileGutter) * (colIndex - 1);
							var viewportBottom = height - (viewportUnit * rowIndex);

							renderer.setViewport( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.setScissor( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.enableScissorTest ( true );
							renderer.setClearColor( "#ffffff" );
							renderer.render( scene, camera, null, true ); // forceClear == true

							if ( colIndex === colCount ) {
								colIndex = 1;
								rowIndex++;
							} else {
								colIndex++;
							}
						});
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

(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneFloatingtad', tkComponentSceneFloatingtad);

	function tkComponentSceneFloatingtad($rootScope, THREEService, THREEPlugins) {
		return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				THREEPlugins.load(["TrackballControls","OrbitControls"]).then(function(THREE) {
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
							// morphTargets: false,
							wireframe: true,
							// wireframeLinewidth: 1
						});

						network = new THREE.Mesh( geometry, material );
						network.name = "Floating TAD";
						scene.add(network);
							
						// controls = new THREE.TrackballControls( camera, renderer.domElement );
						// controls.minDistance = 450;
						// controls.maxDistance = 550;

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
						// controls.update();
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
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Network', Network);

	// create one line between each pair in dataset
	function Network(Color, Particles, Networks) {
		return function(data, overlay, settings) {
			// console.log(data);
			// console.log(overlay);

			// Uses THREE.LineSegments to generate separate lines
			// from an array of vertex pairs

			var defaults = {
				color: "#ff0000",
				size: 200,
				opacity: 0.8,
				map: "assets/img/sphere-glossy.png",
				depthtest: true,
				alphatest: 0.5,
				transparent: true,
				visible: false
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Define a color-typed uniform
			var uniforms = {  
				// color: { type: "c", value: new THREE.Color( 0x00ff00 ) },
				// alpha: { type: "f", value: 1.0 }
			};
			var attributes = {  
				alpha: { type: 'f', value: [] }
			};
			var parameters = {
				uniforms: uniforms,
				// attributes: attributes,
				vertexShader: document.getElementById('vertexShader').textContent,
				fragmentShader: document.getElementById('fragmentShader').textContent,
				vertexColors: THREE.VertexColors,
				// side: THREE.DoubleSide,
				// blending: THREE.AdditiveBlending, // black is transparent
				transparent: true //this.transparent
			};
			var shaderMaterial = new THREE.ShaderMaterial(parameters);

			var dataLength = data.length / 3;
			var totalPairs = ((dataLength * dataLength) - dataLength) * 0.5;

			var vertexPairs = getVertexPairs(data, totalPairs);
			var vertexRGB = overlay.RGB;
			var vertexAlpha = overlay.alpha;

			var geometry = new THREE.BufferGeometry();
			geometry.addAttribute( 'position', new THREE.BufferAttribute( vertexPairs, 3 ) );
			geometry.addAttribute( 'color', new THREE.BufferAttribute( vertexRGB, 3 ) );
			geometry.addAttribute( 'alpha', new THREE.BufferAttribute( vertexAlpha, 1 ) );
			geometry.computeBoundingSphere();

			var nodeMap = null; // render only point
			if (this.map) {
				var loader = new THREE.TextureLoader();
				loader.load(
					this.map,
					function ( texture ) {
						nodeMap = texture;
					},
					// Function called when download progresses
					function ( xhr ) {
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
					},
					// Function called when download errors
					function ( xhr ) {
						console.log( 'An error happened' );
					}
				);
			}

			var nodesMaterial = new THREE.PointsMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: nodeMap,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			// NETWORK
			// var nodes = new THREE.Points(data, nodesMaterial);
			// nodes.name = "Network Nodes";
			
			// var edges = new THREE.LineSegments(geometry, shaderMaterial);
			// edges.name = "Network Edges";

			// var network = new THREE.Object3D();
			// network.add(edges);
			// network.add(nodes);
			// network.boundingSphere = geometry.boundingSphere;
			var network = new THREE.LineSegments(geometry, shaderMaterial);
			network.name = "Network Graph";
			// console.log(network);
			return network;
		};
	}

	function getVertexPairs(data, totalPairs) {
		// from an array of vertex pairs
		// eg. [x1,y1,z1,x2,y2,z2,x3,y3,z3,...xn,yn,zn]
		// to a matrix of all-to-all connections
		// eg. [x1,y1,z1,x2,y2,z2,x1,y1,z1,x3,y3,z3,...xn,yn,zn,xm,ym,zm]
		// such that all point pairs are represented uniquely
		// ie. one half of matrix where array length = (n^2-n)/2
		// eg.  1 2 3 4
		//     1  x x x  ==  1-2 1-3 1-4    3
		//     2    x x  ==  2-3 2-4      + 2
		//     3      x  ==  3-4          + 1
		//     4         ==  ((4*4)-4)*0.5  = 6 pairs of vertices
		var vertexPairs = new Float32Array( totalPairs * 6); // 6 ie. 2 * xyz
		var pairPos = 0;
		for (var i = 0; i < data.length; i += 3) {
			var vertex1 = i;
			for (var j = i + 3; j < data.length; j += 3) {
				var vertex2 = j;
				// console.log(pairPos);
				// console.log(data[vertex1]+","+data[vertex1+1]+","+data[vertex1+2]);
				// console.log(data[vertex2]+","+data[vertex2+1]+","+data[vertex2+2]);
				// from vertex
				vertexPairs[pairPos] = data[vertex1]; pairPos++;
				vertexPairs[pairPos] = data[vertex1 + 1]; pairPos++;
				vertexPairs[pairPos] = data[vertex1 + 2]; pairPos++;
				// to vertex
				vertexPairs[pairPos] = data[vertex2]; pairPos++;
				vertexPairs[pairPos] = data[vertex2 + 1]; pairPos++;
				vertexPairs[pairPos] = data[vertex2 + 2]; pairPos++;
			}
		}
		vertexPairs.name = "Network Vertex Pairs";
		return vertexPairs;
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles(THREETextures) {
		return function(data, colors, settings) {
			var defaults = {
				particles: 0,
				visible: true,
				color: "#fff000",
				size: 200,
				opacity: 0.8,
				map: "particle",
				depthtest: true,
				alphatest: 0.5,
				transparent: true
			};
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var particlesGeometry = getGeometry(data);
			particlesGeometry.computeBoundingSphere();

			var vertexColors = [];
			for( var i = 0; i < particlesGeometry.vertices.length; i++ ) {
				// BASE COLOR
				vertexColors[i] = new THREE.Color("rgb(255,255,255)");
			}
			particlesGeometry.colors = vertexColors;

			var particleTexture = THREETextures.get(this.map);

			var particlesMaterial = new THREE.PointsMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: particleTexture,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			var particles = new THREE.Points( particlesGeometry, particlesMaterial );
			// particles.sortParticles = true;
			particles.name = "Particles";
			
			return particles;
		};
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Particles Geometry";
		return vertexGeometry;
	}
		
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneController', SceneController);

	function SceneController($scope) {

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};

		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentScene', tkComponentScene);

	function tkComponentScene($rootScope, THREEService, THREEPlugins, Particles, Chromatin, Network) {
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
						/* component-controller == element[0].children[0]
						 * - component-header == element[0].children[0].children[0]
						 * - component-body == element[0].children[0].children[3]
						 */
						// component = element[0].parentNode;
						// console.log(component.clientWidth);
						viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
						// if with controller use line below
						// viewport = element[0].children[0].children[3];

						// width = component.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width); // USE UNTIL DOM CHECK AVAILBLE
						// height = component.clientHeight;
						height = parseInt(scope.state.height); // USE UNTIL DOM CHECK AVAILBLE
						// OJO! DOM NOT READY
						// console.log(element[0].firstChild.children[2].clientWidth);
				
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
						// 			console.log( value );
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

(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackBarchart', tkComponentTrackBarchart);

	function tkComponentTrackBarchart(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.load().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = 10,
						nodePadding = 0,
						nodeColor = scope.view.settings.color,
						harmonicsColor = scope.overlay.palette[0],
						lowerBoundsColor = scope.overlay.palette[1];

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, yScale, axisX, axisY, brush, chart;
					var defs, focus, zoomArea, container, axis, labels, harmonics, lowerBounds, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getColor = function(code) {
						var colorCodes = [
											{"type":"harmonic","code":"H","color":"#4CAF50"},
											{"type":"upperBound","code":"L","color":"#0000ff"},
											{"type":"lowerBound","code":"U","color":"#ff00ff"},
											{"type":"contact","code":"C","color":"#00ff00"}
										];
						var color = "#ccc";
						for (var i = colorCodes.length - 1; i >= 0; i--) {
							if (code == colorCodes[i].code) {
								color = colorCodes[i].color;
							}
						}
						return color;
					};

					scope.getOpacity = function(value) {
						var opacity;
						var scaled = value / 5; // 5 being the limit...
						opacity = scaled * scaled;
						return opacity;
					};

					scope.getStrokeWidth = function(value) {
						var strokeWidth = 10;
						var scaled = value / 5; // 5 being the limit...
						strokeWidth = strokeWidth * scaled;
						return strokeWidth;
					};

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.top - margin.bottom;
						var verticalOffset = height * 0.5;
						var particleWidth = (1 * width) / particlesCount;
						var barWidth = particleWidth;

						// var y0 = Math.max(Math.abs(d3.min(data)), Math.abs(d3.max(data)));

						xScale = d3.scale.linear()
								.range([0, width])
								.domain([focusStart, focusEnd])
								.clamp(true);

						yScale = d3.scale.linear()
								.domain([-5, 5])
								.range([0, height]);

						axisY = d3.svg.axis()
								.scale(yScale)
								.orient("left")
								.ticks(6)
								.outerTickSize(1);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.append("g")
							.attr("class", "y axis")
							.append("line")
							.attr("y1", yScale(0))
							.attr("y2", yScale(0))
							.attr("x1", 0)
							.attr("x2", width);


						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs")
							.append("clipPath")
							.attr("id", "clip")
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						// zoomArea = focus.append("g")
						// 	.attr("class", "zoom")
						// 	.append("rect")
						// 	.attr("width", width)
						// 	.attr("height", height)
						// 	.style('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', 'url(#clip)');
						harmonics  = container.append("g")
							.attr("class", "harmonics");
						lowerBounds  = container.append("g")
							.attr("class", "lowerbounds");

						axis = focus.append("g")
							.attr("class", "axis y")
							.call(axisY);

						labels  = chart.append("g")
							.attr("class", "labels");

						// if (scope.view.viewtype == "default") {
							harmonics.selectAll("rect") // RED
								.data(data.harmonics)
								.enter().append("rect")
								.attr("x", function(d) { return (d[1] * barWidth); } )
								.attr("y", function(d) { return yScale( d[3] ); } )
								.attr("width", barWidth)
								.attr("height", function(d) { return yScale( d[3] ); })
								.style("fill", harmonicsColor)
								// .style("fill-opacity", function(d) { return scope.getOpacity(d[3]); })
								.style("stroke", harmonicsColor)
								.style("stroke-width", 0)
								.append("svg:title")
									.text(function(d,i) { return i + ":" + d; });

							lowerBounds.selectAll("rect") // BLUE
								.data(data.lowerBounds)
								.enter().append("rect")
								.attr("x", function(d) { return (d[1] * barWidth); } )
								.attr("y", function(d) { return yScale( Math.max(0, (d[3] * -1.0))); } )
								.attr("width", barWidth)
								.attr("height", function(d) { return yScale( d[3] ); })
								.style("fill", lowerBoundsColor)
								// .style("fill-opacity", function(d) { return scope.getOpacity(d[3]); })
								.style("stroke", lowerBoundsColor)
								.style("stroke-width", 0)
								.append("svg:title")
									.text(function(d,i) { return i + ":" + d; });

						// }

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.current.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						// highlight
						// 	.call(brush.extent([(scope.settings.current.position), 0]))
						// 	.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentBedgraph', tkComponentBedgraph);

	function tkComponentBedgraph(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.load().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					// var assemblyLength = 3200000000; // CALCULATE
					// if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var step = scope.view.settings.step;
					var stepWidth;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					// var chrStart = 0;
					// var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					// var highlightPosition = focusStart + (stepWidth * scope.settings.current.position);

					// var focusScale = assemblyLength / focusLength;
					// var focusMargin = focusScale * 0.05;
					// focusScale = focusScale - (focusMargin * 2.0);
		
					// var focusCenter = focusLength * 0.5;
					// var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE implies complete redraw
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW on new data
					// scope.$watch('data', function(newData) {
					// 	scope.render(newData);
					// }, true);
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newData) {
						scope.update();
					}, true);

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;
							stepWidth = (step * width) / focusLength;
							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //stepWidth;// * width / focusLength;
							// if (highlightWidth < 4) highlightWidth = 4; 
							// var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
								.attr("id", "clip")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.style('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							// chart.select(".focus").append("g")
							// 	.attr("class", "x axis")
							// 	.attr("transform", "translate(0," + nodeHeight + ")");
								// .call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");

							// TODO: Use FontAwesome/IcoMoon...
							// node.append('text')
							//     .attr('font-family', 'FontAwesome')
							//     .attr('font-size', function(d) { return d.size+'em'} )
							//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
								.attr("x", function(d, i) { return Math.floor(xScale(d.start)); } )
								.attr("y", verticalOffset)
								.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); })
								.attr("height", nodeHeight)
								.attr("class", function(d) { if (d.read == 1) return scope.title; } )
								// .style("fill", nodeColor)
								// .style("fill-opacity", function(d) { return d.read; })
								// .style("stroke", nodeColor)
								// .style("stroke-width", 0)
								.append("svg:title")
								.text(function(d,i) { return d.start + ":" + d.end + "(" + d.read + ")"; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						// 	var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
						// 		height = trackHeight - margin.top - margin.bottom;
						// 	stepWidth = (step * width) / focusLength;

						// svg.select("g.x.axis").call(xAxis);
						// container.selectAll("rect")
						// .attr("x", function(d, i) { return (i + 1) * stepWidth; } )	
						// .attr("y", verticalOffset)
						// .attr("width", stepWidth)
						// .attr("height", nodeHeight);

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackGenes', tkComponentTrackGenes);

	function tkComponentTrackGenes(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.load().then(function(d3) {

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var assemblyLength = 3200000000; // CALCULATE
					if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var positions = 100; //scope.positions; // == ?
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var chrStart = 0;
					var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					var positionWidth = 1000; //focusLength / positions; // derive from...?
					// var highlightPosition = focusStart + (positionWidth * scope.settings.current.position);

					var focusScale = assemblyLength / focusLength;
					var focusMargin = focusScale * 0.05;
					focusScale = focusScale - (focusMargin * 2.0);
		
					var focusCenter = focusLength * 0.5;
					var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = 10,
						nodePadding = 0;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data', function(newData, oldData) {
						if ( newData !== oldData ) {
							scope.render(newData);
						}
					});
					// }, true); // FOR DEEP WATCH
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;

							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //positionWidth * width / focusLength;
							// if (highlightWidth < 1) highlightWidth = 1; 
							var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
								.attr("id", "clip")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.style('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							var axis = focus.append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + nodeHeight + ")")
								.call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 8)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text("<<");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 18)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text(">>");
// TODO: Use FontAwesome/IcoMoon...
// node.append('text')
//     .attr('font-family', 'FontAwesome')
//     .attr('font-size', function(d) { return d.size+'em'} )
//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
								.attr("x", function(d) { return Math.floor(xScale(d.start)); } )
								.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
								.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
								.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  )
								.attr("class", function(d) {
									var biotypeClass = d.biotypeStyle;
									if (d.strand < 1) {biotypeClass += " forward-strand";}
									else {biotypeClass += " reverse-strand";}
									return biotypeClass; } )
								.append("svg:title")
								.text(function(d) { return d.external_name; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						svg.select("g.x.axis").call(xAxis);
						container.selectAll("rect")
						.attr("x", function(d) { return Math.floor(xScale(d.start)); } )	
						.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
						.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
						.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  );

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackProximities', tkComponentTrackProximities);

	function tkComponentTrackProximities(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.load().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

					// save data matrix for re-slicing as position changes
					// scope.dataMatrix = scope.data;

					// FYI: data == distances
					// eg. particles a=rst,b=uvw,c=xyz
					// give matrix [aa,ab,ac,ba,bb,bc,ca,cb,cc]
					// can be filtered by no. of particles
					// totalMatrixVertices / (totalParticeles * 3)
 					var data = scope.data.distances;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;
					var clipPathUrl = "clip" + scope.title;
					var clipPath = "url(#" + clipPathUrl + ")";

					/* Note: focusLength may not be exactly particlesCount (N) * resolution
					 * BUT for now the last bin resolution is taken as equal to the others
					 * In the future TADbit may output variable bin resolutions
					 * eg. as an array of resolutions corresponding to the bins/particles
					 * Then the code commented below can be developed/completed
					 * to assess and assign the last index of data
					 * This may be better done externally to the track modules
					 * and the results accessed through, for example, view.settings.resolutions
					 */
					// var resolution = scope.view.resolution;
					// var particlesCount = focusLength / resolution;
					// var exactCount = function(particlesCount) { return parseInt(particlesCount) === particlesCount };
					// var resolutionParticleN = exactCount;
					// if (!exactCount) resolutionParticleN = focusLength - (resolution * (n-1));
					// var particles = Math.ceil(particlesCount);

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, xAxis, brush, chart;
					var defs, focus, zoomArea, container, labels, focusGraph, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data.distances;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });


					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.top - margin.bottom;
						var particleWidth = (1 * width) / particlesCount;
						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);
				
						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("top")
								.ticks(0)
								.outerTickSize(0);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs")
							.append("clipPath")
							.attr("id", clipPathUrl)
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						// zoomArea = focus.append("g")
						// 	.attr("class", "zoom")
						// 	.append("rect")
						// 	.attr("width", width)
						// 	.attr("height", height)
						// 	.attr('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', clipPath);

						labels  = chart.append("g")
							.attr("class", "labels");
	
						focusGraph = container.selectAll("rect")
							.data(data)
							.enter().append("rect")
							.attr("x", function(d, i) { return (i * particleWidth); } )
							.attr("y", verticalOffset)
							.attr("width", particleWidth)
							.attr("height", nodeHeight)
							.style("fill", nodeColor)
							.style("fill-opacity", function(d) { return (d * d); })
							.style("stroke", nodeColor)
							.style("stroke-width", 0)
							.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.current.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						highlight
							.call(brush.extent([(scope.settings.current.position), 0]))
							.call(brush.event);
					};

					// UPDATE
					scope.update = function() {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackRestraints', tkComponentTrackRestraints);

	function tkComponentTrackRestraints(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {

				d3Service.load().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;
					var clipPathUrl = "clip" + scope.title;
					var clipPath = "url(#" + clipPathUrl + ")";

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						maxValue = 2,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeSize = scope.view.settings.nodeSize,
						verticalOffset = margin.top + (nodeSize * 0.5),
						nodePadding = 0,
						nodeColor = scope.view.settings.color,
						harmonicsColor = scope.overlay.palette[0],
						lowerBoundsColor = scope.overlay.palette[1];

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, axisUpper, axisLower, brush, chart;
					var defs, focus, zoomArea, container, labels, harmonics, lowerBounds, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(scope.data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getColor = function(code) {
						var colorCodes = [
											{"type":"harmonic","code":"H","color":"#4CAF50"},
											{"type":"upperBound","code":"L","color":"#0000ff"},
											{"type":"lowerBound","code":"U","color":"#ff00ff"},
											{"type":"contact","code":"C","color":"#00ff00"}
										];
						var color = "#ccc";
						for (var i = colorCodes.length - 1; i >= 0; i--) {
							if (code == colorCodes[i].code) {
								color = colorCodes[i].color;
							}
						}
						return color;
					};

					scope.getOpacity = function(value) {
						var opacity;
						var scaled = value / maxValue; // 5 being the limit...
						opacity = scaled * scaled;
						return opacity;
					};

					scope.getStrokeWidth = function(value) {
						var strokeWidth = 5;
						var scaled = value / 5; // 5 being the limit...
						strokeWidth = strokeWidth * scaled;
						return strokeWidth;
					};

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right;
						var height = trackHeight - margin.top - margin.bottom;
						var particleWidth = (1 * width) / particlesCount;
						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);
				
						axisUpper = d3.svg.axis()
								.scale(xScale)
								.orient("top")
								.ticks(0)
								.outerTickSize(0);

						axisLower = d3.svg.axis()
								.scale(xScale)
								.orient("bottom")
								.ticks(0)
								.outerTickSize(0);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs");

						defs.append("clipPath")
							.attr("id", clipPathUrl)
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						// defs.append("svg:marker")
						// 	.attr("id", "harmonics-marker")
						// 	.attr("viewBox", "0 -3 8 6")
						// 	.attr("refX", 20)
						// 	.attr("refY", 0)
						// 	.attr("markerWidth", 8)
						// 	.attr("markerHeight", 6)
						// 	.attr("orient", "auto")
						//     .append('svg:path')
						// 		.attr('d', "M8,-3 L0,0 L8,6")
						// 		.attr("stroke", harmonicsColor)
						// 		.attr("stroke-width", 1) // get from line?
						// 		.attr('fill', "none");

						// defs.append("svg:marker")
						// 	.attr("id", "lowerbounds-marker")
						// 	.attr("viewBox", "0 -3 8 6")
						// 	.attr("refX", 8)
						// 	.attr("refY", 0)
						// 	.attr("markerWidth", 8)
						// 	.attr("markerHeight", 6)
						// 	.attr("orient", "auto")
						//     .append('svg:path')
						// 		.attr('d', "M0,-3 L8,0 L0,3")
						// 		.attr("stroke", lowerBoundsColor)
						// 		.attr("stroke-width", 1) // get from line?
						// 		.attr('fill', "none");

						focus = chart.append("g")
							.attr("class", "focus");

						harmonics = focus.append("g")
							.attr("class", "harmonics")
							.attr('clip-path', clipPath);

						lowerBounds = focus.append("g")
							.attr("class", "lowerbounds")
							.attr('clip-path', clipPath);

						labels  = chart.append("g")
							.attr("class", "labels");

							// HARMONICS
							// from:
							harmonics.append("rect")
								.attr("x", (data.dimension * particleWidth - (particleWidth)))
								.attr("y", verticalOffset - (nodeSize * 0.5))
								.attr("width", particleWidth)
								.attr("height", nodeSize)
								// .style("stroke", harmonicsColor)
								// .style("stroke-width", 1)
								.style("fill", harmonicsColor)
								.append("svg:title")
									.text(data.dimension);
							// connector:
							harmonics.selectAll("line")
								.data(data.harmonics)
								.enter()
								.append("line")
									.attr("x1", function(d) { return (d[0] * particleWidth - (particleWidth * 0.5)); })
									.attr("y1", verticalOffset)
									.attr("x2", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("y2", height - nodeSize)
									.attr("marker-end", "url(#harmonics-marker)")
									.style("stroke", harmonicsColor)
									.style("opacity", 1)//function(d) { return scope.getOpacity(d[3]); } )
									.style("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); })
									.append("svg:title")
										.text(function(d) { return d[1] + ":" + d[3]; });
							// to:
							// harmonics.selectAll("polygon")
							// 	.data(data.harmonics)
							// 	.enter()
							// 	.append("polygon")
							// 		.attr("points", function(d) {
							// 			var x = (d[1] * particleWidth) - (particleWidth * 0.5);
							// 			var y = height;
							// 			var points = x+","+(y-nodeSize)+" "+(x+(nodeSize*0.5))+","+y+" "+(x-(nodeSize*0.5))+","+y;
							// 			return points;
							// 		} )
							// 		.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
							// 		.attr("fill", harmonicsColor)
							// 	.append("svg:title")
							// 		.text(function(d) { return d[1] + ":" + d[3]; });
							harmonics.selectAll("circle")
								.data(data.harmonics)
								.enter()
								.append("circle")
									.attr("cx", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("cy", height - nodeSize)
									.attr("r", (nodeSize * 0.5))
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("fill", harmonicsColor)
								.append("svg:title")
									.text(function(d) { return d[0] + " : " + d[1]; });

							// LOWERBOUNDS
							// from:
							lowerBounds.append("rect")
								.attr("x", (data.dimension * particleWidth - (particleWidth)))
								.attr("y", (height - (nodeSize * 1.5)))
								.attr("width", particleWidth)
								.attr("height", nodeSize)
								// .style("stroke", lowerBoundsColor)
								// .style("stroke-width", 1)
								.style("fill", lowerBoundsColor)
								.append("svg:title")
									.text(data.dimension);
							// connector:
							lowerBounds.selectAll("line")
								.data(data.lowerBounds)
								.enter()
								.append("line")
									.attr("x1", function(d) { return (d[0] * particleWidth - (particleWidth * 0.5)); })
									.attr("y2", verticalOffset)
									.attr("x2", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("y1", height - nodeSize)
									.attr("marker-end", "url(#lowerbounds-marker)")
									.style("stroke", lowerBoundsColor)
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); })
									.append("svg:title")
										.text(function(d) { return d[1] + ":" + d[3]; });
							// to:
							// to:
							// lowerBounds.selectAll("polygon")
							// 	.data(data.lowerBounds)
							// 	.enter()
							// 	.append("polygon")
							// 		.attr("points", function(d) {
							// 			var x = (d[1] * particleWidth) - (particleWidth * 0.5);
							// 			var y = verticalOffset - nodeSize;
							// 			var points = x+","+y+" "+(x+(nodeSize*0.5	))+","+(y+nodeSize)+" "+(x-(nodeSize*0.5))+","+(y+nodeSize);
							// 			return points;
							// 		} )
							// 		.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
							// 		.style("fill", lowerBoundsColor)
							// 	.append("svg:title")
							// 		.text(function(d,i) { return d[1] + ":" + d[3]; });
							lowerBounds.selectAll("circle")
								.data(data.lowerBounds)
								.enter()
								.append("circle")
									.attr("cx", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("cy", verticalOffset)
									.attr("r", (nodeSize * 0.5))
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("fill", lowerBoundsColor)
								.append("svg:title")
									.text(function(d) { return d[0] + " : " + d[1]; });

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", xScale(scope.settings.current.position))
								.attr("y", 0)
								.attr("width", highlightWidth)
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						// highlight
						// 	.call(brush.extent([(scope.settings.current.position), 0]))
						// 	.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackSlider', tkComponentTrackSlider);

	function tkComponentTrackSlider(d3Service, Settings) {
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.load().then(function(d3) {
				
					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

					// SVG GENERATION
					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var cursorWidth = scope.view.settings.cursorWidth;
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						trackHeight = parseInt(scope.view.settings.heightInner);

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
						// console.log(component.clientWidth);
					var viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var slider, xScale, prime3Axis, prime5Axis;
					var handleWidth, handleHeight;
					var xAxis, brush, handle, position;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render();
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.render = function() {
						svg.selectAll('*').remove();
						
						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.bottom - margin.top;

						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);

						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("bottom")
								.ticks(4);
							prime3Axis = d3.svg.axis().orient("left");
							prime5Axis = d3.svg.axis().orient("right");
								// .outerTickSize([0]);

						handleWidth = height * 0.5;
						handleHeight = trackHeight;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						slider = svg.attr("width", width + margin.left + margin.right)
								.attr("height", height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + ", " + 0 + ")");

							var labels  = slider.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -16)
									.attr("y", 26)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text("3'");
								labels.append("text")
									.attr("x", width + 8)
									.attr("y", 26)
									.style("text-anchor", "left")
									.style("font-size", "10px")
									.text("5'");

						var axis = slider.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis)
							.select(".domain")
							.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
							.attr("class", "halo");

						slider.append("g")
							.attr("class", "slider")
							.call(brush);

						slider.select(".background")
							.attr("y", height/2)
							.attr("height", height);
							
						handle = slider.append("circle")
							.attr("id", "handle")
							.attr("class", "handle")
							.attr("cx", xScale(scope.settings.current.position))
							.attr("cy", height)
							.attr("r", handleWidth * 0.6);

						position = slider.append("text")
							.attr("id", "position")
							.attr("x", xScale(scope.settings.current.position) - (handleWidth * 0.5))
							.attr("y", height - 10)
							.style("text-anchor", "bottom")
							.style("font-family", "sans-serif")
							.style("font-size", "10px")
							.style("color", "#333")
							.text(scope.settings.current.particle);

						slider
							.call(brush.extent([(scope.settings.current.position), 0]))
							.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#handle") //.style("visibility", "hidden");
						.attr("cx", xScale(scope.settings.current.position) );
						svg.select("#position") //.style("visibility", "hidden");
						.attr("x", (xScale(scope.settings.current.position) - (handleWidth * 0.5)) )
						.text(scope.settings.current.particle);
					};

					// BRUSH
					scope.brushed = function() {
						// scope.safeApply( function() {
							var thisSlider = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisSlider)[0]));
									brush.extent([value, value]);
								}
								handle.attr("cx", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segment = Settings.getSegment();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentWiggle0', tkComponentWiggle0);

	function tkComponentWiggle0(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.load().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					// var assemblyLength = 3200000000; // CALCULATE
					// if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var step = scope.view.settings.step;
					var stepWidth;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					// var chrStart = 0;
					// var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					// var highlightPosition = focusStart + (stepWidth * scope.settings.current.position);

					// var focusScale = assemblyLength / focusLength;
					// var focusMargin = focusScale * 0.05;
					// focusScale = focusScale - (focusMargin * 2.0);
		
					// var focusCenter = focusLength * 0.5;
					// var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE implies complete redraw
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW on new data
					// scope.$watch('data', function(newData) {
					// 	scope.render(newData);
					// }, true);
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newData) {
						scope.update();
					}, true);

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;
							stepWidth = (step * width) / focusLength;
							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //stepWidth;// * width / focusLength;
							// if (highlightWidth < 4) highlightWidth = 4; 
							// var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
									.attr("id", "clip")
								.append("rect")
									.attr("width", width)
									.attr("height", height)
									.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.attr('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							// chart.select(".focus").append("g")
							// 	.attr("class", "x axis")
							// 	.attr("transform", "translate(0," + nodeHeight + ")");
								// .call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");

							// TODO: Use FontAwesome/IcoMoon...
							// node.append('text')
							//     .attr('font-family', 'FontAwesome')
							//     .attr('font-size', function(d) { return d.size+'em'} )
							//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
									.attr("x", function(d, i) { return (i + 1) * stepWidth; } )
									.attr("y", verticalOffset)
									.attr("width", stepWidth)
									.attr("height", nodeHeight)
									.style("fill", nodeColor)
									.style("fill-opacity", function(d) { return d; })
									.style("stroke", nodeColor)
									.style("stroke-width", 0)
									.append("svg:title")
										.text(function(d,i) { return i + ":" + d; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						// 	var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
						// 		height = trackHeight - margin.top - margin.bottom;
						// 	stepWidth = (step * width) / focusLength;

						// svg.select("g.x.axis").call(xAxis);
						// container.selectAll("rect")
						// .attr("x", function(d, i) { return (i + 1) * stepWidth; } )	
						// .attr("y", verticalOffset)
						// .attr("width", stepWidth)
						// .attr("height", nodeHeight);

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TrackController', TrackController);

	function TrackController($scope) {
		// if ($scope.overlay) {
		// 	// console.log($scope.overlay.object.id);
		// 	// console.log($scope.overlay.object.state.overlaid);
		// 	$scope.overlaid = $scope.overlay.object.state.overlaid;
		// 	$scope.overlayOrig = Overlays.getOverlay(); // current overlay
		// 	$scope.toggleOverlay = function(index) {
		// 		$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
		// 		if (!$scope.overlaid) {
		// 			Overlays.setOverlaid(index);
		// 			Overlays.set(index);
		// 		} else {
		// 			Overlays.setOverlaid($scope.overlayOrig.object.state.index);
		// 			Overlays.set($scope.overlayOrig.object.state.index);
		// 		}
		// 		$scope.overlaid = !$scope.overlaid;
		// 	};
		// }

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('HomeController', HomeController);

	function HomeController ($scope){

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $stateParams, $scope, Settings, Users, Projects, Datasets, Overlays, Storyboards) {

		if (!$scope.settings) {
			$scope.settings = Settings.get();
		}
		$scope.settings.app.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.app.isProject = $state.is('project');
		});

		// BUILD DEFAULT DATA HIERARCHY
		// USERS >> PROJECTS >> DATASETS | OVERLAYS | STORYBOARDS
		if (!$scope.users) {
			$scope.users = Users.get();
			if (typeof $scope.users.loaded[0].projects !== "undefined" && $scope.users.loaded[0].projects.length === 0) {
				$scope.users.loaded[0].projects = Projects.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].datasets !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].datasets.length === 0)
					$scope.users.loaded[0].projects.loaded[0].datasets = Datasets.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].overlays !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].overlays.length === 0)
					$scope.users.loaded[0].projects.loaded[0].overlays = Overlays.get();
				if (typeof $scope.users.loaded[0].projects.loaded[0].storyboards !== "undefined" &&  $scope.users.loaded[0].projects.loaded[0].storyboards.length === 0)
					$scope.users.loaded[0].projects.loaded[0].storyboards = Storyboards.get();
			}
		}
		
		// SET SHARED CURRENT PROJECT LEVEL DATA
		$scope.current = {};
		$scope.current.user = Users.getUser();
		$scope.current.project = Projects.getProject();
		$scope.current.dataset = Datasets.getDataset();
		$scope.current.model = Datasets.getModel();
		$scope.current.overlay = Overlays.getOverlay();
		$scope.current.storyboard = Storyboards.getStoryboard();

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayImportController', OverlayImportController);

	function OverlayImportController ($state, $scope, $mdDialog, $mdToast, Settings, CustomTracks, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Overlays Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: OverlayImportController,
				locals: {
					overlays: $scope.$parent.overlays,
				},
				onComplete: afterShowAnimation
			}).then(function(importedOverlaysCount) {
				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + importedOverlaysCount + ") added")
				);
			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('cancelled')
				);
	 			$state.go('browser');	
			});
			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				// console.log(scope);
				console.log("showing dialog");
			}
		});

		$scope.parseFile = function($fileContent) {
			$scope.fileData = CustomTracks.parse($fileContent).data;
			// Selected Rows in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;} // initially set all to selected
			// Selected Columns in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			console.log("File Opened...");
		};

		$scope.importData = function(parsedData) {
			$scope.importedOverlays = CustomTracks.import(parsedData, $scope.selectedRows, $scope.selectedCols);
			$mdDialog.hide($scope.importedOverlays.length); // overlays count passed for dialog hide message...
			$state.go('browser');
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.overlaysAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkOverlayImport', tkOverlayImport);

	function tkOverlayImport($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkOverlayImport : "&",
				filetitle : "="
			},
			link: function(scope, element, attrs) {
				element.on('change', function(e) {
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function() {
							// console.log("here in apply");
							scope.tkOverlayImport({$fileContent:e.target.result});
						});
					};
					reader.readAsText((e.srcElement || e.target).files[0]);
					scope.filetitle = (e.srcElement || e.target).files[0].name;
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectContentController', ProjectContentController);

	function ProjectContentController($scope) {


	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($state, $scope, Datasets, Overlays, Components, Segments){
		// console.log($scope);

		// Get dataset clusters scene component
		$scope.clusterComponent = Components.getComponentById("dataset-clusters");

		// Set cluster color to gradient
		// Recalculate specifically for single segment per particle in cluster scene
		var gradientOverlay = Overlays.getOverlayById("gradient");
		var clusterLength = $scope.current.model.data.length / $scope.current.dataset.object.components;
		var gradientColors = Segments.gradientHCL(gradientOverlay, clusterLength);
		$scope.clusterComponent.overlay = gradientColors;

		// Calculate consistent camera position (translation) from combined dataset models
		var datasetModels = new THREE.BufferGeometry();
		for (var h = $scope.current.dataset.models.length - 1; h >= 0; h--) {
			datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.current.dataset.models[i], 3 ) );
		}
		datasetModels.computeBoundingSphere();
		$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius;

		// Create collection of cluster models
		$scope.clusters = [];
		var clusterLists = $scope.current.dataset.clusters;
		var models = $scope.current.dataset.models;
		for (var i = clusterLists.length - 1; i >= 0; i--) {
			var cluster = {};
			cluster.number = i + 1;
			cluster.list = clusterLists[i];
			cluster.centroidIndex = cluster.list.indexOf(Datasets.getCentroid(cluster.number));
			cluster.data = [];
			for (var j = cluster.list.length - 1; j >= 0; j--) {
				var modelData;
				for (var k = models.length - 1; k >= 0; k--) {
					var model = models[k];
					if (parseInt(model.ref) == cluster.list[j]) {
						modelData = model.data;
						// console.log("Model " + model.ref + " in Cluster " + cluster.number);
					}
				}
				if (modelData) {cluster.data.unshift(modelData);}
					else {console.log("Listed model not found!");}
			}
			// Add cluster to cluster collection
			$scope.clusters.unshift(cluster);
		}
		// console.log($scope.clusters);


		// On click set selected cluster
		$scope.selectCluster = function(index) {
			$scope.clusterArray = Datasets.setCluster(index + 1);
			$scope.centroidRef = Datasets.getCentroid();
			console.log("Current Cluster: " + (index + 1) + "(Centroid Model: " + $scope.centroidRef + ")");
			$state.go('browser');
		};

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkProjectDropzone', tkProjectDropzone);

	function tkProjectDropzone($state, $parse) {    
		return {
			restrict: 'A',
			// template: '<div>tkProjectDropzone is functioning</div>', // uncomment to test if directive is functioning
			link: function (scope, element, attrs) {

				var expression = attrs.dropzone;
				var accesor = $parse(expression);

				var onDragOver = function(e) {
					e.preventDefault();
					element.addClass("dragOver");
				};

				var onDragEnd = function(e) {
					e.preventDefault();
					element.removeClass("dragOver");
				};

				// OJO! UNTESTED CODE
				// var onDrop = function(e) {
				// 	e.stopPropagation();
				// 	e.preventDefault();
				// 	var files = e.dataTransfer.files;
				// 	for (var i = 0; i <= files.length; i++) {
				// 		var f = files[i];
				// 		var reader = new FileReader();
				// 		reader.readAsArrayBuffer(f);
				// 		reader.onload = (function(theFile) {
				// 			return function(e) {
				// 				var newFile = { name : theFile.name,
				// 					type : theFile.type,
				// 					size : theFile.size,
				// 					lastModifiedDate : theFile.lastModifiedDate
				// 				};
				// 				scope.addfile(newFile);
				// 			};
				// 		})(f);
				// 	}
				// };

				var loadFile = function (file) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						scope.$apply(function() {
							// HERE: call the parsed function correctly (with scope AND params object)
							accesor(scope, {$fileContent:onLoadEvent.target.result});
							scope.addDataset(onLoadEvent.target.result);
							// $state.go('dataset');
						});
					};
					reader.readAsText(file);
					console.log("File loaded...");
				};

				element.bind("dragover", onDragOver)
							 .bind("dragleave", onDragEnd)
							 .bind("drop", function (e) {
									 onDragEnd(e);
									 loadFile(e.dataTransfer.files[0]);
							 });

				scope.$watch(expression, function () {
						element.attr("src", accesor(scope));
				});

				// element.bind("drop", onDrop);

			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $state, $stateParams, $scope, Datasets, Overlays, Storyboards) {

		$scope.updateCurrent = function() {
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Datasets.getModel();
			$scope.current.overlay = Overlays.getOverlay();
			$scope.current.storyboard = Storyboards.getStoryboard();
			console.log("Current dataset, model, overlay and storyboard updated.");			
		};

		// On click load dataset from URL Params
		// Loads local JSON and then associated TSV tracks from /examples folder
		$scope.loadDatasetFromParam = function() {
			var loading = Datasets.load($stateParams.loadDataset);
			return $q.all([ loading ])
			.then(function(results){
				$scope.updateCurrent();
				console.log("Dataset loaded: " + $stateParams.loadDataset);			
				$state.go('browser');
			});
		};
		if ($stateParams.loadDataset) $scope.loadDatasetFromParam();

		// On dropzone (load external file)
		// Adds JSON to current project - load TSV when in browser
		$scope.addDataset = function($fileContent) {
			var adding = Datasets.add($fileContent);
			return $q.all([ adding ])
			.then(function(results){
				$scope.updateCurrent(); // NEEDED? Move to function in Settings Service???
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset added."); //: " + $stateParams.loadDataset);			
				$state.go('dataset');
			});
		};		
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkProjectLoader', tkProjectLoader);

	function tkProjectLoader($state, $parse) {		
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
				var fn = $parse(attrs.tkProjectLoader);
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						console.log("Data Loaded");
						scope.$apply(function() {
						// HERE: call the parsed function correctly (with scope AND params object)
							fn(scope, {$fileContent:onLoadEvent.target.result});
							// $state.go('dataset');
						});
					};
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectOverlayController', ProjectOverlayController);

	function ProjectOverlayController($scope) {

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectStoryboardController', ProjectStoryboardController);

	function ProjectStoryboardController($scope) {

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarBrowserController', SidebarBrowserController);

	function SidebarBrowserController ($scope, Settings){

		// Model Settings
		$scope.toggleSetting = function(setting) {
			$scope.settings = Settings.toggle(setting); // update $scope.settings defined in browser controller
		};

		// Scene Settings
		// $scope.toggleScene = function(scene) {
		// 	$scope.scenes = Scenes.toggle(scene); // update $scope.scenes defined in browser controller
		// };

		// Track overlays
		// $scope.toggleTrack = function(track) {
		// 	console.log(track);
		// 	$scope.tracks = Tracks.toggle(track); // update $scope.tracks defined in browser controller
			// $scope.colors = $scope.colors; // CHANGE OF COLOR USED BY SCENE DONE IN SCENE CONTROLLER ie. Here only set current color
		// };
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarProjectController', SidebarProjectController);

	function SidebarProjectController ($scope, Datasets, Overlays, Storyboards){

		$scope.setCurrentDataset = function(index) {
			Datasets.set(index);
		};
		$scope.setCurrentOverlay = function(index) {
			Overlays.set(index);
		};
		$scope.setCurrentStoryboard = function(index) {
			Storyboards.set(index);
		};

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarUserController', SidebarUserController);

	function SidebarUserController ($scope){

		// // User Profile
		// $scope.user = function(user) {
		// 	$scope.user.profile = Settings.getProfile(user);
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($window, $scope, Settings, Storyboards, Components, Overlays, Proximities, Restraints) {

		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		// $scope.current.storyboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.current.segmentLength;

		$scope.settings.views.scale = 1; //$scope.current.dataset.object.scale;
		Storyboards.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);
		Components.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);

		// Calculating Initial Proximities
		//NOTE in future if more than 1 currentModel need same number of currentProximities
		$scope.allProximities = Proximities.get(); // for Scene
		$scope.currentProximities = Proximities.at($scope.settings.current.particle); // for D3 tracks

		// Calculating Initial Restraints
		//NOTE in future if more than 1 currentModel need same number of currentRestraints
		$scope.currentRestraints = Restraints.at($scope.settings.current.particle); // for D3 tracks

		// Assign data and overlays for each component by type
		angular.forEach( $scope.current.storyboard.components, function(component, index) {

			// if (component.object.dataset == "default") {
				var overlay, overlayProximities;
				if (component.object.type == "scene") {
					component.data = $scope.current.model.data;
					 // component.proximities required for Scenes: overlay.colors Saturation
					component.proximities = $scope.allProximities;
					component.overlay = $scope.current.overlay;
					component.overlay.state = {};
					component.overlay.object.state.index = Overlays.getCurrentIndex();
				} else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
					overlay = Overlays.getOverlayById("genes");
					component.data = overlay.data;
					// component.overlay required for toggle
					component.overlay = overlay;
				} else if (component.object.type == "track-proximities") {
					// ie only one... see note above for Calculating Proximities
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentProximities;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("proximities");
					component.overlay = overlay;
				} else if (component.object.type == "track-restraints") {
					// ie only one... see note above for Calculating Restraints
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentRestraints;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("restraints");
					component.overlay = overlay;
				}
				// } else if (component.object.type == "track-wiggle") {
				// 	overlay = Overlays.getOverlayById(component.object.dataset);
				// 	component.data = overlay.data;
				// 	component.overlay = overlay; // required for toggle
				// } else {
				// 	// slider and other types of component...
				// }
			// }
		});

		// Watch for Slider Position updates
		$scope.$watch('settings.current.particle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
			if ( newParticle !== oldParticle ) {
				$scope.currentProximities = Proximities.at(newParticle); // for D3 tracks
				$scope.currentRestraints = Restraints.at(newParticle); // for D3 tracks
				if ($scope.current.overlay.object.type == "matrix") {
					Overlays.at(newParticle);
					$scope.current.overlay = Overlays.getOverlay();
				} 
				// console.log($scope.currentProximities);
			}
		});

		// save original overlaid
		$scope.overlayOrig = $scope.current.overlay;
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.current.overlay = Overlays.getOverlay();
				// console.log($scope.current.overlay);
			} else {
				Overlays.setOverlaid($scope.overlayOrig.object.state.index);
				Overlays.set($scope.overlayOrig.object.state.index);
				$scope.current.overlay = Overlays.getOverlay();
			}
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};

		$scope.testfn = function() {
			console.log("test worked");
		};

		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TopbarController', TopbarController);

	function TopbarController($state, $scope, $mdSidenav) {

		$scope.$state = $state;
		if ($state.includes('main.project')){
			$scope.projectTitle = $scope.users[0].projects[0].object.title;
		}

		$scope.toggleLeft = function() {
			$mdSidenav('left').toggle();
		};

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Components', Components);

	function Components($q, $http, uuid4) {
		var components = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-components.json";
				if( components.loaded.length > 0 ) {
					 deferred.resolve(components);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						components.loaded = data;
						console.log("Components (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(components);
					});
				}
				return deferred.promise;
			},
			add: function(details) {
				details = details || ["","","","","","","",[]];
				var component = {
					metadata : {
						version : 1.0,
						type : "component",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						type : details[2],
						state : {
							width : details[3],
							height : details[4],
							margin : details[5],
							padding : details[6],
							position : details[7]
						}
					},
					view : details[8]
				};
				components.loaded.push(component);
				components.current = components.loaded.length - 1;
				return components;
			},
			remove: function(index) {
				index = index || components.current.index;
				var component = components.loaded.indexOf(index);
				components.loaded.splice(component, 1);
				return components;
			},
			set: function(index) {
				if (index !== undefined || index !== false) components.current.index = index;
				var component = components.loaded[components.current.index];
				return component;
			},
			setViewpoint: function(chromStart, chromEnd, scaleOrig) {
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = components.loaded;
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-clusters") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return components;
			},
			get: function() {
				return components;
			},
			getComponent: function(index) {
				if (index === undefined || index === false) index = components.current.index;
				var component = components.loaded[index];
				return component;
			},
			getComponentById: function (id) {
				var component, found;
				if (id !== undefined || id !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.id === id) {
							component = components.loaded[i];
							found = i;
							// console.log("Component '" + id + "' found!");
						}
					}
				}
				if (!found) {
					component = components.loaded[components.current.index];
					console.log("Component '" + id + "' not found: returning current.");
				}
				return component;
			},
			getComponentByType: function (type) {
				var component, defaultComponent, found;
				if (type !== undefined || type !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.type === type) {
							component = components.loaded[i];
							found = i;
							// console.log("Component type '" + type + "' found!");
						}
						if (components.loaded[i].object.type === "default") {
							defaultComponent = components.loaded[i];
						}
					}
				}
				if (!found) {
					component = defaultComponent;
					console.log("Component type '" + type + "' not found: returning default.");
				}
				return component;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('CustomTracks', CustomTracks);

	function CustomTracks($q, $http, uuid4, Resources, Overlays) {
		// Import additional 2D/track data imported by users for use as Overlays

		return {
			load: function(filename, filetype, defaults) {
				filename = filename || "tk-example-dataset";
				filetype = filetype || "tsv";
				if (typeof defaults === 'undefined') defaults = true;
				var self = this;

				var deferred = $q.defer();
				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";
				var dataUrl = "assets/" + datapath + "/" + filename + "." + filetype;
				$http.get(dataUrl)
				.success( function(fileData) {
					var importedOverlays = self.import(fileData,[],[],defaults);
					console.log("Overlays (" + importedOverlays.length + ") imported from " + dataUrl);
					deferred.resolve(importedOverlays);
				})
				.error(function(fileData) {
					console.log("No associated data tracks found.");
				});
				return deferred.promise;
			},
			import: function(fileData, selectedRows, selectedCols) {
				var self = this;
				// TODO: if not valid fileData return...
				selectedRows = selectedRows || [];
				selectedCols = selectedCols || [];

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var filteredData;
				if (selectedRows.length > 0 && selectedCols.length > 0) {
					filteredData = self.filter(parsedData, selectedRows, selectedCols);
				} else {
					filteredData = parsedData; // no filtering required
				}

				var aquiredOverlays = self.aquire(filteredData);
				Overlays.add(aquiredOverlays);

				return aquiredOverlays;
			},
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true
				});
				return parsedData;
			},
			filter: function(dataTable, selectedRows, selectedCols) {
				// dataTable [[row1col1,row1col2...],[row2col1,row2col2...]...]
				// Remove rows/cols marked false in selectedRows/Cols arrays
				var filteredData = [];
				var rows = selectedRows.length;
				var cols = selectedCols.length;
				for (var i = 0; i < rows; i++) {
					var newRow = [];
					if (selectedRows[i]) {
						for (var j = 0; j < cols; j++) {
							if (selectedCols[j]) newRow.push(dataTable[i][j]); // else column not added
						}
						filteredData.push(newRow);
					} // else row not added
				}
				return filteredData;
			},
			aquire: function(data) {
				// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
				var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
				// Categorical Color Ragess e.g. d3.scale.category20()
				var colorRange = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];

				// columns to overlays
				// skip row 1 = headers ie. length - 2
				// skip colums 1 and 2 = coords ie. length - 3
				var acquiredOverlays = [];
				// check for bigwig data the step and start
				// var step = 1; // override below if fixed
				// if none find which is start and end eg. Marie's and Filion's data
				// cycle through first lineto determine columns
				// create as BedGraph
				var headerRow = 0;
				var firstDataRow = 1;
				var startColumn = 0;
				var endColumn = 1;
				var colsCount = data[headerRow].length;

				// Check if fixed steps
				var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
				var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
				var type, format, stepType;
				if (step == step2) {
					type = "wiggle_0";
					format = "fixed";
					stepType = "fixed";
				} else {
					type = "bedgraph";
					format = "variable";
					stepType = "variable";
				}

				// Check if Filion proteins ie. chromatin colors
				var filion = false;
				if (colsCount == 7){
					var filionProteins = 0;
					for (var h = 2; h < colsCount; h++) { // h=2 to skip start and end cols
						var header = data[headerRow][h].toLowerCase();
						if (header=="hp1" || header=="brm" || header=="mrg15" || header=="pc" || header=="h1") filionProteins++;
					}
					if (filionProteins == 5) filion = true;
				}

				for (var i = colsCount - 1; i >= 2; i--) { // i >= 2 to skip, start and end columns
					var colored;
					if (filion) {
						colored = colorFilion[i-2];
					} else {
						colored = colorRange[i];
					}				
					acquiredOverlays.unshift(
						{
							"metadata": {
								"version" : 1.0,
								"type" : "overlay",
								"generator" : "TADkit"
							},
							"object" : {
								"uuid" : uuid4.generate(),
								"id" : data[headerRow][i],
								"title" : data[headerRow][i],
								"source" : "Research output",
								"url" : "local",
								"description" : "center_label", //also BigWig description (track title): "User Supplied Track"
								"type" : type, //also BigWig type
								"format" : format,
								"components" : 2,
								"name" : data[headerRow][i], //BigWig: "User Track"
								"visibility" : "full", //BigWig: "full", "dense" or "hide"
								"color" : colored, // random from D3.js function. NOTE: convert to RGB for BigWig: eg. 255,255,255
								"altColor" : "#cccccc", // light grey gives best 3D render vis. NOTE: convert to RGB for BigWig: eg. 128,128,128
								"priority" : "100", //BigWig: 100
								"stepType" : stepType, //BigWig: "variable" or "fixed"
								"chrom" : "", //BigWig: derive from dataset...???
								"start" : data[firstDataRow][startColumn], //BigWig
								"step" : step, //BigWig
								"state" : {
									"index" : 0, // make real index???
									"overlaid" : false
								}
							},
							"palette" : [colored,"#cccccc"],
							"data" : [],
							"colors" : {
								"particles" : [],
								"chromatin" : [],
								"network" : {
									"RGB" : [],
									"alpha" : []
								}
							}
						}
					);
					// convert column data to array
					for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first header row
						if (format == "variable") {
							acquiredOverlays[0].data.unshift({
								"start" : data[j][startColumn],
								"end" : data[j][endColumn],
								"read" : data[j][i]
							});
						} else {
							acquiredOverlays[0].data.unshift(data[j][i]);
						}				
					}
				}
				return acquiredOverlays;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets($q, $http, uuid4, Settings, Resources, Proximities, Restraints, Overlays, CustomTracks) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		return {
			load: function(filename, clear) {
				filename = filename || "tk-example-dataset";
				clear = clear || false;
				var self = this;
				if (clear) self.clear();

				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";

				var deferred = $q.defer();
				var dataUrl = "assets/" + datapath + "/" + filename + ".json";
				$http.get(dataUrl)
				.success( function(dataset) {
					// TADkit defaults and examples are already validated
					dataset.object.filename = filename;
					self.add(dataset);
					deferred.resolve(datasets);
				});
				return deferred.promise;
			},
			add: function(data) {
				var self = this;
				var dataset = self.validate(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					self.setSpeciesUrl();
					self.setRegion();
					self.init(dataset);
					console.log("Dataset " + dataset.object.species + " " + dataset.object.region + " loaded from file.");
				// }
				return datasets;
			},
			validate: function(data) {
				var validDataset = {};
				var objectType = Resources.whatIsIt(data);
				if (objectType === "String") {
					validDataset = JSON.parse(data);
				} else {
					// TODO: add specific options for Array, Object, null, etc.
					validDataset = data;
				}
				var validation = true;
				// ADD VALIDATION LOGIC...
				// check structure
				// check content type
				if (validation) {
					return validDataset;
				} else {
					// give error message
					// return to Project Loader page
				}
			},
			init: function(dataset) {
				var self = this;
				// Proximities.load().then(function() {
					var currentModelData = self.getModel().data;
					Settings.set(dataset);
					Proximities.set(currentModelData);
					Restraints.set(currentModelData, dataset.restraints);
					Overlays.update(Proximities.get().distances, dataset.restraints);
					// if (dataset.object.filename) {
						var filetype = "tsv";
						var resetToDefaults = true;
						CustomTracks.load(dataset.object.filename, filetype, resetToDefaults);	
					// }
					console.log("Settings, Proximities, Restraints & Overlays initialized.");
				// });
			},
			clear: function() {
				while (datasets.loaded.length > 0) {
					datasets.loaded.shift();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				datasets.loaded.splice(dataset, 1);
				return datasets;
			},
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var species = datasets.loaded[index].object.species;
				var speciesUrl = species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				datasets.loaded[index].object.speciesUrl = speciesUrl;
				return speciesUrl;
			},
			setRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var chromosomeIndex = 0;
				if (datasets.loaded[index].object.chromosomeIndex) {
					chromosomeIndex = datasets.loaded[index].object.chromosomeIndex;	
				}
				var chrom = datasets.loaded[index].object.chrom[chromosomeIndex];
				var chromStart = datasets.loaded[index].object.chromStart[chromosomeIndex];
				var chromEnd = datasets.loaded[index].object.chromEnd[chromosomeIndex];
				var region = chrom + ":" + chromStart + "-" + chromEnd;
				datasets.loaded[index].object.region = region;
				return region;
			},
			set: function(index) {
				if (index !== undefined || index !== false) datasets.current.index = index;
				this.setCluster(datasets.current.cluster); // need to determine which cluster is current?
				var dataset = datasets.loaded[datasets.current.index];
				return dataset;
			},
			setCluster: function(ref) { // from cluster ref
				ref = ref || 1; // from ref or just set as the first cluster
				datasets.current.cluster = ref;
				var clusterCentroid = this.getCentroid(datasets.current.cluster);
				this.setCentroid(clusterCentroid);
				var cluster = this.getCluster();
				return cluster; // array of model indices
			},
			setCentroid: function(ref) { // from model ref
				ref = ref || this.getCentroid(); // from ref or from current cluster
				datasets.current.centroid = ref;
				var centroid = this.setModel(datasets.current.centroid);
				return centroid; // array of vertices
			},
			setModel: function(ref) { // from model ref
				ref = ref || this.getCentroid();
				var model = this.getModel(ref - 1);
				// Store as current model for dataset in datasets.loaded[datasets.current.index].data
				datasets.loaded[datasets.current.index].data = model;
				return model; // array of vertices
			},
			get: function() {
				return datasets;
			},
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},
			getCluster: function(ref) { // from cluster ref
				ref = ref || datasets.current.cluster;
				var cluster = datasets.loaded[datasets.current.index].clusters[ref - 1];
				return cluster; // array of model refs
			},
			getCentroid: function(ref) { // from cluster ref (NOT model ref)
				ref = ref || datasets.current.cluster;
				var centroid = datasets.loaded[datasets.current.index].centroids[ref - 1];
				return centroid; // single model ref
			},
			getModel: function(ref) { // from model ref
				ref = ref || this.getCentroid();
				var model;
				var models = datasets.loaded[datasets.current.index].models;
				// console.log(ref);
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) model = models[i];
				}
				// console.log(model);
				return model; // array of model vertices
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http, Settings, Color) {
		var ensembl = {
			root: "http://rest.ensemblgenomes.org/",
			ping : 0,
			assembly: {},
			featureColors: {},
			biotypes: {}
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferred = $q.defer();
				var dataUrl =  ensembl.root + "info/ping?content-type=application/json";
				$http.get(dataUrl)
				.success(function(data){
					ensembl.ping = data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferred.promise;
			},
			load: function(overlay) {
				// TODO: clear odd colors while loading...
				var deferred = $q.defer();
				var dataUrl;
				var settings = Settings.get();
				var species = settings.current.species;
				var speciesUrl = settings.current.speciesUrl;
				// var chromosomeIndex = 0;
				// if (datasetObject.chromosomeIndex) {
				// 	chromosomeIndex = datasetObject.chromosomeIndex;	
				// }
				var chrom = settings.current.chrom;
				var chromStart = settings.current.chromStart;
				var chromEnd = settings.current.chromEnd;
				var self = this;
				var online = Settings.getOnline();
				if (online) {
					dataUrl = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chrom + overlay.object.url[4] + chromStart + overlay.object.url[6] + chromEnd + overlay.object.url[8];
				} else {
					dataUrl = "assets/offline/" + speciesUrl + "-genes.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					overlay.data = genes;
					var region = chrom + ":" + chromStart + "-" + chromEnd;
					var source = online ? "Ensembl" : "local storage";
					console.log("Genes for " + species + " "+ region + " retreived from " + source + ".");
					 deferred.resolve(overlay);
				});
				return deferred.promise;
			},
			loadBiotypeColors: function() {
				var deferred = $q.defer();
				var dataUrl;
				var online = false; // Settings.getOnline(); // Most up-to-date version not strictly necessary
				if (online) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-COLOUR.ini";

				}
				$http.get(dataUrl)
				.success(function(data){
					var iniData = Color.colorsFromIni(data);
					ensembl.featureColors = iniData;
					ensembl.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					 deferred.resolve(iniData);
				});
				return deferred.promise;
			},
			setBiotypeStyle: function(genes) {
				// This generates a index in lowercase to be used in CSS styling
				// now running directly in segmentFeatures
				angular.forEach(genes, function(gene, key) {
					// var biotypeStyle = gene.biotype.replace(/_/g, '-').toLowerCase(); // SWAP underscores for dashes
					var biotypeStyle = gene.biotype.toLowerCase();
					gene.biotypeStyle = biotypeStyle;
				});
				return genes;
			},
			setLengthBP: function(top_level_region) {
				var lengthBP = 0;
				var regionBPs = top_level_region;
				for (var regionBP in regionBPs) {
					if (regionBPs.hasOwnProperty(regionBP)) {
						for (var i = 0, j = regionBPs.length; i < j; i++) {
							lengthBP += regionBPs[i].length;
						}
					}
				}
				return lengthBP;
			},
			get: function() {
				return ensembl;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, THREEService, d3Service, Settings, Components, Ensembl, Users, Projects, Datasets, Overlays, Storyboards, THREETextures ) {
		/* Note: The APP will not start until init-Main is resolved
		 *       See tadkit.states.js
		 */
		return function() {
			console.log("Loading TADkit...");

			var loadApp = function(results) {
				// Ensure JS API dependencies are loaded
				var three = THREEService.load();
				var d3 = d3Service.load();

				var settings = Settings.load(); // results[0]
				var components = Components.load(); // results[1]
				var features = Ensembl.loadBiotypeColors(); // results[2]
					// ¿speedup features by loading from array rather than fetch ini?

				return $q.all([three, d3, settings, components, features])
				.then(function(results) {
					return results;
				});
			};

			var loadDefaults = function(results) {
				var users = Users.load();
				var projects = Projects.load();
				var datasets = Datasets.load();
				var overlays = Overlays.load();
				var storyboards = Storyboards.load();
				var textures = THREETextures.load(results[2].textures);

				return $q.all([users, projects, datasets, overlays, storyboards])
				.then(function(results) {
					return results;
				});
			};

			return loadApp()
				.then(loadDefaults);
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Networks', Networks);

	function Networks() {
		return {
			lineSegmentsRGB: function(overlay, edgeCount) {
				// from an array of features colors eg. restraints
				// from an array of color RGB Pairs to match Vertex Pairs
				// eg. [R1,G1,B1,R2,G2,B2,R1,G1,B1,R3,G3,B3,...Rn,Gn,Bn,Rm,Gm,Bm]
				// such that all color pairs are represented uniquely
				// ie. one half of matrix where array length = (n^2-n)/2
				// eg.  1 2 3 4
				//     1  x x x  ==  1-2 1-3 1-4    3
				//     2    x x  ==  2-3 2-4      + 2
				//     3      x  ==  3-4          + 1
				//     4         ==  ((4*4)-4)*0.5  = 6 pairs of colors
				var self = this;
				var featuresCount = overlay.data.length;
				var colorPairs = new Float32Array(edgeCount * 6); // ie. * 2 (vertices) * 3 (RGB)
				for (var i = 0; i < featuresCount; i++) {
					var particle1 = overlay.data[i][0];
					var particle2 = overlay.data[i][1];
					var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount) * 6;
					var RGB = {"r":0.5,"g":0.5,"b":0.5};
					if (overlay.object.id == "restraints"){
						var restraintsColors = {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
						RGB = self.getFeatureRGB(overlay.data[i][2], restraintsColors);
					}
					// vertex 1
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b; pairIndex++;
					// vertex 2
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b;
				}
				colorPairs.name = "Network lineSegments RGB";
				return colorPairs;
			},
			lineSegmentsAlpha: function(overlay, edgeCount) {
				var self = this;
				var alphaPairs = new Float32Array(edgeCount * 2); // ie. * 2 (vertices)
				var defaultAlpha = 0.0;
				for (var h = alphaPairs.length - 1; h >= 0; h--) {
					alphaPairs[h] = defaultAlpha;
				}
				if (overlay.data) {
					var featuresCount = overlay.data.length;
					for (var i = 0; i < featuresCount; i++) {
						var particle1 = overlay.data[i][0];
						var particle2 = overlay.data[i][1];
						var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount);
						var alpha = (overlay.data[i][3] * overlay.data[i][3]) / 5;
						// if (overlay.data[i][2] == ("U"||"C")) alpha = 0.0;
						alphaPairs[pairIndex] = alpha; pairIndex++;
						alphaPairs[pairIndex] = alpha;
					}
				}
				alphaPairs.name = "Network lineSegments Alphas";
				return alphaPairs;
			},
			getMatrixIndex: function(row, col, size) {
				// Matrix size == array.length
				var index = 0;
				var sigma = row - 1;
				for (var i = 0; i <= sigma; i++){
					index += (size - (size - i));
				}
				index += (col - row) - 1;
				return index;
			},
			getFeatureRGB: function(code, colors) {
				colors = colors || {"0":"#000000"};
				var RGB;
				angular.forEach(colors, function(color, key) {
					if (code == key) {
						RGB = new THREE.Color(color);
					}
				});
				return RGB;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, Settings, Storyboards, Ensembl, Segments, Networks ) {
		var overlays = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-overlays.json";
				if( overlays.loaded.length > 0 ) {
					 deferred.resolve(overlays);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						overlays.loaded = data;
						// overlays.current.index = overlays.loaded.length - 1;
						console.log("Overlays (" + data.length + ") loaded from " + dataUrl);
						deferred.resolve(overlays);
					});
				}
				return deferred.promise;
			},
			add: function(importedOverlays) {
				var self = this;
				// convert to function in Overlays service
				var newOverlays = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var overlayExists = false;
					// for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						// console.log(overlays.loaded[i].object.uuid);
						// console.log(overlay.object.uuid);
						// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
					// }
					if (!overlayExists) {
						currentOverlaysIndex++;
						overlay.object.state.index = currentOverlaysIndex;
						overlay.object.state.overlaid = false;
						newOverlays.push(overlay);
						Storyboards.addComponent(overlay);
					}
				});
				// Add newOverlays to Overlays
				overlays.loaded = overlays.loaded.concat(newOverlays);
				// Generate colors arrays for new overlays
				self.segment();

				return newOverlays;
			},
			clear: function() {
				while (overlays.loaded.length > 0) { // remove all overlays
					overlays.loaded.shift();
				}
			},
			defaults: function() {
				while (overlays.loaded.length > 4) { // remove all except defaults
					overlays.loaded.pop();
					// remove associated components
					Storyboards.defaultComponents();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded.indexOf(index);
				overlays.loaded.splice(overlay, 1);
				return overlays;
			},
			set: function(index) {
				if (index !== undefined || index !== false) overlays.current.index = index;
				var current = overlays.loaded[overlays.current.index];
				return current;
			},
			setOverlaid: function (index) {
				index = index || "";
				angular.forEach(overlays.loaded, function(overlay) {
					if (overlay.object.state.index === index) {
						overlay.object.state.overlaid = true;
					} else {
						overlay.object.state.overlaid = false;
					}
				});
				return index;
			},
			update: function(distances, restraints) {
				// things that need updating for changes:
				// - ext.data eg. Ensembl
				// - proximities (derived from datsets)
				// - segments (derived from datsets)
				var self = this;
				var overlaysAsync = []; // push async functions into list for subsequent processing
				var overlaysToUpdate = [];
				angular.forEach(overlays.loaded, function(overlay, key) {

					// For Overlays with Aync Ensembl Data eg. genes
					// ADD check if changed...
					if (overlay.object.type == "ensembl") { // more generic than id == "genes"
						var ensembl = Ensembl.load(overlay);
						overlaysAsync.push(ensembl);
						overlaysToUpdate.push(overlay);
					}

					if (overlay.object.id == "proximities") {
						overlay.data = distances;
					}

					if (overlay.object.id == "restraints") {
						overlay.data = restraints;
					}

				});
				return $q.all(overlaysAsync)
				.then(function(results) {
					for (var i = 0; i < overlaysToUpdate.length; i++) {
						Storyboards.update(overlaysToUpdate[i]);
					}
					self.segment();
					return results;
				});

			},
			segment: function() {
				var self = this; // SYNChronous functions...
				// Segments.load().then(function() {
					var settings = Settings.get();
					angular.forEach(overlays.loaded, function(overlay, key) {
						// check if colors already exist (for chromatin as principal set) or number of segments have changed
						var segmented = true;
						if (segmented) {
						// if (!overlay.colors.chromatin || overlay.colors.chromatin.length === 0) { // ??? || (overlay.colors.chromatin && segmentsCount != settings.segmentsCount)
							// run function based on object type
							var type = overlay.object.type;
							var format = overlay.object.format;
							if (type == "gradient" && format == "hex") {
								// palette must contain 2 hex values
								overlay.colors.particles = Segments.gradientHCL(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.gradientHCL(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "fixed") {
								// OJO! create additional option for format = "bigwig-variable"
								overlay.colors.particles = Segments.bicolor(overlay, settings.current.particlesCount);
								overlay.colors.chromatin = Segments.bicolor(overlay, settings.current.segmentsCount);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "wiggle_0" && format == "variable") {
								// To Do...
							} else if (type == "bedgraph") {
								overlay.colors.particles = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.particlesCount, 1);
								overlay.colors.chromatin = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "matrix") {
								// Distances are per edge so just convert to color
								overlay.colors.particlesMatrix = Segments.matrix(overlay, 1); // ie. per particle
								overlay.colors.chromatinMatrix = Segments.matrix(overlay, settings.current.particleSegments);
								overlay.colors.networkMatrix = overlay.colors.particlesMatrix; // ie. also color network edges by matrix
								self.at(1, settings.current.particlesCount, settings.current.particleSegments);
							} else if (type == "misc" && format == "variable") { // eg. restraints
								overlay.colors.particles = [];
								overlay.colors.chromatin = [];
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							} else if (type == "ensembl" && format == "json") {
								// data must have .start and .end
								var features = Ensembl.get().biotypes;
								var singleSegment = 1;
								overlay.colors.particles = Segments.features(overlay, settings.current.chromStart, settings.current.particlesCount, singleSegment, features);
								overlay.colors.chromatin = Segments.features(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength, features);
								overlay.colors.network.RGB = Networks.lineSegmentsRGB(overlay, settings.current.edgesCount);
								overlay.colors.network.alpha = Networks.lineSegmentsAlpha(overlay, settings.current.edgesCount);
							}
						} else {
							// already segmented
							console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
						}

					});
					return overlays;
				// });
			},
			at: function(currentParticle) {
				var settings = Settings.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var type = overlay.object.type;
					if (type == "matrix") {
						var particleStart = (currentParticle - 1) * settings.current.particlesCount;
						var particleEnd = currentParticle * settings.current.particlesCount;
						var chromatinStart = particleStart * settings.current.particleSegments;
						var chromatinEnd = particleEnd * settings.current.particleSegments;

						overlay.colors.particles = overlay.colors.particlesMatrix.slice(particleStart, particleEnd);
						overlay.colors.chromatin = overlay.colors.chromatinMatrix.slice(chromatinStart, chromatinEnd);
						overlay.colors.network = overlay.colors.networkMatrix.slice(particleStart, particleEnd);
					}
				});
				return overlays;
			},
			get: function() {
				return overlays;
			},
			getOverlay: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded[index];
				return overlay;
			},
			getOverlayById: function (id) {
				var overlay, found;
				if (id !== undefined || id !== false) {
					for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						if (overlays.loaded[i].object.id === id) {
							overlay = overlays.loaded[i];
							overlay.object.state.index = i;
							found = true;
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					overlay = overlays.loaded[overlays.current.index];
					overlay.object.state.index = overlays.current.index;
					console.log("Overlay \"" + id + "\" not found: returning current.");
				}
				// console.log(overlay);
				return overlay;
			},
			getCurrentIndex: function() {
				return overlays.current.index;
			}
		};
	}
})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('PathControls', PathControls);

	// constructor for chromatin model instances
	function PathControls() {
		return {
			simple: function(vertices) {
				var division = "EnsemblBacteria";

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = [];
				for (var i = 0 ; i < totalParticles - 1 ; i++) {
					var baseParticle = vertices[i];
					var foreParticle = vertices[i + 1];
					var midCoord = new THREE.Vector3(0,0,0);
					midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midCoord).sub(baseParticle);
					if (i === 0 && division != "EnsemblBacteria") { // insert backprojected first coord
						var preCoord;
						// if (division == "EnsemblBacteria") {
						// 	preCoord = vertices[totalParticles - 1];
						// } else {
							preCoord = new THREE.Vector3(0,0,0);
						// }
						preCoord.copy(baseParticle).sub(midOffset);
						pathControls.push(preCoord);
					}
					//pathControls.push(baseParticle);
					pathControls.push(midCoord);
					// if (i == totalParticles - 2) {
					// //	pathControls.push(foreParticle);
					// 	var chromEnd = new THREE.Vector3(0,0,0);
					// 	chromEnd.copy(foreParticle).add(midOffset);
					// 	pathControls.push(chromEnd);
					// };
					if (i == totalParticles - 2 && division != "EnsemblBacteria") {
					//	pathControls.push(foreParticle);
						var chromEnd;
						// if (division == "EnsemblBacteria") {
						// 	chromEnd = vertices[0];
						// } else {
							chromEnd = new THREE.Vector3(0,0,0);
						// }
						chromEnd.copy(foreParticle).add(midOffset);
						pathControls.push(chromEnd);
					}
				}
				return pathControls;
			},
			cubic: function(vertices, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var controlLength = 1; // variable for possible corner tweaking

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = {};
				pathControls.vertices = [];
				pathControls.colors = [];
				var previousOffset = new THREE.Vector3(0,0,0);

				// if (closed) {
				// 	var firstParticle = vertices[0];
				// 	var nthParticle = vertices[totalParticles - 1];
				// 	var closedControl = new THREE.Vector3(0,0,0);
				// 	if (closed) closedControl.addVectors(nthParticle, firstParticle).divideScalar(2);
				// }

				for (var i = 0 ; i < totalParticles ; i++) {

					var baseParticle = vertices[i];
					var foreParticle = new THREE.Vector3(0,0,0);
					if (i == totalParticles - 1) {
						if (closed) {
							// fore particle == first particle
							foreParticle = vertices[0];
						} else {
							// fore particle == extend same dist as to previous particle
							foreParticle.copy(baseParticle).addVectors(baseParticle, vertices[i - 1]);
						}
					} else {
						foreParticle = vertices[i + 1];
					}
					
					var midControl = new THREE.Vector3(0,0,0);
					// if (i == totalParticles - 1) {
					// 	if (closed) {
					// 		// use first particle mid point as closed chromatin...
					// 		midControl.copy(closedControl);
					// 	} else {
					// 		// use previous particle mid point as no more foreward...
					// 		midControl.addVectors(baseParticle, vertices[i - 1]).divideScalar(2);
					// 	}
					// } else {
						midControl.addVectors(baseParticle, foreParticle).divideScalar(2);
					// }
					
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midControl).sub(baseParticle);

					if (i === 0) {
						if (closed) {
							// set previous for first particle
							var previousControl =  new THREE.Vector3(0,0,0);
							previousControl.addVectors(vertices[totalParticles - 1], vertices[0]).divideScalar(2);
							previousOffset.copy(previousControl).sub(vertices[totalParticles - 1]);
						} else {
							previousOffset.copy(midOffset);
						}
					}

					var backControl = new THREE.Vector3(0,0,0);
					backControl.copy(baseParticle).sub(midOffset);

					var foreControl = new THREE.Vector3(0,0,0);
					foreControl.copy(baseParticle).add(previousOffset);

					// Node tangent
					var baseTangent =  new THREE.Vector3(0,0,0);
					baseTangent.subVectors(foreControl, backControl).divideScalar(controlLength);
					backControl.copy(baseParticle).sub(baseTangent);
					foreControl.copy(baseParticle).add(baseTangent);

					// Add controls to array
					pathControls.vertices.push(backControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));
					pathControls.vertices.push(baseParticle);
						pathControls.colors.push(new THREE.Color(0x000000));
					pathControls.vertices.push(foreControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));

					previousOffset = midOffset;
				}
				// add start and end controls
				// requires calc of join midway on cubicBezier between start and end
				var startBackControl = new THREE.Vector3(0,0,0);
				var startPoint = new THREE.Vector3(0,0,0);
				var endForeControl = new THREE.Vector3(0,0,0);
				var endPoint = new THREE.Vector3(0,0,0);

				var totalControls = pathControls.vertices.length;
				var p1 = pathControls.vertices[totalControls-2]; // last particle
				var p2 = pathControls.vertices[totalControls-1]; // last fore control
				var p3 = pathControls.vertices[0]; // first back control
				var p4 = pathControls.vertices[1]; // first particle
				if (closed) {
					// curve between start and end Controls
					var joinCurve = new THREE.CubicBezierCurve3(p1,p2,p3,p4);
					// split join curve in two
					var joinMidpoint = joinCurve.getPointAt(0.5);
					var joinTangent = joinCurve.getTangent(0.5).multiplyScalar(1);

					// NEEDS ROUNDING OFF TO NEAREST 0.5??? Math.round(num*2)/2;
					startBackControl.copy(joinMidpoint).sub(joinTangent);
					startPoint.copy(joinMidpoint);
					endForeControl.copy(joinMidpoint).add(joinTangent);
					endPoint.copy(joinMidpoint);
				} else {
					startBackControl.copy(p3);
					startPoint.copy(p3);
					endForeControl.copy(p2);
					endPoint.copy(p2);
				}
				pathControls.vertices.unshift(startBackControl);
					pathControls.colors.unshift(new THREE.Color(0xffff00));
				pathControls.vertices.unshift(startPoint);
					pathControls.colors.unshift(new THREE.Color(0xff0000));
				pathControls.vertices.push(endForeControl);
					pathControls.colors.push(new THREE.Color(0x00ffff));
				pathControls.vertices.push(endPoint);
					pathControls.colors.push(new THREE.Color(0x0000ff));

				return pathControls;
			}
		};
	}

})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Paths', Paths);

	// constructor for chromatin model instances
	function Paths() {
		return {
			splineNearFit: function(controls, segments) {
				var division = "EnsemblBacteria";
				var splinePath;
				if (division == "EnsemblBacteria") {
					splinePath = new THREE.ClosedSplineCurve3(controls);
				} else {
					splinePath = new THREE.SplineCurve3(controls);			
				}
				// var splineDivisions = splinePath.getSpacedPoints(segments);
				return splinePath;
			},
			// Following paths constructed from curve segments passing through particle centers
			spline: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var curvePath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
					// REVISE THIS
					curvePath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var splineCurve = new THREE.SplineCurve3([p1,p23,p4]);
						curvePath.add(splineCurve);
					}
				}
				return curvePath;
			},			
			quadraticBezier: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var quadPath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
					// REVISE THIS
					quadPath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var quadCurve = new THREE.QuadraticBezierCurve3(p1,p23,p4);
						quadPath.add(quadCurve);
					}
				}
				return quadPath;
			},			
			cubicBezier: function(controls, segments, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var cubicPath = new THREE.CurvePath();
				var totalControls = controls.length;
				var cubicCurveStart, cubicCurveEnd;

					// controls[0] == start point
					// controls[1] == start point fore control
					// controls[2] == first particle back control
					// controls[3] == first particle
					// ...
					// n == totalControls - 1
					// controls[n-3] == last particle
					// controls[n-2] == last particle fore control
					// controls[n-1] == end point back control
					// controls[n] == end point (if closed, end point == start point)

					for (var i = 0 ; i < totalControls - 1 ; i = i + 3) {

						var c1 = controls[i];
						var c2 = controls[i+1];
						var c3 = controls[i+2];
						var c4 = controls[i+3];

						var cubicCurve = new THREE.CubicBezierCurve3(c1,c2,c3,c4);
						 cubicPath.add(cubicCurve);
					}
				return cubicPath;
			}
		};
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Projects', Projects);

	function Projects($q, $http, uuid4) {
		var projects = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-projects.json";
				if( projects.loaded.length > 0 ) {
					 deferred.resolve(projects);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						projects.loaded = data;
						console.log("Projects (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(projects);
					});
				}
				return deferred.promise;
			},
			add: function(details) {
				var newProject = {
					metadata : {
						version : 1.0,
						type : "project",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						description : details[2],
						group : details[3],
						state : details[4]
					},
					datasets : details[5],
					overlays : details[6],
					storyboards : details[7]
				};
				projects.loaded.push(newProject);
				projects.current = projects.loaded.length - 1;
				return projects;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var project = projects.loaded.indexOf(index);
				projects.loaded.splice(project, 1);
				return projects;
			},
			set: function(index) {
				if (index !== undefined || index !== false) projects.current.index = index;
				var current = projects.loaded[projects.current.index];
				return current;
			},
			get: function() {
				return projects;
			},
			getProject: function(index) {
				if (index === undefined || index === false) index = projects.current.index;
				var project = projects.loaded[index];
				return project;
			},
			getState: function(index) {
				if (index === undefined || index === false) index = projects.current.index;
				var state = projects.loaded[index].object.state;
				return state;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Proximities', Proximities);

	function Proximities($q) {
		// Matrix - n x m dimensions == particleCount */
		var proximities = {
			dimension: 0,
			positions: [],
			distances: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			positions: [],
			distances: []
		};

		return {

			set: function (vertices, settings) {
				// Generate a matrix of proximity between points
				// from vertices = array of point coordinates components
				// up to minDistance = threshold for proximity
				// eg. [u1,v1,z1,w1,y1,z1,x1,u2,v2,w2,x2,y2,z2 ... un,vn,wn,xn,yn,zn]
				
				// To be used by THREE.LineSegments( geometry, material )
				// where LineSegments is the equivalent to GL_LINES in OpenGL terms.
				// THREE.LineSegments will draw a series of pairs of segments
				// ie. (u1,v1,w1) to (x1,y1,z1), (u2,v2,w2) to (x2,y2,z2), etc.

				// Stored in proximities object {positions:[],distances[]}
				// as vertex components (rather than THREE.Vertex)
				// for processing as THREE.BufferGeometry attributes:
				// 'position' as positions; 'color' derived from distances.

				var defaults = {
					minDistance: 150,
					maxDistance: 400,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				this.maxDistance = this.getMaxDistance(vertices);

				var vertexpos = 0;
				var distancepos = 0;

				proximities.dimension = vertices.length / 3; // 3 == xyz components of vertices
				var lines = proximities.dimension * proximities.dimension; // matrix of all against all points
				var lineSegments = lines * 2; // pairs of points to make THREE.LineSegments
				
				// Matrix of positions of point pairs (*3 as xyz components)
				var positions = new Float32Array( lineSegments * 3 );
				// Matrix of distances between point pairs
				var distances = new Float32Array( lines );

				var dimensionIndex = proximities.dimension - 1;
				for (var i = dimensionIndex; i >= 0; i--) {

					// Check collision
					for (var j = dimensionIndex; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {
							// if (i == "0" && j=="0") console.log("i:"+i+" ("+vertices[i*3]+","+vertices[i*3+1]+","+vertices[i*3+2]+") j:"+j+" ("+vertices[j*3]+","+vertices[j*3+1]+","+vertices[j*3+2]+")");
							// FROM PARTICLE
							positions[ vertexpos++ ] = vertices[ i * 3     ]; // from u
							positions[ vertexpos++ ] = vertices[ i * 3 + 1 ]; // from v
							positions[ vertexpos++ ] = vertices[ i * 3 + 2 ]; // from w
							// TO PARTICLE
							positions[ vertexpos++ ] = vertices[ j * 3     ]; // to x
							positions[ vertexpos++ ] = vertices[ j * 3 + 1 ]; // to y
							positions[ vertexpos++ ] = vertices[ j * 3 + 2 ]; // to z

							// Distance as value (0.00-1.00) between (u,v,w) and (x,y,z)
							// is stored as RGB 0.00-1.00 (equal RGB ie greyscale)
							// for each position, start == end ie. not a gradient.

							// Can be added as 'color' to THREE.BufferGeometry
							// using THREE.BufferAttribute to store the array
							// but would need *6 to give RGB for each position.
							var distance = (1.0 - (dist / this.maxDistance)); // .toFixed(2)
							distances[ distancepos++ ] = distance;

						// }

					}
				}
				proximities.positions = positions;
				proximities.distances = distances;
				return proximities;
			},
			getMaxDistance: function(vertices) {
				// Where maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var maxDistCalc = 0;
				// var clusterGeometry = new THREE.BufferGeometry();
				// clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				// clusterGeometry.computeBoundingSphere();
				var clusterDiameter = 500; //Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				return clusterDiameter;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				var dataStart = (currentParticle - 1) * proximities.dimension;
				var dataEnd = currentParticle * proximities.dimension;
				current.positions = proximities.positions.subarray((dataStart * 2 * 3), (dataEnd * 2 * 3));
				current.distances = proximities.distances.subarray(dataStart, dataEnd);
				return current;
			},
			get: function() {
				return proximities;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Resources', Resources);

	function Resources() {
		return {
			whatIsIt: function(object) {
				var stringConstructor = "test".constructor;
				var arrayConstructor = [].constructor;
				var objectConstructor = {}.constructor;
				if (object === null) {
					return "null";
				}
				else if (object === undefined) {
					return "undefined";
				}
				else if (object.constructor === stringConstructor) {
					return "String";
				}
				else if (object.constructor === arrayConstructor) {
					return "Array";
				}
				else if (object.constructor === objectConstructor) {
					return "Object";
				}
				else {
					return "don't know";
				}
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Restraints', Restraints);

	function Restraints() {
		// Matrix - n x m dimensions == particleCount */
		var restraints = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		return {
			set: function (vertices, datasetRestraints, settings) {
				// Generate a matrix of proximity between points

				var defaults = {
					setting: true
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				restraints.dimension = vertices.length / 3; // 3 == xyz components of vertices

				for (var i = 0; i < datasetRestraints.length; i++) {
					if (datasetRestraints[i][2] == "H") restraints.harmonics.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "L") restraints.lowerBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "U") restraints.upperBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "C") restraints.neighbours.push(datasetRestraints[i]);
				}
				return restraints;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				current.harmonics = [];
				current.lowerBounds = [];
				current.upperBounds = [];
				current.neighbours = [];
				angular.forEach(restraints, function(restraint, name) {
					if (name != "dimension") {
						for (var j = restraint.length - 1; j >= 0; j--) {
							if (restraint[j][0] == currentParticle) {
								current[name].push(restraint[j]);
							}
							if (restraint[j][1] == currentParticle) {
								var reorderedRestraint = [];
								reorderedRestraint.push(restraint[j][1]);
								reorderedRestraint.push(restraint[j][0]);
								reorderedRestraint.push(restraint[j][2]);
								reorderedRestraint.push(restraint[j][3]);
								current[name].push(reorderedRestraint);
							}
						}
					}
				});
				return current;
			},
			get: function() {
				return restraints;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Segments', Segments);

	function Segments($q, Color) {

		return {
			gradientHCL: function(overlay, count) {
				// Using D3 HCL for correct perceptual model
				// Data is an array of 2 hex colors eg. ff0000
				// Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
				// Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
				var gradient = [];
				var hexStart = overlay.palette[0];
				var hexEnd = overlay.palette[1];

				for (var i = count - 1; i >= 0; i--) {
					var step = i / count; // This should be between 0 and 1
					var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
					gradient.push(hex);
				}
				return gradient;
			},
			gradientComponentRGB: function(overlay, count) { // UNUSED
				// where overlay.palette is an array of 2 hex colors eg. ["#ff0000","#0000ff"]
				// output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
				var gradient = [];
				// convert "#" to "0x" for following manipulation
				var hexStart = "0x" + overlay.palette[0].substring(1);
				var hexEnd = "0x" + overlay.palette[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;
					// convert hexStart to RGB components (0.0-255.0)
					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;
					// convert hexEnd to RGB components (0.0-255.0)
					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;
				// generate gradient as array of RGB component triplets
				for (var i = count - 1; i >= 0; i--) {
					step = i / count; // This should be between 0 and 1
					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);
					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},
			bicolor: function(overlay, count) {
				// if palette is not an array of hex colors then:
				// colors derived from BigWig color and altColor
				// featureTypes == single hex for use as color 
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for(var i = 0; i < count; i++){
						var color;
						if (overlay.data[i] === 1) {
							color = featureColor;
						} else {
							color = defaultColor;
						}
					colors.push(color);
				}
				return colors;
			},
			matrix: function(overlay, segments) {
				// where palette is array of hex colors
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for (var i = overlay.data.length - 1; i >= 0; i--) {
					var read = overlay.data[i];
					var intensity = 1 - (read * read);
					var hex = d3.interpolateHsl(featureColor, defaultColor)(intensity);
					for(var j = 0; j < segments; j++){
						colors.push(hex);
					}
				}
				return colors;
			},
			bicolorVariable: function(overlay, chromStart, segmentsCount, segmentLength) {
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];

				var features = overlay.data;
				var colors = [];
				for(var i=0; i < segmentsCount; i++){
					var segmentColor = defaultColor;
					var segmentLower = chromStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;

						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (features[j].read === 1) {
								segmentColor = featureColor;
							} else {
								segmentColor = defaultColor;
							}
						}
					}
					colors.push(segmentColor);
				}
				return colors;
			},
			featureGraph: function(overlay, count) {
				// where palette is array of hex colors
				var featureColor = "#ff0000";
				var defaultColor = "#000000";
				var segmentedColors = this.gradientHCL(overlay, count);
				var overlayColors = Color.THREEColorsFromHex(segmentedColors);
				var vertexColors = Color.vertexColorsFromTHREEColors(overlayColors);
				return vertexColors;
			},
			features: function(overlay, chromStart, segmentsCount, segmentLength, featureTypes) {
				var features = overlay.data;
				var colors = [];

				for(var i=0; i < segmentsCount; i++){

					var featuresPresent = []; 
					var segmentLower = chromStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;
					var hex = "cccccc"; // Base color - ie if none found
					var color = "#" + hex; //parseInt(hex,16);

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;
						var inSegments = [];
						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							// console.log("Yes feature " + features[j].external_name + "("+j+") in fragment " + i );
							inSegments.push(i);
							var featureTypeKey = "biotype";
							var dominantFeatureType = "protein_coding";
							if (featuresPresent.length > 0) {
								// Simple weight - give preference to smaller segments
								if ( featuresPresent[0] == dominantFeatureType ) {
									// if already contains protein_coding, replace with...
									featuresPresent[0] = features[j][featureTypeKey].toLowerCase();
								} else {
									featuresPresent.push(features[j][featureTypeKey].toLowerCase());
								}
							} else {
								featuresPresent.push(features[j][featureTypeKey].toLowerCase());							
							}
						} else {
							// if (i==3) console.log("No features in fragment " + i );
							// if (j == 0) console.log( JSON.stringify(segmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(segmentUpper)+", "+JSON.stringify(end) );
						}
						features[j].inSegments = inSegments;
					}
					for(var k=0; k<featuresPresent.length; k++){
						var feature = featuresPresent[0];
						if (feature in featureTypes) {
							hex = featureTypes[feature].match(/[a-f0-9]{6}/gi);
							color = "#" + hex; //parseInt(hex,16);
						} else {
							hex = "110100";
							color = "#" + hex; //parseInt(hex,16);
						}
					}
					colors.push(color);
				}
				return colors;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http) {
		var settings = {};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					 deferred.resolve(settings);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + dataUrl);
						 deferred.resolve(settings);
					});
				}
				return deferred.promise;
			},
			set: function(dataset) {
				var self = this;
				var chromosomeIndex = 0;
				if (dataset.object.chromosomeIndex) { chromosomeIndex = dataset.object.chromosomeIndex;	}
				settings.current.chrom = dataset.object.chrom[chromosomeIndex];
				settings.current.chromStart = dataset.object.chromStart[chromosomeIndex];
				settings.current.chromEnd = dataset.object.chromEnd[chromosomeIndex];
				settings.current.species = dataset.object.species;
				settings.current.speciesUrl = dataset.object.speciesUrl;
				// NOTE: particle segements as lowest resolution of model
				// instead of particleSegments as variable in TADkit
				// i.e settings.current.particleSegments = storyboard.components[0].view.settings.chromatin.particleSegments;
				settings.current.particleSegments = 20;// ((dataset.object.chromEnd - dataset.object.chromStart) / dataset.object.resolution);
				settings.current.particlesCount = dataset.models[0].data.length / dataset.object.components;
				settings.current.edgesCount = ((settings.current.particlesCount*settings.current.particlesCount)-settings.current.particlesCount)*0.5;
				settings.current.segmentsCount = settings.current.particlesCount * settings.current.particleSegments;
				// NOTE: segmentLength can be calculated in 2 ways:
				// 1. particleResolution (TADbit data) / particleSegments (TADkit setting)
				// 2. modelResolution (TADbit chromEnd - TADbit chromStart) / segmentsCount
				// Method 1. is used as it is simpler to calculate and the data is already loaded.
				// Also focus on particles and does not address rounding off of sequence length.
				settings.current.segmentLength = dataset.object.resolution / settings.current.particleSegments; // base pairs
				// SET INITIAL position at midpoint
				settings.current.position = settings.current.chromStart + parseInt((settings.current.chromEnd - settings.current.chromStart) * 0.5);
				settings.current.particle = self.getParticle();
				// AND SEGMENT IT LIES WITHIN
				settings.current.segment = self.getSegment(settings.current.position);
				settings.current.segmentLower = settings.current.position - (settings.current.segment * 0.5);
				settings.current.segmentUpper = settings.current.position + (settings.current.segment * 0.5);
			},
			add: function(setting) {
				// // rewrite for Object
				// settings.push(settingID);
				return settings;
			},
			remove: function(setting) {
				// // rewrite for Object
				// var index = settings.indexOf(settingID);
				// settings.splice(index, 1);
				return settings;
			},
			getState: function(setting) {
				var settingState = settings[settingID].state;
				return settingState;
			},
			get: function() {
				return settings;
			},
			getOnline: function() {
				var online = false;
				if (settings.app) online = settings.app.online;
				return online;
			},
			getSegment: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var segment = Math.ceil((chromOffset * settings.current.segmentsCount) / chromRange);
				return segment;
			},
			getParticle: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				var chromOffset = self.getRange(settings.current.chromStart, chromPosition);
				var chromRange = self.getRange(settings.current.chromStart, settings.current.chromEnd);
				var particle = Math.ceil((chromOffset * settings.current.particlesCount) / chromRange);
				return particle;
			},
			getRange: function (start, end) {
				var range = 0;
				for (var i = start; i <= end; i++) {
					range++;
				}
				return range;
			},
			toggle: function(selected) {
				// settings = $filter('filter')(settings, {name: '!settingID'}) // USE THIS???
				angular.forEach(settings, function(name, setting) {
					if (selected == name.id) {
						name.state = !name.state;
					}
				});
				return settings;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Storyboards', Storyboards);

	function Storyboards($q, $http, uuid4, Settings, Components) {
		var storyboards = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-storyboards.json";
				if( storyboards.loaded.length > 0 ) {
				console.log("if");
					console.log("Storyboards already loaded.");
					 deferred.resolve(storyboards);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						storyboards.loaded = data;
						console.log("Storyboards (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(storyboards);
					});
				}
				return deferred.promise;
			},
			add: function(details) {
				details = details || [""];
				var storyboard = {
					metadata : {
						version : 1.0,
						type : "storyboard",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					data : details[5]
				};
				storyboards.loaded.push(storyboard);
				storyboards.current = storyboards.loaded.length - 1;
				return storyboards;
			},
			addComponent: function(overlay, storyboardId, options) {
				var self = this;
				storyboardId = storyboardId || "default";
				options = options || [];

				var settings = Settings.get();
				// Add a preconfigured conponent from Components
				// - update with options if necessary
				var componentTemplate = Components.getComponentByType(overlay.object.type);
				// New component for overlay
				var newComponent = angular.copy(componentTemplate);
					newComponent.object.uuid = uuid4.generate();
					newComponent.object.id = overlay.object.id;
					newComponent.object.title = overlay.object.id;
					newComponent.object.dataset = overlay.object.id;
					newComponent.view.settings.step = overlay.object.step;
					newComponent.view.settings.color = overlay.object.color;
					newComponent.view.viewpoint.chromStart = settings.current.chromStart;
					newComponent.view.viewpoint.chromEnd = settings.current.chromEnd;
					newComponent.view.viewpoint.scale = settings.views.scale;
					newComponent.view.viewtype = overlay.object.type + "-" + overlay.object.stepType;
					newComponent.data = overlay.data;
					newComponent.overlay = overlay;

				var storyboard = self.getStoryboardById(storyboardId);
				storyboard.components.push(newComponent);
				return newComponent;
			},
			defaultComponents: function(storyboardId) {
				var self = this;
				storyboardId = storyboardId || "current";
				var storyboard;
				if (storyboardId == "current") {
					storyboard = self.getStoryboard();
				} else {
					storyboard = self.getStoryboardById(storyboardId);					
				}
				while (storyboard.components.length > 6) { // remove all except defaults
					console.log("popping");
					storyboards.loaded[storyboards.current.index].components.pop();
				}
				// console.log(storyboards.loaded[storyboards.current.index].components);
				return storyboards;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded.indexOf(index);
				storyboards.loaded.splice(storyboard, 1);
				return storyboards;
			},
			removeComponentById: function(id) {
					console.log("component");
				var self = this;
				if (id !== undefined || id !== false) {
					var component = self.getComponentById(id);
					var storyboard = self.getStoryboard();
					storyboard.components.splice(component.index, 1);
					console.log(component);
				}
				return storyboards;
			},
			set: function(index) {
				if (index !== undefined || index !== false) storyboards.current.index = index;
				var storyboard = storyboards.loaded[storyboards.current.index];
				return storyboard;
			},
			setViewpoint: function(chromStart, chromEnd, scaleOrig) {
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = storyboards.loaded[storyboards.current.index].components;
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-clusters") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return storyboards;
			},
			update: function(overlay) {
				var self = this;
				var components = self.getStoryboard().components;
				// Assign data and overlays for each component by type
				angular.forEach(components, function(component, index) {
					// if (component.object.dataset == "default") {
						var overlayProximities;
						// if (component.object.type == "scene") {
						// 	component.data = $scope.current.model.data;
						// 	 // component.proximities required for Scenes: overlay.colors Saturation
						// 	component.proximities = $scope.allProximities;
						// 	component.overlay = $scope.current.overlay;
						// 	component.overlay.state = {};
						// 	component.overlay.object.state.index = Overlays.getCurrentIndex();
						// } else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
						if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
							component.data = overlay.data;
							// component.overlay required for toggle
							component.overlay = overlay;
						}
						// } else if (component.object.type == "track-proximities") {
						// 	// ie only one... see note above for Calculating Proximities
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentProximities;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("proximities");
						// 	component.overlay = overlay;
						// } else if (component.object.type == "track-restraints") {
						// 	// ie only one... see note above for Calculating Restraints
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentRestraints;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("restraints");
						// 	component.overlay = overlay;
						// }
						// } else if (component.object.type == "track-wiggle") {
						// 	overlay = Overlays.getOverlayById(component.object.dataset);
						// 	component.data = overlay.data;
						// 	component.overlay = overlay; // required for toggle
						// } else {
						// 	// slider and other types of component...
						// }
					// }
				});
			},
			get: function() {
				return storyboards;
			},
			getStoryboard: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded[index];
				return storyboard;
			},
			getStoryboardById: function (id) {
				var storyboard, found;
				if (id !== undefined || id !== false) {
					for (var i = storyboards.loaded.length - 1; i >= 0; i--) {
						if (storyboards.loaded[i].object.id === id) {
							storyboard = storyboards.loaded[i];
							storyboard.index = i;
							found = true;
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					storyboard = storyboards.loaded[storyboards.current.index];
					storyboard.index = storyboards.current.index;
					console.log("Storyboard '" + id + "' not found: returning current.");
				}
				return storyboard;
			},
			getComponentById: function (id) {
				var self = this;
				var component, found;
				var components = self.getStoryboard().components;
				if (id !== undefined || id !== false) {
					for (var i = components.length - 1; i >= 0; i--) {
						console.log(components[i].object.title);
						if (components[i].object.title === id) {
							component = components[i];
							component.index = i;
							found = true;
							console.log("Component '" + id + "' found!");
						}
					}
				}
				if (!found) {
					component = components[0];
					console.log("Component '" + id + "' not found: returning first.");
				}
				// console.log(component);
				return component;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Textures', Textures);

	function Textures($q) {
		var textures = {
			loaded: []
		};

		return {
			load: function(filenames) {
				console.log(filenames);
				
				var self = this;
				var imagesToLoad = []; // push async functions into list for subsequent processing
				angular.forEach(filenames, function(filename, key) {
					var newImage = true;
					for (var i = textures.loaded.length - 1; i >= 0; i--) {
						if (textures.loaded[key] == filename) newImage = false;
					}
					if (newImage) {

						var loadImage = self.add(filename);

						imagesToLoad.push(loadImage);
					}
				});

				return $q.all(imagesToLoad)
				.then(function(results) {
					if (results.length > 0) console.log("Images loaded: " + results);
					return results;
				});
			},
			add: function(filename) {
				console.log("Texture added!");
			},
			remove: function(filename) {
				console.log("Texture removed!");
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Users', Users);

	function Users($q, $http, uuid4) {
		var users = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-users.json";
				if( users.loaded.length > 0 ) {
					 deferred.resolve(users);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						users.loaded = data;
						console.log("Users (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(users);
					});
				}
				return deferred.promise;
			},
			add: function(details) {
				details = details || ["id", "Name Surname", "email@company.com", "Group", "edit", ["default"]];
				var user = {
					metadata : {
						version : 1.0,
						type : "user",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					projects : details[5]
				};
				users.loaded.push(user);
				users.current = users.loaded.length - 1;
				return users;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded.indexOf(index);
				users.loaded.splice(user, 1);
				return users;
			},
			set: function(index) {
				if (index !== undefined || index !== false) users.current.index = index;
				var current = users.loaded[users.current.index];
				return current;
			},
			get: function() {
				return users;
			},
			getUser: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded[index];
				return user;
			},
			getPermissions: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var permissions = users.loaded[index].permissions;
				return permissions;
			}
		};
	}
})();