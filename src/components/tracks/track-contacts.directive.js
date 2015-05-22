(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackContacts', tkComponentTrackContacts);

	function tkComponentTrackContacts(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				object: '=',
				view: '=',
				data: '=',
				overlay:'=',
				settings: '='
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);
					// save data matrix for re-slicing as position changes
					scope.dataMatrix = scope.data;

					// FYI: data == distances
					// eg. particles a=rst,b=uvw,c=xyz
					// give matrix [aa,ab,ac,ba,bb,bc,ca,cb,cc]
					// can be filtered by no. of particles
					// totalMatrixVertices / (totalParticeles * 3)
 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.particlesCount;

					/* Note: focusLength may not be exactly particlesCount (N) * resolution
					 * BUT for now the last bin resolution is taken as equal to the others
					 * In the future TADbit may output variable bin resolutions
					 * eg. as an array of resolutions corresponding to the bins/particles
					 * Then the code commented below can be developed/completed
					 * to assess and assign the last index of data
					 * This may be better done externally to the track modules
					 * and the results accessed through, for example, view.settings.resolutions
					 */
					// var resolution = scope.view.resolution;
					// var particlesCount = focusLength / resolution;
					// var exactCount = function(particlesCount) { return parseInt(particlesCount) === particlesCount };
					// var resolutionParticleN = exactCount;
					// if (!exactCount) resolutionParticleN = focusLength - (resolution * (n-1));
					// var particles = Math.ceil(particlesCount);

					// SVG GENERATION
					var componentMargin = parseInt(scope.object.state.margin);
					/* Rebuild margin Object to maintain D3 standard */
					var margin = {
							top: parseInt(scope.object.state.padding.top),
							right: parseInt(scope.object.state.padding.right),
							bottom: parseInt(scope.object.state.padding.bottom),
							left: parseInt(scope.object.state.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.object.state.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// // RESIZE
					// scope.$watch(function(){
					// 	var w = component.clientWidth;
					// 	var h = component.clientHeight;
					// 	return w + h;
					// }, function() {
					// 	scope.render(scope.data);
					// });

					// REDRAW
					scope.$watch('data', function(newData) {
						scope.render(newData);
					});
 					
					// /* Watch for Browser-wide Position updates */
					scope.$watch('settings.position', function(newPosition, oldPosition) { // deep watch as change direct and changes all?
						if ( newPosition !== oldPosition ) {
							// console.log(scope.settings.position);
							scope.getData();
							// scope.update();
						}
					});


 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getData = function() {
						// Filter if data is position dependednt matrix
						scope.dataStart = (((scope.settings.currentParticle - 1) * scope.settings.particlesCount) + 1) - 1;
						scope.dataEnd = (scope.settings.currentParticle * scope.settings.particlesCount) - 1;
						scope.data = scope.dataMatrix.subarray(scope.dataStart, scope.dataEnd);
						// console.log(scope.data);
					};
					scope.getData();

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
				
						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("top")
								.ticks(0)
								.outerTickSize(0);

						var highlightWidth = 2;

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
								// .call(zoom);
						
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

						var zoomArea = focus.append("g")
							.attr("class", "zoom")
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.attr('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', 'url(#clip)');

						var labels  = chart.append("g")
							.attr("class", "labels");

						var focusGraph = container.selectAll("rect")
							.data(data)
							.enter().append("rect")
							.attr("x", function(d, i) { return (i * particleWidth); } )
							.attr("y", verticalOffset)
							.attr("width", particleWidth)
							.attr("height", nodeHeight)
							.style("fill", nodeColor)
							.style("fill-opacity", function(d) { return d; })
							.style("stroke", nodeColor)
							.style("stroke-width", 0)
							.append("svg:title")
							.text(function(d,i) { return i + ":" + d; });

						var highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
					};

					// scope.update = function() {
					// 	svg.select("#highlight") //.style("visibility", "hidden");
					// 	.attr("x", function(d) { return xScale( scope.settings.position - (step * 0.5)); } );
					// };

				});
			}
		};
	}
})();