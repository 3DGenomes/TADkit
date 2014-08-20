// REACT D3 TRACK COMPONENT
var sequencetrack = React.createClass({displayName: 'sequencetrack',
	componentWillReceiveProps:function(nextProps){
			if(nextProps.data){
				this.renderChart(nextProps.data)
			}
		},
		renderChart:function(dataset){

		// *** START D3 ****
		// d3.select("body").append("p").attr("class", "status").text("D3 running...");
		// d3.select(window).on('resize', resize); 
			var data = dataset;
		
			var divWidth = window.innerWidth;

			var chrStart = 0;
			var chrEnd = 50000000;

			var fragmentStart = d3.min(data, function(d) { return +d.start;} );
			var fragmentEnd = d3.max(data, function(d) { return +d.end;} );
			// var fragmentLength = chrEnd - chrStart;

			//	var w = 10;//d.end - d.start / fragmentLength;

			var margin = {top: 5, right: 40, bottom: 50, left: 40},
					margin2 = {top: 30, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 60 - margin.top - margin.bottom,
					height2 = 40 - margin2.top - margin2.bottom,
					trackMarkHeight = 5;

			var parseDate = d3.time.format("%b %Y").parse;

			var x = d3.scale.linear()
						.domain([chrStart, chrEnd])
						.range([0, width]),
					x2 = d3.scale.linear()
						.domain([chrStart, chrEnd])
						.range([0, width]),
					y = d3.scale.ordinal()
						.domain(data.map(function(d) { return d.ID; }))
						.rangeBands([0, height], 0),
					y2 = d3.scale.ordinal()
						.domain(data.map(function(d) { return d.ID; }))
						.rangeRoundBands([0, height2], 0);

			var xAxis = d3.svg.axis().scale(x).orient("bottom"),
					xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
					yAxis = d3.svg.axis().scale(y).orient("left");

			var brush = d3.svg.brush()
					.x(x2)
					.on("brush", brushed);

			var svg = d3.select('#' + this.props.target).selectAll('div').append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom);

			svg.append("defs").append("clipPath")
					.attr("id", "clip")
				.append("rect")
					.attr("width", width)
					.attr("height", height);

			var focus = svg.append("g")
					.attr("class", "focus")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.selectAll("rect")
					.data(function(d) {return data;})
					.enter().append("g")
					.attr("transform", function(d) { return "translate(" + function(d) { return x(d) } + "," + y + ")"; });

				svg.select(".focus").append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);

					focus.append("rect")
						.attr("x", function(d) { return Math.floor(x(d.start)); } )
						.attr("y", function(d) { if (d.strand < 1) {return (d.strand * trackMarkHeight)} else {return 0}; } )
						.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
						.attr("height", (trackMarkHeight) );

			var context = svg.append("g")
					.attr("class", "context")
					.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
					.selectAll("rect")
					.data(function(d) {return data;})
					.enter().append("g")
					.attr("transform", function(d) { return "translate(" + function(d) { return x2(d) } + "," + y2 + ")"; });

				svg.select(".context").append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height2 + ")")
						.call(xAxis2);

					context.append("rect")
						.attr("x", function(d) { return Math.floor(x2(d.start)); } )
						.attr("y", 0 )
						.attr("width", function(d) { return Math.ceil(x2(d.end) - x2(d.start)) + "px"; } )
						.attr("height", (trackMarkHeight * 2.0) )

						context.append("g")
								.attr("class", "x brush")
								.call(brush)
//								.call(brush.extent([genomeRange["From"], genomeRange["To"]]))
//						.call(brush.event)
							.selectAll("rect")
								.attr("y", 0)
								.attr("height", height2);

				function brushed() {
				// d3.select(".status").text("D3 updating...");
					x.domain(brush.empty() ? x2.domain() : brush.extent());

					svg.select(".focus").select(".x")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis);

						focus.select("rect")
							.attr("x", function(d) { return Math.floor(x(d.start)); } )
							.attr("y", function(d) { if (d.strand < 1) {return (d.strand * trackMarkHeight)} else {return 0}; } )
							.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
							.attr("height", (trackMarkHeight) );
				}
			},
			render:function(){
			return React.DOM.div( {id:this.props.target})
		}
})
