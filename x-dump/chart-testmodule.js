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

	TADkit.controller('chartController',['$scope', '$timeout', 'Chart', 
	function($scope, $timeout, Chart){
		$timeout(function(){ $scope.chart = Chart.getChart(); }, 0)
	}])

	TADkit.directive('reactchart', ['$timeout', function(){
    return {
      restrict:'E',
      scope:{data:'=',id:'@'},
      link:function(scope,elm,attrs){
		scope.$watch('data',function(newValue,oldValue){
		    if(!oldValue || newValue !== oldValue) {
			    React.renderComponent(
			        myD3({data:scope.data,target:scope.id}),
			        elm[0])
			}
        })
      }
    }
  }])

	TADkit.factory('Chart', ['$q', '$http', function($q,$http) {
		var chart = null;
		return {
			loadChart: function(){
				var deferral = $q.defer();
				$http.jsonp('http://filltext.com/?rows=10&val={randomNumber}&callback=JSON_CALLBACK')
				.success(function(data){
					chart = data;
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getChart: function () {
				return chart;
			}
		};
	}])
