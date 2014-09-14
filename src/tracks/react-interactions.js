'use strict';

// REACT D3 TRACK COMPONENT
var assemblyLength = 0;
var trackInteractions = React.createClass({displayName: 'Long Range Interactions Track',
	componentWillReceiveProps:function(nextProps){
		// console.log(nextProps);
			if(nextProps.data){
				if(nextProps.assemblyLength){
					assemblyLength = nextProps.assemblyLength;
				} else {
					assemblyLength = 2300000000;
				};
				this.renderChart(nextProps.data, nextProps.elem, assemblyLength)
			};
	},
	renderChart:function(dataset, elem, assemblyLength){
		// *** START D3 ****
		// d3.select(window).on('resize', resize);
		console.log("D3 initiated");
		
		var data = dataset;
		var divWidth = elem.parentNode.clientWidth;

		var chrStart = 0;
		var chrEnd = assemblyLength;

		var fragmentStart = d3.min(data, function(d) { return +d.start;} );
		var fragmentEnd = d3.max(data, function(d) { return +d.end;} );
		var fragmentLength = fragmentEnd - fragmentStart;
		var fragmentMargin = fragmentLength * 0.05;

		var margin = {top: 0, right: 40, bottom: 40, left: 40},
			width = divWidth - margin.left - margin.right,
			height = 60 - margin.top - margin.bottom,
			trackMarkHeight = 10;

		var x = d3.scale.linear().range([0, width]).clamp(true),
			y = d3.scale.ordinal().rangeBands([0, height], 0);

		var xAxis = d3.svg.axis().scale(x).orient("bottom"),
			prime3Axis = d3.svg.axis().orient("left"),
			prime5Axis = d3.svg.axis().orient("right");

		var zoom = d3.behavior.zoom()
			    .on("zoom", draw);

		var svg = d3.select('#' + this.props.target).selectAll('div').append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		    .call(zoom);

		svg.append("defs").append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("width", width)
			.attr("height", height);

		var focus = svg.append("g")
			.attr("class", "focus");
			// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		var barsGroup = focus.append("g")
			.attr('clip-path', 'url(#clip)');

			x.domain([chrStart, chrEnd]);
			y.domain(data.map(function(d) { return d.ID; }));
			var dataScale= 480;
			var dataOffset = ((fragmentEnd - fragmentStart) / assemblyLength) * dataScale * width  * 0.5;
			// console.log(dataOffset);
			var dataCentered = (width * 0.5) - dataOffset;
			// console.log(dataCentered);
		    zoom.x(x);
			
		svg.select(".focus").append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
			
			var prime3 = svg.append("text")
				.attr("x", -12)             
				.attr("y", -3)
				.attr("text-anchor", "right")  
				.style("font-size", "10px") 
				.text("3'");
		
			var prime5 = svg.append("text")
				.attr("x", width + 8)             
				.attr("y", -3)
				.attr("text-anchor", "left")  
				.style("font-size", "10px") 
				.text("5'");
		
			var sense = svg.append("text")
				.attr("x", -18)             
				.attr("y", 8)
				.attr("text-anchor", "right")  
				.style("font-size", "10px") 
				.text("<<");
		
			var antisense = svg.append("text")
				.attr("x", -18)             
				.attr("y", 18)
				.attr("text-anchor", "right")  
				.style("font-size", "10px") 
				.text(">>");
		
		// var focusGraph = barsGroup.selectAll("rect")
		// 	.data(data)
		// 	.enter().append("rect")
		// 	.attr("x", function(d) { return Math.floor(x(d.start)); } )
		// 	// .attr("y", function(d) { if (d.strand < 1) {return 0} else {return 0}; } )
		// 	.attr("y", function(d) { if (d.strand < 1) {return (trackMarkHeight)} else {return 0}; } )
		// 	.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
		// 	.attr("height", (trackMarkHeight) )
		// 	.attr("class", function(d) { return d.biotype.toLowerCase(); } )
		//     .call(zoom.translate([-2000,0]).scale(dataScale));
			
		    draw();

			// var background = barsGroup.append("rect")
			//     .attr("width", width)
			//     .attr("height", height)
			//     .style("fill", "none")
			//         //make transparent (vs black if commented-out)
			//     .style("pointer-events", "all");
			//         //respond to mouse, even when transparent
				
		function draw() {
			svg.select("g.x.axis").call(xAxis);
			barsGroup.selectAll("rect")
			.attr("x", function(d) { return Math.floor(x(d.start)); } )
			.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
		}

	},
	render: function() {
		// console.log("Interactions Track rendering");
		return React.DOM.div( {id:this.props.target} )
	},
	componentDidMount:function(){
		console.log("Interactions Track mounted");
	}
})

