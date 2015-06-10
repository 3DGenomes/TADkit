(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackGenes', tkComponentTrackGenes);

	function tkComponentTrackGenes(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				title: '=',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var assemblyLength = 3200000000; // CALCULATE
					if (!scope.settings.position) scope.settings.position = assemblyLength / 2;
					var positions = 100; //scope.positions; // == ?
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var chrStart = 0;
					var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					var positionWidth = 1000; //focusLength / positions; // derive from...?
					// var highlightPosition = focusStart + (positionWidth * scope.settings.position);

					var focusScale = assemblyLength / focusLength;
					var focusMargin = focusScale * 0.05;
					focusScale = focusScale - (focusMargin * 2.0);
		
					var focusCenter = focusLength * 0.5;
					var assemblyCenter = assemblyLength * 0.5;


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
						nodeHeight = 10,
						nodePadding = 0;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(scope.data);
					});

					// REDRAW
					scope.$watch('data', function(newData) {
						scope.render(newData);
					}, true);
 					
					// SLIDER
					scope.$watch('settings.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;

							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //positionWidth * width / focusLength;
							// if (highlightWidth < 1) highlightWidth = 1; 
							var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

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

							// zoom.x(xScale);

							chart.select(".focus").append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + nodeHeight + ")")
								.call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 8)
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text("<<");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 18)
									.attr("text-anchor", "right")
									.style("font-size", "10px")
									.text(">>");
// TO DO: Use FontAwesome/IcoMoon...
// node.append('text')
//     .attr('font-family', 'FontAwesome')
//     .attr('font-size', function(d) { return d.size+'em'} )
//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
								.attr("x", function(d) { return Math.floor(xScale(d.start)); } )
								.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
								.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
								.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  )
								.attr("class", function(d) {
									var biotypeClass = d.biotypeStyle;
									if (d.strand < 1) {biotypeClass += " forward-strand";}
									else {biotypeClass += " reverse-strand";}
									return biotypeClass; } )
								.append("svg:title")
								.text(function(d) { return d.external_name; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.position - (positionWidth * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						svg.select("g.x.axis").call(xAxis);
						container.selectAll("rect")
						.attr("x", function(d) { return Math.floor(xScale(d.start)); } )	
						.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
						.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
						.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  );

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.position - (positionWidth * 0.5)); } );
					};
				});
			}
		};
	}
})();