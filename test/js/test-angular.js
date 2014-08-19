/** @jsx React.DOM */
var APP = 
	React.createClass({displayName: 'APP',
		componentWillReceiveProps:function(nextProps){
			if(nextProps.data){
				this.renderChart(nextProps.data)
			}
		},
		renderChart:function(dataset){
			d3.select('#' + this.props.target).selectAll('div')
		    .data(dataset)
		    .enter()
		    .append('div')
		    .attr('class', 'bar')
		    .style('height', function (d) {
		      return d.val * 5 + 'px';
		    });
		},
		render:function(){
			return React.DOM.div( {id:this.props.target})
		}
	})