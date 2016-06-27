(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackGenes', tkComponentTrackGenes);

	function tkComponentTrackGenes($log, d3Service) {    
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

				d3Service.load().then(function(d3) {
					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};
 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var assemblyLength = 3200000000; // CALCULATE
					if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var positions = 100; //scope.positions; // == ?
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var chrStart = 0;
					var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					var positionWidth = 1000; //focusLength / positions; // derive from...?
					// var highlightPosition = focusStart + (positionWidth * scope.settings.current.position);

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
					var browserContent = element[0].parentNode;
					var componentRect = element[0].getBoundingClientRect();
					var componentBody = element[0].children[0].children[3];

					var svg = d3.select(componentBody).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE
					scope.$watch(function(){
						var w = browserContent.clientWidth;
						var h = browserContent.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
						componentRect = element[0].getBoundingClientRect();
					});

					// REDRAW
					scope.$watch('data', function(newData, oldData) {
						if ( newData !== oldData ) {
							scope.render(newData);
						}
					});
					// }, true); // FOR DEEP WATCH
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});

					// TOOLTIP
					var tooltipWidth = 180; // TODO: get form settings
					var tooltipPadding = 10; // TODO: get form settings
					var backgroundColor = "rgb(76,175,80)"; // TODO: get from App

					// Attributees to pass to <tl-tooltip> (dummy values)
					scope.tooltip = {
						"title" : "Gene",
						"content" : {},
						"styling" : {
							"width" : tooltipWidth,
							"padding" : tooltipPadding,
							"background" : backgroundColor
						}
					};

					var tooltip = d3.select(componentBody).select("tk-tooltip");
						tooltip.style("width", (tooltipWidth + "px") );
						tooltip.style("padding", (tooltipPadding + "px") );									

					function setTooltipContent(d) {
						d["start-end"] = d.start + "-" + d.end;
						d.length = d.end - d.start;

						var sorting = ["id","biotype","start-end","strand","length","assembly_name","description"];
						var content = [];
						angular.forEach(d, function(value, key) {
							key.toLowerCase();
							for (var i = sorting.length - 1; i >= 0; i--) {
								sorting[i].toLowerCase();
								if (key == sorting[i]) {
									var name = key.replace("_name","");
									content.push({"name":name,"value":value});
								}
							}
						});
						scope.safeApply( function() {
							scope.tooltip.title = d.feature_type + ": " + d.external_name;
							scope.tooltip.content = content;
						});
					}


 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

							var width = browserContent.clientWidth - (2 * componentMargin) - margin.left - margin.right,
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
								.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.style('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							var axis = focus.append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + nodeHeight + ")")
								.call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 8)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text("<<");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 18)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text(">>");
// TODO: Use FontAwesome/IcoMoon...
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
								.on("mouseover", function(d) {
									setTooltipContent(d);
									tooltip.transition()
										.duration(200)
										.style("opacity", 0.8);
									tooltip.style("left", (d3.event.pageX - (tooltipWidth * 0.5)) + "px");
								})
								.on("mouseout", function(d) {
									tooltip.transition()
										.duration(200)
										.style("opacity", 0);
								});

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } )
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
						.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } );
					};
				});
			}
		};
	}
})();