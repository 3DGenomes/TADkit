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
						// console.log(element[0].children[0].children[3]);
						container = element[0].children[0].children[3].children[0];
						// PARENT #main-content from main.html
						elementParent = element.parent().parent()[0];

						// console.log("WIDTH");
						// console.log(JSON.stringify(elementParent.getBoundingClientRect().width));
						// console.log(JSON.stringify(elementParent.clientWidth));
						// console.log(JSON.stringify(scope.state.width));
						// console.log("HEIGHT");
						// console.log(JSON.stringify(elementParent.getBoundingClientRect().height));
						// console.log(JSON.stringify(elementParent.clientHeight));
						// console.log(JSON.stringify(scope.state.height));

// NEED TO WAIT UNTIL DOM LOADED
 						// clientWidth and clientHeight ie. no margins nor padding
						width = elementParent.clientWidth;
						height = elementParent.clientHeight;

						// width = 800; //parseInt(scope.state.width);
						// height = 400; //parseInt(scope.state.height);
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

						// Values from JSON
						var colCount = 4;
						var tileGutter = 12;

						var colIndex = 0;
						var rowIndex = 0;
						var span = 1;

						// *** Derived from Angular Material grid-list.js lines 221-267 ***

						// The amount of space a single 1x1 tile would take up (either width or height), used as
						// a basis for other calculations. This consists of taking the base size percent (as would be
						// if evenly dividing the size between cells), and then subtracting the size of one gutter.
						// However, since there are no gutters on the edges, each tile only uses a fration
						// (gutterShare = numGutters / numCells) of the gutter size. (Imagine having one gutter per
						// tile, and then breaking up the extra gutter on the edge evenly among the cells).
						// var UNIT = $interpolate(expr('share') + '% - (' + expr('gutter') + ' * ' + expr('gutterShare') + ')');
						// ie. UNIT = share% - (gutter * gutterShare)

						// The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
						// The position comes the size of a 1x1 tile plus gutter for each previous tile in the
						// row/column (offset).
						// var POSITION  = $interpolate('calc((' + expr('unit') + ' + ' + expr('gutter') + ') * ' + expr('offset') + ')');
						// ie. POSITION = (UNIT + gutter) * offset

						// The actual size of a tile, e.g., width or height, taking rowSpan or colSpan into account.
						// This is computed by multiplying the base unit by the rowSpan/colSpan, and then adding back
						// in the space that the gutter would normally have used (which was already accounted for in
						// the base unit calculation).
						// var DIMENSION = $interpolate('calc((' + expr('unit') + ') * ' + expr('span') + ' + (' + expr('span') + ' - 1) * ' + expr('gutter') + ')');
						// ie. DIMENSION = UNIT * span + (span - 1) * gutter

						// Fraction of the gutter size that each column takes up.
						var hGutterShare = (colCount - 1) / colCount;
						// Percent of the available horizontal space that one column takes up.
						var hShare = 1 / colCount;

						var sharedGutter = tileGutter * hGutterShare;
						var viewportUnit = (width * hShare) - sharedGutter; // ie. previous column's right edge
						var viewportWidth, viewportHeight;
						viewportWidth = viewportHeight = viewportUnit;
						console.log("viewportWidth: " + viewportWidth);
						var viewportBottom = height - viewportUnit;

						angular.forEach( scope.clusters, function(cluster, index) {

							if ( index === 0 ) renderer.clear();

							var scene = scenes[index];
							// scope.updateCamera( camera, scene, mouseX, mouseY );
							controls.update();

							// var elem = container.children[index];
							// var mdTileStyle = window.getComputedStyle(elem);
							// var mdTileLeft = parseInt(mdTileStyle["left"]);
							// var mdTileWidth = parseInt(mdTileStyle["width"]);
							// var mdTilePaddingTop = parseInt(mdTileStyle["padding-top"]);
							// var mdTileMarginTop = parseInt(mdTileStyle["margin-top"]);
							// var viewportLeft   = mdTileLeft;
							// var viewportBottom = height - mdTilePaddingTop + mdTileMarginTop;
							// var viewportWidth  = mdTileWidth;
							// var viewportHeight = mdTileWidth;

							var viewportLeft = (viewportUnit + tileGutter) * index;

							console.log(viewportLeft+", "+viewportBottom+", "+viewportWidth+", "+viewportHeight);
							renderer.setViewport( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.setScissor( viewportLeft, viewportBottom, viewportWidth, viewportHeight );
							renderer.enableScissorTest ( true );
							renderer.setClearColor( "#fff000" ); // COMMENT IF NOT IN TEST MODE
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
