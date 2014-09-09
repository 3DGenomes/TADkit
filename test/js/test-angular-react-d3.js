/** @jsx React.DOM */
var myD3 = 
	React.createClass({displayName: 'myD3',
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
	
var APP =  angular.module('RNG',[]);

	APP.controller('chartController',['$http','$scope','$q',
	function($http,$scope,$q){
		var deferral = $q.defer();
		$http.jsonp('http://filltext.com/?rows=10&val={randomNumber}&callback=JSON_CALLBACK').
		success(function(d){
			$scope.data=d
			deferral.resolve(d);
		})
	return deferral.promise;
	}])

	APP.directive('reactchart',function(){
    return {
      restrict:'E',
      scope:{data:'=',id:'@'},
      link:function(scope,elm,attrs){
        scope.$watch('data',function(n,o){
			console.log("new");
			console.log(n);
			console.log("old");
			console.log(o);
          React.renderComponent(
              myD3({data:scope.data,target:scope.id}),
              elm[0])
        })
      }
    }
  })
  