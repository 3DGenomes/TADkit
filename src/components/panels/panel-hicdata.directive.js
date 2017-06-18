(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelHicdata', tkComponentPanelHicdata);

	function tkComponentPanelHicdata(d3Service, $timeout, Overlays, uuid4, Networks) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'=',
				currentoverlay: '='
			},
			templateUrl: 'assets/templates/panel-hicdata.html',
			link:function(scope, element, attrs){
				
				//if(scope.data.n<=0) return; 
				if(angular.isUndefined(scope.data)) return;
				
				scope.rendered = false;
				scope.imageObject=new Image();
				scope.show_tads = (scope.data.tads.length !== 0);
				
				var scaleMultiplier = 0.8;
			    var startDragOffset = {};
			    var mouseDown = false;
			    var mouseMove = false;
				
			    var slidevalue = scope.slidevalue;
				var brush;
				var svg, hic_svg, handle, position, contact_marker, contact_marker_value;
				var polygon_tads = [];
				scope.highlighted_tad = -1;
				var canvas;
				
				// Last updated November 2011
				// By Simon Sarris
				// www.simonsarris.com
				// sarris@acm.org
				//
				// Free to use and distribute at will
				// So long as you are nice to people, etc

				function Transform() {
				  this.reset();
				}

				Transform.prototype.reset = function() {
				  this.m = [1,0,0,1,0,0];
				};

				Transform.prototype.multiply = function(matrix) {
				  var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
				  var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

				  var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
				  var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

				  var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
				  var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

				  this.m[0] = m11;
				  this.m[1] = m12;
				  this.m[2] = m21;
				  this.m[3] = m22;
				  this.m[4] = dx;
				  this.m[5] = dy;
				};

				Transform.prototype.invert = function() {
				  var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
				  var m0 = this.m[3] * d;
				  var m1 = -this.m[1] * d;
				  var m2 = -this.m[2] * d;
				  var m3 = this.m[0] * d;
				  var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
				  var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
				  this.m[0] = m0;
				  this.m[1] = m1;
				  this.m[2] = m2;
				  this.m[3] = m3;
				  this.m[4] = m4;
				  this.m[5] = m5;
				};

				Transform.prototype.rotate = function(rad) {
				  var c = Math.cos(rad);
				  var s = Math.sin(rad);
				  var m11 = this.m[0] * c + this.m[2] * s;
				  var m12 = this.m[1] * c + this.m[3] * s;
				  var m21 = this.m[0] * -s + this.m[2] * c;
				  var m22 = this.m[1] * -s + this.m[3] * c;
				  this.m[0] = m11;
				  this.m[1] = m12;
				  this.m[2] = m21;
				  this.m[3] = m22;
				};

				Transform.prototype.translate = function(x, y) {
				  this.m[4] += this.m[0] * x + this.m[2] * y;
				  this.m[5] += this.m[1] * x + this.m[3] * y;
				};

				Transform.prototype.scale = function(sx, sy) {
				  this.m[0] *= sx;
				  this.m[1] *= sx;
				  this.m[2] *= sy;
				  this.m[3] *= sy;
				};

				Transform.prototype.transformPoint = function(px, py) {
				  var x = px;
				  var y = py;
				  px = x * this.m[0] + y * this.m[2] + this.m[4];
				  py = x * this.m[1] + y * this.m[3] + this.m[5];
				  return [px, py];
				};
				// end of code for nice person
				
				var t = new Transform();
				var ti = new  Transform();
                
				scope.render = function(data_max, data_min) {
		            //canvas = document.getElementById("hic_canvas");
		            canvas = angular.element(document.querySelector('#hic_canvas'))[0];
		            if (canvas.getContext) {
		                console.log("Drawing hic matrix");
		                var ctx = canvas.getContext("2d");
		                ctx.imageSmoothingEnabled = false;
		                ctx.mozImageSmoothingEnabled = false;
		                ctx.imageSmoothingEnabled = false;
				  
		                //clear the canvas
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                
		                var val, x , y = 0;
		                var Logmin = 0;
		                var Logmax = 0;
		                if(scope.data.max !== 0) Logmax = Math.log(scope.data.max);
		                if(scope.data.min !== 0) Logmin = Math.log(scope.data.min);
		                var container_width = parseInt(scope.state.width);
		                var container_height = parseInt(scope.state.height);
		                for(var i=0;i<scope.data.value.length;i++) {
		                	x = Math.floor(scope.data.pos[i]%scope.data.n);
							y = Math.floor(scope.data.pos[i]/scope.data.n);
		                	if(x >= parseInt(canvas.width) && y >= parseInt(canvas.height)) {
		                		break; // avoid overflow
		                	}
		                	//if(x >= (container_width-scope.translatePos.x)/scope.scale && y >= (container_height-scope.translatePos.y)/scope.scale) break;
		                	if(x < parseInt(canvas.width) && y < parseInt(canvas.height)) {
		                		if(scope.data.value[i]!==0) {
		                			//if(scope.data.max<=1) val = Math.floor((Math.log(scope.data.value[i])/Math.log(scope.data.max))*5);
		                			//else 
		                			//val = Math.floor((Math.log(scope.data.value[i])/Math.log(scope.data.max))*255);
		                			if(scope.data.value[i] <= data_max && scope.data.value[i] >= data_min)
		                				val = Math.floor( ((Math.log(scope.data.value[i])-Logmin)/(Logmax-Logmin))*255 );
		                			else
		                				val = 0;
		                		} else {
		                			val = 0;
		                		}
		                		ctx.fillStyle = "rgba(255,0,0,"+val/255+")";
		                		ctx.fillRect( x, y, 1 , 1 );
		                	}
		                }
		                
		                //let browser resize it
		                //scope.scale = (container_width-2*parseInt(scope.state.margin))/(Math.sqrt(2)*scope.data.n); 
		                scope.imageObject.src=canvas.toDataURL();
		                
		                if(scope.rendered) return;
		                	
		                d3Service.d3().then(function(d3) {
		                	
		                	scope.safeApply = function(fn) {
								var phase = this.$root.$$phase;
								if(phase == '$apply' || phase == '$digest') {
									if(fn && (typeof(fn) === 'function')) { fn(); }
								} else {
								this.$apply(fn);
								}
							};
		                	brush = d3.svg.brush();

			                //tads svg
			                var hic_data_container = angular.element(document.querySelector('#hic_data_container'));
							if(!svg) {
								svg = d3.select(hic_data_container[0]).append('svg');
							}
							svg.selectAll('*').remove();
							hic_svg = svg.attr('width', container_width-2*parseInt(scope.state.margin))
									.attr('height', container_height-2*parseInt(scope.state.margin))
									.style("position", "absolute")
									.style("top", 2*parseInt(scope.state.margin)+'px')
									.style("left", (2*parseInt(scope.state.margin))+'px')
									.append("g")
									.attr("id", "tads_svg");
							
							handle = hic_svg.append("circle")
								.attr("id", "circ_mark")
								.style("fill", "#fff")
								.style("stroke", "#ccc")
								.style("stroke-widt", 2)
								.attr("cx", (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)))
								.attr("cy", container_height-2*parseInt(scope.state.margin))
								.attr("r", 4);

							position = hic_svg.append("text")
								.attr("id", "circ_position")
								.attr("x", (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2))-2)
								.attr("y", container_height-2*parseInt(scope.state.margin)-5)
								.style("text-anchor", "bottom")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.style("color", "#333")
								.text(scope.settings.current.particle);

							var stroke_width = 0;
							var resolution, start_tad, end_tad = 0;
							var polygon_tad, start_tad_scaled, end_tad_scaled, tad_height; 
							polygon_tads = [];
							var max_score_tad = 0;
							var min_score_tad = 99;
							for(i=0;i<scope.data.tads.length;i++) {
								if(scope.data.tads[i][3] > max_score_tad) max_score_tad = scope.data.tads[i][3];
								if(scope.data.tads[i][3] < min_score_tad) min_score_tad = scope.data.tads[i][3];
							}
							for(i=0;i<scope.data.tads.length;i++) {
			                	stroke_width = (scope.data.tads[i][3]-min_score_tad)/(max_score_tad-min_score_tad)+0.1;
								// assuming tads given in absolute position
			                	resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
								start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart)/resolution);
			                	end_tad = Math.round((scope.data.tads[i][2]-scope.settings.current.chromStart)/resolution);
			                 	start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)));
			                	polygon_tad = hic_svg.append("rect")
			                 		.attr("id",scope.data.tads[i][0])
			                 		.attr("start",(scope.data.tads[i][1]))
			                 		.attr("end",(scope.data.tads[i][2]))
			                 		.attr("score",(scope.data.tads[i][3]))
			                 		.style("fill", "white")
									.style("fill-opacity", 0)
									.style("stroke", "black")
									.style("stroke-width", stroke_width)
									.style("stroke-dasharray","3,3")
									.attr("class", "polygon_tad")
									.attr('width', end_tad-start_tad+1)
									.attr('height', end_tad-start_tad+1)
									.attr('display', 'block')
									.attr("x", 0)
								 	.attr("y", 0)
								 	.attr("transform", "translate(" + (start_tad_scaled) + ","+(container_height-2*parseInt(scope.state.margin))+") scale("+scope.scale+") rotate(-45 0 0)");
			                		
			                	polygon_tad.append("svg:title").text("Start:"+scope.data.tads[i][1]+",End:"+scope.data.tads[i][2]+",Score:"+scope.data.tads[i][3]);
			                	polygon_tads.push(polygon_tad);
			       
			                }
							
							//marker
							contact_marker = hic_svg.append("rect")
		                 		.attr("id","contact_marker")
		                 		.style("fill", "transparent")
								.style("stroke", "red")
								.style("stroke-width", 1)
								.attr('width', 1)
								.attr('height', 1)
								.attr('display', 'block')
								.attr("x", 0)
							 	.attr("y", 0);
							contact_marker_value = hic_svg.append("text")
								.attr("id", "contact_marker_value")
								.attr("x", 0)
								.attr("y", 0)
								.style("text-anchor", "bottom")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.style("color", "#333")
								.text("0");

			                svg.on("mousedown", function(){
						        mouseDown = true;
						        startDragOffset.x = d3.event.clientX - scope.translatePos.x;
						        //startDragOffset.y = d3.event.clientY- scope.translatePos.y;
						    });
						 
						    svg.on("mouseup", function(){
						    	if(!mouseMove) {
						    		var markers_position = [-1,-1];
						    		
						    		var mouseCoords = d3.mouse(this);   
						    		var transformCoords = ti.transformPoint(mouseCoords[0],mouseCoords[1]);
						            if(transformCoords[0]<0 || transformCoords[1]<0 || transformCoords[0]>scope.data.n || transformCoords[0]>scope.data.n) {
						            	contact_marker.attr('display', 'none');
						            	contact_marker_value.attr('display', 'none');
						            	scope.settings.current.markers_position = markers_position;
						            	scope.$apply(scope.settings.current.markers_position);
						            } else {
						            	contact_marker
						            		.attr("x", mouseCoords[0])
						            		.attr("y", mouseCoords[1])
						            		.attr('width', scope.data.n*scope.scale)
						            		.attr('height', scope.data.n*scope.scale)
						            		.attr("transform", "rotate(45 "+mouseCoords[0]+" "+mouseCoords[1]+")")
						            		.attr('display', 'block');
						            	
						            	var pos = Math.round(transformCoords[0])+ Math.round(transformCoords[1])*scope.data.n;
						            	var value_index = scope.data.pos.indexOf(pos);
						            	var value_text = 0;
						            	if(value_index >= 0) value_text = scope.data.value[value_index];
						            	contact_marker_value
						            		.attr("x", mouseCoords[0])
						            		.attr("y", mouseCoords[1]-10)
						            		.text(value_text)
						            		.attr('display', 'block');
						            	
						            	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
						            	markers_position = [transformCoords[0]*resolution+scope.settings.current.chromStart,transformCoords[1]*resolution+scope.settings.current.chromStart];
						            	scope.settings.current.markers_position = markers_position;
						            	scope.$apply(scope.settings.current.markers_position);
						            }
						            
						    	}
						    	mouseMove = false;
						        mouseDown = false;
						        
						    });
						 
						    svg.on("mouseover", function(){
						        mouseDown = false;
						    });
						 
						    svg.on("mouseout", function(){
						        mouseDown = false;
						    });
						 
						    svg.on("mousemove", function(){
						        if (mouseDown) {
						            scope.translatePos.x = d3.event.clientX - startDragOffset.x;
						            //scope.translatePos.y = d3.event.clientY - startDragOffset.y;
						            mouseMove = true;
						            
						            //scope.update();
						            var x_orig = parseFloat(handle.attr("cx"));
						            
						            //scope.update();
						            var part = (x_orig-parseInt(scope.state.offsetx)-scope.translatePos.x)/(scope.scale*Math.sqrt(2));
						            var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;	
						            if(part != scope.settings.current.particle && part <= scope.data.value.length && part > 0) {
							            scope.settings.current.hic_position += (part-scope.settings.current.particle)*resolution;
							            scope.$apply(scope.settings.current.hic_position);
							            //scope.update_marks();
						            }
						            
						            
					            	
						        }
						    });
							
						});

		                scope.rendered = true;
		                scope.imageObject.onload = function () {
		                	scope.update();
		                	scope.update_marks();
		                };
		            }
		        };
		        scope.$watch('state.width', function(newWidth, oldWidth) {
		        	if(newWidth !== oldWidth){
		        		scope.rendered = false;
		                scope.render(scope.data.max, scope.data.min);
		        	}
		        });
		        scope.$watch('settings.current.particle', function(newParticle, oldParticle) {
					if ( newParticle !== oldParticle) {
						if (typeof scope.settings.current.leftborder != 'undefined') {
							var rect = hic_data_container.getBoundingClientRect();
							scope.translatePos.x = scope.settings.current.leftborder-rect.left;
						}
						scope.update();
						scope.update_marks();
					}
				});
		        scope.$watch('settings.current.leftborder', function(newPos, oldPos) {
					if ( newPos !== oldPos && scope.data.n > 0) {
						var rect = hic_data_container.getBoundingClientRect();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left;
						scope.scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n); 
						scope.settings.current.hic_position = scope.settings.current.position;
						scope.update();
						scope.update_marks();
					}
				});
		        
		        scope.$watch('settings.slidevalue', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue && !angular.isUndefined(newvalue)) {
		        		var slide_value = newvalue.split(";");
		        		var datamin = parseFloat(slide_value[0]);
		        		var datamax = parseFloat(slide_value[1]);
		        		var b = Math.log(10000)/(scope.data.max-0.001);
		        		var a = 10/Math.exp(b*scope.data.max);
		        		if(datamin!==0) datamin=Math.log(datamin/a)/b;
		        		if(datamax!==0) datamax=Math.log(datamax/a)/b;
		        		scope.render(scope.data.max-datamax,scope.data.max-datamin);
		        	}
				});

		        // UPDATE
				scope.update = function() {
					
					
	                if(!scope.rendered)	scope.render(scope.data.max, scope.data.min);
					var canvas = document.getElementById("hic_canvas");
					var container_height = parseInt(scope.state.height);
		            if (canvas.getContext) {
		                var ctx = canvas.getContext("2d");
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                ctx.save();
		                //ctx.translate(scope.translatePos.x, container_height-10);
		                //ctx.rotate(-Math.PI/4);
		                //ctx.scale(scope.scale, scope.scale);
		                t.reset();
		                t.translate(scope.translatePos.x+parseInt(scope.state.offsetx), container_height);
		                t.rotate(-Math.PI/4);
		                t.scale(scope.scale, scope.scale);
		                ti.m  = t.m.slice();
		                ti.invert();
		                var m = t.m;
		                ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
		                ctx.drawImage(scope.imageObject,0,0);
            			ctx.restore();
		            }
				};

				scope.update_marks =  function() {
					var x = (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx);
					handle.attr("cx",x);
					position.attr("x",x).text(scope.settings.current.particle);
					
					contact_marker.attr('display', 'none');
	            	contact_marker_value.attr('display', 'none');
	            	
					var container_width = parseInt(scope.state.width);
	                var container_height = parseInt(scope.state.height);
					var resolution, start_tad, end_tad = 0;
					var start_tad_scaled, end_tad_scaled;
					if(scope.show_tads) {
						for(var i=0;i<polygon_tads.length;i++) {
							resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
							start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart)/resolution);
							start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx));
							
							polygon_tads[i]
								.attr("transform", "translate(" + (start_tad_scaled) + ","+(container_height-2*parseInt(scope.state.margin))+") scale("+scope.scale+") rotate(-45 0 0)");
							if(i != scope.highlighted_tad) polygon_tads[i].style("fill-opacity", 0.5);
							if(scope.settings.current.position>=parseInt(polygon_tads[i].attr("start")) && scope.settings.current.position<=parseInt(polygon_tads[i].attr("end"))){
								scope.highlighted_tad = i; 
							}	
						}
					}
				};
				
				scope.update_width =  function() {
					scope.settings.current.hic_position += 1;
				};

				scope.update_height =  function() {
					scope.rendered = false;
					scope.update();
					scope.update_marks();
				};
					
				scope.$watch('highlighted_tad', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue) {
		        		if(newvalue ==-1) {
		        			polygon_tads[oldvalue].style("fill-opacity", 0.5);
		        			return true;
		        		}
		        		polygon_tads[newvalue].style("fill-opacity", 0);
		        		var start_tad_segment, end_tad_segment, i;
		        		if(oldvalue>-1) {
			        		polygon_tads[oldvalue].style("fill-opacity", 0.5);
			        		start_tad_segment = Math.round((parseInt(polygon_tads[oldvalue].attr("start")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
			        		end_tad_segment = Math.ceil((parseInt(polygon_tads[oldvalue].attr("end")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
		        		}
		        		start_tad_segment = Math.round((parseInt(polygon_tads[newvalue].attr("start")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
		        		end_tad_segment = Math.ceil((parseInt(polygon_tads[newvalue].attr("end")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
		        		scope.settings.current.tad_selected = newvalue;
		        	}
				});
				scope.translatePos = {
					x: 0,
				    y: 0
				};
			 
			    scope.scale = 1.0;
	
			    scope.increasezoom = function() {
			    	scope.scale /= scaleMultiplier;
			        scope.update();
			        scope.update_marks();
			    };
			 
			    scope.reducezoom = function() {
			    	scope.scale *= scaleMultiplier;
			        scope.update();
			        scope.update_marks();
			    };
			    
			    scope.toggle = function(newValue){
			        scope.show_tads = newValue;
			        for(var i=0;i<polygon_tads.length;i++) {							
						if(scope.show_tads) {
							polygon_tads[i].attr('display', 'block');
						} else {
							polygon_tads[i].attr('display', 'none');
							scope.highlighted_tad = -1; 
							scope.settings.current.tad_selected = -1;
							//scope.settings.current.end_tad_selected = -1;
						}
			        }
			        scope.update_marks();
			    };
			    scope.update_data = function(data){
			    	scope.data = data;
			    	scope.scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n);
			    	if (typeof scope.settings.current.leftborder != 'undefined') {
						var rect = hic_data_container.getBoundingClientRect();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left;
					}
			    	scope.rendered = false;
	                scope.render(data.max, data.min);
	                scope.update();
	                scope.update_marks();
			    }; 
			    
			    /*// Better tubed by default. Maybe add button to toggle red
			    var originalOverlay = Overlays.getCurrentIndex();
				var overlays = Overlays.get();
				var hicDataOverlay =
				{
					"metadata": {
						"version" : 1.0,
						"type" : "overlay",
						"generator" : "TADkit"
					},
					"object" : {
						"uuid" : uuid4.generate(),
						"id" : overlays.loaded.length,
						"title" : "HiC Data Overlay",
						"source" : "HiC panel",
						"url" : "local",
						"description" : "HiC Data overlay", 
						"type" : "HiC",
						"format" : "variable",
						"components" : 1,
						"name" : "HiC Data Overlay",
						"state" : {
							"index" : 0, // make real index???
							"overlaid" : false
						}
					},
					"palette" : [],
					"data" : [],
					"colors" : {
						"particles" : [],
						"chromatin" : [],
						"network" : {
							"RGB" : [],
							"alpha" : []
						}
					}
				};
				for(var i=0;i<scope.settings.current.segmentsCount;i++) {
					hicDataOverlay.colors.chromatin[i] = "red";
				}
				
				var newOverlay = Overlays.addDirect(hicDataOverlay);
				var overlay = overlays.loaded[newOverlay];
					
				overlay.colors.particles = [];
				overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, scope.settings.current.edgesCount);
				overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, scope.settings.current.edgesCount);
				
				scope.toggleOverlay = function(index) {
					scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
					if (!scope.overlaid) {
						Overlays.setOverlaid(index);
						Overlays.set(index);
						scope.currentoverlay = Overlays.getOverlay();
					} else {
						Overlays.setOverlaid(originalOverlay);
						Overlays.set(originalOverlay);
						scope.currentoverlay = Overlays.getOverlay();
					}
					
				};*/
			    
			    
			    $timeout(function () {
			    	scope.update();
			    	//if(scope.show_tads) scope.toggleOverlay(newOverlay);
                });
			}
		};
	}
})();