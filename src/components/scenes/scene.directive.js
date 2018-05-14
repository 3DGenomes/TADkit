(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentScene', tkComponentScene);

	function tkComponentScene(Particles, Chromatin, Network, Cluster, Datasets, Overlays, Segments, Settings, Networks, ColorConvert) {
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
				// threeService.three().then(function(THREE) {
					// console.log(scope);
					if(angular.isUndefined(scope.currentmodel)) return;
				
					var scene, component, viewport;
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var playback, controls, renderer;
					var particles, chromatin, cluster, network, spheres, ring, leftring, rightring, linker, linker_label;
					var particlesObj, chromatinObj, clusterObj, networkObj, sphereObj;
					//var raycaster, mouse;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					var particleOriginalColor = new THREE.Color();
					var positionOriginalColor = new THREE.Color();
					var highlightColor = new THREE.Color("rgb(0,0,0)"); // add to scene component
					
					var cu;
					
					scope.init = function () {

						scope.complete_scene = function() {
							// GEOMETRY: PARTICLES
							scope.view.settings.particles.size = scope.settings.current.particleSize;
							particles = new Particles(scope.currentmodel.data, scope.currentoverlay.colors.particles, scope.view.settings.particles);
							// particles = new Particles(scope.model.data, scope.overlay.colors.particles, scope.view.settings.particles);
							particles.visible = scope.view.settings.particles.visible;
							scene.add(particles);

							//GEOMETRY: CHROMATIN
							scope.view.settings.chromatin.particleSegments = scope.settings.current.particleSegments;
							var resolution = scope.data.object.resolution; // base pairs
							var resolution_scale;
							if(angular.isUndefined(scope.data.object.radius_scale)) {
								angular.forEach(scope.view.settings.chromatin.resolution_scales, function(value, key) {
									  if(parseInt(key) <= resolution) resolution_scale = value;
								});
								scope.data.object.radius_scale = resolution_scale;
							} else {
								resolution_scale = parseInt(scope.data.object.radius_scale);
							}
							chromatin = new Chromatin(scope.currentmodel.data, scope.currentoverlay.colors.chromatin, scope.view.settings.chromatin, resolution_scale, scope.settings.current);
							// chromatin = new Chromatin(scope.model.data, scope.overlay.colors.chromatin, scope.view.settings.chromatin);
							chromatin.visible = scope.view.settings.chromatin.visible;
							scene.add(chromatin);
							scope.view.settings.chromatin.radius = chromatin.boundingSphere.radius;
							
							if(scope.view.settings.chromatin.tubed) {
								
								var radius = chromatin.children[0].geometry.parameters.radius+0.2*chromatin.children[0].geometry.parameters.radius;
								var ringGeometry = new THREE.RingGeometry(radius, radius+1.0*radius, 50);
								//ringGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
								ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								
								scene.add(ring);

								leftring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								leftring.visible = false;
								scene.add(leftring);

								rightring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								rightring.visible = false;
								scene.add(rightring);

								var link_def = new THREE.Geometry();

								link_def.vertices.push(leftring.position);
								link_def.vertices.push(rightring.position);
								
								
								linker = new THREE.Line(link_def, new THREE.LineDashedMaterial( {
									color: 0xff0000,
									linewidth: 1,
									scale: 1,
									dashSize: 3,
									gapSize: 2,
								} ));
								linker.visible = false;
								scene.add(linker);


								spheres = new THREE.Object3D();
								var start_tad, end_tad, radius_cloud, centre_of_mass;
								for (var i = 0; i < scope.data.tad_data.tads.length; i++) {
									start_tad = Math.round(((scope.data.tad_data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                		end_tad = Math.round((scope.data.tad_data.tads[i][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                 		
			                 		centre_of_mass = new THREE.Vector3();
									for (var j = start_tad; j < end_tad; j++) {
										centre_of_mass.add(particles.geometry.vertices[j]);
									}
									centre_of_mass.divideScalar(end_tad - start_tad + 1);
									radius_cloud = 0;
									for (j = start_tad; j < end_tad; j++) {
										if(centre_of_mass.distanceTo(particles.geometry.vertices[j])>radius_cloud) 
											radius_cloud = centre_of_mass.distanceTo(particles.geometry.vertices[j]);
									}
									
									var sphereGeom =  new THREE.SphereGeometry( radius_cloud-10, 32, 16 );									
									var blueMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.3 } );									
									var sphere = new THREE.Mesh( sphereGeom, blueMaterial );
									sphere.material.emissive = new THREE.Color(0x000000);
								
									sphere.position.x = centre_of_mass.x;
									sphere.position.y = centre_of_mass.y;
									sphere.position.z = centre_of_mass.z;
									
									
									spheres.add(sphere);
									
									
								}
								spheres.name = "TADs cloud";
								scene.add(spheres);	
								sphereObj = scene.getObjectByName( "TADs cloud" );
								
								//raycaster = new THREE.Raycaster();
								//mouse = new THREE.Vector2();
								
								//viewport.addEventListener( 'click', onDocumentMouseDown, false );
								
							}
							// GEOMETRY: MESH
							// network = new Network(scope.data.data, scope.overlay.colors.network, scope.view.settings.network);
							// network.visible = scope.view.settings.network.visible;
							// scene.add(network);

							//GEOMETRY: CLUSTER
							var clusterLength = scope.data.data.length / scope.data.object.components;
							var gradientColors = Segments.gradientHCL(scope.currentoverlay, clusterLength);
							var models = Datasets.getCluster();
							var cluster_data = [];
							for (var k = 0; k < models.length; k++) {
								var model = Datasets.getModel(models[k],scope.settings.current.chromosomeIndexes);
								var modelData = model.data;
								if (modelData) {cluster_data.unshift(modelData);}
									else {console.log("Listed model not found!");}
							
							}
							
							cluster = new Cluster( cluster_data, -1, gradientColors, scope.view.settings.cluster );
							cluster.visible = scope.view.settings.cluster.visible;
							cluster.name = "Cluster View";
							scene.add(cluster);



						};
						// VIEWPORT
						/* component-controller == children[0]
						 * - component-header == children[0]
						 * - component-body == children[3]
						 */
						// component = element[0].parentNode;
						// console.log(component.clientWidth);
						viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
						// if with controller use line below
						// viewport = element[0].children[0].children[3];

						// width = component.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width); // USE UNTIL DOM CHECK AVAILBLE
						//if(window.innerWidth <= 1280) width = 600;
						// height = component.clientHeight;
						height = parseInt(scope.state.height); // USE UNTIL DOM CHECK AVAILBLE
						// OJO! DOM NOT READY
						// console.log(element[0].firstChild.children[2].clientWidth);

						if (window.WebGLRenderingContext)
							renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
						else
							renderer = new THREE.CanvasRenderer({alpha: true});					
						var background = scope.view.settings.background;
						var clearColor = "0x" + background.substring(1);
						renderer.setClearColor( parseInt(clearColor) );
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
						controls = new THREE.TrackballControls(camera, renderer.domElement);
						// Use OrbitControls for autoRotate
						playback = new THREE.OrbitControls(camera, renderer.domElement);
						playback.autoRotate = scope.view.controls.autoRotate;
						playback.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
						// interaction FALSE so as not to conflict with controls
						playback.enableZoom = false;
						playback.enableRotate = false;
						playback.enablePan = false;
						playback.enableKeys = false;
						
						// AXIS
						// TODO: Make local axisHelper
						var axisHelper = new THREE.AxesHelper( scope.view.settings.axis.size );
						axisHelper.visible = scope.view.settings.axis.visible;
						axisHelper.name = "Axis";
						scene.add( axisHelper );

						// LIGHTS
						// Ambient
						var ambientColor = scope.view.settings.lighting.ambient;
						ambientLight = new THREE.AmbientLight(ambientColor);
						ambientLight.name = "Scene Ambient Light";
						scene.add(ambientLight);
						
						// Point
						var pointColor = scope.view.settings.lighting.color;
						var pointIntensity = scope.view.settings.lighting.intensity;
						pointLight = new THREE.PointLight(pointColor, pointIntensity);
						pointLight.name = "Scene Light";
						camera.add(pointLight);
						
						if(typeof scope.currentmodel.data !== 'undefined' && scope.currentmodel.data.length>0) {
							
							scope.complete_scene();
						
							// UPDATE CAMERA TARGET
							cameraPosition = chromatin.boundingSphere.center;
							cameraTarget = chromatin.boundingSphere.center;
							cameraTranslate = chromatin.boundingSphere.radius * scope.view.viewpoint.scale;
							scope.lookAtTAD(cameraPosition, cameraTarget, cameraTranslate);
	
													
	
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
						}
						
						var lightOffset = cameraTranslate * 1.5; // Up and to the left
						pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
						//pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
						// Point Light Helper
						var sphereSize = 1000;
						var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
						//scene.add(pointLightHelper);
						
						// FOG SCENE
						var fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
							fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
						if (scope.view.viewpoint.fog) scene.fog = new THREE.Fog(background,fogNear,fogFar);
						

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
						scope.$watch('view.settings.cluster.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								cluster.visible = !cluster.visible;
							}
						});
//						scope.$watch('view.settings.network.visible', function( newValue, oldValue ) {
//							if ( newValue !== oldValue ) {
//								network.visible = !network.visible;
//							}
//						});

						particlesObj = scene.getObjectByName( "Particles Cloud" );
						chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
						clusterObj = scene.getObjectByName( "Cluster View" );
						//networkObj = scene.getObjectByName( "Network Graph" );
						

						// /* Watch for Particles colors */
						scope.$watch('currentoverlay.colors.particles', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( newColors !== oldColors ) {
								// var particleCount = particlesObj.children.length;
								// for (var i = 0; i < particleCount; i++) {
								// 	var newParticleColor =  new THREE.Color(newOverlay.colors.particles[i]);
								// 	particlesObj.children[i].material.color = newParticleColor;
								// }
							}
						});
						
						// /* Watch chromatin radius scale
						scope.$watch('data.object.radius_scale', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								if(typeof scope.currentmodel.data === 'undefined' || scope.currentmodel.data.length === 0) return;
								scope.toggleTubed(true);
							}
						});
						
						// /* Watch for Chromatin colors */
						scope.$watch('currentoverlay.colors.chromatin', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( typeof chromatinObj !== 'undefined' && newColors !== oldColors) {
//								if(scope.view.settings.chromatin.tubed && scope.currentoverlay.object.state.overlaid) {
//									scope.toggleTubed(false);
//								} 
//								if(!scope.view.settings.chromatin.tubed && !scope.currentoverlay.object.state.overlaid) {
//									scope.toggleTubed(true);
//								}
								var i,j,k,newChromatinColor;
								var chromatinCount = chromatinObj.children.length;
								if(!scope.view.settings.chromatin.tubed) {
									for (i = 0; i < chromatinCount; i++) {
										newChromatinColor =  new THREE.Color(newColors[i]);
										chromatinObj.children[i].material.color = newChromatinColor;
										chromatinObj.children[i].material.ambient = newChromatinColor;
										chromatinObj.children[i].material.emissive = newChromatinColor;
									}
								} else {
									var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
									//var offset = 0;
									var colori = 0;
									//var chr_bins;
									var simple_chrom_colors = ['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF','#C0C0C0','#808080','#800000','#808000','#008000','#800080','#008080','#000080','#A52A2A','#E9967A','#B8860B','#FFFF00','#006400','#98FB98','#2F4F4F','#40E0D0','#4682B4','#87CEFA','#DC143C','#FFD700','#F0E68C','#7CFC00','#00FF00','#00FF7F','#3CB371','#00FFFF','#AFEEEE','#6495ED','#87CEEB'];
									var geom;
									var partFaces, segFaces;
									for (var l = 0 ; l < scope.settings.current.chromosomeIndexes.length; l++) {
										//chr_bins = Math.round((scope.settings.current.chromEnd[l]-scope.settings.current.chromStart[l])/resolution)+1;
										geom = chromatinObj.children[l].geometry;
										partFaces = scope.settings.current.facesParticle[l];
										for (i = 0; i < partFaces.length; i++) {
											for (j = 0; j < scope.settings.current.particleSegments; j++) {
												colori = i*scope.settings.current.particleSegments+j;
												if(scope.settings.current.chromosomeIndexes.length > 1) newColors[colori] = simple_chrom_colors[l];
												if(ColorConvert.testIfHex(newColors[colori]) || newColors[colori].indexOf('#')===0) {
													newChromatinColor =  new THREE.Color(newColors[colori]);	 
												} else {
													newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(newColors[colori]));
												}
												for (k = partFaces[i][0]; k <= partFaces[i][1]; k++) {	 
													if(typeof geom.faces[k] !== 'undefined') geom.faces[k].color.set(newChromatinColor);
												}
											}
										}
										
										geom.colorsNeedUpdate = true;
										//offset += chr_bins;
							    	}
									
								}
							}
						});
						scope.toggleTubed = function(tubed) {
							scope.clean_scene();
							scope.view.settings.chromatin.tubed = tubed;
						    scope.complete_scene();
						    if(scope.view.settings.chromatin.tubed) {
						        sphereObj = scene.getObjectByName( "TADs cloud" );
							}
							
							particlesObj = scene.getObjectByName( "Particles Cloud" );
							chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
							clusterObj = scene.getObjectByName( "Cluster View" );
							//networkObj = scene.getObjectByName( "Network Graph" );
						};
						scope.redraw_scene = function() {
							
							if(typeof scope.currentmodel.data === 'undefined' || scope.currentmodel.data.length === 0) return;
						
							scope.clean_scene();
							var chrom_colors = scope.currentoverlay.colors.chromatin.slice();
							scope.currentoverlay.colors.chromatin = chrom_colors;
						    Overlays.segment();
							scope.complete_scene();
							
						    if(scope.view.settings.chromatin.tubed) {
						        sphereObj = scene.getObjectByName( "TADs cloud" );
							}
							
							particlesObj = scene.getObjectByName( "Particles Cloud" );
							chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
							clusterObj = scene.getObjectByName( "Cluster View" );
							//networkObj = scene.getObjectByName( "Network Graph" );
							
							cameraPosition = chromatin.boundingSphere.center;
							cameraTarget = chromatin.boundingSphere.center;
							cameraTranslate = chromatin.boundingSphere.radius * scope.view.viewpoint.scale;
							scope.lookAtTAD(cameraPosition, cameraTarget, cameraTranslate);
							
							var lightOffset = cameraTranslate * 1.5; // Up and to the left
							pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
							// FOG SCENE
							var fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
								fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
							scene.fog.near = fogNear;
							scene.fog.far = fogFar;
						
						};
						scope.$watch('settings.current.chromosomeIndexes', function( newValue, oldValue ) {
							if ( newValue !== oldValue) {
								//scope.currentmodel.data = Datasets.getModel().data;
								scope.redraw_scene();
							}
						});
						// /* Watch for selected TAD */
						scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
							//if(scope.view.settings.chromatin.tubed) return;
							if ( newValue !== oldValue && chromatinObj) {
								var i;
								if(scope.view.settings.chromatin.tubed) {
									var tadCount = sphereObj.children.length;
									var newColor = new THREE.Color( 0xff0000 );
									var oldColor = new THREE.Color( 0x000000 );
									for (i = 0; i < tadCount; i++) {
										if(i==scope.settings.current.tad_selected) {
											sphereObj.children[i].material.opacity = 0.2;
											sphereObj.children[i].material.emissive.set( newColor );
											
										} else {
											if(newValue == -1) {
												sphereObj.visible = false;
											} else {
												sphereObj.visible = true;
												sphereObj.children[i].material.opacity = 0.3;
												sphereObj.children[i].material.color.set(oldColor);
												sphereObj.children[i].material.emissive.set(oldColor);
											}
										}
										sphereObj.children[i].geometry.colorsNeedUpdate = true;
										
									}
									
								} else {
									var chromatinCount = chromatinObj.children.length;
									var start_tad, end_tad;
									var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
									if(newValue>-1) {
										start_tad = (Math.round(((scope.data.tad_data.tads[newValue][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution))*scope.settings.current.particleSegments;
				                		end_tad = (Math.round((scope.data.tad_data.tads[newValue][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution))*scope.settings.current.particleSegments;
				                 	}
									for (i = 0; i < chromatinCount; i++) {
										if(i>=start_tad && i<end_tad) {
											chromatinObj.children[i].material.opacity = 1;
										} else {
											if(newValue == -1) chromatinObj.children[i].material.opacity = 1;
											else chromatinObj.children[i].material.opacity = 0.5;
										}
										
									}
								}
							}
						});

						// /* Watch for Network colors */
//						scope.$watch('currentoverlay.colors.network', function( newColors, oldColors ) { // cant deep watch as change through set on service
//							if ( newColors !== oldColors && networkObj.geometry) {
//								networkObj.geometry.addAttribute( 'color', new THREE.BufferAttribute( newColors.RGB, 3 ) );
//								networkObj.geometry.addAttribute( 'alpha', new THREE.BufferAttribute( newColors.alpha, 1 ) );
//							}
//						});

						/* Watch for Browser-wide Position updates */
						scope.$watch('settings.current.particle', function( newParticle, oldParticle ) {
							if ( newParticle !== oldParticle) {
								if(particlesObj) {
									// SET PARTICLE CURSOR COLOR
									if (particleOriginalColor) particlesObj.geometry.colors[(oldParticle - 1)] = particleOriginalColor;
									particleOriginalColor = particlesObj.geometry.colors[(newParticle - 1)];
									particlesObj.geometry.colors[(newParticle - 1)] = highlightColor;
									particlesObj.geometry.colorsNeedUpdate = true;
								}
							}
						});
						scope.updateRingPosition = function(ring,newSegment,oldSegment) {
							var newChrom=0;
							var oldChrom=0;
							var newSeg;
							var oldSeg;
							var vec, i;
							var chr_bins;
							var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
							var newPart, oldPart;
							if(newSegment.length>1) {
								newSeg = newSegment[0];
								oldSeg = oldSegment[0];
								newChrom = newSegment[1];
								oldChrom = oldSegment[1];
								newPart = Math.floor(newSeg/scope.settings.current.particleSegments);
								oldPart = Math.floor(oldSeg/scope.settings.current.particleSegments);
							} else {
								newSeg = newSegment;
								oldSeg = oldSegment;
								newPart = Math.floor(newSeg/scope.settings.current.particleSegments);
								oldPart = Math.floor(oldSeg/scope.settings.current.particleSegments);
								chr_bins = Math.round(scope.settings.current.chromEnd[newChrom]/resolution)-Math.round(scope.settings.current.chromStart[newChrom]/resolution);
				            	while(chr_bins-1<newPart) {
				            		newPart -= chr_bins;
				            		newSeg -= chr_bins*scope.settings.current.particleSegments;
				            		newChrom++;
				            		chr_bins = Math.round(scope.settings.current.chromEnd[newChrom]/resolution)-Math.round(scope.settings.current.chromStart[newChrom]/resolution);
				            	}
				            	chr_bins = Math.round(scope.settings.current.chromEnd[oldChrom]/resolution)-Math.round(scope.settings.current.chromStart[oldChrom]/resolution);
				            	while(chr_bins-1<oldPart) {
				            		oldPart -= chr_bins;
				            		oldSeg -= chr_bins*scope.settings.current.particleSegments;
				            		oldChrom++;
				            		chr_bins = Math.round(scope.settings.current.chromEnd[oldChrom]/resolution)-Math.round(scope.settings.current.chromStart[oldChrom]/resolution);
				            	}
							}
							/*if(chromatinObj.children[newChrom].geometry.vertices.length > (newSeg+1)*8+8) {
								
								vec = chromatinObj.children[newChrom].geometry.vertices[(newSeg+1)*8];
								
									for(i=1;i<8;i++){
										vec.add(chromatinObj.children[newChrom].geometry.vertices[(newSeg+1)*8+i]);
									}
									vec.divideScalar(8);
								
								
								ring.position.x = vec.x;
								ring.position.y = vec.y;
								ring.position.z = vec.z;
								
								vec = chromatinObj.children[oldChrom].geometry.vertices[oldSeg*8];
								for(i=1;i<8;i++){
									vec.add(chromatinObj.children[oldChrom].geometry.vertices[oldSeg*8+i]);
								}
								vec.divideScalar(8);
								ring.lookAt(vec);
							}*/
							vec = new THREE.Vector3(0,0,0);
							if(scope.settings.current.facesParticle.length <= newChrom ||
									scope.settings.current.facesParticle[newChrom].length <= newPart) return;
							var partFaces = scope.settings.current.facesParticle[newChrom][newPart];
							var segPos = ((newSeg-newPart*scope.settings.current.particleSegments))/scope.settings.current.particleSegments;
							var vertice = Math.round(((partFaces[1]-partFaces[0])*segPos+partFaces[0])/2);
							if(vertice < 1) return;
							for(i=0;i<8;i++){
								if(chromatinObj.children[newChrom].geometry.vertices.length > vertice+i) vec.add(chromatinObj.children[newChrom].geometry.vertices[vertice+i]);
							}
							vec.divideScalar(8);
							
							ring.position.x = vec.x;
							ring.position.y = vec.y;
							ring.position.z = vec.z;
							
							vec = new THREE.Vector3(0,0,0);
							if(scope.settings.current.facesParticle.length <= oldChrom) return;
							partFaces = scope.settings.current.facesParticle[oldChrom][oldPart];
							segPos = ((oldSeg-oldPart*scope.settings.current.particleSegments))/scope.settings.current.particleSegments;
							vertice = Math.round(((partFaces[1]-partFaces[0])*segPos+partFaces[0])/2);
							
							/*if(middleSegment+8 < chromatinObj.children[newChrom].geometry.vertices.length) {
								middleSegment += 8;
							} else {
								middleSegment -= 8;
							}*/
							for(i=0;i<8;i++){
								if(chromatinObj.children[oldChrom].geometry.vertices.length > vertice+i) vec.add(chromatinObj.children[oldChrom].geometry.vertices[vertice+i]);
							}
							vec.divideScalar(8);
							
							ring.lookAt(vec);
							
							return;
						};
					};
					/* Watch for Browser-wide Position updates */
					scope.$watch('settings.current.segment', function( newSegment, oldSegment ) {
						if ( typeof ring !== 'undefined' && (newSegment !== oldSegment || (ring.position.x === 0 && ring.position.y === 0 && ring.position.z === 0))) {
							//if(scope.view.settings.chromatin.tubed) return;
							if(scope.view.settings.chromatin.tubed) {
								scope.updateRingPosition(ring,newSegment,oldSegment);
								
							}
							// SET CHROMATIN CURSOR COLOR

							var segmentPrevious = chromatinObj.getObjectByName( "segment-" + oldSegment );
							if (positionOriginalColor && segmentPrevious) {
								segmentPrevious.material.color = positionOriginalColor;
								segmentPrevious.material.ambient = positionOriginalColor;
								segmentPrevious.material.emissive = positionOriginalColor;
							}

							var segmentCurrent = chromatinObj.getObjectByName( "segment-" + newSegment );
							if(segmentCurrent) {
								positionOriginalColor = segmentCurrent.material.color;

								segmentCurrent.material.color = highlightColor;
								segmentCurrent.material.ambient = highlightColor;
								segmentCurrent.material.emissive = highlightColor;
							}
						}
					});
					scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
						if ( newValue !== oldValue && chromatinObj) {
							if(scope.view.settings.chromatin.tubed) {
								if ( angular.isUndefined(scope.settings.current.markers_position) || newValue[0] === -1 || newValue[1] === -1) {	
									leftring.visible = false;
									rightring.visible = false;
									linker.visible = false;
									scene.remove(linker_label);
									linker_label = undefined;
					        	} else {
					        		var newLeftPos = Settings.getSegment(scope.settings.current.markers_position[1]);
									var newRightPos = Settings.getSegment(scope.settings.current.markers_position[0]);
									
									var oldLeftPos = newLeftPos>0 ? newLeftPos-1 : 0;
									var oldRightPos = newRightPos>0 ? newRightPos-1 : 0;

					        		scope.updateRingPosition(leftring,[newLeftPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[1])], [oldLeftPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[1])]);
									scope.updateRingPosition(rightring,[newRightPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[0])], [oldRightPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[0])]);
									leftring.visible = true;
									rightring.visible = true;
									linker.visible = true;
									linker.geometry.computeLineDistances();
									linker.geometry.verticesNeedUpdate = true;

									
					        	}
					        }
						}
					});
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

						contW = parseInt(scope.state.width);
						contH = parseInt(scope.state.height);
						
						camera.aspect = contW / contH;
						camera.updateProjectionMatrix();

						renderer.setSize( contW, contH  );
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
							camera.translateY(translate);
							playback.target = target;
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

					scope.clean_scene = function () {
						var i;
						
						if(typeof chromatinObj === 'undefined') return;
							
						scene.remove(leftring);
						scene.remove(rightring);
						scene.remove(ring);
						scene.remove(linker);
						scene.remove(particles);
				        scene.remove(chromatin);
				        scene.remove(cluster);
				        //scene.remove(network);
				        scene.remove(particlesObj);
				        scene.remove(chromatinObj);
				        scene.remove(clusterObj);
				        //scene.remove(networkObj);
				        
				        particles.geometry.dispose();
				        particles.material.dispose();
				        particlesObj.geometry.dispose();
				        particlesObj.material.dispose();
				        
				        if(!scope.view.settings.chromatin.tubed) {
									
					        for(i=0;i<chromatin.children.length;i++) {
					        	chromatin.children[i].geometry.dispose();
					        	chromatin.children[i].material.dispose();
					        	chromatinObj.children[i].geometry.dispose();
					        	chromatinObj.children[i].material.dispose();
					        	
					        }
					    } else {
					    	scene.remove(spheres);
					    	scene.remove(sphereObj);
					    	for(i=0;i<spheres.children.length;i++) {
					        	spheres.children[i].geometry.dispose();
					        	spheres.children[i].material.dispose();
					        	sphereObj.children[i].geometry.dispose();
					        	sphereObj.children[i].material.dispose();
					        	
					        }
					        spheres = undefined;
					        sphereObj = undefined;
					    }
					    for(i=0;i<cluster.children.length;i++) {
				        	cluster.children[i].geometry.dispose();
				        	cluster.children[i].material.dispose();
				        	clusterObj.children[i].geometry.dispose();
				        	clusterObj.children[i].material.dispose();
				        	
				        }  
				        // for(i=0;i<network.children.length;i++) {
				        // 	network.children[i].geometry.dispose();
				        // 	network.children[i].material.dispose();
				        // 	networkObj.children[i].geometry.dispose();
				        // 	networkObj.children[i].material.dispose();
				        	
				        // }     
				        leftring = undefined;
				        rightring = undefined;
				        ring = undefined;
				        linker = undefined;
				        particles = undefined;
				        particlesObj = undefined;
				        chromatinObj = undefined;
				        chromatin = undefined;
				        cluster = undefined;
				        clusterObj = undefined;
				        //network = undefined;
				        //networkObj = undefined;
				        
					};
				    scope.$on('$destroy', function() {
				        scope.clean_scene();
				    });

				    scope.takeScreenshot = function() {

				        var a = document.createElement('a');
				        // Without 'preserveDrawingBuffer' set to true, we must render now
				        renderer.render(scene, camera);
				        a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
				        a.download = 'model-screenshot.png';
				        a.click();
				    
				        
				    };
					/*function onDocumentMouseDown( event ) {

						event.preventDefault();
						mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
						raycaster.setFromCamera( mouse, camera );
						var intersects = raycaster.intersectObjects(array_spheres);
						if ( intersects.length > 0 ) {
							intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

						}
					}*/
				    
					// Begin
					scope.init();
					scope.animate();
				// });
			}
		};
	}
})();
