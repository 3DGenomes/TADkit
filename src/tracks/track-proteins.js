TADkit.directive('tkProteins', function(){
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			// toggleHP1: '&',
			color:'@',
			position:'=',
			positions:'=',
			focusstart:'=',
			focusend:'='
		},
		// template:'<span id="chart{{id}}"></span>' +
		// 		'<a ng-click="toggleHP1()" class="toggle">{{id}}' +
		// 		'	<span data-ng-hide="showHP1"><i class="fa fa-toggle-off"></i></span>' +
		// 		'	<span data-ng-show="showHP1"><i class="fa fa-toggle-on"></i></span>' +
		// 		'</a>' +
		// 		'</span>',
		link:function(scope, elem, attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){
				if (newValue !== oldValue) {
					var positions = scope.positions;

					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 40, bottom: 0, left: 40};
					var width = divWidth - margin.left - margin.right;
					var x = d3.scale.linear().range([0, width]).clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;
					var highlightWidth = positionWidth * width / focusLength;

				if (highlightWidth < 4) highlightWidth = 4;
					var highlightPosition = focusStart + (positionWidth * newValue);
					// console.log( positionWidth );

					x.domain([focusStart, focusEnd]);

					// d3.select("#highlight").style("visibility", "visible");

					// d3.select("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 0.5)) }); // DOES OFFSET CORRECTLY
					d3.selectAll("#highlight").attr("x", function() { return x( highlightPosition - (positionWidth * 4)) });
				}
			})
			
			function getProteinArray (data, id) {
				var dataset = [];
				for (var i = 0; i < data.length; i++) {
					if (data[i][id]==1) {
						var sample = [];
						dataset.push( {"fragmentID":data[i]["fragmentID"], "chromosome":data[i]["chromosome"], "start":data[i]["start"], "end":data[i]["end"]} );
					} else {
						// console.log("None found in sample.");
					}
				}
				// console.log(dataset);
				return dataset;
			}
			
			scope.$watch('data',function(newValue, oldValue){
				// console.log(scope.id);
				
			if ( newValue ) {
				// *** START D3 ****
				// d3.select(window).on('resize', resize);
				console.log("Protein tracks initiated");
				var dataset = getProteinArray(scope.data, scope.id);
				var data = dataset;
				var assemblyLength = scope.assemblylength;
				var target = scope.id;
				var position = scope.position;
				var positions = scope.positions;

				var divWidth = elem[0].parentNode.clientWidth;

				var margin = {top: 0, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 20 - margin.top - margin.bottom,
					nodeHeight = 10;

				var x = d3.scale.linear().range([0, width]).clamp(true);

				var focusStart = scope.focusstart;
				var focusEnd = scope.focusend;
				var focusLength = focusEnd - focusStart;
				var positionWidth = focusLength / positions;
				var highlightWidth = positionWidth * width / focusLength;
				// var highlightWidth = 1 / positions * width; //???
				
				if (highlightWidth < 4) highlightWidth = 4;

				var xAxis = d3.svg.axis().scale(x).orient("top"),
					prime3Axis = d3.svg.axis().orient("left"),
					prime5Axis = d3.svg.axis().orient("right");

				var svg = d3.select('#' + target).append("svg")
				// var svg = d3.select('#chart').append("svg")
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
					.attr('clip-path', 'url(#clip)');

					x.domain([focusStart, focusEnd]);

				svg.select(".chart").append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0,0)")
					.call(xAxis);

				var titletext = scope.id;
				var title = svg.append("text")
					.attr("x", -6)             
					.attr("y", 8)
					.attr("text-anchor", "end")  
					.style("font-size", "10px") 
					.text(titletext);

				var focusGraph = clipped.selectAll("rect")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return Math.floor(x(d.start)); } )
					.attr("y", 0 )
					.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
					.attr("height", (nodeHeight) )
					.attr("class", function(d) { return scope.id; } );

				var highlightPosition = focusStart + (positionWidth * position);
				// console.log(highlightPosition);

				var highlight = svg.append("rect")
						.attr("id", "highlight")
						.attr("x", function(d) { return x( highlightPosition - (positionWidth * 4)); } )
						.attr("y", 0)
						.attr("width", highlightWidth )
						.attr("height", height)
						.attr("class", "highlight");

				// function resize(target) {
				// 	var divWidth = elem.parentNode.clientWidth;
				// 	var margin = {top: 0, right: 40, bottom: 40, left: 40};
				// 	width = divWidth - margin.left - margin.right;
				//
				// 	x = d3.scale.linear().range([0, width]).clamp(true);
				//
				// 	console.log(width);
				//
				// 	svg.attr("width", width + margin.left + margin.right);
				//
				// 	d3.select("#clip").selectAll("rect").attr("width", width);
				//
				// 	svg.select("g.x.axis").call(xAxis);
				//
				// 	d3.select("#prime5").attr("x", width + 8);
				//
				// }
			}

			})
		}
	}
})
			
