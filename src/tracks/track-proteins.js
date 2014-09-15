TADkit.directive('proteins', function(){
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			color:'@',
			position:'=',
			positions:'=',
			assemblylength:'=',
			focusstart:'=',
			focusend:'='
		},
		link:function(scope, elem, attrs){
			// console.log(scope);
			
			scope.$watch('position',function(newValue, oldValue){
				if (newValue !== oldValue) {
					var positions = scope.positions;

					var divWidth = elem[0].parentNode.clientWidth;

					var margin = {top: 0, right: 0, bottom: 0, left: 0};
					var width = divWidth - margin.left - margin.right;
					var x = d3.scale.linear().range([0, width]).clamp(true);

					var focusStart = scope.focusstart;
					var focusEnd = scope.focusend;
					var focusLength = focusEnd - focusStart;
					var positionWidth = focusLength / positions;
					var highlightWidth = positionWidth * width / focusLength;

				if (highlightWidth < 4) highlightWidth = 4;
					var highlightPosition = focusStart + (positionWidth * newValue);
					// console.log(  highlightPosition  );

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

				var margin = {top: 0, right: 0, bottom: 0, left: 0},
					width = divWidth - margin.left - margin.right,
					height = 20 - margin.top - margin.bottom,
					nodeHeight = 10;

				var chrStart = 0;
				var chrEnd = scope.assemblylength;
				// console.log(chrEnd);

				var x = d3.scale.linear().range([0, width]).clamp(true);

				var focusStart = scope.focusstart;
				var focusEnd = scope.focusend;
				var focusLength = focusEnd - focusStart;
				var positionWidth = focusLength / positions;
				var highlightWidth = positionWidth * width / focusLength;
				if (highlightWidth < 4) highlightWidth = 4;
				// console.log(highlightWidth);

				var focusScale = assemblyLength / focusLength;
				// console.log(focusScale);
				var focusMargin = focusScale * 0.05;
				focusScale = focusScale - (focusMargin * 2.0);

				var focusCenter = focusLength * 0.5;
				var assemblyCenter = assemblyLength * 0.5;
				var focusOffset = x(assemblyCenter) - x(focusCenter) ;
				// console.log(focusOffset);

				var focusTranslate = x(focusOffset) * focusScale;
				// console.log("focusTranslate");
				// console.log(focusTranslate);
				focusTranslate = -12615;

				var xAxis = d3.svg.axis().scale(x).orient("bottom"),
					prime3Axis = d3.svg.axis().orient("left"),
					prime5Axis = d3.svg.axis().orient("right");

				// var zoom = d3.behavior.zoom()
				// 	    .on("zoom", draw);

				var svg = d3.select('#' + target).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom);
				    // .call(zoom);


				svg.append("defs").append("clipPath")
					.attr("id", "clip")
					.append("rect")
					.attr("width", width)
					.attr("height", height);

				var focus = svg.append("g")
					.attr("class", "focus");

				var barsGroup = focus.append("g")
					.attr('clip-path', 'url(#clip)');

					x.domain([focusStart, focusEnd]);

				    // zoom.x(x);

				svg.select(".focus").append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + nodeHeight + ")")
					.call(xAxis);

				var focusGraph = barsGroup.selectAll("rect")
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

					// focusGraph.call(zoom.translate([focusTranslate,0]).scale(focusScale));

				    // draw();

				// function draw() {
				// 	svg.select("g.x.axis").call(xAxis);
				// 	barsGroup.selectAll("rect")
				// 	.attr("x", function(d) { return Math.floor(x(d.start)); } )
				// 	.attr("y", 0 )
				// 	.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
				// 	// console.log(zoom.translate());
				// 	// console.log(zoom.scale());
				// 	svg.select("#highlight").style("visibility", "hidden");
				// 	.attr("x", function(d) { return x( highlightPosition - (positionWidth * 4)); } )
				// 	.attr("width", highlightWidth );
				//
				// }
		
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
			
