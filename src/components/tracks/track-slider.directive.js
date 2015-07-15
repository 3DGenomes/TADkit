(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackSlider', tkComponentTrackSlider);

	function tkComponentTrackSlider(d3Service, Settings) {
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
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

					// SVG GENERATION
					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var cursorWidth = scope.view.settings.cursorWidth;
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						trackHeight = parseInt(scope.view.settings.heightInner);

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0];
						// console.log(component.clientWidth);
					var viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var slider, xScale, prime3Axis, prime5Axis;
					var handleWidth, handleHeight;
					var xAxis, brush, handle, label;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render();
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

						handleWidth = height * 0.5;
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
							.attr("id", "handle")
							.attr("class", "handle")
							.attr("cx", xScale(scope.settings.current.position))
							.attr("cy", height)
							.attr("r", handleWidth * 0.6);

						label = slider.append("text")
							.attr("id", "position")
							.attr("x", xScale(scope.settings.current.position) - (handleWidth * 0.5))
							.attr("y", height - 10)
							.attr("text-anchor", "bottom")
							.attr("font-family", "sans-serif")
							.attr("font-size", "10px")
							.attr("fill", "#000000")
							.text(scope.settings.current.particle);

						slider
							.call(brush.extent([(scope.settings.current.position), 0]))
							.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#handle") //.style("visibility", "hidden");
						.attr("cx", xScale(scope.settings.current.position) );
						svg.select("#position") //.style("visibility", "hidden");
						.attr("x", (xScale(scope.settings.current.position) - (handleWidth * 0.5)) )
						.text(scope.settings.current.particle);
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
								handle.attr("cx", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segment = Settings.getSegment();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

				});
			}
		};
	}
})();