'use strict';

// REACT D3 TRACK COMPONENT
var assemblyLength = 2300000000;
var focusStart = 0;
var focusEnd = 5000000;
var sense = true;
var trackGenes = React.createClass({displayName: 'trackGenes',
	componentWillReceiveProps: function(nextProps){
		// console.log(nextProps);
			if(nextProps.data){
				if(nextProps.assemblyLength) assemblyLength = nextProps.assemblyLength;
				if(nextProps.focusStart) focusStart = nextProps.focusStart;
				if(nextProps.focusEnd) focusEnd = nextProps.focusEnd;
				if(nextProps.sense) {
					sense = nextProps.sense;
				}
				this.renderChart(nextProps.data, nextProps.elem, assemblyLength, focusStart, focusEnd, sense)
			};
	},
	renderChart: function(dataset, elem, assemblyLength, focusStart, focusEnd, sense){

		// *** START D3 ****
		// d3.select(window).on('resize', resize);
		console.log("D3 initiated");
		
		var data = dataset;
		var divWidth = elem.parentNode.clientWidth;

		var margin = {top: 0, right: 40, bottom: 40, left: 40},
			width = divWidth - margin.left - margin.right,
			height = 60 - margin.top - margin.bottom,
			nodeHeight = 10;

		var chrStart = 0;
		var chrEnd = assemblyLength;

		var x = d3.scale.linear().range([0, width]).clamp(true),
			y = d3.scale.ordinal().rangeBands([0, height], 0);

		var focusLength = focusEnd - focusStart;

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

		var barsGroup = focus.append("g")
			.attr('clip-path', 'url(#clip)');

			x.domain([15590001, 16610000]);
			y.domain(data.map(function(d) { return d.ID; }));
			
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
		
		var focusGraph = barsGroup.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("x", function(d) { return Math.floor(x(d.start)); } )
			.attr("y", function(d) { if (sense) { if (d.strand < 1) {return (nodeHeight)} } else {return 0}; } )
			.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
			.attr("height", (nodeHeight) )
			.attr("class", function(d) { return d.biotype.toLowerCase(); } );
			
			// focusGraph.call(zoom.translate([focusTranslate,0]).scale(focusScale));
			
		    draw();

		function draw() {
			svg.select("g.x.axis").call(xAxis);
			barsGroup.selectAll("rect")
			.attr("x", function(d) { return Math.floor(x(d.start)); } )
			.attr("y", function(d) { if (sense) { if (d.strand < 1) {return (nodeHeight)} } else {return 0}; } )
			.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
			// console.log(zoom.translate());
			// console.log(zoom.scale());
			
		}
		
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

	},
	render: function() {
		// console.log("Genes Track rendering");
		return React.DOM.div( {id:this.props.target} )
	},
	componentDidMount:function(){
		console.log("Genes Track mounted");
	}
})

