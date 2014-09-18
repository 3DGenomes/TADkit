	TADkit.controller('chartController',['$scope', 'Chart', function($scope,Chart){
		$scope.chart = Chart.getChart();
		console.log("Chart controller loaded");
	}])

	TADkit.directive('reactchart',function(){
		return {
			restrict:'E',
			scope:{data:'=',id:'@'},
			link:function(scope,elm,attrs){
				console.log("Chart directive scope");
				console.log(scope);
				scope.$watch('data',function(n,o){
					React.renderComponent(
						myD3({data:scope.data,target:scope.id}),
						elm[0]
					)
				})
			}
		}
	})

	TADkit.factory('Chart', ['$q', '$http', function($q,$http) {
		var Chart = null;
		return {
			loadChart: function(){
				var deferral = $q.defer();
				$http.jsonp('http://filltext.com/?rows=10&val={randomNumber}&callback=JSON_CALLBACK')
				.success(function(data){
					Chart = data;
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getChart: function () {
				return Chart;
			}
		};
	}])
	