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
				title: '=',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
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

 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;

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
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color,
						harmonicsColor = scope.overlay.palette[0],
						lowerBoundsColor = scope.overlay.palette[1];

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
						var scaled = value / 5; // 5 being the limit...
						opacity = scaled ;
						return opacity;
					};

					scope.getStrokeWidth = function(value) {
						var strokeWidth = 10;
						var scaled = value / 5; // 5 being the limit...
						strokeWidth = strokeWidth * scaled;
						return strokeWidth;
					};

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
						defs = chart.append("defs")
							.append("clipPath")
							.attr("id", "clip")
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.attr('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						// zoomArea = focus.append("g")
						// 	.attr("class", "zoom")
						// 	.append("rect")
						// 	.attr("width", width)
						// 	.attr("height", height)
						// 	.attr('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', 'url(#clip)');

						var axisH = focus.append("g")
							.attr("class", "axis upper")
							.attr("transform", "translate(0," + nodeHeight + ")")
							.call(axisUpper);

						var axisL = focus.append("g")
							.attr("class", "axis lower")
							.attr("transform", "translate(0," + 0 + ")")
							.call(axisLower);

						labels  = chart.append("g")
							.attr("class", "labels");

						if (scope.view.viewtype == "arcs") {
							harmonics = container.selectAll("line")
								.data(data.harmonics)
								.enter()
								.append("line")
								.attr("x1", function(d) { return (data.dimension * particleWidth); } )
								.attr("y1", verticalOffset)
								.attr("x2", function(d) { return (d[1] * particleWidth); } )
								.attr("y2", nodeHeight)
								.attr("stroke-width", function(d) { return (d[3]); } )
								.attr("stroke", harmonicsColor)
								.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });

								lowerBounds = container.selectAll("line")
									.data(data.lowerBounds)
									.enter()
									.append("line")
								.attr("x1", function(d) { return (data.dimension * particleWidth); } )
								.attr("y1", nodeHeight)
								.attr("x2", function(d) { return (d[1] * particleWidth); } )
								.attr("y2", verticalOffset)
								.attr("stroke-width", function(d) { return (d[3]); } )
								.attr("stroke", lowerBoundsColor)
								.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });
						} else { // "linear" ie. lines between two edges
							harmonics = container.selectAll("line")
								.data(data.harmonics)
								.enter()
								.append("line")
								.attr("x1", function(d) { return (data.dimension * particleWidth); } )
								.attr("y1", verticalOffset)
								.attr("x2", function(d) { return (d[1] * particleWidth); } )
								.attr("y2", nodeHeight)
								.attr("stroke", harmonicsColor)
								.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
								.attr("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); } )
								.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });

							lowerBounds = container.selectAll("line")
								.data(data.lowerBounds)
								.enter()
								.append("line")
								.attr("x1", function(d) { return (data.dimension * particleWidth); } )
								.attr("y1", nodeHeight)
								.attr("x2", function(d) { return (d[1] * particleWidth); } )
								.attr("y2", verticalOffset)
								.attr("stroke", lowerBoundsColor)
								.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
								.attr("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); } )
								.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });
						}

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.current.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
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