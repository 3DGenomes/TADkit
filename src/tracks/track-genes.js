'use strict';

// REACT D3 TRACK COMPONENT
var assemblyLength = 0;
var trackGenes = React.createClass({displayName: 'trackGenes',
	getInitialState: function () {
	  return {data: this.props.data};
	},
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

		var parseDate = d3.time.format("%b %Y").parse;

		var x = d3.scale.linear().range([0, width]).clamp(true),
			y = d3.scale.ordinal().rangeBands([0, height], 0);

		var xAxis = d3.svg.axis().scale(x).orient("bottom"),
			yAxis = d3.svg.axis().scale(y).orient("left");

		var svg = d3.select('#' + this.props.target).selectAll('div').append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		var zoom = d3.behavior.zoom()
		    .on("zoom", draw);

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
			console.log(dataOffset);
			var dataCentered = (width * 0.5) - dataOffset;
			console.log(dataCentered);
		    zoom.x(x);
			

		svg.select(".focus").append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		var focusGraph = barsGroup.selectAll("rect")
			.data(data)
			.enter().append("rect")
			.attr("x", function(d) { return Math.floor(x(d.start)); } )
			// .attr("y", function(d) { if (d.strand < 1) {return 0} else {return 0}; } )
			.attr("y", function(d) { if (d.strand < 1) {return (trackMarkHeight)} else {return 0}; } )
			.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
			.attr("height", (trackMarkHeight) )
			.attr("class", function(d) { return d.biotype.toLowerCase(); } )
		    .call(zoom.translate([-2000,0]).scale(dataScale));
		    draw();

		function draw() {
			svg.select("g.x.axis").call(xAxis);
			barsGroup.selectAll("rect")
			.attr("x", function(d) { return Math.floor(x(d.start)); } )
			.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
		}

	},
	render: function() {
		console.log("D3 rendering");
		return React.DOM.div( {id:this.props.target} )
	},
	componentDidMount:function(){
		console.log("React component mounted");
	}
})

