// REACT D3 TRACK COMPONENT
var assemblyLength = 2300000000;
var sequenceTrack = React.createClass({displayName: 'sequenceTrack',
	componentWillReceiveProps:function(nextProps){
			if(nextProps.data){
				this.renderChart(nextProps.data)
			}
			if(nextProps.length){
				assemblyLength = nextProps.length;
			} else {
				assemblyLength = 2300000000;
			}
		},
		renderChart:function(dataset){
			// *** START D3 ****
				// d3.select(window).on('resize', resize); 
				var data = dataset;
		
				var divWidth = window.innerWidth;

				var chrStart = 0;
				var chrEnd = assemblyLength;

				var fragmentStart = d3.min(data, function(d) { return +d.start;} );
				var fragmentEnd = d3.max(data, function(d) { return +d.end;} );
				var fragmentLength = fragmentEnd - fragmentStart;
				var fragmentMargin = fragmentLength * 0.05;

				var margin = {top: 5, right: 40, bottom: 40, left: 40},
					margin2 = {top: 30, right: 40, bottom: 0, left: 40},
					width = divWidth - margin.left - margin.right,
					height = 60 - margin.top - margin.bottom,
					height2 = 40 - margin2.top - margin2.bottom,
					trackMarkHeight = 10;

				var parseDate = d3.time.format("%b %Y").parse;

				var x = d3.scale.linear().range([0, width]),
					x2 = d3.scale.linear().range([0, width]),
					y = d3.scale.ordinal().rangeBands([0, height], 0),
					y2 = d3.scale.ordinal().rangeRoundBands([0, height2], 0);

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

				var barsGroup = focus.append("g")
					.attr('clip-path', 'url(#clip)');

				var context = svg.append("g")
					.attr("class", "context")
					.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")

					x.domain([chrStart, chrEnd]);
					x2.domain([chrStart, chrEnd]);
					y.domain(data.map(function(d) { return d.ID; }));
					y2.domain(data.map(function(d) { return d.ID; }));
					brush.extent([fragmentStart - fragmentMargin, fragmentEnd + fragmentMargin]);

				svg.select(".focus").append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

				var focusGraph = barsGroup.selectAll("rect")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return Math.floor(x(d.start)); } )
					.attr("y", function(d) { if (d.strand < 1) {return (trackMarkHeight)} else {return 0}; } )
					.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } )
					.attr("height", (trackMarkHeight) );

				context.selectAll("rect")
					.data(data)
					.enter().append("rect")
					.attr("x", function(d) { return Math.floor(x2(d.start)); } )
					.attr("y", 0 )
					.attr("width", function(d) { return Math.ceil(x2(d.end) - x2(d.start)) + "px"; } )
					.attr("height", (trackMarkHeight) )

				context.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height2 + ")")
					.call(xAxis2);

				context.append("g")
					.attr("class", "x brush")
					.call(brush)
					.selectAll("rect")
					.attr("y", 0)
					.attr("height", height2);

				brushed();
				brush.event(context.select('g.x.brush'));
				
  				function brushed() {
					x.domain(brush.empty() ? x2.domain() : brush.extent());					
					focus.selectAll("rect")
						.attr("x", function(d) { return Math.floor(x(d.start)); } )
						.attr("width", function(d) { return Math.ceil(x(d.end) - x(d.start)) + "px"; } );
					focus.select(".x.axis").call(xAxis);
				}
			},
			render:function(){
			return React.DOM.div( {id:this.props.target})
		}
})
