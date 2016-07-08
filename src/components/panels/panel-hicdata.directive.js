(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelHicdata', tkComponentPanelHicdata);

	function tkComponentPanelHicdata(d3Service,$timeout) {
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
				var data = scope.data;
				scope.rendered = false;
				scope.imageObject=new Image();
				//scope.restore_image = null;
				//scope.restore_data = null;
				//scope.restore_position = 0;
				var slidevalue = scope.slidevalue;
				var brush;
				var hic_svg, handle, position;
				var polygon_tads = [];
				scope.highlighted_tad = -1;
				var canvas;
				var original_colors = [];
				
				scope.render = function(data_max, data_min) {
		            //canvas = document.getElementById("hic_canvas");
		            canvas = angular.element(document.querySelector('#hic_canvas'))[0];
		            if (canvas.getContext) {
		                console.log("Drawing hic matrix");
		                var ctx = canvas.getContext("2d");
		                ctx.imageSmoothingEnabled = false;
		                ctx.mozImageSmoothingEnabled = false;
		                ctx.webkitImageSmoothingEnabled = false;
		                
		                //clear the canvas
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                
		                var val, x , y = 0;
		                var Logmin, Logmax = 0;
		                if(data.max !== 0) Logmax = Math.log(data.max);
		                if(data.min !== 0) Logmin = Math.log(data.min);
		                //var container_width = parseInt(scope.state.width);
		                //var container_height = parseInt(scope.state.height);
		                for(var i=0;i<data.value.length;i++) {
		                	x = Math.floor(data.pos[i]%data.n);
							y = Math.floor(data.pos[i]/data.n);
		                	if(x >= parseInt(canvas.width) && y >= parseInt(canvas.height)) {
		                		break; // avoid overflow
		                	}
		                	//if(x >= (container_width-scope.translatePos.x)/scope.scale && y >= (container_height-scope.translatePos.y)/scope.scale) break;
		                	if(x < parseInt(canvas.width) && y < parseInt(canvas.height)) {
		                		if(data.value[i]!==0) {
		                			//if(data.max<=1) val = Math.floor((Math.log(data.value[i])/Math.log(data.max))*5);
		                			//else 
		                			//val = Math.floor((Math.log(data.value[i])/Math.log(data.max))*255);
		                			if(data.value[i] <= data_max && data.value[i] >= data_min)
		                				val = Math.floor( ((Math.log(data.value[i])-Logmin)/(Logmax-Logmin))*255 );
		                			else
		                				val = 0;
		                		} else {
		                			val = 0;
		                		}
		                		ctx.fillStyle = "rgba(0,0,255,"+val/255+")";
		                		ctx.fillRect( x, y, 1 , 1 );
		                	}
		                }
		                
		                //scope.restore_image = ctx.getImageData(0, 0, canvas.width, canvas.height);
		                scope.scale = (canvas.width-10)/(Math.sqrt(2)*data.n);
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
							var svg = d3.select(hic_data_container[0]).append('svg');
							
							svg.selectAll('*').remove();
							
							hic_svg = svg.attr('width', canvas.width)
									.attr('height', canvas.height)
									.style("position", "absolute")
									.style("top", 2*parseInt(scope.state.margin))
									.style("left", 2*parseInt(scope.state.margin))
									.append("g")
									.attr("id", "tads_svg");
							
							handle = hic_svg.append("circle")
								.attr("id", "circ_mark")
								.style("fill", "#fff")
								.style("stroke", "#ccc")
								.style("stroke-widt", 2)
								.attr("cx", (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)))
								.attr("cy", canvas.height-parseInt(scope.state.margin))
								.attr("r", 4);

							position = hic_svg.append("text")
								.attr("id", "circ_position")
								.attr("x", (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2))-2)
								.attr("y", canvas.height-parseInt(scope.state.margin)-5)
								.style("text-anchor", "bottom")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.style("color", "#333")
								.text(scope.settings.current.particle);

							// hic_svg.append('rect')
							//   .attr('class', 'overlay')
							//   .attr('width', canvas.width)
							//   .attr('height', canvas.height)
							//   .style("fill", "transparent");
							var stroke_width = 0;
							var resolution, start_tad, end_tad = 0;
							var polygon_tad, start_tad_scaled, end_tad_scaled, tad_height; 
							for(i=0;i<data.tads.length;i++) {
			                	stroke_width = Math.round(data.tads[i][3]/10);
			                	// assuming tads given in absolute position
			                	resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
								start_tad = Math.round(((data.tads[i][1])-scope.settings.current.chromStart)/resolution);
			                	end_tad = Math.round((data.tads[i][2]-scope.settings.current.chromStart)/resolution);
			                 	start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)));
								// end_tad_scaled = Math.round((end_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)));
								// tad_height = end_tad_scaled-start_tad_scaled;
			     //            	var polygon_tad = tads_svg.append("polygon")
			     //            		.attr("id",data.tads[i][0])
								// 	.attr("x", 20)
								// 	.attr("y", 400)
								// 	.attr("width", 200)
								// 	.style("fill", "white")
								// 	.style("fill-opacity", 1)
								// 	.style("stroke", "black")
								// 	.style("stroke-width", stroke_width)
								// 	.attr("class", "polygon_tad")
								// 	.attr("points", start_tad_scaled+","+canvas.height+" "+end_tad_scaled+","+canvas.height+" "+(end_tad_scaled-start_tad_scaled)+","+tad_height);
			                	polygon_tad = hic_svg.append("rect")
			                 		.attr("id",data.tads[i][0])
			                 		.attr("start",(data.tads[i][1]))
			                 		.attr("end",(data.tads[i][2]))
			                 		.attr("score",(data.tads[i][3]))
			                 		.style("fill", "white")
									.style("fill-opacity", 0)
									.style("stroke", "black")
									.style("stroke-width", stroke_width)
									.style("stroke-dasharray","3,3")
									.attr("class", "polygon_tad")
									.attr('width', end_tad-start_tad+1)
									.attr('height', end_tad-start_tad+1)
									.attr("x", 0)
								 	.attr("y", 0)
								 	.attr("transform", "translate(" + (start_tad_scaled) + ","+canvas.height+") scale("+scope.scale+") rotate(-45 0 0)");
			                	polygon_tads.push(polygon_tad);
			       
			                }

			                svg.on("mousedown", function(){
						        mouseDown = true;
						        startDragOffset.x = d3.event.clientX - scope.translatePos.x;
						        startDragOffset.y = d3.event.clientY- scope.translatePos.y;
						    });
						 
						    svg.on("mouseup", function(){
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
						            scope.translatePos.y = d3.event.clientY - startDragOffset.y;
						            //scope.render();
						            scope.update();
						            scope.update_marks();
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
		        scope.$watch('settings.current.particle', function(newParticle, oldParticle) {
					if ( newParticle !== oldParticle) {
						scope.update();
						scope.update_marks();
					}
				});
		        scope.$watch('settings.slidevalue', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue) {
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
					
					
	                if(!scope.rendered)	scope.render(data.max, data.min);
					var canvas = document.getElementById("hic_canvas");
		            if (canvas.getContext) {
		                var ctx = canvas.getContext("2d");
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                ctx.save();
		                //if(scope.restore_image!==null) {
		                	//ctx.putImageData(scope.restore_image,scope.translatePos.x, scope.translatePos.y);
		                //}
		                ctx.translate(scope.translatePos.x, canvas.height-2);
		                ctx.rotate(-Math.PI/4);
		                ctx.scale(scope.scale, scope.scale);
		                
		                //ctx.drawImage(scope.imageObject,scope.translatePos.x/scope.scale,scope.translatePos.x/scope.scale);
		                ctx.drawImage(scope.imageObject,0,0);
		                //ctx.drawImage(scope.imageObject,scope.translatePos.x/scope.scale,scope.translatePos.y/scope.scale);
		                //ctx.translate(scope.translatePos.x/scope.scale, scope.translatePos.y/scope.scale);
		                //scope.restore_position = x-4;
		                //scope.restore_data = ctx.getImageData(x-4, x-4, 9, 9); 
		                
            			ctx.restore();
		            }
				};

				scope.update_marks =  function() {
					//var circ_mark = angular.element(document.querySelector('#circ_mark'));
					//var circ_position = angular.element(document.querySelector('#circ_position'));
					//var x = (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2));
					var x = (scope.settings.current.particle*Math.sqrt(2))*scope.scale+(scope.translatePos.x);
					handle.attr("cx", x );
					position.attr("x", x ).text(scope.settings.current.particle);
					
					var resolution, start_tad, end_tad = 0;
					var start_tad_scaled, end_tad_scaled;
					for(var i=0;i<polygon_tads.length;i++) {
						resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
						start_tad = Math.round(((data.tads[i][1])-scope.settings.current.chromStart)/resolution);
						start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x));
						
						polygon_tads[i]
							.attr("transform", "translate(" + (start_tad_scaled) + ","+canvas.height+") scale("+scope.scale+") rotate(-45 0 0)");
						if(scope.settings.current.position>=parseInt(polygon_tads[i].attr("start")) && scope.settings.current.position<=parseInt(polygon_tads[i].attr("end"))){
							scope.highlighted_tad = i; 
						} 
					}
				};
				
				scope.$watch('highlighted_tad', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue) {
		        		polygon_tads[newvalue].style("fill-opacity", 0.5);
		        		var start_tad_segment, end_tad_segment, i;
		        		if(oldvalue>-1) {
			        		polygon_tads[oldvalue].style("fill-opacity", 0);
			        		start_tad_segment = Math.round((parseInt(polygon_tads[oldvalue].attr("start")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
			        		end_tad_segment = Math.ceil((parseInt(polygon_tads[oldvalue].attr("end")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
			        		for(i=start_tad_segment;i<end_tad_segment;i++) {
			        			scope.currentoverlay.colors.chromatin[i] = original_colors[i-start_tad_segment];
			        		}
		        		}
		        		start_tad_segment = Math.round((parseInt(polygon_tads[newvalue].attr("start")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
		        		end_tad_segment = Math.ceil((parseInt(polygon_tads[newvalue].attr("end")) - scope.settings.current.chromStart)/scope.settings.current.segmentLength);
		        		//original_colors = scope.currentoverlay.colors.chromatin.slice(start_tad_segment,end_tad_segment);
		        		//for(i=start_tad_segment;i<end_tad_segment;i++) {
		        			//scope.currentoverlay.colors.chromatin[i] = "#e0e67e";
		        		//}
		        		scope.settings.current.start_tad_selected = start_tad_segment;
		        		scope.settings.current.end_tad_selected = end_tad_segment;
		        		//scope.$apply();
		        	}
				});
				//var canvas = document.getElementById("hic_canvas");
				scope.translatePos = {
					x: 0,
				    y: 0
				};
			 
			    scope.scale = 1.0;
				var scaleMultiplier = 0.8;
			    var startDragOffset = {};
			    var mouseDown = false;
			 
	
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
			    
			    
			    // add event listeners to handle screen drag
			    // canvas.addEventListener("mousedown", function(evt){
			    //     mouseDown = true;
			    //     startDragOffset.x = evt.clientX - scope.translatePos.x;
			    //     startDragOffset.y = evt.clientY - scope.translatePos.y;
			    // });
			 
			    // canvas.addEventListener("mouseup", function(evt){
			    //     mouseDown = false;
			    // });
			 
			    // canvas.addEventListener("mouseover", function(evt){
			    //     mouseDown = false;
			    // });
			 
			    // canvas.addEventListener("mouseout", function(evt){
			    //     mouseDown = false;
			    // });
			 
			    // canvas.addEventListener("mousemove", function(evt){
			    //     if (mouseDown) {
			    //         scope.translatePos.x = evt.clientX - startDragOffset.x;
			    //         scope.translatePos.y = evt.clientY - startDragOffset.y;
			    //         //scope.render();
			    //         scope.update();
			    //         scope.update_marks();
			    //     }
			    // });
				
			    $timeout(function () {
                    scope.update();
                });
			}
		};
	}
})();