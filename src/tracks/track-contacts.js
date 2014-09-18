/*global TADkit, d3 */

TADkit.directive('tkContacts', function(){
	"use strict";
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			position:'=',
			positions:'=',
			segments:'=',
			focusstart:'=',
			focusend:'='
		},
		link:function(scope,elem,attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){
				if (newValue !== oldValue) {

					var data = scope.data;

					var position = newValue;
					var positions = scope.positions;
					var segments = scope.segments;
					var particles = positions / segments;

					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 40, bottom: 0, left: 40},
						width = divWidth - margin.left - margin.right,
						height = 20 - margin.top - margin.bottom,
						nodeHeight = 10;

					var x = d3.scale.linear()
						.range([0, width])
						.clamp(true);
					var y = d3.scale.linear()
						.range([0, 1])
						.clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;

					var particleWidth = width / particles;
					var particlePosition = Math.floor((position * particles)/ positions);
					// console.log("particlePosition: "+JSON.stringify(particlePosition));
					// var test = Math.floor(position/segments);
					// console.log(test);
					
					var mindist = d3.min(data, function(d) { return d.dist; });
					var maxdist = d3.max(data, function(d) { return d.dist; });
						x.domain([1, particles]);
						y.domain([mindist, maxdist]);

					// d3.select("#highlight").style("visibility", "visible");

					// d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 0.5)) }); // DOES OFFSET CORRECTLY
					d3.selectAll("#highlight").attr("x", function() { return Math.floor(particlePosition - (particleWidth * 0.5)); });

					d3.select("#contacts").selectAll(".clipped").remove();
					// console.log(data);

				var clipped = d3.select("#contacts").selectAll(".chart").append("g")
				.attr('clip-path', 'url(#clip)')
				.attr("class", "clipped");
				
				var interactGraph = clipped.selectAll("rect")
					.data( data.filter(function(d){ return (d.a	 == particlePosition+1); }))
					.enter().append("rect")
					.attr("x", function(d) { return x(d.b+1); } )
					.attr("y", 0 )
					.attr("width", function(d) { return particleWidth; } )
					.attr("height", nodeHeight )
					.style("opacity", function(d) { return y(d.dist) ; } )
					.attr("class", "particle" );

				}
			});

			scope.$watch('data',function(newValue, oldValue){
				if (newValue !== oldValue) {

					var data = newValue;
					
					var divWidth = elem[0].parentNode.clientWidth;
					var target = scope.id;
					var position = scope.position;
					var positions = scope.positions;
					var segments = scope.segments;
					var particles = positions / segments;
					
					var margin = {top: 0, right: 40, bottom: 0, left: 40},
						width = divWidth - margin.left - margin.right,
						height = 20 - margin.top - margin.bottom,
						nodeHeight = 10;

					var particleWidth = width / particles;
					var particlePosition = Math.floor((position * particles)/ positions);

					var x = d3.scale.linear()
						.range([0, width])
						.clamp(true);
					var y = d3.scale.linear()
						.range([0, 1])
						.clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / particles	;

					var uAxis = d3.svg.axis().scale(x).orient("top");
					var xAxis = d3.svg.axis().scale(x).orient("bottom");

					var svg = d3.select('#' + target).append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);

					svg.append("defs").append("clipPath")
						.attr("id", "clip")
						.append("rect")
						.attr("width", width)
						.attr("height", height);

					var chart = svg.append("g")
						.attr("class", "chart");

					var clipped = chart.append("g")
						.attr('clip-path', 'url(#clip)')
						.attr("class", "clipped");

					var mindist = d3.min(data, function(d) { return d.dist; });
					var maxdist = d3.max(data, function(d) { return d.dist; });
						x.domain([1, particles]);
						y.domain([mindist, maxdist]);
	
					// svg.select(".chart").append("g")
					// 	.attr("class", "x axis")
					// 	.attr("transform", "translate(0," + nodeHeight + ")")
					// 	.call(xAxis);
					svg.select(".chart").append("g")
						.attr("class", "u axis")
						.attr("transform", "translate(0,0)")
						.call(uAxis);

					var titletext = "Contact";
					var title = svg.append("text")
						.attr("x", -4)             
						.attr("y", 8)
						.attr("text-anchor", "end")  
						.style("font-size", "10px") 
						.text(titletext);
						
					var interactGraph = clipped.selectAll("rect")
						.data(data.filter(function(d){ return (d.a == particlePosition+1); }))
						.enter().append("rect")
						.attr("x", function(d) { return x(d.b+1); } )
						.attr("y", 0 )
						.attr("width", function(d) { return particleWidth; } )
						.attr("height", nodeHeight )
						.style("opacity", function(d) { return y(d.dist) ; } )
						.attr("class", "particle" );

					var highlight = svg.append("rect")
							.attr("id", "highlight")
							.attr("x", function(d) { return particlePosition - (positionWidth * 0.5); } )
							.attr("y", 0)
							.attr("width", particleWidth )
							.attr("height", height)
							.attr("class", "highlight");

				}	
			});
		}
	};
});
			
