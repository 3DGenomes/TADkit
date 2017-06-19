 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin(Paths, PathControls, ColorConvert) {
		return function(data, colors, settings, resolution_scale) {
			// console.log(colors);

			var defaults = {
				visible: true,
				genomeLength: 816394, // bactieria mycoplasma_pneumoniae_m129
				particles: 0,
				particleSegments: 40,
				curveSegments: 1,
				radius: 15,
				radiusSegments: 16,
				endcap: false,
				pathClosed: false,
				tubed: true,
				resolution_scales : {
					"2000" : 1,
					"10000" : 1,
					"50000" : 5,
					"100000" : 5
				}
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

//			var controlsGeom = new THREE.Geometry();
//			for ( var h = 0; h < pathControls.vertices.length; h ++ ) {
//				controlsGeom.vertices.push( new THREE.Vector3( pathControls.vertices[h].x, pathControls.vertices[h].y, pathControls.vertices[h].z || 0) );
//				var vertexColor = pathControls.colors[h];
//				controlsGeom.colors.push(vertexColor);
//			}
//			controlsGeom.name = "controlsGeom";

			// Set number of Particles
			if (this.particles === 0) this.particles = geometry.vertices.length; //pathControls.vertices.length - 1;
			// Derive chromatin geometry path segments
			var pathSegments = this.particles * this.particleSegments; // same as segmentsCount...
			this.pathSegments = pathSegments;

			/*** TODO: Calculate PathSegments based on number of base pairs in the model ***/
			var cubicPath = Paths.cubicBezier(pathControls.vertices, pathSegments, this.pathClosed);
			var cubicGeom = cubicPath.createPointsGeometry(pathSegments);
			//for (var j = cubicGeom.vertices.length - 1; j >= 0; j--) {
			//	var cubicGeomColor = new THREE.Color(colors[j]);
			//	cubicGeom.colors.unshift(cubicGeomColor);
			//}
			var j;
			cubicGeom.name = "cubicGeom";

			// ********************************************
			// * MODEL SCALE = 1unit : 1nanometer         *
			// * 1 micrometer (µm) = 1000 nanometers (nm) *
			// ********************************************
			// Eukaryotic animal cells diamter == 20 µm (10 - 30 µm) = 10000 units radius
			// var cellRadius = 10000;
			// Nucleus diameter == 6 µm (3 - 10 micrometers) = 3000 units radius
			// var nucelusRadius = 20;
			// Chromatin diameter == 10nm
			var pathLength = cubicPath.getLength();
			var chromatinRadius = 5; // 10nm * 0.5
			// Chromatin density == 1080 BP : 11nm
			var chromatinLength = this.genomeLength * 11 / 1080;
			//this.radius = (pathLength * chromatinRadius) / chromatinLength;
			this.radius = resolution_scale*chromatinRadius;
			//console.log(this.radius);


			// Generate Chromatin model
			var chromatinFiber = new THREE.Object3D(); // unmerged network
			var i;
			
			var chromatinGeometry;
			if(settings.tubed) {
				chromatinGeometry = new THREE.TubeGeometry(cubicPath, pathSegments, this.radius, 8, this.pathClosed);
				
				
//					
//				var tubeMesh = THREE.SceneUtils.createMultiMaterialObject( chromatinGeometry, [
//				new THREE.MeshLambertMaterial({
//					color: 0xff0000,
//					vertexColors: THREE.FaceColors
//				}),
//				new THREE.MeshBasicMaterial({
//					color: 0x000000,
//					opacity: 0.3,
//					wireframe: true,
//					transparent: true
//				})]);
				
				chromatinGeometry.dynamic = true;
				chromatinGeometry.verticesNeedUpdate = true;

			    var tubeMesh = new THREE.Mesh(chromatinGeometry, new THREE.MeshLambertMaterial({
			        color: 0xffffff,
			        //shading: THREE.FlatShading,
			        //side: THREE.DoubleSide,
			        wireframe: false,
			        transparent: false,
			        vertexColors: THREE.FaceColors, // CHANGED
			        overdraw: true
			    }));

			    //for(var k=0;k< chromatinGeometry.faces.length;k++) {
			    	//if(k%12) chromatinGeometry.faces[k].color.setRGB(1,0,0);
			    	//else chromatinGeometry.faces[k].color.setRGB(0,0,0);
			    //	chromatinGeometry.faces[k].color.setRGB(1,0,0);
				//}
			    var newChromatinColor;
			    for (i = 0; i < colors.length; i++) {
					if(ColorConvert.testIfHex(colors[i]) || colors[i].indexOf('#')===0) {
						newChromatinColor =  new THREE.Color(colors[i]);	 
					} else {
						newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(colors[i]));
					} 
					for (j = 0; j < 16; j++) {
						tubeMesh.geometry.faces[i*16+j].color.set(newChromatinColor);
					}
				}
			 
			    
			    tubeMesh.dynamic = true;
			    tubeMesh.needsUpdate = true;
			    
				chromatinFiber.add( tubeMesh );
				//chromatinFiber.userData = {display:'tube'};

			} else {
				// Rings
					chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds

				for ( i = 0 ; i < pathSegments; i++) {
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
					chromatinGeometry.merge(segment);

					var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
					chromatinSegment.name = "segment-" + (i + 1);
					chromatinFiber.add(chromatinSegment);
				}	
			}
			
			

			// Visualize Controls
			// var controlsMaterial = new THREE.LineBasicMaterial({color: "#ff0000",opacity: 0.5});
			// var controlsOutline = new THREE.Line(controlsGeom, controlsMaterial);
			// chromatinFiber.add(controlsOutline);

			var cubicMaterial = new THREE.LineBasicMaterial({color: "#0000ff"});
			var chromatinCubic = new THREE.Line(cubicGeom, cubicMaterial);
			// chromatinFiber.add(chromatinCubic);

			// Visualize Controls Nodes
			// var particleMap = null; // render only point
			// particleMap = THREE.ImageUtils.loadTexture("assets/img/sphere-glossy.png");
			// var particlesMaterial = new THREE.PointCloudMaterial({
			// 	// color: "#0000ff",
   //  			vertexColors: THREE.VertexColors,
			// 	size: 10,
			// 	opacity: 1.0,
			// 	// map: particleMap,
			// 	// depthTest: true,
			// 	// alphaTest: true,
			// 	// transparent: true
			// });
			// var chromatinCloud = new THREE.PointCloud(controlsGeom, particlesMaterial);
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