 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin(Paths, PathControls, ColorConvert, Proximities) {
		return function(data, colors, view_settings, resolution_scale, settings) {
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
			view_settings = view_settings || {};
			angular.extend(this, angular.copy(defaults), view_settings);

			//var chromBreaks = [];
			var resolution = settings.segmentLength*settings.particleSegments;
			// ********************************************
			// * MODEL SCALE = 1unit : 1nanometer         *
			// * 1 micrometer (µm) = 1000 nanometers (nm) *
			// ********************************************
			// Eukaryotic animal cells diamter == 20 µm (10 - 30 µm) = 10000 units radius
			// var cellRadius = 10000;
			// Nucleus diameter == 6 µm (3 - 10 micrometers) = 3000 units radius
			// var nucelusRadius = 20;
			// Chromatin diameter == 10nm
			//var pathLength = cubicPath.getLength();
			var chromatinRadius = 5; // 10nm * 0.5
			// Chromatin density == 1080 BP : 11nm
			var chromatinLength = this.genomeLength * 11 / 1080;
			//this.radius = (pathLength * chromatinRadius) / chromatinLength;
			this.radius = resolution_scale*chromatinRadius;
			//console.log(this.radius);
			
			// Convert Data to Vector triplets
			var geometry = getGeometry(data);
			for (var g = geometry.vertices.length - 1; g >= 0; g--) {
				var geometryColor = new THREE.Color(colors[g*20]);
				geometry.colors.unshift(geometryColor);
			}
			geometry.computeBoundingSphere();
			geometry.center();

	//			var transparentMaterial = new THREE.MeshLambertMaterial({
	//			  transparent:true, 
	//			  opacity:0.0
	//			});
			var solidMaterial = new THREE.MeshLambertMaterial({
			    color: 0xffffff,
		        //shading: THREE.FlatShading,
		        //side: THREE.DoubleSide,
		        wireframe: false,
		        transparent: false,
		        vertexColors: THREE.FaceColors, // CHANGED
		        overdraw: true
		    });

			var chromatinFiber = new THREE.Object3D(); // unmerged network
			var i;
			var colori = 0;
			var chr_bins,pathControls,pathSegments,cubicPath,cubicGeom, chromatinGeometry, tubeMesh, newChromatinColor;
			var j;
			var offset = 0;
			var fpart = 0;
			var proximities = Proximities.get();
			settings.facesParticle = [];
			for (var l = 0 ; l < settings.chromosomeIndexes.length; l++) {
				chr_bins = Math.round((settings.chromEnd[l]-settings.chromStart[l])/resolution);
				//chromBreaks.push(offset);
			
				// Derive path controls from geometry vectors
				// var pathControls = getPathControls( geometry.vertices );
				var model_points = geometry.vertices.slice(offset,offset+chr_bins);
				pathControls = PathControls.cubic(model_points, this.pathClosed);
				//pathControls = PathControls.simple(geometry.vertices.slice(offset,offset+chr_bins));

				// Set number of Particles
				if (this.particles === 0) this.particles += geometry.vertices.length; //pathControls.vertices.length - 1;
				// Derive chromatin geometry path segments
				pathSegments = chr_bins * this.particleSegments; // same as segmentsCount...
				
				/*** TODO: Calculate PathSegments based on number of base pairs in the model ***/
				cubicPath = Paths.cubicBezier(pathControls.vertices, pathSegments, this.pathClosed);
				cubicGeom = new THREE.Geometry().setFromPoints( cubicPath.getPoints() );
				
				//cubicGeom.name = "cubicGeom";
	
				// Generate Chromatin model
				
				if(view_settings.tubed) {
					chromatinGeometry = new THREE.TubeGeometry(cubicPath, pathSegments, this.radius, 8, this.pathClosed);
					
				    tubeMesh = new THREE.Mesh(chromatinGeometry, solidMaterial);
					
				    //var faces = chromatinGeometry.vertices.length;
				    var faces = chromatinGeometry.faces.length;
					var segment_lengths = [];
					for (i = 0; i < model_points.length-1; i++) segment_lengths.push(distance(model_points[i+1],model_points[i]));
					var total_length = 0;
					for (i = 0; i < segment_lengths.length; i++) total_length += segment_lengths[i];
					var facesParticle = [];
					for (i = 0; i < chr_bins; i++) facesParticle.push([0,0]);
					for (i = chr_bins-1; i >= 0; i--) {
						// we add right part of curve if not  last particle
						if(i < chr_bins - 1 ) fpart = Math.round(((chromatinGeometry.faces.length)/16)*((segment_lengths[i]/2)/total_length));
						//if(i < chr_bins - 1 ) fpart = Math.round(((chromatinGeometry.vertices.length-8)/8)*((segment_lengths[i]/2)/total_length));
						// we add left part of curve if not first particle
						if(i > 0 ) fpart += Math.round(((chromatinGeometry.faces.length)/16)*((segment_lengths[i-1]/2)/total_length));
						//if(i > 0 ) fpart += Math.round(((chromatinGeometry.vertices.length-8)/8)*((segment_lengths[i-1]/2)/total_length)); 
						faces--;
						if(faces > 1) facesParticle[i][1]=faces;
						else facesParticle[i][1]=1;
						faces -= Math.ceil(fpart*16); // segments have 8 faces
						if(faces > 0) facesParticle[i][0]=faces;
						else facesParticle[i][0]=0;
						
					}
					settings.facesParticle.push(facesParticle);
					
					chromatinGeometry.dynamic = true;
					chromatinGeometry.verticesNeedUpdate = true;
					
					//chromatinGeometry.center();
					
				    //for(var k=0;k< chromatinGeometry.faces.length;k++) {
				    	//if(k%12) chromatinGeometry.faces[k].color.setRGB(1,0,0);
				    	//else chromatinGeometry.faces[k].color.setRGB(0,0,0);
				    //	chromatinGeometry.faces[k].color.setRGB(1,0,0);
					//}
					
					
				    /*for (i = 0; i < colors.length; i++) {
				    	//if(chromBreaks.indexOf(Math.floor(i/settings.particleSegments))>-1) {
				    	if(chromBreaks.indexOf(Math.floor(i/this.particleSegments))>-1) {
				    		for (j = 0; j < 16; j++) {
				    			if(typeof tubeMesh.geometry.faces[i*16+j] !== 'undefined') tubeMesh.geometry.faces[i*16+j].materialIndex = 1;
							}
				    	} else {
							if(ColorConvert.testIfHex(colors[i]) || colors[i].indexOf('#')===0) {
								newChromatinColor =  new THREE.Color(colors[i]);	 
							} else {
								newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(colors[i]));
							} 
							for (j = 0; j < 16; j++) {
								if(typeof tubeMesh.geometry.faces[i*16+j] !== 'undefined') tubeMesh.geometry.faces[i*16+j].color.set(newChromatinColor);
							}
				    	}
					}*/
					
					for (i = 0; i < chromatinGeometry.faces.length; i++) {
						if(ColorConvert.testIfHex(colors[Math.floor(colori/16)]) || colors[Math.floor(colori/16)].indexOf('#')===0) {
							newChromatinColor =  new THREE.Color(colors[Math.floor(colori/16)]);	 
						} else {
							newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(colors[Math.floor(i/16)]));
						} 
						for (j = 0; j < 16; j++) {
							if(typeof chromatinGeometry.faces[i+j] !== 'undefined') chromatinGeometry.faces[i+j].color.set(newChromatinColor);
						}
						colori++;
					}
					tubeMesh.geometry.__dirtyColors = true;
					tubeMesh.geometry.elementsNeedUpdate = true;
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
						THREE.GeometryUtils.center( chromatinGeometry );
	
						var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
						chromatinSegment.name = "segment-" + (i + 1);
						chromatinFiber.add(chromatinSegment);
					}	
				}
	
				chromatinGeometry.computeBoundingSphere();
				//chromatinGeometry.computeBoundingBox();
				offset += chr_bins;
			}
			
			//tubeMesh.position.x -= objectCenter.x;
			//tubeMesh.position.y -= objectCenter.y;
			//tubeMesh.position.z -= objectCenter.z;
			
			//chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
			chromatinFiber.boundingSphere = geometry.boundingSphere;
			chromatinFiber.name = "Chromatin Fiber";
			
			return chromatinFiber;
		};
	}

	function distance(p1,p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		var dz = p2.z - p1.z;
		var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
		return dist;
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