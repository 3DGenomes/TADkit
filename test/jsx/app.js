/** @jsx React.DOM */
var APP = 
	React.createClass({
		getInitialState:function(){
			return {data:[]}
		},
		componentWillMount:function(){
			reqwest({
				url: 'http://filltext.com/?rows=5&val={randomNumber}',
				type: '',
				success:function(resp){
					this.setState({data:resp})
					this.renderChart(this.state.data)	
				}.bind(this)
			})
		},
		renderChart:function(dataset){
			d3.select('#chart').selectAll('div')
		    .data(dataset)
		    .enter()
		    .append('div')
		    .attr('class', 'bar')
		    .style('height', function (d) {
		      return d.val * 5 + 'px';
		    });
		},
		render:function(){
			return <div id="chart"></div>
		}
	});
React.renderComponent(
	<APP />,
	document.getElementById('app'))