(function() {
	'use strict';

	// ANGULAR APP
	angular.module('TADkit',['ui.router','angularFileUpload','ngMaterial','flow','uuid4','d3']);
	     
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// $locationProvider.html5Mode(true);
		$mdThemingProvider.theme('default')
			.primaryPalette('green')
			.accentPalette('grey')
			.warnPalette('red')
			.backgroundPalette('grey');

		$mdThemingProvider.theme('darkKit')
			.primaryPalette('green')
			.accentPalette('teal')
			.warnPalette('red')
			.backgroundPalette('grey')
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
			// throw error;
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
		$urlRouterProvider.otherwise("/project/loader");
		
		$stateProvider
		.state('home', {
			controller: 'HomeController',
			url: '/home',
			views: {
				'': {
					templateUrl: 'assets/templates/home.html',
					controller: 'HomeController'
				},
				'topbar@home': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'sidebaruser@home': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('main', {
			controller: 'MainController',
			abstract: true,
			url: '',
			templateUrl: 'assets/templates/main.html',
			resolve:{
				'initialData': function(initMain) {
					return initMain();
				}
			}
		})
		.state('project', {
			parent: 'main',
			url: '/project',
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
			url: '/loader',
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
		// .state('upload', {
		// 	parent: 'project',
		// 	url: '/upload',
		// 	views: {
		// 		'topbar@main': {
		// 			templateUrl: 'assets/templates/topbar.html',
		// 			controller: 'TopbarController'
		// 		},
		// 		'content@main': {
		// 			templateUrl: 'assets/templates/project-upload.html',
		// 			controller: 'ProjectUploadController'
		// 		},
		// 		'sidebar-right@main': {
		// 			templateUrl: 'assets/templates/sidebar.user.html',
		// 			controller: 'SidebarUserController'
		// 		}
		// 	}
		// })
		.state('dataset', {
			parent: 'project',
			url: '/dataset',
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
			},
			// resolve: {
			// 	'initialData': function(initBrowser) {
			// 		return initBrowser();
			// 	}
			// }
		})
			.state('overlay-acquire', {
				parent: 'browser',
				url: '/overlay/acquire',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-acquire.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
			})
			.state('overlay-filter', {
				parent: 'browser',
				url: '/overlay/filter',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-filter.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
			})
			.state('overlay-represent', {
				parent: 'browser',
				url: '/overlay/represent',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-represent.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
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
		.controller('ComponentController', ComponentController);

	function ComponentController (){
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
				
				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.id}}-' + scope.$index + '" ' +
					'type="component.object.type" ' +
					'state="component.object.state" ' +
					'object="component.object" ' +
					'view="component.view" ' +
					'metadata="component.metadata" ' +
					'data="component.data" ' +
					'overlay="component.overlay" ' +
					'overlayindex="currentOverlays.current.index" ' +
					'contacts="component.contacts" ' +
					'settings="settings" ' +
					'style="margin: {{component.object.state.margin}}" ' +
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

	function PanelInfoboxController( $state, $scope, Datasets ){
		if ($state.includes('browser')){
			$scope.infobox = Datasets.getDataset();
			$scope.infobox.object.region = Datasets.getRegion();
		// console.log($scope.infobox);
		}
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

	function PanelInspectorController($scope, $mdDialog){

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
		};

		$scope.width = parseInt($scope.state.width);
		$scope.height = parseInt($scope.state.height);

		$scope.atPosition = function(gene) {
			if ($scope.$parent.settings.segmentUpper >= gene.start && $scope.$parent.settings.segmentLower <= gene.end) return true;
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
	function Chromatin() {
		return function(data, overlay, settings) {
			// console.log(overlay);

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
				var geometryColor = new THREE.Color(overlay[g*20]);
				geometry.colors.unshift(geometryColor);
			}

			// Derive path controls from geometry vectors
			// var pathControls = getPathControls( geometry.vertices );
			var pathControls = getCubicControls(geometry.vertices, this.pathClosed);

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
			var pathSegments = this.particles * this.particleSegments;
			this.pathSegments = pathSegments;

			/*** TO DO: Calculate PathSegments based on number of base pairs in the model ***/
			// // Spline
			// var splinePath2 = getNearFitSplinePath(pathControls.vertices, pathSegments);
			// // console.log(splinePath2.getLength());
			// var splineGeom2 = new THREE.Geometry();
			// 	splineGeom2.vertices = splinePath2.getPoints( pathSegments );
			// // Spline Curves
			// var splinePath = getSplinePath(pathControls.vertices, pathSegments);
			// // console.log(splinePath.getLength());
			// var splineGeom = splinePath.createPointsGeometry(pathSegments);
			// // Quadratic Bezier (3 controls)
			// var quadPath = getQuadPath(pathControls.vertices, pathSegments);
			// // console.log(quadPath.getLength());
			// var quadGeom = quadPath.createPointsGeometry(pathSegments);
			// // Cubic Bezer (4 controls)
			var cubicPath = getCubicPath(pathControls.vertices, pathSegments, this.pathClosed);
			var cubicGeom = cubicPath.createPointsGeometry(pathSegments);
			for (var j = cubicGeom.vertices.length - 1; j >= 0; j--) {
				var cubicGeomColor = new THREE.Color(overlay[j]);
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
			// console.log(this.radius);


			// Generate Chromatin model
			var chromatinFiber = new THREE.Object3D(); // unmerged mesh
			var chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
			for ( var i = 0 ; i < pathSegments; i++) {
				// cap if end segment
				this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
				// color linked to scene scope
				
				var segmentColor = overlay[i];

				var segmentMaterial = new THREE.MeshLambertMaterial({
					color: segmentColor,
					ambient: segmentColor,
					emissive: segmentColor,
					vertexColors: THREE.VertexColors,
					opacity: 1.0, 
					transparent: false,
					wireframe: false
				});
				var segment = segmentGeometry(cubicGeom.vertices[i], cubicGeom.vertices[i+1], this );
				chromatinGeometry.merge(segment);

				var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
				chromatinSegment.name = "segment-" + (i + 1);
				chromatinFiber.add(chromatinSegment);
			}

			var controlsMaterial = new THREE.LineBasicMaterial({color: "#ff0000",opacity: 0.5});
			var controlsOutline = new THREE.Line(controlsGeom, controlsMaterial);
			// chromatinFiber.add(controlsOutline);

			// var splineMaterial = new THREE.LineBasicMaterial({color: "#0f0f00"});
			// var chromatinSpline2 = new THREE.Line(splineGeom2, splineMaterial);
			// // chromatinFiber.add(chromatinSpline2);

			// var splineMaterial = new THREE.LineBasicMaterial({color: "#0f0f00"});
			// var chromatinSpline = new THREE.Line(splineGeom, splineMaterial);
			// // chromatinFiber.add(chromatinSpline);

			// var quadMaterial = new THREE.LineBasicMaterial({color: "#00ff00"});
			// var chromatinQuad = new THREE.Line(quadGeom, quadMaterial);
			// // chromatinFiber.add(chromatinQuad);

			var cubicMaterial = new THREE.LineBasicMaterial({color: "#0000ff"});
			var chromatinCubic = new THREE.Line(cubicGeom, cubicMaterial);
			// chromatinFiber.add(chromatinCubic);

			// var particleMap = null; // render only point
			// particleMap = THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png");

			var particlesMaterial = new THREE.PointCloudMaterial({
				// color: "#0000ff",
    			vertexColors: THREE.VertexColors,
				size: 10,
				opacity: 1.0,
				// map: particleMap,
				// depthTest: true,
				// alphaTest: true,
				// transparent: true
			});

			var chromatinCloud = new THREE.PointCloud(controlsGeom, particlesMaterial);
			// chromatinFiber.add(chromatinCloud);
			chromatinGeometry.computeBoundingSphere();
			chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
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
	
	function getPathControls( vertices ) {
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
	}

	function getCubicControls(vertices, closed) {
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

	function getNearFitSplinePath (controls, segments) {
		var division = "EnsemblBacteria";
		var splinePath;
		if (division == "EnsemblBacteria") {
			splinePath = new THREE.ClosedSplineCurve3(controls);
		} else {
			splinePath = new THREE.SplineCurve3(controls);			
		}
		// var splineDivisions = splinePath.getSpacedPoints(segments);
		return splinePath;
	}

	// Following paths constructed from curve segments passing through particle centers
	function getSplinePath (controls, segments) {
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
	}
	
	function getQuadPath (controls, segments) {
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
	}
	
	function getCubicPath (controls, segments, closed) {
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
		.directive('tkComponentSceneCluster', tkComponentSceneCluster);

	function tkComponentSceneCluster(Particles, Cluster) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				cluster: '=',
				overlay:'='
			},
			templateUrl: 'assets/templates/scene-cluster-icon.html',
			link: function postLink( scope, element, attrs ) {
				// console.log(scope.cluster);
				
				var renderer;
				var scene, viewport, stats;
				var camera, cameraPosition, cameraTarget, cameraTranslate;
				var ambientLight, pointLight;
				var orbit, controls, particles, cluster;
				var width, height, contW, contH, windowHalfX, windowHalfY;

				var particleOriginalColor = new THREE.Color();
				var positionOriginalColor = new THREE.Color();
				var highlightColor = new THREE.Color("#ffffff");

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
					renderer.setClearColor( 0xffffff );
					renderer.setSize( width, height );
					// renderer.autoClear = false; // To allow render overlay on top of sprited sphere
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
					orbit.noZoom = true;
					orbit.noRotate = true;
					orbit.noPan = true;
					orbit.noKeys = true;
					controls = new THREE.TrackballControls(camera, renderer.domElement);
					controls.noZoom = true;
					controls.noRotate = true;
					controls.noPan = true;
					
					// GEOMETRY: PARTICLES
					particles = new Particles( scope.cluster.data[scope.cluster.centroidIndex], scope.view.settings.particles );
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
					cameraTranslate = cluster.boundingSphere.radius * scope.view.viewpoint.scale;
					scope.lookAtTarget(cameraPosition, cameraTarget, cameraTranslate);

					// FOG SCENE
					var fogColor = 0xFFFFFF,
						fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
						fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
					// scene.fog = new THREE.Fog( fogColor, fogNear, fogFar );

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
			}
		};
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

			var defaults = {
				visible: true,
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Convert Data (single Model / set of Particles) to Vector triplets
			var clusterBufferGeometry = new THREE.BufferGeometry(); // to calculate merged bounds
			var overlayColors = Color.colorsFromHex(overlay);

			// Generate Cluster model
			var clusterEnsemble = new THREE.Object3D(); // unmerged mesh
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
			clusterBufferGeometry.computeBoundingSphere();
			clusterEnsemble.boundingSphere = clusterBufferGeometry.boundingSphere;
			clusterEnsemble.BufferGeometryometry = clusterBufferGeometry;
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
		.factory('Contacts', Contacts);

	// constructor for cluster models ensemble
	function Contacts() {
		return function(positions, distances, settings) {

			var defaults = {
				transparent: true,
				visible: false
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var contacts;
			// Distances stored as one per contact-position-pair
			// so the array needs an RGB (*3) for each pair (*2)
			// ie. each distance needs to be replicated 6 times.
			var colors = new Float32Array( distances.length * 6 );
			for (var i = distances.length - 1; i >= 0; i--) {
				for (var j = 0; j < 6; j++) {
					var pos = (i*6)+j;
					colors[pos] = distances[i];
				};
			};

			var geometry = new THREE.BufferGeometry();

			geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
			geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

			geometry.computeBoundingSphere();

			var material = new THREE.LineBasicMaterial( {
				vertexColors: THREE.VertexColors,
				blending: THREE.AdditiveBlending,
				transparent: this.transparent
			} );
			
			contacts = new THREE.Line(geometry, material, THREE.LinePieces); // THREE.LinePieces = separate lines

			contacts.name = "Contacts";
			return contacts;
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneFloatingtad', tkComponentSceneFloatingtad);

	function tkComponentSceneFloatingtad() {
		return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				var viewport, viewsize, camera, scene, renderer, geometry, material, mesh, controls;
				init();
				animate();
				function init() {
					viewport =  element[0];
					viewsize = viewport.clientWidth;

					scene = new THREE.Scene();

					camera = new THREE.PerspectiveCamera( 50, 1, 150, 650 );
					camera.position.z = 500;
					scene.add(camera);

					geometry = new THREE.TorusKnotGeometry( 100, 30, 100, 16 );

					// GENERATE TEST GEOMETRY
					// var torusgeom = new THREE.TorusKnotGeometry( 100, 10, 36, 1 );
					// var testgeom = torusgeom.vertices;
					// for (var i = testgeom.length - 1; i >= 0; i--) {
					// 	testgeom[i].x = parseInt(testgeom[i].x.toFixed(2));
					// 	testgeom[i].y = parseInt(testgeom[i].y.toFixed(2));
					// 	testgeom[i].z = parseInt(testgeom[i].z.toFixed(2));
					// };
					// console.log(JSON.stringify(testgeom));

					material = new THREE.MeshDepthMaterial({
						color: 0x666666,
						wireframe: true,
						wireframeLinewidth: 1
					});

					mesh = new THREE.Mesh( geometry, material );
					mesh.name = "Floating TAD";
					scene.add(mesh);

					if (window.WebGLRenderingContext)
 						renderer = new THREE.WebGLRenderer({alpha: true});
 					else
						renderer = new THREE.CanvasRenderer({alpha: true});
						
					renderer.setSize( viewsize, viewsize );
					viewport.appendChild( renderer.domElement );

					controls = new THREE.TrackballControls( camera, renderer.domElement );
					controls.minDistance = 450;
					controls.maxDistance = 550;

				}
				function animate() {
					requestAnimationFrame(animate);
				controls.update();
					render();
				}
				function render() {
					mesh.rotation.x += 0.006;
					mesh.rotation.y += 0.006;
					renderer.render(scene, camera);
				}
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles() {
		return function(data, settings) {
			var defaults = {
				particles: 0,
				visible: true,
				color: "#ff0000",
				size: 200,
				opacity: 0.8,
				map: "assets/img/sphere-glossy.png",
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

			var particleMap = null; // render only point
			if (this.map) particleMap = THREE.ImageUtils.loadTexture(this.map);

			var particlesMaterial = new THREE.PointCloudMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: particleMap,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			var particlesCloud = new THREE.PointCloud( particlesGeometry, particlesMaterial );
			// particlesCloud.sortParticles = true;
			particlesCloud.name = "Particles Cloud";
			
			return particlesCloud;
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
				var viewport, camera, scene, renderer, geometry, material, mesh;
				init();
				animate();
				function init() {
					viewport =  element[0];
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
					mesh = new THREE.Mesh(geometry, material);
					mesh.name = "testmesh";
					scene.add(mesh);
					if (window.WebGLRenderingContext)
 						renderer = new THREE.WebGLRenderer({alpha: true});
 					else
						renderer = new THREE.CanvasRenderer({alpha: true});
					renderer.setSize(window.innerWidth, window.innerHeight);
					viewport.appendChild(renderer.domElement);
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
					mesh.rotation.x += 0.01;
					mesh.rotation.y += 0.02;
				renderer.render(scene, camera);
				}
				// END THREE.JS TEST
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneController', SceneController);

	function SceneController( $scope ){

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

(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackContacts', tkComponentTrackContacts);

	function tkComponentTrackContacts(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				object: '=',
				view: '=',
				data: '=',
				overlay:'=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);
					// save data matrix for re-slicing as position changes
					scope.dataMatrix = scope.data;

					// FYI: data == distances
					// eg. particles a=rst,b=uvw,c=xyz
					// give matrix [aa,ab,ac,ba,bb,bc,ca,cb,cc]
					// can be filtered by no. of particles
					// totalMatrixVertices / (totalParticeles * 3)
 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.particlesCount;

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
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.object.state.heightInner),
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
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// // RESIZE
					// scope.$watch(function(){
					// 	var w = component.clientWidth;
					// 	var h = component.clientHeight;
					// 	return w + h;
					// }, function() {
					// 	scope.render(scope.data);
					// });

					// REDRAW
					scope.$watch('data', function(newData) {
						scope.render(newData);
					});
 					
					// /* Watch for Browser-wide Position updates */
					scope.$watch('settings.position', function(newPosition, oldPosition) { // deep watch as change direct and changes all?
						if ( newPosition !== oldPosition ) {
							// console.log(scope.settings.position);
							scope.getData();
							// scope.update();
						}
					});


 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getData = function() {
						// Filter if data is position dependednt matrix
						scope.dataStart = (((scope.settings.currentParticle - 1) * scope.settings.particlesCount) + 1) - 1;
						scope.dataEnd = (scope.settings.currentParticle * scope.settings.particlesCount) - 1;
						scope.data = scope.dataMatrix.subarray(scope.dataStart, scope.dataEnd);
						// console.log(scope.data);
					};
					scope.getData();

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
							.attr('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						var zoomArea = focus.append("g")
							.attr("class", "zoom")
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.attr('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', 'url(#clip)');

						var labels  = chart.append("g")
							.attr("class", "labels");

						var focusGraph = container.selectAll("rect")
							.data(data)
							.enter().append("rect")
							.attr("x", function(d, i) { return (i * particleWidth); } )
							.attr("y", verticalOffset)
							.attr("width", particleWidth)
							.attr("height", nodeHeight)
							.style("fill", nodeColor)
							.style("fill-opacity", function(d) { return d; })
							.style("stroke", nodeColor)
							.style("stroke-width", 0)
							.append("svg:title")
							.text(function(d,i) { return i + ":" + d; });

						var highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
					};

					// scope.update = function() {
					// 	svg.select("#highlight") //.style("visibility", "hidden");
					// 	.attr("x", function(d) { return xScale( scope.settings.position - (step * 0.5)); } );
					// };

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
				id: '@',
				object: '=',
				view: '=',
				data: '=',
				overlay:'=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var assemblyLength = 3200000000; // CALCULATE
					var target = scope.id;
					if (!scope.settings.position) scope.settings.position = assemblyLength / 2;
					var positions = 100; //scope.positions; // == ?
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var chrStart = 0;
					var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					var positionWidth = 1000; //focusLength / positions; // derive from...?
					// var highlightPosition = focusStart + (positionWidth * scope.settings.position);

					var focusScale = assemblyLength / focusLength;
					var focusMargin = focusScale * 0.05;
					focusScale = focusScale - (focusMargin * 2.0);
		
					var focusCenter = focusLength * 0.5;
					var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.object.state.heightInner),
						nodeHeight = 10,
						nodePadding = 0;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
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
						scope.render(scope.data);
					});

					// REDRAW
					scope.$watch('data', function(newData) {
						scope.render(newData);
					}, true);
 					
					// SLIDER
					scope.$watch('settings.position', function(newData) {
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
								.attr('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							var zoomArea = focus.append("g")
								.attr("class", "zoom")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.attr('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							chart.select(".focus").append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + nodeHeight + ")")
								.call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");
								// labels.append("text")
								// 	.attr("x", -12)
								// 	.attr("y", -3)
								// 	.attr("text-anchor", "right")
								// 	.style("font-size", "10px")
								// 	.text("3'");
								// labels.append("text")
								// 	.attr("x", width + 8)
								// 	.attr("y", -3)
								// 	.attr("text-anchor", "left")
								// 	.style("font-size", "10px")
								// 	.text("5'");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 8)
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text("<<");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 18)
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text(">>");
// TO DO: Use FontAwesome/IcoMoon...
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
									.attr("x", function(d) { return xScale( scope.settings.position - (positionWidth * 0.5)); } )
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
						.attr("x", function(d) { return xScale( scope.settings.position - (positionWidth * 0.5)); } );
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
		.directive('tkComponentTrackSlider', tkComponentTrackSlider);

	function tkComponentTrackSlider(d3Service, Resources) {
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				object: '=',
				view: '=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.d3().then(function(d3) {
				
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
					var segmentsCount = scope.view.settings.segmentsCount;
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						trackHeight = parseInt(scope.object.state.heightInner);

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0];
					var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var slider, xScale, prime3Axis, prime5Axis;
					var handleWidth, handleHeight;
					var xAxis, brush, handle;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render();
					});

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

						handleWidth = Math.max( (width / segmentsCount), 4 );
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
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text("3'");
								labels.append("text")
									.attr("x", width + 8)
									.attr("y", 26)
									.attr("text-anchor", "left")
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
							.attr("class", "handle")
							.attr("cx", xScale(scope.settings.position) - (handleWidth * 0.5))
							.attr("cy", height)
							.attr("r", handleWidth * 1.6);

							// handle.append("text")
							// 	.attr("x", xScale(scope.settings.position) - (handleWidth * 0.5))
							// 	.attr("y", height)
							// 	.attr("text-anchor", "bottom")
							// 	.style("font-size", "10px")
							// 	.text(scope.settings.position);

						slider
							.call(brush.extent([(scope.settings.position), 0]))
							.call(brush.event);
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
								handle.attr("cx", xScale(value) - (handleWidth * 0.5));

								// UPDATE position
								scope.settings.position = value;
								var currentParticle = Resources.getParticle(scope.settings.position, scope.view.viewpoint.chromStart, scope.view.viewpoint.chromEnd, scope.settings.particlesCount);
								scope.settings.currentParticle = currentParticle;
								scope.settings.segmentLower = scope.settings.position - (scope.settings.segment * 5); // * 0.5???
								scope.settings.segmentUpper = scope.settings.position + (scope.settings.segment * 5); // * 0.5???

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
				id: '@',
				object: '=',
				view: '=',
				data: '=',
				overlay:'=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var target = scope.id;
					// var assemblyLength = 3200000000; // CALCULATE
					// if (!scope.settings.position) scope.settings.position = assemblyLength / 2;
					var step = scope.view.settings.step;
					var stepWidth;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					// var chrStart = 0;
					// var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					// var highlightPosition = focusStart + (stepWidth * scope.settings.position);

					// var focusScale = assemblyLength / focusLength;
					// var focusMargin = focusScale * 0.05;
					// focusScale = focusScale - (focusMargin * 2.0);
		
					// var focusCenter = focusLength * 0.5;
					// var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.object.state.heightInner),
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
						scope.render(scope.data);
					});

					// REDRAW
					scope.$watch('data', function(newData) {
						scope.render(newData);
					}, true);
 					
					// SLIDER
					scope.$watch('settings.position', function(newData) {
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
								.attr('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							var zoomArea = focus.append("g")
								.attr("class", "zoom")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.attr('fill', 'white');

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
								// labels.append("text")
								// 	.attr("x", -12)
								// 	.attr("y", -3)
								// 	.attr("text-anchor", "right")
								// 	.style("font-size", "10px")
								// 	.text("3'");
								// labels.append("text")
								// 	.attr("x", width + 8)
								// 	.attr("y", -3)
								// 	.attr("text-anchor", "left")
								// 	.style("font-size", "10px")
								// 	.text("5'");
								// labels.append("text")
								// 	.attr("x", -18)
								// 	.attr("y", 8)
								// 	.attr("text-anchor", "right")
								// 	.style("font-size", "10px")
								// 	.text("<<");
								// labels.append("text")
								// 	.attr("x", -18)
								// 	.attr("y", 18)
								// 	.attr("text-anchor", "right")
								// 	.style("font-size", "10px")
								// 	.text(">>");
// TO DO: Use FontAwesome/IcoMoon...
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
									.attr("x", function(d) { return xScale( scope.settings.position - (step * 0.5)); } )
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
						.attr("x", function(d) { return xScale( scope.settings.position - (step * 0.5)); } );
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

	function TrackController($scope, Overlays) {
		if ($scope.overlay) {
			$scope.overlaid = $scope.overlay.object.state.overlaid;
			$scope.overlayOrig = Overlays.getOverlay(); // current overlay
			$scope.toggleOverlay = function(index) {
				$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
				if (!$scope.overlaid) {
					Overlays.setOverlaid(index);
					Overlays.set(index);
				} else {
					Overlays.setOverlaid($scope.overlayOrig.object.state.index);
					Overlays.set($scope.overlayOrig.object.state.index);
				}
				$scope.overlaid = !$scope.overlaid;
			};
		}

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
		.controller('BrowserController', BrowserController);

	function BrowserController ($scope, initialData){
		console.log("initialData");
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('HomeController', HomeController);

	function HomeController ($scope, Settings, Users){

		// if (!$scope.settings) {
		// 	$scope.settings = Settings.get();
		// 	console.log($scope.settings);
		// }
		// if (!$scope.users) {
		// 	$scope.users = Users.get();
		// 	console.log($scope.users);
		// }

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $scope, initialData, Users, Projects, Datasets, Overlays, Storyboards, Components) {
		// Set static settings from initalData
		if (!$scope.settings) {
			$scope.settings = initialData.settings;
			$scope.settings.featureColors = initialData.featureColors;
			$scope.settings.components = initialData.components;
		}

		$scope.settings.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.isProject = $state.is('project');
		});

		// Bind dynamic data to service objects
		if (!$scope.users) {
			$scope.users = Users.get();
			// LOAD DEFAULT PROJECTS AND DATA
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
		
		// Get current data to share between child views
		$scope.projects = $scope.users.loaded[$scope.users.current.index].projects;
		$scope.datasets = $scope.projects.loaded[$scope.projects.current.index].datasets;
		$scope.overlays = $scope.projects.loaded[$scope.projects.current.index].overlays;
		$scope.storyboards = $scope.projects.loaded[$scope.projects.current.index].storyboards;

		$scope.currentUser = $scope.users.loaded[$scope.users.current.index];
		$scope.currentProject = $scope.projects.loaded[$scope.projects.current.index];
		$scope.currentDataset = $scope.datasets.loaded[$scope.datasets.current.index];
		$scope.currentCluster = $scope.currentDataset.clusters[$scope.datasets.current.cluster - 1];
		$scope.currentCentroid = $scope.currentDataset.centroids[$scope.datasets.current.cluster - 1];
		$scope.currentModel = $scope.currentDataset.models[$scope.currentDataset.centroids[$scope.datasets.current.cluster - 1] - 1];

		$scope.currentOverlay = $scope.overlays.loaded[$scope.overlays.current.index];
		$scope.currentStoryboard = $scope.storyboards.loaded[$scope.storyboards.current.index];

		// Set coords to default Storyboard views from dataset
		var chromosomeIndex = 0;
		if ($scope.currentDataset.object.chromosomeIndex) {
			chromosomeIndex = $scope.currentDataset.object.chromosomeIndex;	
		}
		$scope.settings.currentChromStart = $scope.currentDataset.object.chromStart[chromosomeIndex];
		$scope.settings.currentChromEnd = $scope.currentDataset.object.chromEnd[chromosomeIndex];
		$scope.settings.currentScale = 1; //$scope.currentDataset.object.scale;
		Storyboards.setViewpoint($scope.settings.currentChromStart,$scope.settings.currentChromEnd,$scope.settings.currentScale);
		Components.setViewpoint($scope.settings.currentChromStart,$scope.settings.currentChromEnd,$scope.settings.currentScale);
		// $scope.storyboards = $scope.projects.loaded[$scope.projects.current.index].storyboards;


		// $scope.addDataset = function($fileContent) {
		// 	console.log("adding...");
		// 	Datasets.addDataset($fileContent);
		// 	$scope.currentDataset = $scope.datasets.loaded[$scope.datasets.current.index];
		// 	$state.go('dataset');
		// };


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
				tkOverlayImport : "&"
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
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayController', OverlayController);

	function OverlayController ($state, $scope, $mdDialog, $mdToast, Settings, Overlays, Components, Storyboards, uuid4) {

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			
			// Import Overlays Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: OverlayController,
				locals: {
					overlays: $scope.$parent.overlays,
				},
				onComplete: afterShowAnimation
			}).then(function(importedOverlays) {
				var overlays = Overlays.get();
				var newOverlays = [];
				var newComponents = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var componentTemplate = Components.getComponentByType(overlay.object.type);
					var overlayExists = false;
					var newComponent = angular.copy(componentTemplate);
					for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						// console.log(overlays.loaded[i].object.uuid);
						// console.log(overlay.object.uuid);
						// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
					}
					if (!overlayExists) {
						currentOverlaysIndex++;
						overlay.object.state.index = currentOverlaysIndex;
						overlay.object.state.overlaid = false;
						newOverlays.push(overlay);

						var settings = Settings.get();
						// New component for overlay
						newComponent.object.uuid = uuid4.generate();
						newComponent.object.id = overlay.object.id;
						newComponent.object.title = overlay.object.id;
						newComponent.object.dataset = overlay.object.id;
						newComponent.view.settings.step = overlay.object.step;
						newComponent.view.settings.color = overlay.object.color;
						newComponent.view.settings.segmentsCount = settings.segmentsCount;
						newComponent.view.viewpoint.chromStart = settings.currentChromStart;
						newComponent.view.viewpoint.chromEnd = settings.currentChromEnd;
						newComponent.view.viewpoint.scale = settings.currentScale;
						newComponent.view.viewtype = overlay.object.type + "-" + overlay.object.stepType;
						newComponent.data = overlay.data;
						newComponent.overlay = overlay;

						// console.log(newComponent);
						newComponents.push(newComponent);
					}
				});

				// Add newOverlays to Overlays
				overlays.loaded = overlays.loaded.concat(newOverlays);
				// Generate overlay colors
				var chromStart = Settings.get().chromStart;
				var segmentsCount = Settings.get().segmentsCount;
				var segmentLength = Settings.get().segmentLength;
				var featureTypes = Settings.get().featureTypes;
				Overlays.segmentOverlays(chromStart, segmentsCount, segmentLength, featureTypes);

				// Add new overlays as Components to Storyboard
				for (var i = newComponents.length - 1; i >= 0; i--) {
					Storyboards.addComponent("default", newComponents[i]);
				}

				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + newOverlays.length + "/" + importedOverlays.length + ") added")
				);
	 			// $state.go('overlay-filter');	
	 			$state.go('browser');	
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

		$scope.importOverlay = function($fileContent) {
			$scope.dataParsed = Papa.parse($fileContent,{
				delimiter: " ",
				dynamicTyping: true,
				fastMode: true
			});
			$scope.overlaysAcquired = Overlays.aquire($scope.dataParsed.data);
			console.log("Overlays acquired!");
			// $state.go('overlay-filter');	
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
		.controller('ProjectContentController', ProjectContentController);

	function ProjectContentController($scope) {


	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($state, $scope, Datasets, Overlays, Components){
		// console.log($scope);

		// Get dataset scene icon component
		$scope.clusterComponent = Components.getComponentById("datasets-scene-icon");

		// Set cluster color to gradient
		// Recalculate specifically for single segment per particle in cluster scene
		var gradientOverlay = Overlays.getOverlayById("gradient");
		var clusterLength = $scope.currentModel.data.length / $scope.currentDataset.object.components;
		var gradientColors = Overlays.segmentGradientHCL(gradientOverlay.data, clusterLength);
		$scope.clusterComponent.overlay = gradientColors;

		// Calculate consistent camera position (translation) from combined dataset models
		var datasetModels = new THREE.BufferGeometry();
		for (var h = $scope.currentDataset.models.length - 1; h >= 0; h--) {
			datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.currentDataset.models[i], 3 ) );
		}
		datasetModels.computeBoundingSphere();
		$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius;

		// Create collection of cluster models
		$scope.clusters = [];
		var clusterLists = $scope.currentDataset.clusters;
		var models = $scope.currentDataset.models;
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
			console.log("Current Cluster: " + (index+1) + "(Centroid Model: " + $scope.centroidRef + ")");
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

            var onDragOver = function (e) {
                e.preventDefault();
                element.addClass("dragOver");
            };
 
            var onDragEnd = function (e) {
               e.preventDefault();
                element.removeClass("dragOver");
            };

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
  
	            // element.bind('drop', function(evt) {
	            //     evt.stopPropagation();
	            //     evt.preventDefault();

	            //     var files = evt.dataTransfer.files;
	            //     for (var i = 0; i <= files.length; i++) {
	            //     		var f = files[i];
	            //         var reader = new FileReader();
	            //         reader.readAsArrayBuffer(f);

	            //         reader.onload = (function(theFile) {
	            //             return function(e) {
	            //                 var newFile = { name : theFile.name,
	            //                     type : theFile.type,
	            //                     size : theFile.size,
	            //                     lastModifiedDate : theFile.lastModifiedDate
	            //                 };

	            //                 scope.addfile(newFile);
	            //             };
	            //         })(f);
	            //     }
	            // });

	        }
	    };
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($state, $scope, $timeout, Datasets) {
			// console.log($scope);

		$scope.addDataset = function($fileContent) {
			console.log("Adding dataset...");
			Datasets.add($fileContent);
			// console.log($scope.currentDataset.object.title);
			$scope.$parent.currentDataset = Datasets.getDataset(); //$scope.datasets.loaded[$scope.datasets.current.index];
			$scope.$parent.currentModel = Datasets.getModel(); //$scope.datasets.loaded[$scope.datasets.current.index];
			// console.log($scope.currentDataset.object.title);
			$state.go('dataset');
		};

		// $scope.openInput = function() {
		// 	$timeout(function() {
		// 		angular.element("file-input").trigger('click');
		// 	}, 0);
		// };

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
		.controller('ProjectUploadController', ProjectUploadController);

	function ProjectUploadController($scope, FileUploader) {
		$scope.uploader = new FileUploader();
		
		// console.log($scope.uploader);
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

	function StoryboardController($window, $scope, Settings, Datasets, Overlays, Resources) {
		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });

		// SET DERIVED DATA AND ATTRIBUTES ON COMPONENTS
		var defaultIndex = 0; // ?? used in components and overlays OR use currentIndex?
		
		var particlesCount = $scope.currentModel.data.length / $scope.currentDataset.object.components;
		var particleSegments = $scope.currentStoryboard.components[defaultIndex].view.settings.chromatin.particleSegments;
		var segmentsCount = particlesCount * particleSegments;
		var chromosomeIndex = 0;
		if ($scope.currentDataset.object.chromosomeIndex) {
			chromosomeIndex = $scope.currentDataset.object.chromosomeIndex;	
		}
		var dataStart = $scope.currentDataset.object.chromStart[chromosomeIndex];
		var dataEnd = $scope.currentDataset.object.chromEnd[chromosomeIndex];
		var segmentLength = $scope.currentStoryboard.components[defaultIndex].view.settings.chromatin.segmentLength = $scope.currentDataset.object.resolution / particleSegments; // base pairs

		// SET INITIAL position
		var position = dataStart + parseInt((dataEnd - dataStart) * 0.5);
		$scope.settings.position = position;
		var currentParticle = Resources.getParticle(position, dataStart, dataEnd, particlesCount);
		$scope.settings.currentParticle = currentParticle; 

		// AND SEGMENT IT LIES WITHIN
		$scope.settings.segment = Math.floor( ($scope.settings.position - dataStart) / segmentLength);
		$scope.settings.segmentLower = $scope.settings.position - ($scope.settings.segment * 0.5);
		$scope.settings.segmentUpper = $scope.settings.position + ($scope.settings.segment * 0.5);

		// $scope.currentModel = Datasets.getDataset(); // already set in Main
		$scope.currentOverlays = Overlays.get(); // CHANGE TO USE $scope.overlays
		// $scope.currentOverlayIndex = $scope.currentOverlays.current.index;

		$scope.proximityMatrix = Resources.getProximityMatrix($scope.currentModel.data);

		angular.forEach( $scope.currentStoryboard.components, function(value, index) {
			var overlay;
			// if (value.object.dataset == "default") {
				if (value.object.type == "scene") {
					value.data = $scope.currentModel.data;
					value.overlay = $scope.currentOverlays.loaded[$scope.currentOverlays.current.index];
					// value.overlayIndex = $scope.currentOverlays.current.index;
					value.contacts = $scope.proximityMatrix;
					value.overlay.state = {};
					value.overlay.object.state.index = $scope.currentOverlays.current.index; // for track
				} else if (value.object.type == "track-slider") {
					value.view.viewpoint.segmentsCount = $scope.settings.segmentsCount;
				} else if (value.object.type == "track-genes" || value.object.type == "panel-inspector") {
					overlay = Overlays.getOverlayById("genes");
					value.view.settings.segmentsCount = $scope.settings.segmentsCount;
					value.data = overlay.data;
					value.overlay = overlay;
				} else if (value.object.type == "track-contacts") {
					value.data = $scope.proximityMatrix.distances;
					value.view.settings.segmentsCount = $scope.settings.segmentsCount;
				} else if (value.object.type == "track-wiggle") {
					overlay = Overlays.getOverlayById(value.object.dataset);
					value.view.settings.segmentsCount = $scope.settings.segmentsCount;
					value.data = overlay.data;
					value.overlay = overlay;
				} else {
					// other types of component...
				}
			// }
		});
		// console.log($scope.currentStoryboard);
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkStoryboard', tkStoryboard);

	function tkStoryboard() {
		return {
			restrict:'EA',
			templateUrl: 'assets/templates/storyboard-components.html',
			link:function(scope, element, attrs){
				// console.log(scope);
			}
		};
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
		.service('colorConvert', colorConvert);

	function colorConvert() {
		var rootObj = this;
		rootObj.re_ = {
		  // An X11 "rgb:ddd/ddd/ddd" value.
		  x11rgb: /^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,
		};		
		/**
		 * Named colors according to the stock X11 rgb.txt file.
		 */
		rootObj.colorNames = {
			// ADDED FOR ENSEMBL WEBCODE COLORS
			"transparent": "rgb(0, 0, 0)", // should be rgba...
	//		"rust": "rgb(183, 65, 14)", // ORIGINL ENSEMBL RUST
			"rust": "rgb(243, 137, 92)", // HALF INTENSITY OF RUST
			"stripes": "rgb(255, 54, 54)",
			"dark_blue": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue1": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue2": "rgb(173, 216, 230)", // FROM ENSEMBL DOCS = LIGHT BLUE
			"border:grey70": "rgb(179, 179, 179)", // FROM ENSEMBL ERROR? = GREY70
			// X11 COLOR NAMES
		  "aliceblue": "rgb(240, 248, 255)", "antiquewhite": "rgb(250, 235, 215)", "antiquewhite1": "rgb(255, 239, 219)", "antiquewhite2": "rgb(238, 223, 204)", "antiquewhite3": "rgb(205, 192, 176)", "antiquewhite4": "rgb(139, 131, 120)", "aquamarine": "rgb(127, 255, 212)", "aquamarine1": "rgb(127, 255, 212)", "aquamarine2": "rgb(118, 238, 198)", "aquamarine3": "rgb(102, 205, 170)", "aquamarine4": "rgb(69, 139, 116)", "azure": "rgb(240, 255, 255)", "azure1": "rgb(240, 255, 255)", "azure2": "rgb(224, 238, 238)", "azure3": "rgb(193, 205, 205)", "azure4": "rgb(131, 139, 139)", "beige": "rgb(245, 245, 220)", "bisque": "rgb(255, 228, 196)", "bisque1": "rgb(255, 228, 196)", "bisque2": "rgb(238, 213, 183)", "bisque3": "rgb(205, 183, 158)", "bisque4": "rgb(139, 125, 107)", "black": "rgb(0, 0, 0)", "blanchedalmond": "rgb(255, 235, 205)", "blue": "rgb(0, 0, 255)", "blue1": "rgb(0, 0, 255)", "blue2": "rgb(0, 0, 238)", "blue3": "rgb(0, 0, 205)", "blue4": "rgb(0, 0, 139)", "blueviolet": "rgb(138, 43, 226)", "brown": "rgb(165, 42, 42)", "brown1": "rgb(255, 64, 64)", "brown2": "rgb(238, 59, 59)", "brown3": "rgb(205, 51, 51)", "brown4": "rgb(139, 35, 35)", "burlywood": "rgb(222, 184, 135)", "burlywood1": "rgb(255, 211, 155)", "burlywood2": "rgb(238, 197, 145)", "burlywood3": "rgb(205, 170, 125)", "burlywood4": "rgb(139, 115, 85)", "cadetblue": "rgb(95, 158, 160)", "cadetblue1": "rgb(152, 245, 255)", "cadetblue2": "rgb(142, 229, 238)", "cadetblue3": "rgb(122, 197, 205)", "cadetblue4": "rgb(83, 134, 139)", "chartreuse": "rgb(127, 255, 0)", "chartreuse1": "rgb(127, 255, 0)", "chartreuse2": "rgb(118, 238, 0)", "chartreuse3": "rgb(102, 205, 0)", "chartreuse4": "rgb(69, 139, 0)", "chocolate": "rgb(210, 105, 30)", "chocolate1": "rgb(255, 127, 36)", "chocolate2": "rgb(238, 118, 33)", "chocolate3": "rgb(205, 102, 29)", "chocolate4": "rgb(139, 69, 19)", "coral": "rgb(255, 127, 80)", "coral1": "rgb(255, 114, 86)", "coral2": "rgb(238, 106, 80)", "coral3": "rgb(205, 91, 69)", "coral4": "rgb(139, 62, 47)", "cornflowerblue": "rgb(100, 149, 237)", "cornsilk": "rgb(255, 248, 220)", "cornsilk1": "rgb(255, 248, 220)", "cornsilk2": "rgb(238, 232, 205)", "cornsilk3": "rgb(205, 200, 177)", "cornsilk4": "rgb(139, 136, 120)", "cyan": "rgb(0, 255, 255)", "cyan1": "rgb(0, 255, 255)", "cyan2": "rgb(0, 238, 238)", "cyan3": "rgb(0, 205, 205)", "cyan4": "rgb(0, 139, 139)", "darkblue": "rgb(0, 0, 139)", "darkcyan": "rgb(0, 139, 139)", "darkgoldenrod": "rgb(184, 134, 11)", "darkgoldenrod1": "rgb(255, 185, 15)", "darkgoldenrod2": "rgb(238, 173, 14)", "darkgoldenrod3": "rgb(205, 149, 12)", "darkgoldenrod4": "rgb(139, 101, 8)", "darkgray": "rgb(169, 169, 169)", "darkgreen": "rgb(0, 100, 0)", "darkgrey": "rgb(169, 169, 169)", "darkkhaki": "rgb(189, 183, 107)", "darkmagenta": "rgb(139, 0, 139)", "darkolivegreen": "rgb(85, 107, 47)", "darkolivegreen1": "rgb(202, 255, 112)", "darkolivegreen2": "rgb(188, 238, 104)", "darkolivegreen3": "rgb(162, 205, 90)", "darkolivegreen4": "rgb(110, 139, 61)", "darkorange": "rgb(255, 140, 0)", "darkorange1": "rgb(255, 127, 0)", "darkorange2": "rgb(238, 118, 0)", "darkorange3": "rgb(205, 102, 0)", "darkorange4": "rgb(139, 69, 0)", "darkorchid": "rgb(153, 50, 204)", "darkorchid1": "rgb(191, 62, 255)", "darkorchid2": "rgb(178, 58, 238)", "darkorchid3": "rgb(154, 50, 205)", "darkorchid4": "rgb(104, 34, 139)", "darkred": "rgb(139, 0, 0)", "darksalmon": "rgb(233, 150, 122)", "darkseagreen": "rgb(143, 188, 143)", "darkseagreen1": "rgb(193, 255, 193)", "darkseagreen2": "rgb(180, 238, 180)", "darkseagreen3": "rgb(155, 205, 155)", "darkseagreen4": "rgb(105, 139, 105)", "darkslateblue": "rgb(72, 61, 139)", "darkslategray": "rgb(47, 79, 79)", "darkslategray1": "rgb(151, 255, 255)", "darkslategray2": "rgb(141, 238, 238)", "darkslategray3": "rgb(121, 205, 205)", "darkslategray4": "rgb(82, 139, 139)", "darkslategrey": "rgb(47, 79, 79)", "darkturquoise": "rgb(0, 206, 209)", "darkviolet": "rgb(148, 0, 211)", "debianred": "rgb(215, 7, 81)", "deeppink": "rgb(255, 20, 147)", "deeppink1": "rgb(255, 20, 147)", "deeppink2": "rgb(238, 18, 137)", "deeppink3": "rgb(205, 16, 118)", "deeppink4": "rgb(139, 10, 80)", "deepskyblue": "rgb(0, 191, 255)", "deepskyblue1": "rgb(0, 191, 255)", "deepskyblue2": "rgb(0, 178, 238)", "deepskyblue3": "rgb(0, 154, 205)", "deepskyblue4": "rgb(0, 104, 139)", "dimgray": "rgb(105, 105, 105)", "dimgrey": "rgb(105, 105, 105)", "dodgerblue": "rgb(30, 144, 255)", "dodgerblue1": "rgb(30, 144, 255)", "dodgerblue2": "rgb(28, 134, 238)", "dodgerblue3": "rgb(24, 116, 205)", "dodgerblue4": "rgb(16, 78, 139)", "firebrick": "rgb(178, 34, 34)", "firebrick1": "rgb(255, 48, 48)", "firebrick2": "rgb(238, 44, 44)", "firebrick3": "rgb(205, 38, 38)", "firebrick4": "rgb(139, 26, 26)", "floralwhite": "rgb(255, 250, 240)", "forestgreen": "rgb(34, 139, 34)", "gainsboro": "rgb(220, 220, 220)", "ghostwhite": "rgb(248, 248, 255)", "gold": "rgb(255, 215, 0)", "gold1": "rgb(255, 215, 0)", "gold2": "rgb(238, 201, 0)", "gold3": "rgb(205, 173, 0)", "gold4": "rgb(139, 117, 0)", "goldenrod": "rgb(218, 165, 32)", "goldenrod1": "rgb(255, 193, 37)", "goldenrod2": "rgb(238, 180, 34)", "goldenrod3": "rgb(205, 155, 29)", "goldenrod4": "rgb(139, 105, 20)", "gray": "rgb(190, 190, 190)", "gray0": "rgb(0, 0, 0)", "gray1": "rgb(3, 3, 3)", "gray10": "rgb(26, 26, 26)", "gray100": "rgb(255, 255, 255)", "gray11": "rgb(28, 28, 28)", "gray12": "rgb(31, 31, 31)", "gray13": "rgb(33, 33, 33)", "gray14": "rgb(36, 36, 36)", "gray15": "rgb(38, 38, 38)", "gray16": "rgb(41, 41, 41)", "gray17": "rgb(43, 43, 43)", "gray18": "rgb(46, 46, 46)", "gray19": "rgb(48, 48, 48)", "gray2": "rgb(5, 5, 5)", "gray20": "rgb(51, 51, 51)", "gray21": "rgb(54, 54, 54)", "gray22": "rgb(56, 56, 56)", "gray23": "rgb(59, 59, 59)", "gray24": "rgb(61, 61, 61)", "gray25": "rgb(64, 64, 64)", "gray26": "rgb(66, 66, 66)", "gray27": "rgb(69, 69, 69)", "gray28": "rgb(71, 71, 71)", "gray29": "rgb(74, 74, 74)", "gray3": "rgb(8, 8, 8)", "gray30": "rgb(77, 77, 77)", "gray31": "rgb(79, 79, 79)", "gray32": "rgb(82, 82, 82)", "gray33": "rgb(84, 84, 84)", "gray34": "rgb(87, 87, 87)", "gray35": "rgb(89, 89, 89)", "gray36": "rgb(92, 92, 92)", "gray37": "rgb(94, 94, 94)", "gray38": "rgb(97, 97, 97)", "gray39": "rgb(99, 99, 99)", "gray4": "rgb(10, 10, 10)", "gray40": "rgb(102, 102, 102)", "gray41": "rgb(105, 105, 105)", "gray42": "rgb(107, 107, 107)", "gray43": "rgb(110, 110, 110)", "gray44": "rgb(112, 112, 112)", "gray45": "rgb(115, 115, 115)", "gray46": "rgb(117, 117, 117)", "gray47": "rgb(120, 120, 120)", "gray48": "rgb(122, 122, 122)", "gray49": "rgb(125, 125, 125)", "gray5": "rgb(13, 13, 13)", "gray50": "rgb(127, 127, 127)", "gray51": "rgb(130, 130, 130)", "gray52": "rgb(133, 133, 133)", "gray53": "rgb(135, 135, 135)", "gray54": "rgb(138, 138, 138)", "gray55": "rgb(140, 140, 140)", "gray56": "rgb(143, 143, 143)", "gray57": "rgb(145, 145, 145)", "gray58": "rgb(148, 148, 148)", "gray59": "rgb(150, 150, 150)", "gray6": "rgb(15, 15, 15)", "gray60": "rgb(153, 153, 153)", "gray61": "rgb(156, 156, 156)", "gray62": "rgb(158, 158, 158)", "gray63": "rgb(161, 161, 161)", "gray64": "rgb(163, 163, 163)", "gray65": "rgb(166, 166, 166)", "gray66": "rgb(168, 168, 168)", "gray67": "rgb(171, 171, 171)", "gray68": "rgb(173, 173, 173)", "gray69": "rgb(176, 176, 176)", "gray7": "rgb(18, 18, 18)", "gray70": "rgb(179, 179, 179)", "gray71": "rgb(181, 181, 181)", "gray72": "rgb(184, 184, 184)", "gray73": "rgb(186, 186, 186)", "gray74": "rgb(189, 189, 189)", "gray75": "rgb(191, 191, 191)", "gray76": "rgb(194, 194, 194)", "gray77": "rgb(196, 196, 196)", "gray78": "rgb(199, 199, 199)", "gray79": "rgb(201, 201, 201)", "gray8": "rgb(20, 20, 20)", "gray80": "rgb(204, 204, 204)", "gray81": "rgb(207, 207, 207)", "gray82": "rgb(209, 209, 209)", "gray83": "rgb(212, 212, 212)", "gray84": "rgb(214, 214, 214)", "gray85": "rgb(217, 217, 217)", "gray86": "rgb(219, 219, 219)", "gray87": "rgb(222, 222, 222)", "gray88": "rgb(224, 224, 224)", "gray89": "rgb(227, 227, 227)", "gray9": "rgb(23, 23, 23)", "gray90": "rgb(229, 229, 229)", "gray91": "rgb(232, 232, 232)", "gray92": "rgb(235, 235, 235)", "gray93": "rgb(237, 237, 237)", "gray94": "rgb(240, 240, 240)", "gray95": "rgb(242, 242, 242)", "gray96": "rgb(245, 245, 245)", "gray97": "rgb(247, 247, 247)", "gray98": "rgb(250, 250, 250)", "gray99": "rgb(252, 252, 252)", "green": "rgb(0, 255, 0)", "green1": "rgb(0, 255, 0)", "green2": "rgb(0, 238, 0)", "green3": "rgb(0, 205, 0)", "green4": "rgb(0, 139, 0)", "greenyellow": "rgb(173, 255, 47)", "grey": "rgb(190, 190, 190)", "grey0": "rgb(0, 0, 0)", "grey1": "rgb(3, 3, 3)", "grey10": "rgb(26, 26, 26)", "grey100": "rgb(255, 255, 255)", "grey11": "rgb(28, 28, 28)", "grey12": "rgb(31, 31, 31)", "grey13": "rgb(33, 33, 33)", "grey14": "rgb(36, 36, 36)", "grey15": "rgb(38, 38, 38)", "grey16": "rgb(41, 41, 41)", "grey17": "rgb(43, 43, 43)", "grey18": "rgb(46, 46, 46)", "grey19": "rgb(48, 48, 48)", "grey2": "rgb(5, 5, 5)", "grey20": "rgb(51, 51, 51)", "grey21": "rgb(54, 54, 54)", "grey22": "rgb(56, 56, 56)", "grey23": "rgb(59, 59, 59)", "grey24": "rgb(61, 61, 61)", "grey25": "rgb(64, 64, 64)", "grey26": "rgb(66, 66, 66)", "grey27": "rgb(69, 69, 69)", "grey28": "rgb(71, 71, 71)", "grey29": "rgb(74, 74, 74)", "grey3": "rgb(8, 8, 8)", "grey30": "rgb(77, 77, 77)", "grey31": "rgb(79, 79, 79)", "grey32": "rgb(82, 82, 82)", "grey33": "rgb(84, 84, 84)", "grey34": "rgb(87, 87, 87)", "grey35": "rgb(89, 89, 89)", "grey36": "rgb(92, 92, 92)", "grey37": "rgb(94, 94, 94)", "grey38": "rgb(97, 97, 97)", "grey39": "rgb(99, 99, 99)", "grey4": "rgb(10, 10, 10)", "grey40": "rgb(102, 102, 102)", "grey41": "rgb(105, 105, 105)", "grey42": "rgb(107, 107, 107)", "grey43": "rgb(110, 110, 110)", "grey44": "rgb(112, 112, 112)", "grey45": "rgb(115, 115, 115)", "grey46": "rgb(117, 117, 117)", "grey47": "rgb(120, 120, 120)", "grey48": "rgb(122, 122, 122)", "grey49": "rgb(125, 125, 125)", "grey5": "rgb(13, 13, 13)", "grey50": "rgb(127, 127, 127)", "grey51": "rgb(130, 130, 130)", "grey52": "rgb(133, 133, 133)", "grey53": "rgb(135, 135, 135)", "grey54": "rgb(138, 138, 138)", "grey55": "rgb(140, 140, 140)", "grey56": "rgb(143, 143, 143)", "grey57": "rgb(145, 145, 145)", "grey58": "rgb(148, 148, 148)", "grey59": "rgb(150, 150, 150)", "grey6": "rgb(15, 15, 15)", "grey60": "rgb(153, 153, 153)", "grey61": "rgb(156, 156, 156)", "grey62": "rgb(158, 158, 158)", "grey63": "rgb(161, 161, 161)", "grey64": "rgb(163, 163, 163)", "grey65": "rgb(166, 166, 166)", "grey66": "rgb(168, 168, 168)", "grey67": "rgb(171, 171, 171)", "grey68": "rgb(173, 173, 173)", "grey69": "rgb(176, 176, 176)", "grey7": "rgb(18, 18, 18)", "grey70": "rgb(179, 179, 179)", "grey71": "rgb(181, 181, 181)", "grey72": "rgb(184, 184, 184)", "grey73": "rgb(186, 186, 186)", "grey74": "rgb(189, 189, 189)", "grey75": "rgb(191, 191, 191)", "grey76": "rgb(194, 194, 194)", "grey77": "rgb(196, 196, 196)", "grey78": "rgb(199, 199, 199)", "grey79": "rgb(201, 201, 201)", "grey8": "rgb(20, 20, 20)", "grey80": "rgb(204, 204, 204)", "grey81": "rgb(207, 207, 207)", "grey82": "rgb(209, 209, 209)", "grey83": "rgb(212, 212, 212)", "grey84": "rgb(214, 214, 214)", "grey85": "rgb(217, 217, 217)", "grey86": "rgb(219, 219, 219)", "grey87": "rgb(222, 222, 222)", "grey88": "rgb(224, 224, 224)", "grey89": "rgb(227, 227, 227)", "grey9": "rgb(23, 23, 23)", "grey90": "rgb(229, 229, 229)", "grey91": "rgb(232, 232, 232)", "grey92": "rgb(235, 235, 235)", "grey93": "rgb(237, 237, 237)", "grey94": "rgb(240, 240, 240)", "grey95": "rgb(242, 242, 242)", "grey96": "rgb(245, 245, 245)", "grey97": "rgb(247, 247, 247)", "grey98": "rgb(250, 250, 250)", "grey99": "rgb(252, 252, 252)", "honeydew": "rgb(240, 255, 240)", "honeydew1": "rgb(240, 255, 240)", "honeydew2": "rgb(224, 238, 224)", "honeydew3": "rgb(193, 205, 193)", "honeydew4": "rgb(131, 139, 131)", "hotpink": "rgb(255, 105, 180)", "hotpink1": "rgb(255, 110, 180)", "hotpink2": "rgb(238, 106, 167)", "hotpink3": "rgb(205, 96, 144)", "hotpink4": "rgb(139, 58, 98)", "indianred": "rgb(205, 92, 92)", "indianred1": "rgb(255, 106, 106)", "indianred2": "rgb(238, 99, 99)", "indianred3": "rgb(205, 85, 85)", "indianred4": "rgb(139, 58, 58)", "ivory": "rgb(255, 255, 240)", "ivory1": "rgb(255, 255, 240)", "ivory2": "rgb(238, 238, 224)", "ivory3": "rgb(205, 205, 193)", "ivory4": "rgb(139, 139, 131)", "khaki": "rgb(240, 230, 140)", "khaki1": "rgb(255, 246, 143)", "khaki2": "rgb(238, 230, 133)", "khaki3": "rgb(205, 198, 115)", "khaki4": "rgb(139, 134, 78)", "lavender": "rgb(230, 230, 250)", "lavenderblush": "rgb(255, 240, 245)", "lavenderblush1": "rgb(255, 240, 245)", "lavenderblush2": "rgb(238, 224, 229)", "lavenderblush3": "rgb(205, 193, 197)", "lavenderblush4": "rgb(139, 131, 134)", "lawngreen": "rgb(124, 252, 0)", "lemonchiffon": "rgb(255, 250, 205)", "lemonchiffon1": "rgb(255, 250, 205)", "lemonchiffon2": "rgb(238, 233, 191)", "lemonchiffon3": "rgb(205, 201, 165)", "lemonchiffon4": "rgb(139, 137, 112)", "lightblue": "rgb(173, 216, 230)", "lightblue1": "rgb(191, 239, 255)", "lightblue2": "rgb(178, 223, 238)", "lightblue3": "rgb(154, 192, 205)", "lightblue4": "rgb(104, 131, 139)", "lightcoral": "rgb(240, 128, 128)", "lightcyan": "rgb(224, 255, 255)", "lightcyan1": "rgb(224, 255, 255)", "lightcyan2": "rgb(209, 238, 238)", "lightcyan3": "rgb(180, 205, 205)", "lightcyan4": "rgb(122, 139, 139)", "lightgoldenrod": "rgb(238, 221, 130)", "lightgoldenrod1": "rgb(255, 236, 139)", "lightgoldenrod2": "rgb(238, 220, 130)", "lightgoldenrod3": "rgb(205, 190, 112)", "lightgoldenrod4": "rgb(139, 129, 76)", "lightgoldenrodyellow": "rgb(250, 250, 210)", "lightgray": "rgb(211, 211, 211)", "lightgreen": "rgb(144, 238, 144)", "lightgrey": "rgb(211, 211, 211)", "lightpink": "rgb(255, 182, 193)", "lightpink1": "rgb(255, 174, 185)", "lightpink2": "rgb(238, 162, 173)", "lightpink3": "rgb(205, 140, 149)", "lightpink4": "rgb(139, 95, 101)", "lightsalmon": "rgb(255, 160, 122)", "lightsalmon1": "rgb(255, 160, 122)", "lightsalmon2": "rgb(238, 149, 114)", "lightsalmon3": "rgb(205, 129, 98)", "lightsalmon4": "rgb(139, 87, 66)", "lightseagreen": "rgb(32, 178, 170)", "lightskyblue": "rgb(135, 206, 250)", "lightskyblue1": "rgb(176, 226, 255)", "lightskyblue2": "rgb(164, 211, 238)", "lightskyblue3": "rgb(141, 182, 205)", "lightskyblue4": "rgb(96, 123, 139)", "lightslateblue": "rgb(132, 112, 255)", "lightslategray": "rgb(119, 136, 153)", "lightslategrey": "rgb(119, 136, 153)", "lightsteelblue": "rgb(176, 196, 222)", "lightsteelblue1": "rgb(202, 225, 255)", "lightsteelblue2": "rgb(188, 210, 238)", "lightsteelblue3": "rgb(162, 181, 205)", "lightsteelblue4": "rgb(110, 123, 139)", "lightyellow": "rgb(255, 255, 224)", "lightyellow1": "rgb(255, 255, 224)", "lightyellow2": "rgb(238, 238, 209)", "lightyellow3": "rgb(205, 205, 180)", "lightyellow4": "rgb(139, 139, 122)", "limegreen": "rgb(50, 205, 50)", "linen": "rgb(250, 240, 230)", "magenta": "rgb(255, 0, 255)", "magenta1": "rgb(255, 0, 255)", "magenta2": "rgb(238, 0, 238)", "magenta3": "rgb(205, 0, 205)", "magenta4": "rgb(139, 0, 139)", "maroon": "rgb(176, 48, 96)", "maroon1": "rgb(255, 52, 179)", "maroon2": "rgb(238, 48, 167)", "maroon3": "rgb(205, 41, 144)", "maroon4": "rgb(139, 28, 98)", "mediumaquamarine": "rgb(102, 205, 170)", "mediumblue": "rgb(0, 0, 205)", "mediumorchid": "rgb(186, 85, 211)", "mediumorchid1": "rgb(224, 102, 255)", "mediumorchid2": "rgb(209, 95, 238)", "mediumorchid3": "rgb(180, 82, 205)", "mediumorchid4": "rgb(122, 55, 139)", "mediumpurple": "rgb(147, 112, 219)", "mediumpurple1": "rgb(171, 130, 255)", "mediumpurple2": "rgb(159, 121, 238)", "mediumpurple3": "rgb(137, 104, 205)", "mediumpurple4": "rgb(93, 71, 139)", "mediumseagreen": "rgb(60, 179, 113)", "mediumslateblue": "rgb(123, 104, 238)", "mediumspringgreen": "rgb(0, 250, 154)", "mediumturquoise": "rgb(72, 209, 204)", "mediumvioletred": "rgb(199, 21, 133)", "midnightblue": "rgb(25, 25, 112)", "mintcream": "rgb(245, 255, 250)", "mistyrose": "rgb(255, 228, 225)", "mistyrose1": "rgb(255, 228, 225)", "mistyrose2": "rgb(238, 213, 210)", "mistyrose3": "rgb(205, 183, 181)", "mistyrose4": "rgb(139, 125, 123)", "moccasin": "rgb(255, 228, 181)", "navajowhite": "rgb(255, 222, 173)", "navajowhite1": "rgb(255, 222, 173)", "navajowhite2": "rgb(238, 207, 161)", "navajowhite3": "rgb(205, 179, 139)", "navajowhite4": "rgb(139, 121, 94)", "navy": "rgb(0, 0, 128)", "navyblue": "rgb(0, 0, 128)", "oldlace": "rgb(253, 245, 230)", "olivedrab": "rgb(107, 142, 35)", "olivedrab1": "rgb(192, 255, 62)", "olivedrab2": "rgb(179, 238, 58)", "olivedrab3": "rgb(154, 205, 50)", "olivedrab4": "rgb(105, 139, 34)", "orange": "rgb(255, 165, 0)", "orange1": "rgb(255, 165, 0)", "orange2": "rgb(238, 154, 0)", "orange3": "rgb(205, 133, 0)", "orange4": "rgb(139, 90, 0)", "orangered": "rgb(255, 69, 0)", "orangered1": "rgb(255, 69, 0)", "orangered2": "rgb(238, 64, 0)", "orangered3": "rgb(205, 55, 0)", "orangered4": "rgb(139, 37, 0)", "orchid": "rgb(218, 112, 214)", "orchid1": "rgb(255, 131, 250)", "orchid2": "rgb(238, 122, 233)", "orchid3": "rgb(205, 105, 201)", "orchid4": "rgb(139, 71, 137)", "palegoldenrod": "rgb(238, 232, 170)", "palegreen": "rgb(152, 251, 152)", "palegreen1": "rgb(154, 255, 154)", "palegreen2": "rgb(144, 238, 144)", "palegreen3": "rgb(124, 205, 124)", "palegreen4": "rgb(84, 139, 84)", "paleturquoise": "rgb(175, 238, 238)", "paleturquoise1": "rgb(187, 255, 255)", "paleturquoise2": "rgb(174, 238, 238)", "paleturquoise3": "rgb(150, 205, 205)", "paleturquoise4": "rgb(102, 139, 139)", "palevioletred": "rgb(219, 112, 147)", "palevioletred1": "rgb(255, 130, 171)", "palevioletred2": "rgb(238, 121, 159)", "palevioletred3": "rgb(205, 104, 137)", "palevioletred4": "rgb(139, 71, 93)", "papayawhip": "rgb(255, 239, 213)", "peachpuff": "rgb(255, 218, 185)", "peachpuff1": "rgb(255, 218, 185)", "peachpuff2": "rgb(238, 203, 173)", "peachpuff3": "rgb(205, 175, 149)", "peachpuff4": "rgb(139, 119, 101)", "peru": "rgb(205, 133, 63)", "pink": "rgb(255, 192, 203)", "pink1": "rgb(255, 181, 197)", "pink2": "rgb(238, 169, 184)", "pink3": "rgb(205, 145, 158)", "pink4": "rgb(139, 99, 108)", "plum": "rgb(221, 160, 221)", "plum1": "rgb(255, 187, 255)", "plum2": "rgb(238, 174, 238)", "plum3": "rgb(205, 150, 205)", "plum4": "rgb(139, 102, 139)", "powderblue": "rgb(176, 224, 230)", "purple": "rgb(160, 32, 240)", "purple1": "rgb(155, 48, 255)", "purple2": "rgb(145, 44, 238)", "purple3": "rgb(125, 38, 205)", "purple4": "rgb(85, 26, 139)", "red": "rgb(255, 0, 0)", "red1": "rgb(255, 0, 0)", "red2": "rgb(238, 0, 0)", "red3": "rgb(205, 0, 0)", "red4": "rgb(139, 0, 0)", "rosybrown": "rgb(188, 143, 143)", "rosybrown1": "rgb(255, 193, 193)", "rosybrown2": "rgb(238, 180, 180)", "rosybrown3": "rgb(205, 155, 155)", "rosybrown4": "rgb(139, 105, 105)", "royalblue": "rgb(65, 105, 225)", "royalblue1": "rgb(72, 118, 255)", "royalblue2": "rgb(67, 110, 238)", "royalblue3": "rgb(58, 95, 205)", "royalblue4": "rgb(39, 64, 139)", "saddlebrown": "rgb(139, 69, 19)", "salmon": "rgb(250, 128, 114)", "salmon1": "rgb(255, 140, 105)", "salmon2": "rgb(238, 130, 98)", "salmon3": "rgb(205, 112, 84)", "salmon4": "rgb(139, 76, 57)", "sandybrown": "rgb(244, 164, 96)", "seagreen": "rgb(46, 139, 87)", "seagreen1": "rgb(84, 255, 159)", "seagreen2": "rgb(78, 238, 148)", "seagreen3": "rgb(67, 205, 128)", "seagreen4": "rgb(46, 139, 87)", "seashell": "rgb(255, 245, 238)", "seashell1": "rgb(255, 245, 238)", "seashell2": "rgb(238, 229, 222)", "seashell3": "rgb(205, 197, 191)", "seashell4": "rgb(139, 134, 130)", "sienna": "rgb(160, 82, 45)", "sienna1": "rgb(255, 130, 71)", "sienna2": "rgb(238, 121, 66)", "sienna3": "rgb(205, 104, 57)", "sienna4": "rgb(139, 71, 38)", "skyblue": "rgb(135, 206, 235)", "skyblue1": "rgb(135, 206, 255)", "skyblue2": "rgb(126, 192, 238)", "skyblue3": "rgb(108, 166, 205)", "skyblue4": "rgb(74, 112, 139)", "slateblue": "rgb(106, 90, 205)", "slateblue1": "rgb(131, 111, 255)", "slateblue2": "rgb(122, 103, 238)", "slateblue3": "rgb(105, 89, 205)", "slateblue4": "rgb(71, 60, 139)", "slategray": "rgb(112, 128, 144)", "slategray1": "rgb(198, 226, 255)", "slategray2": "rgb(185, 211, 238)", "slategray3": "rgb(159, 182, 205)", "slategray4": "rgb(108, 123, 139)", "slategrey": "rgb(112, 128, 144)", "snow": "rgb(255, 250, 250)", "snow1": "rgb(255, 250, 250)", "snow2": "rgb(238, 233, 233)", "snow3": "rgb(205, 201, 201)", "snow4": "rgb(139, 137, 137)", "springgreen": "rgb(0, 255, 127)", "springgreen1": "rgb(0, 255, 127)", "springgreen2": "rgb(0, 238, 118)", "springgreen3": "rgb(0, 205, 102)", "springgreen4": "rgb(0, 139, 69)", "steelblue": "rgb(70, 130, 180)", "steelblue1": "rgb(99, 184, 255)", "steelblue2": "rgb(92, 172, 238)", "steelblue3": "rgb(79, 148, 205)", "steelblue4": "rgb(54, 100, 139)", "tan": "rgb(210, 180, 140)", "tan1": "rgb(255, 165, 79)", "tan2": "rgb(238, 154, 73)", "tan3": "rgb(205, 133, 63)", "tan4": "rgb(139, 90, 43)", "thistle": "rgb(216, 191, 216)", "thistle1": "rgb(255, 225, 255)", "thistle2": "rgb(238, 210, 238)", "thistle3": "rgb(205, 181, 205)", "thistle4": "rgb(139, 123, 139)", "tomato": "rgb(255, 99, 71)", "tomato1": "rgb(255, 99, 71)", "tomato2": "rgb(238, 92, 66)", "tomato3": "rgb(205, 79, 57)", "tomato4": "rgb(139, 54, 38)", "turquoise": "rgb(64, 224, 208)", "turquoise1": "rgb(0, 245, 255)", "turquoise2": "rgb(0, 229, 238)", "turquoise3": "rgb(0, 197, 205)", "turquoise4": "rgb(0, 134, 139)", "violet": "rgb(238, 130, 238)", "violetred": "rgb(208, 32, 144)", "violetred1": "rgb(255, 62, 150)", "violetred2": "rgb(238, 58, 140)", "violetred3": "rgb(205, 50, 120)", "violetred4": "rgb(139, 34, 82)", "wheat": "rgb(245, 222, 179)", "wheat1": "rgb(255, 231, 186)", "wheat2": "rgb(238, 216, 174)", "wheat3": "rgb(205, 186, 150)", "wheat4": "rgb(139, 126, 102)", "white": "rgb(255, 255, 255)", "whitesmoke": "rgb(245, 245, 245)", "yellow": "rgb(255, 255, 0)", "yellow1": "rgb(255, 255, 0)", "yellow2": "rgb(238, 238, 0)", "yellow3": "rgb(205, 205, 0)", "yellow4": "rgb(139, 139, 0)", "yellowgreen": "rgb(154, 205, 50)"
		};
		
		return {

			/**
			 * Convert an X11 color name into a CSS rgb(...) value.
			 *
			 * Names are stripped of spaces and converted to lowercase.	 If the name is
			 * unknown, null is returned.
			 *
			 * This list of color name to RGB mapping is derived from the stock X11
			 * rgb.txt file.
			 *
			 * @param {string} name The color name to convert.
			 * @return {string} The corresponding CSS rgb(...) value.
			 */
			nameToRGB: function(name) {
				if (name in rootObj.colorNames)
				return rootObj.colorNames[name];

				name = name.toLowerCase();
				if (name in rootObj.colorNames)
				return rootObj.colorNames[name];

				name = name.replace(/\s+/g, '');
				if (name in rootObj.colorNames)
					return rootObj.colorNames[name];

				return null;
			},
			
			testIfHex: function(v) {
				var isHex  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(v);
				return isHex;
			},
			
			rgbToHex: function(color) {
					var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

					var r = parseInt(digits[2]);
					var g = parseInt(digits[3]);
					var b = parseInt(digits[4]);

				    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			},

			hslToHex: function(data) {
				//https://github.com/jakubpawlowicz/clean-css/blob/master/lib/colors/hsl-to-hex.js
				  // HSL to RGB converter. Both methods adapted from:
				  // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
				  var hslToRgb = function(h, s, l) {
				    var r, g, b;

				    // normalize hue orientation b/w 0 and 360 degrees
				    h = h % 360;
				    if (h < 0)
				      h += 360;
				    h = ~~h / 360;

				    if (s < 0)
				      s = 0;
				    else if (s > 100)
				      s = 100;
				    s = ~~s / 100;

				    if (l < 0)
				      l = 0;
				    else if (l > 100)
				      l = 100;
				    l = ~~l / 100;

				    if (s === 0) {
				      r = g = b = l; // achromatic
				    } else {
				      var q = l < 0.5 ?
				        l * (1 + s) :
				        l + s - l * s;
				      var p = 2 * l - q;
				      r = hueToRgb(p, q, h + 1/3);
				      g = hueToRgb(p, q, h);
				      b = hueToRgb(p, q, h - 1/3);
				    }

				    return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
				  };

				  var hueToRgb = function(p, q, t) {
				    if (t < 0) t += 1;
				    if (t > 1) t -= 1;
				    if (t < 1/6) return p + (q - p) * 6 * t;
				    if (t < 1/2) return q;
				    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				    return p;
				  };

				  return {
				    process: function() {
				      return data.replace(/hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/g, function(match, hue, saturation, lightness) {
				        var asRgb = hslToRgb(hue, saturation, lightness);
				        var redAsHex = asRgb[0].toString(16);
				        var greenAsHex = asRgb[1].toString(16);
				        var blueAsHex = asRgb[2].toString(16);

				        return '#' +
				          ((redAsHex.length == 1 ? '0' : '') + redAsHex) +
				          ((greenAsHex.length == 1 ? '0' : '') + greenAsHex) +
				          ((blueAsHex.length == 1 ? '0' : '') + blueAsHex);
				      });
				    }
				  };
			},

			nameToHex: function(name) {
				// name = name.replace('/#','/');
				var hexColor;
				var isHex = this.testIfHex(name);
				if (isHex) {
					return "#" + name;
				}
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.toLowerCase();
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.replace(/\s+/g, '');
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				return null;
			},

			/**
			 * Convert an X11 color value into an CSS rgb(...) color value.
			 *
			 * The X11 value may be an X11 color name, or an RGB value of the form
			 * rgb:hhhh/hhhh/hhhh.	If a component value is less than 4 digits it is
			 * padded out to 4, then scaled down to fit in a single byte.
			 *
			 * @param {string} value The X11 color value to convert.
			 * @return {string} The CSS color value or null if the value could not be
			 *	   converted.
			 */
			x11ToCSS: function(v) {
				function scale(v) {
					// Pad out values with less than four digits.  This padding (probably)
					// matches xterm.  It's difficult to say for sure since xterm seems to
					// arrive at a padded value and then perform some combination of
					// gamma correction, color space tranformation, and quantization.

					if (v.length == 1) {
						// Single digits pad out to four by repeating the character.	"f" becomes
						// "ffff".  Scaling down a hex value of this pattern by 257 is the same
						// as cutting off one byte.  We skip the middle step and just double
						// the character.
						return parseInt(v + v, 16);
					}

					if (v.length == 2) {
						// Similar deal here.	 X11 pads two digit values by repeating the
						// byte (or scale up by 257).	 Since we're going to scale it back
						// down anyway, we can just return the original value.
						return parseInt(v, 16);
					}

					if (v.length == 3) {
						// Three digit values seem to be padded by repeating the final digit.
						// e.g. 10f becomes 10ff.
						v = v + v.substr(2);
					}

					// Scale down the 2 byte value.
					return Math.round(parseInt(v, 16) / 257);
				}
			
				var ary = v.match(rootObj.re_.x11rgb);
				// console.log(ary);
				if (!ary)
				return this.nameToRGB(v);

				ary.splice(0, 1);
				return rootObj.arrayToRGBA(ary.map(scale));
			}	
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Color', Color);

	function Color(colorConvert) {
		// NOTE Ideally these will all be deprecated
		//      in favor of nbative JS, THREE or D3 functions.
		//      Those already UNUSED are marked as such.

		return {

			// Extract colors from (Ensembl) INI files
			// eg. https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR in TADkit: assets/json/ensembl-webcode-COLOUR.ini
			colorsFromIni: function(data) {
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var colors = {};
				var lines = data.split(/\r\n|\r|\n/);
				var section = null;
				lines.forEach(function(line){
					if(regex.comment.test(line) || line === ""){
						return;
					}
					var match;
					if(regex.param.test(line)){
						match = line.match(regex.param);
						if(section){
							var hexColor = colorConvert.nameToHex( match[2] );
							colors[section][match[1]] = hexColor;
						}else{
							colors[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						colors[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return colors;
			},

			// UNUSED: Generate THREE colors from array of arrayed RGB decimal colorss (0.0-1.0)
			//   eg. [[r,g,b],[r,g,b],[r,g,b],...]
			colorsFromTriplets: function(data) {
				var offset = 0, rgb, color,
					 colors = [];
				var totalcolorss = data.length;
				while ( offset < totalcolorss ) {
					rgb = data[offset];
					color =  new THREE.Color(rgb[0], rgb[1], rgb[2]);
					colors.push(color);
					offset ++;
				}
				return colors;
			},
			// Generate THREE colors from array of RGB decimal colorss (0.0-1.0)
			//  eg. [r,g,b,r,g,b,r,g,b,...]
			colorsFromArray: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i=i-1) {
					var b = data[i]/255.0;
					i = i-1;
					var g = data[i]/255.0;
					i = i-1;
					var r = data[i]/255.0;
					var color =  new THREE.Color(r,g,b);
					colors.unshift(color);
				}
				return colors;
			},
			// Generate THREE colors from array of RGB hex values (#000000-#ffffff)
			//  eg. [#rrggbb,#rrggbb,#rrggbb,...]
			colorsFromHex: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i--) {
					var color =  new THREE.Color(data[i]);
					colors.unshift(color);
				}
				return colors;
			},
			// UNUSED: Generate a specific number of random colors
			getRandomColors: function(count) {
				var colors = [];
				for(var i=0; i<count; i++){
					var color = "#" + Math.floor(Math.random()*16777215).toString(16);
					colors.push(color);
				}
				return colors;
			},
			// UNUSED: Generate a math linear gradient between to hex colors values
			//     Note this is NOT a L*a*b or HCL correct gradient
			//     See Mike Bostock's D3 comments: http://bl.ocks.org/mbostock/3014589
			getGradientColor: function(start_color, end_color, percent) {
				// strip the leading # if it's there
				start_color = start_color.replace(/^\s*#|\s*$/g, '');
				end_color = end_color.replace(/^\s*#|\s*$/g, '');

				// convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
				if(start_color.length == 3){
					start_color = start_color.replace(/(.)/g, '$1$1');
				}

				if(end_color.length == 3){
					end_color = end_color.replace(/(.)/g, '$1$1');
				}

				// get colors
				var start_red = parseInt(start_color.substr(0, 2), 16),
					start_green = parseInt(start_color.substr(2, 2), 16),
					start_blue = parseInt(start_color.substr(4, 2), 16);

				var end_red = parseInt(end_color.substr(0, 2), 16),
					end_green = parseInt(end_color.substr(2, 2), 16),
					end_blue = parseInt(end_color.substr(4, 2), 16);

				// calculate new color
				var diff_red = end_red - start_red;
				var diff_green = end_green - start_green;
				var diff_blue = end_blue - start_blue;

				diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
				diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
				diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

				// ensure 2 digits by color
				if( diff_red.length == 1 )
					diff_red = '0' + diff_red;

				if( diff_green.length == 1 )
					diff_green = '0' + diff_green;

				if( diff_blue.length == 1 )
					diff_blue = '0' + diff_blue;

				return '#' + diff_red + diff_green + diff_blue;
			}

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
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-components.json";
				if( components.loaded.length > 0 ) {
					deferral.resolve(components);
				} else {
					$http.get(source)
					.success( function(data) {
						components.loaded = data;
						console.log("Components (" + data.length + ") loaded from " + source);
						deferral.resolve(components);
					});
				}
				return deferral.promise;
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
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
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
		.module('d3', [])
		.factory('d3Service', d3Service);

	function d3Service($document, $q, $rootScope) {
			var online = false;
			var d = $q.defer();
			function onScriptLoad() {
				// Load client in the browser
				$rootScope.$apply(function() { d.resolve(window.d3); });
			}
			// Create a script tag with d3 as the source
			// and call our onScriptLoad callback when it
			// has been loaded
			var scriptTag = $document[0].createElement('script');
			scriptTag.type = 'text/javascript'; 
			scriptTag.async = true;
			if (online) {
				scriptTag.src = 'http://d3js.org/d3.v3.min.js';
			} else {
				scriptTag.src = 'assets/libs/d3.min.js';
			}
			scriptTag.onreadystatechange = function () {
				if (this.readyState == 'complete') onScriptLoad();
			};
			scriptTag.onload = onScriptLoad;

			var s = $document[0].getElementsByTagName('body')[0];
			s.appendChild(scriptTag);

			return {
				d3: function() { return d.promise; }
			};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets($q, $http, uuid4) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		return {
			load: function() {
				var deferral = $q.defer();
				// var source = "assets/json/tk-defaults-datasets.json";
				var source = "assets/json/mycoplasma_pneumoniae-tadbit.json";

				var self = this;
				if( datasets.loaded.length > 0 ) {
					deferral.resolve(datasets);
				} else {
					$http.get(source)
					.success( function(data) {
						var dataset = data;
						datasets.loaded.push(dataset);
						// console.log(data[0].models);
						// angular.forEach(data[0].models, function(model, key) {
						// 	model = JSON.stringify(model).replace("####",key+1);
						// 	data[0].models[key] = JSON.parse(model);
						// });
						// console.log(JSON.stringify(data[0].models));
						var current = datasets.current.index;
						datasets.loaded[current].object.speciesUrl = self.setSpeciesUrl(current);
						console.log("Datasets (" + data.length + ") loaded from " + source);
						deferral.resolve(datasets);
					});
				}
				return deferral.promise;
			},
			add: function(data) { // rename import?
				/* CHECK DATASET IS VALID */
				var dataset = JSON.parse(data);
				// console.log(dataset); // NOT AN ARRAY - A SINGLE DATASET
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					console.log("Dataset \"" + datasets.loaded[datasets.current.index].object.title + "\" loaded from file.");
				// }
				// console.log(datasets.loaded);
				return datasets;
			},
			// add: function(title) {
			// 	projects.loaded.push(newProject);
			// 	projects.current = projects.loaded.length - 1;
			// 	return projects.loaded[projects.current];
			// },
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				datasets.loaded.splice(dataset, 1);
				return datasets;
			},
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var speciesUrl = datasets.loaded[index].object.species;
				speciesUrl = speciesUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase();
				return speciesUrl;
			},
			set: function(index) {
				if (index !== undefined || index !== false) datasets.current.index = index;
				this.setCluster(datasets.current.cluster);
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
				var model, models = datasets.loaded[datasets.current.index].models;
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) model = models[i];
				}
				return model; // array of model vertices
			},
			getSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var speciesUrl = datasets.loaded[index].object.speciesUrl;
				return speciesUrl;
			},
			getRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var chromosomeIndex = 0;
				if (datasets.loaded[index].object.chromosomeIndex) {
					chromosomeIndex = datasets.loaded[index].object.chromosomeIndex;	
				}
				var region = datasets.loaded[index].object.chromosome[chromosomeIndex] + ":" + datasets.loaded[index].object.chromStart[chromosomeIndex] + "-" + datasets.loaded[index].object.chromEnd[chromosomeIndex];
				return region;
			},
			getComponents: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var components = datasets[index].components;
				return components;
			},
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http) {
		var ensembl = {
			ping : 0
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferral = $q.defer();
				var source = "http://rest.ensemblgenomes.org/info/ping?content-type=application/json";
				$http.get(source)
				.success(function(data){
					ensembl.ping = data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferral.promise;
			},
			load: function(datasetObject, overlay, online) {
				var deferral = $q.defer();
				var source;
				var species = datasetObject.species;
				var speciesUrl = datasetObject.speciesUrl;
				var chromosomeIndex = 0;
				if (datasetObject.chromosomeIndex) {
					chromosomeIndex = datasetObject.chromosomeIndex;	
				}
				var chromosome = datasetObject.chromosome[chromosomeIndex];
				var start = datasetObject.chromStart[chromosomeIndex];
				var end = datasetObject.chromEnd[chromosomeIndex];
				var self = this;
				if (online) {
					source = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chromosome + overlay.object.url[4] + start + overlay.object.url[6] + end + overlay.object.url[8];
				} else {
					source = "assets/json/" + speciesUrl + "-genes.json";
					// source = "assets/json/tk-sample-genes.json";
					// var source = "assets/json/tk-defaults-datasets2-genes.json";
				}
				$http.get(source)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					overlay.data = genes;
					var slice = "(" + chromosome + ":" + start + "-" + end + ")";
					var whence = online ? "Ensembl" : "local storage";
					console.log("Genes for " + species + " "+ slice + " retreived from " + whence + ".");
					deferral.resolve(overlay);
				});
				return deferral.promise;
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
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Users, Projects, Datasets, Overlays, Components, Storyboards, Resources, Ensembl) {
		return function() {
			var settings = Settings.load();
			var users = Users.load();
			var projects = Projects.load();
			var datasets = Datasets.load();
			var overlays = Overlays.load();
			var components = Components.load();
			var storyboards = Storyboards.load();
			var featureColors = Resources.loadBiotypeColors();

			return $q.all([settings, users, projects, datasets, overlays, components, storyboards, featureColors])
			.then(function(results){

				var online = true;
				// var promise = Resources.loadInfoAssembly(Datasets.getSpeciesUrl());
				// promise.then(function(data) {
				// 	var settings = results[0];
				// 	settings.infoAssembly = data;
				// }, function(reason) {
				// 	console.log('Failed: ' + reason);
				// });
				// return results;

				var processList = [];

				var speciesUrl = Datasets.getSpeciesUrl();
				var infoAssembly = Resources.loadInfoAssembly(speciesUrl, online);
				processList.push(infoAssembly);

				var currentDataset = Datasets.getDataset();
				var overlays = Overlays.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var ensembl;
					if (overlay.object.type == "ensembl" && overlay.object.format == "json") {
						ensembl = Ensembl.load(currentDataset.object, overlay, online);
						 // ojo returning Overlays... cHANGE 
						processList.push(ensembl);
					}
				});

				return $q.all(processList)
				.then(function(data) {
					var settings = results[0];
					settings.infoAssembly = data;
					return results;
				});
			})
			.then(function(results){
				var settings = Settings.get();
				var currentDataset = Datasets.getDataset();
				var currentStoryboards = Storyboards.getStoryboard();
				var particlesCount = currentDataset.models[0].data.length / currentDataset.object.components;
				var particleSegments = currentStoryboards.components[0].view.settings.chromatin.particleSegments;
				var segmentsCount = particlesCount * particleSegments;
				var segmentLength = currentDataset.object.resolution / particleSegments; // base pairs
				return $q.all([settings, currentDataset, currentStoryboards, particleSegments, particlesCount, segmentsCount, segmentLength])
				.then(function() {
					var chromosomeIndex = 0;
					if (currentDataset.object.chromosomeIndex) {
						chromosomeIndex = datasetObject.chromosomeIndex;	
					}
					var chromStart = currentDataset.object.chromStart[chromosomeIndex];
					var featureColors = results[7];
					var featureTypes = featureColors;
					settings.chromStart = chromStart;
					settings.particlesCount = particlesCount;
					settings.particleSegments = particleSegments;
					settings.segmentsCount = segmentsCount;
					settings.segmentLength = segmentLength;
					Overlays.segmentOverlays(chromStart, segmentsCount, segmentLength, featureTypes);
					return results;
				});
			})
			.then(function(results){
				return {
					settings: results[0],
					users: results[1],
					projects: results[2],
					datasets: results[3],
					overlays: results[4],
					components: results[5],
					storyboards: results[6],
					featureColors: results[7],
				};
			});
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, d3Service) {
		var overlays = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-overlays.json";
				if( overlays.loaded.length > 0 ) {
					deferral.resolve(overlays);
				} else {
					$http.get(source)
					.success( function(data) {
						overlays.loaded = data;
						// overlays.current.index = overlays.loaded.length - 1;
						console.log("Overlays (" + data.length + ") loaded from " + source);
						deferral.resolve(overlays);
					});
				}
				return deferral.promise;
			},
			import: function(data) {
				/* CHECK IMPORT IS VALID */
				var rawdata = JSON.parse(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.overlays[uuid]) {
					// determine format eg table rows of items, columns of properties
					// user select colmns to use - which rows: title, (meta,) start, end, data
					// test all
					var newOverlay = rawdata;
					this.add(newOverlay);
					console.log("New overlay \"" + overlays.loaded[datasets.current.index].object.title + "\" created from imported data.");
				// }
				console.log(overlays.loaded[overlays.current.index]);
				return overlays;
			},
			aquire: function(data) {
				// d3Service.d3().then(function(d3) {
					// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
					var colorRange = d3.scale.category20();
					// columns to overlays
					// skip row 1 = headers ie. length - 2
					// skip colums 1 and 2 = coords ie. length - 3
					var aquiredOverlays = [];
					var step = data[1][1] - data[1][0] + 1;
					for (var i = data[0].length - 1; i >= 2; i--) { // i >= 2 to skip 2 first columns
						aquiredOverlays.unshift(
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : data[0][i],
									"title": data[0][i],
									"source" : "Research output",
									"url" : "local",
									"description": "center_label", //also BigWig description (track title): "User Supplied Track"
									"type": "wiggle_0", //also BigWig type
									"format" : "bigwig",
									"components" : 2,
									"name": data[0][i], //BigWig: "User Track"
									"visibility": "full", //BigWig: "full", "dense" or "hide"
									"color": colorRange(i), // red NOTE: convert to RGB for BigWig: eg. 255,255,255
									"altColor": "#0000ff", // blue NOTE: convert to RGB for BigWig: eg. 128,128,128
									"priority": "100", //BigWig: 100
									"stepType": "fixed", //BigWig: "variable" or "fixed"
									"chrom": "", //BigWig: derive from dataset...???
									"start": data[1][0], //BigWig
									"step": step, //BigWig
									"state": {
										"index": 0, // make real index???
										"overlaid": false
									}
								},
								"data": []
							}
						);
						// convert column data to array
						for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first row
							aquiredOverlays[0].data.unshift(data[j][i]);
						}
					}
					return aquiredOverlays;
				// }); // End d3 Service
			},
			add: function(details) {
				details = details || ["default","overlay","name","www","describe","json","0",[1]];
				var overlay = {
					metadata : {
						version : 1.0,
						type : "overlay",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						source : details[2],
						url : details[3],
						description : details[4],
						format : details[5],
						components : details[6]
					},
					data : details[7]
				};
				overlays.loaded.push(overlay);
				overlays.current.index = overlays.loaded.length - 1;
				console.log("Overlay \"" + overlays.loaded[datasets.current.index].object.title + "\" loaded from file.");
				return overlays;
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
			// setOverlay: function(data, segments, particleSegments) {
			// 	var colors = [];
			// 	for (var i=0; i<segments; i++) {
			// 		var particle = Math.floor(i/particleSegments);
			// 		var color = data[particle];
			// 		colors.push(color);
			// 	}
			// 	overlays.loaded.push({"id":"newoverlay","data":data,"colors":colors});
			// 	overlays.current = overlays.loaded.length - 1;
			// 	return overlays.loaded[overlays.current];
			// },
			segmentOverlays: function(chromStart, segmentsCount, segmentLength, featureTypes) {
				featureTypes = featureTypes || [];
				var self = this; // SYNChronous functions...
				angular.forEach(overlays.loaded, function(overlay, key) {
					if (!overlay.colors || overlay.colors.length === 0) {
						// run function based on object type
						var type = overlay.object.type;
						var format = overlay.object.format;
						// convert string directly to function???
						// var typeFunction = "segment" + type[0].toUpperCase() + type.substring(1);
						var colors = [];
						if (type == "gradient" && format == "hex") {
							// data must contain 2 hex values
							colors = self.segmentGradientHCL(overlay.data, segmentsCount);
						} else if (type == "wiggle_0" && format == "bigwig") {
							// colors derived from BigWig color and altColor
							// featureTypes == single hex for use as color
							var featureColor = overlay.object.color;
							colors = self.segmentLinear(overlay.data, chromStart, segmentsCount, segmentLength, featureColor);
						} else if (type == "linear" && format == "seq") {
							// data must contain array of indexs
							colors = self.segmentLinear(overlay.data, chromStart, segmentsCount, segmentLength);
						} else if (type == "ensembl" && format == "json") {
							// data must have .start and .end
							featureTypes = featureTypes.gene; // TO DO: MAKE FUNCTION MORE GENERIC... ie. not just "gene"
							colors = self.segmentFeatures(overlay.data, chromStart, segmentsCount, segmentLength, featureTypes);
						}
						overlay.colors = colors;
					} else {					// already segmented --> ADD REsegement option...
						console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
					}
				});
				return overlays;
			},
			segmentGradientHCL: function(data, segmentsCount) {
				// d3Service.d3().then(function(d3) {
					// Using D3 HCL for correct perceptual model
					// Data is an array of 2 hex colors eg. ff0000
					// Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
					// Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
					var gradient = [];
					var hexStart = data[0];
					var hexEnd = data[1];

					for (var i = segmentsCount - 1; i >= 0; i--) {
						var step = i / segmentsCount; // This should be between 0 and 1
						var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
						gradient.push(hex);
					}
					return gradient;
				// });
			},
			segmentGradientLinear: function(rangeColors, segmentsCount) {
				// data is an array of 2 hex colors eg. ff0000
				// output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
				var gradient = [];
				var hexStart = "0x" + rangeColors[0].substring(1);
				var hexEnd = "0x" + rangeColors[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;

					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;

					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;

				for (var i = segmentsCount - 1; i >= 0; i--) {

					step = i / segmentsCount; // This should be between 0 and 1

					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);

					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},
			segmentLinear: function(overlayData, chromStart, segmentsCount, segmentLength, featureColor) {
				var defaultColor = "#cccccc";
				var colors = [];
				for(var i=0; i<segmentsCount; i++){
						var segmentColor;
						if (overlayData[i] === 1) {
							segmentColor = featureColor;
						} else {
							segmentColor = defaultColor;
						}
					colors.push(segmentColor);
				}
				return colors;
			},
			segmentFeatures: function(features, chromStart, segmentsCount, segmentLength, featureTypes) {
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
						// console.log(insegments);
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
				// console.log(colors);
				return colors;
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
			},
			getComponents: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var components = overlays.loaded[index].object.components;
				return components;
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
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-projects.json";
				if( projects.loaded.length > 0 ) {
					deferral.resolve(projects);
				} else {
					$http.get(source)
					.success( function(data) {
						projects.loaded = data;
						console.log("Projects (" + data.length + ") loaded from " + source);
						deferral.resolve(projects);
					});
				}
				return deferral.promise;
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
		.factory('Resources', Resources);

	function Resources($q, $http, Color, uuid4) {
		var resources = {};
		var ensemblRoot = "http://rest.ensemblgenomes.org/";
		resources.assembly = {};
		resources.featureColors = {};
		return {
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
			loadInfoAssembly: function(speciesUrl, online) {
				var deferral = $q.defer();
				var self = this;
				var source;
				if (online) {
					source = ensemblRoot + "info/assembly/" + speciesUrl + "?content-type=application/json";
				} else {
					source = "assets/json/" + speciesUrl + "-assembly.json";
				}
				$http.get(source)
				.success(function(data){
					var whence = online ? "Ensembl" : "local storage";
					console.log("Assembly Info for " + speciesUrl + " retreived from " + whence + ".");
					data.lengthBP = self.setLengthBP(data.top_level_region);
					console.log("Assembly length for " + speciesUrl + " = " + data.lengthBP);
					resources.assembly = data;
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			loadBiotypeColors: function() {
				var deferral = $q.defer();
				var online = false;//$scope.online;
				var source;
				if (online) {
				// source = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					source = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					source = "assets/json/ensembl-webcode-COLOUR.ini";

				}
				$http.get(source)
				.success(function(data){
					var iniData = Color.colorsFromIni(data);
					resources.featureColors = iniData;
					resources.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					deferral.resolve(iniData);
				});
				return deferral.promise;
			},
			loadInfoBiotypes: function(speciesUrl) {
				var deferral = $q.defer();
				var source;
				if (online) {
					source = ensemblRoot + "info/biotypes/" + speciesUrl + "?content-type=application/json";
				} else {
					source = "assets/json/" + speciesUrl + "-biotypes.json";
				}
				$http.get(source).
				success(function(data){
					console.log("Biotypes for " + speciesUrl + " retreived from Ensembl.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			get: function () {
				return resources;
			},
			getRegionBiotypes: function (genes) {
				// GET BIOTYPES AND SET BIOTYPE COLORS
				var biotypes = [];
				var featureColors = [
					// other: 16753920
					// protein_alignment: 255
					// protein_coding: 12009742
					// pseudogene: 6710886
				];
				var biotypesLookup = {};
				for (var item, i = 0; item == genes[i++];) {
					var geneBiotype = item.biotype;
					if (!(geneBiotype in biotypesLookup)) {
					biotypesLookup[geneBiotype] = 1;
					biotypes.push(geneBiotype);
					}
				}
				console.log("Biotypes");
				console.log(biotypes);
				var totalbiotypes = biotypes.length;
				console.log("Total Biotypes: %s", totalbiotypes);
			},
			getProximityMatrix: function (vertices, settings) {
				// Generate a matrix of proximity between points
				// from vertices = array of point coordinates components
				// to minDistance = threshold for proximity
				// eg. [x,y,z,x,y,z,x,y,z,...]
				// becomes:
				// positions eg. []
				// distances eg.

				var defaults = {
					minDistance: 150,
					maxDistance: 400,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				// maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var maxDistCalc = 0;
				var clusterGeometry = new THREE.BufferGeometry();
				clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				clusterGeometry.computeBoundingSphere();
				var clusterDiameter = Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				settings.maxDistance = clusterDiameter;

				// for (var i = vertices.length - 1; i >= 0; i--) {
				// 	var testVertex = 
				// 	if (testVertex > maxDistCalc)
				// 		max = ;
				// };

				settings.maxDistance = maxDistCalc;

				var proximityMatrix = {};

				var vertexpos = 0;
				var distancepos = 0;

				var pointsCount = vertices.length / 3; // components of vertices
				var contacts = pointsCount * pointsCount;
				var contactPairs = contacts * 2;

				var positions = new Float32Array( contactPairs * 3 );
				var distances = new Float32Array( contacts );
				
				for (var i = pointsCount - 1; i >= 0; i--) {

					// Check collision
					for (var j = pointsCount - 1; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {

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

							// var distance = (1.0 - dist / this.minDistance); // .toFixed(2)
							var distance = (1.0 - (dist / this.maxDistance)); // .toFixed(2)
							distances[ distancepos++ ] = distance;
							// console.log(dist);
							// console.log(distance);
						// }

					}
				}
				proximityMatrix.positions = positions;
				proximityMatrix.distances = distances;
				return proximityMatrix;
			},
			getPosition: function (chromPosition, chromStart, chromEnd, segmentsCount) {
				var self = this;
				var chromOffset = self.range(chromStart, chromPosition);
				var chromRange = self.range(chromStart, chromEnd);
				var position = Math.ceil((chromOffset * segmentsCount) / chromRange);
				return position;
			},
			getParticle: function (chromPosition, chromStart, chromEnd, particlesCount) {
				var self = this;
				var chromOffset = self.range(chromStart, chromPosition);
				var chromRange = self.range(chromStart, chromEnd);
				var particle = Math.ceil((chromOffset * particlesCount) / chromRange);
				return particle;
			},
			range: function (start, end) {
				var range = 0;
				for (var i = start; i <= end; i++) {
					range++;
				}
				return range;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http, uuid4) {
		var settings = {};

		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					deferral.resolve(settings);
				} else {
					$http.get(source)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + source);
						deferral.resolve(settings);
					});
				}
				return deferral.promise;
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

	function Storyboards($q, $http, uuid4) {
		var storyboards = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-storyboards.json";
				if( storyboards.loaded.length > 0 ) {
					deferral.resolve(storyboards);
				} else {
					$http.get(source)
					.success( function(data) {
						storyboards.loaded = data;
						console.log("Storyboards (" + data.length + ") loaded from " + source);
						deferral.resolve(storyboards);
					});
				}
				return deferral.promise;
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
			addComponent: function(storyboardId, component, options) {
				// Add a preconfigured conponent from Components - update with options if necessary
				storyboardId = storyboardId || "default";
				options = options || [""];
				var storyboard = this.getStoryboardById(storyboardId);
				storyboard.components.push(component);
				return storyboard;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded.indexOf(index);
				storyboards.loaded.splice(storyboard, 1);
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
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return storyboards;
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
				// console.log(storyboard);
				return storyboard;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Tables', Tables);

	function Tables ($q, $http) {
		var tables = "";
		return {

// Identify data type - if table filter to produce overlay and store overlay (table not stored?)
// once created overlay can be displayed as a track (in whichever form eg bar, object, level) or as table or graph

			loadTables: function(species, requestSlice) {
				var deferral = $q.defer();
				$http.get('assets/json/GSE22069_norm_aggregated_discretized_tiling_arrays.json')
				.success(function(data){
					tables = data;
					console.log("Tables for region " + requestSlice + " of " + species + " retreived from file.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getTables: function () {
				return tables;
			},
			getSampleCount: function () {
				return tables.length;
			},
			getTablesList: function () {
	   		 // first four entries are fragmentID, chromosome, start and end... the rest are tables.
				var tablesList = [];
				for (var i = 4; i < tables[0].length; i++) {
					for(var table in tables[0]){
					  tablesList.push(table); // first sample as an example.
					}				
				}
				return tablesList;
			},
			getTableCount: function () {
			 // first four entries are fragmentID, chromosome, start and end... the rest are tables.
				var tablesCount = tables[0].length - 4; // first sample as an example.
				return tablesCount;
			},
			getTableArray: function (data, id) {
				var dataset = [];
				for (var i = 0; i < data.length; i++) {
					if (data[i][id]==1) {
						dataset.push( {"fragmentID":data[i].fragmentID, "chromosome":data[i].chromosome, "start":data[i].start, "end":data[i].end} );
					} else {
						// console.log("None found in sample.");
					}
				}
				// console.log(dataset);
				return dataset;
			},
			getColors: function(tables, tableType, fragmentsCount, TADStart, fragmentLength) {
				var colors = [];
				var totalLength = fragmentsCount * fragmentLength;
				var data = this.getTableArray(tables, tableType);
				var tableColor = "#999999";
				
			// PULL IN COLORS FROM OTHER SOURCE...
					if (tableType == "HP1") tableColor = "#227c4f"; //238554
					if (tableType == "BRM") tableColor = "#8ece0d"; //aaff00
					if (tableType == "MRG15") tableColor = "#e71818";
					if (tableType == "PC") tableColor = "#6666ff";
					if (tableType == "H1") tableColor = "#424242";
					
				// console.log(data);
				// For every fragment [i]...
				for(var i=0; i<fragmentsCount; i++){
					var biotypesPresent = [];
					var fragmentLower = TADStart + (fragmentLength * i);
					var fragmentUpper = fragmentLower + fragmentLength;
					var tablesCount = data.length;
					var tablePresent = "#cccccc"; // Base color - ie if none found

					// For every row [j]...
					for(var j=0; j<tablesCount; j++){
						var start = data[j].start;
						var end = data[j].end;
						 // check if overlaps current fragment [i]
						if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
								tablePresent = tableColor;
						}
					}
					colors.push(tablePresent);
				}
				// console.log(colors);
				return colors;
			}
			
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('three', [])
		.factory('threeService', threeService);

	function threeService($document, $q, $rootScope) {
			var d = $q.defer();
			function onScriptLoad() {
				// Load client in the browser
				$rootScope.$apply(function() { d.resolve(window.three); });
			}
			// Create a script tag with ThreeJS as the source
			// and call our onScriptLoad callback when it
			// has been loaded
			var scriptTag = $document[0].createElement('script');
			scriptTag.type = 'text/javascript'; 
			scriptTag.async = true;
			// scriptTag.src = 'http://d3js.org/d3.v3.min.js';
			scriptTag.src = '../bower_components/threejs/build/three.js';
			scriptTag.onreadystatechange = function () {
				if (this.readyState == 'complete') onScriptLoad();
			};
			scriptTag.onload = onScriptLoad;

			var s = $document[0].getElementsByTagName('body')[0];
			s.appendChild(scriptTag);

			return {
				three: function() { return d.promise; }
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
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-users.json";
				if( users.loaded.length > 0 ) {
					deferral.resolve(users);
				} else {
					$http.get(source)
					.success( function(data) {
						users.loaded = data;
						console.log("Users (" + data.length + ") loaded from " + source);
						deferral.resolve(users);
					});
				}
				return deferral.promise;
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