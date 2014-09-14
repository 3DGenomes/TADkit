'use strict';

// REACT D3 TRACK COMPONENT

var trackSlider = React.createClass({displayName: 'trackSlider',
	componentWillReceiveProps: function(nextProps){
		// console.log(nextProps);
			if(nextProps.data){
				this.renderChart(nextProps.data, nextProps.elem)
			};
	},
	renderChart: function(dataset, elem){
		
		var data = dataset;
		var divWidth = elem.parentNode.clientWidth;
		
		var margin = {top: 0, right: 40, bottom: 0, left: 40},
		    width = divWidth - margin.left - margin.right,
		    height = 20 - margin.bottom - margin.top,
			trackHeight = 10;

		var x = d3.scale.linear().range([0, width]).clamp(true);

		var sliderStart = 0;
		var sliderEnd = data.length;

		x.domain([sliderStart, sliderEnd]);
		var handleWidth = width / sliderEnd;
		var handleHeight = trackHeight * 2.0;

		var brush = d3.svg.brush()
		    .x(x)
		    .extent([0, 0])
		    .on("brush", brushed);

		var svg = d3.select('#' + this.props.target).selectAll('div').append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g");

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height / 2 + ")")
		    .call(d3.svg.axis()
		      .scale(x)
		      .orient("bottom")
			  .outerTickSize([0])
		  )
		  .select(".domain")
		  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		    .attr("class", "halo");

		var slider = svg.append("g")
		    .attr("class", "slider")
		    .call(brush);

		slider.selectAll(".extent,.resize")
		    .remove();

		slider.select(".background")
		    .attr("height", height);

		var handle = slider.append("rect")
		    .attr("class", "handle")
			.attr("x", 0 )
			.attr("y", 0)
		    .attr("width", handleWidth)
		    .attr("height", handleHeight);

		slider
		    // .call(brush.event)
		  // .transition() // gratuitous intro!
		    // .duration(750)
		    .call(brush.extent([70, 70]))
		    .call(brush.event);

		function brushed() {
		  var value = brush.extent()[0];

		  if (d3.event.sourceEvent) { // not a programmatic event
		    value = x.invert(d3.mouse(this)[0]);
		    brush.extent([value, value]);
		  }

		  handle.attr("x", x(value));
		  // d3.select("body").style("background-color", d3.hsl(value, .8, .8)); DO SOMETHING
		}

	},
	render: function() {
		return React.DOM.div( {id:this.props.target} )
	},
	componentDidMount:function(){
		console.log("Slider Track mounted");
	}
})

