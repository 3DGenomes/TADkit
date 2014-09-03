	APP.directive('scene', function(){
	    return {
			restrict:'E',
	        templateUrl: "testd3three-template-scene.html", 
	        scope: {
	        },
	        link: function (scope, elm, attrs) {
	  			console.log("loading Three");

				var scene, viewport, stats, cube;
				var camera, cameraPosition, cameraTarget, cameraTranslate;
				var ambientLight, pointLight, loader, mesh;
				var controls, gui, renderer;
		
				// THREE BASIC
				scope.init = function () {
					
					// VIEWPORT
					viewport =  elm[0];
					var viewportWidth = viewport.parentNode.clientWidth;
					var viewportHeight = viewportWidth * 0.66;
			
					// SCENE
					scene = new THREE.Scene();
					// var sceneFogNear = 3000;
					// var sceneFogFar = 500;

					// CAMERAS
					console.log("CAMERA (initial)");
					camera = new THREE.PerspectiveCamera(28,  viewportWidth / viewportHeight , 1, 1000000);
					cameraPosition = new THREE.Vector3( 50000, 50000, 50000 );
					cameraTarget = new THREE.Vector3(0,0,0);
					// camera.position = cameraPosition;
					camera.lookAt(cameraTarget);
					// camera.updateProjectionMatrix();
					camera.name = "Scene Camera";
					scene.add(camera);
					console.log(camera);
					var rotation = 0;

					// ORBIT CONTROLS
					controls = new THREE.OrbitControls( camera, viewport );
					controls.addEventListener( 'change', scope.render );

					// // STATS
					// stats = new Stats();
					// stats.setMode(0); // 0: fps, 1: ms
					// stats.domElement.style.position = 'absolute';
					// stats.domElement.style.left = '0px';
					// stats.domElement.style.bottom = '0px';
					// viewport.appendChild( stats.domElement );

					// // EVENTS
					// window.addEventListener( 'resize', onWindowResize, false );

					// HELPERS
					// var axisHelper = new THREE.AxisHelper( 10000 );
					// scene.add( axisHelper );

					// LIGHTS
					// Ambient
					var ambientColor = "#999";
					ambientLight = new THREE.AmbientLight( ambientColor );
					ambientLight.name = "Scene Ambient Light";
					scene.add(ambientLight);
					// Point
					var pointColor = "#fff";
					var pointIntensity = 1.00;
					//var pointDistance = 0.0; DEFAULT = infinite
					pointLight = new THREE.PointLight( pointColor, pointIntensity );
					pointLight.position.set( 20000, 20000, 20000 );
					pointLight.name = "Scene Light";
					scene.add(pointLight);
					console.log(pointLight);
					// Point Light Helper
					var sphereSize = 500;
					var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
					scene.add( pointLightHelper );

					// RENDERER
					renderer = new THREE.WebGLRenderer();
					renderer.setSize(viewportWidth, viewportHeight);
					renderer.setClearColor( 0xffffff, 1 );
					viewport.appendChild(renderer.domElement);

					// GEOMETRY
					var geometry = new THREE.BoxGeometry(1,1,1);
					var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
					cube = new THREE.Mesh(geometry, material);
					scene.add(cube);

					camera.position.z = 5;
				};

				scope.animate = function () {
					requestAnimationFrame( scope.animate );
					scope.render();
				};

				scope.render = function () {
					// requestAnimationFrame(scope.render);
					//
					// cube.rotation.x += 0.1;
					// cube.rotation.y += 0.1;
					//
					renderer.render(scene, camera);
				};

				scope.init();
				scope.animate();


	  // 			function init() {
	  //
	  //
	  //
	  //
	  // 				// ************************************
	  // 				// * MODEL SCALE = 1unit : 1nanometer *
	  // 				// * (1 micrometer = 1000 nanometers) *
	  // 				// ************************************
	  // 				// * Eukaryotic animal cells diamter = 20 µm (10 - 30 µm) = 10000 units radius
	  // 				var cellRadius = 10000;
	  // 				// * nucleus diameter = 6 µm (3 - 10 micrometers) = 3000 units radius
	  // 				var nucelusRadius = 3000;
	  // 				// * chromatin microfilaments width ie diameter = 30nm == 15 units radius
	  // 				var chromatinRadius = 15;
	  //
	  // 				// CELL MODEL
	  // 				console.log("CELL");
	  //  				var cellVisibility = true;
	  // 				var cellOpacity = 0.00;
	  // 				var cellMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: cellOpacity, wireframe: true, transparent: true } );
	  // 				var cell =  new THREE.Object3D();
	  // 				cell.position.set( 0, 0, 0 );
	  // 				cell.name = "Cell";
	  // 				cell.visible = cellVisibility;
	  // 				scene.add( cell );
	  // 				var cellForm = new THREE.Mesh( new THREE.IcosahedronGeometry( cellRadius, 1 ), cellMaterial );
	  // 				cellForm.position.set( 0, 0, 0 );
	  // 				cellForm.name = "Cell Form";
	  // 				cellForm.visible = cellVisibility;
	  // 				scene.add( cellForm );
	  // 				console.log( cell );
	  //
	  // 				// NUCELUS MODEL
	  // 				console.log("NUCLEUS");
	  //  				var nucleusVisibility = true;
	  //  				var nucleusOpacity = 0.00;
	  // 				var nucleusMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: nucleusOpacity, wireframe: true, transparent: true } );
	  // 				var nucleus = new THREE.Object3D();
	  // 				nucleus.position.set( 0, 0, 0 );
	  // 				nucleus.name = "Nucleus";
	  // 				nucleus.visible = nucleusVisibility;
	  // 				cell.add( nucleus );
	  // 				var nucleusForm = new THREE.Mesh( new THREE.IcosahedronGeometry( nucelusRadius, 4 ), nucleusMaterial );
	  // 				nucleusForm.position.set( 0, 0, 0 );
	  // 				nucleusForm.name = "Nucleus Form";
	  // 				nucleusForm.visible = nucleusVisibility;
	  // 				cell.add( nucleusForm );
	  // 				console.log( nucleus );
	  //
	  // 				// TAD MODEL
	  // 				console.log("TAD");
	  // 				var TAD = new THREE.Object3D();
	  // 					TAD.name = "TAD";
	  // 					scene.add(TAD);
	  // 				var biotypes, TADGenes
	  //
	  //  				var TADPointColor = "#ffffff";
	  //  				var TADPointSize = 350;
	  //  				var TADPointOpacity = 0.8;
	  //  				var TADPointVisibility = false;
	  // 				var TADPointCloudMaterial;
	  //
	  // 				var TADCenter = new THREE.Vector3();
	  // 				var TADBounds = new THREE.Mesh();
	  // 				var boundsVisibility = false;
	  //
	  // 				var chromatinVisibility = true;
	  // 				var chromatinRadiusSegments = 16;
	  // 				var chromatinClosed = false; // true: eats own tail (TubeGeometry)
	  // 				var chromatinOpenEnded = true; // true: no end capping (CylinderGeometry: halves face count)
	  //
	  // 				var chromatinMaterial, fragmentMaterial;
	  // 				var chromatinColor = "#37375f";
	  // 				var fragmentColor = "#37375f";
	  //  				var chromatinOpacity = 0.5;
	  //
	  //  				var chromatinPointColor = "#8d8dc8";
	  //  				var chromatinPointSize = 10;
	  //  				var chromatinPointOpacity = 0.2;
	  //  				var chromatinPointVisibility = true;
	  // 				var chromatinPointCloudMaterial;
	  //
	  // 				// LOAD TADbit GEOMETRY
	  // 			    loader = new THREE.JSONLoader();
	  // 			    loader.load( "json/tad.js", function(TADbitGeometry){
	  // 				// TADbitGeometry callback start...
	  // 					TADbitGeometry.name = "TADbit Geometry";
	  // 					console.log("TADbit Geometry");
	  // 					console.log(TADbitGeometry);
	  //
	  // 					// LOAD METADATA
	  // 					// ¿¿¿ ANY WAY OF GETTING METADATA DIRECTLY FROM TADbitGeometry ???
	  // 					console.log("Loading Metadata...");
	  // 					$.ajax({
	  // 						dataType: "json",
	  // 						url: "json/tad.js",
	  // 						// async: false,
	  // 						success: function(TADData){
	  // 							var TADMetadata = TADData.metadata;
	  // 							console.log("TADbit Metadata");
	  // 							console.log(TADMetadata);
	  // 							// TADData callback start...
	  //
	  // 					// TAD RANGE == total BP coords in the TAD (to differentiate from physical length of slice / chromatin)
	  // 					var TADRange = TADMetadata.end - TADMetadata.start;
	  // 					console.log("TAD Range: ", TADRange);
	  //
	  // 					// TAD SLICE == Standard expression of a range of BP coords (usually divided by chromosome)
	  // 					var TADSlice = TADMetadata.chromosome + ":" + TADMetadata.start + "-" + TADMetadata.end;
	  // 					console.log("TAD Slice: %s", TADSlice);
	  //
	  // 					var totalParticles = TADbitGeometry.vertices.length; // redundant but same as C++ version
	  // 					console.log("Total Particles: %2", totalParticles);
	  //
	  // 					var particleSegments = 10; // == 1000BP/segment ||
	  // 					// 2 m DNA length == 2,000 mm == 2,000,000 µm == 2,000,000,000 nm @ 2,300,000,000 BP
	  // 					// 2 m / 6 Chromatin length == 333,333 µm = 333,333,333 nm
	  // 					// sample = 1,000,000 = 0.000435 of total BP => 144,928 nm length
	  // 					// (note: measured in model as: Chromatin Length: 9363 units/nm )
	  // 					// total fragments = 1020 => fragment length = 142 nm => 980 BP
	  // 					// Linear groupings/blocks in chromatin???
	  // 					// 	ie what is min limit for fragment length?
	  //
	  // 					 // FRAGMENTS (ie total segements) nb. UNUSED
	  // 					var totalTADFragments = totalParticles * particleSegments;
	  // 					console.log("Total Fragments: %s", totalTADFragments);
	  //
	  // 					var TADFragmentLengthBP = TADRange / totalTADFragments;
	  // 					console.log("Fragment Physical Length: %s nm", Math.round(TADFragmentLengthBP));
	  //
	  //
	  // 					// CALCULATE TAD CENTER
	  // 					TADCenter = get3DCentroid( TADbitGeometry.vertices );
	  // 					console.log("TAD Center: %s", JSON.stringify(TADCenter));
	  // 					cellForm.position.copy(TADCenter);
	  // 					nucleusForm.position.copy(TADCenter);
	  // 					pointLight.position.copy(TADCenter);
	  //
	  //
	  // 					// LOAD TRANSCRIPTS AS LUT FOR STANDARD (ENSEMBL) BIOTYPE COLORS
	  // 					// NOTE: THREE.JS ALSO HAS COLOR LUT FUNCTION...
	  // 					console.log("Loading Transcripts...");
	  // 					$.ajax({
	  // 						dataType: "json",
	  // 						url: "json/transcripts.json",
	  // 						// async: false,
	  // 						success: function(transcriptsData){
	  // 							console.log(transcriptsData);
	  // 							// transcriptsData callback start...
	  //
	  // 					// LOAD ASSEMBLY FOR SPECIES
	  // 					console.log("Loading Assembly...");
	  // 					var assemblyPath = "http://beta.rest.ensembl.org/assembly/info/" + TADMetadata.species + "?content-type=application/json";
	  // 					$.ajax({
	  // 						dataType: "json",
	  // 						// url: "json/drosophila_melanogaster-assembly.json", // OFFLINE
	  // 						url: assemblyPath,
	  // 						// async: false,
	  // 						success: function(assemblyData){
	  // 							var toplevelRegions = assemblyData.top_level_region
	  // 							var sequenceLength = 0;
	  // 							for (i = 0 ; i < toplevelRegions.length ; i++) {
	  // 								sequenceLength += toplevelRegions[i].length;
	  // 							};
	  // 							console.log(sequenceLength);
	  // 							// assemblyData callback start...
	  //
	  // 					// LOAD ORGANISM BIOTYPES
	  // 					console.log("Load Biotypes...");
	  // 					var biotypesPath = "http://beta.rest.ensembl.org/info/biotypes/" + TADMetadata.species + "?content-type=application/json";
	  // 					 // $.getJSON( "json/drosophila_melanogaster-biotypes.json", function(data) { // OFFLINE
	  // 						$.getJSON( biotypesPath, function(organismBiotypesData) {
	  // 						// GET BIOTYPES
	  // 						biotypeColors = [];
	  // 						console.log("Organism Biotypes");
	  // 						console.log(organismBiotypesData);
	  // 						var totalOrganismBiotypes = organismBiotypesData.length;
	  // 						console.log("Total Organism Biotypes: %s", totalOrganismBiotypes);
	  // 					}); // MAKE A WRAPPER??
	  //
	  // 					// LOAD FRAGMENT GENES
	  // 					console.log("Load Genes...");
	  //
	  // 					var genesPath = "http://beta.rest.ensembl.org/feature/region/" + TADMetadata.species + "/" + TADSlice + "?feature=gene;content-type=application/json";
	  // 					 // $.getJSON( "json/drosophila_melanogaster-genes.json", function(data) { // OFFLINE
	  // 						$.getJSON( genesPath, function(TADGenes) {
	  // 						console.log("TAD Genes");
	  // 						console.log(TADGenes);
	  // 						var totalTADGenes = TADGenes.length;
	  // 						console.log("Total TAD Genes: %s", totalTADGenes)
	  //
	  // 						// GET BIOTYPES
	  // 						var TADBiotypes = [];
	  // 						var TADBiotypesLookup = {};
	  // 						for (var item, i = 0; item = TADGenes[i++];) {
	  // 						  var TADGeneBiotype = item.biotype;
	  // 						  if (!(TADGeneBiotype in TADBiotypesLookup)) {
	  // 						    TADBiotypesLookup[TADGeneBiotype] = 1;
	  // 						    TADBiotypes.push(TADGeneBiotype);
	  // 						  }
	  // 						}
	  // 						console.log("TAD Biotypes");
	  // 						console.log(TADBiotypes);
	  // 						var totalTADBiotypes = TADBiotypes.length;
	  // 						console.log("Total TAD Biotypes: %s", totalTADBiotypes);
	  //
	  // 						// WRAPPING...
	  //
	  // 					// GENES PER BP COORD
	  //
	  // 					var TADBiotypeValues = resequenceGenes( TADMetadata.start, totalTADFragments, TADFragmentLengthBP, TADGenes, TADBiotypes  );
	  // 					console.log("TAD Biotype Values");
	  // 					console.log(TADBiotypeValues);
	  //
	  //
	  //
	  //
	  // 					TADPointCloudMaterial = new THREE.PointCloudMaterial({
	  // 						color: TADPointColor,
	  // 						size: TADPointSize,
	  // 						opacity: TADPointOpacity,
	  // 						// map: THREE.ImageUtils.loadTexture("images/blur-white.png"),
	  // 						// map: THREE.ImageUtils.loadTexture("images/sphere-light.png"),
	  // 						// map: THREE.ImageUtils.loadTexture("images/sphere-md.png"),
	  // 						map: THREE.ImageUtils.loadTexture("images/sphere-glossy.png"),
	  // 						// map: THREE.ImageUtils.loadTexture("images/sphere-woodcut.png"),
	  // 						// map: THREE.ImageUtils.loadTexture("images/sphere-woodcut2.png"),
	  // 						// blending: THREE.AdditiveBlending,
	  // 						transparent: true
	  // 					});
	  //
	  // 					// NEW PARTICLE SYSTEM
	  // 					console.log("TAD PARTICLES POINT CLOUD");
	  // 					// 1. AS SYSTEM
	  // 					TADPointCloud = new THREE.PointCloud(TADbitGeometry, TADPointCloudMaterial);
	  // 					// 2. AS SPHERES
	  // 					// for every particle generate object
	  //
	  // 					TADPointCloud.sortParticles = true;
	  // 					TADPointCloud.name = "TAD Particles";
	  // 					TADPointCloud.visible = TADPointVisibility;
	  //
	  // 					TAD.add(TADPointCloud);
	  // 					console.log(TADPointCloud);
	  //
	  // 					var TAD2Origin = TADCenter.length(); //nucleus.position.distanceTo(TADCenter);
	  // 					console.log("Origin to TAD: %s\n", TAD2Origin);
	  //
	  // 					var camera2TAD = camera.position.distanceTo( TADCenter );
	  // 					console.log("camera2TAD: %s", camera2TAD);
	  //
	  // 					// BOUNDS
	  // 					console.log("TAD BOUNDS");
	  // 					var TADBoundsBox = new THREE.BoundingBoxHelper(TADPointCloud, 0xff0000);
	  // 					TADBoundsBox.update();
	  // 					var TADBoundsSphere = TADBoundsBox.box.getBoundingSphere();
	  // 					console.log(TADBoundsSphere);
	  //
	  // 					var TADBoundsMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000, opacity: 0.2, wireframe: true, transparent: true });
	  // 					var TADBoundsRadius = TADBoundsSphere.radius, TADBoundsSegments = 3, TADBoundsRings = 16;
	  // 					console.log("TAD Bounds Radius: %s", TADBoundsRadius);
	  //
	  // 					// TADBounds = new THREE.Mesh( TADBoundsSphere, TADBoundsMaterial );
	  // 					// TADBounds = new THREE.Mesh( new THREE.SphereGeometry(TADBoundsRadius, TADBoundsSegments, TADBoundsRings), TADBoundsMaterial );
	  // 					// WHY NOT WORKING???
	  //
	  // 					TADBounds = new THREE.Mesh( new THREE.IcosahedronGeometry( TADBoundsRadius, TADBoundsSegments ), TADBoundsMaterial );
	  // 					TADBounds.position.set(TADCenter.x, TADCenter.y, TADCenter.z );
	  // 					// TADBoundsBox.name = "TAD Bounds Box";
	  // 					// TAD.add(TADBoundsBox);
	  // 					TADBounds.name = "TAD Bounds Sphere";
	  // 					TADBounds.visible = boundsVisibility;
	  // 					TAD.add(TADBounds);
	  // 					console.log(TADBounds);
	  //
	  // 					// ADJUST SCENE TO TAD
	  // 					console.log("ADJUST SCENE");
	  // 					cameraTranslate = 3.0 * TADBoundsRadius; // ie. 1.5 diameter - could calc based on FOV...
	  // 					camera.translateZ(cameraTranslate);
	  // 					pointLight.position.add( new THREE.Vector3( TADBoundsRadius, -TADBoundsRadius , TADBoundsRadius * 3 ) );
	  // 					scene.fog = new THREE.Fog( 0xFFFFFF, 1.0 * TADBoundsRadius, 6.0 * TADBoundsRadius );
	  // 					console.log(scene.fog);
	  //
	  // 					// NEW CHROMATIN STRUCTURE
	  // 					console.log("CHROMATIN (empty)");
	  // 					chromatin = new THREE.Object3D();
	  // 					chromatin.name = "Chromatin";
	  // 					chromatin.visible = chromatinVisibility;
	  // 					TAD.add(chromatin);
	  //
	  //
	  // 					// PARTICLE CONTROLS
	  // 					// (totalParticles - 1) because (fore = [i+1])
	  // 					console.log("PARTICLE CONTROLS");
	  // 					var particleControls = [];
	  // 					for (i = 0 ; i < totalParticles - 1 ; i++) {
	  // 						var baseParticle = TADbitGeometry.vertices[i];
	  // 						var foreParticle = TADbitGeometry.vertices[i + 1];
	  // 						var midCoord = new THREE.Vector3(0,0,0);
	  // 						midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
	  // 						var midOffset = new THREE.Vector3(0,0,0);
	  // 						midOffset.copy(midCoord).sub(baseParticle);
	  // 						if (i == 0) { // insert backprojected first coord
	  // 							var preCoord = new THREE.Vector3(0,0,0);
	  // 							preCoord.copy(baseParticle).sub(midOffset);
	  // 							particleControls.push(preCoord);
	  // 						};
	  // 						//particleControls.push(baseParticle);
	  // 						particleControls.push(midCoord);
	  // 						if (i == totalParticles - 2) {
	  // 						//	particleControls.push(foreParticle);
	  // 							var endCoord = new THREE.Vector3(0,0,0);
	  // 							endCoord.copy(foreParticle).add(midOffset);
	  // 							particleControls.push(endCoord);
	  // 						};
	  // 					};
	  // 					console.log(particleControls);
	  // 					var totalParticleControls = particleControls.length;
	  // 					console.log("Total Particle Controls: %s", totalParticleControls);
	  //
	  // 					// CURVE CONTROLS
	  // 					// (totalParticles - 1) because (fore = [i+1])
	  // 					console.log("CURVE CONTROLS");
	  //     				var bezierControls = [];
	  // 					for (i = 0 ; i < totalParticles - 1 ; i++) {
	  // 						var baseParticle = TADbitGeometry.vertices[i];
	  // 						var foreParticle = TADbitGeometry.vertices[i + 1];
	  // 						var midCoord = new THREE.Vector3(0,0,0);
	  // 						midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
	  // 						var midOffset = new THREE.Vector3(0,0,0);
	  // 						midOffset.copy(midCoord).sub(baseParticle);
	  // 						if (i == 0) { // insert backprojected first coord
	  // 							var preCoord = new THREE.Vector3(0,0,0);
	  // 							preCoord.copy(baseParticle).sub(midOffset);
	  // 							bezierControls.push(preCoord);
	  // 						};
	  // 						bezierControls.push(baseParticle);
	  // 						bezierControls.push(midCoord);
	  // 						if (i == totalParticles - 2) {
	  // 							bezierControls.push(foreParticle);
	  // 							var endCoord = new THREE.Vector3(0,0,0);
	  // 							endCoord.copy(foreParticle).add(midOffset);
	  // 							bezierControls.push(endCoord);
	  // 						};
	  // 					};
	  // 					console.log(bezierControls);
	  // 				    var totalbezierControls = bezierControls.length;
	  // 					console.log("Total Curve Controls: %s", totalbezierControls);
	  //
	  // 					// CALCULATE BEZIER COORDS => CONVERT TO FUNCTION OR USE INBUILT THREE FUNCTION
	  // 					// Segments per Base Pair, multiple of BP, or arbitary division.
	  // 					// i=+2 because (pre) base=i, (mid=i+1), fore=i+2, (end)
	  // 					// range == eg. 1 MBP (ie. 1,000,000 BP) / TADbitGeometry (eg. 100) = BP per particle (eg. 10000) === RESOLUTION (see sample metadata)
	  // 					// particleSegments > 1 then check resolution of any 2D/additional data overlayed
	  // 					// USED ON OWN BEZIER - redundant when using user imput
	  // 					console.log("BEZIER COORDS");
	  //
	  //
	  //     				var bezierCoords = [];
	  // 					for ( i = 0 ; i < totalbezierControls - 1; i+=2)
	  // 					{
	  // 						var bezierCurve = new THREE.QuadraticBezierCurve3(bezierControls[i], bezierControls[i+1], bezierControls[i+2]);
	  // 						for ( j = 0 ; j < particleSegments; j++)
	  // 						{
	  // 							t = j / particleSegments;
	  // 							var bezierPoint = bezierCurve.getPoint(t);
	  // 							bezierCoords.push(bezierPoint);
	  // 						}
	  // 					}
	  // 					bezierCoords.push(endCoord);
	  // 					console.log(bezierCoords);
	  // 					var totalBezierCoords = bezierCoords.length;
	  // 					console.log("Total Bezier Coords: %s", totalBezierCoords);
	  //
	  // 					// CHROMATIN PATH
	  // 					console.log("CHROMATIN PATH");
	  // 					// var chromatinPath = new THREE.SplineCurve3( TADbitGeometry.vertices ); // BASIC CURVE
	  // 					// var chromatinPath = new THREE.SplineCurve3( particleControls ); // CORRECTED BASIC CURVE (added ends, midCoords only)
	  // 					// var chromatinPath = new THREE.SplineCurve3( bezierControls ); // CLUMSY CURVE FROM BEZIER CONTROLS (includes baseParticles, foreParticles) - DO NOT USE
	  // 					var chromatinPath = new THREE.SplineCurve3( bezierCoords ); // UNREAL CURVE - Bezier Coords to be used directly as Geometry Path
	  // 					console.log(chromatinPath);
	  //
	  // 					var chromatinLengthNM = chromatinPath.getLength();
	  // 					console.log("Chromatin Physical Length: %s nm", Math.round(chromatinLengthNM));
	  //
	  // 					var TADFragmentLengthNM = chromatinLengthNM / totalTADFragments;
	  // 					console.log("Fragment Physical Length: %s nm", Math.round(TADFragmentLengthNM));
	  //
	  // 					// CHROMATIN PATH SEGMENTS (currently only >1 for TubeGeometry)
	  // 					// eg. per BasePair, multiples of BP, per gene, etc.
	  // 					// User selection requires forced reload of geometry.
	  // 					console.log("CHROMATIN PATH SEGMENTS");
	  // 					var chromatinCurveSegments = 1;
	  // 					console.log("Chromatin Curve Segments: %s", chromatinCurveSegments);
	  //
	  // 					// TEST WIDTHS
	  // 					//chromatinRadius = randomIntFromInterval(1,20); // TEST OF RANDOM RADIUS
	  // 					// var randomRadius = getYValues(randomWalk(totalBezierCoords));
	  // 					// chromatinRadius = randomRadius[i]; // TEST OF RANDOM WALK RADIUS
	  //
	  // 					// CHROMATIN MESH ---> CHANGE TO OBJECT FOR EACH FRAGMENT TO ALLOW DATA AND SELECTION
	  // 					console.log("CHROMATIN MESH");
	  //
	  // 					// CHROMATIN MATERIALS
	  //
	  // 					// var theColors = object.colors;
	  // 					// color = new THREE.Color( theColors[i] );
	  //
	  // 					//  chromatinMaterial = new THREE.MeshBasicMaterial({
	  // 					// 	color: chromatinColor
	  // 					// });
	  // 					chromatinMaterial = new THREE.MeshLambertMaterial({
	  // 						color: chromatinColor,
	  // 						ambient: chromatinColor,
	  // 						emissive: chromatinColor,
	  // 						//shading: THREE.FlatShading,
	  // 						opacity: 1.0,
	  // 						transparent: false,
	  // 						wireframe: false
	  // 					});
	  //
	  // 				    fragmentMaterial = new THREE.LineBasicMaterial( {
	  // 						color: fragmentColor,
	  // 						opacity: 1.0,
	  // 						transparent: true,
	  // 						linewidth: 1
	  // 					} );
	  // 					// fragmentMaterial = new THREE.MeshLambertMaterial({
	  // 					// 	color: fragmentColor,
	  // 					// 	ambient: fragmentColor,
	  // 					// 	emissive: fragmentColor,
	  // 					// 	//shading: THREE.FlatShading
	  // 					// 	opacity: 1.0,
	  // 					//	wireframe: false,
	  // 					// 	transparent: false
	  // 					// });
	  //
	  // 					chromatinPointCloudMaterial = new THREE.PointCloudMaterial({
	  // 						color: chromatinPointColor,
	  // 						opacity: 1.0,
	  // 						transparent: true,
	  // 						map: THREE.ImageUtils.loadTexture("images/sphere-glossy.png"),
	  // 						size: chromatinPointSize,
	  // 						// blending: THREE.AdditiveBlending,
	  // 						// depthTest: 1,
	  // 						// depthWrite: true,
	  // 						// vertexColors: THREE.NoColors,
	  // 						// fog: true
	  // 					});
	  //
	  // 					var chromatinFiber;
	  //
	  // 					// CHROMATIN GEOMETRY
	  // 					console.log("CHROMATIN GEOMETRY");
	  //
	  // 						// // 1. ALL GEOMETRY IN SINGLE OBJECT
	  // 						// console.log("- SINGLE GEOMETRY");
	  // 						// chromatinCurveSegments = totalTADFragments;
	  // 						// // TubeGeometry paramters: path, segments, radius, radialSegments, closed
	  // 						// var chromatinGeometry = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	  // 						// console.log(chromatinGeometry);
	  // 						// chromatinGeometry.name = "Chromatin Tube";
	  // 						// chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
	  //
	  //
	  // 						// // 2. FOR EVERY PARTICLE ADD GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	  // 						// console.log("- COMPOSITE GEOMETRY");
	  // 						// var chromatinGeometry = new THREE.Geometry();
	  // 						// for ( i = 0 ; i < totalParticleControls - 1; i++)
	  // 						// {
	  // 						// 	var chromatinPathPart = new THREE.LineCurve3(particleControls[i], particleControls[i+1]);
	  // 						//     // THREE.TubeGeometry: path, curveSegments, radius, radiusSegments, closedEnds
	  // 						// 	var chromatinGeometryPart = new THREE.TubeGeometry(chromatinPathPart, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	  // 						// 	chromatinGeometry.merge(chromatinGeometryPart);
	  // 						// }
	  // 						// console.log(chromatinGeometry);
	  // 						// console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	  // 						// chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
	  //
	  //
	  // 						// // 3. FOR EVERY BEZIER ADD TUBE GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	  // 						// console.log("- BEZIER TUBE GEOMETRY");
	  // 						// var chromatinGeometry = new THREE.Geometry();
	  // 						// for ( i = 0 ; i < totalBezierCoords - 1; i++)
	  // 						// {
	  // 						// 	var chromatinPathPart = new THREE.LineCurve3(bezierCoords[i], bezierCoords[i+1]);
	  // 						//     // THREE.TubeGeometry: path, curveSegments, radius, radiusSegments, closedEnds
	  // 						// 	var chromatinGeometryPart = new THREE.TubeGeometry(chromatinPathPart, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	  // 						// 	chromatinGeometry.merge(chromatinGeometryPart);
	  // 						// }
	  // 						// console.log(chromatinGeometry);
	  // 						// console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	  // 						// chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
	  //
	  //
	  // 						// // 4. FOR EVERY BEZIER ADD CYLINDER GEOMETRY TO CHROMATIN GEOMETRY ARRAY
	  // 						// console.log("- BEZIER CYLINDER GEOMETRY");
	  // 						// var chromatinGeometry = new THREE.Geometry();
	  // 						// for ( i = 0 ; i < totalBezierCoords - 1; i++)
	  // 						// {
	  // 						// 	var chromatinGeometryPart = function( pointX, pointY )
	  // 						// 	    {
	  // 						// 		    /* edge from X to Y */
	  // 						// 		    var direction = new THREE.Vector3().subVectors( pointY, pointX );
	  // 						// 		    var orientation = new THREE.Matrix4();
	  // 						// 		    /* THREE.Object3D().up (=Y) default orientation for all objects */
	  // 						// 		    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
	  // 						// 		    /* rotation around axis X by -90 degrees
	  // 						// 		     * matches the default orientation Y
	  // 						// 		     * with the orientation of looking Z */
	  // 						// 		    orientation.multiply(new THREE.Matrix4( 1, 0, 0, 0,
	  // 						// 		                                            0, 0, 1, 0,
	  // 						// 		                                            0,-1, 0, 0,
	  // 						// 		                                            0, 0, 0, 1 ));
	  // 						// 			orientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
	  // 						// 		    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
	  // 						// 		    var edgeGeometry = new THREE.CylinderGeometry( chromatinRadius, chromatinRadius, direction.length(), chromatinRadiusSegments, chromatinCurveSegments, chromatinOpenEnded);
	  // 						// 		    edgeGeometry.applyMatrix(orientation);
	  // 						// 		    // ¿¿¿ edgeGeometry.position = new THREE.Vector3().addVectors( pointX, direction.multiplyScalar(0.5) );
	  // 						// 		    return edgeGeometry;
	  // 						// 	    };
	  // 						// 	chromatinGeometry.merge(chromatinGeometryPart(bezierCoords[i], bezierCoords[i+1]));
	  // 						// }
	  // 						// console.log(chromatinGeometry);
	  // 						// console.log("Total Chromatin Geometries: %s", chromatinGeometry.vertices.length);
	  // 						// chromatinFiber = new THREE.Mesh(chromatinGeometry, chromatinMaterial);
	  //
	  //
	  // 						// // 5. FOR EVERY BEZIER ADD CYLINDER GEOMETRY MESH TO CHROMATIN FIBER OBJECT
	  // 						// console.log("- BEZIER CYLINDER GEOMETRY");
	  // 						// var chromatinGeometry = new THREE.Geometry();
	  // 						// var randomRadius = getYValues(randomWalk(totalBezierCoords));
	  // 						// var chromatinFiber = new THREE.Object3D();
	  // 						// for ( i = 0 ; i < totalBezierCoords - 1; i++)
	  // 						// {
	  // 						// 	var fragColor = new THREE.Color().setHSL( TADBiotypeValues[i], 0.5, 0.25  ) ;
	  // 						//     fragmentMaterial = new THREE.LineBasicMaterial( {
	  // 						// 		color: fragColor,
	  // 						// 		opacity: 1.0,
	  // 						// 		transparent: true,
	  // 						// 		linewidth: 2
	  // 						// 	} );
	  // 						// 	chromatinMaterial = new THREE.MeshLambertMaterial({
	  // 						// 		color: fragColor,
	  // 						// 		ambient: fragColor,
	  // 						// 		emissive: fragColor,
	  // 						// 		//shading: THREE.FlatShading,
	  // 						// 		opacity: 1.0,
	  // 						// 		transparent: false,
	  // 						// 		wireframe: false
	  // 						// 	});
	  // 						// 	var fragmentGeometry = function( pointX, pointY )
	  // 						// 	    {
	  // 						// 		    /* edge from X to Y */
	  // 						// 		    var fragmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
	  // 						// 		    var fragmentOrientation = new THREE.Matrix4();
	  // 						// 		    /* THREE.Object3D().up (=Y) default orientation for all objects */
	  // 						// 		    fragmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
	  // 						// 		    /* rotation around axis X by -90 degrees
	  // 						// 		     * matches the default orientation Y
	  // 						// 		     * with the orientation of looking Z */
	  // 						// 		    fragmentOrientation.multiply(new THREE.Matrix4( 1, 0, 0, 0,
	  // 						// 		                            						0, 0, 1, 0,
	  // 						// 		                             						0,-1, 0, 0,
	  // 						//                              													0, 0, 0, 1 ));
	  // 						// 			fragmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
	  // 						// 		    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
	  // 						// 			chromatinOpenEnded = ( i == 0 || i == totalBezierCoords - 2 ) ? false : true ;
	  // 						// 		    var fragmentCylinder = new THREE.CylinderGeometry( chromatinRadius, chromatinRadius, fragmentDirection.length(), chromatinRadiusSegments,chromatinCurveSegments, chromatinOpenEnded);
	  // 						// 		    fragmentCylinder.applyMatrix(fragmentOrientation);
	  // 						// 		    return fragmentCylinder;
	  // 						// 	    };
	  // 						// 	var chromatinFragment = new THREE.Mesh( fragmentGeometry(bezierCoords[i], bezierCoords[i+1]), chromatinMaterial)
	  // 						// 	chromatinFiber.add( chromatinFragment );
	  // 						// }
	  //
	  //
	  // 						// // 6. FOR EVERY BEZIER ADD CIRCLE GEOMETRY LINE TO CHROMATIN FIBER OBJECT
	  // 						// console.log("- BEZIER CYLINDER GEOMETRY");
	  // 						// var chromatinGeometry = new THREE.Geometry();
	  // 						// var chromatinFiber = new THREE.Object3D();
	  // 						// for ( i = 0 ; i < totalBezierCoords - 1; i++)
	  // 						// {
	  // 						// 	var fragColor = new THREE.Color( TADBiotypeValues[i], 0.8, 0.66 );
	  // 						//     fragmentMaterial = new THREE.LineBasicMaterial( {
	  // 						// 		color: fragColor,
	  // 						// 		opacity: 1.0,
	  // 						// 		transparent: true,
	  // 						// 		linewidth: 2
	  // 						// 	} );
	  // 						// 	var fragmentGeometry = function( pointX, pointY )
	  // 						// 	    {
	  // 						// 		    /* edge from X to Y */
	  // 						// 		    var fragmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
	  // 						// 		    var fragmentOrientation = new THREE.Matrix4();
	  // 						// 		    /* THREE.Object3D().up (=Y) default orientation for all objects */
	  // 						// 		    fragmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
	  // 						// 			fragmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
	  // 						// 			chromatinOpenEnded = ( i == 0 || i == totalBezierCoords - 2 ) ? false : true ;
	  // 						// 			var fragmentCircle = new THREE.CircleGeometry( chromatinRadius, chromatinRadiusSegments );
	  // 						// 			// Remove center vertex
	  // 						// 			fragmentCircle.vertices.shift();
	  // 						// 		    fragmentCircle.applyMatrix(fragmentOrientation);
	  // 						// 		    return fragmentCircle;
	  // 						// 	    };
	  // 						// 	var chromatinFragment = new THREE.Line( fragmentGeometry(bezierCoords[i], bezierCoords[i+1]), fragmentMaterial );
	  // 						// 	chromatinFiber.add( chromatinFragment );
	  // 						// }
	  //
	  //
	  // 						// // 7. ALL GEOMETRY AS PONT CLOUD
	  // 						// console.log("- PARTICLE SYSTEM");
	  // 						// chromatinCurveSegments = 1000; // adjustable
	  // 						// chromatinRadiusSegments = 147; // == aprox. number of base pairs on nucleosome ie each ring
	  // 						// // TubeGeometry paramters: path, segments, radius, radialSegments, closed
	  // 						// // see above SCALE definition: chromatinRadius = 3;
	  // 						// var chromatinGeometry = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	  // 						// console.log(chromatinGeometry);
	  // 						// chromatinGeometry.name = "Chromatin Tube";
	  // 						// chromatinFiber = new THREE.Object3D();
	  // 						// chromatinPointCloud = new THREE.PointCloud(chromatinGeometry, chromatinPointCloudMaterial);
	  // 						// chromatinFiber.add( chromatinPointCloud );
	  //
	  //
	  // 						// 8. ALL GEOMETRY AS LOD
	  // 						console.log("- LOD GEOMETRY");
	  // 						var chromatinCurveSegments1 = totalTADFragments;
	  // 						var chromatinRadiusSegments1 = chromatinRadiusSegments;
	  // 						var chromatinGeometry1 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments1, chromatinRadius, chromatinRadiusSegments, chromatinClosed);
	  // 						var chromatinCurveSegments2 = totalTADFragments/2;
	  // 						var chromatinRadiusSegments2 = chromatinRadiusSegments/2;
	  // 						var chromatinGeometry2 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments2, chromatinRadius, chromatinRadiusSegments2, chromatinClosed);
	  // 						var chromatinCurveSegments3 = totalTADFragments/4;
	  // 						var chromatinRadiusSegments3 = chromatinRadiusSegments/4;
	  // 						var chromatinGeometry3 = new THREE.TubeGeometry(chromatinPath, chromatinCurveSegments3, chromatinRadius, chromatinRadiusSegments3, chromatinClosed);
	  // 						chromatinFiber = new THREE.LOD();
	  // 						// var mat1 = new THREE.MeshLambertMaterial({ color: "#00ff00" });
	  // 						lod1 =  new THREE.Mesh(chromatinGeometry1, chromatinMaterial );
	  // 						// var mat2 = new THREE.MeshLambertMaterial({ color: "#ff0000" });
	  // 						lod2 =  new THREE.Mesh(chromatinGeometry2, chromatinMaterial );
	  // 						// var mat3 = new THREE.MeshLambertMaterial({ color: "#0000ff" });
	  // 						lod3 =  new THREE.Mesh(chromatinGeometry3, chromatinMaterial );
	  // 						chromatinFiber.addLevel( lod1,  9 * cameraTranslate ); // distance = 15824 nm
	  // 						chromatinFiber.addLevel( lod2, 11 * cameraTranslate ); // distance = 18988 nm
	  // 						chromatinFiber.addLevel( lod3, 13 * cameraTranslate ); // distance = 22153 nm
	  // 						chromatinFiber.name = "Chromatin Fiber";
	  // 						chromatinFiber.updateMatrix();
	  // 						chromatinFiber.matrixAutoUpdate = false;
	  //
	  //
	  //
	  // 					console.log("chromatinFiber before position set");
	  // 					console.log(chromatinFiber);
	  // 					console.log("Total Chromatin Fragments: %s", chromatinFiber.children.length);
	  // 					chromatin.add( chromatinFiber );
	  //
	  // 					// // PLACE TAD AT CENTER OF WORLD ---> CHANGE FOR MULTIPLE MODELS
	  // 					// console.log("TAD set position");
	  // 					// TAD.position.set( -1.0 * TADCenter.x, -1.0 * TADCenter.y, -1.0 * TADCenter.z ); // move to origin (0,0,0)
	  // 					// TADCenter.x = 0;
	  // 					// TADCenter.y = 0;
	  // 					// TADCenter.z = 0;
	  // 					// console.log("TAD Center: %s", JSON.stringify(TADCenter));
	  //
	  // 					// COMPLETED TAD MODEL
	  // 					console.log("TAD model complete");
	  // 					console.log(TAD);
	  //
	  // 					// Set Camera to TAD
	  // 					// USE FOLLOWING WHEN TAD NOT POSITIONED AT 0,0,0
	  // 					console.log(TADCenter);
	  // 					console.log(cameraTarget);
	  // 					console.log(cameraTranslate);
	  // 					setCameraToTAD(TADCenter, cameraTarget, cameraTranslate);
	  //
	  // 					// TEST LOD
	  // 					var linematerial = new THREE.LineBasicMaterial({ color: 0x0000ff });
	  // 					var v1 = new THREE.Vector3(0,0,0);
	  // 					v1.setFromMatrixPosition( camera.matrixWorld );
	  // 					console.log(v1);
	  // 					var v2 = new THREE.Vector3( TADCenter.x, TADCenter.y, TADCenter.z );
	  // 					// v2.setFromMatrixPosition( chromatinFiber.matrixWorld );
	  // 					console.log(v2);
	  // 					var linegeometry = new THREE.Geometry();
	  // 					linegeometry.vertices.push( v1, v2 );
	  // 					var testline = new THREE.Line( linegeometry, linematerial );
	  // 					console.log(v1.distanceTo(v2));
	  // 					// scene.add( testline );
	  //
	  //
	  //
	  // 					// TEST MODELS
	  //
	  // 					// // TAD Center
	  // 					// var TADCenterMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	  // 					// testObject1 = new THREE.Mesh( new THREE.SphereGeometry( 5, 20, 10 ), TADCenterMaterial );
	  // 					// testObject1.position.set( TADCenter.x, TADCenter.y, TADCenter.z );
	  // 					// TAD.add( testObject1 );
	  // 					//
	  // 					// // TAD Bounds Center
	  // 					// var TADBoundsCenterMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
	  // 					// testObject2 = new THREE.Mesh( new THREE.SphereGeometry( 5, 20, 10 ), TADBoundsCenterMaterial );
	  // 					// testObject2.position.set( TADBounds.center.x, TADBounds.center.y, TADBounds.center.z );
	  // 					// TAD.add( testObject2 );
	  //
	  // 				}); // Genes callback end
	  // 				}}); // assemblyData callback end
	  // 				}}); // transcriptsData callback end
	  // 				}}); // TADData callback end
	  // 			     }); // TAD Loader callback end
	  // 	 			console.log("End of TAD Loader");
	  //
	  // 				// DAT-GUI
	  // 				var sliders = new function() {
	  // 					// Global models
	  // 					this.Cell_Opacity = cellOpacity;
	  // 					this.Nucleus_Opacity = nucleusOpacity;
	  // 					// if data loaded...
	  // 					this.Particle_Visiblity = TADPointVisibility;
	  // 					this.Particle_Size = TADPointSize;
	  // 					this.Particle_Color = TADPointColor;
	  // 					this.Particle_Opacity = TADPointOpacity;
	  // 					this.Bounds_Visibility = boundsVisibility;
	  // 					this.Chromatin_Visiblity = chromatinVisibility;
	  // 					this.Chromatin_Radius = chromatinRadius;
	  // 					this.Chromatin_Segments = chromatinRadiusSegments;
	  // 					this.Chromatin_Color = chromatinColor;
	  // 					this.Chromatin_Opacity = chromatinOpacity;
	  // 					// Camera
	  // 					this.Reset_View = function() {
	  // 						setCameraToTAD(TADCenter, cameraTarget, cameraTranslate);
	  // 				   };
	  // 				}
	  //
	  // 				gui = new dat.GUI();
	  // //						gui.add(controls, 'rotationSpeed',0,0.5);
	  //
	  // 					// CELL CONTORLS
	  // 					var cellControls = gui.addFolder('Cell');
	  // 					cellControls.add(sliders, 'Cell_Opacity', 0.00, 0.20).onChange(function(e) { cellMaterial.opacity = e; });
	  //
	  // 					// NUCLEUS CONTROLS
	  // 					var nucleusControls = gui.addFolder('Nucleus');
	  // 					nucleusControls.add(sliders, 'Nucleus_Opacity', 0.00, 0.20).onChange(function(e) { nucleusMaterial.opacity = e; });
	  //
	  // 					// TAD CONTROLS
	  // 					var particleControls = gui.addFolder('Particles');
	  // 					particleControls.add(sliders, 'Particle_Visiblity').onChange(function(e) { TADPointCloud.visible = e; });
	  // 					particleControls.add(sliders, 'Particle_Size',1,1000).onChange(function(e) { TADPointCloudMaterial.size = e; });
	  // 					particleControls.addColor(sliders, 'Particle_Color').onChange(function(e) { TADPointCloudMaterial.color = new THREE.Color(e); });
	  // 					particleControls.add(sliders, 'Particle_Opacity', 0.1, 1.0).onChange(function(e) { TADPointCloudMaterial.opacity = e; });
	  // 					particleControls.add(sliders, 'Bounds_Visibility').onChange(function(e) { TADBounds.visible = e; });
	  //
	  // 					// CHROMATIN CONTROLS
	  // 					var chromatinControls = gui.addFolder('Chromatin');
	  // 					chromatinControls.add(sliders, 'Chromatin_Visiblity').onChange(function(e) { chromatinFiber.visible = e; });
	  // 					chromatinControls.add(sliders, 'Chromatin_Radius',1,16).onChange(function(e) { chromatinRadius = e; });
	  // 					chromatinControls.add(sliders, 'Chromatin_Segments',1,16).onChange(function(e) { chromatinRadiusSegments = e; });
	  // 					chromatinControls.addColor(sliders, 'Chromatin_Color').onChange(function(e) {
	  // 						chromatinMaterial.color = new THREE.Color(e);
	  // 						chromatinMaterial.ambient = new THREE.Color(e);
	  // 						chromatinMaterial.emissive = new THREE.Color(e);
	  // 						chromatinPointCloudMaterial.color = new THREE.Color(e);
	  // 						fragmentMaterial.color = new THREE.Color(e);
	  // 						fragmentMaterial.ambient = new THREE.Color(e);
	  // 						fragmentMaterial.emissive = new THREE.Color(e);
	  // 					});
	  // 					chromatinControls.add(sliders, 'Chromatin_Opacity', 0.1, 1.0).onChange(function(e) {
	  // 						chromatinMaterial.opacity = e;
	  // 						chromatinPointCloudMaterial.opacity = e;
	  // 					});
	  //
	  // 					var cameraControls = gui.addFolder('Camera');
	  //  					cameraControls.add(sliders, 'Reset_View');
	  // 					cameraControls.open();
	  //
	  //
	  //
	  // 				// RENDER
	  // 				// renderer = new THREE.CanvasRenderer({
	  // 				renderer = new THREE.WebGLRenderer({
	  // 					// alpha: true,
	  // 					antialias: true,
	  // 					// preserveDrawingBuffer: true
	  // 				});
	  // 				renderer.setSize(WIDTH, HEIGHT);
	  // 				renderer.setClearColor( 0xffffff, 1 );
	  // 				// renderer.autoClearColor = false;
	  // 				// renderer.shadowMapEnabled = true;
	  //
	  // 				viewport.appendChild(renderer.domElement);
	  //
	  // 			}
	  //
	  // 			function get3DCentroid( vertices ) {
	  // 				var centroid = new THREE.Vector3();
	  // 				var count = vertices.length;
	  // 				for ( i=0; i < count; i++ )
	  // 				{
	  // 					centroid.x += vertices[i].x;
	  // 					centroid.y += vertices[i].y;
	  // 					centroid.z += vertices[i].z;
	  // 				}
	  // 					centroid.x /= count;
	  // 					centroid.y /= count;
	  // 					centroid.z /= count;
	  // 				// console.log("Centroid: %s", JSON.stringify(centroid));
	  // 				return centroid;
	  // 			}
	  //
	  // 			function setCameraToTAD( position, target, translate) {
	  // 				//console.log("Camera position: %s", JSON.stringify(camera.position) );
	  // 				position = position || new THREE.Vector3(0,0,0);
	  // 				target = target || new THREE.Vector3(0,0,0);
	  // 				translate = translate || 0;
	  // 				// TARGET CAMERA ON TAD
	  // 				camera.position.set(position.x, position.y, position.z);
	  // 				camera.lookAt(target);
	  // 				camera.translateZ(translate);
	  // 				//console.log("Camera reset: %s", JSON.stringify(camera.position) );
	  // 				camera.updateMatrixWorld();
	  //
	  // 				// TARGET CONTROLS ON TAD
	  // 				//console.log("Controls target: %s", JSON.stringify(controls.target));
	  // 				controls.target.copy(position);
	  // 				//console.log("Controls reset: %s", JSON.stringify(controls.target));
	  // 			}
	  //
	  // 			function CalculateBezierPoint(t, p0, p1, p2){
	  // 				// USE THREE!! new THREE.QuadraticBezierCurve3(start3, middle3, end3);
	  // 				// t = fragment length (normalized % of segment)
	  // 				// p0, p1, p2 = bezier controls from TADbitGeometry
	  // 				var p = new THREE.Vector3(0,0,0);
	  // 				var u = 1 - t;
	  // 				var tt = t * t;
	  // 				var uu = u * u;
	  // 				p = uu * p0; //first term
	  // 				p += 2 * u * t * p1; //second term
	  // 				p += tt * p2; //third term
	  // 				return p;
	  // 				console.log("p");
	  // 				console.log(p);
	  //
	  // 			}
	  //
	  // 			function randomIntFromInterval(min,max)
	  // 			{
	  // 			    return Math.floor(Math.random()*(max-min+1)+min);
	  // 			}
	  //
	  // 			var boxMullerRandom = (function () {
	  // 			    var phase = 0,
	  // 			        RAND_MAX,
	  // 			        array,
	  // 			        random,
	  // 			        x1, x2, w, z;
	  //
	  // 			    if (crypto && typeof crypto.getRandomValues === 'function') {
	  // 			        RAND_MAX = Math.pow(2, 32) - 1;
	  // 			        array = new Uint32Array(1);
	  // 			        random = function () {
	  // 			            crypto.getRandomValues(array);
	  //
	  // 			            return array[0] / RAND_MAX;
	  // 			        };
	  // 			    } else {
	  // 			        random = Math.random;
	  // 			    }
	  //
	  // 			    return function () {
	  // 			        if (!phase) {
	  // 			            do {
	  // 			                x1 = 2.0 * random() - 1.0;
	  // 			                x2 = 2.0 * random() - 1.0;
	  // 			                w = x1 * x1 + x2 * x2;
	  // 			            } while (w >= 1.0);
	  //
	  // 			            w = Math.sqrt((-2.0 * Math.log(w)) / w);
	  // 			            z = x1 * w;
	  // 			        } else {
	  // 			            z = x2 * w;
	  // 			        }
	  //
	  // 			        phase ^= 1;
	  //
	  // 			        return z;
	  // 			    }
	  // 			}());
	  //
	  // 			function randomWalk(steps, randFunc) {
	  // 			    steps = steps >>> 0 || 10;
	  // 			    if (typeof randFunc !== 'function') {
	  // 			        randFunc = boxMullerRandom;
	  // 			    }
	  //
	  // 			    var points = [],
	  // 			        value = 0,
	  // 			        t;
	  //
	  // 			    for (t = 0; t < steps; t += 1) {
	  // 			        value += randFunc();
	  // 			        points.push([t, value]);
	  // 			    }
	  // 			    return points;
	  // 			}
	  //
	  // 			function getYValues(points) {
	  // 			    return points.map(function (point) {
	  // 			        return point[1];
	  // 			    });
	  // 			}
	  //
	  // 			function getTypeValue( PC, PG, LN, SN ) {
	  // 				var hasPC = 0;
	  // 				var hasPG = 0;
	  // 				var hasLN = 0;
	  // 				var hasSN = 0;
	  // 				if (PC >= 1) hasPC = 1;
	  // 				if (PG >= 1) hasPG = 1;
	  // 				if (LN >= 1) hasLN = 1;
	  // 				if (SN >= 1) hasSN = 1;
	  //
	  // 				var type = 1.0; // value between 0.0 and 1.0 = color hue
	  // 				if (hasPC) { // PC (protein)
	  // 					if (hasLN) {type = 0.17;} // +LN YELLOW
	  // 					else if (hasSN) {type = 0.50;} // +SN CYAN
	  // 					else if (hasLN && hasSN) {type = 1.0;} // ALL WHITE
	  // 					else {type = 0.33;}; // =PC GREEN
	  // 				}
	  // 				else if (hasPG) { // PG (psuedo)
	  // 					if ((hasPC && hasLN) || (hasLN && hasSN) || (hasPC && hasSN)) {type = 1.0;} // ALL WHITE
	  // 					else {type = 1.00;}; // =PG WHITE
	  // 				}
	  // 				else if (hasLN) { // LN (ncRNA)
	  // 					if (hasSN) {type = 0.83;} // +SN MAGENTA
	  // 					else {type = 0.00;}; // =LN RED
	  // 				}
	  // 				else if (hasSN) { // SN (miRNA)
	  // 					type = 0.67; // =SN BLUE
	  // 				}
	  // 				// console.log( "type = " + type + "\n");
	  // 				return type;
	  // 			}
	  //
	  // 			function resequenceGenes( TADStart, totalTADFragments, TADFragmentLengthBP, TADGenes, biotypes  ) {
	  // 				var biotypesValuePerFragment = [];
	  // 				var biotypesPresent = []
	  // 				var biotypesScales = [];
	  // 				var proteinCodingPresent = new Array(totalTADFragments);
	  // 				var psuedogenePresent = new Array(totalTADFragments);
	  // 				var longNoncodingPresent = new Array(totalTADFragments);
	  // 				var shortNoncodingPresent = new Array(totalTADFragments);
	  // 				biotypesPresent = [ proteinCodingPresent, psuedogenePresent, longNoncodingPresent, shortNoncodingPresent ];
	  // 				for ( i=0; i<totalTADFragments; i++ ) { // for every fragment
	  // 					var lower = TADStart; // LOWEST COORD OF SEQUENCE
	  // 					var fragmentLower = lower + (TADFragmentLengthBP * i);
	  // 					var fragmentUpper = fragmentLower + TADFragmentLengthBP;
	  // 					// console.log(biotypesPresent);
	  // 					// MAP GENE BIOTYPES AGAINST FRAGMENTS
	  // 					for ( j=0; j<TADGenes.length; j++ ) { // for every gene
	  // 						var start = TADGenes[j].start; // gene start
	  // 						var end = TADGenes[j].end; // gene end
	  // 						// Check if overlap of fragment and gene
	  // 						if ( Math.max(fragmentLower, start) <= Math.min(fragmentUpper,end) ) {
	  // 							// console.log( "YES fragment overlap \n" );
	  // 							var biotype = TADGenes[j].biotype;
	  // 							for( k=0; k<biotypes.length; k++ ) { // for every type
	  // 								if (!biotypesPresent[k][i]) biotypesPresent[k][i] = 0;
	  // 								// ASSIGN BIOTYPE CATEGORY
	  // 								if ( biotype == biotypes[k] ) {
	  // 									biotypesPresent[k][i] += 1;
	  // 									biotypesScales[i] += 1;
	  // 								}
	  // 							}
	  // 						} else {
	  // 							// console.log( "No fragment overlap \n" );
	  // 							for( k=0; k<biotypes.length; k++ ) { // for every type
	  // 								if (!biotypesPresent[k][i]) biotypesPresent[k][i] = 0;
	  // 							}
	  // 						}
	  // 					}
	  // 					// ASSIGN FRAGMENT BIOTYPE
	  // 					var typeByFragment = getTypeValue(
	  // 						biotypesPresent[0][i],
	  // 						biotypesPresent[1][i],
	  // 						biotypesPresent[2][i],
	  // 						0
	  // 					 );
	  // 					biotypesValuePerFragment.push( typeByFragment );
	  // 				}
	  // 				return biotypesValuePerFragment;
	  // 			}
	  //
	  //
	  // 			function onWindowResize( event ) {
	  //
	  // 				var WIDTH = parseInt($(viewport).css("width"))
	  // 							- parseInt($(viewport).css("padding-left"))
	  // 							parseInt($(viewport).css("padding-right")),
	  // 					HEIGHT = parseInt($(viewport).css("height"))
	  // 					 		- parseInt($(viewport).css("padding-top"))
	  // 					  	  	- parseInt($(viewport).css("padding-bottom"));
	  // 				renderer.setSize(WIDTH, HEIGHT);
	  // 				camera.aspect = WIDTH / HEIGHT;
	  // 				camera.updateProjectionMatrix();
	  //
	  // 			}
	  //
	  //
	  // 			function animate() {
	  //
	  // 			    requestAnimationFrame(animate);
	  //
	  // 			    render();
	  // 				stats.update();
	  //
	  // 			}
	  //
	  // 			function render() {
	  //
	  // 					scene.updateMatrixWorld();
	  // 					scene.traverse( function ( object ) {
	  // 						if ( object instanceof THREE.LOD ) {
	  // 							object.update( camera );
	  // 						}
	  // 					} );
	  //
	  // 			    renderer.render(scene, camera);
	  // 			}
	  //
	        }
		} //LAST
	})
