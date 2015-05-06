(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackSlider', tkComponentTrackSlider);

	function tkComponentTrackSlider(d3Service) {
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				object: '=',
				view: '=',
				settings: '='
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

					// SVG GENERATION
					var data = scope.data;
					var focusStart = scope.view.viewpoint.startCoord;
					var focusEnd = scope.view.viewpoint.endCoord;
					var segments = scope.view.settings.segments;
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						trackHeight = parseInt(scope.object.state.heightInner);

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0];
					var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var slider, xScale, prime3Axis, prime5Axis;
					var handleWidth, handleHeight;
					var xAxis, brush, handle;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render();
					});

					scope.render = function() {
						svg.selectAll('*').remove();
						
						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.bottom - margin.top;

						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);

						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("bottom")
								.ticks(4);
							prime3Axis = d3.svg.axis().orient("left");
							prime5Axis = d3.svg.axis().orient("right");
								// .outerTickSize([0]);

						var sliderStart = 0;
						var sliderEnd = segments-1;

						handleWidth = Math.max( (width / sliderEnd), 4 );
						handleHeight = trackHeight;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						slider = svg.attr("width", width + margin.left + margin.right)
								.attr("height", height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + ", " + 0 + ")");

							var labels  = slider.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -16)
									.attr("y", 26)
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text("3'");
								labels.append("text")
									.attr("x", width + 8)
									.attr("y", 26)
									.attr("text-anchor", "left")
									.style("font-size", "10px")
									.text("5'");

						var axis = slider.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis)
							.select(".domain")
							.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
							.attr("class", "halo");

						slider.append("g")
							.attr("class", "slider")
							.call(brush);

						slider.select(".background")
							.attr("y", height/2)
							.attr("height", height);
						handle = slider.append("circle")
							.attr("class", "handle")
							.attr("cx", xScale(scope.settings.position) - (handleWidth * 0.5))
							.attr("cy", height)
							.attr("r", handleWidth * 1.6);
							// handle.append("text")
							// 	.attr("x", xScale(scope.settings.position) - (handleWidth * 0.5))
							// 	.attr("y", height)
							// 	.attr("text-anchor", "bottom")
							// 	.style("font-size", "10px")
							// 	.text(scope.settings.position);

						slider
							.call(brush.extent([(scope.settings.position), 0]))
							.call(brush.event);
					};

					// BRUSH
					scope.brushed = function() {
						// scope.safeApply( function() {
							var thisSlider = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisSlider)[0]));
									brush.extent([value, value]);
								}
								handle.attr("cx", xScale(value) - (handleWidth * 0.5));

								// UPDATE position
								scope.settings.position = value;
								scope.settings.segmentLower = scope.settings.position - (scope.settings.segment * 5); // * 0.5???
								scope.settings.segmentUpper = scope.settings.position + (scope.settings.segment * 5); // * 0.5???

							});
						// });
					};

				});
			}
		};
	}
})();