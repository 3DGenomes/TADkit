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
				layer: '=', /* used in template */
				togglelayer: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
<<<<<<< HEAD

				d3Service.d3().then(function(d3) {
=======
				// console.log(scope.data);
				d3Service.load().then(function(d3) {
>>>>>>> upstream/develop

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
						harmonicsColor = scope.layer.palette[0],
						lowerBoundsColor = scope.layer.palette[1];

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