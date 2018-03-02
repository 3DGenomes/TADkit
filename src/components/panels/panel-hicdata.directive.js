(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelHicdata', tkComponentPanelHicdata);

	function tkComponentPanelHicdata(d3Service, $timeout, Overlays, ColorConvert, uuid4, Networks, Hic_data) {
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
				scope.on_diff_hic = false;
				scope.on_filter = false;
				scope.mini_scale = 1;
				scope.rect = {
					w: 0,
					h: 0,
					x: 0,
					y: 0
				};
				
				var scaleMultiplier = 0.8;
			    var startDragOffset = {};
			    var mouseDown = false;
			    var mouseMove = false;
			    var mini_startDragOffset = {};
			    var mini_mouseDown = false;
			    var mini_mouseMove = false;
			    var mini_translatePos = {
					x: 0,
					y: 0
				};
			    scope.settings.current.igv_position = {
					start0: 0,
					start1: 0,
					end2: 0,
					y: 0,
					flag: 1
				};
			    var originalOverlayIndex = Overlays.getCurrentIndex();
			    var currentOverlay = {
		    		color: []
			    };
			    
			    var slidevalue = scope.slidevalue;
				var brush;
				var mini_svg, svg, hic_svg, handle, position, contact_marker, 
					contact_marker_value, mini_frame, mini_hic, mini_sel;
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
		            if(scope.data.n === 0) return;
		            canvas = angular.element(document.querySelector('#hic_canvas'))[0];
		            if (canvas.getContext) {
		                console.log("Drawing hic matrix");
		                var ctx = canvas.getContext("2d");
		                //ctx.imageSmoothingEnabled = false;
		                //ctx.mozImageSmoothingEnabled = false;
		                ctx.imageSmoothingEnabled = false;
				  
		                //clear the canvas
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                
		                var val, x , y = 0;
		                var Logmin = 0;
		                var Logmax = 0;
		                if(scope.data.max > 0 && scope.data.min > 0) {
		                	Logmax = Math.log(Math.abs(scope.data.max));
		                	Logmin = Math.log(Math.abs(scope.data.min));
		                } else if(scope.data.max < 0 && scope.data.min < 0) {
		                	Logmax = Math.log(Math.abs(scope.data.min));
		                	Logmin = Math.log(Math.abs(scope.data.max));
		                } else if(Math.abs(scope.data.max) < Math.abs(scope.data.min)) {
		                	Logmax = Math.log(Math.abs(scope.data.min));
		                } else {
		                	Logmax = Math.log(Math.abs(scope.data.max));
		                }
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
		                				val = Math.floor( ((Math.log(Math.abs(scope.data.value[i]))-Logmin)/(Logmax-Logmin))*255 );
		                			else
		                				val = 0;
		                		} else {
		                			val = 0;
		                		}
		                		if(val>=0) {
		                			if(currentOverlay.color.length>0) {
		                				ctx.fillStyle = "rgba("+Math.round(255*currentOverlay.color[i].r)+","+Math.round(255*currentOverlay.color[i].g)+","+Math.round(255*currentOverlay.color[i].b)+","+val/255+")";
		                			} else {
			                			if(scope.data.value[i]>=0) ctx.fillStyle = "rgba(255,0,0,"+val/255+")";
			                			else ctx.fillStyle = "rgba(0,0,255,"+val/255+")";
		                			}
		                		}
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
								.attr("cx", ((scope.settings.current.particle-0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)))
								.attr("cy", container_height-2*parseInt(scope.state.margin))
								.attr("r", 4);

							position = hic_svg.append("text")
								.attr("id", "circ_position")
								.attr("x", ((scope.settings.current.particle-0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2))-2)
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
								start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                	end_tad = Math.round((scope.data.tads[i][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
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
							
							//mini hic
							var mini_width = (container_width-2*parseInt(scope.state.margin))/5;
							var mini_height = (container_height-2*parseInt(scope.state.margin))/5;
							if(!mini_svg) {
								mini_svg = d3.select(hic_data_container[0]).append('svg');
							}
							mini_svg.selectAll('*').remove();
							mini_frame = mini_svg
									.attr('width', mini_width)
									.attr('height', mini_height)
									.style("position", "absolute")
									.style("top", '20px')
									.style("left", '20px')
									.style("border", '1px solid black')
									.append("g")
									.attr("id", "mini_svg");
							
		                	mini_hic = mini_frame.append("rect")
						    	.style("fill", "rgba(0, 0, 255, 0.3)")
								.style("stroke", "rgba(0, 0, 255, 0.3)")
								.attr('width', (mini_width-2*58/5)/Math.sqrt(2))
								.attr('height', (mini_width-2*58/5)/Math.sqrt(2))
								.attr('display', 'block')
								.attr("x", 0)
								.attr("y", 0)
								.attr("transform", "translate("+(58/5)+"," + mini_height + ") rotate(-45 0 0)");
						    
		                	scope.mini_scale = (mini_width-2*58/5)/scope.data.n;
		                	
						    mini_sel = mini_frame.append("rect")
								.attr('width', mini_width)
								.attr('height', mini_height)
								.style("fill", "rgba(0, 0, 255, 0.3)")
								.style("stroke", "blue")
								.attr('display', 'block')
								.attr("class","draggable")
								.attr("x", 0)
								.attr("y", 0)
								.attr("posx", 0)
								.attr("posy", 0);   
							
			                svg.on("mousedown", function(){
						        mouseDown = true;
						        startDragOffset.x = d3.event.clientX - scope.translatePos.x;
						        //startDragOffset.y = d3.event.clientY- scope.translatePos.y;
						    });
			                
						    svg.on("mouseup", function(){
						    	if(!mouseMove) {
						    		var markers_position = [-1,-1];
						    		
						    		var mouseCoords = d3.mouse(this);   
						    		var otransformCoords = ti.transformPoint(mouseCoords[0],mouseCoords[1]);
						    		var transformCoords = otransformCoords; 
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
						            	
						            	var pos = Math.floor(transformCoords[0])+ Math.floor(transformCoords[1])*scope.data.n;
						            	var value_index = scope.data.pos.indexOf(pos);
						            	var value_text = 0;
						            	if(value_index >= 0) value_text = scope.data.value[value_index];
						            	Hic_data.setInteractionFreq(value_text);
						            	contact_marker_value
						            		.attr("x", mouseCoords[0])
						            		.attr("y", mouseCoords[1]-10)
						            		.text(value_text)
						            		.attr('display', 'block');
						            	
						            	if(scope.settings.current.chromosomeIndexes.length<=2) {
						            		markers_position = scope.transformCoords(transformCoords);
							            	scope.settings.current.markers_position = markers_position;
							            	scope.$apply(scope.settings.current.markers_position);
							            }
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
						    
						    
						    mini_sel.on("mousedown", function(){
						    	
						        mini_mouseDown = true;
						        mini_startDragOffset.x = d3.event.clientX;
						        mini_startDragOffset.y = d3.event.clientY;
						    });
						 
						    mini_sel.on("mouseup", function(){
						    	scope.mini_mouse_up();
						    });
						    
						    scope.mini_mouse_up = function(){
						    	if(mini_mouseMove) {
						    		mini_translatePos.x = d3.event.clientX - mini_startDragOffset.x;
						            mini_translatePos.y = d3.event.clientY - mini_startDragOffset.y;
						            
						            var posx = parseInt(mini_sel.attr("posx"))+mini_translatePos.x;
						            var posy = parseInt(mini_sel.attr("posy"))+mini_translatePos.y;
						            
						            scope.getRangefromRect(posx,posy,parseInt(mini_sel.attr("posx")));
						            
						            mini_sel.attr("posx",posx);
						            scope.settings.current.igv_position.flag = !scope.settings.current.igv_position.flag;
						            scope.$apply(scope.settings.current.igv_position);
						            scope.update();
									scope.update_marks();						    		
						    	}
						    	mini_mouseMove = false;
						        mini_mouseDown = false;
						    };
		                
						    mini_sel.on("mouseover", function(){
						        mini_mouseDown = false;
						    });
						 
						    mini_sel.on("mouseout", function(){
						        scope.mini_mouse_up();
						    });
						    
						    mini_sel.on("mousemove", function(){
						    	if(mini_mouseDown) {
						    		mini_translatePos.x = d3.event.clientX - mini_startDragOffset.x;
						            mini_translatePos.y = d3.event.clientY - mini_startDragOffset.y;
						            mini_mouseMove = true;
						            
						            var posx = parseInt(mini_sel.attr("posx"))+mini_translatePos.x;
						            var posy = parseInt(mini_sel.attr("posy"))+mini_translatePos.y;
					            	
						            var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
				            		
						            if(posy < mini_height-parseInt(mini_sel.attr("height"))) {
						            	mini_sel.attr("transform", "translate(" + (posx) + "," + (posy) + ")");
						            } else {
						            	mini_sel.attr("transform", "translate(" + (posx) + "," + (mini_height-parseInt(mini_sel.attr("height"))) + ")");
					            	}
						            /*var mini_x, mid_point;
					            	if (typeof scope.settings.current.leftborder != 'undefined') {
					            		mini_x = scope.settings.current.leftborder/5 + mini_translatePos.x;
					            		mid_point = ((parseInt(scope.state.width)-2*parseInt(scope.state.margin))/10);
					            		if(mini_x < mid_point && mini_x > -mid_point) {
						            		mini_hic.attr("transform", "translate(" + (mini_x) + "," + parseInt(scope.state.height)/5 + ") scale("+scope.scale/5+") rotate(-45 0 0)");
						            		mini_hic.attr("posx",mini_x);
						            		mini_hic.attr("posy",parseInt(scope.state.height)/5);
						            		
						            		scope.settings.current.igv_position = mini_translatePos.x*5;
									        scope.$apply(scope.settings.current.igv_position);
					            		}
					            	}*/
						    		
						    	}
						    });
						    
						    /*svg.on("mousemove", function(){
						        if (mouseDown) {
						            scope.translatePos.x = d3.event.clientX - startDragOffset.x;
						            //scope.translatePos.y = d3.event.clientY - startDragOffset.y;
						            mouseMove = true;
						            
						            //scope.update();
						            var x_orig = parseFloat(handle.attr("cx"));
						            
						            //scope.update();
						            var part = (x_orig-parseInt(scope.state.offsetx)-scope.translatePos.x)/(scope.scale*Math.sqrt(2));
						            var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
						            var pos = scope.settings.current.hic_position + (part-scope.settings.current.particle)*resolution;
						            if(pos >= scope.settings.current.chromStart[scope.settings.current.chromIdx] && pos <= scope.settings.current.chromEnd[scope.settings.current.chromIdx]) {
							            scope.settings.current.hic_position = pos;
							            scope.$apply(scope.settings.current.hic_position);
							            //scope.update_marks();
						            }
						            
						            
					            	
						        }
						    });*/
							
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
//		        scope.$watch('settings.current.particle', function(newParticle, oldParticle) {
//					if ( newParticle !== oldParticle) {
//						if (typeof scope.settings.current.leftborder != 'undefined') {
//							var rect = hic_data_container.getBoundingClientRect();
//							scope.translatePos.x = scope.settings.current.leftborder-rect.left;
//						}
//						scope.update();
//						scope.update_marks(); 
//					}
//				});
		        
		        scope.getRectfromRange = function(container, dest_y, dest_margin){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
					//var offsety = scope.getHeightfromPos();
					
					scope.rect.w = (container.width/(scope.scale*Math.sqrt(2)))*scope.mini_scale;
					scope.rect.h = (container.height/(scope.scale*Math.sqrt(2)))*scope.mini_scale;
	                if(scope.settings.current.igv_position.y == 0) {
	                	scope.rect.y = mini_height - (scope.rect.h);
	                } else if (parseInt(scope.rect.h) != parseInt(mini_sel.attr("height"))){
	                	scope.rect.y = dest_y + parseInt(mini_sel.attr("height")) - scope.rect.h;
	                } else {
	                	scope.rect.y = dest_y;
	                }
	                
	                var offsety = 0;
	                if(scope.settings.current.igv_position.y>0) {
	                	offsety = (scope.settings.current.igv_position.y-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution;
	                	offsety = (offsety)*scope.mini_scale/2;
	                	
	                	scope.rect.x = parseInt(mini_sel.attr("posx"))+parseInt(mini_sel.attr("width"))/2-parseInt(scope.rect.w)/2;
	                	//scope.rect.x = -((scope.settings.current.leftborder+32)/(scope.scale*Math.sqrt(2)))*scope.mini_scale+dest_margin+offsety;
	                } else {
	                	scope.rect.x = -((scope.settings.current.leftborder+32)/(scope.scale*Math.sqrt(2)))*scope.mini_scale+dest_margin+offsety;
						
	                }
					return;
	                
		        };
		        
		        scope.getRangefromRect = function(posx,posy,posx0){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
					var posgy, posgx, posgx2;
					var start, end;
	            	if(posy < mini_height-scope.rect.h-5 && scope.settings.current.chromosomeIndexes.length < 2) {
	            		posgy = ((mini_height-(posy+scope.rect.h))*2)/(scope.mini_scale);
		            	scope.settings.current.igv_position.y = posgy*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
		            	start = posx-58/5-(mini_height-(posy+scope.rect.h));
		            	scope.settings.current.igv_position.start1 = (start/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	end = (posx-58/5+scope.rect.w)+(mini_height-(posy+scope.rect.h));
		            	scope.settings.current.igv_position.end2 = (end/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
		            	mini_sel.attr("posy",posy);
		            } else {
		            	scope.settings.current.igv_position.y = 0;
		            	mini_sel.attr("posy",mini_height-scope.rect.h);
		            	scope.settings.current.igv_position.start1 = ((posx-58/5)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
	            	}
	            	scope.settings.current.igv_position.start0 = ((posx0-58/5+2)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
	            	//posgx = ((posx-58/5)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            //scope.settings.current.igv_position.x = posgx;
		            //posgx2 = ((posx-58/5+scope.rect.w)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            //scope.settings.current.igv_position.x2 = posgx2;
		            return;
	                
		        };
		        
		        scope.getHeightfromPos = function(){
		        	var posy = 0;
	                var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					if(scope.settings.current.igv_position.y>0) {
	                	posy = (scope.settings.current.igv_position.y-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution;
	                }
					return posy*scope.scale/Math.sqrt(2);
	                
		        };
		        
		        scope.$watch('settings.current.leftborder', function(newPos, oldPos) {
					if ( newPos !== oldPos && scope.data.n > 0) {
						var rect = hic_data_container.getBoundingClientRect();
						
						var offsety = scope.getHeightfromPos();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left-offsety;
						
						var scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n);
						if(Math.abs(scope.scale-scale)>0.1) {
							scope.scale = scale;
						}
						//scope.settings.current.hic_position = scope.settings.current.position;
						scope.update();
						scope.update_marks();
					}
				});
		        
		        scope.$watch('settings.slidevalue', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue && !angular.isUndefined(newvalue)) {
		        		if(scope.on_filter) {
			        		var slide_value = newvalue.split(";");
			        		var datamin = parseFloat(slide_value[0]);
			        		var datamax = parseFloat(slide_value[1]);
			        		var b = Math.log(10000)/(scope.data.max-0.001);
			        		var a = 10/Math.exp(b*scope.data.max);
			        		if(datamin!==0) datamin=Math.log(datamin/a)/b;
			        		if(datamax!==0) datamax=Math.log(datamax/a)/b;
			        		scope.render(scope.data.max-datamax,scope.data.max-datamin);
		        		} else if(scope.on_diff_hic) {
		        			scope.refreshDiff();
		        			scope.render(scope.data.max,scope.data.min);
		        		}
		        		
		        	}
				});
		        scope.$watch('settings.current.chromosomeIndexes', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue && !angular.isUndefined(newvalue)) {
		        		scope.data = Hic_data.get();
		        		polygon_tads = [];
		        		scope.update_data(scope.data);
		        	}
		        });	
		        
		        scope.transformCoords = function(transformCoords){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
	            	var x_mark, y_mark;
	            	scope.settings.current.markers_chr = [scope.settings.current.chromosomeIndexes[0],scope.settings.current.chromosomeIndexes[0]];
	            	var chr_bins = 0;
	            	var i = 0;
	            	while(chr_bins<transformCoords[0]) {
	            		x_mark = (transformCoords[0]-chr_bins)*resolution+(scope.settings.current.chromStart[i]);
	            		chr_bins += Math.round(scope.settings.current.chromEnd[i]/resolution)-Math.round(scope.settings.current.chromStart[i]/resolution); 
	            		i++;
	            	}
	            	scope.settings.current.markers_chr[0] = scope.settings.current.chromosomeIndexes[i-1];
	            	chr_bins = 0;
	    			i = 0;
	            	while(chr_bins<transformCoords[1]) {
	            		y_mark = (transformCoords[1]-chr_bins)*resolution+(scope.settings.current.chromStart[i]);
	            		chr_bins += Math.round(scope.settings.current.chromEnd[i]/resolution)-Math.round(scope.settings.current.chromStart[i]/resolution); 
	            		i++;
	            	}
	            	scope.settings.current.markers_chr[1] = scope.settings.current.chromosomeIndexes[i-1];
	            	
	            	return [x_mark,y_mark];
                };
                
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
		                var offsety = scope.getHeightfromPos();
		            	t.translate(scope.translatePos.x+parseInt(scope.state.offsetx), container_height+offsety);
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
					if (typeof handle == 'undefined') return;
					var x = (((scope.settings.current.particle-1)+0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx);
					handle.attr("cx",x);
					position.attr("x",x).text(scope.settings.current.particle);
					
					contact_marker.attr('display', 'none');
	            	contact_marker_value.attr('display', 'none');
	            	
	            	
	            	var rect = hic_data_container.getBoundingClientRect();
	            	
	            	scope.getRectfromRange(rect, parseInt(mini_sel.attr("posy")), 58/5);
	            	
	            	if (typeof scope.settings.current.leftborder != 'undefined') {
	            		mini_sel.attr("width", scope.rect.w);
	            		mini_sel.attr("height", scope.rect.h);
	            		mini_sel.attr("posy", scope.rect.y);
	            		mini_sel.attr("transform", "translate(" + (scope.rect.x) + "," + (scope.rect.y) + ")");
	            		mini_sel.attr("posx", scope.rect.x);
	            		
	            	}
				        
	            	var offsety = scope.getHeightfromPos();
					var container_width = parseInt(scope.state.width);
	                var container_height = parseInt(scope.state.height);
	                handle.attr("cy",container_height-2*parseInt(scope.state.margin)+offsety);
	                position.attr("y",container_height-2*parseInt(scope.state.margin)+offsety);
					var resolution, start_tad, end_tad = 0;
					var start_tad_scaled, end_tad_scaled;
					if(scope.show_tads) {
						for(var i=0;i<polygon_tads.length;i++) {
							resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
							start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
							start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx));
							
							polygon_tads[i]
								.attr("transform", "translate(" + (start_tad_scaled) + ","+(container_height-2*parseInt(scope.state.margin)+offsety)+") rotate(-45 0 0) scale("+scope.scale+")");
							if(i != scope.highlighted_tad) polygon_tads[i].style("fill-opacity", 0.5);
							if(scope.settings.current.position>=parseInt(polygon_tads[i].attr("start")) && scope.settings.current.position<=parseInt(polygon_tads[i].attr("end"))){
								scope.highlighted_tad = i; 
							}	
						}
					}
				};
				
//				scope.update_width =  function() {
//					scope.settings.current.hic_position += 1;
//				};

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
			        		start_tad_segment = Math.round((parseInt(polygon_tads[oldvalue].attr("start")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
			        		end_tad_segment = Math.ceil((parseInt(polygon_tads[oldvalue].attr("end")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
		        		}
		        		start_tad_segment = Math.round((parseInt(polygon_tads[newvalue].attr("start")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
		        		end_tad_segment = Math.ceil((parseInt(polygon_tads[newvalue].attr("end")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
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
			    scope.settings.current.selDataset1 = 0;
				scope.settings.current.selDataset2 = 1;
				scope.diffslidevalue = 0;
			    scope.togglediff = function(newValue){
					scope.on_diff_hic = newValue;
					if(scope.on_diff_hic && scope.on_filter) {
						scope.on_filter = false;
					}
			    };
			    scope.togglefilter = function(item){
			    	if(item == 'filter') {
			    		scope.on_filter = !scope.on_filter;
			    		if(scope.on_filter) {
			    			if(scope.on_diff_hic) {
			    				scope.on_diff_hic = false;
			    				scope.diffslidevalue = scope.settings.slidevalue;
			    			}
			    			scope.settings.slidevalue = scope.slidevalue; 
			    		}
			    	}
			    	else if(item == 'diff_hic') {
			    		scope.on_diff_hic = !scope.on_diff_hic;
			    		if(scope.on_diff_hic) {
			    			if(scope.on_filter) {
			    				scope.on_filter = false;
			    				scope.slidevalue = scope.settings.slidevalue;
			    			}
			    			scope.settings.slidevalue = scope.diffslidevalue; 
			    			scope.refreshDiff();
			    		} else {
			    			scope.data = Hic_data.get();
			        		polygon_tads = [];
			        		scope.update_data(scope.data);
			    		}
			    	}
				
			    };
			    scope.refreshDiff = function() {
			    	var val = parseFloat(scope.settings.slidevalue);
			    
			    	var chromStart = [];
					var chromEnd = [];
	            	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
					var chromIdx;
					var offset = 0;
					for (var l = 0 ; l < scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].object.chrom.length; l++) {
						chromIdx = scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].object.chrom[l]);
						if(chromIdx > -1) {
							chromStart.push(Math.round((scope.settings.current.chromStart[l]-scope.settings.current.chromStart[0])/resolution)+offset);
							chromEnd.push(Math.round((scope.settings.current.chromEnd[l]-scope.settings.current.chromStart[0])/resolution)+offset);
						}
						offset += Math.round(scope.settings.current.chromEnd[l]/resolution)-Math.round(scope.settings.current.chromStart[l]/resolution);
					}
			    	
			    	//new_value[i] = (1-val)*scope.settings.current.datasets.loaded[scope.selDataset1].hic_data.data[pos]-val*scope.settings.current.datasets.loaded[scope.selDataset2].hic_data.data[pos];
			    	var new_data = Hic_data.getDiff(scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].hic_data,
			    								scope.settings.current.datasets.loaded[scope.settings.current.selDataset2].hic_data,
			    								val,
			    								chromStart,
			    								chromEnd);
			    	scope.data = new_data;
			    };
			    scope.update_data = function(data){
			    	scope.data = data;
			    	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					//var first_n = Math.round((scope.settings.current.chromEnd[0]-scope.settings.current.chromStart[0])/resolution)+1;
					scope.scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n);
			    	if (typeof scope.settings.current.leftborder != 'undefined') {
			    		var offsety = Math.sqrt(2)*scope.getHeightfromPos();
						var rect = hic_data_container.getBoundingClientRect();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left-offsety;
					}
			    	scope.rendered = false;
	                scope.render(data.max, data.min);
	                scope.update();
	                scope.update_marks();
			    }; 
			    scope.exportCanvasAsPNG = function(fileName) {
			    	
			    	var MIME_TYPE = "image/png";
			        var dlLink = document.createElement('a');
			        dlLink.download = fileName;
			        dlLink.href = scope.imageObject.src;
			        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

			        document.body.appendChild(dlLink);
			        dlLink.click();
			        document.body.removeChild(dlLink);
			    };
			    scope.$watch('currentoverlay.colors.chromatin', function( newColors, oldColors ) {
					if ( newColors !== oldColors) {
						currentOverlay = {
					    		color: []
							};
						var currentOverlayIndex = Overlays.getCurrentIndex();
						if(currentOverlayIndex != originalOverlayIndex) {
							var col = { r:0, g:0, b:0};
							var coln = { r:0, g:0, b:0};
							var colori, colorj, i, x, y, k, luma, newChromatinColor, newChromatinColori, newChromatinColorj;
							for(i = 0;i < scope.data.value.length;i++) {
			                	x = Math.floor(scope.data.pos[i]%scope.data.n);
								y = Math.floor(scope.data.pos[i]/scope.data.n);
								colori = x * scope.settings.current.particleSegments;
								colorj = y * scope.settings.current.particleSegments;
								col = { r:1, g:1, b:1};
								newChromatinColor =  new THREE.Color();
								for (k = 0; k < scope.settings.current.particleSegments; k++) {
									coln = { r:1, g:1, b:1};
									if(newColors[colori+k] == 'gray' || newColors[colorj+k] == 'gray') {
										newChromatinColori =  new THREE.Color('white');
										newChromatinColorj =  new THREE.Color('white');
									} else {
										if(ColorConvert.testIfHex(newColors[colori+k]) || newColors[colori+k].indexOf('#')===0) {
											newChromatinColori =  new THREE.Color(newColors[colori+k]);	 
										} else {
											newChromatinColori =  new THREE.Color(ColorConvert.nameToHex(newColors[colori+k]));
										}
										if(ColorConvert.testIfHex(newColors[colorj+k]) || newColors[colorj+k].indexOf('#')===0) {
											newChromatinColorj =  new THREE.Color(newColors[colorj+k]);
										} else {
											newChromatinColorj =  new THREE.Color(ColorConvert.nameToHex(newColors[colorj+k]));
										}
									}
									
									coln.r = (newChromatinColori.r + newChromatinColorj.r)/2; 
									coln.g = (newChromatinColori.g + newChromatinColorj.g)/2;
									coln.b = (newChromatinColori.b + newChromatinColorj.b)/2;
									luma = 0.2126 * coln.r + 0.7152 * coln.g + 0.0722 * coln.b; // per ITU-R BT.709
									if(luma < 0.2126 * col.r + 0.7152 * col.g + 0.0722 * col.b) {
										col.r = coln.r;
										col.g = coln.g;
										col.b = coln.b;
									}
									
								}
									
								//newChromatinColor =  new THREE.Color(col.r/scope.settings.current.particleSegments,col.g/scope.settings.current.particleSegments,col.b/scope.settings.current.particleSegments);
								newChromatinColor =  new THREE.Color(col.r,col.g,col.b);
								currentOverlay.color.push(newChromatinColor);
								
							}
							
						}
						
						scope.render(scope.data.max,scope.data.min);
						
					}
				});
			    
			    
			    
			    $timeout(function () {
			    	scope.update();
			    	//if(scope.show_tads) scope.toggleOverlay(newOverlay);
                });
			}
		};
	}
})();